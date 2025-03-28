
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X, User, LogOut, Home, Shield } from 'lucide-react';
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

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  // Assume admin role for demonstration - in a real app, this would come from the user object
  const isAdmin = user && user.email === 'admin@hotel.com';

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 md:px-10 py-4",
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center"
        >
          <div className="bg-amber-300/90 rounded-lg px-4 py-2">
            <span className="text-xl font-bold tracking-tight text-slate-900">LUXURY</span>
            <div className="text-xs text-slate-900 text-center">HOTELS</div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className={cn(
            "flex items-center gap-2 transition-colors",
            isScrolled ? "text-slate-700 hover:text-slate-900" : "text-white hover:text-white/80"
          )}>
            <Home className="h-4 w-4" />
            Home
          </Link>
          <a href="/#facilities" className={cn(
            "transition-colors",
            isScrolled ? "text-slate-700 hover:text-slate-900" : "text-white hover:text-white/80"
          )}>Facilities</a>
          <Link to="/rooms" className={cn(
            "transition-colors",
            isScrolled ? "text-slate-700 hover:text-slate-900" : "text-white hover:text-white/80"
          )}>Rooms</Link>
          <a href="/#contact" className={cn(
            "transition-colors",
            isScrolled ? "text-slate-700 hover:text-slate-900" : "text-white hover:text-white/80"
          )}>Contact Us</a>
          
          {isAdmin && (
            <Link to="/admin" className={cn(
              "flex items-center gap-2 transition-colors",
              isScrolled ? "text-slate-700 hover:text-slate-900" : "text-white hover:text-white/80"
            )}>
              <Shield className="h-4 w-4" />
              Admin Dashboard
            </Link>
          )}
          
          {user ? (
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
                  <Link to="/profile" className="cursor-pointer">My Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/bookings" className="cursor-pointer">My Bookings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-600">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
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
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className={cn(
            "md:hidden focus:outline-none",
            isScrolled ? "text-slate-900" : "text-white"
          )}
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
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
          <a 
            href="/#facilities" 
            className="text-xl font-medium text-slate-900 py-2"
            onClick={toggleMenu}
          >
            Facilities
          </a>
          <Link 
            to="/rooms" 
            className="text-xl font-medium text-slate-900 py-2"
            onClick={toggleMenu}
          >
            Rooms
          </Link>
          <a 
            href="/#contact" 
            className="text-xl font-medium text-slate-900 py-2"
            onClick={toggleMenu}
          >
            Contact Us
          </a>
          
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
                to="/bookings"
                className="text-xl font-medium text-slate-900 py-2"
                onClick={toggleMenu}
              >
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
    </nav>
  );
};

export default Navbar;
