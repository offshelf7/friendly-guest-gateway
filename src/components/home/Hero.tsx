
import { ChevronDown } from 'lucide-react';
import BlurImage from '../ui/BlurImage';

const Hero = () => {
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <BlurImage
          src="public/lovable-uploads/f9dbd5af-0ea0-4838-97a4-2e09f08c8c69.png"
          alt="Luxury hotel by the beach"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/20"></div>
      </div>

      <div className="container px-4 md:px-6 z-10 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in animation-delay-200">
            <p className="text-white/90 mb-4 font-medium tracking-wider">WELCOME TO</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-2 tracking-tight leading-tight">
              LUXURY
            </h1>
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6 tracking-wider">
              HOTELS
            </h2>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Book your stay and enjoy Luxury redefined at the most affordable rates.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in animation-delay-600">
            <a 
              href="#book" 
              className="bg-amber-300 text-slate-900 hover:bg-amber-400 px-8 py-3 rounded-none font-medium text-lg transition-all"
            >
              BOOK NOW
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-10 left-0 right-0 text-center">
        <button 
          onClick={scrollToFeatures}
          className="animate-bounce text-white/80 hover:text-white transition-colors cursor-pointer"
          aria-label="Scroll down"
        >
          <p className="text-white mb-2">Scroll</p>
          <ChevronDown size={32} className="mx-auto" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
