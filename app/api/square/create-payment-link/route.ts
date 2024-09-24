import { NextRequest, NextResponse } from "next/server";
import { Client, Environment } from "square";

// Load environment variables
const SQUARE_ACCESS_TOKEN = process.env.SQUARE_ACCESS_TOKEN || "";
const SQUARE_LOCATION_ID = process.env.SQUARE_LOCATION_ID || "L6KHB6ZN0RVHJ";
const environment =
  process.env.SQUARE_ENVIRONMENT === "sandbox"
    ? Environment.Sandbox
    : Environment.Production;

// Importing crypto for generating the idempotency key
import crypto from "crypto";

// Square client initialization
const client = new Client({
  accessToken: SQUARE_ACCESS_TOKEN,
  environment: environment,
});

// POST request handler for creating a payment link
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { amount, orderId, storeName } = body;

    /**
     * Converts a dollar amount string (e.g., "$50.00") to cents (e.g., 5000).
     *
     * @param {number} amount - The dollar amount as a string (e.g., "$50.00").
     * @returns {bigint} - The amount in cents as an integer (e.g., 5000).
     */
    const dollarsToCents = (amount: number): bigint => {
      // Remove any non-numeric characters like "$" or ","
      // const numericAmount = parseFloat(amount.replace(/[^0-9.-]+/g, ""));

      // Multiply by 100 to convert dollars to cents
      const amountInCents = BigInt(Math.round(amount * 100));
      return amountInCents;
    };

    // Generate an idempotency key
    const idempotencyKey = crypto.randomBytes(16).toString("hex");

    const response = await client.checkoutApi.createPaymentLink({
      idempotencyKey, // Ensure the request is not processed multiple times
      quickPay: {
        name: `Team ${storeName} Apparel`,
        priceMoney: {
          amount: dollarsToCents(amount), // amount in smallest currency unit, e.g., cents
          currency: "USD", // Currency code
        },
        locationId: SQUARE_LOCATION_ID,
      },
      // checkoutOptions: {
      //   redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/confirmation`,  // Redirect to confirmation page
      // },
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
