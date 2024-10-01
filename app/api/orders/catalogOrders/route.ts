import { PrismaClient } from "@prisma/client";
import { subDays } from "date-fns";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { catalogConfig, dateRange } = body;

    // Set default date range if not provided
    const startDate = dateRange?.startDate || subDays(new Date(), 7);
    const endDate = dateRange?.endDate || new Date();

    // Enumerate over catalogConfig object and get orders
    const catalogOrders = await Promise.all(
      Object.values(catalogConfig).map(async (catalog: any) => {
        const totalOrders = await prisma.order.count({
          where: {
            storeId: catalog.id,
            createdAt: {
              gte: startDate,
              lte: endDate,
            },
          },
        });
        return {
          id: catalog.id,
          name: catalog.name,
          totalOrders,
        };
      })
    );

    // Return the response as JSON
    return NextResponse.json(catalogOrders);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch catalog orders" },
      { status: 500 }
    );
  }
}
