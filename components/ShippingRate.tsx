"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCart } from "../context/CartContext";

interface ShippingRate {
  id: string;
  carrier: string;
  carrierImg1: string;
  carrierImg2: string;
  servicelevel: {
    name: string;
    terms: string;
    token: string;
  };
  amount: string;
  estimatedDays: number;
  durationTerms: string;
}

interface ShippingRateSelectorProps {
  rates: ShippingRate[];
  onRateSelect: (rateId: string) => Promise<void>;
  isLoading: boolean;
}

const ShippingRateSelector: React.FC<ShippingRateSelectorProps> = ({
  rates,
  onRateSelect,
  isLoading,
}) => {
  const [selectedRateId, setSelectedRateId] = useState<string | null>(null);

  const { setShippingRate } = useCart();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRateId) {
      await onRateSelect(selectedRateId);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='space-y-4 lg:w-full lg:max-w-2xl p-8 lg:rounded-lg lg:shadow-md'
    >
      <h2 className='text-xl font-semibold'>Select Shipping Option</h2>
      <div className='space-y-2'>
        {rates
          .sort((a, b) => parseInt(a.amount) - parseInt(b.amount))
          .map((rate) => (
            <label
              key={rate.id}
              className={`flex items-center rounded border p-4 ${
                selectedRateId === rate.id
                  ? "border-black bg-gray-100"
                  : "border-gray-300"
              }`}
            >
              <input
                type='radio'
                name='shippingRate'
                value={rate.id}
                checked={selectedRateId === rate.id}
                onChange={() => {
                  setSelectedRateId(rate.id);
                  setShippingRate(rate.amount);
                }}
                className='mr-3'
              />
              <div className='flex w-full items-center justify-between'>
                {/* Carrier Image */}
                <div className='flex-shrink-0'>
                  <div className='md:hidden'>
                    <Image
                      src={rate.carrierImg1}
                      alt='carrier image'
                      width={50}
                      height={30}
                    />
                  </div>
                  <div className='hidden md:block'>
                    <Image
                      src={rate.carrierImg2}
                      alt='carrier image'
                      width={75}
                      height={50}
                    />
                  </div>
                </div>

                {/* Carrier Name */}
                <div className='flex-1 px-4'>
                  <div className='font-medium'>{rate.carrier}</div>
                  <div className='text-xs md:text-sm'>
                    {rate.servicelevel.name}
                  </div>
                </div>

                {/* Estimated Days */}
                <div className='flex-1 px-2 md:px-4 text-xs md:text-sm text-gray-700 text-center'>
                  {rate.estimatedDays
                    ? `Est. ${rate.estimatedDays} day${
                        rate.estimatedDays > 1 ? "s" : ""
                      }`
                    : "No estimate"}
                </div>

                {/* Price */}
                <div className='flex-shrink-0 font-semibold text-right'>
                  ${rate.amount}
                </div>
              </div>
            </label>
          ))}
      </div>
      <button
        type='submit'
        disabled={!selectedRateId || isLoading}
        className={`w-full py-2 rounded text-white font-medium ${
          !selectedRateId || isLoading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-black hover:bg-gray-800"
        }`}
      >
        {isLoading ? "Generating Label..." : "Confirm Shipping Selection"}
      </button>
    </form>
  );
};

export default ShippingRateSelector;
