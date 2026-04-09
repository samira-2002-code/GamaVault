import { games } from './data.js';

const gamesContainer = document.getElementById('games-container');
const searchInput = document.getElementById('search-input');
const categoryButtons = document.querySelectorAll('.category-btn');

 
let panier = JSON.parse(localStorage.getItem('gamevault_cart')) || [];

 
function refreshCartUI() {
    localStorage.setItem('gamevault_cart', JSON.stringify(panier));

    const count = panier.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('panier-count').innerText = count;
}

function addToCart(id) {


    let game = null;

    for (let i = 0; i < games.length; i++) {
        if (games[i].id === id) {
            game = games[i];
            break;
        }
    }

    if (!game) return;


    let existing = null;

    for (let i = 0; i < panier.length; i++) {
        if (panier[i].id === id) {
            existing = panier[i];
            break;
        }
    }


    if (existing) {
        existing.quantity++;
    } else {
        panier.push({ ...game, quantity: 1 });
    }


    refreshCartUI();
    alert(`${game.title} ajouté avec succès`);
}


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

    let selectedCat;

    if (activeBtn) {
        selectedCat = activeBtn.getAttribute('data-category');
    } else {
        selectedCat = 'Tous';
    }


    let filtered = [];

    for (let i = 0; i < games.length; i++) {

        const g = games[i];

        const matchesTitle = g.title.toLowerCase().includes(text);
        const matchesCat = selectedCat === 'Tous' || g.category === selectedCat;

        if (matchesTitle && matchesCat) {
            filtered.push(g);
        }
    }

    gamesContainer.innerHTML = filtered.map(createGameHTML).join('');
}

// 🎧 Events
searchInput.addEventListener('input', updateGallery);

gamesContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.add-to-cart');
    if (btn) {
        const id = parseInt(btn.dataset.id);
        addToCart(id);
    }
});

categoryButtons.forEach(btn => {
    btn.addEventListener('click', () => {

        for (let j = 0; j < categoryButtons.length; j++) {
            categoryButtons[j].classList.remove('bg-blue-600');
            categoryButtons[j].classList.add('bg-purple-400', 'bg-opacity-50');
        }

        btn.classList.replace('bg-purple-400', 'bg-blue-600');
        btn.classList.remove('bg-opacity-50');

        updateGallery();
    });
});


updateGallery();
refreshCartUI();