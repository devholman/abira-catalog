import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { computeLegacyUnitPrice } from "@/utils/pricing";

// GET request handler for fetching an order with customer and items
export async function GET(
  req: Request,
  { params }: { params: Promise<{ orderId: string }> }
) {
  const { orderId } = await params;

  try {
    const order = await prisma.order.findUnique({
      where: { id: parseInt(orderId, 10) },
      include: { customer: true, items: true },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const items = order.items.map((item) => ({
      ...item,
      // Prefer the price persisted at order creation. Fall back to recomputing
      // for orders that predate the unitPrice column.
      unitPrice:
        item.unitPrice ??
        computeLegacyUnitPrice({
          basePrice: item.price,
          material: item.material,
          size: item.size,
          isAddBack: item.isAddBack,
          backOptionPrice: null,
        }),
    }));

    return NextResponse.json({
      order: {
        id: order.id,
        totalPrice: order.totalPrice,
        notes: order.notes,
        storeId: order.storeId,
        isPickup: order.isPickup,
      },
      customer: order.customer,
      items,
    });
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 });
  }
}

// DELETE request handler for deleting an order
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ orderId: string }> }
) {
  const { orderId } = await params;
  const url = new URL(req.url);
  const storeId = url.searchParams.get("storeId");

  if (!storeId) {
    return NextResponse.json(
      {
        success: false,
        message: "storeId is required",
      },
      { status: 400 }
    );
  }

  console.log("Deleting order:", orderId, "from store:", storeId);

  try {
    // Delete the related order items first
    await prisma.orderItem.deleteMany({
      where: {
        orderId: Number(orderId),
      },
    });

    // Delete the order from the database
    const deletedOrder = await prisma.order.deleteMany({
      where: {
        id: Number(orderId),
        storeId: Number(storeId),
      },
    });

    if (deletedOrder.count === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Order not found or does not belong to the specified store",
        },
        { status: 404 }
      );
    }

    console.log("Order deleted successfully:", orderId);

    // Send response
    return NextResponse.json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting order:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete order",
      },
      { status: 500 }
    );
  }
}
