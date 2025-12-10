// ============================================
// FICHIER: data.js
// Description: Toutes les données du site
// ============================================

// Données des catégories
const categoriesData = [
    { id: 'tous', name: 'Tous les produits', icon: 'fas fa-box', color: '#2c5530' },
    { id: 'cahiers', name: 'Cahiers', icon: 'fas fa-book', color: '#8b4513' },
    { id: 'fournitures', name: 'Fournitures', icon: 'fas fa-pencil-alt', color: '#d4a76a' },
    { id: 'livres', name: 'Livres Scolaires', icon: 'fas fa-graduation-cap', color: '#2c5530' },
    { id: 'bureau', name: 'Matériel Bureau', icon: 'fas fa-print', color: '#1a1a1a' },
    { id: 'romans', name: 'Romans/Littérature', icon: 'fas fa-feather-alt', color: '#8b4513' }
];

// Données des produits
const productsData = [
    // Cahiers
    { id: 1, name: "Cahier 100 pages", details: "Paquet de 10 cahiers, 100 pages", price: 400, quantity: 3, unit: "paquets", category: "cahiers", total: 1200, icon: "fas fa-book", stockStatus: "in-stock" },
    { id: 2, name: "Cahier Travaux Pratiques 100 pages", details: "Avec feuilles blanches, paquet de 10", price: 500, quantity: 9, unit: "paquets", category: "cahiers", total: 4500, icon: "fas fa-book", stockStatus: "in-stock" },
    { id: 3, name: "Cahier TP 100 pages", details: "Sans feuilles blanches, paquet de 10", price: 1000, quantity: 9, unit: "paquets", category: "cahiers", total: 9000, icon: "fas fa-book", stockStatus: "in-stock" },
    { id: 4, name: "Cahier TP 200 pages", details: "Avec feuilles blanches, paquet de 5", price: 1200, quantity: 5, unit: "paquets", category: "cahiers", total: 6000, icon: "fas fa-book", stockStatus: "in-stock" },
    { id: 5, name: "Cahier TP 200 pages", details: "Sans feuilles blanches, paquet de 5", price: 1500, quantity: 7, unit: "paquets", category: "cahiers", total: 10500, icon: "fas fa-book", stockStatus: "in-stock" },
    { id: 6, name: "Cahier 200 pages", details: "Paquet de 10 cahiers, 200 pages", price: 400, quantity: 8, unit: "paquets", category: "cahiers", total: 3200, icon: "fas fa-book", stockStatus: "in-stock" },
    { id: 7, name: "Cahier 48 pages", details: "Paquet de 10 cahiers, 48 pages", price: 150, quantity: 7, unit: "paquets", category: "cahiers", total: 1050, icon: "fas fa-book", stockStatus: "in-stock" },
    { id: 8, name: "Cahier 32 pages", details: "Paquet de 10 cahiers, 32 pages", price: 125, quantity: 39, unit: "paquets", category: "cahiers", total: 4875, icon: "fas fa-book", stockStatus: "in-stock" },
    { id: 9, name: "Cahier A4 600 pages", details: "Cahier relié format A4", price: 3500, quantity: 4, unit: "cahiers", category: "cahiers", total: 14000, icon: "fas fa-book", stockStatus: "in-stock" },
    { id: 10, name: "Cahier dessin 16 pages", details: "Paquet de 5 cahiers de dessin", price: 800, quantity: 1, unit: "paquets", category: "cahiers", total: 800, icon: "fas fa-palette", stockStatus: "low-stock" },
    { id: 11, name: "Cahier dessin 32 pages", details: "Paquet de 5 cahiers de dessin", price: 1200, quantity: 2, unit: "paquets", category: "cahiers", total: 2400, icon: "fas fa-palette", stockStatus: "in-stock" },
    
    // Fournitures
    { id: 12, name: "Crayon noir", details: "Paquet de 12 crayons HB", price: 300, quantity: 6, unit: "paquets", category: "fournitures", total: 1800, icon: "fas fa-pencil-alt", stockStatus: "in-stock" },
    { id: 13, name: "Gomme", details: "Paquet de 10 gommes blanches", price: 500, quantity: 2, unit: "paquets", category: "fournitures", total: 1000, icon: "fas fa-eraser", stockStatus: "low-stock" },
    { id: 14, name: "Crayon couleur", details: "Boîte de 12 crayons de couleur", price: 1500, quantity: 1, unit: "boîtes", category: "fournitures", total: 1500, icon: "fas fa-palette", stockStatus: "low-stock" },
    { id: 15, name: "Rapporteur", details: "Rapporteur plastique 180°", price: 250, quantity: 9, unit: "unités", category: "fournitures", total: 2250, icon: "fas fa-drafting-compass", stockStatus: "in-stock" },
    { id: 16, name: "Équerre", details: "Équerre plastique 45°/90°", price: 250, quantity: 5, unit: "unités", category: "fournitures", total: 1250, icon: "fas fa-drafting-compass", stockStatus: "in-stock" },
    { id: 17, name: "Règle", details: "Règle 30 cm plastique", price: 200, quantity: 2, unit: "unités", category: "fournitures", total: 400, icon: "fas fa-ruler", stockStatus: "low-stock" },
    { id: 18, name: "Compas", details: "Compas métal avec crayon", price: 500, quantity: 3, unit: "unités", category: "fournitures", total: 1500, icon: "fas fa-drafting-compass", stockStatus: "in-stock" },
    { id: 19, name: "Craie couleur", details: "Boîte de 12 craies de couleur", price: 750, quantity: 20, unit: "boîtes", category: "fournitures", total: 15000, icon: "fas fa-chalkboard", stockStatus: "in-stock" },
    { id: 20, name: "Craie blanche", details: "Paquet de 100 craies blanches", price: 500, quantity: 6, unit: "paquets", category: "fournitures", total: 3000, icon: "fas fa-chalkboard", stockStatus: "in-stock" },
    
    // Matériel de bureau
    { id: 21, name: "Scotch mural", details: "Grand rouleau scotch double-face", price: 800, quantity: 10, unit: "rouleaux", category: "bureau", total: 8000, icon: "fas fa-tape", stockStatus: "in-stock" },
    { id: 22, name: "Scotch GM plast", details: "Scotch transparent grand format", price: 700, quantity: 8, unit: "rouleaux", category: "bureau", total: 5600, icon: "fas fa-tape", stockStatus: "in-stock" },
    { id: 23, name: "Enveloppe moyen format", details: "Paquet de 50 enveloppes", price: 1500, quantity: 7, unit: "paquets", category: "bureau", total: 10500, icon: "fas fa-envelope", stockStatus: "in-stock" },
    { id: 24, name: "Fiche bristol", details: "Paquet de 100 fiches bristol", price: 1750, quantity: 13, unit: "paquets", category: "bureau", total: 22750, icon: "fas fa-sticky-note", stockStatus: "in-stock" },
    { id: 25, name: "Chemise dossier", details: "Paquet de 10 chemises cartonnées", price: 100, quantity: 3, unit: "paquets", category: "bureau", total: 300, icon: "fas fa-folder", stockStatus: "in-stock" },
    { id: 26, name: "Registre d'appel", details: "Registre 300 pages", price: 1000, quantity: 11, unit: "registres", category: "bureau", total: 11000, icon: "fas fa-clipboard-list", stockStatus: "in-stock" },
    { id: 27, name: "Livret de famille", details: "Modèle officiel", price: 500, quantity: 18, unit: "livrets", category: "bureau", total: 9000, icon: "fas fa-passport", stockStatus: "in-stock" },
    { id: 28, name: "Tampon encreur", details: "Tampon HORSE avec encre bleue", price: 2500, quantity: 1, unit: "paquets", category: "bureau", total: 2500, icon: "fas fa-stamp", stockStatus: "low-stock" },
    
    // Livres scolaires
    { id: 29, name: "Ami et Rémi Lecture CP", details: "Manuel scolaire de lecture", price: 2500, quantity: 6, unit: "livres", category: "livres", total: 15000, icon: "fas fa-graduation-cap", stockStatus: "in-stock" },
    { id: 30, name: "Ami et Rémi Grammaire CM1", details: "Manuel scolaire de grammaire", price: 2800, quantity: 23, unit: "livres", category: "livres", total: 64400, icon: "fas fa-graduation-cap", stockStatus: "in-stock" },
    { id: 31, name: "Mathématiques CM2", details: "Collection excellence", price: 3000, quantity: 5, unit: "livres", category: "livres", total: 15000, icon: "fas fa-calculator", stockStatus: "in-stock" },
    { id: 32, name: "Go for english 3e", details: "Student's book", price: 3500, quantity: 24, unit: "livres", category: "livres", total: 84000, icon: "fas fa-language", stockStatus: "in-stock" },
    { id: 33, name: "Le français en 6e", details: "Manuel scolaire de français", price: 3200, quantity: 8, unit: "livres", category: "livres", total: 25600, icon: "fas fa-book-open", stockStatus: "in-stock" },
    { id: 34, name: "Histoire 2e étape", details: "Manuel pour cours élémentaires", price: 2800, quantity: 15, unit: "livres", category: "livres", total: 42000, icon: "fas fa-landmark", stockStatus: "in-stock" },
    
    // Romans/Littérature
    { id: 35, name: "Le Pagne Noir", details: "Bernard Dadié", price: 2000, quantity: 7, unit: "livres", category: "romans", total: 14000, icon: "fas fa-feather-alt", stockStatus: "in-stock" },
    { id: 36, name: "Une Vie de Boy", details: "Ferdinand Oyono", price: 2200, quantity: 3, unit: "livres", category: "romans", total: 6600, icon: "fas fa-feather-alt", stockStatus: "in-stock" },
    { id: 37, name: "Soundiata", details: "L'épopée mandingue", price: 2500, quantity: 2, unit: "livres", category: "romans", total: 5000, icon: "fas fa-feather-alt", stockStatus: "low-stock" },
    { id: 38, name: "Sous l'Orage", details: "Seydou Badian", price: 2000, quantity: 3, unit: "livres", category: "romans", total: 6000, icon: "fas fa-feather-alt", stockStatus: "in-stock" },
    { id: 39, name: "Vol de Nuit", details: "Antoine de Saint-Exupéry", price: 1800, quantity: 11, unit: "livres", category: "romans", total: 19800, icon: "fas fa-feather-alt", stockStatus: "in-stock" },
    { id: 40, name: "Phèdre", details: "Jean Racine", price: 1500, quantity: 4, unit: "livres", category: "romans", total: 6000, icon: "fas fa-feather-alt", stockStatus: "in-stock" }
];

