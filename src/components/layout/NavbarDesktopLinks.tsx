
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
  
  return (
    <div className="hidden md:flex items-center space-x-8">
      <Link to="/" className="flex items-center gap-2 transition-colors text-white hover:text-white/80">
        <Home className="h-4 w-4" />
        {t('nav.home')}
      </Link>
      <Link to="/facilities" className="flex items-center gap-2 transition-colors text-white hover:text-white/80">
        <Hotel className="h-4 w-4" />
        {t('nav.facilities')}
      </Link>
      <Link to="/rooms" className="transition-colors text-white hover:text-white/80">
        {t('nav.rooms')}
      </Link>
      <Link to="/food-and-drink" className="flex items-center gap-2 transition-colors text-white hover:text-white/80">
        <Coffee className="h-4 w-4" />
        {t('nav.foodAndDrink')}
      </Link>
      <Link to="/contact" className="flex items-center gap-2 transition-colors text-white hover:text-white/80">
        <Phone className="h-4 w-4" />
        {t('nav.contactUs')}
      </Link>
      
      {user && canAccessDashboard && (
        <Link to="/admin" className="flex items-center gap-2 transition-colors text-white hover:text-white/80">
          <LayoutDashboard className="h-4 w-4" />
          {t('nav.dashboard')}
        </Link>
      )}
      
      {/* User Role Display */}
      {user && (
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-amber-300 text-amber-300">
            {displayRole}
          </Badge>
        </div>
      )}
      
      {/* Language Selector */}
      <div className="flex items-center">
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="w-[130px] bg-transparent border-white/20 text-white">
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
