
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

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
          className="text-2xl font-bold tracking-tight text-slate-900"
        >
          Guest.
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#home" className="text-slate-600 hover:text-slate-900 transition-colors">Home</a>
          <a href="#features" className="text-slate-600 hover:text-slate-900 transition-colors">About</a>
          <a href="#promotions" className="text-slate-600 hover:text-slate-900 transition-colors">Promotions</a>
          <a href="#reservations" className="text-slate-600 hover:text-slate-900 transition-colors">Reservations</a>
          <a href="#contact" className="text-slate-600 hover:text-slate-900 transition-colors">Contact</a>
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <a 
            href="#book" 
            className="btn-shine bg-slate-900 text-white px-6 py-2 rounded-full font-medium transition-all hover:bg-slate-800"
          >
            Book Now
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-slate-900 focus:outline-none" 
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
            href="#features" 
            className="text-xl font-medium text-slate-900 py-2"
            onClick={toggleMenu}
          >
            About
          </a>
          <a 
            href="#promotions" 
            className="text-xl font-medium text-slate-900 py-2"
            onClick={toggleMenu}
          >
            Promotions
          </a>
          <a 
            href="#reservations" 
            className="text-xl font-medium text-slate-900 py-2"
            onClick={toggleMenu}
          >
            Reservations
          </a>
          <a 
            href="#contact" 
            className="text-xl font-medium text-slate-900 py-2"
            onClick={toggleMenu}
          >
            Contact
          </a>
          <a 
            href="#book" 
            className="btn-shine bg-slate-900 text-white px-6 py-3 rounded-full font-medium mt-4 inline-block mx-auto"
            onClick={toggleMenu}
          >
            Book Now
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
