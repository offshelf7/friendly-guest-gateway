
import { useState } from 'react';
import { CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

type BookingFormProps = {
  handleBookRoom: () => Promise<void>;
  specialRequests: string;
  setSpecialRequests: (value: string) => void;
  bookingLoading: boolean;
};

const BookingForm = ({
  handleBookRoom,
  specialRequests,
  setSpecialRequests,
  bookingLoading
}: BookingFormProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
      <h3 className="text-xl font-semibold mb-4">Special Requests</h3>
      <Textarea
        placeholder="Any special requests or requirements for your stay?"
        className="mb-4"
        value={specialRequests}
        onChange={(e) => setSpecialRequests(e.target.value)}
      />
      
      <div className="text-sm text-slate-600 mb-6">
        We'll do our best to accommodate your requests, but special requests cannot be guaranteed.
      </div>
      
      <Button 
        size="lg" 
        className="w-full"
        onClick={handleBookRoom}
        disabled={bookingLoading}
      >
        {bookingLoading ? (
          <span className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Processing...
          </span>
        ) : (
          <span className="flex items-center">
            <CreditCard className="mr-2 h-5 w-5" />
            Complete Booking
          </span>
        )}
      </Button>
    </div>
  );
};

export default BookingForm;
