import { useState, useEffect, useRef } from "react";
import { BiSolidDownArrow } from "react-icons/bi";
import AOS from "aos";
import "aos/dist/aos.css";

const PaymentType = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  const options = [
    "MasterCard Credit",
    "Visa Credit",
    "American Express",
    "Bank Transfer",
    "Diners Club",
    "MasterCard Cirrus",
    "MasterCard Debit",
    "PayPal",
    "Visa Debit",
    "Cash Payment",
    "Western Union",
    "Bitcoin",
    "Easypaisa",
  ];

  const dropdownRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 500, once: true });
  }, []);

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

  const handleShowAll = (event) => {
    event.stopPropagation();
    setShowAll(!showAll);
  };

  const handleCheckboxChange = (option) => {
    if (selectedCheckboxes.includes(option)) {
      setSelectedCheckboxes(
        selectedCheckboxes.filter((item) => item !== option)
      );
    } else {
      setSelectedCheckboxes([...selectedCheckboxes, option]);
    }
  };

  const handleApply = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <button
          type="button"
          className="inline-flex items-center justify-center w-full rounded-md px-4 py-2 bg-white text-md font-medium text-gray-500 hover:bg-gray-200 focus:outline-none"
          onClick={handleToggle}
          data-aos="fade-right"
          data-aos-duration="300"
        >
          {selectedCheckboxes.length > 0
            ? `${selectedCheckboxes.length} Payment Types `
            : "Payment Types"}{" "}
          <BiSolidDownArrow className="w-4 h-3 text-black"></BiSolidDownArrow>
        </button>
      </div>
      {isOpen && (
        <div
          className="origin-top-right absolute -top-3 right-0 mt-2 md:w-[25rem] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-5"
          data-aos="fade-right"
          data-aos-duration="300"
        >
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <span className="text-xs text-[#767676]">
              By Selecting One Or More (Max 10) Payment Types, Prices On Wego
              Will Include Applicable Minimum Payment Fee. Please Note That Not
              All Providers Support All Payment Types.
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 mt-4">
              {options.slice(0, showAll ? options.length : 6).map((option) => (
                <div
                  key={option}
                  className="flex items-center px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 text-[#1d1d1d]"
                  role="menuitem"
                  onClick={() => handleCheckboxChange(option)}
                >
                  <input
                    type="checkbox"
                    className="chk mr-2 w-4 h-4 sm:w-5 sm:h-5 rounded form-checkbox"
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
              className="w-full py-2 text-sm text-[#47b610] font-semibold flex justify-start"
              onClick={handleShowAll}
            >
              + Show More
            </button>
          )}
          {showAll && (
            <button
              type="button"
              className="w-full py-2 text-sm text-[#47b610] font-semibold flex justify-start"
              onClick={handleShowAll}
            >
              - Show Less
            </button>
          )}
          <span className="text-xs text-[#767676]">
            Tips: To Find Popular Payment Types, You Can Change Your
            "Country" Setting (Located On Top-Right Menu).
          </span>
          <hr className="my-4" />
          <button
            type="button"
            onClick={handleApply}
            className="text-[#47b610] font-semibold flex ms-auto"
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentType;
