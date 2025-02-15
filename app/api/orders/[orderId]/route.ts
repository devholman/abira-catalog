import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

// DELETE request handler for deleting an order
export async function DELETE(
  req: Request,
  { params }: { params: { orderId: string } }
) {
  const { orderId } = params;
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
