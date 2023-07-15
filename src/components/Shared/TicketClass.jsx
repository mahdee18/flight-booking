import { useState, useEffect, useRef } from "react";
import { BiSolidDownArrow } from "react-icons/bi";

const TicketClass = () => {
  const [selectedOption, setSelectedOption] = useState("Economy");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const options = [
    "Economy",
    "Premium Economy",
    "Business Class",
    "First Class",
  ];

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

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <button
          type="button"
          className="inline-flex items-center justify-center w-full rounded-md px-4 py-2 bg-white text-md font-medium text-gray-500 hover:bg-gray-200 focus:outline-none"
          onClick={handleToggle}
        >
          {selectedOption}
          <BiSolidDownArrow className="w-4 h-3 text-black" />
        </button>
      </div>
      {isOpen && (
        <div className="origin-top-right absolute -top-3 right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1 text-md"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {options.map((option) => (
              <div
                key={option}
                className={`${
                  option === selectedOption
                    ? "font-semibold text-md text-[#188920]"
                    : ""
                } cursor-pointer px-4 py-2 text-md hover:bg-gray-100`}
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