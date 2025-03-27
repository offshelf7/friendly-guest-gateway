
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import LoginButton from './LoginButton';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 md:px-10 py-4",
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a 
          href="#" 
          className="flex items-center"
        >
          <div className="bg-amber-300/90 rounded-lg px-4 py-2">
            <span className="text-xl font-bold tracking-tight text-slate-900">LUXURY</span>
            <div className="text-xs text-slate-900 text-center">HOTELS</div>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#home" className="text-white hover:text-white/80 transition-colors">Home</a>
          <a href="#facilities" className="text-white hover:text-white/80 transition-colors">Facilities</a>
          <a href="#rooms" className="text-white hover:text-white/80 transition-colors">Rooms</a>
          <a href="#contact" className="text-white hover:text-white/80 transition-colors">Contact Us</a>
          <LoginButton />
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white focus:outline-none" 
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
          <a 
            href="#home" 
            className="text-xl font-medium text-slate-900 py-2"
            onClick={toggleMenu}
          >
            Home
          </a>
          <a 
            href="#facilities" 
            className="text-xl font-medium text-slate-900 py-2"
            onClick={toggleMenu}
          >
            Facilities
          </a>
          <a 
            href="#rooms" 
            className="text-xl font-medium text-slate-900 py-2"
            onClick={toggleMenu}
          >
            Rooms
          </a>
          <a 
            href="#contact" 
            className="text-xl font-medium text-slate-900 py-2"
            onClick={toggleMenu}
          >
            Contact Us
          </a>
          <Link
            to="/login"
            className="text-xl font-medium text-slate-900 py-2"
            onClick={toggleMenu}
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
