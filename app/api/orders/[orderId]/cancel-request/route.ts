import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Shippo } from "shippo";

const SHIPPO_TEST_API_KEY = process.env.SHIPPO_TEST_API_KEY || "";
const shippo = new Shippo({
  apiKeyHeader: `ShippoToken ${SHIPPO_TEST_API_KEY}`,
  shippoApiVersion: "2018-02-08",
});

/**
 * Attempts to refund a shipping label using Shippo API.
 * Returns success message or error details.
 */
async function attemptRefund(label: {
  id: string;
  shippoTransactionId: string | null;
}) {
  if (!label.shippoTransactionId) {
    console.log(`No transaction ID for refund on label ${label.id}`);
    return { success: false, error: "No transaction ID" };
  }
  try {
    const refundResponse = await shippo.refunds.create({
      transaction: label.shippoTransactionId,
    });

    let newStatus: "QUEUED" | "SUCCESS" | "FAILED" = "FAILED";

    if (
      refundResponse.status === "QUEUED" ||
      refundResponse.status === "PENDING"
    ) {
      newStatus = "QUEUED";
    } else if (refundResponse.status === "SUCCESS") {
      newStatus = "SUCCESS";
    }

    await prisma.shippingLabel.update({
      where: { id: label.id },
      data: {
        refundStatus: newStatus,
        refunded: newStatus === "SUCCESS",
        refundedAt: newStatus === "SUCCESS" ? new Date() : null,
      },
    });

    return {
      success: true,
      message: "Refund processed",
      status: newStatus,
    };
  } catch (err) {
    console.error("Refund error:", err);

    await prisma.shippingLabel.update({
      where: { id: label.id },
      data: {
        refundStatus: "FAILED",
        refunded: false,
      },
    });

    return {
      success: false,
      message: "Label refund failed. Cannot cancel order.",
      error: err,
    };
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { orderId: string } }
) {
  const orderId = Number(params.orderId);

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { shippingLabels: true, ShippingRateSelection: true },
  });

  if (!order) {
    return NextResponse.json(
      { success: false, message: "Order not found" },
      { status: 404 }
    );
  }

  // Handle shipping label refund or rate cleanup
  if (order.shippingLabels.length > 0) {
    for (const label of order.shippingLabels) {
      if (label.refunded) {
        console.log(`Label ${label.id} already refunded`);
      } else {
        const refund = await attemptRefund(label);

        if (!refund.success) {
          return NextResponse.json(
            {
              success: false,
              message: "Label refund failed. Cannot cancel order.",
              error: refund.error,
            },
            { status: 500 }
          );
        }

        await prisma.shippingLabel.update({
          where: { id: label.id },
          data: { refunded: true },
        });
        console.log(`Label ${label.id} refund processed`);
      }
    }
  } else if (order.ShippingRateSelection.length > 0) {
    await prisma.shippingRateSelection.deleteMany({
      where: { orderId },
    });
    console.log("Shipping rate selections cleaned up");
  }

  // Mark order as CANCEL_REQUESTED
  await prisma.order.update({
    where: { id: orderId },
    data: { status: "CANCEL_REQUESTED", canceledAt: new Date() },
  });

  return NextResponse.json({
    success: true,
    message: "Order marked as CANCEL_REQUESTED. Shipping refund attempted.",
  });
}
