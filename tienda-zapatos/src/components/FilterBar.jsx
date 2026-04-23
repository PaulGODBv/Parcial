import { useState } from "react";

function FilterBar({ currentFilter, onFilterChange, onPriceChange }) {
  const categories = ["Todos", "Deportivo", "Formal", "Casual", "Botas"];
  const [selectedPrice, setSelectedPrice] = useState("all");

  const handleFilterChange = (category) => {
    onFilterChange(category);
  };

  const handlePriceFilter = (priceRange) => {
    // Lógica de toggle: si ya está seleccionado, lo deselecciona
    const newPrice = selectedPrice === priceRange ? "all" : priceRange;
    setSelectedPrice(newPrice);
    
    // Notificamos al componente padre del cambio
    if (onPriceChange) {
      onPriceChange(newPrice);
    }
  };

  return (
    <div className="filter-bar">
      <div className="category-filters">
        <span>Filtrar por:</span>
        {categories.map((cat) => (
          <button
            key={cat}
            className={currentFilter === cat ? "active" : ""}
            onClick={() => handleFilterChange(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="price-filters">
        <span>Precio:</span>
        <button
          className={selectedPrice === "low" ? "active" : ""}
          onClick={() => handlePriceFilter("low")}
        >
          Menor a $80
        </button>
        <button
          className={selectedPrice === "medium" ? "active" : ""}
          onClick={() => handlePriceFilter("medium")}
        >
          $80 - $130
        </button>
        <button
          className={selectedPrice === "high" ? "active" : ""}
          onClick={() => handlePriceFilter("high")}
        >
          Mayor a $130
        </button>
      </div>
    </div>
  );
}

export default FilterBar;
