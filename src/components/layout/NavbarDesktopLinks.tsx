
import { cn } from '@/lib/utils';
import { Home, Hotel, Phone, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

type NavbarDesktopLinksProps = {
  isScrolled: boolean;
  isAdmin: boolean;
};

const NavbarDesktopLinks = ({ isScrolled, isAdmin }: NavbarDesktopLinksProps) => {
  return (
    <div className="hidden md:flex items-center space-x-8">
      <Link to="/" className={cn(
        "flex items-center gap-2 transition-colors",
        isScrolled ? "text-slate-700 hover:text-slate-900" : "text-white hover:text-white/80"
      )}>
        <Home className="h-4 w-4" />
        Home
      </Link>
      <Link to="/facilities" className={cn(
        "flex items-center gap-2 transition-colors",
        isScrolled ? "text-slate-700 hover:text-slate-900" : "text-white hover:text-white/80"
      )}>
        <Hotel className="h-4 w-4" />
        Facilities
      </Link>
      <Link to="/rooms" className={cn(
        "transition-colors",
        isScrolled ? "text-slate-700 hover:text-slate-900" : "text-white hover:text-white/80"
      )}>
        Rooms
      </Link>
      <Link to="/contact" className={cn(
        "flex items-center gap-2 transition-colors",
        isScrolled ? "text-slate-700 hover:text-slate-900" : "text-white hover:text-white/80"
      )}>
        <Phone className="h-4 w-4" />
        Contact Us
      </Link>
      
      {isAdmin && (
        <Link to="/admin" className={cn(
          "flex items-center gap-2 transition-colors",
          isScrolled ? "text-slate-700 hover:text-slate-900" : "text-white hover:text-white/80"
        )}>
          <Shield className="h-4 w-4" />
          Admin Dashboard
        </Link>
      )}
    </div>
  );
};

export default NavbarDesktopLinks;
