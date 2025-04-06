
import { cn } from '@/lib/utils';
import { Home, Hotel, Phone, Calendar, LayoutDashboard, Globe, Coffee, User, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { hasDashboardAccess, ROLE_DISPLAY_NAMES } from '@/types/roleTypes';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage, languages } from '@/contexts/LanguageContext';

type NavbarMobileMenuProps = {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  handleSignOut: () => void;
};

const NavbarMobileMenu = ({ isMenuOpen, toggleMenu, handleSignOut }: NavbarMobileMenuProps) => {
  const { language, setLanguage, t } = useLanguage();
  
  // Try to use the real auth context, but fall back to mock data if it's not available
  let auth;
  try {
    auth = useAuth();
  } catch (e) {
    console.log('AuthProvider not available, using mock data');
    auth = {
      user: null,
      signOut: async () => { console.log('Mock sign out'); },
      userRoles: null,
      userSuspended: false,
      session: null,
      loading: false,
      signUp: async () => ({ error: null }),
      signIn: async () => ({ error: null }),
    };
  }
  
  const { user, userRoles } = auth;
  const canAccessDashboard = hasDashboardAccess(userRoles);
  
  // Get the first role to display
  const displayRole = userRoles && userRoles.length > 0 
    ? ROLE_DISPLAY_NAMES[userRoles[0]] 
    : user ? 'Guest' : '';
  
  return (
    <div 
      className={cn(
        "fixed inset-0 bg-white z-40 transition-transform duration-300 ease-in-out transform md:hidden overflow-y-auto",
        isMenuOpen ? "translate-x-0" : "translate-x-full"
      )}
      style={{ paddingTop: "5rem" }}
    >
      <div className="flex flex-col space-y-2 px-6 pb-8">
        {/* Language Selector for mobile - at top for visibility */}
        <div className="flex items-center justify-center py-4 border-b border-gray-100">
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <SelectValue placeholder="Language" />
              </div>
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  <span className="flex items-center gap-2">
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Navigation Links */}
        <Link
          to="/"
          className="text-lg font-medium text-slate-900 py-3 flex items-center gap-3 hover:bg-gray-50 px-4 rounded-lg"
          onClick={toggleMenu}
        >
          <Home className="h-5 w-5" />
          {t('nav.home')}
        </Link>
        <Link 
          to="/facilities" 
          className="text-lg font-medium text-slate-900 py-3 flex items-center gap-3 hover:bg-gray-50 px-4 rounded-lg"
          onClick={toggleMenu}
        >
          <Hotel className="h-5 w-5" />
          {t('nav.facilities')}
        </Link>
        <Link 
          to="/rooms" 
          className="text-lg font-medium text-slate-900 py-3 flex items-center gap-3 hover:bg-gray-50 px-4 rounded-lg"
          onClick={toggleMenu}
        >
          {t('nav.rooms')}
        </Link>
        <Link 
          to="/food-and-drink" 
          className="text-lg font-medium text-slate-900 py-3 flex items-center gap-3 hover:bg-gray-50 px-4 rounded-lg"
          onClick={toggleMenu}
        >
          <Coffee className="h-5 w-5" />
          {/* Use consistent name in mobile menu */}
          {t('nav.dining')}
        </Link>
        <Link 
          to="/contact" 
          className="text-lg font-medium text-slate-900 py-3 flex items-center gap-3 hover:bg-gray-50 px-4 rounded-lg"
          onClick={toggleMenu}
        >
          <Phone className="h-5 w-5" />
          {/* Use consistent name in mobile menu */}
          {t('nav.contact')}
        </Link>
        
        {user && canAccessDashboard && (
          <Link
            to="/admin"
            className="text-lg font-medium text-slate-900 py-3 flex items-center gap-3 hover:bg-gray-50 px-4 rounded-lg"
            onClick={toggleMenu}
          >
            <LayoutDashboard className="h-5 w-5" />
            {t('nav.dashboard')}
          </Link>
        )}
        
        {/* User Section */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          {/* User Role Display */}
          {user && (
            <div className="flex items-center px-4 py-2">
              <Badge variant="outline" className="border-slate-900 text-slate-900 w-full justify-center py-1">
                {displayRole}
              </Badge>
            </div>
          )}
          
          {user ? (
            <>
              <div className="text-sm font-medium text-slate-900 py-3 px-4 opacity-75 flex items-center">
                <User className="h-4 w-4 mr-2" />
                {user.email}
              </div>
              <Link
                to="/profile"
                className="text-lg font-medium text-slate-900 py-3 flex items-center gap-3 hover:bg-gray-50 px-4 rounded-lg"
                onClick={toggleMenu}
              >
                {t('nav.myProfile')}
              </Link>
              <Link
                to="/my-bookings"
                className="text-lg font-medium text-slate-900 py-3 flex items-center gap-3 hover:bg-gray-50 px-4 rounded-lg"
                onClick={toggleMenu}
              >
                <Calendar className="h-5 w-5" />
                {t('nav.myBookings')}
              </Link>
              <button
                onClick={() => {
                  handleSignOut();
                  toggleMenu();
                }}
                className="text-lg font-medium text-red-600 py-3 flex items-center gap-3 hover:bg-gray-50 px-4 rounded-lg w-full text-left"
              >
                <LogOut className="h-5 w-5" />
                {t('nav.signOut')}
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-amber-300 hover:bg-amber-400 text-slate-900 font-medium py-3 px-4 rounded-lg block text-center mt-2"
              onClick={toggleMenu}
            >
              {t('nav.signIn')}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavbarMobileMenu;
