import { games } from './data.js';

// 1. Setup dial l-elements
const gamesContainer = document.getElementById('games-container');
const searchInput = document.getElementById('search-input');
const categoryButtons = document.querySelectorAll('.category-btn');

// 2. Setup dial l-Panier (Cart)
let cart = JSON.parse(localStorage.getItem('gamevault_cart')) || [];

// Fonction wa7da l-kolchi (Sync & UI)
function refreshCartUI() {
    localStorage.setItem('gamevault_cart', JSON.stringify(cart));
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').innerText = count;
}

// Global function bach t-zad l-panier
function addToCart(id) {
    const game = games.find(g => g.id === id);
    const existing = cart.find(item => item.id === id);

    existing ? existing.quantity++ : cart.push({ ...game, quantity: 1 });

    refreshCartUI();
    alert(`${game.title} t-zad!`);
};

// 3. Affichage o Filtering
function createGameHTML(game) {
    return `
        <div class="bg-white rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105 p-4">
            <img src="${game.image}" class="w-full h-40 object-cover rounded-lg">
            <div class="mt-3 text-gray-700">
                <p class="text-xs text-gray-400 font-bold uppercase">${game.category}</p>
                <h3 class="font-bold text-lg">${game.title}</h3>
                <div class="flex justify-between items-center mt-4">
                    <span class="text-green-600 font-bold text-xl">$${game.price}</span>
                    <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition add-to-cart" data-id="${game.id}">
                        Ajouter
                    </button>
                </div>
            </div>
        </div>
    `;
}

function updateGallery() {
    const text = searchInput.value.toLowerCase();
    const activeBtn = document.querySelector('.category-btn.bg-blue-600');
    const selectedCat = activeBtn ? activeBtn.getAttribute('data-category') : 'Tous';

    const filtered = games.filter(g => {
        const matchesTitle = g.title.toLowerCase().includes(text);
        const matchesCat = selectedCat === 'Tous' || g.category === selectedCat;
        return matchesTitle && matchesCat;
    });

    gamesContainer.innerHTML = filtered.map(createGameHTML).join('');
}

// 4. Listeners & Initialization
searchInput.addEventListener('input', updateGallery);

gamesContainer.addEventListener('click' , (e) => {
    const btn = e.target.closest('.add-to-cart');
    if(btn) {
        const id = parseInt(btn.dataset.id);
        addToCart(id);
    }
})

categoryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // UI: Toggle active class
        categoryButtons.forEach(b => {
            b.classList.remove('bg-blue-600');
            b.classList.add('bg-purple-400', 'bg-opacity-50');
        });
        btn.classList.replace('bg-purple-400', 'bg-blue-600');
        btn.classList.remove('bg-opacity-50');

        updateGallery();
    });
});

// Start
updateGallery();
refreshCartUI();