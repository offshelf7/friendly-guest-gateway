
import React from 'react';
import { Button } from '@/components/ui/button';
import BlurImage from '../ui/BlurImage';

const RoomFeatures = () => {
  return (
    <section id="rooms" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-lg text-gray-700">All our room types are including complementary breakfast</p>
        </div>

        {/* Luxury Redefined */}
        <div className="flex flex-col md:flex-row items-center mb-16 gap-8">
          <div className="w-full md:w-1/2 p-6">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Luxury redefined</h2>
            <p className="text-slate-700 mb-6">
              Our rooms are designed to transport you into an environment made for leisure. 
              Take your mind off the day-to-day of home life and find a private paradise for yourself.
            </p>
            <Button 
              variant="outline" 
              className="border-amber-400 text-slate-900 hover:bg-amber-400/10 rounded-none"
            >
              EXPLORE
            </Button>
          </div>
          <div className="w-full md:w-1/2">
            <BlurImage 
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop" 
              alt="Luxury hotel room with ocean view" 
              className="w-full h-80 object-cover"
            />
          </div>
        </div>

        {/* Leave your worries in the sand */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-8">
          <div className="w-full md:w-1/2 p-6">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Leave your worries in the sand</h2>
            <p className="text-slate-700 mb-6">
              We love life at the beach. Being close to the ocean with access to endless sandy 
              beaches brings a sense of peace that's hard to find. A relaxing place 
              of warm ocean breeze, palm trees and watching the wave roll in.
            </p>
            <Button 
              variant="outline" 
              className="border-amber-400 text-slate-900 hover:bg-amber-400/10 rounded-none"
            >
              EXPLORE
            </Button>
          </div>
          <div className="w-full md:w-1/2">
            <BlurImage 
              src="https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?q=80&w=2070&auto=format&fit=crop" 
              alt="Beachfront view from hotel" 
              className="w-full h-80 object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoomFeatures;
