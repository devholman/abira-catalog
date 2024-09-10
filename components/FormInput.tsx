import React from "react";
import { Input } from "@headlessui/react";

interface FormInputProps {
  label: string;
  error?: any;
  errorText?: string;
  register: any;
  id: string;
  placeholder: string;
  type?: string;
}

const FormInput = ({
  label,
  register,
  error,
  errorText,
  id,
  placeholder,
  type = "text",
}: FormInputProps) => {
  return (
    <div className='relative w-full my-4'>
      <label
        htmlFor={id}
        className='`absolute left-4 top-3 text-gray-700 transition-all duration-200 transform peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-black'
      >
        {label}
      </label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register}
        className='block w-full px-4 py-3 bg-transparent border border-gray-300 rounded-sm appearance-none focus:outline-none focus:border-black peer'
      />
      {error && <p className='text-red-500 text-xs mt-1'>{errorText}</p>}
    </div>
  );
};

export default FormInput;
