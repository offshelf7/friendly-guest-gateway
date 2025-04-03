
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { 
  CheckSquare, 
  XSquare, 
  Bell, 
  Search,
  UserPlus,
  Briefcase,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

type GuestCheckIn = {
  id: string;
  user_id: string;
  name: string;
  room_id: string;
  room_name: string;
  check_in_date: string;
  check_out_date: string;
  status: string;
};

const FrontDesk = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  const [checkInDialogOpen, setCheckInDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<GuestCheckIn | null>(null);
  
  // Query for fetching today's check-ins
  const { data: todayCheckIns, refetch: refetchCheckIns } = useQuery({
    queryKey: ['todayCheckIns'],
    queryFn: async () => {
      const today = format(new Date(), 'yyyy-MM-dd');
      
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          id,
          user_id,
          room_id,
          check_in_date,
          check_out_date,
          status,
          rooms:room_id(name),
          users:user_id(full_name)
        `)
        .eq('check_in_date', today)
        .order('check_in_date', { ascending: true });
      
      if (error) throw error;
      
      return data.map(booking => ({
        id: booking.id,
        user_id: booking.user_id,
        name: booking.users?.full_name || 'Guest',
        room_id: booking.room_id,
        room_name: booking.rooms?.name || 'Unknown Room',
        check_in_date: booking.check_in_date,
        check_out_date: booking.check_out_date,
        status: booking.status
      }));
    }
  });
  
  // Query for fetching today's check-outs
  const { data: todayCheckOuts, refetch: refetchCheckOuts } = useQuery({
    queryKey: ['todayCheckOuts'],
    queryFn: async () => {
      const today = format(new Date(), 'yyyy-MM-dd');
      
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          id,
          user_id,
          room_id,
          check_in_date,
          check_out_date,
          status,
          rooms:room_id(name),
          users:user_id(full_name)
        `)
        .eq('check_out_date', today)
        .order('check_out_date', { ascending: true });
      
      if (error) throw error;
      
      return data.map(booking => ({
        id: booking.id,
        user_id: booking.user_id,
        name: booking.users?.full_name || 'Guest',
        room_id: booking.room_id,
        room_name: booking.rooms?.name || 'Unknown Room',
        check_in_date: booking.check_in_date,
        check_out_date: booking.check_out_date,
        status: booking.status
      }));
    }
  });
  
  // Handle check-in
  const handleCheckIn = async () => {
    if (!selectedBooking) return;
    
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: 'checked_in' })
        .eq('id', selectedBooking.id);
      
      if (error) throw error;
      
      toast({
        title: "Check-in successful",
        description: `${selectedBooking.name} has been checked in to ${selectedBooking.room_name}`,
      });
      
      setCheckInDialogOpen(false);
      refetchCheckIns();
    } catch (error) {
      console.error('Error during check-in:', error);
      toast({
        title: "Check-in failed",
        description: "There was a problem processing the check-in",
        variant: "destructive"
      });
    }
  };
  
  // Handle check-out
  const handleCheckOut = async (booking: GuestCheckIn) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: 'completed' })
        .eq('id', booking.id);
      
      if (error) throw error;
      
      toast({
        title: "Check-out successful",
        description: `${booking.name} has checked out from ${booking.room_name}`,
      });
      
      refetchCheckOuts();
    } catch (error) {
      console.error('Error during check-out:', error);
      toast({
        title: "Check-out failed",
        description: "There was a problem processing the check-out",
        variant: "destructive"
      });
    }
  };
  
  // Filter function for search
  const filteredCheckIns = todayCheckIns?.filter(booking => 
    booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.room_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredCheckOuts = todayCheckOuts?.filter(booking => 
    booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.room_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Front Desk</h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search guests or rooms..."
              className="w-[250px] pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button>
            <Calendar className="mr-2 h-4 w-4" />
            Schedule
          </Button>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            New Guest
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Check-ins Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {todayCheckIns?.length || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              {format(new Date(), 'EEEE, MMMM d, yyyy')}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Check-outs Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {todayCheckOuts?.length || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              {format(new Date(), 'EEEE, MMMM d, yyyy')}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Available Rooms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              Calculate based on bookings
            </div>
            <p className="text-xs text-muted-foreground">
              Ready for assignment
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="check-ins">
        <TabsList>
          <TabsTrigger value="check-ins" className="flex items-center">
            <CheckSquare className="mr-2 h-4 w-4" />
            Check-ins
          </TabsTrigger>
          <TabsTrigger value="check-outs" className="flex items-center">
            <XSquare className="mr-2 h-4 w-4" />
            Check-outs
          </TabsTrigger>
          <TabsTrigger value="current-guests" className="flex items-center">
            <Briefcase className="mr-2 h-4 w-4" />
            Current Guests
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="check-ins" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Guest Name</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead>Check-in Date</TableHead>
                    <TableHead>Check-out Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCheckIns?.length ? (
                    filteredCheckIns.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">{booking.name}</TableCell>
                        <TableCell>{booking.room_name}</TableCell>
                        <TableCell>{format(new Date(booking.check_in_date), 'MMM d, yyyy')}</TableCell>
                        <TableCell>{format(new Date(booking.check_out_date), 'MMM d, yyyy')}</TableCell>
                        <TableCell>
                          <Badge variant={booking.status === 'confirmed' ? 'outline' : booking.status === 'checked_in' ? 'success' : 'default'}>
                            {booking.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="outline" 
                            size="sm"
                            disabled={booking.status === 'checked_in'}
                            onClick={() => {
                              setSelectedBooking(booking);
                              setCheckInDialogOpen(true);
                            }}
                          >
                            Check In
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center">
                        No check-ins for today
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="check-outs" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Guest Name</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead>Check-in Date</TableHead>
                    <TableHead>Check-out Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCheckOuts?.length ? (
                    filteredCheckOuts.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">{booking.name}</TableCell>
                        <TableCell>{booking.room_name}</TableCell>
                        <TableCell>{format(new Date(booking.check_in_date), 'MMM d, yyyy')}</TableCell>
                        <TableCell>{format(new Date(booking.check_out_date), 'MMM d, yyyy')}</TableCell>
                        <TableCell>
                          <Badge variant={booking.status === 'checked_in' ? 'success' : booking.status === 'completed' ? 'default' : 'outline'}>
                            {booking.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="outline" 
                            size="sm"
                            disabled={booking.status === 'completed'}
                            onClick={() => handleCheckOut(booking)}
                          >
                            Check Out
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center">
                        No check-outs for today
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="current-guests" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                Current guests will be displayed here
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Check-in Dialog */}
      <Dialog open={checkInDialogOpen} onOpenChange={setCheckInDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Guest Check-in</DialogTitle>
            <DialogDescription>
              Complete the check-in process for this guest.
            </DialogDescription>
          </DialogHeader>
          
          {selectedBooking && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="font-semibold text-right">Guest:</div>
                <div className="col-span-3">{selectedBooking.name}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="font-semibold text-right">Room:</div>
                <div className="col-span-3">{selectedBooking.room_name}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="font-semibold text-right">Check-in Date:</div>
                <div className="col-span-3">
                  {format(new Date(selectedBooking.check_in_date), 'MMM d, yyyy')}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="font-semibold text-right">Check-out Date:</div>
                <div className="col-span-3">
                  {format(new Date(selectedBooking.check_out_date), 'MMM d, yyyy')}
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setCheckInDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleCheckIn}>Complete Check-in</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FrontDesk;
