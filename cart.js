let cart = JSON.parse(localStorage.getItem('gamevault_cart')) || [];

const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');