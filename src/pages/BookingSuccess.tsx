
import { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CalendarCheck, Users, Home, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

const BookingSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state?.booking;
  const room = location.state?.room;
  
  useEffect(() => {
    if (!booking || !room) {
      navigate('/rooms');
    }
  }, [booking, room, navigate]);
  
  if (!booking || !room) {
    return null;
  }
  
  return (
    <div className="container mx-auto py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CalendarCheck className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-lg text-slate-600">
            Thank you for booking with Royal Hotel. Your reservation has been confirmed.
          </p>
        </div>
        
        <Card className="p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Booking Details</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-slate-500">Booking Number</div>
                  <div className="font-medium">#{booking.id.slice(0, 8).toUpperCase()}</div>
                </div>
                
                <div>
                  <div className="text-sm text-slate-500">Room</div>
                  <div className="font-medium">{room.name}</div>
                  <div className="text-sm text-slate-600">{room.room_type.charAt(0).toUpperCase() + room.room_type.slice(1)} Room</div>
                </div>
                
                <div>
                  <div className="text-sm text-slate-500">Dates</div>
                  <div className="font-medium">
                    {format(new Date(booking.check_in_date), 'MMM d, yyyy')} - {format(new Date(booking.check_out_date), 'MMM d, yyyy')}
                  </div>
                  <div className="text-sm text-slate-600">
                    {new Date(booking.check_out_date).getDate() - new Date(booking.check_in_date).getDate()} night(s)
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-slate-500">Guests</div>
                  <div className="font-medium flex items-center">
                    <Users className="w-4 h-4 mr-1 text-slate-400" />
                    {booking.guests_count} guest{booking.guests_count !== 1 ? 's' : ''}
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Payment Information</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-slate-500">Total Price</div>
                  <div className="font-medium text-lg">${booking.total_price}</div>
                  <div className="text-sm text-slate-600">Paid in full</div>
                </div>
                
                <div>
                  <div className="text-sm text-slate-500">Status</div>
                  <div className="inline-block px-2 py-1 rounded bg-green-100 text-green-800 text-sm font-medium">
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-slate-200">
                <h4 className="font-medium mb-2">Special Requests</h4>
                <p className="text-slate-600 text-sm">
                  {booking.special_requests || "No special requests"}
                </p>
              </div>
            </div>
          </div>
        </Card>
        
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-2">Check-in Information</h3>
          <p className="text-slate-600 mb-4">
            Please arrive at the hotel after 3:00 PM on {format(new Date(booking.check_in_date), 'MMMM d, yyyy')} with a valid ID and the credit card used for booking.
          </p>
          <div className="flex items-center">
            <Home className="h-5 w-5 text-blue-500 mr-2" />
            <span className="text-slate-700">123 Hotel Street, Beach City, Tropical Island</span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link to="/">
              Return to Home
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/rooms">
              Browse More Rooms
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;
