import { useState, useEffect } from "react";

function ShoppingCart({ cart, onRemove, onUpdateQuantity, onClose, total }) {
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const sum = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setCartTotal(sum);
  }, []);

  const handleCheckout = () => {
    alert("Compra realizada con éxito");
    cart = [];
  };

  const getSubtotal = (price, qty) => {
    return price * qty;
  };

  const calculateItemTotal = (item) => {
    return item.price * item.quantity;
  };

  return (
    <div className="cart-overlay">
      <div className="cart-modal">
        <div className="cart-header">
          <h2>Carrito de Compras</h2>
          <button className="close-button" onClick={onClose}>
            X
          </button>
        </div>

        <div className="cart-items">
          {cart.length === 0 ? (
            <p>El carrito está vacío</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-image"
                />
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <p>${item.price}</p>
                  <div className="quantity-controls">
                    <button
                      onClick={() =>
                        onUpdateQuantity(item.id, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        onUpdateQuantity(item.id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="remove-button"
                  onClick={() => onRemove(item.id)}
                >
                  Eliminar
                </button>
              </div>
            ))
          )}
        </div>

        <div className="cart-footer">
          <p className="cart-total">Total: ${cartTotal}</p>
          <button className="checkout-button" onClick={handleCheckout}>
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
