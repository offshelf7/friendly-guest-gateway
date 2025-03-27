
import { Mail, Phone, MapPin, Instagram, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className="bg-slate-900 text-white pt-16">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10">
          {/* Column 1: Brand */}
          <div className="col-span-1">
            <div className="bg-amber-300/90 rounded-lg px-4 py-2 inline-block mb-6">
              <div className="text-xl font-bold tracking-tight text-slate-900">LUXURY</div>
              <div className="text-xs text-slate-900 text-center">HOTELS</div>
            </div>
            <p className="text-slate-300 mb-6">
              497 Evergreen Rd. Roseville, CA 95673<br />
              +44 345 678 903<br />
              luxury_hotels@gmail.com
            </p>
          </div>

          {/* Column 2: About Us */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-slate-300 hover:text-white transition-colors">About</a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-white transition-colors">Contact</a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-white transition-colors">Terms & Conditions</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Newsletter */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Subscribe to our newsletter</h3>
            <div className="flex mb-4">
              <input 
                type="email" 
                placeholder="Email address" 
                className="flex-grow bg-slate-800 border-0 px-4 py-2 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-amber-300"
              />
              <button className="bg-amber-300 text-slate-900 px-4 py-2 font-medium transition-colors hover:bg-amber-400">
                OK
              </button>
            </div>
            <div className="flex space-x-4 mt-6">
              <a 
                href="#" 
                className="text-white hover:text-amber-300 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="#" 
                className="text-white hover:text-amber-300 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="#" 
                className="text-white hover:text-amber-300 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
