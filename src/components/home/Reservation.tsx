
import { useState } from 'react';
import { Calendar, Users, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const Reservation = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    guests: '2',
    checkin: '',
    checkout: '',
    roomType: 'standard',
    specialRequests: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.checkin || !formData.checkout) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Show success message
    toast({
      title: "Reservation request submitted!",
      description: "We'll contact you shortly to confirm your booking.",
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      guests: '2',
      checkin: '',
      checkout: '',
      roomType: 'standard',
      specialRequests: ''
    });
  };

  return (
    <section id="reservations" className="py-24 bg-slate-50">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 fade-in-up">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
            Make a Reservation
          </h2>
          <p className="text-lg text-slate-600">
            Book your stay directly with us for the best rates and exclusive perks.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Reservation Info */}
          <div className="lg:col-span-2 self-center">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Why Book Direct?</h3>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-900 flex items-center justify-center text-white mr-3 mt-0.5">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p className="text-slate-700">Best rate guarantee</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-900 flex items-center justify-center text-white mr-3 mt-0.5">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p className="text-slate-700">Free welcome drink on arrival</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-900 flex items-center justify-center text-white mr-3 mt-0.5">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p className="text-slate-700">Flexible cancellation options</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-900 flex items-center justify-center text-white mr-3 mt-0.5">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p className="text-slate-700">Priority room upgrades when available</p>
                </li>
              </ul>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <h4 className="font-semibold text-slate-900 mb-2">Need Assistance?</h4>
                <p className="text-slate-600 mb-4">
                  Our concierge team is available 24/7 to help with your booking.
                </p>
                <a 
                  href="tel:+11234567890" 
                  className="font-medium text-slate-900 hover:text-slate-700 transition-colors"
                >
                  +1 (123) 456-7890
                </a>
              </div>
            </div>
          </div>

          {/* Reservation Form */}
          <div className="lg:col-span-3">
            <form 
              onSubmit={handleSubmit}
              className="glass-morphism p-6 md:p-8 rounded-2xl"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-900 focus:border-slate-900 focus:ring-slate-900 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-900 focus:border-slate-900 focus:ring-slate-900 sm:text-sm"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="block w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-900 focus:border-slate-900 focus:ring-slate-900 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="guests" className="block text-sm font-medium text-slate-700 mb-1">
                    Number of Guests *
                  </label>
                  <div className="relative">
                    <select
                      id="guests"
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      className="block w-full rounded-lg appearance-none border border-slate-200 px-4 py-3 pr-10 text-slate-900 focus:border-slate-900 focus:ring-slate-900 sm:text-sm"
                      required
                    >
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4 Guests</option>
                      <option value="5+">5+ Guests</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                      <Users size={16} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="checkin" className="block text-sm font-medium text-slate-700 mb-1">
                    Check-in Date *
                  </label>
                  <div className="relative">
                    <input
                      id="checkin"
                      name="checkin"
                      type="date"
                      value={formData.checkin}
                      onChange={handleChange}
                      className="block w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-900 focus:border-slate-900 focus:ring-slate-900 sm:text-sm"
                      required
                    />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                      <Calendar size={16} />
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="checkout" className="block text-sm font-medium text-slate-700 mb-1">
                    Check-out Date *
                  </label>
                  <div className="relative">
                    <input
                      id="checkout"
                      name="checkout"
                      type="date"
                      value={formData.checkout}
                      onChange={handleChange}
                      className="block w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-900 focus:border-slate-900 focus:ring-slate-900 sm:text-sm"
                      required
                    />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                      <Calendar size={16} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="roomType" className="block text-sm font-medium text-slate-700 mb-1">
                  Room Type *
                </label>
                <div className="relative">
                  <select
                    id="roomType"
                    name="roomType"
                    value={formData.roomType}
                    onChange={handleChange}
                    className="block w-full rounded-lg appearance-none border border-slate-200 px-4 py-3 pr-10 text-slate-900 focus:border-slate-900 focus:ring-slate-900 sm:text-sm"
                    required
                  >
                    <option value="standard">Standard Room</option>
                    <option value="deluxe">Deluxe Room</option>
                    <option value="suite">Executive Suite</option>
                    <option value="presidential">Presidential Suite</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="specialRequests" className="block text-sm font-medium text-slate-700 mb-1">
                  Special Requests
                </label>
                <textarea
                  id="specialRequests"
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleChange}
                  rows={3}
                  className="block w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-900 focus:border-slate-900 focus:ring-slate-900 sm:text-sm"
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn-shine w-full bg-slate-900 text-white hover:bg-slate-800 px-6 py-3 rounded-lg font-medium text-base transition-all"
              >
                Request Reservation
              </button>

              <p className="text-sm text-slate-500 mt-4 text-center">
                * Required fields. By submitting this form, you agree to our terms and privacy policy.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reservation;
