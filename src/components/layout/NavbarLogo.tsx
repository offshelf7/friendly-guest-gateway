
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

type NavbarLogoProps = {
  isScrolled?: boolean;
};

const NavbarLogo = ({ isScrolled }: NavbarLogoProps) => {
  return (
    <Link 
      to="/" 
      className="flex items-center"
    >
      <div className="bg-amber-300 rounded-lg px-4 py-2 hover:bg-amber-400 transition-colors duration-200">
        <span className="text-xl font-bold tracking-tight text-slate-900">LUXURY</span>
        <div className="text-xs font-medium text-slate-900 text-center">HOTELS</div>
      </div>
    </Link>
  );
};

export default NavbarLogo;
