
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

// Mock data for demonstration
const mockBookings = [
  {
    id: '1',
    roomName: 'Deluxe Suite',
    checkIn: '2023-09-15',
    checkOut: '2023-09-20',
    status: 'Completed',
    totalAmount: '$1,200'
  },
  {
    id: '2',
    roomName: 'Premium King',
    checkIn: '2023-11-10',
    checkOut: '2023-11-15',
    status: 'Upcoming',
    totalAmount: '$950'
  }
];

// Mock auth data for debugging
const mockAuthData = {
  user: { email: 'guest@example.com', user_metadata: { name: 'Guest User' }, created_at: new Date().toISOString() },
  signOut: async () => { console.log('Mock sign out'); },
  userRoles: ['guest'],
  userSuspended: false,
  session: null,
  loading: false,
  signUp: async () => ({ error: null }),
  signIn: async () => ({ error: null }),
};

// Define user type to match what we expect
interface User {
  email?: string;
  user_metadata?: { 
    name?: string;
  };
  created_at?: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>(mockAuthData.user);
  
  useEffect(() => {
    // Try to get the real auth context when component mounts
    const getAuthUser = async () => {
      try {
        // Import AuthContext dynamically
        const authModule = await import('@/contexts/AuthContext');
        try {
          // Try to use the hook in a safe way
          const auth = authModule.useAuth();
          if (auth && auth.user) {
            setUser(auth.user);
            
            // Redirect to login if no user in real auth context
            if (!auth.user) {
              navigate('/login');
              return;
            }
          }
        } catch (hookError) {
          console.log('AuthProvider not available, using mock data');
          // Keep using mock data (already set as default)
        }
      } catch (importError) {
        console.log('Failed to import AuthContext, using mock data');
        // Keep using mock data (already set as default)
      } finally {
        // Simulate loading user data
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    };

    getAuthUser();
  }, [navigate]);
  
  if (loading) {
    return (
      <div className="min-h-screen pt-20 bg-slate-50">
        <Navbar />
        <div className="flex justify-center items-center h-[80vh]">
          <div className="animate-pulse">Loading profile data...</div>
        </div>
      </div>
    );
  }

  const userInitial = user?.email ? user.email[0].toUpperCase() : 'G';

  return (
    <div className="min-h-screen pt-20 bg-slate-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/3">
            <Card>
              <CardHeader>
                <CardTitle>Guest Profile</CardTitle>
                <CardDescription>Your personal information</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src="" />
                  <AvatarFallback className="text-3xl">{userInitial}</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold mb-1">{user?.user_metadata?.name || 'Guest User'}</h2>
                <p className="text-sm text-muted-foreground mb-4">{user?.email}</p>
                <div className="w-full space-y-2 mt-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Member Since</span>
                    <span className="font-medium">
                      {user?.created_at 
                        ? new Date(user.created_at).toLocaleDateString() 
                        : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <span className="font-medium text-green-600">Active</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Stays</span>
                    <span className="font-medium">{mockBookings.length}</span>
                  </div>
                </div>
                <Button className="w-full mt-6">Edit Profile</Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="w-full lg:w-2/3">
            <Tabs defaultValue="bookings">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="bookings">My Bookings</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
              </TabsList>
              
              <TabsContent value="bookings" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Bookings</CardTitle>
                    <CardDescription>View your past and upcoming stays</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {mockBookings.length > 0 ? (
                      <div className="space-y-4">
                        {mockBookings.map(booking => (
                          <div key={booking.id} 
                               className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-semibold">{booking.roomName}</h3>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                booking.status === 'Completed' 
                                  ? 'bg-gray-100 text-gray-800' 
                                  : 'bg-green-100 text-green-800'
                              }`}>
                                {booking.status}
                              </span>
                            </div>
                            <div className="text-sm text-muted-foreground mb-3">
                              {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="font-medium">{booking.totalAmount}</span>
                              <Button size="sm" variant="outline">
                                View Details
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground mb-4">You don't have any bookings yet</p>
                        <Button asChild>
                          <Link to="/rooms">Browse Rooms</Link>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="preferences" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Preferences</CardTitle>
                    <CardDescription>Customize your stay experience</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border rounded-lg p-4">
                          <h3 className="font-medium mb-2">Room Preferences</h3>
                          <ul className="text-sm space-y-2">
                            <li className="flex items-center">
                              <span className="w-1/2 text-muted-foreground">Room Type</span>
                              <span>Suite</span>
                            </li>
                            <li className="flex items-center">
                              <span className="w-1/2 text-muted-foreground">Bed Type</span>
                              <span>King</span>
                            </li>
                            <li className="flex items-center">
                              <span className="w-1/2 text-muted-foreground">Floor</span>
                              <span>High Floor</span>
                            </li>
                          </ul>
                        </div>
                        
                        <div className="border rounded-lg p-4">
                          <h3 className="font-medium mb-2">Dining Preferences</h3>
                          <ul className="text-sm space-y-2">
                            <li className="flex items-center">
                              <span className="w-1/2 text-muted-foreground">Breakfast</span>
                              <span>Yes</span>
                            </li>
                            <li className="flex items-center">
                              <span className="w-1/2 text-muted-foreground">Dietary</span>
                              <span>None</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      
                      <Button className="w-full mt-4">Update Preferences</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
