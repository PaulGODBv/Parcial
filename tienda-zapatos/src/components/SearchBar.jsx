import { useState } from "react";

function SearchBar({ onSearch }) {
  const [searchText, setSearchText] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchText(value);

    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Buscar zapatos..."
        value={searchText}
        onChange={handleInputChange}
        className="search-input"
      />
    </div>
  );
}

export default SearchBar;