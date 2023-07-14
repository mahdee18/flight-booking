import React, { useState } from 'react';
import { BiSolidDownArrow } from 'react-icons/bi';

const TicketClass = () => {
  const [selectedOption, setSelectedOption] = useState('Economy');
  const [isOpen, setIsOpen] = useState(false);

  const options = ['Economy', 'Premium Economy', 'Business Class', 'First Class'];
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex items-center justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
          onClick={handleToggle}
        >
          {selectedOption}
          <BiSolidDownArrow className="ml-2" />
        </button>
      </div>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {options.map((option) => (
              <div
                key={option}
                className={`${
                  option === selectedOption ? 'bg-gray-100 text-green-500' : ''
                } cursor-pointer px-4 py-2 text-sm`}
                role="menuitem"
                onClick={() => handleOptionSelect(option)}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketClass;
