import { Link, Route, Routes } from "react-router-dom";
import AboutUs from "./components/AboutUs.jsx";
import ProductList from "./components/ProductList.jsx";
import CartItem from "./components/CartItem.jsx";

function LandingPage() {
  return (
    <>
      <main className="hero">
        <div className="hero-content">
          <p className="eyebrow">WELCOME TO OUR PLANT SHOP</p>
          <h1>Paradise Nursery</h1>
          <p>Beautiful houseplants to make every home feel like paradise.</p>
          <Link className="button" to="/plants">Get Started</Link>
        </div>
      </main>
      <AboutUs />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/plants" element={<ProductList />} />
      <Route path="/cart" element={<CartItem />} />
    </Routes>
  );
}
