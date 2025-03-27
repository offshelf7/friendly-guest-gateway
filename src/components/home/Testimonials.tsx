
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  location: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "Calm, Serene, Retro - What a way to relax and enjoy",
    author: "Mr. and Mrs. Baxter",
    location: "UK"
  },
  {
    id: 2,
    quote: "Beautiful property, wonderful staff and amazing amenities",
    author: "John Smith",
    location: "USA"
  },
  {
    id: 3,
    quote: "Perfect beachfront location with spectacular views",
    author: "Maria Lopez",
    location: "Spain"
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl font-bold text-center mb-8">Testimonials</h2>
        
        <div className="relative py-8">
          {/* Current testimonial */}
          <div className="text-center">
            <p className="text-xl italic mb-6">"{testimonials[activeIndex].quote}"</p>
            <p className="text-gray-700">
              {testimonials[activeIndex].author}, {testimonials[activeIndex].location}
            </p>
          </div>
          
          {/* Navigation buttons */}
          <div className="flex justify-center mt-8 space-x-4">
            <button 
              onClick={prevTestimonial}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-amber-300 text-slate-900"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={nextTestimonial}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-amber-300 text-slate-900"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
