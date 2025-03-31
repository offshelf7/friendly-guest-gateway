
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { BadgeCheck, Star, MessageSquare, Users } from "lucide-react";

const ServiceManagerDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Service Manager Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Guest Satisfaction</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8/5</div>
            <p className="text-xs text-muted-foreground">+0.2 from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Service Requests</CardTitle>
            <BadgeCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">3 pending</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Guest Reviews</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32</div>
            <p className="text-xs text-muted-foreground">18 5-star reviews</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Staff on Duty</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">4 front desk, 8 service</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="requests" className="w-full">
        <TabsList>
          <TabsTrigger value="requests">Service Requests</TabsTrigger>
          <TabsTrigger value="reviews">Guest Reviews</TabsTrigger>
          <TabsTrigger value="training">Staff Training</TabsTrigger>
        </TabsList>
        <TabsContent value="requests">
          <Card>
            <CardHeader>
              <CardTitle>Service Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Request</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead>Guest</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Extra Towels</TableCell>
                    <TableCell>304</TableCell>
                    <TableCell>James Wilson</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        Completed
                      </span>
                    </TableCell>
                    <TableCell>10:30 AM</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Room Cleaning</TableCell>
                    <TableCell>215</TableCell>
                    <TableCell>Elena Petrova</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700 ring-1 ring-inset ring-yellow-600/20">
                        In Progress
                      </span>
                    </TableCell>
                    <TableCell>11:15 AM</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">WiFi Assistance</TableCell>
                    <TableCell>128</TableCell>
                    <TableCell>Tom Jackson</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">
                        Pending
                      </span>
                    </TableCell>
                    <TableCell>11:42 AM</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reviews">
          <Card>
            <CardHeader>
              <CardTitle>Recent Guest Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center mr-3">
                        <span className="text-sm font-medium">JD</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">John Doe</p>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="h-4 w-4 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">2 days ago</span>
                  </div>
                  <p className="text-sm">
                    The staff was incredibly attentive and the room service was prompt. Will definitely return!
                  </p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center mr-3">
                        <span className="text-sm font-medium">AS</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Alice Smith</p>
                        <div className="flex">
                          {[1, 2, 3, 4].map((star) => (
                            <Star key={star} className="h-4 w-4 fill-amber-400 text-amber-400" />
                          ))}
                          <Star className="h-4 w-4 text-amber-400" />
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">3 days ago</span>
                  </div>
                  <p className="text-sm">
                    Great experience overall. The spa services were excellent, though the reservation process could be more streamlined.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="training">
          <Card>
            <CardHeader>
              <CardTitle>Staff Training Programs</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Staff training schedules and performance metrics would be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ServiceManagerDashboard;
