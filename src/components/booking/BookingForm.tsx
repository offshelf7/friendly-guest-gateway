
import { useState } from 'react';
import { CreditCard, CreditCardIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

type BookingFormProps = {
  handleBookRoom: (paymentMethod: 'stripe' | 'chapa') => Promise<void>;
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
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'chapa'>('stripe');

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
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
        <RadioGroup 
          defaultValue="stripe" 
          value={paymentMethod}
          onValueChange={(value) => setPaymentMethod(value as 'stripe' | 'chapa')}
          className="flex flex-col space-y-3"
        >
          <div className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-slate-50">
            <RadioGroupItem value="stripe" id="stripe" />
            <Label htmlFor="stripe" className="flex items-center cursor-pointer">
              <CreditCardIcon className="mr-2 h-5 w-5" />
              <span>Credit Card (Stripe)</span>
            </Label>
          </div>
          
          <div className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-slate-50">
            <RadioGroupItem value="chapa" id="chapa" />
            <Label htmlFor="chapa" className="flex items-center cursor-pointer">
              <CreditCard className="mr-2 h-5 w-5" />
              <span>Chapa Payment (ETB)</span>
            </Label>
          </div>
        </RadioGroup>
      </div>
      
      <Button 
        size="lg" 
        className="w-full"
        onClick={() => handleBookRoom(paymentMethod)}
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
