import { useState } from "react";
import RoundTripForm from "./RoundTripForm";
import MultiCityForm from "./MultiCityForm";
import { MdFlight } from "react-icons/md";
import OneWayForm from "./OneWayForm";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="flex justify-center bg-white w-3/4 mx-auto p-6 rounded-lg shadow-2xl">
      <div className="w-full max-w-6xl">
        <div className="mb-8 flex items-center gap-1">
          <MdFlight className="w-8 h-8 text-[#27922e]" />
          <span className="font-semibold text-base">Flights</span>
        </div>
        <div className="flex mb-4">
          <button
            className={`${
              activeTab === 0 ? "bg-[#e7fddc] text-[#27922e]" : "bg-gray-200"
            }  px-4 py-2 mr-1 rounded-full`}
            onClick={() => handleTabClick(0)}
          >
            One-way
          </button>
          <button
            className={`${
              activeTab === 1 ? "bg-[#e7fddc] text-[#27922e]" : "bg-gray-200"
            }  px-4 py-2 mr-1 rounded-full`}
            onClick={() => handleTabClick(1)}
          >
            Round-trip
          </button>
          <button
            className={`${
              activeTab === 2 ? "bg-[#e7fddc] text-[#27922e]" : "bg-gray-200"
            }  px-4 py-2 mr-1 rounded-full`}
            onClick={() => handleTabClick(2)}
          >
            Multi-city
          </button>
        </div>
        {activeTab === 0 && <OneWayForm />}
        {activeTab === 1 && <RoundTripForm />}
        {activeTab === 2 && <MultiCityForm />}
      </div>
    </div>
  );
};

export default Tabs;