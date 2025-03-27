
import { useState } from 'react';
import { cn } from '@/lib/utils';
import BlurImage from '../ui/BlurImage';

interface Feature {
  id: string;
  title: string;
  description: string;
  image: string;
}

const features: Feature[] = [
  {
    id: 'spa',
    title: 'Luxury Spa Experience',
    description: 'Indulge in our world-class spa offering a range of treatments designed to rejuvenate your body and mind.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'dining',
    title: 'Fine Dining',
    description: 'Savor exquisite cuisine prepared by our award-winning chefs using the finest local and international ingredients.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'rooms',
    title: 'Luxurious Rooms',
    description: 'Rest in our meticulously designed rooms that blend comfort with elegant aesthetics for the perfect stay.',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070&auto=format&fit=crop'
  }
];

const Features = () => {
  const [activeFeature, setActiveFeature] = useState(features[0].id);

  return (
    <section id="features" className="py-24 bg-white relative">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 fade-in-up">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
            Premium Experience
          </h2>
          <p className="text-lg text-slate-600">
            Discover the exceptional amenities and services we offer to make your stay memorable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Feature Navigation */}
          <div className="col-span-1 md:col-span-1 lg:col-span-2 flex flex-col space-y-6">
            {features.map((feature) => (
              <button
                key={feature.id}
                onClick={() => setActiveFeature(feature.id)}
                className={cn(
                  "text-left px-6 py-4 rounded-xl transition-all duration-300 border",
                  activeFeature === feature.id
                    ? "border-slate-900 bg-slate-50 shadow-sm"
                    : "border-transparent hover:bg-slate-50"
                )}
              >
                <h3 className={cn(
                  "font-semibold text-lg mb-1 transition-colors",
                  activeFeature === feature.id ? "text-slate-900" : "text-slate-700"
                )}>
                  {feature.title}
                </h3>
                <p className={cn(
                  "transition-colors",
                  activeFeature === feature.id ? "text-slate-700" : "text-slate-500"
                )}>
                  {feature.description}
                </p>
              </button>
            ))}
          </div>

          {/* Feature Image */}
          <div className="col-span-1 md:col-span-2 lg:col-span-4 rounded-2xl overflow-hidden h-80 md:h-auto relative">
            {features.map((feature) => (
              <div
                key={feature.id}
                className={cn(
                  "absolute inset-0 transition-opacity duration-500",
                  activeFeature === feature.id ? "opacity-100" : "opacity-0"
                )}
              >
                <BlurImage
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-white/90">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
