
import { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { format, differenceInDays } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarIcon, Wifi, Coffee, Check, Users, CreditCard } from 'lucide-react';
import { useRoomData } from '@/hooks/useRoomData';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/home/Footer';

const RoomBooking = () => {
  const { roomId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [bookingLoading, setBookingLoading] = useState(false);
  const [specialRequests, setSpecialRequests] = useState('');
  
  // Get data from location state or set defaults
  const checkInDate = location.state?.checkInDate ? new Date(location.state.checkInDate) : new Date();
  const checkOutDate = location.state?.checkOutDate ? new Date(location.state.checkOutDate) : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
  const guestsCount = location.state?.guestsCount || 2;
  
  // Use TanStack Query to fetch room data
  const { data: room, isLoading: roomLoading, error: roomError } = useRoomData(roomId);
  
  // Redirect if no user
  if (!user) {
    toast({
      title: "Authentication required",
      description: "Please log in to book a room",
      variant: "destructive"
    });
    navigate('/login');
  }
  
  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return 0;
    return differenceInDays(checkOutDate, checkInDate);
  };
  
  const calculateTotalPrice = () => {
    if (!room) return 0;
    return room.price_per_night * calculateNights();
  };
  
  const handleBookRoom = async () => {
    if (!user || !room) return;
    
    try {
      setBookingLoading(true);
      
      const nights = calculateNights();
      const totalPrice = calculateTotalPrice();
      
      if (nights <= 0) {
        toast({
          title: "Invalid dates",
          description: "Please select valid check-in and check-out dates",
          variant: "destructive"
        });
        return;
      }
      
      // Check if the room is available for these dates using custom RPC function
      const { data: availabilityData, error: availabilityError } = await supabase.rpc(
        'check_room_availability',
        { 
          room_id: room.id,
          check_in: format(checkInDate, 'yyyy-MM-dd'),
          check_out: format(checkOutDate, 'yyyy-MM-dd')
        }
      );
      
      if (availabilityError) {
        throw availabilityError;
      }
      
      if (!availabilityData) {
        toast({
          title: "Room not available",
          description: "This room is not available for the selected dates. Please choose different dates.",
          variant: "destructive"
        });
        return;
      }
      
      // Create the booking
      const { data: bookingData, error: bookingError } = await supabase
        .from('bookings')
        .insert([
          {
            user_id: user.id,
            room_id: room.id,
            check_in_date: format(checkInDate, 'yyyy-MM-dd'),
            check_out_date: format(checkOutDate, 'yyyy-MM-dd'),
            guests_count: guestsCount,
            total_price: totalPrice,
            status: 'confirmed',
            special_requests: specialRequests
          }
        ])
        .select()
        .single();
      
      if (bookingError) throw bookingError;
      
      toast({
        title: "Booking confirmed!",
        description: `Your booking for ${room.name} has been confirmed.`,
      });
      
      // Redirect to a booking confirmation page
      navigate('/booking-success', { 
        state: { 
          booking: bookingData,
          room: room 
        }
      });
      
    } catch (error) {
      console.error('Error booking room:', error);
      toast({
        title: "Booking failed",
        description: "There was an error processing your booking. Please try again.",
        variant: "destructive"
      });
    } finally {
      setBookingLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow py-24 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Complete Your Booking</h1>
          
          {roomLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Skeleton className="h-64 w-full mb-4" />
                <Skeleton className="h-10 w-1/3 mb-2" />
                <Skeleton className="h-4 w-2/3 mb-4" />
                <Skeleton className="h-20 w-full mb-4" />
                <Skeleton className="h-40 w-full" />
              </div>
              <div className="lg:col-span-1">
                <Skeleton className="h-64 w-full" />
              </div>
            </div>
          ) : roomError ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-4 text-red-500">Error Loading Room</h2>
              <p className="mb-6">We couldn't load the room details. Please try again later.</p>
              <Button onClick={() => navigate('/rooms')}>Back to Rooms</Button>
            </div>
          ) : !room ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-4">Room Not Found</h2>
              <p className="mb-6">The room you're looking for doesn't exist or is no longer available.</p>
              <Button onClick={() => navigate('/rooms')}>Back to Rooms</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Room Details and Form */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-slate-200 mb-8">
                  <div className="h-64 overflow-hidden bg-slate-200">
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
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h2 className="text-2xl font-bold mb-1">{room.name}</h2>
                        <div className="text-slate-600">{room.room_type.charAt(0).toUpperCase() + room.room_type.slice(1)} Room</div>
                      </div>
                      <div className="text-xl font-bold text-blue-600">${room.price_per_night}/night</div>
                    </div>
                    
                    <p className="text-slate-700 mb-6">{room.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center">
                        <Users className="w-5 h-5 mr-2 text-slate-500" />
                        <span>Up to {room.capacity} guests</span>
                      </div>
                      {room.has_wifi && (
                        <div className="flex items-center">
                          <Wifi className="w-5 h-5 mr-2 text-slate-500" />
                          <span>Free WiFi</span>
                        </div>
                      )}
                      {room.has_breakfast && (
                        <div className="flex items-center">
                          <Coffee className="w-5 h-5 mr-2 text-slate-500" />
                          <span>Breakfast included</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-2">Amenities</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {room.amenities?.map((amenity) => (
                          <div key={amenity.id} className="flex items-center">
                            <Check className="w-4 h-4 mr-2 text-green-500" />
                            <span>{amenity.amenity_name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
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
              </div>
              
              {/* Booking Summary */}
              <div className="lg:col-span-1">
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
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default RoomBooking;
