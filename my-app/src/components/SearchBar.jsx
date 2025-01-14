import React, { useState, useEffect } from 'react';
import { FaSearch, FaTrashAlt } from 'react-icons/fa';

function SearchBar({ city, setCity, handleSearch, recentSearches, setRecentSearches }) {
  const [showDropdown, setShowDropdown] = useState(false);

  // Handle input change for city name
  const onInputChange = (e) => {
    setCity(e.target.value);
    setShowDropdown(e.target.value.trim() !== ''); // Show dropdown only if there's input
  };

  // Handle the search button click
  const onSearchButtonClick = (e) => {
    e.preventDefault();
    handleSearch(e); // Trigger the search
    setCity(''); // Clear the input field after search
    setShowDropdown(false); // Close the dropdown after search
  };

  // Handle recent search click
  const onRecentSearchClick = (searchTerm) => {
    setCity(searchTerm);
    handleSearch({ preventDefault: () => {} }); // Trigger search on recent search click
    setShowDropdown(false); // Close dropdown
  };

  // Limit to 5 recent searches for display
  const limitedRecentSearches = recentSearches.slice(0, 5);

  // Function to remove a recent search item
  const removeRecentSearch = (searchTerm) => {
    // Filter out the item to remove
    const updatedSearches = recentSearches.filter(search => search !== searchTerm);
    setRecentSearches(updatedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches)); // Persist to localStorage
  };

  return (  
    <div className="search-bar">
      <input
        type="text"
        value={city}
        onChange={onInputChange}
        placeholder="Enter city name"
      />
      <button onClick={onSearchButtonClick}>
        <FaSearch />
      </button>

      {/* Recent searches dropdown */}
      {showDropdown && limitedRecentSearches.length > 0 && (
        <div className="recent-searches-dropdown">
          <ul>
            {limitedRecentSearches.map((search, index) => (
              <li key={index}>
                <span onClick={() => onRecentSearchClick(search)}>{search}</span>
                <button className="remove-btn" onClick={() => removeRecentSearch(search)}>
                  <FaTrashAlt />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
