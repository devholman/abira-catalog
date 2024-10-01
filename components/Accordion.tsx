import React, { useState } from "react";

const Accordion = ({ title, content }: { title: string; content: any }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='border-b border-gray-200 mt-3'>
      <button
        className='flex justify-between items-center w-full py-4 text-left text-sm border-gray-400 focus:outline-none'
        onClick={toggleAccordion}
      >
        <span className='font-semibold text-lg text-black'>{title}</span>
        <svg
          className={`w-5 h-5 transform transition-transform text-black ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M19 9l-7 7-7-7'
          />
        </svg>
      </button>

      {/* Content */}
      {isOpen && <div className='py-2 text-gray-600'>{content}</div>}
    </div>
  );
};

export default Accordion;
