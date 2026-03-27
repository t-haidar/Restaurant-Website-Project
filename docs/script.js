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

  updateCart();
}

function removeFromCart(name) {
  cart = cart.filter(item => item.name !== name);
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

document.addEventListener("DOMContentLoaded", () => {
  showSlides();
  updateCart();
});
