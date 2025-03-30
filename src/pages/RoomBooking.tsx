
import { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { format, differenceInDays } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { useRoomData } from '@/hooks/useRoomData';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/home/Footer';
import RoomDetails from '@/components/booking/RoomDetails';
import BookingForm from '@/components/booking/BookingForm';
import BookingSummary from '@/components/booking/BookingSummary';
import LoadingState from '@/components/booking/LoadingState';
import ErrorState from '@/components/booking/ErrorState';

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
  
  const handleBookRoom = async (paymentMethod: 'stripe' | 'chapa') => {
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
      
      // Create a pending booking
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
            status: 'pending', // Changed from 'confirmed' to 'pending'
            special_requests: specialRequests
          }
        ])
        .select()
        .single();
      
      if (bookingError) throw bookingError;
      
      // Prepare checkout item
      const bookingItem = {
        id: room.id,
        name: `${room.name} - ${nights} night${nights !== 1 ? 's' : ''}`,
        description: `Check-in: ${format(checkInDate, 'MMM d, yyyy')} - Check-out: ${format(checkOutDate, 'MMM d, yyyy')}`,
        price: totalPrice,
        quantity: 1
      };
      
      // Redirect to checkout page with booking information
      navigate('/checkout', {
        state: {
          items: [bookingItem],
          totalPrice: totalPrice,
          paymentMethod: paymentMethod,
          booking: bookingData
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
  
  const renderContent = () => {
    if (roomLoading) {
      return <LoadingState />;
    }
    
    if (roomError) {
      return (
        <ErrorState 
          title="Error Loading Room" 
          message="We couldn't load the room details. Please try again later." 
        />
      );
    }
    
    if (!room) {
      return (
        <ErrorState 
          title="Room Not Found" 
          message="The room you're looking for doesn't exist or is no longer available." 
        />
      );
    }
    
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Room Details and Form */}
        <div className="lg:col-span-2">
          <RoomDetails room={room} />
          <BookingForm 
            handleBookRoom={handleBookRoom}
            specialRequests={specialRequests}
            setSpecialRequests={setSpecialRequests}
            bookingLoading={bookingLoading}
          />
        </div>
        
        {/* Booking Summary */}
        <div className="lg:col-span-1">
          <BookingSummary 
            room={room}
            checkInDate={checkInDate}
            checkOutDate={checkOutDate}
            guestsCount={guestsCount}
            calculateNights={calculateNights}
            calculateTotalPrice={calculateTotalPrice}
          />
        </div>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow py-24 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Complete Your Booking</h1>
          {renderContent()}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default RoomBooking;
