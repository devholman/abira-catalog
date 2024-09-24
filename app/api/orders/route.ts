import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { sendEmail } from "@/lib/email";
import generateCustomerEmailBody from "./emailTemplates/customerConfirmation";
import generateMerchantEmailBody from "./emailTemplates/merchantConfirmation";
export async function POST(req: Request) {
  try {
    const data = await req.json();

    const { customer, cart, totalPrice, notes, storeId, paymentLink } = data;

    // Destructure the customer information
    const { firstName, lastName, email, phone } = customer;

    // Create a new customer record
    const newCustomer = await prisma.customer.create({
      data: {
        storeId,
        firstName,
        lastName,
        email,
        phone,
      },
    });

    // Create a new order and link it to the new customer
    const newOrder = await prisma.order.create({
      data: {
        storeId,
        customerId: newCustomer.id,
        totalPrice,
        items: {
          create: cart.flatMap((item: any) =>
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
                order.material === "Dri-Fit (+ $5)"
                  ? "Dri-Fit"
                  : order.material,
              isAddBack: order.isAddBack,
              productImage: order.productId,
              notes: order.notes,
            }))
          ),
        },
        notes,
      },
      include: {
        items: true,
      },
    });

    // Create a confirmation number using the order ID
    const confirmationNumber = `ORD-${newOrder.id}`;

    //send emails
    const customerEmailAddress = email; // Replace with the actual email field from the request
    const businessOwnerEmail = "abirasportsapparel@gmail.com";

    const customerEmailHtml = generateCustomerEmailBody(
      "Order Confirmation",
      confirmationNumber,
      totalPrice,
      cart,
      notes,
      paymentLink
    );

    const bizEmailHtml = generateMerchantEmailBody(
      "Order Confirmation",
      confirmationNumber,
      totalPrice,
      cart,
      notes,
      firstName,
      lastName,
      email,
      phone,
      storeId
    );

    try {
      // Send confirmation to customer
      await sendEmail(
        customerEmailAddress,
        "Your Order Confirmation",
        customerEmailHtml
      );

      // Send confirmation to business owner
      await sendEmail(businessOwnerEmail, "New Order Received", bizEmailHtml);
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      // Decide whether to return failure or log the error
    }

    //send response
    return NextResponse.json({
      success: true,
      message: "Order created successfully",
      order: newOrder,
      confirmationNumber,
    });
  } catch (error) {
    console.error("Order creation failed:", error);
    return NextResponse.json(
      { success: false, message: "Order creation failed", error },
      { status: 500 }
    );
  }
}
