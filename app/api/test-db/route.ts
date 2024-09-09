import prisma from "../../../lib/prisma";

import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({
      message: "Database connection successful",
      result,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Database connection failed", error },
      { status: 500 }
    );
  }
}
