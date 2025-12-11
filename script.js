// ============================================
// FICHIER: script.js - Version Professionnelle
// Librairie Sokone - Logique Complète
// ============================================

// Variables globales
let cart = [];
let currentCategory = 'tous';
let isInitialized = false;
let notificationTimeout = null;

// DOM Elements
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const categoriesGrid = document.getElementById('categoriesGrid');
const productsGrid = document.getElementById('productsGrid');
const galleryGrid = document.getElementById('galleryGrid');
const inventoryBody = document.getElementById('inventoryBody');
const cartModal = document.getElementById('cartModal');
const cartIcon = document.getElementById('cartIcon');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const emptyCartMessage = document.getElementById('emptyCartMessage');
const continueShopping = document.getElementById('continueShopping');
const checkoutBtn = document.getElementById('checkoutBtn');
const orderForm = document.getElementById('orderForm');
const orderItems = document.getElementById('orderItems');
const orderSubtotal = document.getElementById('orderSubtotal');
const orderDelivery = document.getElementById('orderDelivery');
const orderTotal = document.getElementById('orderTotal');
const currentCategoryDisplay = document.getElementById('currentCategory');
const productsCount = document.getElementById('productsCount');
const editCartBtn = document.getElementById('editCart');
const inventorySearch = document.getElementById('inventorySearch');
const totalProducts = document.getElementById('totalProducts');
const totalValue = document.getElementById('totalValue');
const totalInventoryValue = document.getElementById('totalInventoryValue');
const submitOrderBtn = document.getElementById('submitOrder');
const deliveryMethod = document.getElementById('deliveryMethod');
const pageLoader = document.getElementById('pageLoader');

// ===== INITIALISATION =====
function init() {
    if (isInitialized) return;
    
    showLoader();
    
    loadCartFromStorage();
    
    // Initialiser les composants
    Promise.all([
        displayCategories(),
        displayProducts(),
        displayInventory(),
        displayGallery(),
        initScrollAnimations()
    ]).then(() => {
        updateCartCount();
        updateOrderSummary();
        updateInventoryStats();
        hideLoader();
        isInitialized = true;
        
        // Animation d'entrée
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
        
        console.log('✅ Application initialisée avec succès');
    }).catch(error => {
        console.error('❌ Erreur lors de l\'initialisation:', error);
        hideLoader();
        showNotification('Erreur lors du chargement de l\'application', 'error');
    });
}

// ===== LOADER =====
function showLoader() {
    if (pageLoader) {
        pageLoader.style.display = 'flex';
        setTimeout(() => {
            pageLoader.style.opacity = '1';
        }, 10);
    }
}

function hideLoader() {
    if (pageLoader) {
        pageLoader.style.opacity = '0';
        setTimeout(() => {
            pageLoader.style.display = 'none';
        }, 300);
    }
}

// ===== GESTION DU PANIER =====
function loadCartFromStorage() {
    try {
        const savedCart = localStorage.getItem('cart_sokone');
        if (savedCart) {
            cart = JSON.parse(savedCart);
            console.log('📦 Panier chargé:', cart.length, 'articles');
        }
    } catch (e) {
        console.error('Erreur de chargement du panier:', e);
        cart = [];
    }
}

function saveCartToLocalStorage() {
    try {
        localStorage.setItem('cart_sokone', JSON.stringify(cart));
        console.log('💾 Panier sauvegardé');
    } catch (e) {
        console.error('Erreur de sauvegarde du panier:', e);
        showNotification('Erreur de sauvegarde du panier', 'error');
    }
}

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    if (cartCount) {
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

function addToCart(productId, quantity = 1) {
    const product = productsData.find(p => p.id == productId);
    
    if (!product) {
        showNotification('Produit introuvable', 'error');
        return;
    }
    
    if (product.quantity <= 0) {
        showNotification(`"${product.name}" est actuellement en rupture de stock.`, 'error');
        return;
    }
    
    if (quantity > product.quantity) {
        showNotification(`Stock insuffisant. Il ne reste que ${product.quantity} ${product.unit}.`, 'warning');
        return;
    }
    
    const existingItemIndex = cart.findIndex(item => item.id == productId);
    
    if (existingItemIndex > -1) {
        const newQuantity = cart[existingItemIndex].quantity + quantity;
        
        if (newQuantity > product.quantity) {
            showNotification(`Vous avez déjà ${cart[existingItemIndex].quantity} ${product.unit} dans votre panier. Stock maximum: ${product.quantity}`, 'warning');
            return;
        }
        
        cart[existingItemIndex].quantity = newQuantity;
        showNotification(`Quantité mise à jour: ${newQuantity} ${product.name}`, 'success');
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            details: product.details,
            price: product.price,
            quantity: quantity,
            maxQuantity: product.quantity,
            category: product.category,
            icon: product.icon
        });
        showNotification(`${quantity} ${product.name} ajouté au panier !`, 'success');
    }
    
    updateCartCount();
    updateOrderSummary();
    saveCartToLocalStorage();
    animateCartIcon();
}

