import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function POST(request: Request) {
  const { storeId } = await request.json();

  const customers = await prisma.customer.findMany({
    where: {
      storeId: parseInt(storeId),
    },
    include: {
      orders: true,
    },
  });

  return NextResponse.json(customers);
}
