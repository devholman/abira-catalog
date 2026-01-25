import { PaymentStatus, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { Shippo } from "shippo";

const prisma = new PrismaClient();

const SHIPPO_TEST_API_KEY = process.env.SHIPPO_TEST_API_KEY || "";
const shippo = new Shippo({
  apiKeyHeader: `ShippoToken ${SHIPPO_TEST_API_KEY}`,
  shippoApiVersion: "2018-02-08",
});

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
        shippingLabels: true,
        ShippingRateSelection: true,
      },
      orderBy: {
        createdAt: "desc",
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
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
