import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { withRetry } from "@/utils/server";

// Utility function for creating an order item
const createOrderItems = (cart: any) => {
  return cart.flatMap((item: any) =>
    item.orders.map((order: any) => ({
      productId: item.id,
      quantity: order.quantity,
      size: order.size,
      color: order.color,
      category: item.category,
      price: item.price,
      title: item.title,
      playerName: order.playerName,
      playerNumber: order.playerNumber,
      material:
        order.material === "Dri-Fit (+ $5)" ? "Dri-Fit" : order.material,
      isAddBack: order.isAddBack,
      productImage: order.productId,
      notes: order.notes,
    }))
  );
};

// POST request handler for creating an order
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { customer, cart, totalPrice, notes, storeId, storeName } = data;
    const { firstName, lastName, email, phone } = customer;

    // Create a new customer record with retry
    const createCustomer = async () => {
      return prisma.customer.create({
        data: {
          storeId,
          firstName,
          lastName,
          email,
          phone,
        },
      });
    };
    const newCustomer = await withRetry(createCustomer);

    // Create a new order with retry
    const createOrder = async () => {
      return prisma.order.create({
        data: {
          storeId,
          customerId: newCustomer.id,
          totalPrice,
          items: {
            create: createOrderItems(cart),
          },
          notes,
        },
        include: {
          items: true,
        },
      });
    };
    const newOrder = await withRetry(createOrder);

    // Generate a confirmation number based on the order ID
    const confirmationNumber = `${storeName.toUpperCase()}-ORD-${newOrder.id}`;

    console.log("Order created successfully:", newOrder.id);

    // Send response
    return NextResponse.json({
      success: true,
      message: "Order created successfully",
      order: newOrder,
      confirmationNumber,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Order creation failed:", errorMessage);

    return NextResponse.json(
      { success: false, message: "Order creation failed", error: errorMessage },
      { status: 500 }
    );
  }
}
