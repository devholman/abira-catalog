import { Categories } from "@prisma/client";
import React, { useEffect, useRef, useState } from "react";

interface FilterDropdownProps {
  categories: string[];
  setSelectedCategory: (category: Categories) => void;
  selectedCategory: "TSHIRTS" | "HOODIES" | "DRIFITS" | "ALL";
}

const FilterDropdown = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}: FilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [buttonBottom, setButtonBottom] = useState(0); // State to store the bottom position
  const buttonRef = useRef<HTMLButtonElement>(null); // Ref for the button

  // Function to calculate and update the button's bottom position
  const updateButtonPosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setButtonBottom(rect.bottom); // Update the button's bottom position
    }
  };

  // Calculate the button's bottom position when the component mounts or when the dropdown is opened
  useEffect(() => {
    if (isOpen) {
      updateButtonPosition();
    }
    // Recalculate when the window is resized
    window.addEventListener("resize", updateButtonPosition);
    return () => {
      window.removeEventListener("resize", updateButtonPosition);
    };
  }, [isOpen]);
  const handleFilterClick = (category: string) => {
    setSelectedCategory(category);
    setIsOpen(false); // Close dropdown after selection
  };

  return (
    <div className='flex items-center'>
      {/* Filter Button */}
      <button
        className='border text-sm px-6 py-2 relative'
        onClick={() => setIsOpen(!isOpen)}
        ref={buttonRef}
      >
        Filter
      </button>
      <p className='text-sm text-black ml-2'>SHOWING: {selectedCategory}</p>

      {/* Darkened background */}
      {isOpen && (
        <div
          className={"fixed inset-x-0 bg-black opacity-50 z-10"}
          style={{ top: `${buttonBottom}px`, bottom: 0 }}
          onClick={() => setIsOpen(false)} // Close dropdown when background is clicked
        ></div>
      )}

      {/* Dropdown */}
      {isOpen && (
        <div
          className='absolute z-20 w-full left-0 bg-white p-4 shadow-lg'
          style={{ top: `${buttonBottom}px` }}
        >
          <ul className='divide-y divide-slate-400 text-sm'>
            {categories.map((category: string) => (
              <li key={category}>
                <button
                  className={`block w-full text-left px-4 py-2  ${
                    selectedCategory === category
                      ? "bg-black text-white"
                      : "hover:bg-gray-200"
                  }`}
                  onClick={() => handleFilterClick(category)}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
