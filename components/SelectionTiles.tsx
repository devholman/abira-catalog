import React from "react";
import {
  UseFormRegister,
  FieldError,
  FieldErrorsImpl,
  Merge,
} from "react-hook-form";

interface SelectionTilesProps {
  list: string[];
  register: UseFormRegister<any>; // Register function from react-hook-form
  value: string; // Current selected value
  labelName: string; // Label for the selection tiles
  fieldName: string;
  isRequired: boolean;
  errors?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
}

const SelectionTiles: React.FC<SelectionTilesProps> = ({
  list,
  register,
  value,
  labelName,
  isRequired = false,
  fieldName,
  errors,
}) => {
  return (
    <>
      <label className='py-2 text-gray-800 block text-sm strong'>
        <span className='text-sm text-gray-800 strong'>{labelName}</span> -{" "}
        {value}
      </label>
      <div className='flex justify-start gap-4 mb-4 flex-wrap'>
        {list.map((option, index) => (
          <label
            key={index}
            className={`px-4 py-2 border cursor-pointer ${
              value === option ? "bg-black text-white" : "bg-white text-black"
            }`}
          >
            {option}
            <input
              type='radio'
              value={option}
              {...register(fieldName, {
                required: isRequired ? `${labelName} is required` : false,
              })}
              className='hidden'
            />
          </label>
        ))}
      </div>
      <p className='text-red-500 text-sm'>
        {errors &&
        errors.type === "required" &&
        typeof errors.message === "string"
          ? errors.message
          : ""}
      </p>
    </>
  );
};

export default SelectionTiles;
