import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaExchangeAlt} from 'react-icons/fa';
import { MdLocationOn } from "react-icons/md";
import cities from '../../public/airport_autosuggetion.json';

const OneWayForm = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departure, setDeparture] = useState(null);

  const handleFromChange = (e) => {
    setFrom(e.target.value);
  };

  const handleToChange = (e) => {
    setTo(e.target.value);
  };

  const handleDepartureChange = (date) => {
    setDeparture(date);
  };

  const handleFromSelect = (city) => {
    setFrom(city.city_name + ', ' + city.country_name);
  };

  const handleToSelect = (city) => {
    setTo(city.city_name + ', ' + city.country_name);
  };

  const handleExchangeFields = () => {
    const tempFrom = from;
    setFrom(to);
    setTo(tempFrom);
  };

  const handleClearDeparture = () => {
    setDeparture(null);
  };

  const CustomHeader = ({ date, decreaseMonth, increaseMonth }) => {
    return (
      <div className="flex justify-between">
        <button onClick={decreaseMonth}>{'<'}</button>
        <div>{date.toLocaleString('default', { month: 'long', year: 'numeric' })}</div>
        <button onClick={increaseMonth}>{'>'}</button>
        <button onClick={handleClearDeparture}>Clear</button>
      </div>
    );
  };

  return (
    <form className=" bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="flex mb-4 mx-auto w-11/12">
        <div className="w-1/3 pr-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="from">
            From
          </label>
          <div className="flex ">
            <input
              className="shadow appearance-none border rounded w-full py-1.5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="from"
              type="text"
              placeholder="From"
              value={from}
              onChange={handleFromChange}
            />
            <button
              className="border border-2 border-gray-300 font-bold py-4 px-4 ml-2 rounded-full text-gray-400 focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleExchangeFields}
            >
              <FaExchangeAlt />
            </button>
          </div>
          {from && (
            <ul className="mt-2">
              {cities
                .filter((city) => city.city_name.toLowerCase().includes(from.toLowerCase()))
                .map((city) => (
                  <li
                    key={city.code}
                    className="cursor-pointer py-1 px-2 text-gray-800 hover:bg-gray-200 flex items-center gap-2"
                    onClick={() => handleFromSelect(city)}
                  >
                   <MdLocationOn></MdLocationOn> {city.city_name}, {city.country_name}
                  </li>
                ))}
            </ul>
          )}
        </div>
        <div className="w-1/3 pr-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="to">
            To
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-3.5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="to"
            type="text"
            placeholder="To"
            value={to}
            onChange={handleToChange}
          />
          {to && (
            <ul className="mt-2">
              {cities
                .filter((city) => city.city_name.toLowerCase().includes(to.toLowerCase()))
                .map((city) => (
                  <li
                    key={city.code}
                    className="cursor-pointer py-1 px-2 text-gray-800 hover:bg-gray-200 flex items-center gap-2"
                    onClick={() => handleToSelect(city)}
                  >
                    <MdLocationOn></MdLocationOn> {city.city_name}, {city.country_name}
                  </li>
                ))}
            </ul>
          )}
        </div>
        <div className="w-1/3">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="departure">
            Departure
          </label>
          <DatePicker
            id="departure"
            selected={departure}
            onChange={handleDepartureChange}
            dateFormat="EEE, dd MMM yyyy"
            placeholderText="Departure"
            className="shadow appearance-none border rounded w-full py-3.5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            minDate={new Date()}
            renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
              <CustomHeader date={date} decreaseMonth={decreaseMonth} increaseMonth={increaseMonth} />
            )}
          />
        </div>
      </div>
      <div className="flex items-end justify-end">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default OneWayForm;
