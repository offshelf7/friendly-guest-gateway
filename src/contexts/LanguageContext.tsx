import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the structure for language options
export type LanguageOption = {
  code: string;
  name: string;
  flag: string;
};

// Define available languages
export const languages: LanguageOption[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'ar', name: 'العربية', flag: '🇦🇪' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
];

// Context type definition
type LanguageContextType = {
  language: string;
  setLanguage: (language: string) => void;
  t: (key: string) => string;
};

// Create the context with a default value
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key, // Default translation returns the key
});

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);

// Language provider component
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<string>(localStorage.getItem('language') || 'en');

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Translation function
  const t = (key: string) => {
    return translations[language]?.[key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Translations object containing all text in different languages
const translations: Record<string, Record<string, string>> = {
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.facilities': 'Facilities',
    'nav.rooms': 'Rooms',
    'nav.foodAndDrink': 'Food & Drink',
    'nav.dining': 'Dining', // Shorter alternative
    'nav.contactUs': 'Contact Us',
    'nav.contact': 'Contact', // Shorter alternative
    'nav.dashboard': 'Dashboard',
    'nav.myProfile': 'My Profile',
    'nav.myBookings': 'My Bookings',
    'nav.signOut': 'Sign Out',
    'nav.signIn': 'Sign In',
    
    // Home Page
    'home.title': 'Luxury Hotels',
    'home.subtitle': 'Experience the best in hospitality',
    'home.bookNow': 'Book Now',
    'home.roomsSuites': 'Rooms & Suites',
    'home.exploreRooms': 'Explore Rooms',
    'home.facilities': 'Our Facilities',
    'home.exploreFacilities': 'Explore Facilities',
    'home.foodAndDrink': 'Food & Drink',
    'home.discoverDining': 'Discover Dining',
    'home.contactUs': 'Contact Us',
    'home.getInTouch': 'Get In Touch',
    'home.newsletter': 'Subscribe to our Newsletter',
    'home.enterEmail': 'Enter your email',
    'home.subscribe': 'Subscribe',
    'home.footerText': '© 2024 Luxury Hotels. All rights reserved.',
    
    // Rooms Page
    'rooms.title': 'Our Rooms',
    'rooms.subtitle': 'Experience unparalleled comfort and style in our luxurious rooms.',
    'rooms.viewDetails': 'View Details',
    'rooms.amenities': 'Amenities',
    'rooms.roomSize': 'Room Size',
    'rooms.beds': 'Beds',
    'rooms.capacity': 'Capacity',
    'rooms.price': 'Price',
    'rooms.bookNow': 'Book Now',
    
    // Facilities Page
    'facilities.title': 'Our Facilities',
    'facilities.subtitle': 'Indulge in world-class amenities and services for an unforgettable stay.',
    'facilities.swimmingPool': 'Swimming Pool',
    'facilities.spaWellness': 'Spa & Wellness Center',
    'facilities.fitnessCenter': 'Fitness Center',
    'facilities.restaurantsBars': 'Restaurants & Bars',
    'facilities.conferenceRooms': 'Conference Rooms',
    'facilities.exploreMore': 'Explore More',
    
    // Food & Drink Page
    'foodDrink.title': 'Dining',
    'foodDrink.subtitle': 'Explore our exquisite dining options.',
    'foodDrink.allItems': 'All Items',
    'foodDrink.food': 'Food',
    'foodDrink.drinks': 'Drinks',
    'foodDrink.searchMenu': 'Search menu...',
    'foodDrink.addToCart': 'Add to Cart',
    
    // Contact Page
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Get in touch with us for inquiries, reservations, and more.',
    'contact.getInTouch': 'Get in Touch',
    'contact.getInTouchText': 'We are here to assist you with any questions or concerns.',
    'contact.address': 'Address',
    'contact.phone': 'Phone',
    'contact.email': 'Email',
    'contact.hours': 'Hours',
    'contact.sendMessage': 'Send us a Message',
    'contact.name': 'Name',
    'contact.yourName': 'Your Name',
    'contact.email': 'Email',
    'contact.yourEmail': 'Your Email',
    'contact.subject': 'Subject',
    'contact.selectSubject': 'Select Subject',
    'contact.reservation': 'Reservation',
    'contact.services': 'Services',
    'contact.feedback': 'Feedback',
    'contact.complaint': 'Complaint',
    'contact.other': 'Other',
    'contact.message': 'Message',
    'contact.yourMessage': 'Your Message',
    'contact.send': 'Send Message',
    'contact.sending': 'Sending...',
    'contact.messageSent': 'Message Sent!',
    'contact.responseMessage': 'We will get back to you shortly.',
    
    // Cart Page
    'cart.title': 'Shopping Cart',
    'cart.emptyCart': 'Your cart is empty.',
    'cart.continueShopping': 'Continue Shopping',
    'cart.itemName': 'Item Name',
    'cart.price': 'Price',
    'cart.quantity': 'Quantity',
    'cart.total': 'Total',
    'cart.removeItem': 'Remove',
    'cart.subtotal': 'Subtotal',
    'cart.shipping': 'Shipping',
    'cart.tax': 'Tax',
    'cart.orderTotal': 'Order Total',
    'cart.checkout': 'Checkout',
    
    // Admin Dashboard
    'admin.dashboard': 'Dashboard',
    'admin.welcome': 'Welcome to the Admin Dashboard',
    'admin.manageRooms': 'Manage Rooms',
    'admin.manageBookings': 'Manage Bookings',
    'admin.manageUsers': 'Manage Users',
    'admin.viewReports': 'View Reports',
    
    // Account Profile
    'profile.title': 'My Profile',
    'profile.updateInfo': 'Update Information',
    'profile.changePassword': 'Change Password',
    'profile.viewBookings': 'View Bookings',
    
    // Authentication
    'auth.login': 'Login',
    'auth.register': 'Register',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.forgotPassword': 'Forgot Password?',
    'auth.resetPassword': 'Reset Password',
    'auth.name': 'Name',
    'auth.confirmPassword': 'Confirm Password',
    'auth.alreadyAccount': 'Already have an account?',
    'auth.needAccount': 'Need an account?',
    'auth.loginSuccess': 'Login successful!',
    'auth.registerSuccess': 'Registration successful!',
    'auth.logoutSuccess': 'Logout successful!',
  },
  fr: {
    // Navbar
    'nav.home': 'Accueil',
    'nav.facilities': 'Installations',
    'nav.rooms': 'Chambres',
    'nav.foodAndDrink': 'Restauration',
    'nav.dining': 'Resto', // Shorter alternative
    'nav.contactUs': 'Contactez-nous',
    'nav.contact': 'Contact', // Shorter alternative
    'nav.dashboard': 'Tableau de bord',
    'nav.myProfile': 'Mon profil',
    'nav.myBookings': 'Mes réservations',
    'nav.signOut': 'Déconnexion',
    'nav.signIn': 'Connexion',
    
    // Home Page
    'home.title': 'Hôtels de Luxe',
    'home.subtitle': 'Découvrez le meilleur de l\'hospitalité',
    'home.bookNow': 'Réserver maintenant',
    'home.roomsSuites': 'Chambres et Suites',
    'home.exploreRooms': 'Explorer les chambres',
    'home.facilities': 'Nos installations',
    'home.exploreFacilities': 'Explorer les installations',
    'home.foodAndDrink': 'Restauration',
    'home.discoverDining': 'Découvrir la restauration',
    'home.contactUs': 'Contactez-nous',
    'home.getInTouch': 'Contactez-nous',
    'home.newsletter': 'Abonnez-vous à notre newsletter',
    'home.enterEmail': 'Entrez votre email',
    'home.subscribe': 'S\'abonner',
    'home.footerText': '© 2024 Hôtels de Luxe. Tous droits réservés.',
    
    // Rooms Page
    'rooms.title': 'Nos Chambres',
    'rooms.subtitle': 'Découvrez un confort et un style inégalés dans nos chambres luxueuses.',
    'rooms.viewDetails': 'Voir les détails',
    'rooms.amenities': 'Équipements',
    'rooms.roomSize': 'Taille de la chambre',
    'rooms.beds': 'Lits',
    'rooms.capacity': 'Capacité',
    'rooms.price': 'Prix',
    'rooms.bookNow': 'Réserver maintenant',
    
    // Facilities Page
    'facilities.title': 'Nos Installations',
    'facilities.subtitle': 'Profitez d\'équipements et de services de classe mondiale pour un séjour inoubliable.',
    'facilities.swimmingPool': 'Piscine',
    'facilities.spaWellness': 'Spa et Centre de bien-être',
    'facilities.fitnessCenter': 'Centre de remise en forme',
    'facilities.restaurantsBars': 'Restaurants et Bars',
    'facilities.conferenceRooms': 'Salles de conférence',
    'facilities.exploreMore': 'Explorer plus',
    
    // Food & Drink Page
    'foodDrink.title': 'Restauration',
    'foodDrink.subtitle': 'Explorez nos options de restauration exquises.',
    'foodDrink.allItems': 'Tous les articles',
    'foodDrink.food': 'Nourriture',
    'foodDrink.drinks': 'Boissons',
    'foodDrink.searchMenu': 'Rechercher dans le menu...',
    'foodDrink.addToCart': 'Ajouter au panier',
    
    // Contact Page
    'contact.title': 'Contactez-nous',
    'contact.subtitle': 'Contactez-nous pour toute question, réservation et plus encore.',
    'contact.getInTouch': 'Contactez-nous',
    'contact.getInTouchText': 'Nous sommes là pour vous aider avec toutes vos questions ou préoccupations.',
    'contact.address': 'Adresse',
    'contact.phone': 'Téléphone',
    'contact.email': 'Email',
    'contact.hours': 'Heures',
    'contact.sendMessage': 'Envoyez-nous un message',
    'contact.name': 'Nom',
    'contact.yourName': 'Votre nom',
    'contact.email': 'Email',
    'contact.yourEmail': 'Votre email',
    'contact.subject': 'Sujet',
    'contact.selectSubject': 'Sélectionner un sujet',
    'contact.reservation': 'Réservation',
    'contact.services': 'Prestations de service',
    'contact.feedback': 'Retour d\'information',
    'contact.complaint': 'Réclamation',
    'contact.other': 'Autre',
    'contact.message': 'Message',
    'contact.yourMessage': 'Votre message',
    'contact.send': 'Envoyer le message',
    'contact.sending': 'Envoi...',
    'contact.messageSent': 'Message envoyé!',
    'contact.responseMessage': 'Nous vous répondrons sous peu.',
    
    // Cart Page
    'cart.title': 'Panier',
    'cart.emptyCart': 'Votre panier est vide.',
    'cart.continueShopping': 'Continuer les achats',
    'cart.itemName': 'Nom de l\'article',
    'cart.price': 'Prix',
    'cart.quantity': 'Quantité',
    'cart.total': 'Total',
    'cart.removeItem': 'Supprimer',
    'cart.subtotal': 'Sous-total',
    'cart.shipping': 'Livraison',
    'cart.tax': 'Taxe',
    'cart.orderTotal': 'Total de la commande',
    'cart.checkout': 'Commander',
    
    // Admin Dashboard
    'admin.dashboard': 'Tableau de bord',
    'admin.welcome': 'Bienvenue sur le tableau de bord d\'administration',
    'admin.manageRooms': 'Gérer les chambres',
    'admin.manageBookings': 'Gérer les réservations',
    'admin.manageUsers': 'Gérer les utilisateurs',
    'admin.viewReports': 'Afficher les rapports',
    
    // Account Profile
    'profile.title': 'Mon profil',
    'profile.updateInfo': 'Mettre à jour les informations',
    'profile.changePassword': 'Changer le mot de passe',
    'profile.viewBookings': 'Afficher les réservations',
    
    // Authentication
    'auth.login': 'Connexion',
    'auth.register': 'S\'inscrire',
    'auth.email': 'Email',
    'auth.password': 'Mot de passe',
    'auth.forgotPassword': 'Mot de passe oublié?',
    'auth.resetPassword': 'Réinitialiser le mot de passe',
    'auth.name': 'Nom',
    'auth.confirmPassword': 'Confirmer le mot de passe',
    'auth.alreadyAccount': 'Vous avez déjà un compte?',
    'auth.needAccount': 'Besoin d\'un compte?',
    'auth.loginSuccess': 'Connexion réussie!',
    'auth.registerSuccess': 'Inscription réussie!',
    'auth.logoutSuccess': 'Déconnexion réussie!',
  },
  es: {
    // Navbar
    'nav.home': 'Inicio',
    'nav.facilities': 'Instalaciones',
    'nav.rooms': 'Habitaciones',
    'nav.foodAndDrink': 'Comida y bebida',
    'nav.dining': 'Comedor', // Shorter alternative
    'nav.contactUs': 'Contáctenos',
    'nav.contact': 'Contacto', // Shorter alternative
    'nav.dashboard': 'Panel de control',
    'nav.myProfile': 'Mi perfil',
    'nav.myBookings': 'Mis reservas',
    'nav.signOut': 'Cerrar sesión',
    'nav.signIn': 'Iniciar sesión',
    
    // Home Page
    'home.title': 'Hoteles de Lujo',
    'home.subtitle': 'Experimente lo mejor en hospitalidad',
    'home.bookNow': 'Reservar ahora',
    'home.roomsSuites': 'Habitaciones y Suites',
    'home.exploreRooms': 'Explorar habitaciones',
    'home.facilities': 'Nuestras instalaciones',
    'home.exploreFacilities': 'Explorar instalaciones',
    'home.foodAndDrink': 'Comida y bebida',
    'home.discoverDining': 'Descubrir la gastronomía',
    'home.contactUs': 'Contáctenos',
    'home.getInTouch': 'Póngase en contacto',
    'home.newsletter': 'Suscríbase a nuestro boletín',
    'home.enterEmail': 'Ingrese su correo electrónico',
    'home.subscribe': 'Suscribirse',
    'home.footerText': '© 2024 Hoteles de Lujo. Todos los derechos reservados.',
    
    // Rooms Page
    'rooms.title': 'Nuestras Habitaciones',
    'rooms.subtitle': 'Experimente un confort y estilo incomparables en nuestras lujosas habitaciones.',
    'rooms.viewDetails': 'Ver detalles',
    'rooms.amenities': 'Comodidades',
    'rooms.roomSize': 'Tamaño de la habitación',
    'rooms.beds': 'Camas',
    'rooms.capacity': 'Capacidad',
    'rooms.price': 'Precio',
    'rooms.bookNow': 'Reservar ahora',
    
    // Facilities Page
    'facilities.title': 'Nuestras Instalaciones',
    'facilities.subtitle': 'Disfrute de servicios e instalaciones de clase mundial para una estancia inolvidable.',
    'facilities.swimmingPool': 'Piscina',
    'facilities.spaWellness': 'Spa y centro de bienestar',
    'facilities.fitnessCenter': 'Gimnasio',
    'facilities.restaurantsBars': 'Restaurantes y bares',
    'facilities.conferenceRooms': 'Salas de conferencias',
    'facilities.exploreMore': 'Explorar más',
    
    // Food & Drink Page
    'foodDrink.title': 'Comedor',
    'foodDrink.subtitle': 'Explore nuestras exquisitas opciones gastronómicas.',
    'foodDrink.allItems': 'Todos los artículos',
    'foodDrink.food': 'Comida',
    'foodDrink.drinks': 'Bebidas',
    'foodDrink.searchMenu': 'Buscar en el menú...',
    'foodDrink.addToCart': 'Añadir al carrito',
    
    // Contact Page
    'contact.title': 'Contáctenos',
    'contact.subtitle': 'Póngase en contacto con nosotros para consultas, reservas y más.',
    'contact.getInTouch': 'Póngase en contacto',
    'contact.getInTouchText': 'Estamos aquí para ayudarle con cualquier pregunta o inquietud.',
    'contact.address': 'Dirección',
    'contact.phone': 'Teléfono',
    'contact.email': 'Correo electrónico',
    'contact.hours': 'Horas',
    'contact.sendMessage': 'Envíenos un mensaje',
    'contact.name': 'Nombre',
    'contact.yourName': 'Su nombre',
    'contact.email': 'Correo electrónico',
    'contact.yourEmail': 'Su correo electrónico',
    'contact.subject': 'Asunto',
    'contact.selectSubject': 'Seleccionar asunto',
    'contact.reservation': 'Reserva',
    'contact.services': 'Servicios',
    'contact.feedback': 'Comentarios',
    'contact.complaint': 'Queja',
    'contact.other': 'Otro',
    'contact.message': 'Mensaje',
    'contact.yourMessage': 'Su mensaje',
    'contact.send': 'Enviar mensaje',
    'contact.sending': 'Enviando...',
    'contact.messageSent': '¡Mensaje enviado!',
    'contact.responseMessage': 'Nos pondremos en contacto con usted en breve.',
    
    // Cart Page
    'cart.title': 'Carrito de compras',
    'cart.emptyCart': 'Su carrito está vacío.',
    'cart.continueShopping': 'Seguir comprando',
    'cart.itemName': 'Nombre del artículo',
    'cart.price': 'Precio',
    'cart.quantity': 'Cantidad',
    'cart.total': 'Total',
    'cart.removeItem': 'Eliminar',
    'cart.subtotal': 'Subtotal',
    'cart.shipping': 'Envío',
    'cart.tax': 'Impuesto',
    'cart.orderTotal': 'Total del pedido',
    'cart.checkout': 'Pagar',
    
    // Admin Dashboard
    'admin.dashboard': 'Panel de control',
    'admin.welcome': 'Bienvenido al panel de control de administración',
    'admin.manageRooms': 'Gestionar habitaciones',
    'admin.manageBookings': 'Gestionar reservas',
    'admin.manageUsers': 'Gestionar usuarios',
    'admin.viewReports': 'Ver informes',
    
    // Account Profile
    'profile.title': 'Mi perfil',
    'profile.updateInfo': 'Actualizar información',
    'profile.changePassword': 'Cambiar la contraseña',
    'profile.viewBookings': 'Ver reservas',
    
    // Authentication
    'auth.login': 'Iniciar sesión',
    'auth.register': 'Registrarse',
    'auth.email': 'Correo electrónico',
    'auth.password': 'Contraseña',
    'auth.forgotPassword': '¿Olvidó la contraseña?',
    'auth.resetPassword': 'Restablecer la contraseña',
    'auth.name': 'Nombre',
    'auth.confirmPassword': 'Confirmar la contraseña',
    'auth.alreadyAccount': '¿Ya tienes una cuenta?',
    'auth.needAccount': '¿Necesitas una cuenta?',
    'auth.loginSuccess': '¡Inicio de sesión exitoso!',
    'auth.registerSuccess': '¡Registro exitoso!',
    'auth.logoutSuccess': '¡Cierre de sesión exitoso!',
  },
  de: {
    // Navbar
    'nav.home': 'Startseite',
    'nav.facilities': 'Einrichtungen',
    'nav.rooms': 'Zimmer',
    'nav.foodAndDrink': 'Essen & Trinken',
    'nav.dining': 'Restaurant', // Shorter alternative
    'nav.contactUs': 'Kontakt',
    'nav.contact': 'Kontakt', // Already short
    'nav.dashboard': 'Übersicht',
    'nav.myProfile': 'Mein Profil',
    'nav.myBookings': 'Meine Buchungen',
    'nav.signOut': 'Abmelden',
    'nav.signIn': 'Anmelden',
    
    // Home Page
    'home.title': 'Luxushotels',
    'home.subtitle': 'Erleben Sie das Beste in Gastfreundschaft',
    'home.bookNow': 'Jetzt buchen',
    'home.roomsSuites': 'Zimmer & Suiten',
    'home.exploreRooms': 'Zimmer erkunden',
    'home.facilities': 'Unsere Einrichtungen',
    'home.exploreFacilities': 'Einrichtungen erkunden',
    'home.foodAndDrink': 'Essen & Trinken',
    'home.discoverDining': 'Gastronomie entdecken',
    'home.contactUs': 'Kontakt',
    'home.getInTouch': 'In Kontakt treten',
    'home.newsletter': 'Abonnieren Sie unseren Newsletter',
    'home.enterEmail': 'Geben Sie Ihre E-Mail-Adresse ein',
    'home.subscribe': 'Abonnieren',
    'home.footerText': '© 2024 Luxushotels. Alle Rechte vorbehalten.',
    
    // Rooms Page
    'rooms.title': 'Unsere Zimmer',
    'rooms.subtitle': 'Erleben Sie unvergleichlichen Komfort und Stil in unseren luxuriösen Zimmern.',
    'rooms.viewDetails': 'Details anzeigen',
    'rooms.amenities': 'Ausstattung',
    'rooms.roomSize': 'Zimmergröße',
    'rooms.beds': 'Betten',
    'rooms.capacity': 'Kapazität',
    'rooms.price': 'Preis',
    'rooms.bookNow': 'Jetzt buchen',
    
    // Facilities Page
    'facilities.title': 'Unsere Einrichtungen',
    'facilities.subtitle': 'Geniessen Sie erstklassige Annehmlichkeiten und Dienstleistungen für einen unvergesslichen Aufenthalt.',
    'facilities.swimmingPool': 'Schwimmbad',
    'facilities.spaWellness': 'Spa & Wellnesscenter',
    'facilities.fitnessCenter': 'Fitnesscenter',
    'facilities.restaurantsBars': 'Restaurants & Bars',
    'facilities.conferenceRooms': 'Konferenzräume',
    'facilities.exploreMore': 'Mehr entdecken',
    
    // Food & Drink Page
    'foodDrink.title': 'Gastronomie',
    'foodDrink.subtitle': 'Entdecken Sie unsere exquisiten gastronomischen Angebote.',
    'foodDrink.allItems': 'Alle Artikel',
    'foodDrink.food': 'Essen',
    'foodDrink.drinks': 'Getränke',
    'foodDrink.searchMenu': 'Menü suchen...',
    'foodDrink.addToCart': 'Zum Warenkorb hinzufügen',
    
    // Contact Page
    'contact.title': 'Kontakt',
    'contact.subtitle': 'Nehmen Sie Kontakt mit uns auf für Anfragen, Reservierungen und mehr.',
    'contact.getInTouch': 'In Kontakt treten',
    'contact.getInTouchText': 'Wir sind hier, um Ihnen bei Fragen und Anliegen zu helfen.',
    'contact.address': 'Adresse',
    'contact.phone': 'Telefon',
    'contact.email': 'E-Mail',
    'contact.hours': 'Öffnungszeiten',
    'contact.sendMessage': 'Senden Sie uns eine Nachricht',
    'contact.name': 'Name',
    'contact.yourName': 'Ihr Name',
    'contact.email': 'E-Mail',
    'contact.yourEmail': 'Ihre E-Mail-Adresse',
    'contact.subject': 'Betreff',
    'contact.selectSubject': 'Betreff auswählen',
    'contact.reservation': 'Reservierung',
    'contact.services': 'Dienstleistungen',
    'contact.feedback': 'Feedback',
    'contact.complaint': 'Beschwerde',
    'contact.other': 'Sonstiges',
    'contact.message': 'Nachricht',
    'contact.yourMessage': 'Ihre Nachricht',
    'contact.send': 'Nachricht senden',
    'contact.sending': 'Senden...',
    'contact.messageSent': 'Nachricht gesendet!',
    'contact.responseMessage': 'Wir werden uns in Kürze bei Ihnen melden.',
    
    // Cart Page
    'cart.title': 'Warenkorb',
    'cart.emptyCart': 'Ihr Warenkorb ist leer.',
    'cart.continueShopping': 'Weiter einkaufen',
    'cart.itemName': 'Artikelname',
    'cart.price': 'Preis',
    'cart.quantity': 'Menge',
    'cart.total': 'Gesamt',
    'cart.removeItem': 'Entfernen',
    'cart.subtotal': 'Zwischensumme',
    'cart.shipping': 'Versand',
    'cart.tax': 'Steuer',
    'cart.orderTotal': 'Bestellsumme',
    'cart.checkout': 'Kasse',
    
    // Admin Dashboard
    'admin.dashboard': 'Übersicht',
    'admin.welcome': 'Willkommen im Admin-Dashboard',
    'admin.manageRooms': 'Zimmer verwalten',
    'admin.manageBookings': 'Buchungen verwalten',
    'admin.manageUsers': 'Benutzer verwalten',
    'admin.viewReports': 'Berichte anzeigen',
    
    // Account Profile
    'profile.title': 'Mein Profil',
    'profile.updateInfo': 'Informationen aktualisieren',
    'profile.changePassword': 'Passwort ändern',
    'profile.viewBookings': 'Buchungen anzeigen',
    
    // Authentication
    'auth.login': 'Anmelden',
    'auth.register': 'Registrieren',
    'auth.email': 'E-Mail',
    'auth.password': 'Passwort',
    'auth.forgotPassword': 'Passwort vergessen?',
    'auth.resetPassword': 'Passwort zurücksetzen',
    'auth.name': 'Name',
    'auth.confirmPassword': 'Passwort bestätigen',
    'auth.alreadyAccount': 'Haben Sie bereits ein Konto?',
    'auth.needAccount': 'Benötigen Sie ein Konto?',
    'auth.loginSuccess': 'Anmeldung erfolgreich!',
    'auth.registerSuccess': 'Registrierung erfolgreich!',
    'auth.logoutSuccess': 'Abmeldung erfolgreich!',
  },
  ar: {
    // Navbar - Note: Arabic is right-to-left
    'nav.home': 'الرئيسية',
    'nav.facilities': 'المرافق',
    'nav.rooms': 'الغرف',
    'nav.foodAndDrink': 'الطعام والشراب',
    'nav.dining': 'مطعم', // Shorter alternative
    'nav.contactUs': 'اتصل بنا',
    'nav.contact': 'اتصال', // Shorter alternative
    'nav.dashboard': 'لوحة التحكم',
    'nav.myProfile': 'ملفي الشخصي',
    'nav.myBookings': 'حجوزاتي',
    'nav.signOut': 'تسجيل الخروج',
    'nav.signIn': 'تسجيل الدخول',
    
    // Home Page
    'home.title': 'فنادق فاخرة',
    'home.subtitle': 'اختبر الأفضل في الضيافة',
    'home.bookNow': 'احجز الآن',
    'home.roomsSuites': 'غرف وأجنحة',
    'home.exploreRooms': 'استكشف الغرف',
    'home.facilities': 'مرافقنا',
    'home.exploreFacilities': 'استكشف المرافق',
    'home.foodAndDrink': 'طعام وشراب',
    'home.discoverDining': 'اكتشف الطعام',
    'home.contactUs': 'اتصل بنا',
    'home.getInTouch': 'تواصل معنا',
    'home.newsletter': 'اشترك في نشرتنا الإخبارية',
    'home.enterEmail': 'أدخل بريدك الإلكتروني',
    'home.subscribe': 'اشتراك',
    'home.footerText': '© 2024 فنادق فاخرة. جميع الحقوق محفوظة.',
    
    // Rooms Page
    'rooms.title': 'غرفنا',
    'rooms.subtitle': 'جرب الراحة والأناقة التي لا مثيل لها في غرفنا الفاخرة.',
    'rooms.viewDetails': 'عرض التفاصيل',
    'rooms.amenities': 'وسائل الراحة',
    'rooms.roomSize': 'حجم الغرفة',
    'rooms.beds': 'أسرة',
    'rooms.capacity': 'سعة',
    'rooms.price': 'السعر',
    'rooms.bookNow': 'احجز الآن',
    
    // Facilities Page
    'facilities.title': 'مرافقنا',
    'facilities.subtitle': 'انغمس في وسائل الراحة والخدمات ذات المستوى العالمي لإقامة لا تُنسى.',
    'facilities.swimmingPool': 'حمام السباحة',
    'facilities.spaWellness': 'منتجع صحي ومركز العافية',
    'facilities.fitnessCenter': 'مركز اللياقة البدنية',
    'facilities.restaurantsBars': 'المطاعم والبارات',
    'facilities.conferenceRooms': 'قاعات المؤتمرات',
    'facilities.exploreMore': 'اكتشف المزيد',
    
    // Food & Drink Page
    'foodDrink.title': 'مطعم',
    'foodDrink.subtitle': 'استكشف خيارات تناول الطعام الرائعة لدينا.',
    'foodDrink.allItems': 'جميع العناصر',
    'foodDrink.food': 'طعام',
    'foodDrink.drinks': 'مشروبات',
    'foodDrink.searchMenu': 'البحث في القائمة...',
    'foodDrink.addToCart': 'أضف إلى السلة',
    
    // Contact Page
    'contact.title': 'اتصل بنا',
    'contact.subtitle': 'تواصل معنا للاستفسارات والحجوزات والمزيد.',
    'contact.getInTouch': 'تواصل معنا',
    'contact.getInTouchText': 'نحن هنا لمساعدتك في أي أسئلة أو استفسارات.',
    'contact.address': 'عنوان',
    'contact.phone': 'هاتف',
    'contact.email': 'بريد إلكتروني',
    'contact.hours': 'ساعات',
    'contact.sendMessage': 'أرسل لنا رسالة',
    'contact.name': 'اسم',
    'contact.yourName': 'اسمك',
    'contact.email': 'بريد إلكتروني',
    'contact.yourEmail': 'بريدك الإلكتروني',
    'contact.subject': 'موضوع',
    'contact.selectSubject': 'اختر موضوعا',
    'contact.reservation': 'حجز',
    'contact.services': 'خدمات',
    'contact.feedback': 'ملاحظات',
    'contact.complaint': 'شكوى',
    'contact.other': 'آخر',
    'contact.message': 'رسالة',
    'contact.yourMessage': 'رسالتك',
    'contact.send': 'إرسال رسالة',
    'contact.sending': 'إرسال...',
    'contact.messageSent': 'تم إرسال الرسالة!',
    'contact.responseMessage': 'سوف نتواصل معك قريبا.',
    
    // Cart Page
    'cart.title': 'عربة التسوق',
    'cart.emptyCart': 'عربتك فارغة.',
    'cart.continueShopping': 'مواصلة التسوق',
    'cart.itemName': 'اسم العنصر',
    'cart.price': 'السعر',
    'cart.quantity': 'كمية',
    'cart.total': 'المجموع',
    'cart.removeItem': 'إزالة',
    'cart.subtotal': 'المجموع الفرعي',
    'cart.shipping': 'شحن',
    'cart.tax': 'ضريبة',
    'cart.orderTotal': 'المجموع الكلي للطلب',
    'cart.checkout': 'الدفع',
    
    // Admin Dashboard
    'admin.dashboard': 'لوحة التحكم',
    'admin.welcome': 'مرحبا بك في لوحة تحكم المسؤول',
    'admin.manageRooms': 'إدارة الغرف',
    'admin.manageBookings': 'إدارة الحجوزات',
    'admin.manageUsers': 'إدارة المستخدمين',
    'admin.viewReports
