// app/api/fulfillment/route.ts
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { startDate, endDate, storeId } = await request.json();

  try {
    const orders = await prisma.order.findMany({
      where: {
        storeId: storeId,
        createdAt: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      },
      include: {
        items: true,
      },
    });

    const fulfillmentCount = {};

    // Aggregate order items
    orders.forEach((order) => {
      order.items.forEach((item) => {
        const key = `${item.color} ${item.material} ${item.size} ${item.category}`;
        if (fulfillmentCount[key]) {
          fulfillmentCount[key] = {
            quantity: (fulfillmentCount[key].quantity += item.quantity),
            itemNames: [...fulfillmentCount[key].itemNames, item.title],
          };
        } else {
          fulfillmentCount[key] = {
            quantity: item.quantity,
            itemNames: [item.title],
          };
        }
      });
    });

    return NextResponse.json(fulfillmentCount);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch fulfillment data" },
      { status: 500 }
    );
  }
}
