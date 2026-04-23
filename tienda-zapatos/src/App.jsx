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
    image:
      "https://assets.adidas.com/images/w_600,f_auto,q_auto/553bc1c5fd204593ac3b13d71822deb8_9366/Tenis_Response_Runner_Blanco_IH6101.jpg",
    stock: 15,
  },
  {
    id: 2,
    name: "Zapato Formal Elegance",
    price: 129.99,
    category: "Formal",
    image:
      "https://www.villaromana.com.co/cdn/shop/products/ZA00104031_01.jpg?v=1750297129",
    stock: 8,
  },
  {
    id: 3,
    name: "Sandalia Summer Beach",
    price: 45.5,
    category: "Casual",
    image:
      "https://m.media-amazon.com/images/I/71s-tGJqAVS._AC_UF894,1000_QL80_.jpg",
    stock: 20,
  },
  {
    id: 4,
    name: "Bota Timber Classic",
    price: 159.99,
    category: "Botas",
    image:
      "https://assets.timberland.com/images/t_img/f_auto,h_1300,e_sharpen:60,w_1300/dpr_2.0/v1741199070/TB110061713-HERO/Mens-Timberland-Premium-6Inch-Waterproof-Boot-TBL-Wheat-Nubuck-HERO.png",
    stock: 5,
  },
  {
    id: 5,
    name: "Zapato Deportivo Pro",
    price: 110.0,
    category: "Deportivo",
    image:
      "https://assets.adidas.com/images/w_600,f_auto,q_auto/e138c7d37c9e4115ad18d7628079a77d_faec/Tenis_Adizero_Adios_Pro_4_Blanco_JR1094_db01_00_standard.jpg",
    stock: 12,
  },
  {
    id: 6,
    name: "Mocasín Comfort Plus",
    price: 75.0,
    category: "Casual",
    image:
      "https://media.falabella.com/falabellaCO/123581319_01/w=1500,h=1500,fit=cover",
    stock: 18,
  },
  {
    id: 7,
    name: "Zapato Formal Executive",
    price: 189.99,
    category: "Formal",
    image: "https://luzantiny.com/wp-content/uploads/2024/08/Zapato5-b.jpg",
    stock: 3,
  },
  {
    id: 8,
    name: "Botín Urban Style",
    price: 95.0,
    category: "Botas",
    image:
      "https://xti.com.co/wp-content/uploads/4703430-Botin-Danae-Blanco-Xti_05.jpg",
    stock: 10,
  },
];

function App() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState(productData);
  const [filter, setFilter] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [showCart, setShowCart] = useState(false);

  const [priceFilter, setPriceFilter] = useState("all");

  useEffect(() => {
    let filtered = productData;

    // 1. Filtro por Categoría
    if (filter !== "Todos") {
      filtered = filtered.filter((p) => p.category === filter);
    }

    // 2. Filtro por Búsqueda
    if (searchTerm !== "") {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // 3. NUEVO: Filtro por Precio
    if (priceFilter === "low") {
      filtered = filtered.filter((p) => p.price < 80);
    } else if (priceFilter === "medium") {
      filtered = filtered.filter((p) => p.price >= 80 && p.price <= 130);
    } else if (priceFilter === "high") {
      filtered = filtered.filter((p) => p.price > 130);
    }

    setProducts(filtered);
  }, [filter, searchTerm, priceFilter]);

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
    setCart(cart.filter((item) => item.id !== productId));
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
  };

  //Función para vaciar el carrito después de comprar
  const handleCheckout = () => {
    setCart([]);
    setShowCart(false); //cierra el carrito tras comprar
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
          <FilterBar 
            currentFilter={filter} 
            onFilterChange={setFilter} 
            onPriceChange={setPriceFilter} 
          />
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
          onCheckout={handleCheckout} 
        />
      )}
    </div>
  );
}

export default App;
