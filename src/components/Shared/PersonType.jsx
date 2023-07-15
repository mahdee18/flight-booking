import { useState, useEffect, useRef } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BiSolidDownArrow } from "react-icons/bi";
import { VscPerson } from "react-icons/vsc";
import { PiPerson } from "react-icons/pi";

const PersonType = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState({
    text: "Adult",
    count: 1,
  });
  const [options, setOptions] = useState([
    {
      text: "Adults",
      subText: ">12 Years",
      count: 0,
      icon: <VscPerson className="h-7 w-7" />,
    },
    {
      text: "Children",
      subText: "2-12 Years",
      count: 0,
      icon: <PiPerson className="h-7 w-7" />,
    },
    {
      text: "Infants",
      subText: "<2 Years",
      count: 0,
      icon: <PiPerson className="h-7 w-7" />,
    },
  ]);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

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

  const handleApply = () => {
    setIsOpen(false);
    // Add your apply logic here
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <button
          type="button"
          className="inline-flex items-center justify-center w-full rounded-md px-4 py-2 bg-white text-md font-medium text-gray-500 hover:bg-gray-200 focus:outline-none"
          onClick={handleToggle}
        >
          {selectedOption.count}<span className="ml-1">{selectedOption.text}</span>
          <BiSolidDownArrow className="w-4 h-3 text-black" />
        </button>
      </div>
      {isOpen && (
        <div
          className="origin-top-right absolute -top-3 right-0 mt-2 w-[230px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-4 px-1"
          onClick={handleToggle}
        >
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {options.map((option, index) => (
              <div
                key={index}
                className="flex items-center justify-between px-4 py-2 text-md cursor-pointer text-[#8e8e8e]"
                onClick={() => handleOptionSelect(option)}
              >
                <div className="flex items-center">
                  <span className="text-gray-500">{option.icon}</span>
                  <div className="ml-2 flex flex-col items-start justify-start">
                    <span className="text-lg">{option.text}</span>
                    <span className="text-xs">{option.subText}</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <button
                    type="button"
                    className="bg-gray-400 text-white rounded-lg h-6 w-6 flex items-center justify-center focus:outline-none"
                    onClick={(e) => {
                      handleDecrement(index);
                      handlePlusMinusClick(e);
                    }}
                  >
                    <AiOutlineMinus size={16} />
                  </button>
                  <span className="mx-2">
                    {selectedOption.text === option.text
                      ? selectedOption.count
                      : option.count}
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
            <hr className="my-2" />
            <button
              type="button"
              className="text-[#47b610] font-semibold flex ms-auto me-4"
              onClick={handleApply}
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonType;