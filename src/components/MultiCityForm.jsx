import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaExchangeAlt } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { TiDelete } from "react-icons/ti";

import cities from '../../public/airport_autosuggetion.json';

const MultiCityForm = () => {
  const [formFields, setFormFields] = useState({
    0: { from: '', to: '', departure: null },
    1: { from: '', to: '', departure: null }
  });

  const handleFromChange = (e, index) => {
    setFormFields((prevState) => ({
      ...prevState,
      [index]: {
        ...prevState[index],
        from: e.target.value
      }
    }));
  };

  const handleToChange = (e, index) => {
    setFormFields((prevState) => ({
      ...prevState,
      [index]: {
        ...prevState[index],
        to: e.target.value
      }
    }));
  };

  const handleDepartureChange = (date, index) => {
    setFormFields((prevState) => ({
      ...prevState,
      [index]: {
        ...prevState[index],
        departure: date
      }
    }));
  };

  const handleFromSelect = (city, index) => {
    setFormFields((prevState) => ({
      ...prevState,
      [index]: {
        ...prevState[index],
        from: city.city_name + ', ' + city.country_name
      }
    }));
  };

  const handleToSelect = (city, index) => {
    setFormFields((prevState) => ({
      ...prevState,
      [index]: {
        ...prevState[index],
        to: city.city_name + ', ' + city.country_name
      }
    }));
  };

  const handleExchangeFields = (index) => {
    setFormFields((prevState) => ({
      ...prevState,
      [index]: {
        ...prevState[index],
        from: prevState[index].to,
        to: prevState[index].from
      }
    }));
  };

  const handleClearDeparture = (index) => {
    setFormFields((prevState) => ({
      ...prevState,
      [index]: {
        ...prevState[index],
        departure: null
      }
    }));
  };

  const handleAddField = () => {
    const lastIndex = Object.keys(formFields).length - 1;
    setFormFields((prevState) => ({
      ...prevState,
      [lastIndex + 1]: { from: '', to: '', departure: null }
    }));
  };

  const handleRemoveField = (index) => {
    const updatedFields = { ...formFields };
    delete updatedFields[index];
    setFormFields(updatedFields);
  };

  const CustomHeader = ({ date, decreaseMonth, increaseMonth, index }) => {
    const handleClear = index !== 0 ? handleClearDeparture : () => {};
    return (
      <div className="flex justify-between">
        <button onClick={decreaseMonth}>{'<'}</button>
        <div>{date.toLocaleString('default', { month: 'long', year: 'numeric' })}</div>
        <button onClick={increaseMonth}>{'>'}</button>
        <button onClick={() => handleClear(index)}>Clear</button>
      </div>
    );
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          className="bg-[#27922e] hover:bg-[#165e1a] text-white font-bold py-3 px-8 focus:outline-none focus:shadow-outline rounded-lg"
          type="button"
          onClick={handleAddField}
        >
          Add Flight
        </button>
      </div>
      {Object.keys(formFields).map((index) => {
        const field = formFields[index];
        return (
          <div className="mb-4" key={index}>
            <form className="bg-white rounded px-8 pb-8">
              <div className="flex mb-4 mx-auto w-11/12">
                <div className="w-1/3 pr-2">
                  <div className="flex">
                    <input
                      className="shadow appearance-none border rounded w-full py-1.5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id={`from-${index}`}
                      type="text"
                      placeholder="From"
                      value={field.from}
                      onChange={(e) => handleFromChange(e, index)}
                    />
                    <button
                      className="border border-2 border-gray-300 font-bold py-4 px-4 ml-2 rounded-full text-gray-400 focus:outline-none focus:shadow-outline"
                      type="button"
                      onClick={() => handleExchangeFields(index)}
                    >
                      <FaExchangeAlt />
                    </button>
                  </div>
                  {field.from && (
                    <ul className="mt-2">
                      {cities
                        .filter((city) => city.city_name.toLowerCase().includes(field.from.toLowerCase()))
                        .map((city) => (
                          <li
                            key={city.code}
                            className="cursor-pointer py-1 px-2 text-gray-800 hover:bg-gray-200 flex items-center gap-2"
                            onClick={() => handleFromSelect(city, index)}
                          >
                            <MdLocationOn />
                            {city.city_name}, {city.country_name}
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
                <div className="w-1/3 pr-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-3.5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id={`to-${index}`}
                    type="text"
                    placeholder="To"
                    value={field.to}
                    onChange={(e) => handleToChange(e, index)}
                  />
                  {field.to && (
                    <ul className="mt-2">
                      {cities
                        .filter((city) => city.city_name.toLowerCase().includes(field.to.toLowerCase()))
                        .map((city) => (
                          <li
                            key={city.code}
                            className="cursor-pointer py-1 px-2 text-gray-800 hover:bg-gray-200 flex items-center gap-2"
                            onClick={() => handleToSelect(city, index)}
                          >
                            <MdLocationOn />
                            {city.city_name}, {city.country_name}
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
                <div className="w-1/3">
                  <DatePicker
                    id={`departure-${index}`}
                    selected={field.departure}
                    onChange={(date) => handleDepartureChange(date, index)}
                    dateFormat="EEE, dd MMM yyyy"
                    placeholderText="Departure"
                    className="shadow appearance-none border rounded w-full py-3.5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    minDate={new Date()}
                    renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
                      <CustomHeader
                        date={date}
                        decreaseMonth={decreaseMonth}
                        increaseMonth={increaseMonth}
                        index={index}
                      />
                    )}
                  />
                </div>
                {index >= 2 && (
                  <div className="flex justify-end">
                    <button
                      className=" py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="button"
                      onClick={() => handleRemoveField(index)}
                    >
                      <TiDelete className='h-10 w-10 text-gray-500 '></TiDelete>
                    </button>
                  </div>
                )}
              </div>
            </form>
          </div>
        );
      })}
      <div className="flex items-end justify-end">
        <button
          className="bg-[#27922e] hover:bg-[#165e1a] text-white font-bold py-3 px-8 focus:outline-none focus:shadow-outline rounded-full"
          type="button"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default MultiCityForm;
