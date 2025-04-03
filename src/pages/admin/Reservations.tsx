import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { format, isToday, parseISO } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { Booking } from '@/types/roomTypes';

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
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { DateRange } from 'react-day-picker';

const Reservations = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date } | undefined>();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data, error } = await supabase
          .from('bookings')
          .select(`
            *,
            room:room_id (*),
            profile:user_id (*)
          `)
          .order('check_in_date', { ascending: false });

        if (error) throw error;

        // Map the data to match the Booking interface with explicit room properties
        const mappedBookings = data?.map(booking => {
          const room = booking.room as Record<string, any> || {};
          return {
            ...booking,
            guest_id: booking.user_id, // Map user_id to guest_id
            profile: booking.profile || {},
            payment_status: booking.payment_status || 'unpaid',
            guests_count: booking.guests_count || 1,
            room: {
              name: room.name || 'Unknown Room',
              room_number: room.room_number || (room.id ? room.id.toString() : 'N/A'),
              room_type: room.room_type || 'Standard'
            }
          };
        }) as Booking[];

        setBookings(mappedBookings || []);
        setFilteredBookings(mappedBookings || []);
      } catch (error: any) {
        console.error('Error fetching bookings:', error);
        toast({
          title: 'Error fetching reservations',
          description: error.message,
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [toast]);

  useEffect(() => {
    // Apply filters
    let filtered = [...bookings];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(booking => 
        (booking.profile?.full_name || '').toLowerCase().includes(query) ||
        (booking.profile?.email || '').toLowerCase().includes(query) ||
        booking.room.name.toLowerCase().includes(query) ||
        booking.room.room_number.toLowerCase().includes(query) ||
        booking.status.toLowerCase().includes(query)
      );
    }

    // Date range filter
    if (dateRange?.from) {
      const fromDate = new Date(dateRange.from);
      fromDate.setHours(0, 0, 0, 0);
      
      filtered = filtered.filter(booking => {
        const checkInDate = new Date(booking.check_in_date);
        
        if (dateRange.to) {
          const toDate = new Date(dateRange.to);
          toDate.setHours(23, 59, 59, 999);
          
          return checkInDate >= fromDate && checkInDate <= toDate;
        }
        
        return checkInDate >= fromDate;
      });
    }

    setFilteredBookings(filtered);
  }, [bookings, searchQuery, dateRange]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge>Confirmed</Badge>;
      case 'checked_in':
        return <Badge variant="secondary">Checked In</Badge>;
      case 'checked_out':
        return <Badge variant="outline">Checked Out</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      case 'completed':
        return <Badge variant="outline">Completed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleDateRangeChange = (range: DateRange | undefined) => {
    if (range?.from) {
      if (range.to) {
        setDateRange({ from: range.from, to: range.to });
      } else {
        setDateRange({ from: range.from, to: range.from });
      }
    } else {
      setDateRange(undefined);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Reservations</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Reservations Filter</CardTitle>
          <CardDescription>
            Filter reservations by name, email, room, or date
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by guest, email, or room..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "justify-start text-left font-normal md:w-[240px]",
                    !dateRange && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange?.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "LLL dd, y")} -{" "}
                        {format(dateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Filter by date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange?.from}
                  selected={dateRange as DateRange}
                  onSelect={handleDateRangeChange}
                />
              </PopoverContent>
            </Popover>

            {dateRange && (
              <Button 
                variant="ghost" 
                onClick={() => setDateRange(undefined)}
                className="md:w-auto w-full"
              >
                Clear Dates
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Reservations</TabsTrigger>
          <TabsTrigger value="today">Today's Reservations</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {renderBookingTable(filteredBookings, getStatusBadge)}
        </TabsContent>

        <TabsContent value="today">
          {renderBookingTable(
            filteredBookings.filter(booking => 
              isToday(parseISO(booking.check_in_date)) || isToday(parseISO(booking.check_out_date))
            ),
            getStatusBadge
          )}
        </TabsContent>

        <TabsContent value="upcoming">
          {renderBookingTable(
            filteredBookings.filter(booking => {
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              return new Date(booking.check_in_date) > today && booking.status !== 'cancelled';
            }),
            getStatusBadge
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

const renderBookingTable = (
  bookings: Booking[], 
  getStatusBadge: (status: string) => JSX.Element
) => {
  if (bookings.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No reservations found</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Guest</TableHead>
          <TableHead>Room</TableHead>
          <TableHead>Check-in</TableHead>
          <TableHead>Check-out</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookings.map((booking) => (
          <TableRow key={booking.id}>
            <TableCell>
              {booking.profile?.full_name || "Guest"}
              <div className="text-xs text-muted-foreground mt-1">
                {booking.profile?.email || "No email"}
              </div>
            </TableCell>
            <TableCell>
              {booking.room.name}
              <div className="text-xs text-muted-foreground mt-1">
                Room {booking.room.room_number}, {booking.room.room_type}
              </div>
            </TableCell>
            <TableCell>
              {format(new Date(booking.check_in_date), 'MMM d, yyyy')}
            </TableCell>
            <TableCell>
              {format(new Date(booking.check_out_date), 'MMM d, yyyy')}
            </TableCell>
            <TableCell>
              {getStatusBadge(booking.status)}
            </TableCell>
            <TableCell className="text-right">
              ${booking.total_price.toFixed(2)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Reservations;
