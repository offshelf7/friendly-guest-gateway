
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { Booking, Room } from '@/types/roomTypes';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search } from 'lucide-react';

// Define FrontDeskRoom interface to include all expected properties
interface FrontDeskRoom extends Room {
  status: 'available' | 'occupied' | 'cleaning' | 'maintenance';
  room_number: string;
  is_clean: boolean;
  last_cleaned: string;
}

const FrontDesk = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [rooms, setRooms] = useState<FrontDeskRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([fetchBookings(), fetchRooms()]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          room:room_id (*),
          profile:user_id (*)
        `)
        .or('status.eq.confirmed,status.eq.checked_in')
        .order('check_in_date', { ascending: true });

      if (error) throw error;

      const mappedBookings = data?.map(booking => {
        const roomData = booking.room as Record<string, any> || {};
        return {
          ...booking,
          guest_id: booking.user_id,
          profile: booking.profile || {},
          room: {
            name: roomData.name || 'Unknown Room',
            room_number: roomData.room_number || (roomData.id ? roomData.id.toString() : 'N/A'),
            room_type: roomData.room_type || 'Standard'
          }
        };
      }) as Booking[];

      setBookings(mappedBookings || []);
    } catch (error: any) {
      console.error('Error fetching bookings:', error);
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
        .order('name', { ascending: true });

      if (error) throw error;

      const mappedRooms = data?.map(room => {
        // Explicitly cast to ensure TypeScript understands the shape
        const roomData = room as Record<string, any>;
        return {
          ...room,
          status: (roomData.status as 'available' | 'occupied' | 'cleaning' | 'maintenance') || 'available',
          room_number: roomData.room_number || roomData.id.toString(),
          is_clean: roomData.is_clean !== undefined ? roomData.is_clean : true,
          last_cleaned: roomData.last_cleaned || new Date().toISOString()
        };
      }) as FrontDeskRoom[];

      setRooms(mappedRooms || []);
    } catch (error: any) {
      console.error('Error fetching rooms:', error);
      toast({
        title: 'Error fetching rooms',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  // Filter rooms based on search query and status filter
  const filteredRooms = rooms.filter(room => {
    const matchesSearch = 
      room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.room_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.room_type.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;
    
    if (filter === 'all') return true;
    if (filter === 'available') return room.status === 'available';
    if (filter === 'occupied') return room.status === 'occupied';
    if (filter === 'cleaning') return room.status === 'cleaning';
    if (filter === 'maintenance') return room.status === 'maintenance';
    
    return true;
  });

  // Get today's check-ins and check-outs
  const today = new Date().toISOString().split('T')[0];
  const checkInsToday = bookings.filter(booking => booking.check_in_date.startsWith(today));
  const checkOutsToday = bookings.filter(booking => booking.check_out_date.startsWith(today));

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Front Desk</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Rooms Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                <span className="text-3xl font-bold">{rooms.length}</span>
                <span className="text-sm text-muted-foreground">Total Rooms</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-green-100 rounded-lg">
                <span className="text-3xl font-bold">
                  {rooms.filter(room => room.status === 'available').length}
                </span>
                <span className="text-sm text-muted-foreground">Available</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-blue-100 rounded-lg">
                <span className="text-3xl font-bold">
                  {rooms.filter(room => room.status === 'occupied').length}
                </span>
                <span className="text-sm text-muted-foreground">Occupied</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-yellow-100 rounded-lg">
                <span className="text-3xl font-bold">
                  {rooms.filter(room => !room.is_clean).length}
                </span>
                <span className="text-sm text-muted-foreground">Needs Cleaning</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Today's Check-ins</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center p-4 bg-blue-100 rounded-lg">
              <span className="text-3xl font-bold">{checkInsToday.length}</span>
              <span className="text-sm text-muted-foreground">Arrivals Today</span>
            </div>
            {checkInsToday.length > 0 ? (
              <div className="mt-4 space-y-2">
                {checkInsToday.slice(0, 3).map(booking => (
                  <div key={booking.id} className="text-sm flex justify-between">
                    <span>{booking.profile?.full_name || 'Guest'}</span>
                    <span>Room {booking.room.room_number}</span>
                  </div>
                ))}
                {checkInsToday.length > 3 && (
                  <div className="text-sm text-muted-foreground text-center">
                    +{checkInsToday.length - 3} more
                  </div>
                )}
              </div>
            ) : (
              <div className="mt-4 text-sm text-muted-foreground text-center">
                No check-ins today
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Today's Check-outs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center p-4 bg-orange-100 rounded-lg">
              <span className="text-3xl font-bold">{checkOutsToday.length}</span>
              <span className="text-sm text-muted-foreground">Departures Today</span>
            </div>
            {checkOutsToday.length > 0 ? (
              <div className="mt-4 space-y-2">
                {checkOutsToday.slice(0, 3).map(booking => (
                  <div key={booking.id} className="text-sm flex justify-between">
                    <span>{booking.profile?.full_name || 'Guest'}</span>
                    <span>Room {booking.room.room_number}</span>
                  </div>
                ))}
                {checkOutsToday.length > 3 && (
                  <div className="text-sm text-muted-foreground text-center">
                    +{checkOutsToday.length - 3} more
                  </div>
                )}
              </div>
            ) : (
              <div className="mt-4 text-sm text-muted-foreground text-center">
                No check-outs today
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Room Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by room number, name, or type..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button 
                variant={filter === 'all' ? 'default' : 'outline'}
                onClick={() => setFilter('all')}
              >
                All
              </Button>
              <Button 
                variant={filter === 'available' ? 'default' : 'outline'}
                onClick={() => setFilter('available')}
              >
                Available
              </Button>
              <Button 
                variant={filter === 'occupied' ? 'default' : 'outline'}
                onClick={() => setFilter('occupied')}
              >
                Occupied
              </Button>
            </div>
          </div>

          <Tabs defaultValue="grid" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>

            <TabsContent value="grid">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredRooms.map(room => (
                  <Card key={room.id} className={`
                    ${room.status === 'available' ? 'border-green-500' : ''}
                    ${room.status === 'occupied' ? 'border-blue-500' : ''}
                    ${room.status === 'cleaning' ? 'border-yellow-500' : ''}
                    ${room.status === 'maintenance' ? 'border-red-500' : ''}
                    border-l-4
                  `}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold">{room.name}</h3>
                          <p className="text-sm text-muted-foreground">Room {room.room_number}</p>
                          <p className="text-sm text-muted-foreground">{room.room_type}</p>
                        </div>
                        <RoomStatusBadge status={room.status} />
                      </div>
                      <div className="mt-2 flex items-center text-xs">
                        <span className={`mr-2 h-2 w-2 rounded-full ${room.is_clean ? 'bg-green-500' : 'bg-red-500'}`}></span>
                        {room.is_clean ? 'Clean' : 'Needs cleaning'}
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Button size="sm" variant="outline" className="w-full">View</Button>
                        <Button size="sm" className="w-full">
                          {room.status === 'occupied' ? 'Check Out' : 'Check In'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="list">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Room</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Cleanliness</TableHead>
                      <TableHead>Last Cleaned</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRooms.map(room => (
                      <TableRow key={room.id}>
                        <TableCell>
                          <div className="font-medium">{room.name}</div>
                          <div className="text-xs text-muted-foreground">Room {room.room_number}</div>
                        </TableCell>
                        <TableCell>{room.room_type}</TableCell>
                        <TableCell>
                          <RoomStatusBadge status={room.status} />
                        </TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center ${room.is_clean ? 'text-green-600' : 'text-red-600'}`}>
                            <span className={`mr-2 h-2 w-2 rounded-full ${room.is_clean ? 'bg-green-500' : 'bg-red-500'}`}></span>
                            {room.is_clean ? 'Clean' : 'Needs cleaning'}
                          </span>
                        </TableCell>
                        <TableCell>
                          {format(new Date(room.last_cleaned), 'MMM d, yyyy')}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">View</Button>
                            <Button size="sm">
                              {room.status === 'occupied' ? 'Check Out' : 'Check In'}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

const RoomStatusBadge = ({ status }: { status: 'available' | 'occupied' | 'cleaning' | 'maintenance' }) => {
  switch (status) {
    case 'available':
      return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Available</Badge>;
    case 'occupied':
      return <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">Occupied</Badge>;
    case 'cleaning':
      return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Cleaning</Badge>;
    case 'maintenance':
      return <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">Maintenance</Badge>;
  }
};

export default FrontDesk;
