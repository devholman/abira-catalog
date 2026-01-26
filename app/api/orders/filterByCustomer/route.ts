import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { Shippo } from "shippo";

const SHIPPO_TEST_API_KEY = process.env.SHIPPO_TEST_API_KEY || "";
const shippo = new Shippo({
  apiKeyHeader: `ShippoToken ${SHIPPO_TEST_API_KEY}`,
  shippoApiVersion: "2018-02-08",
});

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
      shippingLabels: true,
      ShippingRateSelection: true,
    },
  });

  const response = await Promise.all(
    orders.map(async (order) => {
      let shippingPrice: number | undefined;
      let shippingLabelUrl: string | undefined;

      if (!order.isPickup && order.ShippingRateSelection.length > 0) {
        const rateId = order.ShippingRateSelection[0].rateId;
        try {
          const rate = await shippo.rates.get(rateId);
          shippingPrice = parseFloat(rate.amount);
        } catch (error) {
          console.error("Error fetching shipping rate:", error);
        }
      }

      if (order.shippingLabels.length > 0) {
        shippingLabelUrl = order.shippingLabels[0].labelUrl;
      }

      return {
        id: order.id,
        storeId: order.storeId,
        firstName: order.customer.firstName,
        lastName: order.customer.lastName,
        totalItems: order.items.reduce((sum, item) => sum + item.quantity, 0),
        totalPrice: order.totalPrice,
        createdAt: order.createdAt,
        paymentStatus: order.paymentStatus,
        isPickup: order.isPickup,
        updatedAt: order.updatedAt,
        shippingPrice,
        shippingLabelUrl,
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
      };
    })
  );

  return NextResponse.json(response);
}
