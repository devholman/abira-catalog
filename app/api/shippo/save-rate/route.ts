import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { orderId, rateId } = await req.json();

    if (!orderId || !rateId) {
      return NextResponse.json(
        { message: "orderId and rateId are required" },
        { status: 400 }
      );
    }

    await prisma.shippingRateSelection.create({
      data: {
        id: crypto.randomUUID(),
        orderId,
        rateId,
      },
    });

    return NextResponse.json({ message: "Shipping rate saved successfully" });
  } catch (error) {
    console.error("Error saving shipping rate:", error);
    return NextResponse.json(
      {
        message: "Error saving shipping rate",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
