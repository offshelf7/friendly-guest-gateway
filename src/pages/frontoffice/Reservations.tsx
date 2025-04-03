
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Filter, 
  Plus, 
  Search, 
  ChevronLeft, 
  ChevronRight,
  Check,
  X,
  Clock,
  Edit,
  Trash2
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const Reservations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [statusFilter, setStatusFilter] = useState('all');
  const { toast } = useToast();
  
  // Mock data - would normally come from API
  const reservations = [
    {
      id: "RES-001",
      guestName: "John Smith",
      roomType: "Deluxe King",
      roomNumber: "302",
      checkInDate: "2023-09-28",
      checkOutDate: "2023-10-02",
      guestCount: 2,
      status: "confirmed",
      total: 799.00,
      paymentStatus: "paid"
    },
    {
      id: "RES-002",
      guestName: "Maria Garcia",
      roomType: "Junior Suite",
      roomNumber: "401",
      checkInDate: "2023-09-30",
      checkOutDate: "2023-10-05",
      guestCount: 3,
      status: "pending",
      total: 1299.00,
      paymentStatus: "pending"
    },
    {
      id: "RES-003",
      guestName: "Robert Johnson",
      roomType: "Standard Double",
      roomNumber: "215",
      checkInDate: "2023-09-25",
      checkOutDate: "2023-09-28",
      guestCount: 2,
      status: "checked_in",
      total: 450.00,
      paymentStatus: "paid"
    },
    {
      id: "RES-004",
      guestName: "Emma Davis",
      roomType: "Family Suite",
      roomNumber: "505",
      checkInDate: "2023-10-10",
      checkOutDate: "2023-10-15",
      guestCount: 4,
      status: "confirmed",
      total: 1750.00,
      paymentStatus: "paid"
    },
    {
      id: "RES-005",
      guestName: "David Wilson",
      roomType: "Deluxe Queen",
      roomNumber: "318",
      checkInDate: "2023-09-22",
      checkOutDate: "2023-09-25",
      guestCount: 1,
      status: "checked_out",
      total: 450.00,
      paymentStatus: "paid"
    }
  ];
  
  const filteredReservations = reservations.filter(res => {
    // Filter by search term
    const matchesSearch = 
      res.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.roomNumber.includes(searchTerm);
    
    // Filter by status
    const matchesStatus = statusFilter === 'all' || res.status === statusFilter;
    
    // Filter by date range (if active)
    let matchesDateRange = true;
    if (dateRange.start && dateRange.end) {
      const checkIn = new Date(res.checkInDate);
      const checkOut = new Date(res.checkOutDate);
      const start = new Date(dateRange.start);
      const end = new Date(dateRange.end);
      
      matchesDateRange = 
        (checkIn >= start && checkIn <= end) || 
        (checkOut >= start && checkOut <= end) ||
        (checkIn <= start && checkOut >= end);
    }
    
    return matchesSearch && matchesStatus && matchesDateRange;
  });

  const handleDateRangeChange = (range) => {
    setDateRange(range);
  };

  const handleNewReservation = () => {
    toast({
      title: "Coming Soon",
      description: "New reservation form will be available soon.",
    });
  };
  
  // Helper function to get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-blue-100 text-blue-800">Confirmed</Badge>;
      case 'pending':
        return <Badge className="bg-amber-100 text-amber-800">Pending</Badge>;
      case 'checked_in':
        return <Badge className="bg-green-100 text-green-800">Checked In</Badge>;
      case 'checked_out':
        return <Badge className="bg-slate-100 text-slate-800">Checked Out</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Reservations</h1>
          <p className="text-muted-foreground">Manage hotel bookings and reservations</p>
        </div>
        <Button onClick={handleNewReservation}>
          <Plus className="mr-2 h-4 w-4" />
          New Reservation
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search reservations..."
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
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="checked_in">Checked In</SelectItem>
            <SelectItem value="checked_out">Checked Out</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        
        <Button variant="outline" className="w-[180px]">
          <Calendar className="mr-2 h-4 w-4" />
          Date Range
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>All Reservations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="py-3 px-4 text-left">Reservation</th>
                  <th className="py-3 px-4 text-left">Guest</th>
                  <th className="py-3 px-4 text-left">Room</th>
                  <th className="py-3 px-4 text-left">Check-In</th>
                  <th className="py-3 px-4 text-left">Check-Out</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Payment</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReservations.map((res) => (
                  <tr key={res.id} className="border-t">
                    <td className="py-3 px-4 font-medium">{res.id}</td>
                    <td className="py-3 px-4">{res.guestName}</td>
                    <td className="py-3 px-4">{res.roomNumber} ({res.roomType})</td>
                    <td className="py-3 px-4">{res.checkInDate}</td>
                    <td className="py-3 px-4">{res.checkOutDate}</td>
                    <td className="py-3 px-4">{getStatusBadge(res.status)}</td>
                    <td className="py-3 px-4">
                      {res.paymentStatus === 'paid' ? (
                        <span className="flex items-center text-green-600">
                          <Check className="h-4 w-4 mr-1" />
                          Paid
                        </span>
                      ) : (
                        <span className="flex items-center text-amber-600">
                          <Clock className="h-4 w-4 mr-1" />
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        {res.status === 'pending' && (
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredReservations.length === 0 && (
                  <tr>
                    <td colSpan={8} className="py-6 text-center text-muted-foreground">
                      No reservations found matching your search criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reservations;
