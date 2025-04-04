
import { cn } from '@/lib/utils';
import { Home, Hotel, Phone, Calendar, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { hasDashboardAccess, ROLE_DISPLAY_NAMES } from '@/types/roleTypes';
import { Badge } from '@/components/ui/badge';

type NavbarMobileMenuProps = {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  handleSignOut: () => void;
};

const NavbarMobileMenu = ({ isMenuOpen, toggleMenu, handleSignOut }: NavbarMobileMenuProps) => {
  // Create mock auth data for debugging
  const mockAuthData = {
    user: null,
    signOut: async () => { console.log('Mock sign out'); },
    userRoles: null,
    userSuspended: false,
    session: null,
    loading: false,
    signUp: async () => ({ error: null }),
    signIn: async () => ({ error: null }),
  };
  
  // Try to use the real auth context, but fall back to mock data if it's not available
  let auth;
  try {
    auth = useAuth();
  } catch (e) {
    console.log('AuthProvider not available, using mock data');
    auth = mockAuthData;
  }
  
  const { user, userRoles } = auth;
  
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
        
        {user && (
          <div className="flex items-center justify-center gap-2 py-2">
            <User className="h-5 w-5 text-slate-900" />
            <Badge variant="outline" className="border-slate-900 text-slate-900">
              {displayRole}
            </Badge>
          </div>
        )}
        
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
