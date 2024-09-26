import { NextRequest, NextResponse } from "next/server";
import { Client, Environment } from "square";
import crypto from "crypto";
import generateCustomerEmailBody from "../../orders/emailTemplates/customerConfirmation";
import generateMerchantEmailBody from "../../orders/emailTemplates/merchantConfirmation";
import { sendEmail } from "@/lib/email";
import { withRetry } from "@/utils/server";

// Load environment variables
const SQUARE_ACCESS_TOKEN = process.env.SQUARE_ACCESS_TOKEN || "";
const SQUARE_LOCATION_ID = process.env.SQUARE_LOCATION_ID || "L6KHB6ZN0RVHJ";
const environment =
  process.env.SQUARE_ENVIRONMENT === "sandbox"
    ? Environment.Sandbox
    : Environment.Production;

// Initialize Square client
const client = new Client({
  accessToken: SQUARE_ACCESS_TOKEN,
  environment,
});

// Utility function for converting dollars to cents
const dollarsToCents = (amount: number): bigint =>
  BigInt(Math.round(amount * 100));

// POST request handler for creating a payment link
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, confirmationNumber, customer, cart, storeId, storeName } =
      body;
    const { notes, firstName, lastName, email, phone } = customer;

    // Generate an idempotency key for Square API
    const idempotencyKey = crypto.randomBytes(16).toString("hex");

    // Create a payment link with retry logic
    const createPaymentLink = async () => {
      return client.checkoutApi.createPaymentLink({
        idempotencyKey, // Prevent double charging
        quickPay: {
          name: `Team Apparel ${confirmationNumber}`,
          priceMoney: {
            amount: dollarsToCents(amount),
            currency: "USD",
          },
          locationId: SQUARE_LOCATION_ID,
        },
      });
    };

    const response = await withRetry(createPaymentLink);

    const paymentLink = response.result.paymentLink?.url || "";
    const customerEmailHtml = generateCustomerEmailBody(
      "Order Confirmation",
      confirmationNumber,
      amount,
      cart,
      notes,
      paymentLink
    );

    const bizEmailHtml = generateMerchantEmailBody(
      "Order Confirmation",
      confirmationNumber,
      amount,
      cart,
      notes,
      firstName,
      lastName,
      email,
      phone,
      storeId,
      storeName
    );

    // Send confirmation emails with retries
    const sendEmails = async () => {
      await Promise.all([
        sendEmail(email, "Your Order Confirmation", customerEmailHtml),
        sendEmail(
          "abirasportsapparel@gmail.com",
          "New Order Received",
          bizEmailHtml
        ),
      ]);
    };

    try {
      await withRetry(sendEmails);
    } catch (emailError) {
      console.error("Email sending failed after retries:", emailError);
    }

    return NextResponse.json({
      success: true,
      url: paymentLink,
      orderId: confirmationNumber,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Failed to create payment link:", errorMessage);

    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