function removeFromCart(index) {
    if (index >= 0 && index < cart.length) {
        cart.splice(index, 1);
        updateCartCount();
        updateOrderSummary();
        saveCartToLocalStorage();
        renderCartModal();
        showNotification('Article supprimé du panier', 'info');
    }
}

function updateCartItemQuantity(index, newQuantity) {
    if (index >= 0 && index < cart.length) {
        if (newQuantity <= 0) {
            removeFromCart(index);
            return;
        }
        
        if (newQuantity > cart[index].maxQuantity) {
            showNotification(`Quantité maximale: ${cart[index].maxQuantity}`, 'warning');
            return;
        }
        
        cart[index].quantity = newQuantity;
        updateCartCount();
        updateOrderSummary();
        saveCartToLocalStorage();
        renderCartModal();
    }
}

function animateCartIcon() {
    if (cartIcon) {
        cartIcon.style.transform = 'scale(1.2)';
        setTimeout(() => {
            cartIcon.style.transform = 'scale(1)';
        }, 300);
    }
}

// ===== GESTION DE L'INTERFACE =====
function setupMenu() {
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });
    
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !menuToggle.contains(e.target) && navLinks.classList.contains('active')) {
            closeMenu();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            closeMenu();
        }
    });
}

function toggleMenu() {
    navLinks.classList.toggle('active');
    const isActive = navLinks.classList.contains('active');
    menuToggle.innerHTML = isActive ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    menuToggle.setAttribute('aria-expanded', isActive);
    document.body.style.overflow = isActive ? 'hidden' : '';
}

function closeMenu() {
    navLinks.classList.remove('active');
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.category-card, .product-card, .gallery-item, .section-header').forEach(el => {
        observer.observe(el);
    });
}

// ===== CATÉGORIES =====
function displayCategories() {
    return new Promise((resolve) => {
        categoriesGrid.innerHTML = '';
        
        const fragment = document.createDocumentFragment();
        
        categoriesData.forEach(category => {
            const productCount = category.id === 'tous' 
                ? productsData.length 
                : productsData.filter(product => product.category === category.id).length;
            
            const categoryElement = document.createElement('div');
            categoryElement.className = 'category-card hover-lift';
            categoryElement.setAttribute('data-category', category.id);
            categoryElement.setAttribute('role', 'button');
            categoryElement.setAttribute('tabindex', '0');
            categoryElement.setAttribute('aria-label', `Voir les produits de la catégorie ${category.name}`);
            
            if (category.id === 'tous') {
                categoryElement.classList.add('active');
            }
            
            categoryElement.innerHTML = `
                <div class="category-icon" style="color: ${category.color}">
                    <i class="${category.icon}"></i>
                </div>
                <h3>${category.name}</h3>
                <div class="category-count">${productCount} produits</div>
                <div class="category-arrow">
                    <i class="fas fa-chevron-right"></i>
                </div>
            `;
            
            categoryElement.addEventListener('click', () => handleCategoryClick(category.id));
            categoryElement.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCategoryClick(category.id);
                }
            });
            
            fragment.appendChild(categoryElement);
        });
        
        categoriesGrid.appendChild(fragment);
        resolve();
    });
}

function handleCategoryClick(categoryId) {
    document.querySelectorAll('.category-card').forEach(card => {
        card.classList.remove('active');
        if (card.getAttribute('data-category') === categoryId) {
            card.classList.add('active');
        }
    });
    
    if (currentCategoryDisplay) {
        const category = categoriesData.find(cat => cat.id === categoryId);
        currentCategoryDisplay.textContent = category ? category.name : 'Tous les produits';
    }
    
    currentCategory = categoryId;
    displayProducts(categoryId);
}

// ===== PRODUITS =====
function displayProducts(category = 'tous') {
    return new Promise((resolve) => {
        productsGrid.innerHTML = '';
        
        const filteredProducts = category === 'tous' 
            ? productsData 
            : productsData.filter(product => product.category === category);
        
        if (productsCount) {
            productsCount.textContent = filteredProducts.length;
        }
        
        if (filteredProducts.length === 0) {
            productsGrid.innerHTML = `
                <div class="empty-products">
                    <div class="empty-icon">
                        <i class="fas fa-box-open"></i>
                    </div>
                    <h3>Aucun produit disponible</h3>
                    <p>Aucun produit n'est disponible dans cette catégorie pour le moment.</p>
                    ${category !== 'tous' ? `
                        <button class="btn btn-outline" onclick="handleCategoryClick('tous')">
                            <i class="fas fa-arrow-left"></i> Voir tous les produits
                        </button>
                    ` : ''}
                </div>
            `;
            resolve();
            return;
        }
        
        const fragment = document.createDocumentFragment();
        
        filteredProducts.forEach(product => {
            const productElement = createProductCard(product);
            fragment.appendChild(productElement);
        });
        
        productsGrid.appendChild(fragment);
        setupProductInteractions();
        resolve();
    });
}

