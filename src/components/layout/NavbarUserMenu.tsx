
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
        <Button variant="outline" className="border-2 border-amber-300 text-amber-300 hover:bg-amber-300/10 hover:text-amber-200">
          Sign In
        </Button>
      </Link>
    );
  }
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="border-2 border-amber-300 text-amber-300 hover:bg-amber-300/10 hover:text-amber-200">
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
