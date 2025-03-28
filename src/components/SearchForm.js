import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// CustomHeader Component
const CustomHeader = ({
  date,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}) => (
  <div className="custom-header">
    <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
      &#x25C0; {/* Left arrow */}
    </button>
    <span>
      {date.toLocaleString('default', { month: 'long', year: 'numeric' })}
    </span>
    <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
      &#x25B6; {/* Right arrow */}
    </button>
  </div>
);

const SearchForm = ({ onSearch }) => {
  const initialCriteria = {
    type: '',
    minPrice: '',
    maxPrice: '',
    minBedrooms: '',
    maxBedrooms: '',
    postcode: '',
    dateAfter: null,
    dateBefore: null,
  };

  const [criteria, setCriteria] = useState(initialCriteria);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Format dates as ISO strings (or any format that your search function expects)
    const searchCriteria = {
      ...criteria,
      dateAfter: criteria.dateAfter ? criteria.dateAfter.toISOString() : null,
      dateBefore: criteria.dateBefore ? criteria.dateBefore.toISOString() : null,
    };
    console.log("Search criteria submitted:", searchCriteria);
    onSearch(searchCriteria);
  };

  const handleInputChange = (e, field) => {
    setCriteria({
      ...criteria,
      [field]: e.target.value,
    });
  };

  const handleReset = () => {
    setCriteria(initialCriteria);
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div className="form-grid">
        <label>
          Property Type:
          <select
            value={criteria.type}
            onChange={(e) => handleInputChange(e, 'type')}
          >
            <option value="">Any Type</option>
            <option value="House">House</option>
            <option value="Flat">Flat</option>
          </select>
        </label>
        <label>
          Min Price:
          <input
            type="number"
            placeholder="Min Price"
            value={criteria.minPrice}
            onChange={(e) => handleInputChange(e, 'minPrice')}
          />
        </label>
        <label>
          Max Price:
          <input
            type="number"
            placeholder="Max Price"
            value={criteria.maxPrice}
            onChange={(e) => handleInputChange(e, 'maxPrice')}
          />
        </label>
        <label>
          Min Bedrooms:
          <input
            type="number"
            placeholder="Min Bedrooms"
            value={criteria.minBedrooms}
            onChange={(e) => handleInputChange(e, 'minBedrooms')}
          />
        </label>
        <label>
          Max Bedrooms:
          <input
            type="number"
            placeholder="Max Bedrooms"
            value={criteria.maxBedrooms}
            onChange={(e) => handleInputChange(e, 'maxBedrooms')}
          />
        </label>
        <label>
          Postcode:
          <input
            type="text"
            placeholder="Postcode"
            value={criteria.postcode}
            onChange={(e) => handleInputChange(e, 'postcode')}
          />
        </label>
        <div className="date-picker-container">
          <label>
            Date Added After:
            <DatePicker
              selected={criteria.dateAfter}
              onChange={(date) => setCriteria({ ...criteria, dateAfter: date })}
              placeholderText="Date Added After"
              minDate={new Date(2000, 0, 1)}
              maxDate={new Date(2030, 11, 31)}
              renderCustomHeader={(props) => <CustomHeader {...props} />}
            />
          </label>
          <label>
            Date Added Before:
            <DatePicker
              selected={criteria.dateBefore}
              onChange={(date) => setCriteria({ ...criteria, dateBefore: date })}
              placeholderText="Date Added Before"
              minDate={new Date(2000, 0, 1)}
              maxDate={new Date(2030, 11, 31)}
              renderCustomHeader={(props) => <CustomHeader {...props} />}
            />
          </label>
        </div>
        <div className="form-buttons">
          <button type="submit">Search</button>
          <button type="button" onClick={handleReset} className="reset-button">
            Reset
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
