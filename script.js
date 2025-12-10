// Variables globales
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentCategory = 'tous';

// DOM Elements
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const categoriesGrid = document.getElementById('categoriesGrid');
const productsGrid = document.getElementById('productsGrid');
const inventoryBody = document.getElementById('inventoryBody');
const totalInventoryValue = document.getElementById('totalInventoryValue');
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
const orderTotal = document.getElementById('orderTotal');

// Menu mobile
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Fermer le menu mobile en cliquant sur un lien
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Initialiser l'affichage
function init() {
    displayCategories();
    displayProducts();
    displayInventory();
    updateCartCount();
    updateOrderSummary();
}

// Afficher les catégories
function displayCategories() {
    categoriesGrid.innerHTML = '';
    
    categoriesData.forEach(category => {
        // Compter le nombre de produits par catégorie
        const productCount = category.id === 'tous' 
            ? productsData.length 
            : productsData.filter(product => product.category === category.id).length;
        
        const categoryElement = document.createElement('div');
        categoryElement.className = 'category-card';
        categoryElement.setAttribute('data-category', category.id);
        
        if (category.id === 'tous') {
            categoryElement.classList.add('active');
        }
        
        categoryElement.innerHTML = `
            <div class="category-icon" style="color: ${category.color}">
                <i class="${category.icon}"></i>
            </div>
            <h3>${category.name}</h3>
            <div class="category-count">${productCount} produits</div>
        `;
        
        categoriesGrid.appendChild(categoryElement);
    });
    
    // Gestion des clics sur les catégories
    categoriesGrid.addEventListener('click', handleCategoryClick);
}

// Gérer le clic sur une catégorie
function handleCategoryClick(e) {
    const categoryCard = e.target.closest('.category-card');
    if (!categoryCard) return;
    
    // Retirer la classe active de toutes les catégories
    document.querySelectorAll('.category-card').forEach(card => {
        card.classList.remove('active');
    });
    
    // Ajouter la classe active à la catégorie cliquée
    categoryCard.classList.add('active');
    
    // Afficher les produits de la catégorie sélectionnée
    const category = categoryCard.getAttribute('data-category');
    currentCategory = category;
    displayProducts(category);
}

// Afficher les produits
function displayProducts(category = 'tous') {
    productsGrid.innerHTML = '';
    
    const filteredProducts = category === 'tous' 
        ? productsData 
        : productsData.filter(product => product.category === category);
    
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
                <i class="fas fa-box-open" style="font-size: 3rem; color: #ccc; margin-bottom: 1rem;"></i>
                <h3 style="color: #666;">Aucun produit disponible</h3>
                <p style="color: #999;">Cette catégorie est temporairement vide.</p>
            </div>
        `;
        return;
    }
    
    filteredProducts.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product-card';
        
        // Déterminer le statut du stock
        let stockText = '';
        let stockClass = '';
        if (product.quantity <= 0) {
            stockText = 'Rupture de stock';
            stockClass = 'out-of-stock';
        } else if (product.quantity <= 3) {
            stockText = 'Stock faible';
            stockClass = 'low-stock';
        } else {
            stockText = 'En stock';
            stockClass = 'in-stock';
        }
        
        productElement.innerHTML = `
            ${product.quantity <= 3 ? `<div class="product-badge">${product.quantity <= 0 ? 'Rupture' : 'Bientôt épuisé'}</div>` : ''}
            <div class="product-image">
                <i class="${product.icon}"></i>
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-category">
                    <i class="fas fa-tag"></i>
                    ${categoriesData.find(cat => cat.id === product.category)?.name || product.category}
                </div>
                <p class="product-details">${product.details}</p>
                <div class="product-price">${product.price.toLocaleString()} FCFA</div>
                <div class="product-stock ${stockClass}">
                    <i class="fas fa-${product.quantity <= 0 ? 'times-circle' : product.quantity <= 3 ? 'exclamation-triangle' : 'check-circle'}"></i>
                    ${stockText} (${product.quantity} ${product.unit})
                </div>
                ${product.quantity > 0 ? `
                    <div class="quantity-controls">
                        <button class="quantity-btn decrease-quantity" data-id="${product.id}">-</button>
                        <input type="number" class="quantity-input" id="quantity-${product.id}" value="1" min="1" max="${product.quantity}">
                        <button class="quantity-btn increase-quantity" data-id="${product.id}">+</button>
                    </div>
                    <button class="btn btn-primary add-to-cart" data-id="${product.id}" style="width: 100%;">
                        <i class="fas fa-cart-plus"></i> Ajouter au panier
                    </button>
                ` : `
                    <button class="btn btn-secondary" disabled style="width: 100%;">
                        <i class="fas fa-ban"></i> Indisponible
                    </button>
                `}
            </div>
        `;
        
        productsGrid.appendChild(productElement);
    });
    
    // Ajouter les événements pour les contrôles de quantité et l'ajout au panier
    productsGrid.addEventListener('click', handleProductControls);
}

// Gérer les contrôles des produits
function handleProductControls(e) {
    const target = e.target;
    
    if (target.classList.contains('increase-quantity')) {
        const productId = target.getAttribute('data-id');
        const input = document.getElementById(`quantity-${productId}`);
        const max = parseInt(input.max);
        if (parseInt(input.value) < max) {
            input.value = parseInt(input.value) + 1;
        }
    } else if (target.classList.contains('decrease-quantity')) {
        const productId = target.getAttribute('data-id');
        const input = document.getElementById(`quantity-${productId}`);
        if (parseInt(input.value) > 1) {
            input.value = parseInt(input.value) - 1;
        }
    } else if (target.classList.contains('add-to-cart')) {
        const productId = target.getAttribute('data-id');
        const input = document.getElementById(`quantity-${productId}`);
        const quantity = parseInt(input.value);
        addToCart(productId, quantity);
    }
}

// Afficher l'inventaire
function displayInventory() {
    inventoryBody.innerHTML = '';
    
    // Trier les produits par catégorie
    const sortedProducts = [...productsData].sort((a, b) => {
        const catA = categoriesData.findIndex(cat => cat.id === a.category);
        const catB = categoriesData.findIndex(cat => cat.id === b.category);
        return catA - catB;
    });
    
    let totalValue = 0;
    
    sortedProducts.forEach(product => {
        const categoryName = categoriesData.find(cat => cat.id === product.category)?.name || product.category;
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <strong>${product.name}</strong><br>
                <small>${product.details}</small>
            </td>
            <td>${categoryName}</td>
            <td>${product.quantity} ${product.unit}</td>
            <td>${product.price.toLocaleString()} FCFA</td>
            <td>${product.total.toLocaleString()} FCFA</td>
        `;
        
        inventoryBody.appendChild(row);
        totalValue += product.total;
    });
    
    // Afficher la valeur totale
    totalInventoryValue.textContent = `${totalValue.toLocaleString()} FCFA`;
}

