import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { Prisma } from "@prisma/client";

export async function POST(request: Request) {
  const { itemId, startDate, endDate, storeId } = await request.json();

  // Define the type with the items relation
  type OrderWithItems = Prisma.OrderGetPayload<{
    include: { items: true };
  }>;

  const orders: OrderWithItems[] = await prisma.order.findMany({
    where: {
      storeId: storeId,
      createdAt: {
        gte: new Date(startDate),
        lte: new Date(endDate),
      },
      items: {
        some: {
          productId: itemId,
        },
      },
    },
    include: {
      items: true,
    },
  });

  const itemQuantities = orders.flatMap(
    (order: Prisma.OrderGetPayload<{ include: { items: true } }>) =>
      order.items.map((item) => ({
        size: item.size,
        quantity: item.quantity,
      }))
  );

  const aggregatedQuantities = itemQuantities.reduce((acc, item) => {
    if (acc[item.size]) {
      acc[item.size] += item.quantity;
    } else {
      acc[item.size] = item.quantity;
    }
    return acc;
  }, {} as Record<string, number>);

  return NextResponse.json(aggregatedQuantities);
}
