import { NextRequest, NextResponse } from "next/server";
import { SquareClient, SquareEnvironment } from "square";
import crypto from "crypto";
import generateCustomerEmailBody from "../../orders/emailTemplates/customerConfirmation";
import generateMerchantEmailBody from "../../orders/emailTemplates/merchantConfirmation";
import { sendEmail } from "@/lib/email";
import { withRetry } from "@/utils/server";
import prisma from "../../../../lib/prisma";

// Load environment variables
const SQUARE_ACCESS_TOKEN = process.env.SQUARE_ACCESS_TOKEN || "";
const SQUARE_LOCATION_ID = process.env.SQUARE_LOCATION_ID || "L6KHB6ZN0RVHJ";
const environment =
  process.env.SQUARE_ENVIRONMENT === "sandbox"
    ? SquareEnvironment.Sandbox
    : SquareEnvironment.Production;

// Initialize Square client
const client = new SquareClient({
  token: SQUARE_ACCESS_TOKEN,
  environment,
});

// Utility function for converting dollars to cents
const dollarsToCents = (amount: number): bigint =>
  BigInt(Math.round(amount * 100));

function formatPhoneNumber(phone: string): string {
  if (phone.length !== 10) {
    throw new Error("Phone number must be 10 digits long");
  }

  const countryCode = "1"; // Assuming the country code is always "1"
  const areaCode = phone.slice(0, 3);
  const centralOfficeCode = phone.slice(3, 6);
  const lineNumber = phone.slice(6);

  return `${countryCode}-${areaCode}-${centralOfficeCode}-${lineNumber}`;
}

// POST request handler for creating a payment link
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      amount,
      confirmationNumber,
      customer,
      cart,
      storeId,
      storeName,
      shippingRate,
    } = body;
    const {
      notes,
      firstName,
      lastName,
      email,
      phone,
      street1,
      street2,
      city,
      state,
      zip,
      localPickup,
    } = customer;

    // Generate an idempotency key for Square API
    const idempotencyKey = crypto.randomBytes(16).toString("hex");

    // Extract the reference_id from the confirmationNumber
    const orderId = confirmationNumber.split("-").pop();

    const formatPhoneNumber = (phone: string): string => {
      if (phone.length !== 10) {
        throw new Error("Phone number must be 10 digits long");
      }

      const countryCode = "1"; // Assuming the country code is always "1"
      const areaCode = phone.slice(0, 3);
      const centralOfficeCode = phone.slice(3, 6);
      const lineNumber = phone.slice(6);

      return `${countryCode}-${areaCode}-${centralOfficeCode}-${lineNumber}`;
    };

    // Utility function for creating an order item
    const createOrderItems = (cart: any) => {
      return cart.flatMap((item: any) =>
        item.orders.map((order: any) => ({
          name: item.title,
          quantity: order.quantity.toString(),
          note: order.notes,
          basePriceMoney: {
            amount: dollarsToCents(order.orderPrice / order.quantity), // Amount in cents per unit
            currency: "USD",
          },
          // size: order.size,
          // color: order.color,
          // category: item.category,
          // price: item.price,
          // playerName: order.playerName,
          // playerNumber: order.playerNumber,
          // material:
          //   order.material === "Dri-Fit (+ $5)" ? "Dri-Fit" : order.material,
          // isAddBack: order.isAddBack,
          // productImage: order.productImage,
        }))
      );
    };

    // Create a payment link with retry logic
    const createPaymentLink = async () => {
      try {
        // Common order details
        const orderDetails = {
          locationId: SQUARE_LOCATION_ID,
          lineItems: createOrderItems(cart),
          taxes: [
            {
              name: "Sales Tax",
              type: "ADDITIVE",
              percentage: "8.25",
              scope: "ORDER",
            },
          ],
          referenceId: orderId,
          ticketName: `Team Apparel ${confirmationNumber}`,
        };

        // Common payment link options
        const paymentLinkOptions: any = {
          idempotencyKey, // Prevent double charging
          order: orderDetails,
        };

        // Add shipping details if not local pickup
        if (!localPickup) {
          paymentLinkOptions.checkoutOptions = {
            askForShippingAddress: true,
            acceptedPaymentMethods: {
              applePay: true,
            },
            shippingFee: {
              name: "Shipping",
              charge: {
                amount: dollarsToCents(shippingRate),
                currency: "USD",
              },
            },
          };
          paymentLinkOptions.prePopulatedData = {
            buyerEmail: email,
            buyerPhoneNumber: formatPhoneNumber(phone),
            buyerAddress: {
              firstName,
              lastName,
              addressLine1: street1,
              addressLine2: street2,
              locality: city,
              administrativeDistrictLevel1: state,
              postalCode: zip,
              country: "US",
            },
          };
        }

        // Create the payment link
        const response = await client.checkout.paymentLinks.create(
          paymentLinkOptions
        );
        return response;
      } catch (error) {
        console.log("error creating payment link", error);
        throw error;
      }
    };

    const response = await withRetry(createPaymentLink, 1, 20000);

    const paymentLink = response.paymentLink?.url || ""; // paymentLink is inside the response object
    const paymentLinkId = response.paymentLink?.orderId; // paymentLinkId is inside the paymentLink object

    if (!paymentLinkId) {
      throw new Error("Payment link ID not found in the response");
    }

    // Store the paymentLinkId along with your internal orderId in your database
    const storePaymentLinkId = () => {
      return prisma.order.update({
        where: { id: parseInt(orderId, 10) },
        data: { paymentLinkId: paymentLinkId },
      });
    };

    try {
      await storePaymentLinkId();
    } catch (error) {
      console.error("failed to store paymentLinkId:", error);
    }

    const customerEmailHtml = generateCustomerEmailBody(
      "Order Confirmation",
      confirmationNumber,
      amount,
      cart,
      notes,
      paymentLink,
      localPickup
    );

    const bizEmailHtml = generateMerchantEmailBody(
      "Order Confirmation",
      confirmationNumber,
      amount,
      cart,
      notes,
      firstName,
      lastName,
      email,
      phone,
      storeId,
      storeName,
      localPickup
    );

    // Send confirmation emails with retries
    const sendEmails = async () => {
      await Promise.all([
        sendEmail(email, "Your Order Confirmation", customerEmailHtml),
        sendEmail(
          "abirasportsapparel@gmail.com",
          "New Order Received",
          bizEmailHtml
        ),
      ]);
    };

    try {
      await sendEmails();
    } catch (emailError) {
      console.error("Email sending failed after retries:", emailError);
    }

    return NextResponse.json({
      success: true,
      url: paymentLink,
      confirmationNumber,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Failed to create payment link:", errorMessage);

    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
