/* ==========================================
   GAMING ODYSSEY - MAIN JAVASCRIPT
   ========================================== */

// ========== GLOBAL VARIABLES ==========
let cart = [];
let wishlist = [];
let cartCount = 0;

// ========== DOM CONTENT LOADED ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎮 GamingOdyssey website loaded successfully!');
    console.log('📅 Current Date:', new Date().toLocaleDateString());
    
    initializeWebsite();
    loadCartFromStorage();
    updateCartBadge();
});

// ========== INITIALIZATION ==========
function initializeWebsite() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            console.log('📱 Mobile menu toggled');
        });
    }
    
    // Search Functionality
    const searchBar = document.querySelector('.search-bar');
    const searchIcon = document.querySelector('.search-icon');
    
    if (searchBar) {
        searchIcon.addEventListener('click', performSearch);
        searchBar.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    // Newsletter Form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSignup);
    }
    
    // Add to Cart Buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', handleAddToCart);
    });
    
    // Wishlist Icons
    const wishlistIcons = document.querySelectorAll('.wishlist-icon');
    wishlistIcons.forEach(icon => {
        icon.addEventListener('click', handleWishlistToggle);
    });
    
    // Product Cards Click
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on button or wishlist
            if (!e.target.closest('.add-to-cart-btn') && !e.target.closest('.wishlist-icon')) {
                const productTitle = this.querySelector('.product-title').textContent;
                console.log(`🖱️ User clicked on product: ${productTitle}`);
                // Navigate to product detail page (you can add actual navigation later)
            }
        });
    });
    
    // Active Navigation Link
    setActiveNavLink();
}

// ========== SEARCH FUNCTIONALITY ==========
function performSearch() {
    const searchBar = document.querySelector('.search-bar');
    const searchQuery = searchBar.value.trim();
    
    // CONSOLE LOG #1: Log search query
    console.log(`🔍 Search performed for: "${searchQuery}"`);
    
    if (searchQuery === '') {
        // ALERT #1: Empty search validation
        alert('Please enter a search term!');
        return;
    }
    
    // Simulate search (in real app, this would filter products)
    console.log(`📊 Searching database for products matching: ${searchQuery}`);
    
    // Show success message
    alert(`Searching for "${searchQuery}"... Results will appear on the Products page!`);
    
    // Clear search bar
    searchBar.value = '';
}

// ========== ADD TO CART FUNCTIONALITY ==========
function handleAddToCart(e) {
    e.stopPropagation(); // Prevent card click event
    
    const productCard = e.target.closest('.product-card');
    const productName = productCard.querySelector('.product-title').textContent;
    const productPrice = productCard.querySelector('.product-price').textContent;
    const productImage = productCard.querySelector('.product-image img').src;
    
    const product = {
        id: Date.now(),
        name: productName,
        price: productPrice,
        image: productImage,
        quantity: 1
    };
    
    cart.push(product);
    cartCount++;
    
    // CONSOLE LOG #2: Log cart addition
    console.log('🛒 Product added to cart:', product);
    console.log('📦 Current cart contents:', cart);
    
    updateCartBadge();
    saveCartToStorage();
    
    // ALERT #2: Product added confirmation
    alert(`✅ ${productName} has been added to your cart!`);
}

// ========== WISHLIST FUNCTIONALITY ==========
function handleWishlistToggle(e) {
    e.stopPropagation();
    
    const icon = e.currentTarget;
    const productCard = icon.closest('.product-card');
    const productName = productCard.querySelector('.product-title').textContent;
    
    // Toggle wishlist icon
    if (icon.classList.contains('active')) {
        icon.classList.remove('active');
        icon.innerHTML = '🤍';
        wishlist = wishlist.filter(item => item !== productName);
        console.log(`💔 Removed from wishlist: ${productName}`);
    } else {
        icon.classList.add('active');
        icon.innerHTML = '❤️';
        wishlist.push(productName);
        // CONSOLE LOG #3: Log wishlist addition
        console.log(`❤️ Added to wishlist: ${productName}`);
        console.log('📝 Current wishlist:', wishlist);
    }
}

// ========== NEWSLETTER SIGNUP ==========
function handleNewsletterSignup(e) {
    e.preventDefault();
    
    const emailInput = document.querySelector('.newsletter-input');
    const email = emailInput.value.trim();
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email === '') {
        alert('⚠️ Please enter your email address!');
        return;
    }
    
    if (!emailRegex.test(email)) {
        // ALERT #3: Email validation
        alert('⚠️ Please enter a valid email address!');
        return;
    }
    
    console.log(`📧 Newsletter signup: ${email}`);
    alert(`🎉 Thank you for subscribing! We've sent a confirmation email to ${email}`);
    emailInput.value = '';
}

// ========== CART MANAGEMENT ==========
function updateCartBadge() {
    const cartBadge = document.querySelector('.cart-badge');
    if (cartBadge) {
        cartBadge.textContent = cartCount;
        
        // Animate badge
        cartBadge.style.transform = 'scale(1.3)';
        setTimeout(() => {
            cartBadge.style.transform = 'scale(1)';
        }, 200);
    }
}

