
import { cn } from '@/lib/utils';
import { Home, Hotel, Phone, Shield, Coffee, LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { hasDashboardAccess } from '@/types/roleTypes';

type NavbarDesktopLinksProps = {
  isScrolled: boolean;
  isAdmin: boolean;
};

const NavbarDesktopLinks = ({ isScrolled, isAdmin }: NavbarDesktopLinksProps) => {
  const { user, userRoles } = useAuth();
  const canAccessDashboard = hasDashboardAccess(userRoles);
  
  return (
    <div className="hidden md:flex items-center space-x-8">
      <Link to="/" className="flex items-center gap-2 transition-colors text-white hover:text-white/80">
        <Home className="h-4 w-4" />
        Home
      </Link>
      <Link to="/facilities" className="flex items-center gap-2 transition-colors text-white hover:text-white/80">
        <Hotel className="h-4 w-4" />
        Facilities
      </Link>
      <Link to="/rooms" className="transition-colors text-white hover:text-white/80">
        Rooms
      </Link>
      <Link to="/food-and-drink" className="flex items-center gap-2 transition-colors text-white hover:text-white/80">
        <Coffee className="h-4 w-4" />
        Food & Drink
      </Link>
      <Link to="/contact" className="flex items-center gap-2 transition-colors text-white hover:text-white/80">
        <Phone className="h-4 w-4" />
        Contact Us
      </Link>
      
      {user && canAccessDashboard && (
        <Link to="/admin" className="flex items-center gap-2 transition-colors text-white hover:text-white/80">
          <LayoutDashboard className="h-4 w-4" />
          Dashboard
        </Link>
      )}
      
      {isAdmin && (
        <Link to="/admin" className="flex items-center gap-2 transition-colors text-white hover:text-white/80">
          <Shield className="h-4 w-4" />
          Admin Dashboard
        </Link>
      )}
    </div>
  );
};

export default NavbarDesktopLinks;
