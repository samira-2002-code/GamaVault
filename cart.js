let cart = JSON.parse(localStorage.getItem('gamevault_cart')) || [];

const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');

function renderCart() {
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="text-center text-gray-400 py-10">Votre panier est vide.</p>';
        cartTotalElement.innerText = '0.00';
        return;
        
    }
 cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;