// Mettre à jour le compteur du panier
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Sauvegarder le panier dans le localStorage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Ajouter un produit au panier
function addToCart(productId, quantity = 1) {
    const product = productsData.find(p => p.id == productId);
    
    if (!product) return;
    
    // Vérifier le stock
    if (product.quantity <= 0) {
        showNotification(`Désolé, "${product.name}" est en rupture de stock.`, 'error');
        return;
    }
    
    // Vérifier si la quantité demandée est disponible
    if (quantity > product.quantity) {
        showNotification(`Nous n'avons que ${product.quantity} ${product.unit} de "${product.name}" en stock.`, 'error');
        return;
    }
    
    // Vérifier si le produit est déjà dans le panier
    const existingItem = cart.find(item => item.id == productId);
    
    if (existingItem) {
        // Vérifier si on dépasse le stock
        if (existingItem.quantity + quantity > product.quantity) {
            showNotification(`Nous n'avons que ${product.quantity} ${product.unit} de "${product.name}" en stock.`, 'error');
            return;
        }
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            details: product.details,
            price: product.price,
            quantity: quantity,
            maxQuantity: product.quantity
        });
    }
    
    // Mettre à jour l'interface
    updateCartCount();
    updateOrderSummary();
    saveCartToLocalStorage();
    
    // Afficher une notification
    showNotification(`${quantity} ${product.name} ajouté au panier !`, 'success');
}

// Mettre à jour le résumé de la commande
function updateOrderSummary() {
    orderItems.innerHTML = '';
    
    if (cart.length === 0) {
        orderItems.innerHTML = '<p class="empty-order">Votre panier est vide. Ajoutez des produits ci-dessus.</p>';
        orderTotal.textContent = '0 FCFA';
        return;
    }
    
    let total = 0;
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const itemElement = document.createElement('div');
        itemElement.className = 'order-item';
        itemElement.innerHTML = `
            <div>
                <strong>${item.name}</strong><br>
                <small>${item.details}</small>
            </div>
            <div>
                ${item.quantity} × ${item.price.toLocaleString()} FCFA
            </div>
        `;
        
        orderItems.appendChild(itemElement);
    });
    
    orderTotal.textContent = `${total.toLocaleString()} FCFA`;
}

