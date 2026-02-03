import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function POST(request: Request) {
  const { firstName, lastName, phoneNumber, orderId, email } =
    await request.json();

  const orders = await prisma.order.findMany({
    where: {
      AND: [
        {
          customer: { firstName: { contains: firstName, mode: "insensitive" } },
        },
        { customer: { lastName: { contains: lastName, mode: "insensitive" } } },
        {
          customer: {
            phone: { contains: phoneNumber, mode: "insensitive" },
          },
        },
        { id: orderId ? orderId : undefined },
        { customer: { email: { contains: email, mode: "insensitive" } } },
      ],
    },
    include: {
      items: true,
      customer: true,
    },
  });

  return NextResponse.json(orders);
}
