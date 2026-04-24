"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

const Confirmation = () => {
  const [paymentLink, setPaymentLink] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const confirmationNumber = searchParams?.get("confirmationNumber") || "";
  const storeName = searchParams?.get("team") || "";
  const shippingRateParam = searchParams?.get("shippingRate");
  const shippingRateParsed = shippingRateParam ? parseFloat(shippingRateParam) : NaN;
  const shippingRate = Number.isFinite(shippingRateParsed) ? shippingRateParsed : null;

  const hasFetchedPaymentLink = useRef(false);

  useEffect(() => {
    if (!confirmationNumber) return;

    const fetchPaymentLink = async () => {
      try {
        // Extract orderId from confirmationNumber e.g. "CINCO-ORD-213" -> "213"
        const orderId = confirmationNumber.split("-").pop();
        if (!orderId) throw new Error("Invalid confirmation number");

        // Fetch order data from DB
        const orderRes = await fetch(`/api/orders/${orderId}`);
        if (!orderRes.ok) throw new Error("Failed to fetch order data");
        const { order, customer, items } = await orderRes.json();

        const res = await fetch("/api/square/create-payment-link", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: order.totalPrice,
            confirmationNumber,
            storeId: order.storeId,
            customer: {
              ...customer,
              notes: order.notes,
              localPickup: order.isPickup,
            },
            items,
            shippingRate,
            storeName,
          }),
        });

        const data = await res.json();
        if (data.success) {
          setPaymentLink(data.url);
        } else {
          console.error("Error creating payment link:", data.error);
        }
      } catch (error) {
        console.error("Error fetching payment link:", error);
      }
    };

    if (!hasFetchedPaymentLink.current) {
      fetchPaymentLink();
      hasFetchedPaymentLink.current = true;
    }
  }, []);

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col items-center p-6'>
      {/* Title Section */}
      <div className='bg-white w-full max-w-2xl p-8 rounded-lg shadow-md'>
        <h1 className='text-3xl font-bold text-center text-gray-800 mb-4'>
          Order Confirmed!
        </h1>
        <p className='text-center text-lg text-gray-600'>
          Thank you for your order!
        </p>
        <p className='text-center text-lg text-gray-600'>
          Your order confirmation number is:
        </p>
        <p className='text-center text-2xl font-semibold text-gray-800 my-4'>
          #{confirmationNumber || "N/A"}
        </p>

        {/* Steps for Payment */}
        <div className='mt-6'>
          <h2 className='text-xl font-semibold text-gray-800 mb-2'>
            How to Pay:
          </h2>
          <ol className='list-decimal list-inside text-gray-700 space-y-2'>
            <li>Click the link below to complete payment.</li>
            <li>Once payment is received, your order will be fullfilled.</li>
          </ol>
        </div>

        <div className='mt-6 flex justify-center'>
          {paymentLink ? (
            <a
              href={paymentLink}
              className='underline'
              target='_blank'
              rel='noopener noreferrer'
            >
              Click here to complete your payment
            </a>
          ) : (
            <p>Loading payment link...</p>
          )}
        </div>

        {/* Contact Section */}
        <div className='mt-8'>
          <h2 className='text-lg font-semibold text-gray-800 mb-2'>
            Need Help?
          </h2>
          <p className='text-gray-700'>
            If you have any questions or need to contact us regarding your
            order, please email us at:{" "}
            <a
              href='mailto:abirasportsapparel@gmail.com'
              className='text-blue-600 underline'
            >
              abirasportsapparel@gmail.com
            </a>
            . Be sure to include your order confirmation number for faster
            assistance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
