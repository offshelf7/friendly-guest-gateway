
import { format } from 'date-fns';
import { CalendarIcon, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Room } from '@/types/roomTypes';

type BookingSummaryProps = {
  room: Room;
  checkInDate: Date;
  checkOutDate: Date;
  guestsCount: number;
  calculateNights: () => number;
  calculateTotalPrice: () => number;
};

const BookingSummary = ({
  room,
  checkInDate,
  checkOutDate,
  guestsCount,
  calculateNights,
  calculateTotalPrice
}: BookingSummaryProps) => {
  return (
    <Card className="sticky top-24">
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-4">Booking Summary</h3>
        
        <div className="space-y-4">
          <div>
            <div className="text-sm text-slate-500">Dates</div>
            <div className="font-medium flex items-center">
              <CalendarIcon className="w-4 h-4 mr-1 text-slate-400" />
              {format(checkInDate, 'MMM d, yyyy')} - {format(checkOutDate, 'MMM d, yyyy')}
            </div>
            <div className="text-sm text-slate-600">
              {calculateNights()} night{calculateNights() !== 1 ? 's' : ''}
            </div>
          </div>
          
          <div>
            <div className="text-sm text-slate-500">Guests</div>
            <div className="font-medium flex items-center">
              <Users className="w-4 h-4 mr-1 text-slate-400" />
              {guestsCount} guest{guestsCount !== 1 ? 's' : ''}
            </div>
          </div>
          
          <Separator />
          
          <div>
            <div className="text-sm text-slate-500">Price Breakdown</div>
            <div className="flex justify-between items-center mt-2">
              <div>
                ${room.price_per_night} x {calculateNights()} night{calculateNights() !== 1 ? 's' : ''}
              </div>
              <div>${room.price_per_night * calculateNights()}</div>
            </div>
            <div className="flex justify-between items-center mt-2">
              <div>Taxes & fees</div>
              <div>Included</div>
            </div>
          </div>
          
          <Separator />
          
          <div className="flex justify-between items-center font-bold text-lg">
            <div>Total</div>
            <div>${calculateTotalPrice()}</div>
          </div>
          
          <div className="text-sm text-slate-600 pt-4">
            By completing this booking, you agree to our terms and conditions and cancellation policy.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingSummary;
