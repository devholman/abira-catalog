import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { WebhooksHelper } from "square";

const SQUARE_SIGNATURE_KEY =
  process.env.SQUARE_SIGNATURE_KEY || "siMsTjxQn252eZwy1Vj2XA";

const DEV_NOTIFICATION_URL =
  "https://6829-23-120-10-250.ngrok-free.app/api/webhooks/square";
const PRODUCTION_NOTIFICATION_URL =
  "https://teamstore.abirasports.com/api/webhoooks/square";

const notificationUrl =
  process.env.SQUARE_ENVIRONMENT === "sandbox"
    ? DEV_NOTIFICATION_URL
    : PRODUCTION_NOTIFICATION_URL;

// This helper function will verify the signature using the Square helper
function isFromSquare(signature: string, body: string): Promise<boolean> {
  return WebhooksHelper.verifySignature({
    requestBody: body, // The raw body of the request
    signatureHeader: signature, // The signature from the `x-square-hmacsha256-signature` header
    signatureKey: SQUARE_SIGNATURE_KEY, // Your Square signature key
    notificationUrl: notificationUrl, // The webhook URL Square is posting to
  });
}

export async function POST(req: NextRequest) {
  const signature = req.headers.get("x-square-hmacsha256-signature") as string;
  const body = await req.text();

  // Verify the signature using Square's helper function
  if (!isFromSquare(signature, body)) {
    return NextResponse.json(
      { success: false, message: "Invalid signature" },
      { status: 403 }
    );
  }

  let event;
  try {
    event = JSON.parse(body);
  } catch (err) {
    console.error("Failed to parse webhook body: ", err);
    return NextResponse.json(
      { success: false, message: "Invalid JSON" },
      { status: 400 }
    );
  }

  // Check for the payment.updated event
  if (event.type === "payment.updated") {
    const payment = event.data.object.payment;

    // Handle completed payment
    if (payment.status === "COMPLETED") {
      console.log("Payment completed order id:", payment.order_id);

      const paymentLinkId = payment.order_id;

      // Look up your internal order by the stored paymentLinkId
      const order = await prisma.order.findFirst({
        where: { paymentLinkId: paymentLinkId },
      });

      if (order) {
        // Update your order's payment status
        await prisma.order.update({
          where: { id: order.id },
          data: { paymentStatus: "COMPLETED" },
        });
        console.log("Order updated successfully");
      } else {
        console.log("No matching order found for payment");
      }
    }
  }

  // Respond with success
  return NextResponse.json({ success: true });
}
