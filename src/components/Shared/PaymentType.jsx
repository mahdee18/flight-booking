import React, { useState } from 'react';
import { BiSolidDownArrow } from 'react-icons/bi';

const PaymentType = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  const options = [
    'MasterCard Credit',
    'Visa Credit',
    'American Express',
    'Bank Transfer',
    'Diners Club',
    'MasterCard Cirrus',
    'MasterCard Debit',
    'PayPal',
    'Visa Debit',
    'Cash Payment',
    'Western Union',
    'Bitcoin',
    'Easypaisa',
  ];

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleShowAll = () => {
    setShowAll(!showAll);
  };

  const handleCheckboxChange = (option) => {
    if (selectedCheckboxes.includes(option)) {
      setSelectedCheckboxes(selectedCheckboxes.filter((item) => item !== option));
    } else {
      setSelectedCheckboxes([...selectedCheckboxes, option]);
    }
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex items-center gap-2 justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
          onClick={handleToggle}
        >
          {selectedCheckboxes.length > 0 ? `${selectedCheckboxes.length} Payment Types ` : 'Payment Types'} <BiSolidDownArrow></BiSolidDownArrow>
        </button>
      </div>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 sm:w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-[400px]">
              {options.slice(0, showAll ? options.length : 6).map((option) => (
                <div
                  key={option}
                  className="flex items-center px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
                  role="menuitem"
                  onClick={() => handleCheckboxChange(option)}
                >
                  <input
                    type="checkbox"
                    className="mr-2 form-checkbox w-4 h-4 sm:w-5 sm:h-5 bg-green-500 text-green-600"
                    checked={selectedCheckboxes.includes(option)}
                    onChange={() => {}}
                  />
                  {option}
                </div>
              ))}
            </div>
          </div>
          {!showAll && (
            <button
              type="button"
              className="w-full py-2 text-sm text-gray-600 hover:text-gray-900 focus:outline-none"
              onClick={handleShowAll}
            >
              Show All
            </button>
          )}
          {showAll && (
            <button
              type="button"
              className="w-full py-2 text-sm text-gray-600 hover:text-gray-900 focus:outline-none"
              onClick={handleShowAll}
            >
              See Less
            </button>
          )}
          
        </div>
      )}
    </div>
  );
};

export default PaymentType;
