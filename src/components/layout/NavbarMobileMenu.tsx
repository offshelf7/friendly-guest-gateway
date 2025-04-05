
import { cn } from '@/lib/utils';
import { Home, Hotel, Phone, Calendar, LayoutDashboard, Globe } from 'lucide-react';
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
import { useState } from 'react';

type NavbarMobileMenuProps = {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  handleSignOut: () => void;
};

type Language = {
  code: string;
  name: string;
  flag: string;
};

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
];

const NavbarMobileMenu = ({ isMenuOpen, toggleMenu, handleSignOut }: NavbarMobileMenuProps) => {
  const [language, setLanguage] = useState('en');
  
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
        "fixed inset-0 bg-white z-40 pt-20 px-6 transition-transform duration-300 ease-in-out transform md:hidden",
        isMenuOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      <div className="flex flex-col space-y-6 text-center">
        <Link
          to="/"
          className="text-xl font-medium text-slate-900 py-2 flex items-center justify-center gap-2"
          onClick={toggleMenu}
        >
          <Home className="h-5 w-5" />
          Home
        </Link>
        <Link 
          to="/facilities" 
          className="text-xl font-medium text-slate-900 py-2 flex items-center justify-center gap-2"
          onClick={toggleMenu}
        >
          <Hotel className="h-5 w-5" />
          Facilities
        </Link>
        <Link 
          to="/rooms" 
          className="text-xl font-medium text-slate-900 py-2"
          onClick={toggleMenu}
        >
          Rooms
        </Link>
        <Link 
          to="/contact" 
          className="text-xl font-medium text-slate-900 py-2 flex items-center justify-center gap-2"
          onClick={toggleMenu}
        >
          <Phone className="h-5 w-5" />
          Contact Us
        </Link>
        
        {user && canAccessDashboard && (
          <Link
            to="/admin"
            className="text-xl font-medium text-slate-900 py-2 flex items-center justify-center gap-2"
            onClick={toggleMenu}
          >
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </Link>
        )}
        
        {/* User Role Display */}
        {user && (
          <div className="flex items-center justify-center gap-2 py-2">
            <Badge variant="outline" className="border-slate-900 text-slate-900">
              {displayRole}
            </Badge>
          </div>
        )}
        
        {/* Language Selector */}
        <div className="flex items-center justify-center py-2">
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-[160px]">
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
        
        {user ? (
          <>
            <div className="text-xl font-medium text-slate-900 py-2">
              {user.email}
            </div>
            <Link
              to="/profile"
              className="text-xl font-medium text-slate-900 py-2"
              onClick={toggleMenu}
            >
              My Profile
            </Link>
            <Link
              to="/my-bookings"
              className="text-xl font-medium text-slate-900 py-2 flex items-center justify-center gap-2"
              onClick={toggleMenu}
            >
              <Calendar className="h-5 w-5" />
              My Bookings
            </Link>
            <button
              onClick={() => {
                handleSignOut();
                toggleMenu();
              }}
              className="text-xl font-medium text-red-600 py-2"
            >
              Sign Out
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="text-xl font-medium text-slate-900 py-2"
            onClick={toggleMenu}
          >
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavbarMobileMenu;
