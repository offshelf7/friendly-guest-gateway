
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  UserCheck, 
  UserMinus, 
  Calendar, 
  Bell,
  BedDouble,
  Clock,
  Hourglass,
  Users
} from 'lucide-react';

const FrontOfficeDashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Front Office Dashboard</h1>
        <p className="text-muted-foreground">Manage guest services and front desk operations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Stats Cards */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Today's Check-ins
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <UserCheck className="h-4 w-4 text-green-500" />
              <span className="text-2xl font-bold">12</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              5 already processed
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Today's Check-outs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <UserMinus className="h-4 w-4 text-amber-500" />
              <span className="text-2xl font-bold">8</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              3 already processed
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Available Rooms
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <BedDouble className="h-4 w-4 text-blue-500" />
              <span className="text-2xl font-bold">24</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Out of 120 total rooms
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Guest Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Bell className="h-4 w-4 text-red-500" />
              <span className="text-2xl font-bold">5</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              2 require immediate attention
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="arrivals-departures" className="w-full">
        <TabsList>
          <TabsTrigger value="arrivals-departures">Arrivals & Departures</TabsTrigger>
          <TabsTrigger value="room-status">Room Status</TabsTrigger>
          <TabsTrigger value="guest-requests">Guest Requests</TabsTrigger>
        </TabsList>
        
        <TabsContent value="arrivals-departures">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Today's Arrivals</CardTitle>
                <CardDescription>Expected check-ins for today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">James Wilson</p>
                      <p className="text-sm text-muted-foreground">Room 301 - Deluxe King</p>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span className="text-sm">2:00 PM</span>
                    </div>
                    <Button size="sm">Check In</Button>
                  </div>
                  
                  <div className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">Sarah Johnson</p>
                      <p className="text-sm text-muted-foreground">Room 215 - Double Queen</p>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span className="text-sm">3:30 PM</span>
                    </div>
                    <Button size="sm">Check In</Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Michael Chen</p>
                      <p className="text-sm text-muted-foreground">Room 512 - Executive Suite</p>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span className="text-sm">4:00 PM</span>
                    </div>
                    <Button size="sm">Check In</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Today's Departures</CardTitle>
                <CardDescription>Expected check-outs for today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">Robert Davis</p>
                      <p className="text-sm text-muted-foreground">Room 405 - Deluxe King</p>
                    </div>
                    <div className="flex items-center">
                      <Hourglass className="h-4 w-4 mr-1 text-amber-500" />
                      <span className="text-sm">11:00 AM</span>
                    </div>
                    <Button size="sm" variant="outline">Process</Button>
                  </div>
                  
                  <div className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">Emma Martinez</p>
                      <p className="text-sm text-muted-foreground">Room 118 - Standard Queen</p>
                    </div>
                    <div className="flex items-center">
                      <Hourglass className="h-4 w-4 mr-1 text-amber-500" />
                      <span className="text-sm">12:00 PM</span>
                    </div>
                    <Button size="sm" variant="outline">Process</Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">David Thompson</p>
                      <p className="text-sm text-muted-foreground">Room 623 - Family Suite</p>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span className="text-sm">Late: 2:00 PM</span>
                    </div>
                    <Button size="sm" variant="outline">Process</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="room-status">
          <Card>
            <CardHeader>
              <CardTitle>Room Status Overview</CardTitle>
              <CardDescription>Current occupancy and availability</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md p-6 text-center">
                Room status visualization will be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="guest-requests">
          <Card>
            <CardHeader>
              <CardTitle>Guest Requests</CardTitle>
              <CardDescription>Active service requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-medium">Extra Towels</p>
                    <p className="text-sm text-muted-foreground">Room 302 - John Anderson</p>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-red-500" />
                    <span className="text-sm">Requested 25 mins ago</span>
                  </div>
                  <Button size="sm" variant="outline">Mark Complete</Button>
                </div>
                
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-medium">Maintenance - AC Issue</p>
                    <p className="text-sm text-muted-foreground">Room 415 - Sarah Johnson</p>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-amber-500" />
                    <span className="text-sm">Requested 45 mins ago</span>
                  </div>
                  <Button size="sm" variant="outline">Mark Complete</Button>
                </div>
                
                <div className="flex items-center justify-between pb-4">
                  <div>
                    <p className="font-medium">Late Check-out Request</p>
                    <p className="text-sm text-muted-foreground">Room 201 - Michael Smith</p>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-green-500" />
                    <span className="text-sm">Requested 15 mins ago</span>
                  </div>
                  <Button size="sm" variant="outline">Mark Complete</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FrontOfficeDashboard;
