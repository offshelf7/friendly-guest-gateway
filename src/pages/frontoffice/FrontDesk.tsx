
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Button,
  Input,
  Badge,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/components';
import { 
  Search, 
  UserCheck, 
  UserMinus, 
  Calendar, 
  Bell,
  Filter,
  Plus,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';

const FrontDesk = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Mock data, to be replaced with real data from backend
  const reservations = [
    {
      id: 'RES-001',
      guestName: 'John Smith',
      roomNumber: '301',
      roomType: 'Deluxe King',
      checkInDate: '2023-09-25',
      checkOutDate: '2023-09-30',
      status: 'confirmed',
      paymentStatus: 'paid',
      specialRequests: 'Early check-in requested'
    },
    {
      id: 'RES-002',
      guestName: 'Sarah Johnson',
      roomNumber: '215',
      roomType: 'Double Queen',
      checkInDate: '2023-09-25',
      checkOutDate: '2023-09-27',
      status: 'pending',
      paymentStatus: 'pending',
      specialRequests: 'Extra towels'
    },
    {
      id: 'RES-003',
      guestName: 'Michael Chen',
      roomNumber: '512',
      roomType: 'Executive Suite',
      checkInDate: '2023-09-25',
      checkOutDate: '2023-10-02',
      status: 'checked_in',
      paymentStatus: 'paid',
      specialRequests: 'High floor requested'
    },
    {
      id: 'RES-004',
      guestName: 'Emma Martinez',
      roomNumber: '118',
      roomType: 'Standard Queen',
      checkInDate: '2023-09-23',
      checkOutDate: '2023-09-25',
      status: 'checked_in',
      paymentStatus: 'paid',
      specialRequests: ''
    }
  ];
  
  const filteredReservations = reservations.filter(res => {
    const matchesSearch = 
      res.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.roomNumber.includes(searchTerm) ||
      res.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (statusFilter === 'all') return matchesSearch;
    return matchesSearch && res.status === statusFilter;
  });
  
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
          <h1 className="text-3xl font-bold">Front Desk</h1>
          <p className="text-muted-foreground">Manage guest check-ins, check-outs, and requests</p>
        </div>
        <div className="flex gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Reservation
          </Button>
          <Button variant="outline">
            <Bell className="mr-2 h-4 w-4" />
            Guest Requests
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by guest name, room, or reservation ID..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
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
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          More Filters
        </Button>
        <Button variant="outline">
          <Calendar className="mr-2 h-4 w-4" />
          Date Range
        </Button>
      </div>
      
      <Tabs defaultValue="today" className="w-full">
        <TabsList>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="in-house">In-House</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="today">
          <Card>
            <CardHeader>
              <CardTitle>Today's Arrivals & Departures</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="py-3 px-4 text-left">Reservation ID</th>
                      <th className="py-3 px-4 text-left">Guest Name</th>
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
                        <td className="py-3 px-4">{res.roomNumber} - {res.roomType}</td>
                        <td className="py-3 px-4">{res.checkInDate}</td>
                        <td className="py-3 px-4">{res.checkOutDate}</td>
                        <td className="py-3 px-4">{getStatusBadge(res.status)}</td>
                        <td className="py-3 px-4">
                          {res.paymentStatus === 'paid' ? (
                            <span className="flex items-center text-green-600">
                              <CheckCircle className="h-4 w-4 mr-1" />
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
                            {res.status === 'confirmed' && (
                              <Button size="sm">
                                <UserCheck className="mr-2 h-4 w-4" />
                                Check In
                              </Button>
                            )}
                            {res.status === 'checked_in' && (
                              <Button size="sm" variant="outline">
                                <UserMinus className="mr-2 h-4 w-4" />
                                Check Out
                              </Button>
                            )}
                            <Button size="sm" variant="outline">Details</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredReservations.length === 0 && (
                      <tr>
                        <td colSpan={8} className="py-6 text-center text-muted-foreground">
                          No reservations matching your criteria
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Reservations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md p-6 text-center text-muted-foreground">
                Future reservations will be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="in-house">
          <Card>
            <CardHeader>
              <CardTitle>In-House Guests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md p-6 text-center text-muted-foreground">
                Current in-house guests will be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Reservation History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md p-6 text-center text-muted-foreground">
                Historical reservation data will be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FrontDesk;
