import { PaymentStatus, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { catalogId: string } }
) {
  const catalogId = parseInt(params.catalogId, 10);

  try {
    const orders = await prisma.order.findMany({
      where: { storeId: catalogId },
      include: {
        customer: true,
        items: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const response = orders.map((order) => ({
      id: order.id,
      storeId: order.storeId,
      firstName: order.customer.firstName,
      lastName: order.customer.lastName,
      totalItems: order.items.length,
      totalPrice: order.totalPrice,
      createdAt: order.createdAt,
      paymentStatus: order.paymentStatus,
      updatedAt: order.updatedAt,
      items: order.items.map((item) => ({
        id: item.productId,
        title: item.title,
        color: item.color,
        size: item.size,
        notes: item.notes,
        productImage: item.productImage,
        material: item.material,
        quantity: item.quantity,
        isAddBack: item.isAddBack,
        playerName: item.playerName,
        playerNumber: item.playerNumber,
      })),
    }));

    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