// ===== PRODUITS AVEC IMAGES =====
function createProductCard(product) {
    const productElement = document.createElement('div');
    productElement.className = 'product-card hover-lift';
    productElement.setAttribute('data-id', product.id);
    productElement.setAttribute('data-category', product.category);
    
    let stockText = '';
    let stockClass = '';
    let stockIcon = '';
    
    if (product.quantity <= 0) {
        stockText = 'Rupture de stock';
        stockClass = 'out-of-stock';
        stockIcon = 'times-circle';
    } else if (product.quantity <= 3) {
        stockText = 'Stock faible';
        stockClass = 'low-stock';
        stockIcon = 'exclamation-triangle';
    } else {
        stockText = 'En stock';
        stockClass = 'in-stock';
        stockIcon = 'check-circle';
    }
    
    // Utiliser l'image réelle si disponible, sinon l'icône
    const imageContent = product.image 
        ? `<img src="${product.image}" alt="${product.name}" loading="lazy">`
        : `<i class="${product.icon}"></i>`;
    
    productElement.innerHTML = `
        ${product.quantity <= 3 ? `
            <div class="product-badge" data-tooltip="${product.quantity <= 0 ? 'Produit épuisé' : 'Stock limité'}">
                ${product.quantity <= 0 ? 'Épuisé' : 'Bientôt épuisé'}
            </div>
        ` : ''}
        
        <div class="product-image">
            ${imageContent}
            ${!product.image ? `<i class="${product.icon}"></i>` : ''}
        </div>
        
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            
            <div class="product-category">
                <i class="fas fa-tag"></i>
                ${categoriesData.find(cat => cat.id === product.category)?.name || product.category}
            </div>
            
            <p class="product-details">${product.details}</p>
            
            <div class="product-price">
                <span class="price-amount">${product.price.toLocaleString()}</span>
                <span class="price-currency">FCFA</span>
            </div>
            
            <div class="product-stock ${stockClass}">
                <i class="fas fa-${stockIcon}"></i>
                <span>${stockText}</span>
                <span class="stock-quantity">(${product.quantity} ${product.unit})</span>
            </div>
            
            ${product.quantity > 0 ? `
                <div class="quantity-controls">
                    <button class="quantity-btn decrease-quantity" 
                            data-id="${product.id}"
                            aria-label="Diminuer la quantité">
                        <i class="fas fa-minus"></i>
                    </button>
                    <input type="number" 
                           class="quantity-input" 
                           id="quantity-${product.id}" 
                           value="1" 
                           min="1" 
                           max="${product.quantity}"
                           aria-label="Quantité">
                    <button class="quantity-btn increase-quantity" 
                            data-id="${product.id}"
                            aria-label="Augmenter la quantité">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                
                <button class="btn btn-primary add-to-cart" 
                        data-id="${product.id}">
                    <i class="fas fa-cart-plus"></i> Ajouter au panier
                </button>
            ` : `
                <button class="btn btn-secondary" disabled>
                    <i class="fas fa-ban"></i> Indisponible
                </button>
                <button class="btn btn-outline notify-me" data-id="${product.id}">
                    <i class="fas fa-bell"></i> Me prévenir
                </button>
            `}
        </div>
    `;
    
    return productElement;
}

function setupProductInteractions() {
    productsGrid.addEventListener('click', handleProductControls);
    productsGrid.addEventListener('input', handleQuantityInput);
}

function handleProductControls(e) {
    const target = e.target.closest('button');
    if (!target) return;
    
    if (target.classList.contains('increase-quantity')) {
        const productId = target.getAttribute('data-id');
        const input = document.getElementById(`quantity-${productId}`);
        const max = parseInt(input.max);
        if (parseInt(input.value) < max) {
            input.value = parseInt(input.value) + 1;
            input.dispatchEvent(new Event('input'));
        } else {
            showNotification('Quantité maximale atteinte', 'warning');
        }
    } else if (target.classList.contains('decrease-quantity')) {
        const productId = target.getAttribute('data-id');
        const input = document.getElementById(`quantity-${productId}`);
        if (parseInt(input.value) > 1) {
            input.value = parseInt(input.value) - 1;
            input.dispatchEvent(new Event('input'));
        }
    } else if (target.classList.contains('add-to-cart')) {
        const productId = target.getAttribute('data-id');
        const input = document.getElementById(`quantity-${productId}`);
        const quantity = parseInt(input.value);
        addToCart(productId, quantity);
    } else if (target.classList.contains('notify-me')) {
        const productId = target.getAttribute('data-id');
        setupProductNotification(productId);
    }
}

