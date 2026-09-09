import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../store/CartSlice.jsx";
import Navbar from "./Navbar.jsx";

const products = [
  { id: 1, category: "Low Light Plants", name: "Snake Plant", description: "A hardy plant that thrives in low light.", price: 24.99 },
  { id: 2, category: "Low Light Plants", name: "ZZ Plant", description: "An easy-care plant with glossy green leaves.", price: 29.99 },
  { id: 3, category: "Low Light Plants", name: "Peace Lily", description: "An elegant indoor plant with white blooms.", price: 22.99 },
  { id: 4, category: "Low Light Plants", name: "Chinese Evergreen", description: "A colorful foliage plant for indoor spaces.", price: 26.99 },
  { id: 5, category: "Low Light Plants", name: "Cast Iron Plant", description: "A resilient plant for shaded rooms.", price: 31.99 },
  { id: 6, category: "Low Light Plants", name: "Parlor Palm", description: "A compact palm that suits low-light homes.", price: 27.99 },
  { id: 7, category: "Tropical Plants", name: "Monstera", description: "A tropical favorite with dramatic split leaves.", price: 39.99 },
  { id: 8, category: "Tropical Plants", name: "Bird of Paradise", description: "A bold tropical plant with large leaves.", price: 49.99 },
  { id: 9, category: "Tropical Plants", name: "Calathea", description: "A decorative plant with patterned foliage.", price: 34.99 },
  { id: 10, category: "Tropical Plants", name: "Philodendron", description: "A popular tropical houseplant with lush leaves.", price: 32.99 },
  { id: 11, category: "Tropical Plants", name: "Alocasia", description: "A striking tropical plant with arrow-shaped leaves.", price: 37.99 },
  { id: 12, category: "Tropical Plants", name: "Prayer Plant", description: "A colorful foliage plant with patterned leaves.", price: 28.99 },
  { id: 13, category: "Flowering Plants", name: "Orchid", description: "An elegant flowering houseplant for bright rooms.", price: 35.99 },
  { id: 14, category: "Flowering Plants", name: "Anthurium", description: "A flowering plant with glossy leaves and blooms.", price: 30.99 },
  { id: 15, category: "Flowering Plants", name: "African Violet", description: "A compact flowering plant for indoor windowsills.", price: 18.99 },
  { id: 16, category: "Flowering Plants", name: "Bromeliad", description: "A tropical flowering plant with colorful bracts.", price: 33.99 },
  { id: 17, category: "Flowering Plants", name: "Begonia", description: "A cheerful flowering plant with decorative foliage.", price: 21.99 },
  { id: 18, category: "Flowering Plants", name: "Kalanchoe", description: "A low-maintenance succulent with bright flowers.", price: 19.99 }
].map((plant, index) => ({
  ...plant,
  image: `https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=700&q=80&sig=${index + 1}`
}));

export default function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const categories = [...new Set(products.map((product) => product.category))];

  return (
    <>
      <Navbar />
      <main className="page">
        <h1 className="page-title">Our Houseplants</h1>

        {categories.map((category) => (
          <section className="category" key={category}>
            <h2>{category}</h2>
            <div className="grid">
              {products
                .filter((product) => product.category === category)
                .map((product) => {
                  const isAdded = cartItems.some((item) => item.id === product.id);

                  return (
                    <article className="card" key={product.id}>
                      <img src={product.image} alt={product.name} />
                      <div className="info">
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <div className="price">${product.price.toFixed(2)}</div>
                        <button
                          className="add"
                          disabled={isAdded}
                          onClick={() => dispatch(addItem(product))}
                        >
                          {isAdded ? "Added to Cart" : "Add to Cart"}
                        </button>
                      </div>
                    </article>
                  );
                })}
            </div>
          </section>
        ))}
      </main>
    </>
  );
}
