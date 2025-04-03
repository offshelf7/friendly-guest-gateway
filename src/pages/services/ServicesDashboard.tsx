
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Briefcase, 
  CalendarCheck, 
  Clock, 
  Filter, 
  Plus, 
  Search, 
  Settings,
  Users,
  TrendingUp,
  BarChart
} from 'lucide-react';

const ServicesDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Services Dashboard</h1>
          <p className="text-muted-foreground">Manage and monitor hotel services</p>
        </div>
        <div className="flex gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Service
          </Button>
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Stats Cards */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">32</div>
            <p className="text-xs text-muted-foreground mt-1">Across 5 categories</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Today's Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">14</div>
            <p className="text-xs text-muted-foreground mt-1">5 pending, 9 confirmed</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$12,840</div>
            <p className="text-xs text-muted-foreground mt-1">↑ 12% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Customer Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">4.8/5</div>
            <p className="text-xs text-muted-foreground mt-1">Based on 156 reviews</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Popular Services</CardTitle>
                <CardDescription>Most booked services this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b pb-2">
                    <div className="flex items-center">
                      <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <Briefcase className="h-5 w-5 text-blue-700" />
                      </div>
                      <div>
                        <p className="font-medium">Spa Massage</p>
                        <p className="text-sm text-muted-foreground">60 min, $120</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">48 bookings</p>
                      <p className="text-sm text-muted-foreground">↑ 15%</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center border-b pb-2">
                    <div className="flex items-center">
                      <div className="h-9 w-9 rounded-full bg-green-100 flex items-center justify-center mr-3">
                        <Briefcase className="h-5 w-5 text-green-700" />
                      </div>
                      <div>
                        <p className="font-medium">Airport Transfer</p>
                        <p className="text-sm text-muted-foreground">One-way, $75</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">36 bookings</p>
                      <p className="text-sm text-muted-foreground">↑ 8%</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="h-9 w-9 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                        <Briefcase className="h-5 w-5 text-purple-700" />
                      </div>
                      <div>
                        <p className="font-medium">Room Service</p>
                        <p className="text-sm text-muted-foreground">24/7 Availability</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">29 bookings</p>
                      <p className="text-sm text-muted-foreground">↑ 5%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Today's Schedule</CardTitle>
                <CardDescription>Upcoming service appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center border-b pb-2">
                    <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <Clock className="h-5 w-5 text-blue-700" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="font-medium">Spa Massage - John Smith</p>
                        <Badge>10:30 AM</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Room 302, 60 min session</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center border-b pb-2">
                    <div className="h-9 w-9 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <Clock className="h-5 w-5 text-green-700" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="font-medium">Airport Pickup - Maria Garcia</p>
                        <Badge>12:15 PM</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">International Terminal, Flight AC123</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="h-9 w-9 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                      <Clock className="h-5 w-5 text-amber-700" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="font-medium">Dinner Reservation - Johnson Family</p>
                        <Badge>7:00 PM</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Restaurant, Table for 4</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="bookings">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle>Service Bookings</CardTitle>
                  <CardDescription>Manage all service appointments</CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search bookings..."
                      className="pl-8 w-[250px]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                  <Button variant="outline">
                    <CalendarCheck className="mr-2 h-4 w-4" />
                    Date
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="py-3 px-4 text-left">Booking ID</th>
                      <th className="py-3 px-4 text-left">Service</th>
                      <th className="py-3 px-4 text-left">Guest</th>
                      <th className="py-3 px-4 text-left">Date & Time</th>
                      <th className="py-3 px-4 text-left">Status</th>
                      <th className="py-3 px-4 text-left">Price</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="py-3 px-4 font-medium">SRV-1001</td>
                      <td className="py-3 px-4">Spa Massage</td>
                      <td className="py-3 px-4">John Smith (Room 302)</td>
                      <td className="py-3 px-4">Today, 10:30 AM</td>
                      <td className="py-3 px-4">
                        <Badge className="bg-green-100 text-green-800">Confirmed</Badge>
                      </td>
                      <td className="py-3 px-4">$120.00</td>
                      <td className="py-3 px-4 text-right">
                        <Button variant="outline" size="sm">Manage</Button>
                      </td>
                    </tr>
                    <tr className="border-t">
                      <td className="py-3 px-4 font-medium">SRV-1002</td>
                      <td className="py-3 px-4">Airport Pickup</td>
                      <td className="py-3 px-4">Maria Garcia (Room 415)</td>
                      <td className="py-3 px-4">Today, 12:15 PM</td>
                      <td className="py-3 px-4">
                        <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
                      </td>
                      <td className="py-3 px-4">$75.00</td>
                      <td className="py-3 px-4 text-right">
                        <Button variant="outline" size="sm">Manage</Button>
                      </td>
                    </tr>
                    <tr className="border-t">
                      <td className="py-3 px-4 font-medium">SRV-1003</td>
                      <td className="py-3 px-4">Dinner Reservation</td>
                      <td className="py-3 px-4">Johnson Family (Room 512)</td>
                      <td className="py-3 px-4">Today, 7:00 PM</td>
                      <td className="py-3 px-4">
                        <Badge className="bg-amber-100 text-amber-800">Pending</Badge>
                      </td>
                      <td className="py-3 px-4">$0.00</td>
                      <td className="py-3 px-4 text-right">
                        <Button variant="outline" size="sm">Manage</Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="services">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle>Service Management</CardTitle>
                  <CardDescription>View and manage available services</CardDescription>
                </div>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search services..."
                    className="pl-8 w-[250px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Spa Services</CardTitle>
                    <CardDescription>Wellness and relaxation</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex justify-between items-center py-1 border-b">
                        <span>Swedish Massage (60 min)</span>
                        <span className="font-medium">$120</span>
                      </li>
                      <li className="flex justify-between items-center py-1 border-b">
                        <span>Deep Tissue Massage (60 min)</span>
                        <span className="font-medium">$140</span>
                      </li>
                      <li className="flex justify-between items-center py-1 border-b">
                        <span>Hot Stone Therapy (90 min)</span>
                        <span className="font-medium">$180</span>
                      </li>
                      <li className="flex justify-between items-center py-1">
                        <span>Facial Treatment (45 min)</span>
                        <span className="font-medium">$95</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Transportation</CardTitle>
                    <CardDescription>Airport and local transfers</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex justify-between items-center py-1 border-b">
                        <span>Airport Pickup/Dropoff</span>
                        <span className="font-medium">$75</span>
                      </li>
                      <li className="flex justify-between items-center py-1 border-b">
                        <span>City Tour (4 hours)</span>
                        <span className="font-medium">$120</span>
                      </li>
                      <li className="flex justify-between items-center py-1">
                        <span>Luxury Car Rental (24 hours)</span>
                        <span className="font-medium">$250</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Dining Services</CardTitle>
                    <CardDescription>Restaurant and room service</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex justify-between items-center py-1 border-b">
                        <span>Room Service</span>
                        <span className="font-medium">Varies</span>
                      </li>
                      <li className="flex justify-between items-center py-1 border-b">
                        <span>Restaurant Reservation</span>
                        <span className="font-medium">Free</span>
                      </li>
                      <li className="flex justify-between items-center py-1">
                        <span>Private Dining Experience</span>
                        <span className="font-medium">$200+</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Service Performance Analytics</CardTitle>
              <CardDescription>Insights into service utilization and revenue</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-md p-6 flex justify-center items-center h-[300px]">
                  <div className="text-center">
                    <BarChart className="h-16 w-16 mx-auto text-slate-300" />
                    <p className="mt-4 text-muted-foreground">Service booking analytics coming soon</p>
                  </div>
                </div>
                <div className="border rounded-md p-6 flex justify-center items-center h-[300px]">
                  <div className="text-center">
                    <TrendingUp className="h-16 w-16 mx-auto text-slate-300" />
                    <p className="mt-4 text-muted-foreground">Revenue analytics coming soon</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ServicesDashboard;
