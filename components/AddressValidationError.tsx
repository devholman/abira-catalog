"use client";

import React, { useState } from "react";
import { useFormContext } from "react-hook-form";

const AddressValidationError = ({
  validationResults,
  onApplySuggested,
}: {
  validationResults: {
    isValid: boolean;
    messages: { text: string }[];
    suggestedAddress?: {
      street1?: string;
      street2?: string;
      city?: string;
      state?: string;
      zip?: string;
    };
  } | null;
  onApplySuggested: () => void;
}) => {
  const { setValue } = useFormContext();

  const handleApplySuggested = () => {
    if (!validationResults?.suggestedAddress) return;

    const { street1, street2, city, state, zip } =
      validationResults.suggestedAddress;
    if (street1) setValue("street1", street1);
    if (street2) setValue("street2", street2);
    if (city) setValue("city", city);
    if (state) setValue("state", state);
    if (zip) setValue("zip", zip);

    onApplySuggested();
  };

  if (!validationResults) return null;

  return (
    <div className='bg-red-100 border border-red-400 text-red-700 p-4 rounded mt-4'>
      <p className='font-semibold'>There was a problem with your address:</p>
      <ul className='list-disc list-inside text-sm'>
        {validationResults.messages.map((msg, index) => (
          <li key={index}>{msg.text}</li>
        ))}
      </ul>
      {validationResults.suggestedAddress && (
        <div className='mt-4'>
          <p className='font-medium'>Suggested Address:</p>
          <div className='text-sm ml-2'>
            {validationResults.suggestedAddress.street1 && (
              <p>{validationResults.suggestedAddress.street1}</p>
            )}
            {validationResults.suggestedAddress.street2 && (
              <p>{validationResults.suggestedAddress.street2}</p>
            )}
            <p>
              {validationResults.suggestedAddress.city},{" "}
              {validationResults.suggestedAddress.state}{" "}
              {validationResults.suggestedAddress.zip}
            </p>
          </div>
          <button
            className='mt-2 bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-3 rounded'
            onClick={handleApplySuggested}
          >
            Use Suggested Address
          </button>
        </div>
      )}
    </div>
  );
};

export default AddressValidationError;
