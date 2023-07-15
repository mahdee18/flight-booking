import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaExchangeAlt } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import cities from "../../public/airport_autosuggetion.json";
import AllDropdowns from "./AllDropdowns";

const OneWayForm = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
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
    setFrom(city.city_name + ", " + city.country_name);
  };

  const handleToSelect = (city) => {
    setTo(city.city_name + ", " + city.country_name);
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
        <button onClick={decreaseMonth}>{"<"}</button>
        <div>
          {date.toLocaleString("default", { month: "long", year: "numeric" })}
        </div>
        <button onClick={increaseMonth}>{">"}</button>
        <button onClick={handleClearDeparture}>Clear</button>
      </div>
    );
  };

  return (
    <form className="px-8 pt-2 pb-2">
      <div className="flex mb-4 mx-auto w-11/12">
        <div className="w-1/3 pr-2">
          <div className="flex relative">
            <input
              className="relative text-sm placeholder-transparent transition-all outline-none peer disabled:cursor-not-allowed shadow appearance-none border rounded w-full py-3.5 px-3 text-gray-700 text-[18px] leading-tight focus:outline-none focus:shadow-outline font-semibold"
              id="from"
              type="text"
              placeholder="From"
              value={from}
              onChange={handleFromChange}
            />
            <label className="absolute left-2 -top-4 z-[1] px-2 text-xs transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:content-['\00a0*'] peer-focus:-top-4 peer-focus:text-x peer-disabled:cursor-not-allowed peer-disabled:before:bg-transparent font-semibold text-[17px] text-gray-700 mt-1.5">
              From
            </label>
            <button
              className="border-2 border-gray-300 font-bold py-4 px-4 ml-2 rounded-full text-gray-400 focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleExchangeFields}
            >
              <FaExchangeAlt />
            </button>
          </div>
          {from && (
            <ul className="mt-2">
              {cities
                .filter((city) =>
                  city.city_name.toLowerCase().includes(from.toLowerCase())
                )
                .map((city) => (
                  <div
                    key={city.code}
                    className="cursor-pointer py-3 text-gray-800 hover:bg-[#e7fddc] flex items-center gap-2 md:w-[400px]"
                    onClick={() => handleFromSelect(city)}
                  >
                    <span className="flex items-center gap-2">
                      <MdLocationOn
                        className="w-6 h-6
                      
                      text-[#27922e]"
                      ></MdLocationOn>
                      {city.city_name}, {city.country_name}
                    </span>
                    <span>{city.code}</span>
                  </div>
                ))}
            </ul>
          )}
        </div>
        <div className="w-1/3 pr-2">
          <div className="relative flex">
            <input
              className="relative text-sm placeholder-transparent transition-all outline-none peer disabled:cursor-not-allowed shadow appearance-none border rounded w-full py-3.5 px-3 text-gray-700 text-[18px] leading-tight focus:outline-none focus:shadow-outline font-semibold"
              id="to"
              type="text"
              placeholder="To"
              value={to}
              onChange={handleToChange}
            />
            <label className="absolute left-2 -top-4 z-[1] px-2 text-xs transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:content-['\00a0*'] peer-focus:-top-4 peer-focus:text-x peer-disabled:cursor-not-allowed peer-disabled:before:bg-transparent font-semibold text-[16px] text-gray-700 mt-1.5">
              To
            </label>
          </div>
          {to && (
            <ul className="mt-2">
              {cities
                .filter((city) =>
                  city.city_name.toLowerCase().includes(to.toLowerCase())
                )
                .map((city) => (
                  <div
                    key={city.code}
                    className="cursor-pointer py-3 text-gray-800 hover:bg-[#e7fddc] flex items-center gap-2 md:w-[400px]"
                    onClick={() => handleToSelect(city)}
                  >
                    <span className="flex items-center gap-2">
                      <MdLocationOn className="w-5 h-5 text-[#27922e]"></MdLocationOn>
                      {city.country_name}
                    </span>
                    <span>{city.code}</span>
                  </div>
                ))}
            </ul>
          )}
        </div>
        <div className="w-1/3">
          <DatePicker
            id="departure"
            selected={departure}
            onChange={handleDepartureChange}
            dateFormat="EEE, dd MMM yyyy"
            placeholderText="Departure"
            className="shadow appearance-none border rounded w-full py-3.5 px-3 text-[16px] leading-tight focus:outline-none focus:shadow-outline font-semibold"
            minDate={new Date()}
            renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
              <CustomHeader
                date={date}
                decreaseMonth={decreaseMonth}
                increaseMonth={increaseMonth}
              />
            )}
          />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <AllDropdowns></AllDropdowns>
      </div>
    </form>
  );
};

export default OneWayForm;