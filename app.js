const plants = [
  { id: 1, name: "Snake Plant", category: "Air Purifying", price: 24.99, icon: "🪴", description: "Hardy, stylish, and great for low-light rooms." },
  { id: 2, name: "Monstera", category: "Tropical", price: 39.99, icon: "🌿", description: "A statement plant with iconic split leaves." },
  { id: 3, name: "Peace Lily", category: "Flowering", price: 29.99, icon: "🌱", description: "Elegant foliage with beautiful white blooms." },
  { id: 4, name: "Aloe Vera", category: "Succulent", price: 18.99, icon: "🌵", description: "An easy-care succulent for a sunny windowsill." },
  { id: 5, name: "Pothos", category: "Trailing", price: 21.99, icon: "🍃", description: "Fast-growing vines that brighten any shelf." },
  { id: 6, name: "ZZ Plant", category: "Low Light", price: 26.99, icon: "🌴", description: "Glossy leaves and excellent tolerance for neglect." },
  { id: 7, name: "Rubber Plant", category: "Indoor Tree", price: 34.99, icon: "🌳", description: "Bold leaves that bring a rich natural feel indoors." },
  { id: 8, name: "Calathea", category: "Tropical", price: 32.99, icon: "🌿", description: "Patterned leaves for a colorful indoor display." }
];

let cart = JSON.parse(localStorage.getItem("paradiseCart") || "{}");

function saveCart() {
  localStorage.setItem("paradiseCart", JSON.stringify(cart));
}

function renderPlants() {
  const grid = document.getElementById("plant-grid");
  document.getElementById("plant-count").textContent = `${plants.length} plants available`;
  grid.innerHTML = plants.map(plant => `
    <article class="card">
      <div class="card-visual" aria-label="${plant.name}">${plant.icon}</div>
      <div class="card-body">
        <p class="eyebrow">${plant.category}</p>
        <h3>${plant.name}</h3>
        <p>${plant.description}</p>
        <div class="price-row">
          <span class="price">$${plant.price.toFixed(2)}</span>
          <button type="button" onclick="addToCart(${plant.id})">Add to Cart</button>
        </div>
      </div>
    </article>
  `).join("");
}

function addToCart(id) {
  cart[id] = (cart[id] || 0) + 1;
  saveCart();
  renderCart();
}

function changeQuantity(id, delta) {
  cart[id] = (cart[id] || 0) + delta;
  if (cart[id] <= 0) delete cart[id];
  saveCart();
  renderCart();
}

function removeFromCart(id) {
  delete cart[id];
  saveCart();
  renderCart();
}

function renderCart() {
  const container = document.getElementById("cart-items");
  const ids = Object.keys(cart);
  let total = 0;
  let count = 0;

  if (!ids.length) {
    container.innerHTML = '<div class="empty">Your cart is empty. Add a plant to get started.</div>';
  } else {
    container.innerHTML = ids.map(id => {
      const plant = plants.find(p => p.id === Number(id));
      const quantity = cart[id];
      const subtotal = plant.price * quantity;
      total += subtotal;
      count += quantity;
      return `
        <div class="cart-row">
          <div><strong>${plant.icon} ${plant.name}</strong><br><small>$${plant.price.toFixed(2)} each</small></div>
          <div class="qty">
            <button type="button" onclick="changeQuantity(${plant.id}, -1)">−</button>
            <strong>${quantity}</strong>
            <button type="button" onclick="changeQuantity(${plant.id}, 1)">+</button>
          </div>
          <strong>$${subtotal.toFixed(2)}</strong>
          <button class="remove" type="button" onclick="removeFromCart(${plant.id})">Remove</button>
        </div>
      `;
    }).join("");
  }

  document.getElementById("cart-count").textContent = count;
  document.getElementById("cart-total").textContent = total.toFixed(2);
}

document.getElementById("checkout-btn").addEventListener("click", () => {
  if (Object.keys(cart).length === 0) {
    alert("Your cart is empty.");
    return;
  }
  alert("Thank you! This demo checkout is ready for the final project.");
});

renderPlants();
renderCart();
