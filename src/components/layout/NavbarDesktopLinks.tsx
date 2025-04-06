
import { cn } from '@/lib/utils';
import { Home, Hotel, Phone, Coffee, LayoutDashboard, Globe } from 'lucide-react';
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

type NavbarDesktopLinksProps = {
  isScrolled: boolean;
  isAdmin: boolean;
};

const NavbarDesktopLinks = ({ isScrolled, isAdmin }: NavbarDesktopLinksProps) => {
  const { user, userRoles } = useAuth();
  const canAccessDashboard = hasDashboardAccess(userRoles);
  const { language, setLanguage, t } = useLanguage();
  
  // Get the first role to display
  const displayRole = userRoles && userRoles.length > 0 
    ? ROLE_DISPLAY_NAMES[userRoles[0]] 
    : user ? 'Guest' : '';
  
  const linkClasses = "flex items-center gap-2 px-3 py-2 transition-colors text-white hover:text-amber-300 font-medium whitespace-nowrap";
  
  return (
    <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
      <Link to="/" className={linkClasses}>
        <Home className="h-4 w-4" />
        {t('nav.home')}
      </Link>
      <Link to="/facilities" className={linkClasses}>
        <Hotel className="h-4 w-4" />
        {t('nav.facilities')}
      </Link>
      <Link to="/rooms" className={linkClasses}>
        {t('nav.rooms')}
      </Link>
      <Link to="/food-and-drink" className={linkClasses}>
        <Coffee className="h-4 w-4" />
        {/* Use shorter text for Food & Drink */}
        {t('nav.dining')}
      </Link>
      <Link to="/contact" className={linkClasses}>
        <Phone className="h-4 w-4" />
        {/* Use shorter text for Contact Us */}
        {t('nav.contact')}
      </Link>
      
      {user && canAccessDashboard && (
        <Link to="/admin" className={linkClasses}>
          <LayoutDashboard className="h-4 w-4" />
          {t('nav.dashboard')}
        </Link>
      )}
      
      {/* User Role Display */}
      {user && (
        <div className="hidden lg:flex items-center ml-1">
          <Badge variant="outline" className="border-amber-300 text-amber-300">
            {displayRole}
          </Badge>
        </div>
      )}
      
      {/* Language Selector */}
      <div className="hidden lg:flex items-center">
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="w-[110px] bg-transparent border-white/20 hover:border-white/40 text-white">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-white" />
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
    </div>
  );
};

export default NavbarDesktopLinks;
