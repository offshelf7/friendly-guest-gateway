
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import NavbarLogo from './NavbarLogo';
import NavbarDesktopLinks from './NavbarDesktopLinks';
import NavbarUserMenu from './NavbarUserMenu';
import NavbarMobileMenu from './NavbarMobileMenu';

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
        <NavbarLogo />

        {/* Desktop Navigation */}
        <NavbarDesktopLinks isScrolled={isScrolled} isAdmin={isAdmin} />
        
        {/* Desktop User Menu */}
        <div className="hidden md:block">
          <NavbarUserMenu isScrolled={isScrolled} />
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
      <NavbarMobileMenu 
        isMenuOpen={isMenuOpen} 
        toggleMenu={toggleMenu} 
        handleSignOut={handleSignOut} 
      />
    </nav>
  );
};

export default Navbar;
