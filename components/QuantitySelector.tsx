import React from "react";
import { UseFormRegister } from "react-hook-form";

interface QuantitySelectorProps {
  register: UseFormRegister<any>; // Register function from react-hook-form
  minQuantity?: number; // Minimum allowed quantity (default is 1)
  maxQuantity?: number; // Maximum allowed quantity (optional)
  labelName: string;
  name: string; // Name of the field in the form
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  register,
  minQuantity = 1,
  maxQuantity = 1000,
  labelName = "Quantity",
  name, // Name to link to react-hook-form
}) => {
  return (
    <>
      <label className='py-2 text-gray-800 block space-x-2 text-sm strong'>
        <span className='text-sm text-gray-800 strong'>{labelName}</span>
      </label>
      <div className='inline-flex items-center border border-gray-300 w-auto mb-4'>
        <button
          type='button'
          className={`px-4 py-2 text-xl font-semibold bg-gray-200`}
          onClick={(e) => {
            e.preventDefault();
            const input = document.querySelector(
              `input[name="${name}"]`
            ) as HTMLInputElement;
            if (input && input.valueAsNumber > minQuantity) {
              input.valueAsNumber -= 1;
              input.dispatchEvent(new Event("input", { bubbles: true }));
            }
          }}
        >
          –
        </button>
        <input
          type='number'
          className='w-12 text-center text-lg text-black border-none outline-none'
          min={minQuantity}
          max={maxQuantity}
          {...register(name, {
            valueAsNumber: true,
            min: minQuantity,
            max: maxQuantity,
          })}
          style={{
            MozAppearance: "textfield",
            WebkitAppearance: "none",
            margin: 0,
          }}
        />
        <style jsx>{`
          input[type="number"]::-webkit-outer-spin-button,
          input[type="number"]::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
          input[type="number"] {
            -moz-appearance: textfield;
          }
        `}</style>
        <button
          type='button'
          className={`px-4 py-2 text-xl font-semibold bg-gray-200`}
          onClick={(e) => {
            e.preventDefault();
            const input = document.querySelector(
              `input[name="${name}"]`
            ) as HTMLInputElement;
            if (input && (!maxQuantity || input.valueAsNumber < maxQuantity)) {
              input.valueAsNumber += 1;
              input.dispatchEvent(new Event("input", { bubbles: true }));
            }
          }}
        >
          +
        </button>
      </div>
    </>
  );
};

export default QuantitySelector;
