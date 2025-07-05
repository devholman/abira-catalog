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
    console.log("🚀 ~ POST ~ shipment:", shipment);

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

// import { NextRequest, NextResponse } from "next/server";
// import { ParcelCreateRequest, Shippo } from "shippo";

// const SHIPPO_TEST_API_KEY = process.env.SHIPPO_TEST_API_KEY || "";
// // Initialize Shippo client
// const shippo = new Shippo({
//   apiKeyHeader: `ShippoToken ${SHIPPO_TEST_API_KEY}`,
//   shippoApiVersion: "2018-02-08",
// });

// // Define interfaces for Address and Parcel types
// interface Address {
//   name?: string;
//   street1?: string;
//   street2?: string;
//   city?: string;
//   state?: string;
//   zip?: string;
//   country?: string;
//   phone?: string;
//   email?: string;
// }

// interface Parcel {
//   length: string;
//   width: string;
//   height: string;
//   weight: string;
//   massUnit: "g" | "oz" | "lb" | "kg";
//   distanceUnit: "in" | "cm" | "ft" | "m" | "mm" | "yd";
// }

// // Address validation using Shippo API
// const validateAddress = async (address: Address) => {
//   try {
//     // Shippo's address validation endpoint
//     const result = await shippo.addresses.create({
//       name: address.name || "",
//       street1: address.street1 || "",
//       street2: address.street2 || "",
//       city: address.city || "",
//       state: address.state || "",
//       zip: address.zip || "",
//       country: address.country || "US",
//       phone: address.phone || "",
//       email: address.email || "",
//       validate: true,
//     });

//     // if (result) {
//     //   throw new Error("Invalid address");
//     // }

//     return result;
//   } catch (error) {
//     console.error("Error validating address:", error);
//     throw error;
//   }
// };

// // Calculate shipping rates using Shippo API
// const calculateShippingRates = async (
//   fromAddress: Address,
//   toAddress: Address,
//   parcel: ParcelCreateRequest
// ) => {
//   try {
//     const shipment = await shippo.shipments.create({
//       addressFrom: { ...fromAddress, country: fromAddress.country || "US" },
//       addressTo: { ...toAddress, country: toAddress.country || "US" },
//       parcels: [parcel],
//     });

//     // if (shipment.errors) {
//     //   throw new Error("Failed to calculate rates");
//     // }

//     return shipment.rates;
//   } catch (error) {
//     console.error("Error calculating shipping rates:", error);
//     throw error;
//   }
// };

// // Create a shipping label using Shippo API
// const createShippingLabel = async (
//   fromAddress: Address,
//   toAddress: Address,
//   parcel: Parcel,
//   selectedRate: string
// ) => {
//   try {
//     const shipment = await shippo.shipments.create({
//       addressFrom: { ...fromAddress, country: fromAddress.country || "US" },
//       addressTo: { ...toAddress, country: toAddress.country || "US" },
//       parcels: [parcel],
//     });

//     // if (shipment.errors) {
//     //   throw new Error("Failed to create shipment");
//     // }

//     const label = await shippo.transactions.create({
//       async: false,
//       labelFileType: "PDF_4x6",
//       metadata: "Order ID #12345",
//       rate: "ec9f0d3adc9441449c85d315f0997fd5",
//       order: "adcfdddf8ec64b84ad22772bce3ea37a",
//     });
//     console.log("🚀 ~ label:", label);

//     return label;
//   } catch (error) {
//     console.error("Error creating shipment and label:", error);
//     throw error;
//   }
// };

// export async function POST(req: NextRequest) {
//   try {
//     const { fromAddress, toAddress, parcel, selectedRate } = await req.json();

//     // Step 1: Validate the shipping address
//     const validatedAddress = await validateAddress(toAddress);
//     console.log("🚀 ~ POST ~ validatedAddress:", validatedAddress);

//     // Step 2: Calculate shipping rates
//     const rates = await calculateShippingRates(fromAddress, validatedAddress, {
//       length: "10",
//       width: "7",
//       height: "4",
//       distanceUnit: "in",
//       weight: "2",
//       massUnit: "lb",
//     });
//     console.log("🚀 ~ POST ~ rates:", rates);

//     // Step 3: Find the selected rate (assuming `selectedRate` is the carrier name or rate ID)
//     const selectedShippingRate = rates.find(
//       (rate: any) => rate.object_id === selectedRate
//     );

//     if (!selectedShippingRate) {
//       return NextResponse.json(
//         { message: "Selected rate not found" },
//         { status: 400 }
//       );
//     }

//     // Step 4: Create a shipping label
//     const label = await createShippingLabel(
//       fromAddress,
//       validatedAddress,
//       parcel,
//       selectedShippingRate.objectId
//     );

//     // Return the shipping rates and label URL
//     return NextResponse.json({
//       rates,
//       labelUrl: label.labelUrl, // URL for the generated shipping label
//     });
//   } catch (error) {
//     console.error("Error processing shipping:", error);
//     return NextResponse.json(
//       {
//         message: "Error processing shipping",
//         error: error instanceof Error ? error.message : "Unknown error",
//       },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(req: NextRequest) {
//   try {
//     const { fromAddress, toAddress, parcel, selectedRate } = await req.json();

//     // Validate the shipping address
//     const validatedAddress = await validateAddress(toAddress);

//     // Calculate shipping rates
//     const rates = await calculateShippingRates(
//       fromAddress,
//       validatedAddress,
//       parcel
//     );
//     console.log("🚀 ~ POST ~ rates:", rates);
//     return NextResponse.json({
//       validatedAddress,
//     });
//     //Select the chosen shipping rate
//     const selectedShippingRate = rates.find(
//       (rate: any) => rate.carrier === selectedRate
//     );

//     //Create a shipping label
//     const label = await createShippingLabel(
//       fromAddress,
//       validatedAddress,
//       parcel,
//       selectedShippingRate ? selectedShippingRate.objectId : ""
//     );

//     //Return the shipping rates and label URL
//     return NextResponse.json({
//       rates,
//       labelUrl: label.labelUrl, // URL for the generated shipping label
//     });
//   } catch (error) {
//     console.error("Error processing shipping:", error);
//     return NextResponse.json(
//       { message: "Error processing shipping", error: error.message },
//       { status: 500 }
//     );
//   }
// }
