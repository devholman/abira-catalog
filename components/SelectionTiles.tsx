import React from "react";

interface SelectionTilesProps {
  list: string[];
  handleClick: (x: string) => void;
  value: string;
  labelName: string;
}
const SelectionTiles = ({
  list,
  handleClick,
  value,
  labelName,
}: SelectionTilesProps) => {
  return (
    <>
      <label className='py-2 text-gray-800 block text-sm strong'>
        <span className='text-sm text-gray-800 strong'>{labelName}</span> -{" "}
        {value}
      </label>
      <div className='flex justify-start gap-4 mb-4'>
        {list.map((option, index) => (
          <button
            key={index}
            className={`px-4 py-2 border ${
              value === option ? "bg-black text-white" : "bg-white text-black"
            }`}
            onClick={() => handleClick(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </>
  );
};
export default SelectionTiles;