// Afficher une notification
function showNotification(message, type = 'info') {
    // Créer l'élément de notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Ajouter des styles pour la notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 3000;
        display: flex;
        align-items: center;
        gap: 10px;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Retirer la notification après 3 secondes
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Ajouter l'animation pour les notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Gestion du panier
cartIcon.addEventListener('click', openCart);
closeCart.addEventListener('click', closeCartModal);
continueShopping.addEventListener('click', closeCartModal);

// Fermer le panier en cliquant à l'extérieur
cartModal.addEventListener('click', function(e) {
    if (e.target === cartModal) {
        closeCartModal();
    }
});

function openCart() {
    cartModal.style.display = 'flex';
    renderCart();
}

function closeCartModal() {
    cartModal.style.display = 'none';
}

// Afficher le contenu du panier dans la modal
function renderCart() {
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        emptyCartMessage.style.display = 'block';
        cartTotal.textContent = '0 FCFA';
        return;
    }
    
    emptyCartMessage.style.display = 'none';
    
    let total = 0;
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        
        cartItemElement.innerHTML = `
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p style="color: #666; font-size: 0.9rem;">${item.details}</p>
                <div class="cart-item-price">${item.price.toLocaleString()} FCFA</div>
            </div>
            <div class="cart-item-quantity">
                <button class="quantity-btn decrease-quantity-cart" data-index="${index}">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn increase-quantity-cart" data-index="${index}">+</button>
            </div>
            <div class="cart-item-total">${itemTotal.toLocaleString()} FCFA</div>
            <button class="remove-item" data-index="${index}" title="Supprimer">
                <i class="fas fa-trash"></i>
            </button>
        `;
        
        cartItems.appendChild(cartItemElement);
    });
    
    cartTotal.textContent = `${total.toLocaleString()} FCFA`;
}

// Gestion des quantités dans le panier
cartItems.addEventListener('click', function(e) {
    const target = e.target.closest('button');
    if (!target) return;
    
    const index = parseInt(target.getAttribute('data-index'));
    
    if (target.classList.contains('decrease-quantity-cart')) {
        if (cart[index].quantity > 1) {
            cart[index].quantity--;
        } else {
            cart.splice(index, 1);
        }
    } else if (target.classList.contains('increase-quantity-cart')) {
        if (cart[index].quantity < cart[index].maxQuantity) {
            cart[index].quantity++;
        } else {
            showNotification(`Stock maximum atteint pour "${cart[index].name}"`, 'error');
        }
    } else if (target.classList.contains('remove-item')) {
        cart.splice(index, 1);
    }
    
    updateCartCount();
    updateOrderSummary();
    saveCartToLocalStorage();
    renderCart();
});

// Gestion de la commande via le formulaire
orderForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (cart.length === 0) {
        showNotification('Votre panier est vide !', 'error');
        return;
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
    
    // Préparer le message pour WhatsApp
    const phoneNumber = "221780176427"; // Numéro de téléphone pour WhatsApp
    let message = `Bonjour, je souhaite commander les produits suivants :%0A%0A`;
    
    cart.forEach(item => {
        message += `• ${item.quantity}x ${item.name} (${item.details}) - ${(item.price * item.quantity).toLocaleString()} FCFA%0A`;
    });
    
    message += `%0A───────────────%0A`;
    message += `Sous-total: ${orderData.total.toLocaleString()} FCFA%0A`;
    
    if (deliveryFee > 0) {
        message += `Frais de livraison: ${deliveryFee.toLocaleString()} FCFA%0A`;
    }
    
    message += `Total: ${orderData.totalWithDelivery.toLocaleString()} FCFA%0A%0A`;
    message += `Informations client :%0A`;
    message += `Nom: ${orderData.fullName}%0A`;
    message += `Téléphone: ${orderData.phone}%0A`;
    message += `Email: ${orderData.email || 'Non fourni'}%0A`;
    message += `Adresse: ${orderData.address}%0A`;
    message += `Livraison: ${getDeliveryMethodText(orderData.deliveryMethod)}%0A`;
    message += `Paiement: ${getPaymentMethodText(orderData.paymentMethod)}%0A`;
    
    if (orderData.notes) {
        message += `Notes: ${orderData.notes}%0A`;
    }
    
    message += `%0AMerci !`;
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    
    // Ouvrir WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Afficher une confirmation
    showNotification('Commande envoyée ! Vous allez être redirigé vers WhatsApp.', 'success');
    
    // Réinitialiser le formulaire (optionnel)
    setTimeout(() => {
        orderForm.reset();
        cart = [];
        updateCartCount();
        updateOrderSummary();
        saveCartToLocalStorage();
        renderCart();
    }, 2000);
});

// Gestion du bouton de commande dans le panier
checkoutBtn.addEventListener('click', function() {
    closeCartModal();
    // Faire défiler jusqu'au formulaire de commande
    document.getElementById('commande').scrollIntoView({ behavior: 'smooth' });
});

// Helper functions
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
        default: return method;
    }
}

// Changement de style de l'en-tête au défilement
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.08)';
    } else {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.97)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
});

// Initialiser l'application
document.addEventListener('DOMContentLoaded', init);