// 1. Initial Data
let panier = JSON.parse(localStorage.getItem('gamevault_cart')) || [];

// 2. DOM Elements
const container = document.getElementById('cart-items');
const totalElement = document.getElementById('cart-total');
const btnCommander = document.getElementById('checkout-btn');


function afficherPanier() {
    if (panier.length === 0) {
        container.innerHTML = '<p class="text-center text-gray-400 py-10">Votre panier est vide.</p>';
        totalElement.innerText = "0.00";
        return;
    }

    let boxCard = '';

    for (let i = 0; i < panier.length; i++) {
        const item = panier[i];

        boxCard += `
        <div class="flex flex-col md:flex-row items-center justify-between bg-gray-800 p-4 rounded-xl gap-4 mb-4">
            <div class="flex items-center gap-4 w-full">
                <img src="${item.image}" class="w-20 h-20 object-cover rounded-lg">
                <div>
                    <h3 class="font-bold text-lg">${item.title}</h3>
                    <p class="text-green-400 font-semibold">${item.price} $</p>
                </div>
            </div>
            <div class="flex items-center gap-4">
                <div class="flex items-center bg-gray-700 rounded-lg overflow-hidden">
                    <button onclick="changer(${i}, -1)" class="px-4 py-2 hover:bg-gray-600">-</button>
                    <span class="px-4 font-bold text-blue-400">${item.quantity}</span>
                    <button onclick="changer(${i}, 1)" class="px-4 py-2 hover:bg-gray-600">+</button>
                </div>
                <button onclick="supprimer(${i})" class="p-2 hover:bg-red-900/20 rounded-lg">
                    <img class="w-6 h-6" src="./Image/trash.png" alt="Supprimer">
                </button>
            </div>
        </div>
    `;
    }

    container.innerHTML = boxCard;

     
    let total = 0;

    for (let i = 0; i < panier.length; i++) {
        total += panier[i].price * panier[i].quantity;
    }
    
    totalElement.innerText = total.toFixed(2);
}

// 4. Actions
window.changer = (index, delta) => {
    panier[index].quantity = Math.max(1, panier[index].quantity + delta);
    save();
};

window.supprimer = (index) => {
    panier.splice(index, 1);
    save();
};

function save() {
    localStorage.setItem('gamevault_cart', JSON.stringify(panier));
    afficherPanier();
}

// 5. Checkout
btnCommander.addEventListener('click', () => {
    if (panier.length === 0) return alert("Votre panier est vide");

    alert("Commande réussie !");
    panier = [];
    save();
});

// Start
afficherPanier();