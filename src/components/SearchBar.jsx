import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"; // Import the CSS for the calendar

const SearchBar = ({ onSearch }) => {
    // Local state for the form inputs
    const [criteria, setCriteria] = useState({
        type: 'any',
        minPrice: 0,
        maxPrice: 1000000,
        minBedrooms: 0,
        maxBedrooms: 10,
        postcode: '',
        dateAfter: null,   // For "Added After"
        dateBefore: null   // For "Added Before"
    });

    // Update state for standard inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCriteria(prev => ({ ...prev, [name]: value }));
    };

    // Special handler for DatePickers
    const handleDateChange = (date, name) => {
        setCriteria(prev => ({ ...prev, [name]: date }));
    };

    // Send data to App.jsx
    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(criteria);
    };

    return (
        <section className='search-container'>
            <h1>Find Your Dream Home</h1>
            <form onSubmit={handleSubmit} className="search-form">
                
                {/* 1. Property Type */}
                <div className="form-group">
                    <label>Type</label>
                    <select name="type" value={criteria.type} onChange={handleChange}>
                        <option value="any">Any</option>
                        <option value="House">House</option>
                        <option value="Flat">Flat</option>
                        <option value="Bungalow">Bungalow</option>
                    </select>
                </div>

                {/* 2. Price Range */}
                <div className="form-group">
                    <label>Price Range</label>
                    <div className="min-max-group">
                        <input type="number" name="minPrice" placeholder="Min" onChange={handleChange} />
                        <input type="number" name="maxPrice" placeholder="Max" onChange={handleChange} />
                    </div>
                </div>

                {/* 3. Bedrooms */}
                <div className="form-group">
                    <label>Bedrooms</label>
                    <select name="minBedrooms" onChange={handleChange}>
                        <option value="0">Min Beds</option>
                        <option value="1">1+</option>
                        <option value="2">2+</option>
                        <option value="3">3+</option>
                        <option value="4">4+</option>
                        <option value="5">5+</option>
                    </select>
                </div>

                {/* 4. Postcode */}
                <div className="form-group">
                    <label>Postcode</label>
                    <input type="text" name="postcode" placeholder="e.g. BR1" onChange={handleChange} />
                </div>

                {/* 5. Date Added (The New Distinction Feature) */}
                <div className="form-group">
                    <label>Date Added</label>
                    <div className="date-group">
                        <DatePicker 
                            selected={criteria.dateAfter} 
                            onChange={(date) => handleDateChange(date, 'dateAfter')}
                            placeholderText="Added After"
                            dateFormat="dd/MM/yyyy"
                            className="date-input"
                        />
                        <DatePicker 
                            selected={criteria.dateBefore} 
                            onChange={(date) => handleDateChange(date, 'dateBefore')}
                            placeholderText="Added Before"
                            dateFormat="dd/MM/yyyy"
                            className="date-input"
                        />
                    </div>
                </div>

                <button type="submit">Search</button>
            </form>
        </section>
    );
};

export default SearchBar;