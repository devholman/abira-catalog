import { NextRequest, NextResponse } from "next/server";
import { Shippo } from "shippo";

const SHIPPO_TEST_API_KEY = process.env.SHIPPO_TEST_API_KEY || "";
// Initialize Shippo client
const shippo = new Shippo({
  apiKeyHeader: `ShippoToken ${SHIPPO_TEST_API_KEY}`,
  shippoApiVersion: "2018-02-08",
});

// Define interfaces for Address and Parcel types
interface Address {
  name: string;
  street1: string;
  street2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone?: string;
  email?: string;
}

interface Parcel {
  length: number;
  width: number;
  height: number;
  weight: number;
}

// Address validation using Shippo API
const validateAddress = async (address: Address) => {
  try {
    // Shippo's address validation endpoint
    const result = await shippo.addresses.create({
      name: address.name,
      street1: address.street1,
      street2: address.street2 || "",
      city: address.city,
      state: address.state,
      zip: address.zip,
      country: address.country || "US",
      phone: address.phone || "",
      email: address.email || "",
    });

    // if (result) {
    //   throw new Error("Invalid address");
    // }

    return result;
  } catch (error) {
    console.error("Error validating address:", error);
    throw error;
  }
};

// Calculate shipping rates using Shippo API
const calculateShippingRates = async (
  fromAddress: Address,
  toAddress: Address,
  parcel: Parcel
) => {
  try {
    const shipment = await shippo.shipments.create({
      address_from: fromAddress,
      address_to: toAddress,
      parcels: [parcel],
    });

    // if (shipment.errors) {
    //   throw new Error("Failed to calculate rates");
    // }

    return shipment.rates;
  } catch (error) {
    console.error("Error calculating shipping rates:", error);
    throw error;
  }
};

// Create a shipping label using Shippo API
const createShippingLabel = async (
  fromAddress: Address,
  toAddress: Address,
  parcel: Parcel,
  selectedRate: string
) => {
  try {
    const shipment = await shippo.shipments.create({
      address_from: fromAddress,
      address_to: toAddress,
      parcels: [parcel],
    });

    // if (shipment.errors) {
    //   throw new Error("Failed to create shipment");
    // }

    const label = await shippo.transactions.create({
      async: false,
      labelFileType: "PDF_4x6",
      metadata: "Order ID #12345",
      rate: "ec9f0d3adc9441449c85d315f0997fd5",
      order: "adcfdddf8ec64b84ad22772bce3ea37a",
    });
    console.log("🚀 ~ label:", label);

    return label;
  } catch (error) {
    console.error("Error creating shipment and label:", error);
    throw error;
  }
};

export async function POST(req: NextRequest) {
  try {
    const { fromAddress, toAddress, parcel, selectedRate } = await req.json();

    // Validate the shipping address
    const validatedAddress = await validateAddress(toAddress);
    console.log("🚀 ~ POST ~ validatedAddress:", validatedAddress);
    return NextResponse.json({
      validatedAddress,
    });

    // Calculate shipping rates
    // const rates = await calculateShippingRates(
    //   fromAddress,
    //   validatedAddress,
    //   parcel
    // );

    // Select the chosen shipping rate
    // const selectedShippingRate = rates.find(
    //   (rate: any) => rate.carrier === selectedRate
    // );

    // Create a shipping label
    // const label = await createShippingLabel(
    //   fromAddress,
    //   validatedAddress,
    //   parcel,
    //   selectedShippingRate ? selectedShippingRate.objectId : ""
    // );

    // Return the shipping rates and label URL
    // return NextResponse.json({
    //   rates,
    //   labelUrl: label.labelUrl, // URL for the generated shipping label
    // });
  } catch (error) {
    console.error("Error processing shipping:", error);
    return NextResponse.json(
      { message: "Error processing shipping", error: error.message },
      { status: 500 }
    );
  }
}
