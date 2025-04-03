
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { useAuth } from '@/contexts/MockAuthContext'; // Import from MockAuthContext instead
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, Clock, UserIcon, Ban } from 'lucide-react';
import Footer from '../components/home/Footer';

// Mock data for demonstration
const mockBookings = [
  {
    id: '1',
    roomName: 'Deluxe Suite',
    roomType: 'suite',
    checkIn: '2023-09-15',
    checkOut: '2023-09-20',
    status: 'completed',
    totalAmount: 1200,
    guestsCount: 2
  },
  {
    id: '2',
    roomName: 'Premium King',
    roomType: 'king',
    checkIn: '2023-11-10',
    checkOut: '2023-11-15',
    status: 'upcoming',
    totalAmount: 950,
    guestsCount: 2
  },
  {
    id: '3',
    roomName: 'Family Suite',
    roomType: 'suite',
    checkIn: '2024-01-05',
    checkOut: '2024-01-10',
    status: 'upcoming',
    totalAmount: 1450,
    guestsCount: 4
  },
  {
    id: '4',
    roomName: 'Standard Double',
    roomType: 'double',
    checkIn: '2022-12-20',
    checkOut: '2022-12-25',
    status: 'cancelled',
    totalAmount: 750,
    guestsCount: 2
  }
];

const MyBookings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upcoming');
  
  useEffect(() => {
    // Redirect to login if no user
    if (!user) {
      navigate('/login');
      return;
    }
    
    // Simulate loading user data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [user, navigate]);
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">Upcoming</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  const calculateNights = (checkIn: string, checkOut: string) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };
  
  // Filter bookings based on active tab
  const filteredBookings = mockBookings.filter(booking => {
    if (activeTab === 'upcoming') return booking.status === 'upcoming';
    if (activeTab === 'past') return booking.status === 'completed';
    if (activeTab === 'cancelled') return booking.status === 'cancelled';
    return true; // 'all' tab
  });

  if (loading) {
    return (
      <div className="min-h-screen pt-20 bg-slate-50">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col space-y-6">
            <Skeleton className="h-12 w-64" />
            <Skeleton className="h-10 w-full max-w-md" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map(i => (
                <Skeleton key={i} className="h-64 w-full rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-slate-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
        
        <Tabs 
          defaultValue="upcoming" 
          className="w-full" 
          onValueChange={setActiveTab}
        >
          <div className="overflow-x-auto">
            <TabsList className="mb-6">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
              <TabsTrigger value="all">All Bookings</TabsTrigger>
            </TabsList>
          </div>
          
          {['upcoming', 'past', 'cancelled', 'all'].map((tab) => (
            <TabsContent key={tab} value={tab} className="space-y-6">
              {filteredBookings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredBookings.map(booking => (
                    <Card key={booking.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <div className={`h-2 ${
                        booking.status === 'upcoming' ? 'bg-blue-500' : 
                        booking.status === 'completed' ? 'bg-green-500' : 'bg-red-500'
                      }`}></div>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-xl">{booking.roomName}</CardTitle>
                            <CardDescription className="capitalize">{booking.roomType}</CardDescription>
                          </div>
                          {getStatusBadge(booking.status)}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between border-b pb-3">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">Check-in</span>
                          </div>
                          <span className="font-medium">{formatDate(booking.checkIn)}</span>
                        </div>
                        <div className="flex justify-between border-b pb-3">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">Check-out</span>
                          </div>
                          <span className="font-medium">{formatDate(booking.checkOut)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">
                                {calculateNights(booking.checkIn, booking.checkOut)} nights
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <UserIcon className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">
                                {booking.guestsCount} {booking.guestsCount > 1 ? 'guests' : 'guest'}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">Total</p>
                            <p className="font-bold text-lg">${booking.totalAmount}</p>
                          </div>
                        </div>
                        
                        <div className="pt-2 flex space-x-2">
                          <Button variant="outline" className="flex-1">View Details</Button>
                          {booking.status === 'upcoming' && (
                            <Button variant="outline" className="flex-1 text-red-600 hover:text-red-700">
                              <Ban className="h-4 w-4 mr-1" />
                              Cancel
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg border">
                  <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-slate-100 rounded-full">
                    <Calendar className="h-8 w-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No bookings found</h3>
                  <p className="text-muted-foreground mb-6">
                    {activeTab === 'upcoming' ? "You don't have any upcoming stays." :
                     activeTab === 'past' ? "You don't have any past stays." :
                     activeTab === 'cancelled' ? "You don't have any cancelled bookings." :
                     "You don't have any bookings yet."}
                  </p>
                  <Button asChild>
                    <a href="/rooms">Browse Rooms</a>
                  </Button>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default MyBookings;
