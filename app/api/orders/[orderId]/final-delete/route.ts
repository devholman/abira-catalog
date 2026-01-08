import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { orderId: string } }
) {
  const orderId = Number(params.orderId);

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { shippingLabels: true },
  });

  if (!order) {
    return NextResponse.json(
      { success: false, message: "Order not found" },
      { status: 404 }
    );
  }

  if (order.status !== "CANCEL_REQUESTED") {
    return NextResponse.json(
      {
        success: false,
        message: "Order must be CANCEL_REQUESTED before deletion",
      },
      { status: 400 }
    );
  }

  const label = order.shippingLabels[0];
  if (label && !label.refunded) {
    return NextResponse.json(
      {
        success: false,
        message: "Cannot delete order: shipping label has not been refunded",
      },
      { status: 400 }
    );
  }

  // Delete order items
  await prisma.orderItem.deleteMany({
    where: { orderId },
  });

  // Delete shipping rate selections (if any remain)
  await prisma.shippingRateSelection.deleteMany({
    where: { orderId },
  });

  // Delete shipping labels
  await prisma.shippingLabel.deleteMany({
    where: { orderId },
  });

  // Delete the order
  await prisma.order.delete({
    where: { id: orderId },
  });

  return NextResponse.json({
    success: true,
    message: "Order and related records deleted successfully",
  });
}
