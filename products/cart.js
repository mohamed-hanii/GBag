const countEl = document.querySelector(".count");
const minus = document.querySelector(".minus");
const plus = document.querySelector(".plus");
const cartIcon = document.querySelector(".cart-icon");
const cartContainer = document.querySelector(".cart-container");
const addToCartBtn = document.querySelector(".add-to-cart");
const cartItems = document.querySelector(".cart-items");
const checkout = document.querySelector(".checkout");
const cartCount = document.querySelector(".cart-count");

let count = 0;
let totalCartQty = 0;

const updateCount = (newCount) => {
  count = newCount;
  countEl.textContent = count;
};

minus.addEventListener("click", () => {
  if (count > 0) {
    updateCount(count - 1);
  }
});

plus.addEventListener("click", () => {
  updateCount(count + 1);
});

cartCount.addEventListener("click", () => {
  cartContainer.classList.toggle("active");
});

const updateTotalCartQty = () => {
  const cartItemsList = document.querySelectorAll(".cart-item");
  totalCartQty = 0;
  cartItemsList.forEach((item) => {
    totalCartQty += parseInt(item.dataset.quantity);
  });

  cartCount.innerHTML = `<span class="qty">${totalCartQty}</span>`;
};