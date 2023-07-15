import { useState } from "react";
import { MdFlight } from "react-icons/md";
import OneWayForm from "./OneWayForm";
import RoundTripForm from "./RoundTripForm";
import MultiCityForm from "./MultiCityForm";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="flex justify-center bg-white w-full md:w-3/4 mx-auto p-6 rounded-lg shadow-2xl">
      <div className="w-full max-w-6xl">
        <div className="mb-8 flex items-center gap-1">
          <div className="flight-icon-wrapper">
            <MdFlight className="w-8 h-8 text-[#27922e]" />
          </div>
          <span className="font-semibold text-base">Flights</span>
        </div>
        <div className="flex flex-wrap mb-4">
          <button
            className={`${
              activeTab === 0 ? "bg-[#e7fddc] text-[#27922e]" : "bg-gray-200"
            }  px-4 py-2 mr-1 mb-2 rounded-full`}
            onClick={() => handleTabClick(0)}
          >
            One-way
          </button>
          <button
            className={`${
              activeTab === 1 ? "bg-[#e7fddc] text-[#27922e]" : "bg-gray-200"
            }  px-4 py-2 mr-1 mb-2 rounded-full`}
            onClick={() => handleTabClick(1)}
          >
            Round-trip
          </button>
          <button
            className={`${
              activeTab === 2 ? "bg-[#e7fddc] text-[#27922e]" : "bg-gray-200"
            }  px-4 py-2 mr-1 mb-2 rounded-full`}
            onClick={() => handleTabClick(2)}
          >
            Multi-city
          </button>
        </div>
        <div className="flex flex-col space-y-4">
          {activeTab === 0 && <OneWayForm />}
          {activeTab === 1 && <RoundTripForm />}
          {activeTab === 2 && <MultiCityForm />}
        </div>
      </div>
    </div>
  );
};

export default Tabs;
