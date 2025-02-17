// Sample Product Data with Image URLs
const products = [{
        id: 1,
        name: "Samsung galaxy s24 Ultra",
        price: 100,
        image: "https://m.media-amazon.com/images/I/71CXhVhpM0L._AC_UF1000,1000_QL80_.jpg"
    },
    {
        id: 2,
        name: "Microsoft New Surface",
        price: 700,
        image: "https://m.media-amazon.com/images/I/510uTHyDqGL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        id: 3,
        name: "Headphones",
        price: 50,
        image: "https://m.media-amazon.com/images/I/41tp0JPPlmL.jpg"
    },
    {
        id: 4,
        name: "Smartwatch",
        price: 150,
        image: "https://m.media-amazon.com/images/I/61ZjlBOp+rL.jpg"
    }
];

// Load Product List
const productList = document.getElementById('product-list');
products.forEach(product => {
    const productElement = document.createElement('div');
    productElement.classList.add('product-item');
    productElement.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <h3>${product.name}</h3>
        <p>$${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productList.appendChild(productElement);
});

// Initialize Cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartPanel = document.getElementById('cart-panel');
const cartItems = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');
const clearCartButton = document.getElementById('clear-cart');
const cartIcon = document.getElementById('cart-icon');

// Function to Update Cart in localStorage and UI
function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

// Function to Render Cart Items in UI
function renderCart() {
    cartItems.innerHTML = '';
    let totalPrice = 0;
    cart.forEach(item => {
        totalPrice += item.price * item.quantity;
        const itemElement = document.createElement('div');
        itemElement.innerHTML = `
            <p>${item.name} - $${item.price} x ${item.quantity}</p>
            <button onclick="increaseQuantity(${item.id})">+</button>
            <button onclick="decreaseQuantity(${item.id})">-</button>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItems.appendChild(itemElement);
    });
    totalPriceElement.textContent = totalPrice.toFixed(2);
    cartIcon.textContent = `🛒 (${cart.length})`;
}

// Function to Add Item to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    updateCart();
}

// Function to Increase Quantity
function increaseQuantity(productId) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity++;
        updateCart();
    }
}

// Function to Decrease Quantity
function decreaseQuantity(productId) {
    const item = cart.find(i => i.id === productId);
    if (item && item.quantity > 1) {
        item.quantity--;
        updateCart();
    }
}

// Function to Remove Item from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Function to Clear Cart
clearCartButton.addEventListener('click', () => {
    cart = [];
    updateCart();
});

// Toggle Cart Visibility
cartIcon.addEventListener('click', () => {
    cartPanel.style.right = cartPanel.style.right === '0px' ? '-400px' : '0';
});

// Initialize Cart Display
renderCart();