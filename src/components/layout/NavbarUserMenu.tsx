
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
import LoginButton from './LoginButton';

type NavbarUserMenuProps = {
  isScrolled: boolean;
  toggleMenu?: () => void;
};

const NavbarUserMenu = ({ isScrolled, toggleMenu }: NavbarUserMenuProps) => {
  const navigate = useNavigate();
  
  // Create mock auth data for debugging
  const mockAuthData = {
    user: null,
    signOut: async () => { console.log('Mock sign out'); navigate('/'); },
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
  
  const { user, signOut } = auth;
  
  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };
  
  if (!user) {
    return <LoginButton />;
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
