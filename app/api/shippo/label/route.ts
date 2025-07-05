import { NextRequest, NextResponse } from "next/server";
import { Shippo } from "shippo";
import prisma from "../../../../lib/prisma"; // Adjust import based on your DB client

const SHIPPO_TEST_API_KEY = process.env.SHIPPO_TEST_API_KEY || "";
const shippo = new Shippo({
  apiKeyHeader: `ShippoToken ${SHIPPO_TEST_API_KEY}`,
  shippoApiVersion: "2018-02-08",
});

const FROM_ADDRESS = {
  name: "Your Warehouse",
  street1: "123 Warehouse St",
  city: "Austin",
  state: "TX",
  zip: "78701",
  country: "US",
  phone: "1234567890",
  email: "warehouse@example.com",
};

export async function POST(req: NextRequest) {
  try {
    const { rateId, orderId } = await req.json();

    if (!rateId || !orderId) {
      return NextResponse.json(
        { message: "rateId and orderId are required" },
        { status: 400 }
      );
    }

    // Buy the label
    const transaction = await shippo.transactions.create({
      rate: rateId,
      labelFileType: "PDF",
      async: false,
    });

    if (transaction.status !== "SUCCESS") {
      return NextResponse.json(
        { message: "Label purchase failed", transaction },
        { status: 500 }
      );
    }

    // Persist label + tracking
    await prisma.shippingLabel.create({
      data: {
        orderId, // The order this label is tied to
        rateId, // Shippo rate ID used to purchase label
        labelUrl: transaction.labelUrl,
        trackingNumber: transaction.trackingNumber,
      },
    });

    return NextResponse.json({
      labelUrl: transaction.labelUrl,
      trackingNumber: transaction.trackingNumber,
    });
  } catch (error) {
    console.error("Error in /api/shippo/label", error);
    return NextResponse.json(
      {
        message: "Shipping label error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
