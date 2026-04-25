let index = 0;
let cart = [];
 
function showSlides() {
  const slides = document.querySelectorAll(".slide");
  if (slides.length === 0) return;
 
  slides.forEach(slide => {
    slide.style.display = "none";
  });
 
  index++;
  if (index > slides.length) {
    index = 1;
  }
 
  slides[index - 1].style.display = "block";
  setTimeout(showSlides, 3000);
}
 
function showToast(name) {
  const existing = document.getElementById("toast");
  if (existing) existing.remove();
 
  const toast = document.createElement("div");
  toast.id = "toast";
  toast.textContent = `✓ ${name} added to cart!`;
  document.body.appendChild(toast);
 
  setTimeout(() => toast.classList.add("show"), 10);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 400);
  }, 2500);
}
 
function addToCart(name, price) {
  const existingItem = cart.find(item => item.name === name);
 
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      name: name,
      price: price,
      quantity: 1
    });
  }
 
  showToast(name);
  updateCart();
}
 
function removeFromCart(name) {
  const existingItem = cart.find(item => item.name === name);
 
  if (existingItem) {
    if (existingItem.quantity > 1) {
      existingItem.quantity--;
    } else {
      cart = cart.filter(item => item.name !== name);
    }
  }
 
  updateCart();
}
 
function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
 
  if (!cartItems || !cartTotal) return;
 
  cartItems.innerHTML = "";
 
  let total = 0;
 
  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
    cartTotal.textContent = "Total: $0.00";
    return;
  }
 
  cart.forEach(item => {
    total += item.price * item.quantity;
 
    const cartRow = document.createElement("div");
    cartRow.classList.add("cart-row");
 
    cartRow.innerHTML = `
      <span>${item.name}</span>
      <span>$${item.price.toFixed(2)}</span>
      <span>Qty: ${item.quantity}</span>
      <button onclick="removeFromCart('${item.name}')">Remove</button>
    `;
 
    cartItems.appendChild(cartRow);
  });
 
  cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}
 
function clearCart() {
  cart = [];
  updateCart();
}
 
function toggleMenu() {
  const navLinks = document.getElementById("nav-links");
  navLinks.classList.toggle("open");
}
 
document.addEventListener("DOMContentLoaded", () => {
  showSlides();
  updateCart();
 
  // Close mobile menu when a link is clicked
  const navLinks = document.getElementById("nav-links");
  if (navLinks) {
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => navLinks.classList.remove("open"));
    });
  }
});