function saveCartToStorage() {
    localStorage.setItem('gamingOdysseyCart', JSON.stringify(cart));
    localStorage.setItem('gamingOdysseyCartCount', cartCount);
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('gamingOdysseyCart');
    const savedCount = localStorage.getItem('gamingOdysseyCartCount');
    
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
    
    if (savedCount) {
        cartCount = parseInt(savedCount);
    }
}

// ========== NAVIGATION ==========
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// ========== SCROLL ANIMATIONS ==========
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(26, 26, 46, 1)';
        navbar.style.boxShadow = '0 8px 30px rgba(108, 99, 255, 0.3)';
    } else {
        navbar.style.background = 'rgba(26, 26, 46, 0.95)';
        navbar.style.boxShadow = '0 4px 20px rgba(108, 99, 255, 0.2)';
    }
});

// ========== PRODUCT FILTERING (for Products Page) ==========
function filterProducts(category) {
    console.log(`🔍 Filtering products by category: ${category}`);
    
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
            card.classList.add('fade-in');
        } else {
            card.style.display = 'none';
        }
    });
}

// ========== SORT PRODUCTS (for Products Page) ==========
function sortProducts(sortBy) {
    console.log(`📊 Sorting products by: ${sortBy}`);
    
    const productsGrid = document.querySelector('.products-grid');
    if (!productsGrid) return;
    
    const productCards = Array.from(productsGrid.querySelectorAll('.product-card'));
    
    productCards.sort((a, b) => {
        if (sortBy === 'price-low') {
            const priceA = parseFloat(a.querySelector('.product-price').textContent.replace('$', ''));
            const priceB = parseFloat(b.querySelector('.product-price').textContent.replace('$', ''));
            return priceA - priceB;
        } else if (sortBy === 'price-high') {
            const priceA = parseFloat(a.querySelector('.product-price').textContent.replace('$', ''));
            const priceB = parseFloat(b.querySelector('.product-price').textContent.replace('$', ''));
            return priceB - priceA;
        } else if (sortBy === 'rating') {
            const ratingA = parseFloat(a.querySelector('.rating-count').textContent);
            const ratingB = parseFloat(b.querySelector('.rating-count').textContent);
            return ratingB - ratingA;
        }
        return 0;
    });
    
    // Clear and re-append sorted cards
    productsGrid.innerHTML = '';
    productCards.forEach(card => productsGrid.appendChild(card));
}

// ========== QUIZ FUNCTIONALITY (for unique feature) ==========
function startGamingQuiz() {
    const quizQuestions = [
        {
            question: "What type of games do you prefer?",
            options: ["Action", "RPG", "Sports", "Strategy"],
            answer: null
        },
        {
            question: "What's your budget range?",
            options: ["Under $50", "$50-$100", "$100-$200", "Over $200"],
            answer: null
        },
        {
            question: "Which platform do you game on?",
            options: ["PC", "PlayStation", "Xbox", "Nintendo Switch"],
            answer: null
        }
    ];
    
    console.log('🎯 Gaming Quiz Started!');
    console.log('Quiz Questions:', quizQuestions);
    
    alert('🎮 Welcome to the Gaming Recommendation Quiz! This will help us suggest the perfect products for you!');
    
    // In a real implementation, this would show a modal with the quiz
}

// ========== PRICE CALCULATOR (Cart functionality) ==========
function calculateTotal() {
    let subtotal = 0;
    
    cart.forEach(item => {
        const price = parseFloat(item.price.replace('$', ''));
        subtotal += price * item.quantity;
    });
    
    const tax = subtotal * 0.1; // 10% tax
    const shipping = subtotal > 100 ? 0 : 9.99; // Free shipping over $100
    const total = subtotal + tax + shipping;
    
    return {
        subtotal: subtotal.toFixed(2),
        tax: tax.toFixed(2),
        shipping: shipping.toFixed(2),
        total: total.toFixed(2)
    };
}

// ========== CONTACT FORM VALIDATION ==========
function validateContactForm(formData) {
    const { name, email, message } = formData;
    
    if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
        alert('⚠️ Please fill in all fields!');
        return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('⚠️ Please enter a valid email address!');
        return false;
    }
    
    console.log('✅ Contact form validated successfully');
    console.log('Form Data:', formData);
    return true;
}

// ========== SMOOTH SCROLL ==========
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// ========== UTILITY FUNCTIONS ==========
function formatPrice(price) {
    return `$${parseFloat(price).toFixed(2)}`;
}

function generateProductId() {
    return 'PROD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}

// ========== EXPORT FUNCTIONS (for other pages to use) ==========
window.gamingOdyssey = {
    cart,
    wishlist,
    addToCart: handleAddToCart,
    filterProducts,
    sortProducts,
    calculateTotal,
    startGamingQuiz,
    validateContactForm
};

console.log('✅ All JavaScript functions initialized successfully!');