// Images de la galerie
// IMPORTANT: Remplacez ces URLs par vos vraies images uploadées sur ImgBB ou autre
const galleryImages = [
    {
        id: 1,
        url: "https://via.placeholder.com/400x300/8b4513/ffffff?text=Ami+et+Remi",
        title: "Livres scolaires - Ami et Rémi",
        description: "Manuel de lecture pour CP et CM2",
        category: "livres"
    },
    {
        id: 2,
        url: "https://via.placeholder.com/400x300/2c5530/ffffff?text=Mathematiques",
        title: "Mathématiques 4e",
        description: "Collection Excellence",
        category: "livres"
    },
    {
        id: 3,
        url: "https://via.placeholder.com/400x300/d4a76a/ffffff?text=Go+for+English",
        title: "Go for English 4e",
        description: "Workbook pour l'anglais",
        category: "livres"
    },
    {
        id: 4,
        url: "https://via.placeholder.com/400x300/8b4513/ffffff?text=Notre+Magasin",
        title: "Notre espace de vente",
        description: "Étagères avec livres et fournitures",
        category: "magasin"
    },
    {
        id: 5,
        url: "https://via.placeholder.com/400x300/2c5530/ffffff?text=Bureau",
        title: "Espace bureautique",
        description: "Fournitures de bureau",
        category: "magasin"
    },
    {
        id: 6,
        url: "https://via.placeholder.com/400x300/d4a76a/ffffff?text=Geometrie",
        title: "Section géométrie",
        description: "Rapporteurs et équerres",
        category: "fournitures"
    },
    {
        id: 7,
        url: "https://via.placeholder.com/400x300/8b4513/ffffff?text=Cahiers",
        title: "Cahiers scolaires",
        description: "Large gamme de cahiers",
        category: "cahiers"
    },
    {
        id: 8,
        url: "https://via.placeholder.com/400x300/2c5530/ffffff?text=CM1",
        title: "Cahier CM1",
        description: "Multidisciplinaire",
        category: "cahiers"
    },
    {
        id: 9,
        url: "https://via.placeholder.com/400x300/d4a76a/ffffff?text=CM2",
        title: "Découverte du monde CM2",
        description: "Géographie et sciences",
        category: "livres"
    }
];