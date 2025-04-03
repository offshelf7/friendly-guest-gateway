import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/MockAuthContext';
import { MockUser, Room as AdminRoom } from '@/types/adminTypes';
import { Room } from '@/types/roomTypes';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, CheckCircle, Clock, Coffee, CreditCard, Search, UserCheck, Wifi, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

interface Booking {
  id: string;
  room_id: string;
  guest_id: string;
  check_in_date: string;
  check_out_date: string;
  status: string;
  total_price: number;
  special_requests?: string;
  created_at: string;
  room: {
    name: string;
    room_number: string;
    room_type: string;
  };
  profile?: {
    full_name?: string;
    email?: string;
    phone?: string;
  };
}

interface Room {
  id: string;
  name: string;
  room_number: string;
  room_type: string;
  status: string;
  price_per_night: number;
  is_clean: boolean;
  last_cleaned: string;
  maintenance_notes?: string;
  capacity?: number;
  description?: string;
  is_available?: boolean;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
  has_wifi?: boolean;
  has_breakfast?: boolean;
}

const FrontDesk = () => {
  const [todayBookings, setTodayBookings] = useState<Booking[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const mockAuthData = {
    user: { id: 'mock-staff-id', email: 'staff@example.com' } as MockUser,
    signOut: async () => { console.log('Mock sign out'); },
    userRoles: ['staff'],
    userSuspended: false,
    session: null,
    loading: false,
    signUp: async () => ({ error: null }),
    signIn: async () => ({ error: null }),
  };
  
  const [currentUser, setCurrentUser] = useState<MockUser>(mockAuthData.user);
  
  useEffect(() => {
    const fetchAuthUser = async () => {
      try {
        const { useAuth } = await import('@/contexts/AuthContext');
        try {
          const auth = useAuth();
          if (auth.user) {
            setCurrentUser(auth.user as MockUser);
          }
        } catch (e) {
          console.log('AuthProvider not available, using mock data');
        }
      } catch (e) {
        console.log('Failed to import AuthContext, using mock data');
      }
    };
    
    fetchAuthUser();
  }, []);

  useEffect(() => {
    const fetchTodayBookings = async () => {
      try {
        const today = new Date().toISOString().split('T')[0];
        
        const { data, error } = await supabase
          .from('bookings')
          .select(`
            *,
            room:room_id (*),
            profile:user_id (*)
          `)
          .eq('status', 'confirmed')
          .or(`check_in_date.eq.${today},check_out_date.eq.${today}`);

        if (error) throw error;

        const mappedBookings = data?.map(booking => {
          const room = booking.room || {};
          return {
            ...booking,
            guest_id: booking.user_id,
            profile: booking.profile || {},
            room: {
              ...room,
              name: room.name || 'Unknown Room',
              room_number: room.room_number || room.id?.toString() || 'N/A',
              room_type: room.room_type || 'Standard'
            }
          };
        }) as Booking[];

        setTodayBookings(mappedBookings || []);
      } catch (error: any) {
        console.error('Error fetching today bookings:', error);
        toast({
          title: 'Error fetching bookings',
          description: error.message,
          variant: 'destructive',
        });
      }
    };

    const fetchRooms = async () => {
      try {
        const { data, error } = await supabase
          .from('rooms')
          .select('*')
          .order('room_number');

        if (error) throw error;

        const mappedRooms = data?.map(room => ({
          ...room,
          status: room.status || 'available',
          room_number: room.room_number || room.id.toString(),
          is_clean: room.is_clean !== undefined ? room.is_clean : true,
          last_cleaned: room.last_cleaned || new Date().toISOString()
        })) as Room[];

        setRooms(mappedRooms || []);
      } catch (error: any) {
        console.error('Error fetching rooms:', error);
        toast({
          title: 'Error fetching rooms',
          description: error.message,
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTodayBookings();
    fetchRooms();
  }, [toast]);

  const handleCheckIn = async (bookingId: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: 'checked_in' })
        .eq('id', bookingId);

      if (error) throw error;

      setTodayBookings(
        todayBookings.map((booking) =>
          booking.id === bookingId
            ? { ...booking, status: 'checked_in' }
            : booking
        )
      );

      toast({
        title: 'Check-in successful',
        description: 'Guest has been checked in.',
      });
    } catch (error: any) {
      console.error('Error checking in:', error);
      toast({
        title: 'Error checking in',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleCheckOut = async (bookingId: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: 'completed' })
        .eq('id', bookingId);

      if (error) throw error;

      setTodayBookings(
        todayBookings.map((booking) =>
          booking.id === bookingId
            ? { ...booking, status: 'completed' }
            : booking
        )
      );

      toast({
        title: 'Check-out successful',
        description: 'Guest has been checked out.',
      });
    } catch (error: any) {
      console.error('Error checking out:', error);
      toast({
        title: 'Error checking out',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const updateRoomStatus = async (roomId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('rooms')
        .update({ 
          status: status,
          updated_at: new Date().toISOString()
        } as Partial<Room>)
        .eq('id', roomId);

      if (error) throw error;

      setRooms(
        rooms.map((room) =>
          room.id === roomId ? { ...room, status } : room
        )
      );

      toast({
        title: 'Room status updated',
        description: `Room status has been updated to ${status}.`,
      });
    } catch (error: any) {
      console.error('Error updating room status:', error);
      toast({
        title: 'Error updating room',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const markRoomCleaned = async (roomId: string) => {
    try {
      const { error } = await supabase
        .from('rooms')
        .update({ 
          is_clean: true,
          last_cleaned: new Date().toISOString(),
          status: 'available',
          updated_at: new Date().toISOString()
        } as Partial<Room>)
        .eq('id', roomId);

      if (error) throw error;

      setRooms(
        rooms.map((room) =>
          room.id === roomId
            ? { 
                ...room, 
                is_clean: true,
                last_cleaned: new Date().toISOString(),
                status: 'available'
              }
            : room
        )
      );

      toast({
        title: 'Room marked as clean',
        description: 'Room has been marked as clean and is now available.',
      });
    } catch (error: any) {
      console.error('Error marking room as clean:', error);
      toast({
        title: 'Error updating room',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const maintenanceSchema = z.object({
    notes: z
      .string()
      .min(1, { message: 'Please enter maintenance notes' })
      .max(500, { message: 'Notes must be less than 500 characters' }),
  });

  const maintenanceForm = useForm<z.infer<typeof maintenanceSchema>>({
    resolver: zodResolver(maintenanceSchema),
    defaultValues: {
      notes: '',
    },
  });

  const submitMaintenanceRequest = async (data: any) => {
    if (!selectedRoom) return;

    try {
      const { error } = await supabase
        .from('rooms')
        .update({ 
          status: 'maintenance',
          maintenance_notes: data.notes,
          updated_at: new Date().toISOString()
        } as Partial<Room>)
        .eq('id', selectedRoom.id);

      if (error) throw error;

      setRooms(
        rooms.map((room) =>
          room.id === selectedRoom.id
            ? { 
                ...room, 
                status: 'maintenance',
                maintenance_notes: data.notes
              }
            : room
        )
      );

      toast({
        title: 'Maintenance request submitted',
        description: 'Room has been marked for maintenance.',
      });

      maintenanceForm.reset();
    } catch (error: any) {
      console.error('Error submitting maintenance request:', error);
      toast({
        title: 'Error updating room',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const filteredRooms = rooms.filter((room) => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      room.room_number.toLowerCase().includes(query) ||
      room.name.toLowerCase().includes(query) ||
      room.room_type.toLowerCase().includes(query) ||
      room.status.toLowerCase().includes(query)
    );
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Available</Badge>;
      case 'occupied':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Occupied</Badge>;
      case 'cleaning':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Cleaning</Badge>;
      case 'maintenance':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Maintenance</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Front Desk</h1>

      <Tabs defaultValue="today" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="today">Today's Check-ins/outs</TabsTrigger>
          <TabsTrigger value="rooms">Room Status</TabsTrigger>
        </TabsList>

        <TabsContent value="today">
          <Card>
            <CardHeader>
              <CardTitle>Today's Arrivals & Departures</CardTitle>
              <CardDescription>
                Manage check-ins and check-outs for {format(new Date(), 'MMMM d, yyyy')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {todayBookings.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No check-ins or check-outs scheduled for today</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Guest</TableHead>
                      <TableHead>Room</TableHead>
                      <TableHead>Check-in</TableHead>
                      <TableHead>Check-out</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {todayBookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell>
                          {booking.profile && booking.profile.full_name ? 
                            booking.profile.full_name : 
                            "Guest"}
                        </TableCell>
                        <TableCell>
                          {booking.room.name} ({booking.room.room_number})
                        </TableCell>
                        <TableCell>
                          {format(new Date(booking.check_in_date), 'MMM d, yyyy')}
                        </TableCell>
                        <TableCell>
                          {format(new Date(booking.check_out_date), 'MMM d, yyyy')}
                        </TableCell>
                        <TableCell>
                          {booking.status === 'confirmed' && (
                            <Badge variant="outline">Confirmed</Badge>
                          )}
                          {booking.status === 'checked_in' && (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Checked In</Badge>
                          )}
                          {booking.status === 'completed' && (
                            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Completed</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          {booking.status === 'confirmed' && (
                            <Button
                              size="sm"
                              onClick={() => handleCheckIn(booking.id)}
                            >
                              <UserCheck className="mr-2 h-4 w-4" />
                              Check In
                            </Button>
                          )}
                          {booking.status === 'checked_in' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleCheckOut(booking.id)}
                            >
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Check Out
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => navigate('/admin/bookings')}>
                View All Bookings
              </Button>
              <Button onClick={() => navigate('/admin/bookings/new')}>
                New Booking
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="rooms">
          <Card>
            <CardHeader>
              <CardTitle>Room Status</CardTitle>
              <CardDescription>
                Manage room availability, cleaning, and maintenance
              </CardDescription>
              <div className="relative mt-2">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search rooms..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredRooms.map((room) => (
                  <Card key={room.id} className="overflow-hidden">
                    <div className={cn(
                      "h-2 w-full",
                      room.status === 'available' && "bg-green-500",
                      room.status === 'occupied' && "bg-blue-500",
                      room.status === 'cleaning' && "bg-yellow-500",
                      room.status === 'maintenance' && "bg-red-500",
                    )} />
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{room.name}</CardTitle>
                          <CardDescription>Room {room.room_number} • {room.room_type}</CardDescription>
                        </div>
                        {getStatusBadge(room.status)}
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex flex-col space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Price:</span>
                          <span className="font-medium">${room.price_per_night}/night</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Clean:</span>
                          <span className={cn(
                            "font-medium",
                            room.is_clean ? "text-green-600" : "text-red-600"
                          )}>
                            {room.is_clean ? 'Yes' : 'No'}
                          </span>
                        </div>
                        {room.last_cleaned && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Last cleaned:</span>
                            <span className="font-medium">
                              {format(new Date(room.last_cleaned), 'MMM d, h:mm a')}
                            </span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-2">
                      {room.status === 'cleaning' && (
                        <Button 
                          className="w-full" 
                          size="sm"
                          onClick={() => markRoomCleaned(room.id)}
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Mark as Clean
                        </Button>
                      )}
                      
                      {room.status === 'available' && (
                        <div className="flex w-full gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="flex-1"
                            onClick={() => updateRoomStatus(room.id, 'cleaning')}
                          >
                            <Clock className="mr-2 h-4 w-4" />
                            Needs Cleaning
                          </Button>
                          
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="flex-1"
                                onClick={() => setSelectedRoom(room)}
                              >
                                <XCircle className="mr-2 h-4 w-4" />
                                Maintenance
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Maintenance Request</DialogTitle>
                                <DialogDescription>
                                  Submit a maintenance request for Room {room.room_number}
                                </DialogDescription>
                              </DialogHeader>
                              
                              <Form {...maintenanceForm}>
                                <form onSubmit={maintenanceForm.handleSubmit(submitMaintenanceRequest)} className="space-y-4 mt-4">
                                  <FormField
                                    control={maintenanceForm.control}
                                    name="notes"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Maintenance Notes</FormLabel>
                                        <FormControl>
                                          <Textarea 
                                            placeholder="Describe the maintenance issue..." 
                                            className="min-h-[100px]"
                                            {...field} 
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  
                                  <DialogFooter>
                                    <Button type="submit">Submit Request</Button>
                                  </DialogFooter>
                                </form>
                              </Form>
                            </DialogContent>
                          </Dialog>
                        </div>
                      )}
                      
                      {room.status === 'maintenance' && (
                        <Button 
                          className="w-full" 
                          size="sm"
                          variant="outline"
                          onClick={() => updateRoomStatus(room.id, 'cleaning')}
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Maintenance Complete
                        </Button>
                      )}
                      
                      {room.status === 'occupied' && (
                        <Button 
                          className="w-full" 
                          size="sm"
                          variant="outline"
                          disabled
                        >
                          <CreditCard className="mr-2 h-4 w-4" />
                          Currently Occupied
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FrontDesk;
