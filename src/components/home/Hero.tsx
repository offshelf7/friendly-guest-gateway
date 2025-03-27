
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
      className="relative min-h-screen w-full flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <BlurImage
          src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070&auto=format&fit=crop"
          alt="Luxury hotel interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30 backdrop-blur-[2px]"></div>
      </div>

      <div className="container px-4 md:px-6 z-10 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in animation-delay-200">
            <p className="text-white/90 mb-4 font-medium tracking-wider">WELCOME TO</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
              The Perfect Place <br />
              <span className="italic">For Your Getaway</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Experience unparalleled luxury and comfort with our premium services 
              designed to make your stay unforgettable.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in animation-delay-600">
            <a 
              href="#book" 
              className="btn-shine bg-white text-slate-900 hover:bg-slate-100 px-8 py-3 rounded-full font-medium text-lg transition-all"
            >
              Book Now
            </a>
            <a 
              href="#promotions" 
              className="group text-white hover:text-white/80 px-8 py-3 flex items-center space-x-2 transition-colors"
            >
              <span>View Promotions</span>
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <button 
        onClick={scrollToFeatures}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-white/80 hover:text-white transition-colors cursor-pointer"
        aria-label="Scroll down"
      >
        <ChevronDown size={32} />
      </button>
    </section>
  );
};

export default Hero;
