import React from "react";
import { HiLocationMarker } from "react-icons/hi";

const SearchBar = ({ filter, setFilter, onSearch }) => {
  const handleSearch = () => {
    if (onSearch) {
      onSearch(filter);
    }
  };

  return (
    <div className="flexCenter search-bar">
      <HiLocationMarker color="var(--red)" size={25} />
      <input
        placeholder="Search by name, city, or country..."
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
      />
      <button
        className="button"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