function handleQuantityInput(e) {
    if (e.target.classList.contains('quantity-input')) {
        const input = e.target;
        const value = parseInt(input.value);
        const max = parseInt(input.max);
        const min = parseInt(input.min);
        
        if (isNaN(value) || value < min) {
            input.value = min;
        } else if (value > max) {
            input.value = max;
            showNotification(`Quantité maximale: ${max}`, 'warning');
        }
    }
}

function setupProductNotification(productId) {
    const product = productsData.find(p => p.id == productId);
    if (!product) return;
    
    const email = prompt(`Entrez votre email pour être notifié quand "${product.name}" sera de nouveau en stock:`);
    if (email && validateEmail(email)) {
        showNotification(`Nous vous préviendrons quand ${product.name} sera disponible !`, 'success');
        console.log(`Notification enregistrée pour ${product.name} - Email: ${email}`);
    } else if (email) {
        showNotification('Email invalide', 'error');
    }
}

// ===== GALERIE =====
function displayGallery() {
    return new Promise((resolve) => {
        if (!galleryGrid) {
            resolve();
            return;
        }
        
        galleryGrid.innerHTML = '';
        const fragment = document.createDocumentFragment();
        
        galleryImages.forEach((image, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item hover-lift';
            galleryItem.setAttribute('data-category', image.category);
            
            galleryItem.innerHTML = `
                <div class="gallery-image" data-index="${index}" role="button" tabindex="0" aria-label="Voir ${image.title}">
                    <img src="${image.url}" 
                         alt="${image.title} - ${image.description}" 
                         loading="lazy"
                         onerror="this.src='https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400&q=80'">
                    <div class="gallery-overlay">
                        <h4>${image.title}</h4>
                        <p>${image.description}</p>
                        <span class="gallery-category">${image.category}</span>
                    </div>
                </div>
            `;
            
            const imgElement = galleryItem.querySelector('.gallery-image');
            imgElement.addEventListener('click', () => openLightbox(image, index));
            imgElement.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox(image, index);
                }
            });
            
            fragment.appendChild(galleryItem);
        });
        
        galleryGrid.appendChild(fragment);
        resolve();
    });
}

function openLightbox(image, index) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox active';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <button class="lightbox-close" aria-label="Fermer">
                <i class="fas fa-times"></i>
            </button>
            <button class="lightbox-nav lightbox-prev" aria-label="Image précédente">
                <i class="fas fa-chevron-left"></i>
            </button>
            <button class="lightbox-nav lightbox-next" aria-label="Image suivante">
                <i class="fas fa-chevron-right"></i>
            </button>
            
            <div class="lightbox-image">
                <img src="${image.url}" alt="${image.title}">
            </div>
            <div class="lightbox-info">
                <h3>${image.title}</h3>
                <p>${image.description}</p>
                <div class="lightbox-meta">
                    <span><i class="fas fa-tag"></i> ${image.category}</span>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';
    
    const closeBtn = lightbox.querySelector('.lightbox-close');
    closeBtn.addEventListener('click', () => closeLightbox(lightbox));
    
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');
    
    prevBtn.addEventListener('click', () => navigateLightbox(-1, index, lightbox));
    nextBtn.addEventListener('click', () => navigateLightbox(1, index, lightbox));
    
    const handleKey = (e) => {
        if (e.key === 'Escape') closeLightbox(lightbox);
        if (e.key === 'ArrowLeft') navigateLightbox(-1, index, lightbox);
        if (e.key === 'ArrowRight') navigateLightbox(1, index, lightbox);
    };
    
    document.addEventListener('keydown', handleKey);
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox(lightbox);
    });
    
    lightbox.keydownHandler = handleKey;
}

function navigateLightbox(direction, currentIndex, lightbox) {
    const newIndex = (currentIndex + direction + galleryImages.length) % galleryImages.length;
    closeLightbox(lightbox);
    setTimeout(() => openLightbox(galleryImages[newIndex], newIndex), 50);
}

function closeLightbox(lightbox) {
    if (lightbox && lightbox.parentNode) {
        document.removeEventListener('keydown', lightbox.keydownHandler);
        lightbox.classList.remove('active');
        setTimeout(() => {
            if (lightbox.parentNode) {
                document.body.removeChild(lightbox);
                document.body.style.overflow = '';
            }
        }, 300);
    }
}

