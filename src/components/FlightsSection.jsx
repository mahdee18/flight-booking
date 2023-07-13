import React, { useState } from 'react';
import flightData from '../../public/airport_autosuggetion.json';
import Autosuggest from 'react-autosuggest';

const FlightBookingForm = () => {
  const [flightType, setFlightType] = useState('one-way');
  const [departureLocation, setDepartureLocation] = useState('');
  const [arrivalLocation, setArrivalLocation] = useState('');
  const [passengerCount, setPassengerCount] = useState(1);
  const [flightClass, setFlightClass] = useState('economy');
  const [additionalSections, setAdditionalSections] = useState([]);

  const handleFlightTypeChange = (event) => {
    setFlightType(event.target.value);
  };

  const handleDepartureLocationChange = (event) => {
    setDepartureLocation(event.target.value);
  };

  const handleArrivalLocationChange = (event, { newValue }) => {
    setArrivalLocation(newValue);
  };

  const handlePassengerCountChange = (event) => {
    setPassengerCount(parseInt(event.target.value));
  };

  const handleFlightClassChange = (event) => {
    setFlightClass(event.target.value);
  };

  const addFlightSection = () => {
    setAdditionalSections([...additionalSections, additionalSections.length + 1]);
  };

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : flightData.filter(
          (flight) =>
            flight.city_name.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  const getSuggestionValue = (suggestion) => suggestion.city_name;

  const renderSuggestion = (suggestion) => <span>{suggestion.city_name}</span>;

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected = (_, { suggestion }) => {
    setArrivalLocation(suggestion.city_name);
  };

  const inputProps = {
    placeholder: 'Enter location',
    value: arrivalLocation,
    onChange: handleArrivalLocationChange,
  };

  const [suggestions, setSuggestions] = useState([]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">Flight Booking</h1>

      {/* Flight Type */}
      <div className="mb-4">
        <label htmlFor="flight-type" className="block font-medium mb-2">
          Flight Type:
        </label>
        <select
          id="flight-type"
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          value={flightType}
          onChange={handleFlightTypeChange}
        >
          <option value="one-way">One-Way</option>
          <option value="round-trip">Round Trip</option>
          <option value="multiple-sections">Multiple Sections</option>
        </select>
      </div>

      {/* Departure Location */}
      <div className="mb-4">
        <label htmlFor="departure-location" className="block font-medium mb-2">
          Departure:
        </label>
        <select
          id="departure-location"
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          value={departureLocation}
          onChange={handleDepartureLocationChange}
        >
          {flightData.map((flight) => (
            <option key={flight.code} value={flight.code}>
              {flight.city_name}
            </option>
          ))}
        </select>
      </div>

      {/* Arrival Location */}
      <div className="mb-4">
        <label htmlFor="arrival-location" className="block font-medium mb-2">
          Arrival:
        </label>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          onSuggestionSelected={onSuggestionSelected}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
      </div>

      {/* Passenger Count */}
      <div className="mb-4">
        <label htmlFor="passenger-count" className="block font-medium mb-2">
          Passengers:
        </label>
        <input
          type="number"
          id="passenger-count"
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          min="1"
          value={passengerCount}
          onChange={handlePassengerCountChange}
        />
      </div>

      {/* Flight Class */}
      <div className="mb-4">
        <label htmlFor="flight-class" className="block font-medium mb-2">
          Class:
        </label>
        <select
          id="flight-class"
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          value={flightClass}
          onChange={handleFlightClassChange}
        >
          <option value="economy">Economy</option>
          <option value="premium">Premium</option>
          <option value="business">Business</option>
          <option value="first">First</option>
        </select>
      </div>

      {/* Additional Sections */}
      {flightType === 'multiple-sections' && (
        <div className="mb-4">
          <button
            onClick={addFlightSection}
            className="px-4 py-2 text-white bg-blue-500 rounded-md"
          >
            Add Flight Section
          </button>
          {additionalSections.map((section) => (
            <div key={section} className="mt-4">
              <h3 className="text-lg font-medium mb-2">Flight Section {section}</h3>
              <div className="mb-2">
                <label htmlFor={`departure-location-${section}`} className="block font-medium mb-1">
                  Departure:
                </label>
                <select
                  id={`departure-location-${section}`}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  value={departureLocation}
                  onChange={handleDepartureLocationChange}
                >
                  {flightData.map((flight) => (
                    <option key={flight.code} value={flight.code}>
                      {flight.city_name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor={`arrival-location-${section}`} className="block font-medium mb-1">
                  Arrival:
                </label>
                <Autosuggest
                  suggestions={suggestions}
                  onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                  onSuggestionsClearRequested={onSuggestionsClearRequested}
                  onSuggestionSelected={onSuggestionSelected}
                  getSuggestionValue={getSuggestionValue}
                  renderSuggestion={renderSuggestion}
                  inputProps={inputProps}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Submit Button */}
      <button className="px-4 py-2 text-white bg-blue-500 rounded-md">Search Flights</button>
    </div>
  );
};

export default FlightBookingForm;
