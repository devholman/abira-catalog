import React from "react";

interface NotesProps {
  label: string;
  error?: any;
  errorText?: string;
  register: any;
  id: string;
  placeholder: string;
}
const Notes = ({
  label,
  error,
  errorText,
  register,
  id,
  placeholder,
}: NotesProps) => {
  return (
    <div className='relative w-full my-4'>
      <label
        htmlFor='notes'
        className='`absolute left-4 top-3 text-gray-700 transition-all duration-200 transform peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-black'
      >
        {label}
      </label>
      <textarea
        id={id}
        placeholder={placeholder}
        {...register}
        className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm'
      />
      {error && <p className='text-red-500 text-xs mt-1'>{errorText}</p>}
    </div>
  );
};

export default Notes;
