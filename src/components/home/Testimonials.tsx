
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Business Traveler",
    content: "The attention to detail at this hotel is remarkable. From the moment I arrived, the staff anticipated my needs and made my business trip feel like a luxury escape.",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Family Vacation",
    content: "We brought our entire family and everyone found something to love. The kids enjoyed the activities while my wife and I relaxed at the spa. Perfect balance!",
    rating: 5
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "Honeymoon Stay",
    content: "Our honeymoon was magical thanks to the romantic atmosphere and exceptional service. The private dining experience arranged for us was unforgettable.",
    rating: 5
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, index) => (
      <svg 
        key={index} 
        className={cn(
          "w-5 h-5", 
          index < rating ? "text-amber-400" : "text-gray-300"
        )}
        xmlns="http://www.w3.org/2000/svg" 
        fill="currentColor" 
        viewBox="0 0 24 24"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ));
  };

  return (
    <section className="py-20 bg-slate-50">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 fade-in-up">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
            What Our Guests Say
          </h2>
          <p className="text-lg text-slate-600">
            Read about experiences from our valued guests around the world.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Carousel */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                    <div className="flex items-center mb-6">
                      {renderStars(testimonial.rating)}
                    </div>
                    <blockquote className="text-xl italic text-slate-700 mb-6">
                      "{testimonial.content}"
                    </blockquote>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center text-slate-700 font-semibold">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <p className="font-semibold text-slate-900">{testimonial.name}</p>
                        <p className="text-slate-600 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  activeIndex === index
                    ? "bg-slate-900 w-8"
                    : "bg-slate-300 hover:bg-slate-400"
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
