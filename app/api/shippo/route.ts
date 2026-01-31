import { NextRequest, NextResponse } from "next/server";
import { Rate, Shippo } from "shippo";

const SHIPPO_TEST_API_KEY = process.env.SHIPPO_TEST_API_KEY || "";
const shippo = new Shippo({
  apiKeyHeader: `ShippoToken ${SHIPPO_TEST_API_KEY}`,
  shippoApiVersion: "2018-02-08",
});

interface Address {
  name?: string;
  street1?: string;
  street2?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  phone?: string;
  email?: string;
}

interface Parcel {
  length: string;
  width: string;
  height: string;
  weight: string;
  massUnit: "g" | "oz" | "lb" | "kg";
  distanceUnit: "in" | "cm" | "ft" | "m" | "mm" | "yd";
}

const FROM_ADDRESS = {
  name: "Abira Sports",
  street1: "4802 Sundance Hollow Ln",
  city: "Katy",
  state: "TX",
  zip: "77494",
  country: "US",
  phone: "7134942820",
  email: "abirasportsapparel@gmail.com",
};

export async function POST(req: NextRequest) {
  try {
    const { toAddress, parcel }: { toAddress: Address; parcel: Parcel } =
      await req.json();

    // Validate address
    const validatedAddress = await shippo.addresses.create({
      ...toAddress,
      country: toAddress.country || "US", // Ensure country is always a string
      validate: true,
    });

    if (validatedAddress.validationResults?.isValid === false) {
      return NextResponse.json(
        {
          message: "Invalid shipping address",
          validation_results: validatedAddress.validationResults,
        },
        { status: 400 }
      );
    }

    // Get shipping rates
    const shipment = await shippo.shipments.create({
      addressFrom: FROM_ADDRESS,
      addressTo: validatedAddress,
      parcels: [parcel],
    });

    return NextResponse.json({
      validatedAddress,
      shipmentDate: shipment.shipmentDate,
      rates: shipment.rates.map((rate: Rate) => ({
        id: rate.objectId,
        carrier: rate.provider,
        carrierImg1: rate.providerImage75,
        carrierImg2: rate.providerImage200,
        servicelevel: rate.servicelevel,
        amount: rate.amount,
        estimatedDays: rate.estimatedDays,
        durationTerms: rate.durationTerms,
      })),
    });
  } catch (error) {
    console.error("Error in /api/shippo", error);
    return NextResponse.json(
      {
        message: "Shipping rate error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
