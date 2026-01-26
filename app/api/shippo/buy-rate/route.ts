import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Shippo } from "shippo";

const SHIPPO_TEST_API_KEY = process.env.SHIPPO_TEST_API_KEY || "";
const shippo = new Shippo({
  apiKeyHeader: `ShippoToken ${SHIPPO_TEST_API_KEY}`,
  shippoApiVersion: "2018-02-08",
});

export async function POST(req: NextRequest) {
  try {
    const { orderId } = await req.json();

    if (!orderId) {
      return NextResponse.json(
        { message: "orderId is required" },
        { status: 400 }
      );
    }

    // Look up saved rate
    const rateSelection = await prisma.shippingRateSelection.findFirst({
      where: { orderId },
    });

    if (!rateSelection) {
      return NextResponse.json(
        { message: "No shipping rate found for order" },
        { status: 404 }
      );
    }

    // Buy label
    const transaction = await shippo.transactions.create({
      rate: rateSelection.rateId,
      labelFileType: "PDF",
      async: false,
    });

    if (transaction.status !== "SUCCESS") {
      return NextResponse.json(
        { message: "Label purchase failed", transaction },
        { status: 500 }
      );
    }

    // Save label info
    await prisma.shippingLabel.create({
      data: {
        orderId,
        rateId: rateSelection.rateId,
        labelUrl: transaction.labelUrl || "",
        trackingNumber: transaction.trackingNumber || "",
        shippoTransactionId: transaction.objectId,
      },
    });

    return NextResponse.json({
      message: "Label purchased successfully",
      labelUrl: transaction.labelUrl,
      trackingNumber: transaction.trackingNumber,
    });
  } catch (error) {
    console.error("Error purchasing shipping label:", error);
    return NextResponse.json(
      {
        message: "Error purchasing shipping label",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
