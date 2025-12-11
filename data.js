// ============================================
// FICHIER: data.js - VERSION FINALE COMPLÈTE
// Librairie Sokone - Données avec vraies images
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

// Données des produits AVEC VRAIES IMAGES
const productsData = [
    // Cahiers
    { 
        id: 1, 
        name: "Cahier 100 pages", 
        details: "Paquet de 10 cahiers, 100 pages", 
        price: 400, 
        quantity: 3, 
        unit: "paquets", 
        category: "cahiers", 
        total: 1200, 
        icon: "fas fa-book",
        image: "https://i.ibb.co/DPRnHBRZ/IMG-20251210-110327-394.jpg",
        stockStatus: "in-stock" 
    },
    { 
        id: 2, 
        name: "Cahier Travaux Pratiques 100 pages", 
        details: "Avec feuilles blanches, paquet de 10", 
        price: 500, 
        quantity: 9, 
        unit: "paquets", 
        category: "cahiers", 
        total: 4500, 
        icon: "fas fa-book",
        image: "https://i.ibb.co/k2fKLjqZ/IMG-20251210-141910-507.jpg",
        stockStatus: "in-stock" 
    },
    { 
        id: 3, 
        name: "Cahier TP 100 pages", 
        details: "Sans feuilles blanches, paquet de 10", 
        price: 1000, 
        quantity: 9, 
        unit: "paquets", 
        category: "cahiers", 
        total: 9000, 
        icon: "fas fa-book",
        image: "https://i.ibb.co/m57F12z5/IMG-20251210-142100-568.jpg",
        stockStatus: "in-stock" 
    },
    { 
        id: 4, 
        name: "Cahier TP 200 pages", 
        details: "Avec feuilles blanches, paquet de 5", 
        price: 1200, 
        quantity: 5, 
        unit: "paquets", 
        category: "cahiers", 
        total: 6000, 
        icon: "fas fa-book",
        image: "https://i.ibb.co/zHV51P5T/IMG-20251210-142202-290.jpg",
        stockStatus: "in-stock" 
    },
    { 
        id: 5, 
        name: "Cahier TP 200 pages", 
        details: "Sans feuilles blanches, paquet de 5", 
        price: 1500, 
        quantity: 7, 
        unit: "paquets", 
        category: "cahiers", 
        total: 10500, 
        icon: "fas fa-book",
        image: "https://i.ibb.co/DPRnHBRZ/IMG-20251210-110327-394.jpg",
        stockStatus: "in-stock" 
    },
    { 
        id: 6, 
        name: "Cahier 200 pages", 
        details: "Paquet de 10 cahiers, 200 pages", 
        price: 400, 
        quantity: 8, 
        unit: "paquets", 
        category: "cahiers", 
        total: 3200, 
        icon: "fas fa-book",
        image: "https://i.ibb.co/nM97rLgm/IMG-20251210-110358-435.jpg",
        stockStatus: "in-stock" 
    },
    { 
        id: 7, 
        name: "Cahier 48 pages", 
        details: "Paquet de 10 cahiers, 48 pages", 
        price: 150, 
        quantity: 7, 
        unit: "paquets", 
        category: "cahiers", 
        total: 1050, 
        icon: "fas fa-book",
        image: "https://i.ibb.co/6zGKNVc/IMG-20251210-WA0006.jpg",
        stockStatus: "in-stock" 
    },
    { 
        id: 8, 
        name: "Cahier 32 pages", 
        details: "Paquet de 10 cahiers, 32 pages", 
        price: 125, 
        quantity: 39, 
        unit: "paquets", 
        category: "cahiers", 
        total: 4875, 
        icon: "fas fa-book",
        image: "https://i.ibb.co/DPRnHBRZ/IMG-20251210-110327-394.jpg",
        stockStatus: "in-stock" 
    },
    { 
        id: 9, 
        name: "Cahier A4 600 pages", 
        details: "Cahier relié format A4", 
        price: 3500, 
        quantity: 4, 
        unit: "cahiers", 
        category: "cahiers", 
        total: 14000, 
        icon: "fas fa-book",
        image: "https://i.ibb.co/m57F12z5/IMG-20251210-142100-568.jpg",
        stockStatus: "in-stock" 
    },
    { 
        id: 10, 
        name: "Cahier dessin 16 pages", 
        details: "Paquet de 5 cahiers de dessin", 
        price: 800, 
        quantity: 1, 
        unit: "paquets", 
        category: "cahiers", 
        total: 800, 
        icon: "fas fa-palette",
        image: "https://i.ibb.co/k2fKLjqZ/IMG-20251210-141910-507.jpg",
        stockStatus: "low-stock" 
    },
    { 
        id: 11, 
        name: "Cahier dessin 32 pages", 
        details: "Paquet de 5 cahiers de dessin", 
        price: 1200, 
        quantity: 2, 
        unit: "paquets", 
        category: "cahiers", 
        total: 2400, 
        icon: "fas fa-palette",
        image: "https://i.ibb.co/k2fKLjqZ/IMG-20251210-141910-507.jpg",
        stockStatus: "in-stock" 
    },
    
    // Fournitures
    { 
        id: 12, 
        name: "Crayon noir", 
        details: "Paquet de 12 crayons HB", 
        price: 300, 
        quantity: 6, 
        unit: "paquets", 
        category: "fournitures", 
        total: 1800, 
        icon: "fas fa-pencil-alt",
        image: "https://i.ibb.co/Kxfm5qGv/IMG-20251210-110345-051.jpg",
        stockStatus: "in-stock" 
    },
    { 
        id: 13, 
        name: "Gomme", 
        details: "Paquet de 10 gommes blanches", 
        price: 500, 
        quantity: 2, 
        unit: "paquets", 
        category: "fournitures", 
        total: 1000, 
        icon: "fas fa-eraser",
        image: "https://i.ibb.co/fYpfYybD/IMG-20251210-141916-964.jpg",
        stockStatus: "low-stock" 
    },
    { 
        id: 14, 
        name: "Crayon couleur", 
        details: "Boîte de 12 crayons de couleur", 
        price: 1500, 
        quantity: 1, 
        unit: "boîtes", 
        category: "fournitures", 
        total: 1500, 
        icon: "fas fa-palette",
        image: "https://i.ibb.co/93k8QFgj/IMG-20251210-141902-585.jpg",
        stockStatus: "low-stock" 
    },
    { 
        id: 15, 
        name: "Rapporteur", 
        details: "Rapporteur plastique 180°", 
        price: 250, 
        quantity: 9, 
        unit: "unités", 
        category: "fournitures", 
        total: 2250, 
        icon: "fas fa-drafting-compass",
        image: "https://i.ibb.co/LDKkDJng/IMG-20251210-110337-962.jpg",
        stockStatus: "in-stock" 
    },
    { 
        id: 16, 
        name: "Équerre", 
        details: "Équerre plastique 45°/90°", 
        price: 250, 
        quantity: 5, 
        unit: "unités", 
        category: "fournitures", 
        total: 1250, 
        icon: "fas fa-drafting-compass",
        image: "https://i.ibb.co/LDKkDJng/IMG-20251210-110337-962.jpg",
        stockStatus: "in-stock" 
    },
    { 
        id: 17, 
        name: "Règle", 
        details: "Règle 30 cm plastique", 
        price: 200, 
        quantity: 2, 
        unit: "unités", 
        category: "fournitures", 
        total: 400, 
        icon: "fas fa-ruler",
        image: "https://i.ibb.co/LDKkDJng/IMG-20251210-110337-962.jpg",
        stockStatus: "low-stock" 
    },
    { 
        id: 18, 
        name: "Compas", 
        details: "Compas métal avec crayon", 
        price: 500, 
        quantity: 3, 
        unit: "unités", 
        category: "fournitures", 
        total: 1500, 
        icon: "fas fa-drafting-compass",
        image: "https://i.ibb.co/LDKkDJng/IMG-20251210-110337-962.jpg",
        stockStatus: "in-stock" 
    },
    { 
        id: 19, 
        name: "Craie couleur", 
        details: "Boîte de 12 craies de couleur", 
        price: 750, 
        quantity: 20, 
        unit: "boîtes", 
        category: "fournitures", 
        total: 15000, 
        icon: "fas fa-chalkboard",
        image: "https://i.ibb.co/9mbdtt3W/IMG-20251210-142225-592.jpg",
        stockStatus: "in-stock" 
    },
    { 
        id: 20, 
        name: "Craie blanche", 
        details: "Paquet de 100 craies blanches", 
        price: 500, 
        quantity: 6, 
        unit: "paquets", 
        category: "fournitures", 
        total: 3000, 
        icon: "fas fa-chalkboard",
        image: "https://i.ibb.co/9mbdtt3W/IMG-20251210-142225-592.jpg",
        stockStatus: "in-stock" 
    },
    
    // Matériel de bureau
    { 
        id: 21, 
        name: "Scotch mural", 
        details: "Grand rouleau scotch double-face", 
        price: 800, 
        quantity: 10, 
        unit: "rouleaux", 
        category: "bureau", 
        total: 8000, 
        icon: "fas fa-tape",
        image: "https://i.ibb.co/7J3vtmX6/IMG-20251210-110354-745.jpg",
        stockStatus: "in-stock" 
    },
    { 
        id: 22, 
        name: "Scotch GM plast", 
        details: "Scotch transparent grand format", 
        price: 700, 
        quantity: 8, 
        unit: "rouleaux", 
        category: "bureau", 
        total: 5600, 
        icon: "fas fa-tape",
        image: "https://i.ibb.co/7J3vtmX6/IMG-20251210-110354-745.jpg",
        stockStatus: "in-stock" 
    },
    { 
        id: 23, 
        name: "Enveloppe moyen format", 
        details: "Paquet de 50 enveloppes", 
        price: 1500, 
        quantity: 7, 
        unit: "paquets", 
        category: "bureau", 
        total: 10500, 
        icon: "fas fa-envelope",
        image: "https://i.ibb.co/gbL0mY45/IMG-20251210-142108-172.jpg",
        stockStatus: "in-stock" 
    },
    { 
        id: 24, 
        name: "Fiche bristol", 
        details: "Paquet de 100 fiches bristol", 
        price: 1750, 
        quantity: 13, 
        unit: "paquets", 
        category: "bureau", 
        total: 22750, 
        icon: "fas fa-sticky-note",
        image: "https://i.ibb.co/gbL0mY45/IMG-20251210-142108-172.jpg",
        stockStatus: "in-stock" 
    },
    { 
        id: 25, 
        name: "Chemise dossier", 
        details: "Paquet de 10 chemises cartonnées", 
        price: 100, 
        quantity: 3, 
        unit: "paquets", 
        category: "bureau", 
        total: 300, 
        icon: "fas fa-folder",
        image: "https://i.ibb.co/PGt0MWzJ/IMG-20251210-141918-781.jpg",
        stockStatus: "in-stock" 
    },
    { 
        id: 26, 
        name: "Registre d'appel", 
        details: "Registre 300 pages", 
        price: 1000, 
        quantity: 11, 
        unit: "registres", 
        category: "bureau", 
        total: 11000, 
        icon: "fas fa-clipboard-list",
        image: "https://i.ibb.co/PGt0MWzJ/IMG-20251210-141918-781.jpg",
        stockStatus: "in-stock" 
    },
    { 
        id: 27, 
        name: "Livret de famille", 
        details: "Modèle officiel", 
        price: 500, 
        quantity: 18, 
        unit: "livrets", 
        category: "bureau", 
        total: 9000, 
        icon: "fas fa-passport",
        image: "https://i.ibb.co/PGt0MWzJ/IMG-20251210-141918-781.jpg",
        stockStatus: "in-stock" 
    },
    { 
        id: 28, 
        name: "Tampon encreur", 
        details: "Tampon HORSE avec encre bleue", 
        price: 2500, 
        quantity: 1, 
        unit: "paquets", 
        category: "bureau", 
        total: 2500, 
        icon: "fas fa-stamp",
        image: "https://i.ibb.co/SXR5SVNJ/IMG-20251210-142113-190.jpg",
        stockStatus: "low-stock" 
    },
    
    // Livres scolaires
    { 
        id: 29, 
        name: "Ami et Rémi Lecture CP", 
        details: "Manuel scolaire de lecture", 
        price: 2500, 
        quantity: 6, 
        unit: "livres", 
        category: "livres", 
        total: 15000, 
        icon: "fas fa-graduation-cap",
        image: "https://i.ibb.co/DPRnHBRZ/IMG-20251210-110327-394.jpg",
        stockStatus: "in-stock" 
    },
    { 
        id: 30, 
        name: "Ami et Rémi Grammaire CM1", 
        details: "Manuel scolaire de grammaire", 
        price: 2800, 
        quantity: 23, 
        unit: "livres", 
        category: "livres", 
        total: 64400, 
        icon: "fas fa-graduation-cap",
        image: "https://i.ibb.co/DPRnHBRZ/IMG-20251210-110327-394.jpg",
        stockStatus: "in-stock" 
    },
    { 
        id: 31, 
        name: "Mathématiques CM2", 
        details: "Collection excellence", 
        price: 3000, 
        quantity: 5, 
        unit: "livres", 
        category: "livres", 
        total: 15000, 
        icon: "fas fa-calculator",
        image: "https://i.ibb.co/45MJNfk/IMG-20251210-110348-425.jpg",
        stockStatus: "in-stock" 
    },
    { 
        id: 32, 
        name: "Go for english 3e", 
        details: "Student's book", 
        price: 3500, 
        quantity: 24, 
        unit: "livres", 
        category: "livres", 
        total: 84000, 
        icon: "fas fa-language",
        image: "https://i.ibb.co/BKGwnRsn/IMG-20251210-141811-607.jpg",
        stockStatus: "in-stock" 
    },
    { 
        id: 33, 
        name: "Le français en 6e", 
        details: "Manuel scolaire de français", 
        price: 3200, 
        quantity: 8, 
        unit: "livres", 
        category: "livres", 
        total: 25600, 
        icon: "fas fa-book-open",
        image: "https://i.ibb.co/N2Jk6K38/IMG-20251210-142206-280.jpg",
        stockStatus: "in-stock" 
    },
    { 
        id: 34, 
        name: "Histoire 2e étape", 
        details: "Manuel pour cours élémentaires", 
        price: 2800, 
        quantity: 15, 
        unit: "livres", 
        category: "livres", 
        total: 42000, 
        icon: "fas fa-landmark",
        image: "https://i.ibb.co/HfpwMLJy/IMG-20251210-141825-333.jpg",
        stockStatus: "in-stock" 
    },
    
    // Romans/Littérature
    { 
        id: 35, 
        name: "Le Pagne Noir", 
        details: "Bernard Dadié", 
        price: 2000, 
        quantity: 7, 
        unit: "livres", 
        category: "romans", 
        total: 14000, 
        icon: "fas fa-feather-alt",
        image: "https://i.ibb.co/hRzZJpp1/IMG-20251210-142252-912.jpg",
        stockStatus: "in-stock" 
    },
    { 
        id: 36, 
        name: "Une Vie de Boy", 
        details: "Ferdinand Oyono", 
        price: 2200, 
        quantity: 3, 
        unit: "livres", 
        category: "romans", 
        total: 6600, 
        icon: "fas fa-feather-alt",
        image: "https://i.ibb.co/WW8HJXFQ/IMG-20251210-141839-981.jpg",
        stockStatus: "in-stock" 
    },
    { 
        id: 37, 
        name: "Soundiata", 
        details: "L'épopée mandingue", 
        price: 2500, 
        quantity: 2, 
        unit: "livres", 
        category: "romans", 
        total: 5000, 
        icon: "fas fa-feather-alt",
        image: "https://i.ibb.co/JRJGHz7R/IMG-20251210-142234-379.jpg",
        stockStatus: "low-stock" 
    },
    { 
        id: 38, 
        name: "Sous l'Orage", 
        details: "Seydou Badian", 
        price: 2000, 
        quantity: 3, 
        unit: "livres", 
        category: "romans", 
        total: 6000, 
        icon: "fas fa-feather-alt",
        image: "https://i.ibb.co/HTxyjZgG/IMG-20251210-142237-947.jpg",
        stockStatus: "in-stock" 
    },
    { 
        id: 39, 
        name: "Vol de Nuit", 
        details: "Antoine de Saint-Exupéry", 
        price: 1800, 
        quantity: 11, 
        unit: "livres", 
        category: "romans", 
        total: 19800, 
        icon: "fas fa-feather-alt",
        image: "https://i.ibb.co/RG9XcFtW/IMG-20251210-142157-402.jpg",
        stockStatus: "in-stock" 
    },
    { 
        id: 40, 
        name: "Phèdre", 
        details: "Jean Racine", 
        price: 1500, 
        quantity: 4, 
        unit: "livres", 
        category: "romans", 
        total: 6000, 
        icon: "fas fa-feather-alt",
        image: "https://i.ibb.co/RG9XcFtW/IMG-20251210-142157-402.jpg",
        stockStatus: "in-stock" 
    }
];

