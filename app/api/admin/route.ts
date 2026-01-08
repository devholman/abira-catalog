import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

// Handle GET requests to fetch orders
export async function GET(req: NextRequest) {
  try {
    const orders = await prisma.order.findMany({
      include: {
        customer: true,
        items: {
          include: {
            order: true,
          },
        },
      },
    });
    console.log("🚀 ~ GET ~ orders:", orders);

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

// You can handle other HTTP methods like POST, PUT, DELETE similarly
