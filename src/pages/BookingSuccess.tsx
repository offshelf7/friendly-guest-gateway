
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { format, differenceInDays } from 'date-fns';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Calendar, Users, Home, ArrowRight } from 'lucide-react';
import { Room, Booking } from '@/types/roomTypes';

const BookingSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const booking = location.state?.booking as Booking;
  const room = location.state?.room as Room;
  
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (!booking || !room) {
      navigate('/rooms');
    }
  }, [user, booking, room, navigate]);
  
  if (!booking || !room) {
    return null;
  }
  
  return (
    <div className="container mx-auto py-24 px-4">
      <div className="max-w-3xl mx-auto text-center mb-8">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
        <p className="text-slate-600 text-lg">
          Your reservation has been successfully confirmed. We're looking forward to welcoming you.
        </p>
      </div>
      
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Booking Details</h2>
              
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-slate-500">Booking Confirmation</div>
                  <div className="font-medium">{booking.id.substring(0, 8).toUpperCase()}</div>
                </div>
                
                <div>
                  <div className="text-sm text-slate-500">Stay Dates</div>
                  <div className="font-medium flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-slate-500" />
                    {format(new Date(booking.check_in_date), 'MMM d, yyyy')} 
                    <ArrowRight className="w-4 h-4 mx-2 text-slate-400" />
                    {format(new Date(booking.check_out_date), 'MMM d, yyyy')}
                  </div>
                  <div className="text-sm text-slate-600">
                    {differenceInDays(new Date(booking.check_out_date), new Date(booking.check_in_date))} night(s)
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-slate-500">Number of Guests</div>
                  <div className="font-medium flex items-center">
                    <Users className="w-4 h-4 mr-2 text-slate-500" />
                    {booking.guests_count} guest{booking.guests_count > 1 ? 's' : ''}
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-slate-500">Total Paid</div>
                  <div className="text-xl font-bold text-blue-600">${booking.total_price}</div>
                </div>
                
                {booking.special_requests && (
                  <div>
                    <div className="text-sm text-slate-500">Special Requests</div>
                    <div className="p-3 bg-slate-50 rounded-md text-slate-700 text-sm">
                      {booking.special_requests}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Room Information</h2>
              
              <div className="bg-slate-50 rounded-lg overflow-hidden">
                <div className="h-40 overflow-hidden">
                  {room.image_url ? (
                    <img 
                      src={room.image_url} 
                      alt={room.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img 
                      src={`https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&auto=format&fit=crop&q=60`} 
                      alt={room.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{room.name}</h3>
                  <div className="text-slate-600 mb-2">{room.room_type.charAt(0).toUpperCase() + room.room_type.slice(1)} Room</div>
                  <div className="flex items-center text-sm text-slate-700 mb-2">
                    <Users className="w-4 h-4 mr-1 text-slate-500" />
                    <span>Up to {room.capacity} guests</span>
                  </div>
                  <p className="text-sm text-slate-600 line-clamp-3">{room.description}</p>
                </div>
              </div>
              
              <div className="mt-6">
                <div className="text-sm text-slate-600 mb-2">
                  Check-in time starts at 3:00 PM
                </div>
                <div className="text-sm text-slate-600">
                  Check-out time is 11:00 AM
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="text-center">
        <p className="text-slate-600 mb-6">
          We've sent a confirmation email with all these details. If you have any questions, 
          please don't hesitate to contact us.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Button onClick={() => navigate('/')}>
            <Home className="mr-2 h-4 w-4" />
            Return to Home
          </Button>
          <Button variant="outline" onClick={() => navigate('/rooms')}>
            Browse More Rooms
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;
