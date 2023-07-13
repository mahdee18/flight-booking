import React, { useState } from 'react';
import OneWayForm from './OneWayForm';
import RoundTripForm from './RoundTripForm';
import MultiCityForm from './MultiCityForm';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-6xl">
        <div className="flex mb-4">
          <button
            className={`${
              activeTab === 0 ? 'bg-blue-500' : 'bg-gray-200'
            } text-white px-4 py-2 mr-1 rounded-l`}
            onClick={() => handleTabClick(0)}
          >
            One-way
          </button>
          <button
            className={`${
              activeTab === 1 ? 'bg-blue-500' : 'bg-gray-200'
            } text-white px-4 py-2 mx-1`}
            onClick={() => handleTabClick(1)}
          >
            Round-trip
          </button>
          <button
            className={`${
              activeTab === 2 ? 'bg-blue-500' : 'bg-gray-200'
            } text-white px-4 py-2 ml-1 rounded-r`}
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
