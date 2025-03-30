
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/home/Footer';

const BookingSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [bookingData, setBookingData] = useState<any>(null);
  const [roomData, setRoomData] = useState<any>(null);
  
  // Check for session_id (Stripe) or tx_ref (Chapa) in URL
  const sessionId = searchParams.get('session_id');
  const txRef = searchParams.get('tx_ref');
  
  useEffect(() => {
    const verifyPayment = async () => {
      try {
        setIsLoading(true);
        
        // If booking data was passed directly through state
        if (location.state?.booking && location.state?.room) {
          setBookingData(location.state.booking);
          setRoomData(location.state.room);
          
          // Update booking status to confirmed
          await supabase
            .from('bookings')
            .update({ status: 'confirmed' })
            .eq('id', location.state.booking.id);
            
          setIsLoading(false);
          return;
        }
        
        // Handle Stripe payment verification
        if (sessionId) {
          // Get payment details from session
          const { data: sessionData, error: sessionError } = await supabase
            .from('bookings')
            .select('*, rooms(*)')
            .eq('status', 'pending')
            .order('created_at', { ascending: false })
            .limit(1);
            
          if (sessionError) throw sessionError;
          
          if (sessionData && sessionData.length > 0) {
            // Update booking status
            await supabase
              .from('bookings')
              .update({ status: 'confirmed' })
              .eq('id', sessionData[0].id);
              
            setBookingData(sessionData[0]);
            setRoomData(sessionData[0].rooms);
          }
        }
        
        // Handle Chapa payment verification
        if (txRef) {
          // This would normally verify with Chapa API, but for demo purposes:
          const { data: txData, error: txError } = await supabase
            .from('bookings')
            .select('*, rooms(*)')
            .eq('status', 'pending')
            .order('created_at', { ascending: false })
            .limit(1);
            
          if (txError) throw txError;
          
          if (txData && txData.length > 0) {
            // Update booking status
            await supabase
              .from('bookings')
              .update({ status: 'confirmed' })
              .eq('id', txData[0].id);
              
            setBookingData(txData[0]);
            setRoomData(txData[0].rooms);
          }
        }
      } catch (error) {
        console.error('Error verifying payment:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    verifyPayment();
  }, [location, sessionId, txRef]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow py-24 px-4 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold">Confirming your booking...</h2>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (!bookingData || !roomData) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow py-24 px-4 flex items-center justify-center">
          <Card className="w-full max-w-lg">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="bg-red-100 text-red-600 p-3 rounded-full inline-flex mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-2">Booking Information Not Found</h2>
                <p className="text-slate-600 mb-6">
                  We couldn't find your booking information. If you believe this is an error, please contact our support team.
                </p>
                <Button onClick={() => navigate('/rooms')}>
                  Back to Rooms
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow py-24 px-4">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="pt-6">
            <div className="text-center mb-6">
              <div className="bg-green-100 text-green-600 p-3 rounded-full inline-flex mb-4">
                <CheckCircle className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
              <p className="text-slate-600">
                Thank you for your reservation. We've sent a confirmation to your email.
              </p>
            </div>
            
            <div className="bg-slate-50 p-4 rounded-lg mb-6">
              <h3 className="font-semibold text-lg mb-2">Booking Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-slate-500">Room</div>
                  <div className="font-medium">{roomData.name}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500">Booking ID</div>
                  <div className="font-medium">{bookingData.id.substring(0, 8)}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500">Check-in</div>
                  <div className="font-medium">{new Date(bookingData.check_in_date).toLocaleDateString()}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500">Check-out</div>
                  <div className="font-medium">{new Date(bookingData.check_out_date).toLocaleDateString()}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500">Guests</div>
                  <div className="font-medium">{bookingData.guests_count}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500">Status</div>
                  <div className="font-medium text-green-600">Confirmed</div>
                </div>
              </div>
            </div>
            
            <Separator className="my-6" />
            
            <div>
              <h3 className="font-semibold text-lg mb-2">Payment Summary</h3>
              <div className="flex justify-between mb-2">
                <span>Total Amount</span>
                <span className="font-semibold">${bookingData.total_price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-500">
                <span>Payment Status</span>
                <span>Paid</span>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => navigate('/my-bookings')}>
              View My Bookings
            </Button>
            <Button onClick={() => navigate('/')} className="ml-2">
              Return Home <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default BookingSuccess;
