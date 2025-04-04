
import { cn } from '@/lib/utils';
import { Home, Hotel, Phone, Calendar, LayoutDashboard, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { hasDashboardAccess } from '@/types/roleTypes';

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
  const canAccessDashboard = hasDashboardAccess(userRoles);
  
  // Update admin check to include 'admin' role from userRoles
  const isAdmin = user && (user.email === 'admin@hotel.com' || 
                         (userRoles && (userRoles.includes('admin'))));
  
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
        
        {isAdmin && (
          <Link
            to="/admin"
            className="text-xl font-medium text-slate-900 py-2 flex items-center justify-center gap-2"
            onClick={toggleMenu}
          >
            <Shield className="h-5 w-5" />
            Admin Dashboard
          </Link>
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
