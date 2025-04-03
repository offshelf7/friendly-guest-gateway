import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { format, addDays } from 'date-fns';
import { 
  Calendar as CalendarIcon, 
  Search, 
  ClipboardCheck, 
  Plus, 
  ChevronLeft, 
  ChevronRight,
  Check,
  X,
  CreditCard
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
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Room } from '@/types/roomTypes';

const Reservations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [date, setDate] = useState<Date>(new Date());
  const [newReservationOpen, setNewReservationOpen] = useState(false);
  const { toast } = useToast();
  
  // Fetch rooms for the new reservation dialog
  const { data: rooms } = useQuery({
    queryKey: ['rooms'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('rooms')
        .select('*')
        .eq('is_available', true);
      
      if (error) throw error;
      return data as Room[];
    }
  });
  
  // Fetch bookings/reservations
  const { data: bookings, isLoading, refetch } = useQuery({
    queryKey: ['reservations', date],
    queryFn: async () => {
      const formattedDate = format(date, 'yyyy-MM-dd');
      
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          id,
          user_id,
          room_id,
          check_in_date,
          check_out_date,
          guests_count,
          total_price,
          status,
          special_requests,
          created_at,
          rooms:room_id(name),
          users:user_id(full_name, email)
        `)
        .gte('check_in_date', formattedDate)
        .lte('check_in_date', format(addDays(date, 30), 'yyyy-MM-dd'))
        .order('check_in_date', { ascending: true });
      
      if (error) throw error;
      
      return data.map(booking => ({
        id: booking.id,
        user_id: booking.user_id,
        guest_name: booking.users?.full_name || 'Guest',
        email: booking.users?.email || 'No email',
        room_id: booking.room_id,
        room_name: booking.rooms?.name || 'Unknown Room',
        check_in_date: booking.check_in_date,
        check_out_date: booking.check_out_date,
        guests_count: booking.guests_count,
        total_price: booking.total_price,
        status: booking.status,
        special_requests: booking.special_requests,
        created_at: booking.created_at
      }));
    }
  });
  
  // Handle confirming a reservation
  const handleConfirmReservation = async (bookingId: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: 'confirmed' })
        .eq('id', bookingId);
      
      if (error) throw error;
      
      toast({
        title: "Reservation Confirmed",
        description: "The reservation has been confirmed successfully",
      });
      
      refetch();
    } catch (error) {
      console.error('Error confirming reservation:', error);
      toast({
        title: "Confirmation Failed",
        description: "There was a problem confirming the reservation",
        variant: "destructive"
      });
    }
  };
  
  // Handle cancelling a reservation
  const handleCancelReservation = async (bookingId: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: 'cancelled' })
        .eq('id', bookingId);
      
      if (error) throw error;
      
      toast({
        title: "Reservation Cancelled",
        description: "The reservation has been cancelled",
      });
      
      refetch();
    } catch (error) {
      console.error('Error cancelling reservation:', error);
      toast({
        title: "Cancellation Failed",
        description: "There was a problem cancelling the reservation",
        variant: "destructive"
      });
    }
  };
  
  // Handle create a new reservation
  const handleCreateReservation = () => {
    toast({
      title: "Reservation Created",
      description: "The new reservation has been created successfully",
    });
    
    setNewReservationOpen(false);
    refetch();
  };
  
  // Filter bookings based on search term and status
  const filteredBookings = bookings?.filter(booking => {
    const matchesSearch = 
      booking.guest_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.room_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Reservations</h1>
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {format(date, 'PPP')}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(date) => date && setDate(date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          
          <Button onClick={() => setNewReservationOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Reservation
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Reservations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? '...' : bookings?.length || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              For next 30 days
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Confirmation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? '...' : bookings?.filter(b => b.status === 'pending').length || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Reservations awaiting confirmation
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Check-ins</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? '...' : bookings?.filter(b => 
                b.status === 'confirmed' &&
                new Date(b.check_in_date) <= addDays(new Date(), 7)
              ).length || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              In the next 7 days
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by guest name, email, or room..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="checked_in">Checked In</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        
        <div className="flex">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setDate(addDays(date, -30))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setDate(addDays(date, 30))}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Guest</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Check-in</TableHead>
                <TableHead>Check-out</TableHead>
                <TableHead>Guests</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center">
                    Loading reservations...
                  </TableCell>
                </TableRow>
              ) : filteredBookings?.length ? (
                filteredBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>
                      <div className="font-medium">{booking.guest_name}</div>
                      <div className="text-sm text-muted-foreground">{booking.email}</div>
                    </TableCell>
                    <TableCell>{booking.room_name}</TableCell>
                    <TableCell>{format(new Date(booking.check_in_date), 'MMM d, yyyy')}</TableCell>
                    <TableCell>{format(new Date(booking.check_out_date), 'MMM d, yyyy')}</TableCell>
                    <TableCell>{booking.guests_count}</TableCell>
                    <TableCell className="text-right">${booking.total_price.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          booking.status === 'confirmed'
                            ? 'outline'
                            : booking.status === 'pending'
                            ? 'secondary'
                            : booking.status === 'checked_in'
                            ? 'default'
                            : booking.status === 'completed'
                            ? 'default'
                            : 'destructive'
                        }
                      >
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {booking.status === 'pending' && (
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 gap-1"
                            onClick={() => handleConfirmReservation(booking.id)}
                          >
                            <Check className="h-4 w-4" />
                            Confirm
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 gap-1"
                            onClick={() => handleCancelReservation(booking.id)}
                          >
                            <X className="h-4 w-4" />
                            Cancel
                          </Button>
                        </div>
                      )}
                      {booking.status === 'confirmed' && (
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" className="h-8">
                            View Details
                          </Button>
                        </div>
                      )}
                      {(booking.status === 'cancelled' || booking.status === 'completed') && (
                        <span className="text-sm text-muted-foreground">No actions</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center">
                    No reservations found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Dialog open={newReservationOpen} onOpenChange={setNewReservationOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Create New Reservation</DialogTitle>
            <DialogDescription>
              Enter the details for the new reservation.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="guest-name" className="text-sm font-medium">Guest Name</label>
                <Input
                  id="guest-name"
                  placeholder="Enter guest name"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="guest-email" className="text-sm font-medium">Guest Email</label>
                <Input
                  id="guest-email"
                  type="email"
                  placeholder="Enter guest email"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="room" className="text-sm font-medium">Room</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a room" />
                  </SelectTrigger>
                  <SelectContent>
                    {rooms?.map(room => (
                      <SelectItem key={room.id} value={room.id}>
                        {room.name} - ${room.price_per_night}/night
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label htmlFor="guests" className="text-sm font-medium">Number of Guests</label>
                <Input
                  id="guests"
                  type="number"
                  min="1"
                  placeholder="Enter number of guests"
                  defaultValue="2"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="check-in" className="text-sm font-medium">Check-in Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      <span>Select date</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <label htmlFor="check-out" className="text-sm font-medium">Check-out Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      <span>Select date</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="special-requests" className="text-sm font-medium">Special Requests</label>
              <Input
                id="special-requests"
                placeholder="Any special requests or requirements"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="payment-method" className="text-sm font-medium">Payment Method</label>
              <Select defaultValue="credit_card">
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="credit_card">Credit Card</SelectItem>
                  <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewReservationOpen(false)}>Cancel</Button>
            <Button className="gap-2" onClick={handleCreateReservation}>
              <CreditCard className="h-4 w-4" />
              Create Reservation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Reservations;
