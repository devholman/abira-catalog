// pages/api/cron/finalize-deletes.ts

import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { Shippo } from "shippo";

const SHIPPO_TEST_API_KEY = process.env.SHIPPO_TEST_API_KEY || "";
const shippo = new Shippo({
  apiKeyHeader: `ShippoToken ${SHIPPO_TEST_API_KEY}`,
  shippoApiVersion: "2018-02-08",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  console.log("[CRON] Running finalize-deletes job...");

  try {
    const orders = await prisma.order.findMany({
      where: {
        canceledAt: { not: null },
        shippingLabels: {
          some: {
            refundStatus: { in: ["QUEUED", "PENDING"] },
          },
        },
      },
      include: {
        shippingLabels: true,
      },
    });

    for (const order of orders) {
      let allLabelsRefunded = true;

      for (const label of order.shippingLabels) {
        if (!label.shippoTransactionId) {
          console.warn(`[SKIP] Label ${label.id} has no Shippo transaction ID`);
          allLabelsRefunded = false;
          continue;
        }

        try {
          const refund = await shippo.refunds.get(label.shippoTransactionId);

          await prisma.shippingLabel.update({
            where: { id: label.id },
            data: {
              refundStatus:
                refund.status === "ERROR" ? "FAILED" : refund.status,
              refunded: refund.status === "SUCCESS",
              refundedAt: refund.status === "SUCCESS" ? new Date() : null,
            },
          });

          if (refund.status !== "SUCCESS") {
            allLabelsRefunded = false;
          }
        } catch (err) {
          console.error(
            `[ERROR] Refund check failed for label ${label.id}`,
            err
          );
          allLabelsRefunded = false;
        }
      }

      if (allLabelsRefunded) {
        console.log(`[FINAL DELETE] Order ${order.id} — all labels refunded`);

        await prisma.orderItem.deleteMany({ where: { orderId: order.id } });
        await prisma.shippingRateSelection.deleteMany({
          where: { orderId: order.id },
        });
        await prisma.shippingLabel.deleteMany({ where: { orderId: order.id } });
        await prisma.order.delete({ where: { id: order.id } });
      } else {
        console.log(`[WAIT] Order ${order.id} still has pending refunds.`);
      }
    }

    return res.status(200).json({
      success: true,
      message: "Finalize deletes complete",
      processedOrders: orders.length,
    });
  } catch (error) {
    console.error("[CRON ERROR] Finalizing deletes failed:", error);
    return res.status(500).json({
      success: false,
      message: "Error during finalize-deletes",
      error: error instanceof Error ? error.message : error,
    });
  }
}
