
import { cn } from '@/lib/utils';
import { Home, Hotel, Phone, Coffee, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { hasDashboardAccess, ROLE_DISPLAY_NAMES } from '@/types/roleTypes';
import { Badge } from '@/components/ui/badge';

type NavbarDesktopLinksProps = {
  isScrolled: boolean;
  isAdmin: boolean;
};

const NavbarDesktopLinks = ({ isScrolled, isAdmin }: NavbarDesktopLinksProps) => {
  const { user, userRoles } = useAuth();
  const canAccessDashboard = hasDashboardAccess(userRoles);
  
  // Get the first role to display
  const displayRole = userRoles && userRoles.length > 0 
    ? ROLE_DISPLAY_NAMES[userRoles[0]] 
    : user ? 'Guest' : '';
  
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
      
      {user && displayRole && (
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-white" />
          <Badge variant="outline" className="border-amber-300 text-amber-300">
            {displayRole}
          </Badge>
        </div>
      )}
    </div>
  );
};

export default NavbarDesktopLinks;
