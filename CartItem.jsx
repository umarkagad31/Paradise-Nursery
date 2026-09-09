import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, updateQuantity } from "../store/CartSlice.jsx";
import Navbar from "./Navbar.jsx";

export default function CartItem() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const increaseQuantity = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const decreaseQuantity = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
  };

  return (
    <>
      <Navbar />
      <main className="cart-page">
        <h1 className="page-title">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty.</p>
            <Link className="continue" to="/plants">Continue Shopping</Link>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <article className="cart-row" key={item.id}>
                  <img src={item.image} alt={item.name} />

                  <div className="cart-details">
                    <h3>{item.name}</h3>
                    <p>Unit Price: ${item.price.toFixed(2)}</p>
                    <p>Item Total: ${(item.price * item.quantity).toFixed(2)}</p>
                  </div>

                  <div className="quantity-controls">
                    <button
                      aria-label={`Decrease quantity of ${item.name}`}
                      onClick={() => decreaseQuantity(item)}
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      aria-label={`Increase quantity of ${item.name}`}
                      onClick={() => increaseQuantity(item)}
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="delete"
                    onClick={() => dispatch(removeItem(item.id))}
                  >
                    Delete
                  </button>
                </article>
              ))}
            </div>

            <div className="summary">
              <h2>Total Amount: ${totalAmount.toFixed(2)}</h2>
              <div className="actions">
                <Link className="continue" to="/plants">Continue Shopping</Link>
                <button className="checkout" onClick={() => alert("Coming Soon")}>Checkout</button>
              </div>
            </div>
          </>
        )}
      </main>
    </>
  );
}
