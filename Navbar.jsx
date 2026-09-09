import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Navbar() {
  const totalItems = useSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

  return (
    <nav className="navbar">
      <Link className="brand" to="/">Paradise Nursery</Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/plants">Plants</Link>
        <Link to="/cart">
          Cart <span className="cart-badge">{totalItems}</span>
        </Link>
      </div>
    </nav>
  );
}
