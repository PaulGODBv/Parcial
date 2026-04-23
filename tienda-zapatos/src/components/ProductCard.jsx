function ProductCard({ product, onAddToCart }) {
  if (!product) return null;

  const handleClick = () => {
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  return (
    <div className="product-card">
      <img
        src={product.image || "https://img.freepik.com/vector-gratis/dibujado-mano-ilustracion-dibujos-animados-zapatos-correr_23-2150985777.jpg?semt=ais_hybrid&w=740&q=80"}
        alt={product.name || "Producto"}
        className="product-image"
      />
      <div className="product-info">
        <h3>{product.name || "Sin nombre"}</h3>
        <p className="product-price">
          ${product.price ? product.price.toFixed(2) : "0.00"}
        </p>
        <p className="product-category">
          {product.category || "Sin categoría"}
        </p>
        <button className="add-button" onClick={handleClick}>
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
}

export default ProductCard;