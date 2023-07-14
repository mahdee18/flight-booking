import { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { BiSolidDownArrow } from 'react-icons/bi';
import { VscPerson } from "react-icons/vsc";
import { PiPerson } from "react-icons/pi";

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState({ text: 'Adult', count: 1 });
  const [options, setOptions] = useState([
    { text: 'Adults', count: 0, icon: <VscPerson size={20} /> },
    { text: 'Children', count: 0, icon: <PiPerson size={20} /> },
    { text: 'Infants', count: 0, icon: <PiPerson size={20} /> },
  ]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleIncrement = (index) => {
    const updatedOptions = [...options];
    updatedOptions[index].count += 1;
    setOptions(updatedOptions);
  };

  const handleDecrement = (index) => {
    const updatedOptions = [...options];
    if (updatedOptions[index].count > 0) {
      updatedOptions[index].count -= 1;
      setOptions(updatedOptions);
    }
  };

  const handlePlusMinusClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex items-center gap-2 justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
          onClick={handleToggle}
        >
          
          {selectedOption.count} <span>{selectedOption.text}</span>
          <BiSolidDownArrow />
        </button>
      </div>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5" onClick={handleToggle}>
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {options.map((option, index) => (
              <div
                key={index}
                className="flex items-center justify-between px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
                onClick={() => handleOptionSelect(option)}
              >
                {option.icon}
                <span>{option.text}</span>
                <div className="flex items-center">
                  <button
                    type="button"
                    className="bg-[#27922e] hover:bg-[#165e1a] text-white rounded-lg h-6 w-6 flex items-center justify-center focus:outline-none"
                    onClick={(e) => {
                      handleDecrement(index);
                      handlePlusMinusClick(e);
                    }}
                  >
                    <AiOutlineMinus size={16} />
                  </button>
                  <span className="mx-2">
                    {selectedOption.text === option.text ? selectedOption.count : option.count}
                  </span>
                  <button
                    type="button"
                    className="bg-[#27922e] hover:bg-[#165e1a] text-white rounded-lg h-6 w-6 flex items-center justify-center focus:outline-none"
                    onClick={(e) => {
                      handleIncrement(index);
                      handlePlusMinusClick(e);
                    }}
                  >
                    <AiOutlinePlus size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
