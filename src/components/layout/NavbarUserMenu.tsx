
import { cn } from '@/lib/utils';
import { User, LogOut, Calendar } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';

type NavbarUserMenuProps = {
  isScrolled: boolean;
  toggleMenu?: () => void;
};

const NavbarUserMenu = ({ isScrolled, toggleMenu }: NavbarUserMenuProps) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };
  
  if (!user) {
    return (
      <Link to="/login">
        <Button variant="outline" className={cn(
          "border-2",
          isScrolled 
            ? "border-slate-700 text-slate-700 hover:bg-slate-700 hover:text-white" 
            : "border-white text-white hover:bg-white/10"
        )}>
          Sign In
        </Button>
      </Link>
    );
  }
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={cn(
          "border-2",
          isScrolled 
            ? "border-slate-700 text-slate-700 hover:bg-slate-700 hover:text-white" 
            : "border-white text-white hover:bg-white/10"
        )}>
          <User className="h-4 w-4 mr-2" />
          Account
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="font-medium text-sm">
          {user.email}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/profile" className="cursor-pointer" onClick={toggleMenu}>My Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/my-bookings" className="cursor-pointer flex items-center" onClick={toggleMenu}>
            <Calendar className="h-4 w-4 mr-2" />
            My Bookings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-600">
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavbarUserMenu;
