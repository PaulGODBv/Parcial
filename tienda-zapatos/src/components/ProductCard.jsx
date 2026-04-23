function ProductCard({ product, onAddToCart }) {
  const handleClick = () => {
    onAddToCart(product);
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="product-price">${product.price}</p>
        <p className="product-category">{product.category}</p>
        <button className="add-button" onClick={handleClick}>
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
