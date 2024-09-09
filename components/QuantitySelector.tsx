import React, { useState } from "react";

interface QuantitySelectorProps {
  initialQuantity?: number; // Optional initial quantity value
  minQuantity?: number; // Minimum allowed quantity (default is 1)
  maxQuantity?: number; // Maximum allowed quantity (optional)
  labelName: string;
  onChange?: (quantity: number) => void; // Callback when quantity changes
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  initialQuantity = 1,
  minQuantity = 1,
  maxQuantity = 10,
  labelName = "Quantity",
  onChange,
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleIncrease = () => {
    if (!maxQuantity || quantity < maxQuantity) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      onChange?.(newQuantity); // Trigger the onChange callback if provided
    }
  };

  const handleDecrease = () => {
    if (quantity > minQuantity) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onChange?.(newQuantity);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (
      !isNaN(value) &&
      value >= minQuantity &&
      (!maxQuantity || value <= maxQuantity)
    ) {
      setQuantity(value);
      onChange?.(value);
    }
  };

  return (
    <>
      <label className='py-2 text-gray-800 block space-x-2 text-sm strong'>
        <span className='text-sm text-gray-800 strong'>{labelName}</span> -{" "}
        {quantity}
      </label>
      <div className='inline-flex items-center border border-gray-300 w-auto'>
        <button
          onClick={handleDecrease}
          className={`px-4 py-2 text-xl font-semibold bg-gray-200 ${
            quantity <= minQuantity ? "text-gray-500" : "text-black"
          }`}
          disabled={quantity <= minQuantity}
        >
          –
        </button>
        <input
          type='number'
          className='w-12 text-center text-lg text-black border-none outline-none'
          value={quantity}
          onChange={handleInputChange}
          min={minQuantity}
          max={maxQuantity}
        />
        <button
          onClick={handleIncrease}
          className={`px-4 py-2 text-xl font-semibold bg-gray-200 ${
            maxQuantity && quantity >= maxQuantity
              ? "text-gray-500"
              : "text-black"
          }`}
          disabled={maxQuantity && quantity >= maxQuantity}
        >
          +
        </button>
      </div>
    </>
  );
};

export default QuantitySelector;
