
import { Mail, Phone, MapPin, Instagram, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className="bg-slate-900 text-white pt-16">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10">
          {/* Column 1: Brand & Description */}
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-2xl font-bold mb-4">Guest.</h2>
            <p className="text-slate-300 mb-6">
              Luxury accommodations designed to provide exceptional comfort and unforgettable experiences for all our guests.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-white hover:text-slate-300 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="#" 
                className="text-white hover:text-slate-300 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="#" 
                className="text-white hover:text-slate-300 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-slate-300 hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="#features" className="text-slate-300 hover:text-white transition-colors">About Us</a>
              </li>
              <li>
                <a href="#promotions" className="text-slate-300 hover:text-white transition-colors">Promotions</a>
              </li>
              <li>
                <a href="#reservations" className="text-slate-300 hover:text-white transition-colors">Reservations</a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-white transition-colors">Gallery</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-slate-300 hover:text-white transition-colors">Spa & Wellness</a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-white transition-colors">Restaurant & Bar</a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-white transition-colors">Conference Rooms</a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-white transition-colors">Concierge Service</a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-white transition-colors">Airport Transfers</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="mr-3 h-5 w-5 text-slate-300 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300">
                  123 Luxury Avenue<br />
                  New York, NY 10001
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-3 h-5 w-5 text-slate-300 flex-shrink-0" />
                <a href="tel:+11234567890" className="text-slate-300 hover:text-white transition-colors">
                  +1 (123) 456-7890
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="mr-3 h-5 w-5 text-slate-300 flex-shrink-0" />
                <a href="mailto:info@guesthotel.com" className="text-slate-300 hover:text-white transition-colors">
                  info@guesthotel.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section with Newsletter & Copyright */}
        <div className="pt-8 pb-10 border-t border-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Newsletter */}
            <div>
              <h4 className="text-lg font-semibold mb-3">Subscribe to our newsletter</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-grow rounded-l-lg border-0 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-white"
                />
                <button className="btn-shine bg-white text-slate-900 rounded-r-lg px-4 py-3 font-medium transition-colors hover:bg-slate-100">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-slate-400 text-sm md:text-right">
              <p>© {new Date().getFullYear()} Guest Hotel. All rights reserved.</p>
              <div className="mt-2">
                <a href="#" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</a>
                <span className="mx-2">·</span>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
