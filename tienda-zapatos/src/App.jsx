import { useState, useEffect } from "react";
import "./App.css";
import ProductCard from "./components/ProductCard";
import ShoppingCart from "./components/ShoppingCart";
import FilterBar from "./components/FilterBar";
import SearchBar from "./components/SearchBar";

const productData = [
  {
    id: 1,
    name: "Zapato Deportivo Runner",
    price: 89.99,
    category: "Deportivo",
    image: "https://via.placeholder.com/300",
    stock: 15,
  },
  {
    id: 2,
    name: "Zapato Formal Elegance",
    price: 129.99,
    category: "Formal",
    image: "https://via.placeholder.com/300",
    stock: 8,
  },
  {
    id: 3,
    name: "Sandalia Summer Beach",
    price: 45.5,
    category: "Casual",
    image: "https://via.placeholder.com/300",
    stock: 20,
  },
  {
    id: 4,
    name: "Bota Timber Classic",
    price: 159.99,
    category: "Botas",
    image: "https://via.placeholder.com/300",
    stock: 5,
  },
  {
    id: 5,
    name: "Zapato Deportivo Pro",
    price: 110.0,
    category: "Deportivo",
    image: "https://via.placeholder.com/300",
    stock: 12,
  },
  {
    id: 6,
    name: "Mocasín Comfort Plus",
    price: 75.0,
    category: "Casual",
    image: "https://via.placeholder.com/300",
    stock: 18,
  },
  {
    id: 7,
    name: "Zapato Formal Executive",
    price: 189.99,
    category: "Formal",
    image: "https://via.placeholder.com/300",
    stock: 3,
  },
  {
    id: 8,
    name: "Botín Urban Style",
    price: 95.0,
    category: "Botas",
    image: "https://via.placeholder.com/300",
    stock: 10,
  },
];

function App() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState(productData);
  const [filter, setFilter] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [showCart, setShowCart] = useState(false);
  const [x, setX] = useState(0);

  useEffect(() => {
    console.log("Products loaded");
  }, []);

  useEffect(() => {
    const filtered = productData.filter((product) => {
      if (filter !== "Todos" && product.category !== filter) {
        return false;
      }
      return true;
    });
    setProducts(filtered);
  }, [filter]);

  useEffect(() => {
    setX(x + 1);
  }, [products]);

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(
      cart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    const results = productData.filter((p) =>
      p.name.toLowerCase().includes(term.toLowerCase()),
    );
    setProducts(results);
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Tienda de Zapatos</h1>
        <button className="cart-button" onClick={() => setShowCart(!showCart)}>
          Carrito ({cart.length})
        </button>
      </header>

      <main className="main-content">
        <div className="filters-section">
          <SearchBar onSearch={handleSearch} />
          <FilterBar currentFilter={filter} onFilterChange={setFilter} />
        </div>

        <div className="products-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </main>

      {showCart && (
        <ShoppingCart
          cart={cart}
          onRemove={removeFromCart}
          onUpdateQuantity={updateQuantity}
          onClose={() => setShowCart(false)}
          total={getTotal}
        />
      )}
    </div>
  );
}

export default App;