// ===== INVENTAIRE =====
function displayInventory() {
    return new Promise((resolve) => {
        inventoryBody.innerHTML = '';
        
        const sortedProducts = [...productsData].sort((a, b) => {
            const catA = categoriesData.findIndex(cat => cat.id === a.category);
            const catB = categoriesData.findIndex(cat => cat.id === b.category);
            if (catA !== catB) return catA - catB;
            return a.name.localeCompare(b.name);
        });
        
        let totalValue = 0;
        const fragment = document.createDocumentFragment();
        
        sortedProducts.forEach(product => {
            const categoryName = categoriesData.find(cat => cat.id === product.category)?.name || product.category;
            totalValue += product.total;
            
            const row = document.createElement('tr');
            row.className = 'inventory-row';
            row.setAttribute('data-category', product.category);
            
            row.innerHTML = `
                <td>
                    <div class="inventory-product">
                        <div class="product-icon">
                            <i class="${product.icon}"></i>
                        </div>
                        <div class="product-details">
                            <strong>${product.name}</strong>
                            <small>${product.details}</small>
                        </div>
                    </div>
                </td>
                <td>
                    <span class="category-badge">${categoryName}</span>
                </td>
                <td>
                    <div class="quantity-display">
                        <span class="quantity-value">${product.quantity}</span>
                        <span class="quantity-unit">${product.unit}</span>
                    </div>
                </td>
                <td>
                    <span class="price-cell">${product.price.toLocaleString()} FCFA</span>
                </td>
                <td>
                    <span class="total-cell">${product.total.toLocaleString()} FCFA</span>
                </td>
            `;
            
            fragment.appendChild(row);
        });
        
        inventoryBody.appendChild(fragment);
        totalInventoryValue.textContent = `${totalValue.toLocaleString()} FCFA`;
        updateInventoryStats();
        resolve();
    });
}

function updateInventoryStats() {
    if (totalProducts) {
        totalProducts.textContent = productsData.length;
    }
    if (totalValue) {
        const total = productsData.reduce((sum, product) => sum + product.total, 0);
        totalValue.textContent = `${total.toLocaleString()} FCFA`;
    }
}

function handleInventorySearch(e) {
    const searchTerm = e.target.value.toLowerCase().trim();
    const rows = inventoryBody.querySelectorAll('.inventory-row');
    
    rows.forEach(row => {
        const productName = row.querySelector('strong').textContent.toLowerCase();
        const productDesc = row.querySelector('small').textContent.toLowerCase();
        const category = row.getAttribute('data-category');
        const categoryText = categoriesData.find(cat => cat.id === category)?.name.toLowerCase() || '';
        
        const matches = productName.includes(searchTerm) || 
                       productDesc.includes(searchTerm) || 
                       categoryText.includes(searchTerm);
        
        row.style.display = matches ? '' : 'none';
    });
}

// ===== MODAL PANIER =====
function openCart() {
    cartModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    cartModal.setAttribute('aria-hidden', 'false');
    renderCartModal();
    
    setTimeout(() => {
        const closeBtn = cartModal.querySelector('.close-cart');
        if (closeBtn) closeBtn.focus();
    }, 100);
}

function closeCartModal() {
    cartModal.style.display = 'none';
    document.body.style.overflow = '';
    cartModal.setAttribute('aria-hidden', 'true');
}

