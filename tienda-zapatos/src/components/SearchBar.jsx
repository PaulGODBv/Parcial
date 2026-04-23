import { useState } from "react";

function SearchBar({ onSearch }) {
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Buscar zapatos..."
        value={searchValue}
        onChange={handleInputChange}
        className="search-input"
      />
    </div>
  );
}

export default SearchBar;
