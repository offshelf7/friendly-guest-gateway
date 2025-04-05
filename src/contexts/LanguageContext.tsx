
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = {
  code: string;
  name: string;
  flag: string;
};

export const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
];

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    return savedLanguage || 'en';
  });

  useEffect(() => {
    localStorage.setItem('preferredLanguage', language);
  }, [language]);

  // Simple translation function
  const t = (key: string): string => {
    if (!translations[language]) return translations.en[key] || key;
    return translations[language][key] || translations.en[key] || key;
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
    'nav.contactUs': 'Contact Us',
    'nav.dashboard': 'Dashboard',
    'nav.myProfile': 'My Profile',
    'nav.myBookings': 'My Bookings',
    'nav.signOut': 'Sign Out',
    'nav.signIn': 'Sign In',
    
    // Rooms page
    'rooms.title': 'Available Rooms',
    'rooms.checkIn': 'Check-in Date',
    'rooms.checkOut': 'Check-out Date',
    'rooms.guests': 'Guests',
    'rooms.pickDate': 'Pick a date',
    'rooms.searchAvailability': 'Search Availability',
    'rooms.searching': 'Searching for',
    'rooms.night': 'night',
    'rooms.nights': 'nights',
    'rooms.guest': 'guest',
    'rooms.guests': 'guests',
    'rooms.pricePerNight': '/night',
    'rooms.capacity': 'Capacity:',
    'rooms.bookNow': 'Book Now',
    'rooms.noRooms': 'No rooms available',
    'rooms.tryDifferentDates': 'Please try different dates or check back later.',
    'rooms.refreshResults': 'Refresh Results',
    'rooms.errorLoading': 'Error Loading Rooms',
    'rooms.errorDescription': 'We encountered an error while loading the available rooms.',
    'rooms.tryAgain': 'Try Again',
    'rooms.authRequired': 'Authentication required',
    'rooms.loginRequired': 'Please log in to book a room',
    'rooms.invalidDates': 'Invalid dates',
    'rooms.selectDates': 'Please select check-in and check-out dates',
  },
  fr: {
    // Navbar
    'nav.home': 'Accueil',
    'nav.facilities': 'Installations',
    'nav.rooms': 'Chambres',
    'nav.foodAndDrink': 'Restauration',
    'nav.contactUs': 'Contactez-nous',
    'nav.dashboard': 'Tableau de bord',
    'nav.myProfile': 'Mon profil',
    'nav.myBookings': 'Mes réservations',
    'nav.signOut': 'Déconnexion',
    'nav.signIn': 'Connexion',
    
    // Rooms page
    'rooms.title': 'Chambres disponibles',
    'rooms.checkIn': 'Date d\'arrivée',
    'rooms.checkOut': 'Date de départ',
    'rooms.guests': 'Clients',
    'rooms.pickDate': 'Choisir une date',
    'rooms.searchAvailability': 'Rechercher disponibilité',
    'rooms.searching': 'Recherche pour',
    'rooms.night': 'nuit',
    'rooms.nights': 'nuits',
    'rooms.guest': 'personne',
    'rooms.guests': 'personnes',
    'rooms.pricePerNight': '/nuit',
    'rooms.capacity': 'Capacité:',
    'rooms.bookNow': 'Réserver',
    'rooms.noRooms': 'Aucune chambre disponible',
    'rooms.tryDifferentDates': 'Veuillez essayer des dates différentes ou vérifier plus tard.',
    'rooms.refreshResults': 'Actualiser les résultats',
    'rooms.errorLoading': 'Erreur de chargement',
    'rooms.errorDescription': 'Nous avons rencontré une erreur lors du chargement des chambres disponibles.',
    'rooms.tryAgain': 'Réessayez',
    'rooms.authRequired': 'Authentification requise',
    'rooms.loginRequired': 'Veuillez vous connecter pour réserver une chambre',
    'rooms.invalidDates': 'Dates invalides',
    'rooms.selectDates': 'Veuillez sélectionner les dates d\'arrivée et de départ',
  },
  es: {
    // Navbar
    'nav.home': 'Inicio',
    'nav.facilities': 'Instalaciones',
    'nav.rooms': 'Habitaciones',
    'nav.foodAndDrink': 'Comida y bebida',
    'nav.contactUs': 'Contáctenos',
    'nav.dashboard': 'Panel de control',
    'nav.myProfile': 'Mi perfil',
    'nav.myBookings': 'Mis reservas',
    'nav.signOut': 'Cerrar sesión',
    'nav.signIn': 'Iniciar sesión',
    
    // Rooms page
    'rooms.title': 'Habitaciones disponibles',
    'rooms.checkIn': 'Fecha de llegada',
    'rooms.checkOut': 'Fecha de salida',
    'rooms.guests': 'Huéspedes',
    'rooms.pickDate': 'Elegir fecha',
    'rooms.searchAvailability': 'Buscar disponibilidad',
    'rooms.searching': 'Buscando por',
    'rooms.night': 'noche',
    'rooms.nights': 'noches',
    'rooms.guest': 'huésped',
    'rooms.guests': 'huéspedes',
    'rooms.pricePerNight': '/noche',
    'rooms.capacity': 'Capacidad:',
    'rooms.bookNow': 'Reservar ahora',
    'rooms.noRooms': 'No hay habitaciones disponibles',
    'rooms.tryDifferentDates': 'Intente con otras fechas o vuelva más tarde.',
    'rooms.refreshResults': 'Actualizar resultados',
    'rooms.errorLoading': 'Error al cargar habitaciones',
    'rooms.errorDescription': 'Encontramos un error al cargar las habitaciones disponibles.',
    'rooms.tryAgain': 'Intentar de nuevo',
    'rooms.authRequired': 'Autenticación requerida',
    'rooms.loginRequired': 'Inicie sesión para reservar una habitación',
    'rooms.invalidDates': 'Fechas inválidas',
    'rooms.selectDates': 'Por favor seleccione fechas de llegada y salida',
  },
  de: {
    // Navbar
    'nav.home': 'Startseite',
    'nav.facilities': 'Einrichtungen',
    'nav.rooms': 'Zimmer',
    'nav.foodAndDrink': 'Essen & Trinken',
    'nav.contactUs': 'Kontakt',
    'nav.dashboard': 'Übersicht',
    'nav.myProfile': 'Mein Profil',
    'nav.myBookings': 'Meine Buchungen',
    'nav.signOut': 'Abmelden',
    'nav.signIn': 'Anmelden',
    
    // Rooms page
    'rooms.title': 'Verfügbare Zimmer',
    'rooms.checkIn': 'Anreisedatum',
    'rooms.checkOut': 'Abreisedatum',
    'rooms.guests': 'Gäste',
    'rooms.pickDate': 'Datum wählen',
    'rooms.searchAvailability': 'Verfügbarkeit suchen',
    'rooms.searching': 'Suche nach',
    'rooms.night': 'Nacht',
    'rooms.nights': 'Nächte',
    'rooms.guest': 'Gast',
    'rooms.guests': 'Gäste',
    'rooms.pricePerNight': '/Nacht',
    'rooms.capacity': 'Kapazität:',
    'rooms.bookNow': 'Jetzt buchen',
    'rooms.noRooms': 'Keine Zimmer verfügbar',
    'rooms.tryDifferentDates': 'Bitte versuchen Sie andere Daten oder schauen Sie später wieder vorbei.',
    'rooms.refreshResults': 'Ergebnisse aktualisieren',
    'rooms.errorLoading': 'Fehler beim Laden der Zimmer',
    'rooms.errorDescription': 'Beim Laden der verfügbaren Zimmer ist ein Fehler aufgetreten.',
    'rooms.tryAgain': 'Erneut versuchen',
    'rooms.authRequired': 'Authentifizierung erforderlich',
    'rooms.loginRequired': 'Bitte melden Sie sich an, um ein Zimmer zu buchen',
    'rooms.invalidDates': 'Ungültige Daten',
    'rooms.selectDates': 'Bitte An- und Abreisedatum auswählen',
  },
  ar: {
    // Navbar - Note: Arabic is right-to-left
    'nav.home': 'الرئيسية',
    'nav.facilities': 'المرافق',
    'nav.rooms': 'الغرف',
    'nav.foodAndDrink': 'الطعام والشراب',
    'nav.contactUs': 'اتصل بنا',
    'nav.dashboard': 'لوحة التحكم',
    'nav.myProfile': 'ملفي الشخصي',
    'nav.myBookings': 'حجوزاتي',
    'nav.signOut': 'تسجيل الخروج',
    'nav.signIn': 'تسجيل الدخول',
    
    // Rooms page
    'rooms.title': 'الغرف المتاحة',
    'rooms.checkIn': 'تاريخ الوصول',
    'rooms.checkOut': 'تاريخ المغادرة',
    'rooms.guests': 'الضيوف',
    'rooms.pickDate': 'اختر تاريخ',
    'rooms.searchAvailability': 'بحث عن توفر',
    'rooms.searching': 'البحث عن',
    'rooms.night': 'ليلة',
    'rooms.nights': 'ليالي',
    'rooms.guest': 'ضيف',
    'rooms.guests': 'ضيوف',
    'rooms.pricePerNight': '/ليلة',
    'rooms.capacity': 'السعة:',
    'rooms.bookNow': 'احجز الآن',
    'rooms.noRooms': 'لا توجد غرف متاحة',
    'rooms.tryDifferentDates': 'الرجاء تجربة تواريخ مختلفة أو التحقق لاحقا.',
    'rooms.refreshResults': 'تحديث النتائج',
    'rooms.errorLoading': 'خطأ في تحميل الغرف',
    'rooms.errorDescription': 'واجهنا خطأ أثناء تحميل الغرف المتاحة.',
    'rooms.tryAgain': 'حاول مرة أخرى',
    'rooms.authRequired': 'المصادقة مطلوبة',
    'rooms.loginRequired': 'يرجى تسجيل الدخول لحجز غرفة',
    'rooms.invalidDates': 'تواريخ غير صالحة',
    'rooms.selectDates': 'يرجى تحديد تواريخ الوصول والمغادرة',
  },
  pt: {
    // Navbar
    'nav.home': 'Início',
    'nav.facilities': 'Instalações',
    'nav.rooms': 'Quartos',
    'nav.foodAndDrink': 'Comida e Bebida',
    'nav.contactUs': 'Contato',
    'nav.dashboard': 'Painel de Controle',
    'nav.myProfile': 'Meu Perfil',
    'nav.myBookings': 'Minhas Reservas',
    'nav.signOut': 'Sair',
    'nav.signIn': 'Entrar',
    
    // Rooms page
    'rooms.title': 'Quartos Disponíveis',
    'rooms.checkIn': 'Data de Check-in',
    'rooms.checkOut': 'Data de Check-out',
    'rooms.guests': 'Hóspedes',
    'rooms.pickDate': 'Escolha uma data',
    'rooms.searchAvailability': 'Buscar Disponibilidade',
    'rooms.searching': 'Buscando por',
    'rooms.night': 'noite',
    'rooms.nights': 'noites',
    'rooms.guest': 'hóspede',
    'rooms.guests': 'hóspedes',
    'rooms.pricePerNight': '/noite',
    'rooms.capacity': 'Capacidade:',
    'rooms.bookNow': 'Reservar Agora',
    'rooms.noRooms': 'Não há quartos disponíveis',
    'rooms.tryDifferentDates': 'Por favor, tente datas diferentes ou volte mais tarde.',
    'rooms.refreshResults': 'Atualizar Resultados',
    'rooms.errorLoading': 'Erro ao Carregar Quartos',
    'rooms.errorDescription': 'Encontramos um erro ao carregar os quartos disponíveis.',
    'rooms.tryAgain': 'Tentar Novamente',
    'rooms.authRequired': 'Autenticação necessária',
    'rooms.loginRequired': 'Por favor, faça login para reservar um quarto',
    'rooms.invalidDates': 'Datas inválidas',
    'rooms.selectDates': 'Por favor, selecione as datas de check-in e check-out',
  },
  sv: {
    // Navbar
    'nav.home': 'Hem',
    'nav.facilities': 'Faciliteter',
    'nav.rooms': 'Rum',
    'nav.foodAndDrink': 'Mat & Dryck',
    'nav.contactUs': 'Kontakta Oss',
    'nav.dashboard': 'Instrumentpanel',
    'nav.myProfile': 'Min Profil',
    'nav.myBookings': 'Mina Bokningar',
    'nav.signOut': 'Logga Ut',
    'nav.signIn': 'Logga In',
    
    // Rooms page
    'rooms.title': 'Tillgängliga Rum',
    'rooms.checkIn': 'Incheckning',
    'rooms.checkOut': 'Utcheckning',
    'rooms.guests': 'Gäster',
    'rooms.pickDate': 'Välj datum',
    'rooms.searchAvailability': 'Sök Tillgänglighet',
    'rooms.searching': 'Söker efter',
    'rooms.night': 'natt',
    'rooms.nights': 'nätter',
    'rooms.guest': 'gäst',
    'rooms.guests': 'gäster',
    'rooms.pricePerNight': '/natt',
    'rooms.capacity': 'Kapacitet:',
    'rooms.bookNow': 'Boka Nu',
    'rooms.noRooms': 'Inga rum tillgängliga',
    'rooms.tryDifferentDates': 'Prova andra datum eller återkom senare.',
    'rooms.refreshResults': 'Uppdatera Resultat',
    'rooms.errorLoading': 'Fel vid Laddning av Rum',
    'rooms.errorDescription': 'Vi stötte på ett fel när tillgängliga rum laddades.',
    'rooms.tryAgain': 'Försök Igen',
    'rooms.authRequired': 'Autentisering krävs',
    'rooms.loginRequired': 'Vänligen logga in för att boka ett rum',
    'rooms.invalidDates': 'Ogiltiga datum',
    'rooms.selectDates': 'Välj in- och utcheckningsdatum',
  }
};

export default LanguageContext;
