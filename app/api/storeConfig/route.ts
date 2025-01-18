// app/api/storeConfig/route.ts
import { NextResponse } from "next/server";
import { stores } from "@/app/catalog/catalogConfigs"; // Update the path to match your config file

// GET handler for store config
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const storeId = searchParams.get("storeId");

  if (!storeId) {
    return NextResponse.json(
      { message: "Store ID is required" },
      { status: 400 }
    );
  }

  const storeConfig = stores[storeId];

  if (!storeConfig) {
    return NextResponse.json(
      { message: "Store config not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(storeConfig, { status: 200 });
}
