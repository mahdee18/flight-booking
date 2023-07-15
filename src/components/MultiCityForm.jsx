import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaExchangeAlt } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { TiDelete } from "react-icons/ti";
import cities from "../../public/airport_autosuggetion.json";
import AllDropdowns from "./AllDropdowns";
import AOS from "aos";
import "aos/dist/aos.css";

const MultiCityForm = () => {
  const [formFields, setFormFields] = useState({
    0: { from: "", to: "", departure: null },
    1: { from: "", to: "", departure: null },
  });

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  const handleFromChange = (e, index) => {
    setFormFields((prevState) => ({
      ...prevState,
      [index]: {
        ...prevState[index],
        from: e.target.value,
      },
    }));
  };

  const handleToChange = (e, index) => {
    setFormFields((prevState) => ({
      ...prevState,
      [index]: {
        ...prevState[index],
        to: e.target.value,
      },
    }));
  };

  const handleDepartureChange = (date, index) => {
    setFormFields((prevState) => ({
      ...prevState,
      [index]: {
        ...prevState[index],
        departure: date,
      },
    }));
  };

  const handleFromSelect = (city, index) => {
    setFormFields((prevState) => ({
      ...prevState,
      [index]: {
        ...prevState[index],
        from: city.city_name + ", " + city.country_name,
      },
    }));
  };

  const handleToSelect = (city, index) => {
    setFormFields((prevState) => ({
      ...prevState,
      [index]: {
        ...prevState[index],
        to: city.city_name + ", " + city.country_name,
      },
    }));
  };

  const handleExchangeFields = (index) => {
    setFormFields((prevState) => ({
      ...prevState,
      [index]: {
        ...prevState[index],
        from: prevState[index].to,
        to: prevState[index].from,
      },
    }));
  };

  const handleClearDeparture = (index) => {
    setFormFields((prevState) => ({
      ...prevState,
      [index]: {
        ...prevState[index],
        departure: null,
      },
    }));
  };

  const handleAddField = () => {
    const lastIndex = Object.keys(formFields).length - 1;
    setFormFields((prevState) => ({
      ...prevState,
      [lastIndex + 1]: { from: "", to: "", departure: null },
    }));
    AOS.refresh();
  };

  const handleRemoveField = (index) => {
    const updatedFields = { ...formFields };
    delete updatedFields[index];
    setFormFields(updatedFields);
    AOS.refresh();
  };

  const CustomHeader = ({ date, decreaseMonth, increaseMonth, index }) => {
    const handleClear = index !== 0 ? handleClearDeparture : () => {};
    return (
      <div className="flex justify-between">
        <button onClick={decreaseMonth}>{"<"}</button>
        <div>
          {date.toLocaleString("default", { month: "long", year: "numeric" })}
        </div>
        <button onClick={increaseMonth}>{">"}</button>
        <button onClick={() => handleClear(index)}>Clear</button>
      </div>
    );
  };

  return (
    <>
      <div className="flex justify-end mb-2 relative" data-aos="fade-up">
        <button
          className="absolute bottom-[10px] text-[#27922e] border border-[#27922e] hover:bg-[#e7fddc] font-bold py-2 px-6 rounded-md focus:outline-none focus:shadow-outline"
          type="button"
          onClick={handleAddField}
        >
          + Add Flight
        </button>
      </div>
      {Object.keys(formFields).map((index) => {
        const field = formFields[index];
        return (
          <div className="-mb-5" key={index} data-aos="fade-up">
            <form className="px-8">
              <div className="flex flex-col md:flex-row mb-4 mx-auto w-11/12">
                <div className="md:w-1/2 pr-2 mb-2 md:mb-0">
                  <div className="relative flex">
                    <input
                      className="relative text-sm placeholder-transparent transition-all outline-none peer disabled:cursor-not-allowed shadow appearance-none border rounded w-full py-3.5 px-3 text-gray-700 text-[18px] leading-tight focus:outline-none focus:shadow-outline font-semibold"
                      id={`from-${index}`}
                      type="text"
                      placeholder="From"
                      value={field.from}
                      onChange={(e) => handleFromChange(e, index)}
                    />
                    <label className="absolute left-2 -top-4 z-[1] px-2 text-xs transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:content-['\00a0*'] peer-focus:-top-4 peer-focus:text-x peer-disabled:cursor-not-allowed peer-disabled:before:bg-transparent font-semibold text-[17px] text-gray-700 mt-1.5">
                      From
                    </label>
                    <button
                      className="border-2 border-gray-300 font-bold py-4 px-4 ml-2 rounded-full text-gray-400 focus:outline-none focus:shadow-outline"
                      type="button"
                      onClick={() => handleExchangeFields(index)}
                    >
                      <FaExchangeAlt />
                    </button>
                  </div>
                  {field.from && (
                    <ul className="mt-2">
                      {cities
                        .filter((city) =>
                          city.city_name
                            .toLowerCase()
                            .includes(field.from.toLowerCase())
                        )
                        .map((city) => (
                          <div
                            key={city.code}
                            className="cursor-pointer py-3 text-gray-800 hover:bg-[#e7fddc] flex items-center gap-2 md:w-[400px]"
                            onClick={() => handleFromSelect(city, index)}
                          >
                            <span className="flex items-center gap-2">
                              <MdLocationOn className="w-5 h-5 text-[#27922e]" />
                              {city.city_name}, {city.country_name}
                            </span>
                            <span>{city.code}</span>
                          </div>
                        ))}
                    </ul>
                  )}
                </div>
                <div className="md:w-1/2 pr-2">
                  <div className="flex relative">
                    <input
                      className="relative text-sm placeholder-transparent transition-all outline-none peer disabled:cursor-not-allowed shadow appearance-none border rounded w-full py-3.5 px-3 text-gray-700 text-[18px] leading-tight focus:outline-none focus:shadow-outline font-semibold"
                      id={`to-${index}`}
                      type="text"
                      placeholder="To"
                      value={field.to}
                      onChange={(e) => handleToChange(e, index)}
                    />
                    <label className="absolute left-2 -top-4 z-[1] px-2 text-xs transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:content-['\00a0*'] peer-focus:-top-4 peer-focus:text-x peer-disabled:cursor-not-allowed peer-disabled:before:bg-transparent font-semibold text-[16px] text-gray-700 mt-1.5">
                      To
                    </label>
                  </div>
                  {field.to && (
                    <ul className="mt-2">
                      {cities
                        .filter((city) =>
                          city.city_name
                            .toLowerCase()
                            .includes(field.to.toLowerCase())
                        )
                        .map((city) => (
                          <div
                            key={city.code}
                            className="cursor-pointer py-3 text-gray-800 hover:bg-[#e7fddc] flex items-center gap-2 md:w-[400px]"
                            onClick={() => handleToSelect(city, index)}
                          >
                            <span className="flex items-center gap-2">
                              <MdLocationOn className="w-5 h-5 text-[#27922e]" />
                              {city.city_name}, {city.country_name}
                            </span>
                            <span>{city.code}</span>
                          </div>
                        ))}
                    </ul>
                  )}
                </div>
                <div className="md:w-1/2 pr-2 mt-2 md:mt-0">
                  <DatePicker
                    id={`departure-${index}`}
                    selected={field.departure}
                    onChange={(date) => handleDepartureChange(date, index)}
                    dateFormat="EEE, dd MMM yyyy"
                    placeholderText="Departure"
                    className="shadow appearance-none border rounded w-full py-3.5 px-3 text-[16px] leading-tight focus:outline-none focus:shadow-outline"
                    minDate={new Date()}
                    renderCustomHeader={({
                      date,
                      decreaseMonth,
                      increaseMonth,
                    }) => (
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
                  <div className="flex justify-end -me-20">
                    <button
                      className="py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="button"
                      onClick={() => handleRemoveField(index)}
                    >
                      <TiDelete className="h-9 w-9 text-[#767676] hover:text-black" />
                    </button>
                  </div>
                )}
              </div>
            </form>
          </div>
        );
      })}
      <div
        className="flex flex-col md:flex-row items-center justify-end gap-16"
        data-aos="fade-up"
      >
        <AllDropdowns />
      </div>
    </>
  );
};

export default MultiCityForm;
