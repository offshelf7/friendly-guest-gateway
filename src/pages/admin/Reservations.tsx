import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { CalendarIcon, Search, Filter, X } from 'lucide-react';
import { cn } from '@/lib/utils';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Booking {
  id: string;
  room_id: string;
  guest_id: string;
  check_in_date: string;
  check_out_date: string;
  total_price: number;
  status: string;
  created_at: string;
  room: {
    name: string;
    room_type: string;
    price_per_night: number;
  };
  profile: {
    full_name?: string;
    email?: string;
    phone?: string;
  };
  payment_status: string;
  special_requests?: string;
  num_guests: number;
}

const Reservations = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [bookings, searchTerm, statusFilter, dateRange]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          room:room_id (name, room_type, price_per_night),
          profile:guest_id (full_name, email, phone)
        `)
        .order('check_in_date', { ascending: true });

      if (error) throw error;

      setBookings(data || []);
      setFilteredBookings(data || []);
    } catch (error: any) {
      console.error('Error fetching bookings:', error);
      toast({
        title: 'Error fetching bookings',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...bookings];

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (booking) =>
          (booking.profile && booking.profile.full_name?.toLowerCase().includes(term)) ||
          (booking.profile && booking.profile.email?.toLowerCase().includes(term)) ||
          booking.room.name.toLowerCase().includes(term) ||
          booking.id.toLowerCase().includes(term)
      );
    }

    // Apply status filter
    if (statusFilter.length > 0) {
      filtered = filtered.filter((booking) =>
        statusFilter.includes(booking.status)
      );
    }

    // Apply date range filter
    if (dateRange.from) {
      filtered = filtered.filter(
        (booking) =>
          new Date(booking.check_in_date) >= new Date(dateRange.from!)
      );
    }

    if (dateRange.to) {
      filtered = filtered.filter(
        (booking) =>
          new Date(booking.check_in_date) <= new Date(dateRange.to!)
      );
    }

    setFilteredBookings(filtered);
  };

  const updateBookingStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      setBookings(
        bookings.map((booking) =>
          booking.id === id ? { ...booking, status } : booking
        )
      );

      toast({
        title: 'Status updated',
        description: `Booking status changed to ${status}`,
      });
    } catch (error: any) {
      console.error('Error updating booking status:', error);
      toast({
        title: 'Error updating status',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const toggleStatusFilter = (status: string) => {
    setStatusFilter((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter([]);
    setDateRange({ from: undefined, to: undefined });
    setShowFilters(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge variant="outline">Confirmed</Badge>;
      case 'checked_in':
        return <Badge variant="default">Checked In</Badge>;
      case 'checked_out':
        return <Badge variant="secondary">Checked Out</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      case 'no_show':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-200">No Show</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Reservations</h1>
          <p className="text-muted-foreground">
            Manage all guest bookings and reservations
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
            {statusFilter.length > 0 || dateRange.from ? (
              <Badge variant="secondary" className="ml-2">
                {statusFilter.length + (dateRange.from ? 1 : 0)}
              </Badge>
            ) : null}
          </Button>
          <Button size="sm" onClick={fetchBookings}>
            Refresh
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-md shadow mb-6">
        <div className="p-4 border-b">
          <div className="flex gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by guest, email, or room..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {showFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={resetFilters}
                className="h-10"
              >
                <X className="h-4 w-4 mr-2" />
                Clear
              </Button>
            )}
          </div>

          {showFilters && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-sm font-medium mb-1 block">
                  Status Filter
                </Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {['confirmed', 'checked_in', 'checked_out', 'cancelled', 'no_show'].map(
                    (status) => (
                      <div
                        key={status}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={`status-${status}`}
                          checked={statusFilter.includes(status)}
                          onCheckedChange={() => toggleStatusFilter(status)}
                        />
                        <label
                          htmlFor={`status-${status}`}
                          className="text-sm font-medium capitalize cursor-pointer"
                        >
                          {status.replace('_', ' ')}
                        </label>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="col-span-2">
                <Label className="text-sm font-medium mb-1 block">
                  Check-in Date Range
                </Label>
                <div className="flex gap-2 mt-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "justify-start text-left font-normal w-full",
                          !dateRange.from && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange.from ? (
                          dateRange.to ? (
                            <>
                              {format(dateRange.from, "LLL dd, y")} -{" "}
                              {format(dateRange.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(dateRange.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Select date range</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={dateRange.from}
                        selected={{
                          from: dateRange.from,
                          to: dateRange.to,
                        }}
                        onSelect={setDateRange}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>

                  {(dateRange.from || dateRange.to) && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setDateRange({ from: undefined, to: undefined })
                      }
                      className="h-10"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableCaption>
              {loading
                ? 'Loading reservations...'
                : `Showing ${filteredBookings.length} of ${bookings.length} reservations`}
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Booking ID</TableHead>
                <TableHead>Guest</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Check In</TableHead>
                <TableHead>Check Out</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8">
                    Loading reservations...
                  </TableCell>
                </TableRow>
              ) : filteredBookings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8">
                    No reservations found
                  </TableCell>
                </TableRow>
              ) : (
                filteredBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">
                      {booking.id.substring(0, 8)}...
                    </TableCell>
                    <TableCell>
                      {booking.profile && booking.profile.full_name ? 
                        booking.profile.full_name : 
                        "Guest"}
                    </TableCell>
                    <TableCell>
                      {booking.profile && booking.profile.email ? 
                        booking.profile.email : 
                        "N/A"}
                    </TableCell>
                    <TableCell>
                      {booking.room.name}
                      <span className="block text-xs text-muted-foreground">
                        {booking.room.room_type}
                      </span>
                    </TableCell>
                    <TableCell>
                      {format(new Date(booking.check_in_date), 'MMM dd, yyyy')}
                    </TableCell>
                    <TableCell>
                      {format(new Date(booking.check_out_date), 'MMM dd, yyyy')}
                    </TableCell>
                    <TableCell>{getStatusBadge(booking.status)}</TableCell>
                    <TableCell>
                      ${booking.total_price.toFixed(2)}
                      <span className="block text-xs text-muted-foreground">
                        {booking.payment_status || 'Unpaid'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedBooking(booking)}
                          >
                            Manage
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Manage Reservation</DialogTitle>
                            <DialogDescription>
                              Update the status of this reservation
                            </DialogDescription>
                          </DialogHeader>

                          {selectedBooking && (
                            <div className="space-y-4 py-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label>Guest</Label>
                                  <div className="font-medium mt-1">
                                    {selectedBooking.profile?.full_name || 'N/A'}
                                  </div>
                                </div>
                                <div>
                                  <Label>Room</Label>
                                  <div className="font-medium mt-1">
                                    {selectedBooking.room.name}
                                  </div>
                                </div>
                                <div>
                                  <Label>Check In</Label>
                                  <div className="font-medium mt-1">
                                    {format(
                                      new Date(selectedBooking.check_in_date),
                                      'MMM dd, yyyy'
                                    )}
                                  </div>
                                </div>
                                <div>
                                  <Label>Check Out</Label>
                                  <div className="font-medium mt-1">
                                    {format(
                                      new Date(selectedBooking.check_out_date),
                                      'MMM dd, yyyy'
                                    )}
                                  </div>
                                </div>
                                <div>
                                  <Label>Total Price</Label>
                                  <div className="font-medium mt-1">
                                    ${selectedBooking.total_price.toFixed(2)}
                                  </div>
                                </div>
                                <div>
                                  <Label>Payment Status</Label>
                                  <div className="font-medium mt-1">
                                    {selectedBooking.payment_status || 'Unpaid'}
                                  </div>
                                </div>
                              </div>

                              <div>
                                <Label>Special Requests</Label>
                                <div className="mt-1 text-sm border rounded-md p-2 bg-slate-50">
                                  {selectedBooking.special_requests ||
                                    'No special requests'}
                                </div>
                              </div>

                              <div>
                                <Label>Update Status</Label>
                                <Select
                                  defaultValue={selectedBooking.status}
                                  onValueChange={(value) =>
                                    updateBookingStatus(selectedBooking.id, value)
                                  }
                                >
                                  <SelectTrigger className="mt-1">
                                    <SelectValue placeholder="Select status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="confirmed">
                                      Confirmed
                                    </SelectItem>
                                    <SelectItem value="checked_in">
                                      Checked In
                                    </SelectItem>
                                    <SelectItem value="checked_out">
                                      Checked Out
                                    </SelectItem>
                                    <SelectItem value="cancelled">
                                      Cancelled
                                    </SelectItem>
                                    <SelectItem value="no_show">
                                      No Show
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          )}

                          <DialogFooter>
                            <Button variant="outline" type="button">
                              Close
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Reservations;
