import { games } from './data.js';

const gamesContainer = document.getElementById('games-container');
const searchInput = document.getElementById('search-input');
const categoryButtons = document.querySelectorAll('.category-btn');


function displayGames(gamesList) {
    gamesContainer.innerHTML = ''; 
    
    gamesList.forEach(game => {
        const gameCard = `
            <div class="bg-white rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105">
                <img src="${game.image}" alt="${game.title}" class="w-full h-48 object-cover">
                <div class="p-4 text-gray-600">
                    <p class="text-sm text-gray-500 mb-1">${game.category}</p>
                    <h3 class="font-bold text-lg mb-2">${game.title}</h3>
                    <p class="text-sm text-gray-600 line-clamp-2 mb-4">${game.description}</p>
                    <div class="flex justify-between items-center">
                        <span class="text-green-600 font-bold text-xl">$${game.price}</span>
                        <button onclick="addToCart(${game.id})" class="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-800">
                            Ajouter au panier
                        </button>
                    </div>
                </div>
            </div>
        `;
        gamesContainer.innerHTML += gameCard;
    });
}

displayGames(games);


searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredGames = games.filter(game => 
        game.title.toLowerCase().includes(searchTerm)
    );
    displayGames(filteredGames);
});
categoryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      
        categoryButtons.forEach(b => b.classList.remove('bg-blue-600'));
        categoryButtons.forEach(b => b.classList.add('bg-purple-400', 'bg-opacity-50'));
        
        btn.classList.remove('bg-purple-400', 'bg-opacity-50');
        btn.classList.add('bg-blue-600');

        const category = btn.getAttribute('data-category');
        if (category === 'Tous') {
            displayGames(games);
        } else {
            const filtered = games.filter(game => game.category === category);
            displayGames(filtered);
        }
    });
});

let cart = JSON.parse(localStorage.getItem('gamevault_cart')) || [];


window.addToCart = (id) => {
    const gameToAdd = games.find(g => g.id === id);
    
  
    const existingGame = cart.find(item => item.id === id);
    
    if (existingGame) {
        existingGame.quantity += 1;
    } else {
        cart.push({ ...gameToAdd, quantity: 1 });
    }
    
  
    saveCart();
    updateCartCount();
    alert(`${gameToAdd.title} t-zad l-panier!`);
};

function saveCart() {
    localStorage.setItem('gamevault_cart', JSON.stringify(cart));
}

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').innerText = count;
}


updateCartCount();