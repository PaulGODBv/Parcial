import { useState, useEffect } from "react";

// Se añade onCheckout a las props
function ShoppingCart({ cart, onRemove, onUpdateQuantity, onClose, onCheckout }) {
  const [cartTotal, setCartTotal] = useState(0);

  // Corrección: El efecto ahora "escucha" los cambios en cart
  useEffect(() => {
    const sum = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setCartTotal(sum);
  }, [cart]);

  const handleCheckout = () => {
    // Validación de seguridad
    if (cart.length === 0) return;
    
    alert("Compra realizada con éxito");
    // El padre debe encargarse de hacer setCart([])
    if (onCheckout) onCheckout();
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
                  {/* Corrección visual: Mostrar precio unitario y subtotal */}
                  <p>${item.price.toFixed(2)} c/u | Subtotal: ${ (item.price * item.quantity).toFixed(2) }</p>
                  <div className="quantity-controls">
                    <button
                      onClick={() =>
                        onUpdateQuantity(item.id, Math.max(1, item.quantity - 1)) // Evita bajar de 1
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
          <p className="cart-total">Total: ${cartTotal.toFixed(2)}</p>
          <button 
            className="checkout-button" 
            onClick={handleCheckout}
            disabled={cart.length === 0} // Inhabilita el botón si no hay items
          >
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;