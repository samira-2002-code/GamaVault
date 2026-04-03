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

                const itemHtml = `
            <div class="flex flex-col md:flex-row items-center justify-between bg-gray-800 p-4 rounded-xl gap-4">
                <div class="flex items-center gap-4 w-full">
                    <img src="${item.image}" class="w-20 h-20 object-cover rounded-lg">
                    <div>
                        <h3 class="font-bold text-lg">${item.title}</h3>
                        <p class="text-green-400 font-semibold">${item.price} $</p>
                    </div>
                </div>
                
                <div class="flex items-center gap-6">
                    <div class="flex items-center bg-gray-700 rounded-lg overflow-hidden">
                        <button onclick="changeQty(${index}, -1)" class="px-3 py-1 ">-</button>
                        <span class="px-4 font-bold text-blue-400">${item.quantity}</span>
                        <button onclick="changeQty(${index}, 1)" class="px-3 py-1 ml-[5px] ">+</button>
                    </div>
                    
                    <button onclick="removeItem(${index})" class="text-red-500 hover:text-red-400 text-xl">
                       <img class="w-8 h-8 ml-10" src="trash.png" alt="trash"/>
                    </button>
                </div>
            </div>
        `;
        cartItemsContainer.innerHTML += itemHtml;
    });
        cartTotalElement.innerText = total.toFixed(2);
}
window.changeQty = (index, delta) => {
    cart[index].quantity += delta;
    if (cart[index].quantity < 1) cart[index].quantity = 1; // Minimum 1
    saveAndRender();
};