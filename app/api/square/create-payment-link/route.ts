import { NextRequest, NextResponse } from "next/server";
import { Client, Environment } from "square";

// Load environment variables
const accessToken = process.env.SQUARE_ACCESS_TOKEN || "";
const locationId = process.env.LOCATION_ID || "L6KHB6ZN0RVHJ";
const environment =
  process.env.SQUARE_ENVIRONMENT === "sandbox"
    ? Environment.Sandbox
    : Environment.Production;

// Square client initialization
const client = new Client({
  accessToken: accessToken,
  environment: environment,
});

// POST request handler for creating a payment link
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { amount, orderId } = body;

    const response = await client.checkoutApi.createPaymentLink({
      idempotencyKey: new Date().toISOString(), // unique key for each request
      quickPay: {
        name: "Team Apparel",
        priceMoney: {
          amount,
          currency: "USD",
        },
        locationId,
      },
      //   order: {
      //     idempotencyKey: new Date().toISOString(),
      //     locationId: 'YOUR_LOCATION_ID',
      //     lineItems: [
      //       {
      //         name: 'Order Payment',
      //         quantity: '1',
      //         basePriceMoney: {
      //           amount: amount, // amount in cents, for $10.00 enter 1000
      //           currency: 'USD',
      //         },
      //       },
      //     ],
      //   },
    });
    console.log(response.result);
    return NextResponse.json({
      success: true,
      url: response.result.paymentLink?.url, // payment link to redirect user
      orderId: orderId,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Square API error:", error.message);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    } else {
      console.error("Unknown error:", error);
      return NextResponse.json(
        { success: false, error: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
}