// Images de la galerie - TOUTES VOS PHOTOS
const galleryImages = [
    {
        id: 1,
        url: "https://i.ibb.co/DPRnHBRZ/IMG-20251210-110327-394.jpg",
        title: "Livres scolaires - Ami et Rémi",
        description: "Manuels de lecture et grammaire pour CP et CM",
        category: "livres"
    },
    {
        id: 2,
        url: "https://i.ibb.co/LDKkDJng/IMG-20251210-110337-962.jpg",
        title: "Fournitures de géométrie",
        description: "Rapporteurs, équerres, règles et compas",
        category: "fournitures"
    },
    {
        id: 3,
        url: "https://i.ibb.co/Kxfm5qGv/IMG-20251210-110345-051.jpg",
        title: "Crayons et fournitures",
        description: "Crayons noirs, gommes et accessoires scolaires",
        category: "fournitures"
    },
    {
        id: 4,
        url: "https://i.ibb.co/45MJNfk/IMG-20251210-110348-425.jpg",
        title: "Mathématiques CM2",
        description: "Collection Excellence pour le CM2",
        category: "livres"
    },
    {
        id: 5,
        url: "https://i.ibb.co/7J3vtmX6/IMG-20251210-110354-745.jpg",
        title: "Papeterie et bureau",
        description: "Scotch, enveloppes et fournitures de bureau",
        category: "bureau"
    },
    {
        id: 6,
        url: "https://i.ibb.co/nM97rLgm/IMG-20251210-110358-435.jpg",
        title: "Cahiers 200 pages",
        description: "Paquets de cahiers grand format",
        category: "cahiers"
    },
    {
        id: 7,
        url: "https://i.ibb.co/pvXTqXzg/IMG-20251210-141758-550.jpg",
        title: "Collection de manuels",
        description: "Large sélection de livres scolaires",
        category: "livres"
    },
    {
        id: 8,
        url: "https://i.ibb.co/BKGwnRsn/IMG-20251210-141811-607.jpg",
        title: "Go for English 3e",
        description: "Manuels d'anglais pour le collège",
        category: "livres"
    },
    {
        id: 9,
        url: "https://i.ibb.co/HfpwMLJy/IMG-20251210-141825-333.jpg",
        title: "Histoire 2e étape",
        description: "Manuels d'histoire et géographie",
        category: "livres"
    },
    {
        id: 10,
        url: "https://i.ibb.co/WW8HJXFQ/IMG-20251210-141839-981.jpg",
        title: "Romans africains",
        description: "Une Vie de Boy et autres classiques",
        category: "romans"
    },
    {
        id: 11,
        url: "https://i.ibb.co/93k8QFgj/IMG-20251210-141902-585.jpg",
        title: "Crayons de couleur",
        description: "Boîtes de 12 crayons de couleur",
        category: "fournitures"
    },
    {
        id: 12,
        url: "https://i.ibb.co/k2fKLjqZ/IMG-20251210-141910-507.jpg",
        title: "Cahiers de dessin",
        description: "Cahiers 16 et 32 pages pour le dessin",
        category: "cahiers"
    },
    {
        id: 13,
        url: "https://i.ibb.co/fYpfYybD/IMG-20251210-141916-964.jpg",
        title: "Gommes et accessoires",
        description: "Gommes blanches et taille-crayons",
        category: "fournitures"
    },
    {
        id: 14,
        url: "https://i.ibb.co/PGt0MWzJ/IMG-20251210-141918-781.jpg",
        title: "Registres et formulaires",
        description: "Registres d'appel et livrets administratifs",
        category: "bureau"
    },
    {
        id: 15,
        url: "https://i.ibb.co/sp0NnKXL/IMG-20251210-141951-384.jpg",
        title: "Espace de vente principal",
        description: "Vue d'ensemble de notre magasin",
        category: "magasin"
    },
    {
        id: 16,
        url: "https://i.ibb.co/N2PgCpLf/IMG-20251210-141957-598.jpg",
        title: "Étagères organisées",
        description: "Organisation claire de nos produits",
        category: "magasin"
    },
    {
        id: 17,
        url: "https://i.ibb.co/PshZwGtg/IMG-20251210-142003-601.jpg",
        title: "Rayon livres scolaires",
        description: "Manuels classés par niveau",
        category: "livres"
    },
    {
        id: 18,
        url: "https://i.ibb.co/m57F12z5/IMG-20251210-142100-568.jpg",
        title: "Stock de cahiers",
        description: "Grand choix de cahiers et formats",
        category: "cahiers"
    },
    {
        id: 19,
        url: "https://i.ibb.co/LDWrtN7p/IMG-20251210-142104-434.jpg",
        title: "Fournitures complètes",
        description: "Tout le matériel scolaire nécessaire",
        category: "fournitures"
    },
    {
        id: 20,
        url: "https://i.ibb.co/gbL0mY45/IMG-20251210-142108-172.jpg",
        title: "Enveloppes et fiches",
        description: "Papeterie professionnelle",
        category: "bureau"
    },
    {
        id: 21,
        url: "https://i.ibb.co/SXR5SVNJ/IMG-20251210-142113-190.jpg",
        title: "Accessoires de bureau",
        description: "Tampons, agrafes et petit matériel",
        category: "bureau"
    },
    {
        id: 22,
        url: "https://i.ibb.co/dJtJCzxq/IMG-20251210-142118-036.jpg",
        title: "Rayonnage organisé",
        description: "Notre système de rangement",
        category: "magasin"
    },
    {
        id: 23,
        url: "https://i.ibb.co/7JDXD4V9/IMG-20251210-142131-633.jpg",
        title: "Présentation produits",
        description: "Disposition claire et accessible",
        category: "magasin"
    },
    {
        id: 24,
        url: "https://i.ibb.co/RG9XcFtW/IMG-20251210-142157-402.jpg",
        title: "Romans classiques",
        description: "Littérature française et africaine",
        category: "romans"
    },
    {
        id: 25,
        url: "https://i.ibb.co/zHV51P5T/IMG-20251210-142202-290.jpg",
        title: "Cahiers CM",
        description: "Cahiers pour cours moyens",
        category: "cahiers"
    },
    {
        id: 26,
        url: "https://i.ibb.co/N2Jk6K38/IMG-20251210-142206-280.jpg",
        title: "Le français en 6e",
        description: "Manuels de français collège",
        category: "livres"
    },
    {
        id: 27,
        url: "https://i.ibb.co/ks0SMK5F/IMG-20251210-142211-870.jpg",
        title: "Découverte du monde CM2",
        description: "Sciences et géographie",
        category: "livres"
    },
    {
        id: 28,
        url: "https://i.ibb.co/1Jb20snK/IMG-20251210-142216-428.jpg",
        title: "Matériel scolaire varié",
        description: "Fournitures diverses",
        category: "fournitures"
    },
    {
        id: 29,
        url: "https://i.ibb.co/nqxWFYsZ/IMG-20251210-142218-824.jpg",
        title: "Petit matériel",
        description: "Accessoires et consommables",
        category: "fournitures"
    },
    {
        id: 30,
        url: "https://i.ibb.co/9mbdtt3W/IMG-20251210-142225-592.jpg",
        title: "Craies scolaires",
        description: "Craies blanches et colorées",
        category: "fournitures"
    },
    {
        id: 31,
        url: "https://i.ibb.co/JRJGHz7R/IMG-20251210-142234-379.jpg",
        title: "Soundiata",
        description: "L'épopée mandingue",
        category: "romans"
    },
    {
        id: 32,
        url: "https://i.ibb.co/HTxyjZgG/IMG-20251210-142237-947.jpg",
        title: "Sous l'Orage",
        description: "Roman de Seydou Badian",
        category: "romans"
    },
    {
        id: 33,
        url: "https://i.ibb.co/hRzZJpp1/IMG-20251210-142252-912.jpg",
        title: "Le Pagne Noir",
        description: "Bernard Dadié",
        category: "romans"
    },
    {
        id: 34,
        url: "https://i.ibb.co/F4nL9sgG/IMG-20251210-WA0003.jpg",
        title: "Vue d'ensemble librairie",
        description: "Notre espace complet",
        category: "magasin"
    },
    {
        id: 35,
        url: "https://i.ibb.co/BpWYm4k/IMG-20251210-WA0004.jpg",
        title: "Rayon papeterie",
        description: "Fournitures de bureau professionnelles",
        category: "bureau"
    },
    {
        id: 36,
        url: "https://i.ibb.co/Y4F4SKJs/IMG-20251210-WA0005.jpg",
        title: "Exposition produits",
        description: "Mise en valeur de nos articles",
        category: "magasin"
    },
    {
        id: 37,
        url: "https://i.ibb.co/6zGKNVc/IMG-20251210-WA0006.jpg",
        title: "Sélection complète cahiers",
        description: "Tous formats disponibles",
        category: "cahiers"
    }
];