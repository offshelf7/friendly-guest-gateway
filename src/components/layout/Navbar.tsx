
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import NavbarLogo from './NavbarLogo';
import NavbarDesktopLinks from './NavbarDesktopLinks';
import NavbarUserMenu from './NavbarUserMenu';
import NavbarMobileMenu from './NavbarMobileMenu';
import { hasDashboardAccess } from '@/types/roleTypes';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, signOut, userRoles } = useAuth();
  const isMobile = useIsMobile();

  // Check if user has admin role - updated to include proper role checking
  const isAdmin = user && (user.email === 'admin@hotel.com' || 
                           (userRoles && (userRoles.includes('admin') || 
                            userRoles.includes('staff'))));

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when changing from mobile to desktop view
  useEffect(() => {
    if (!isMobile && isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [isMobile, isMenuOpen]);

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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-4 md:px-8 lg:px-12",
        isScrolled 
          ? "bg-slate-800/95 backdrop-blur-md shadow-md py-2" 
          : "bg-slate-800 py-4"
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
          className="md:hidden focus:outline-none text-white p-2"
          onClick={toggleMenu}
          aria-label="Toggle menu"
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