function renderCartModal() {
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        emptyCartMessage.style.display = 'block';
        cartTotal.textContent = '0 FCFA';
        return;
    }
    
    emptyCartMessage.style.display = 'none';
    
    let total = 0;
    const fragment = document.createDocumentFragment();
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <div class="cart-item-details">
                <div class="cart-item-icon">
                    <i class="${item.icon}"></i>
                </div>
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p class="cart-item-desc">${item.details}</p>
                    <div class="cart-item-price">${item.price.toLocaleString()} FCFA</div>
                </div>
            </div>
            <div class="cart-item-quantity">
                <button class="quantity-btn decrease-quantity-cart" 
                        data-index="${index}"
                        aria-label="Diminuer la quantité">
                    <i class="fas fa-minus"></i>
                </button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn increase-quantity-cart" 
                        data-index="${index}"
                        aria-label="Augmenter la quantité">
                    <i class="fas fa-plus"></i>
                </button>
            </div>
            <div class="cart-item-total">
                ${itemTotal.toLocaleString()} FCFA
            </div>
            <button class="remove-item" 
                    data-index="${index}" 
                    aria-label="Supprimer du panier">
                <i class="fas fa-trash"></i>
            </button>
        `;
        
        fragment.appendChild(cartItemElement);
    });
    
    cartItems.appendChild(fragment);
    cartTotal.textContent = `${total.toLocaleString()} FCFA`;
    
    // Ajouter les événements
    cartItems.querySelectorAll('.decrease-quantity-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.closest('button').getAttribute('data-index'));
            updateCartItemQuantity(index, cart[index].quantity - 1);
        });
    });
    
    cartItems.querySelectorAll('.increase-quantity-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.closest('button').getAttribute('data-index'));
            updateCartItemQuantity(index, cart[index].quantity + 1);
        });
    });
    
    cartItems.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.closest('button').getAttribute('data-index'));
            if (confirm('Supprimer cet article du panier ?')) {
                removeFromCart(index);
            }
        });
    });
}

// ===== RÉCAPITULATIF DE COMMANDE =====
function updateOrderSummary() {
    if (!orderItems || !orderTotal || !orderSubtotal || !orderDelivery) return;
    
    orderItems.innerHTML = '';
    
    if (cart.length === 0) {
        orderItems.innerHTML = `
            <div class="empty-order">
                <i class="fas fa-shopping-cart"></i>
                <p>Votre panier est vide</p>
                <a href="#produits" class="btn btn-small btn-primary">
                    <i class="fas fa-shopping-basket"></i> Voir les produits
                </a>
            </div>
        `;
        orderTotal.textContent = '0 FCFA';
        orderSubtotal.textContent = '0 FCFA';
        orderDelivery.textContent = '0 FCFA';
        return;
    }
    
    let subtotal = 0;
    const fragment = document.createDocumentFragment();
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        const itemElement = document.createElement('div');
        itemElement.className = 'order-item';
        itemElement.innerHTML = `
            <div class="order-item-main">
                <div class="order-item-icon">
                    <i class="${item.icon}"></i>
                </div>
                <div class="order-item-details">
                    <h4>${item.name}</h4>
                    <p class="order-item-desc">${item.details}</p>
                    <div class="order-item-meta">
                        <span class="order-item-price">${item.price.toLocaleString()} FCFA/unité</span>
                        <span class="order-item-category">${item.category}</span>
                    </div>
                </div>
            </div>
            <div class="order-item-quantity">
                <button class="btn btn-small btn-outline order-item-decrease" data-index="${index}">
                    <i class="fas fa-minus"></i>
                </button>
                <span class="order-item-count">${item.quantity}</span>
                <button class="btn btn-small btn-outline order-item-increase" data-index="${index}">
                    <i class="fas fa-plus"></i>
                </button>
            </div>
            <div class="order-item-total">
                ${itemTotal.toLocaleString()} FCFA
            </div>
            <button class="order-item-remove" data-index="${index}" aria-label="Supprimer">
                <i class="fas fa-trash"></i>
            </button>
        `;
        
        fragment.appendChild(itemElement);
    });
    
    orderItems.appendChild(fragment);
    
    // Calcul des frais de livraison
    let deliveryFee = 0;
    if (deliveryMethod) {
        switch (deliveryMethod.value) {
            case 'delivery_sokone':
                deliveryFee = 500;
                break;
            case 'delivery_region':
                deliveryFee = 2000;
                break;
        }
    }
    
    const total = subtotal + deliveryFee;
    
    orderSubtotal.textContent = `${subtotal.toLocaleString()} FCFA`;
    orderDelivery.textContent = `${deliveryFee.toLocaleString()} FCFA`;
    orderTotal.textContent = `${total.toLocaleString()} FCFA`;
    
    // Ajouter les événements pour les boutons
    orderItems.querySelectorAll('.order-item-decrease').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.closest('button').getAttribute('data-index'));
            updateCartItemQuantity(index, cart[index].quantity - 1);
        });
    });
    
    orderItems.querySelectorAll('.order-item-increase').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.closest('button').getAttribute('data-index'));
            updateCartItemQuantity(index, cart[index].quantity + 1);
        });
    });
    
    orderItems.querySelectorAll('.order-item-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.closest('button').getAttribute('data-index'));
            if (confirm('Supprimer cet article du panier ?')) {
                removeFromCart(index);
            }
        });
    });
}

// ===== FORMULAIRE DE COMMANDE =====
function setupOrderForm() {
    if (!orderForm) return;
    
    // Validation en temps réel
    const inputs = orderForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
    
    // Mettre à jour les frais de livraison
    if (deliveryMethod) {
        deliveryMethod.addEventListener('change', updateOrderSummary);
    }
    
    // Gérer la soumission
    orderForm.addEventListener('submit', handleOrderSubmit);
    
    // Gérer le bouton "Modifier le panier"
    if (editCartBtn) {
        editCartBtn.addEventListener('click', () => {
            closeCartModal();
            document.getElementById('commande').scrollIntoView({ behavior: 'smooth' });
        });
    }
}

function validateField(e) {
    const field = e.target;
    const errorElement = document.getElementById(`${field.id}Error`);
    
    if (!field.checkValidity()) {
        let errorMessage = '';
        
        if (field.validity.valueMissing) {
            errorMessage = 'Ce champ est obligatoire';
        } else if (field.validity.typeMismatch) {
            if (field.type === 'email') {
                errorMessage = 'Veuillez entrer une adresse email valide';
            } else if (field.type === 'tel') {
                errorMessage = 'Veuillez entrer un numéro de téléphone valide';
            }
        } else if (field.validity.patternMismatch) {
            errorMessage = 'Format invalide';
        }
        
        if (errorElement) {
            errorElement.textContent = errorMessage;
            errorElement.classList.add('show');
        }
        
        field.classList.add('invalid');
        return false;
    }
    
    if (errorElement) {
        errorElement.classList.remove('show');
    }
    field.classList.remove('invalid');
    return true;
}

function clearFieldError(e) {
    const field = e.target;
    const errorElement = document.getElementById(`${field.id}Error`);
    
    if (errorElement) {
        errorElement.classList.remove('show');
    }
    field.classList.remove('invalid');
}

function handleOrderSubmit(e) {
    e.preventDefault();
    
    if (cart.length === 0) {
        showNotification('Votre panier est vide !', 'error');
        return;
    }
    
    // Valider tous les champs
    const inputs = orderForm.querySelectorAll('[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField({ target: input })) {
            isValid = false;
        }
    });
    
    if (!isValid) {
        showNotification('Veuillez corriger les erreurs dans le formulaire', 'error');
        return;
    }
    
    // Désactiver le bouton de soumission
    if (submitOrderBtn) {
        submitOrderBtn.disabled = true;
        submitOrderBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Traitement...';
    }
    
    // Récupérer les données du formulaire
    const formData = new FormData(orderForm);
    const orderData = {
        fullName: formData.get('fullName'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        address: formData.get('address'),
        deliveryMethod: formData.get('deliveryMethod'),
        paymentMethod: formData.get('paymentMethod'),
        notes: formData.get('notes'),
        cart: cart,
        date: new Date().toISOString(),
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    };
    
    // Ajouter les frais de livraison
    let deliveryFee = 0;
    if (orderData.deliveryMethod === 'delivery_sokone') {
        deliveryFee = 500;
    } else if (orderData.deliveryMethod === 'delivery_region') {
        deliveryFee = 2000;
    }
    orderData.totalWithDelivery = orderData.total + deliveryFee;
    
    // Préparer le message WhatsApp
    const phoneNumber = "221780176427";
    const whatsappMessage = formatWhatsAppMessage(orderData);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Sauvegarder la commande localement
    saveOrderToStorage(orderData);
    
    // Afficher un message de confirmation
    showNotification('Préparation de votre commande...', 'success');
    
    // Ouvrir WhatsApp après un court délai
    setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        
        // Réinitialiser le formulaire et le panier
        setTimeout(() => {
            orderForm.reset();
            cart = [];
            updateCartCount();
            updateOrderSummary();
            saveCartToLocalStorage();
            renderCartModal();
            
            if (submitOrderBtn) {
                submitOrderBtn.disabled = false;
                submitOrderBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Envoyer la commande';
            }
            
            showNotification('Commande envoyée ! Vous allez être redirigé vers WhatsApp.', 'success', 5000);
        }, 1000);
    }, 1500);
}

function formatWhatsAppMessage(orderData) {
    let message = `🎉 NOUVELLE COMMANDE - Librairie Sokone 🎉\n\n`;
    message += `📦 **DÉTAILS DE LA COMMANDE**\n`;
    message += `────────────────\n\n`;
    
    orderData.cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        message += `${index + 1}. ${item.quantity}x ${item.name}\n`;
        message += `   📝 ${item.details}\n`;
        message += `   💰 ${item.price.toLocaleString()} FCFA × ${item.quantity} = ${itemTotal.toLocaleString()} FCFA\n\n`;
    });
    
    message += `📊 **RÉCAPITULATIF**\n`;
    message += `────────────────\n`;
    message += `Sous-total: ${orderData.total.toLocaleString()} FCFA\n`;
    
    let deliveryText = '';
    switch (orderData.deliveryMethod) {
        case 'pickup':
            deliveryText = 'Retrait en magasin (Gratuit)';
            break;
        case 'delivery_sokone':
            deliveryText = 'Livraison à Sokone (500 FCFA)';
            break;
        case 'delivery_region':
            deliveryText = 'Livraison dans la région (2,000 FCFA)';
            break;
    }
    
    message += `Livraison: ${deliveryText}\n`;
    message += `**TOTAL: ${orderData.totalWithDelivery.toLocaleString()} FCFA**\n\n`;
    
    message += `👤 **INFORMATIONS CLIENT**\n`;
    message += `────────────────\n`;
    message += `Nom: ${orderData.fullName}\n`;
    message += `Téléphone: ${orderData.phone}\n`;
    message += `Email: ${orderData.email || 'Non fourni'}\n`;
    message += `Adresse: ${orderData.address}\n`;
    message += `Mode de paiement: ${getPaymentMethodText(orderData.paymentMethod)}\n\n`;
    
    if (orderData.notes) {
        message += `📝 **NOTES SUPPLÉMENTAIRES**\n`;
        message += `────────────────\n`;
        message += `${orderData.notes}\n\n`;
    }
    
    message += `🕐 Commande passée le: ${new Date(orderData.date).toLocaleString('fr-FR')}\n`;
    message += `🔔 ID de commande: CMD-${Date.now().toString().slice(-6)}`;
    
    return message;
}

function saveOrderToStorage(orderData) {
    try {
        const orders = JSON.parse(localStorage.getItem('orders_sokone') || '[]');
        orders.push(orderData);
        localStorage.setItem('orders_sokone', JSON.stringify(orders));
        console.log('💾 Commande sauvegardée localement');
    } catch (e) {
        console.error('Erreur de sauvegarde de la commande:', e);
    }
}

// ===== NOTIFICATIONS =====
function showNotification(message, type = 'info', duration = 3000) {
    // Supprimer les notifications existantes
    document.querySelectorAll('.notification').forEach(n => n.remove());
    
    // Annuler le timeout précédent
    if (notificationTimeout) {
        clearTimeout(notificationTimeout);
    }
    
    const notification = document.createElement('div');
    notification.className = `notification`;
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'polite');
    
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${icons[type] || 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" aria-label="Fermer la notification">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(notification);
    
    // Animation d'entrée
    setTimeout(() => {
        notification.classList.add('show');
        notification.classList.add(type);
    }, 10);
    
    // Fermer au clic
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        closeNotification(notification);
    });
    
    // Fermer automatiquement
    notificationTimeout = setTimeout(() => {
        closeNotification(notification);
    }, duration);
}

function closeNotification(notification) {
    if (notification && notification.parentNode) {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }
}

// ===== UTILITAIRES =====
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function getDeliveryMethodText(method) {
    switch(method) {
        case 'pickup': return 'Retrait en magasin';
        case 'delivery_sokone': return 'Livraison à Sokone';
        case 'delivery_region': return 'Livraison dans la région';
        default: return method;
    }
}

function getPaymentMethodText(method) {
    switch(method) {
        case 'cash': return 'Espèces à la livraison';
        case 'orange': return 'Orange Money';
        case 'wave': return 'Wave';
        case 'card': return 'Carte bancaire';
        default: return method;
    }
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('fr-FR').format(amount);
}

// ===== GESTION DES ÉVÉNEMENTS =====
function setupEventListeners() {
    // Menu
    setupMenu();
    
    // Panier
    cartIcon.addEventListener('click', openCart);
    closeCart.addEventListener('click', closeCartModal);
    continueShopping.addEventListener('click', closeCartModal);
    
    // Fermer le panier en cliquant à l'extérieur
    cartModal.addEventListener('click', function(e) {
        if (e.target === cartModal) {
            closeCartModal();
        }
    });
    
    // Fermer avec ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (cartModal.style.display === 'flex') {
                closeCartModal();
            }
            if (document.querySelector('.lightbox.active')) {
                closeLightbox(document.querySelector('.lightbox.active'));
            }
        }
    });
    
    // Formulaire de commande
    setupOrderForm();
    
    // Recherche dans l'inventaire
    if (inventorySearch) {
        inventorySearch.addEventListener('input', handleInventorySearch);
    }
    
    // Scroll header
    window.addEventListener('scroll', handleHeaderScroll);
    
    // Redirection depuis le bouton de commande
    checkoutBtn.addEventListener('click', function() {
        closeCartModal();
        document.getElementById('commande').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    });
    
    // Smooth scroll pour les ancres
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                closeMenu();
            }
        });
    });
}

function handleHeaderScroll() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// ===== INITIALISATION AU CHARGEMENT =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialiser l'application
    init();
    
    // Configurer les événements
    setupEventListeners();
    
    // Ajouter le smooth scroll pour les ancres
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                closeMenu();
            }
        });
    });
});

// ===== EXPORT POUR DEBUG =====
if (typeof window !== 'undefined') {
    window.librairieApp = {
        cart,
        productsData,
        categoriesData,
        galleryImages,
        addToCart,
        updateCartCount,
        showNotification,
        getCartTotal: () => cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        init
    };
}
