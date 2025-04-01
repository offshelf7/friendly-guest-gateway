
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BadgeCheck, Star, MessageSquare, Users, Calendar, Clock, 
  Utensils, Coffee, Hotel, Phone, Briefcase, ThumbsUp, AlertCircle,
  Activity, LineChart, UserCheck
} from "lucide-react";
import { useState } from "react";

const ServiceManagerDashboard = () => {
  const [selectedDateRange, setSelectedDateRange] = useState("today");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Service Manager Dashboard</h1>
      
      <div className="flex justify-between items-center mb-6">
        <div className="space-x-2">
          <Button 
            variant={selectedDateRange === "today" ? "default" : "outline"} 
            size="sm"
            onClick={() => setSelectedDateRange("today")}
          >
            Today
          </Button>
          <Button 
            variant={selectedDateRange === "week" ? "default" : "outline"} 
            size="sm"
            onClick={() => setSelectedDateRange("week")}
          >
            This Week
          </Button>
          <Button 
            variant={selectedDateRange === "month" ? "default" : "outline"} 
            size="sm"
            onClick={() => setSelectedDateRange("month")}
          >
            This Month
          </Button>
          <Button 
            variant={selectedDateRange === "quarter" ? "default" : "outline"} 
            size="sm"
            onClick={() => setSelectedDateRange("quarter")}
          >
            Quarter
          </Button>
        </div>
        <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            <SelectItem value="front-desk">Front Desk</SelectItem>
            <SelectItem value="room-service">Room Service</SelectItem>
            <SelectItem value="housekeeping">Housekeeping</SelectItem>
            <SelectItem value="concierge">Concierge</SelectItem>
            <SelectItem value="spa">Spa & Wellness</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
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
        <TabsList className="grid grid-cols-5 w-full md:w-auto">
          <TabsTrigger value="requests">Service Requests</TabsTrigger>
          <TabsTrigger value="reviews">Guest Reviews</TabsTrigger>
          <TabsTrigger value="training">Staff Training</TabsTrigger>
          <TabsTrigger value="quality">Quality Control</TabsTrigger>
          <TabsTrigger value="incidents">Incidents</TabsTrigger>
        </TabsList>
        
        <TabsContent value="requests">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Active Service Requests</CardTitle>
                    <Button>
                      <BadgeCheck className="h-4 w-4 mr-2" />
                      New Request
                    </Button>
                  </div>
                  <div className="flex items-center gap-4 mt-4">
                    <Input placeholder="Search requests..." className="max-w-xs" />
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="escalated">Escalated</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Request</TableHead>
                        <TableHead>Room</TableHead>
                        <TableHead>Guest</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Extra Towels</TableCell>
                        <TableCell>304</TableCell>
                        <TableCell>James Wilson</TableCell>
                        <TableCell>Housekeeping</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-none">
                            Completed
                          </Badge>
                        </TableCell>
                        <TableCell>10:30 AM</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Room Cleaning</TableCell>
                        <TableCell>215</TableCell>
                        <TableCell>Elena Petrova</TableCell>
                        <TableCell>Housekeeping</TableCell>
                        <TableCell>
                          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-none">
                            In Progress
                          </Badge>
                        </TableCell>
                        <TableCell>11:15 AM</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">WiFi Assistance</TableCell>
                        <TableCell>128</TableCell>
                        <TableCell>Tom Jackson</TableCell>
                        <TableCell>IT Support</TableCell>
                        <TableCell>
                          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-none">
                            Pending
                          </Badge>
                        </TableCell>
                        <TableCell>11:42 AM</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Late Checkout Request</TableCell>
                        <TableCell>412</TableCell>
                        <TableCell>Michael Brown</TableCell>
                        <TableCell>Front Desk</TableCell>
                        <TableCell>
                          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100 border-none">
                            Escalated
                          </Badge>
                        </TableCell>
                        <TableCell>10:05 AM</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Room Service Order</TableCell>
                        <TableCell>520</TableCell>
                        <TableCell>Sarah Johnson</TableCell>
                        <TableCell>Food & Beverage</TableCell>
                        <TableCell>
                          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-none">
                            In Progress
                          </Badge>
                        </TableCell>
                        <TableCell>12:10 PM</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Request Statistics</CardTitle>
                  <CardDescription>Service request breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-40 flex items-center justify-center border-2 border-dashed rounded-lg mb-4">
                    <div className="text-center">
                      <LineChart className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Request Trend Chart</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>By Department</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                          <span className="text-sm">Housekeeping (42%)</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-green-500"></div>
                          <span className="text-sm">Food & Beverage (28%)</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                          <span className="text-sm">Front Desk (15%)</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                          <span className="text-sm">Maintenance (10%)</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-gray-500"></div>
                          <span className="text-sm">Other (5%)</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 pt-4 border-t">
                      <div className="flex justify-between text-sm">
                        <span>By Status</span>
                      </div>
                      
                      <div className="h-2 bg-gray-100 rounded-full mb-1">
                        <div className="h-2 bg-green-500 rounded-full w-[45%]"></div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Completed</span>
                        <span>45%</span>
                      </div>
                      
                      <div className="h-2 bg-gray-100 rounded-full mb-1">
                        <div className="h-2 bg-yellow-500 rounded-full w-[30%]"></div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>In Progress</span>
                        <span>30%</span>
                      </div>
                      
                      <div className="h-2 bg-gray-100 rounded-full mb-1">
                        <div className="h-2 bg-blue-500 rounded-full w-[20%]"></div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Pending</span>
                        <span>20%</span>
                      </div>
                      
                      <div className="h-2 bg-gray-100 rounded-full mb-1">
                        <div className="h-2 bg-purple-500 rounded-full w-[5%]"></div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Escalated</span>
                        <span>5%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Service Level Metrics</CardTitle>
                  <CardDescription>Response and resolution times</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Avg. Response Time</p>
                        <p className="text-sm text-muted-foreground">Time to first contact</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold">8 min</p>
                        <p className="text-xs text-green-600">-2 min from target</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Avg. Resolution Time</p>
                        <p className="text-sm text-muted-foreground">Time to complete</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold">22 min</p>
                        <p className="text-xs text-amber-600">+2 min from target</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">SLA Compliance</p>
                        <p className="text-sm text-muted-foreground">Requests within target</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold">92%</p>
                        <p className="text-xs text-green-600">+2% from last month</p>
                      </div>
                    </div>
                    
                    <div className="space-y-1 pt-2">
                      <p className="text-sm font-medium">Resolution Time by Department</p>
                      <Table>
                        <TableBody className="text-sm">
                          <TableRow>
                            <TableCell>Housekeeping</TableCell>
                            <TableCell className="text-right">18 min</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Food & Beverage</TableCell>
                            <TableCell className="text-right">24 min</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Front Desk</TableCell>
                            <TableCell className="text-right">12 min</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Maintenance</TableCell>
                            <TableCell className="text-right">38 min</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="reviews">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Recent Guest Reviews</CardTitle>
                    <div className="flex gap-2">
                      <Select defaultValue="all">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Filter by rating" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Ratings</SelectItem>
                          <SelectItem value="5">5 Stars</SelectItem>
                          <SelectItem value="4">4 Stars</SelectItem>
                          <SelectItem value="3">3 Stars</SelectItem>
                          <SelectItem value="2">2 Stars</SelectItem>
                          <SelectItem value="1">1 Star</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button>
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Respond
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
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
                        <div className="text-right">
                          <span className="text-xs text-muted-foreground">2 days ago</span>
                          <div>
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-none">
                              Room 304
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm mb-3">
                        The staff was incredibly attentive and the room service was prompt. Will definitely return!
                        Special thanks to Sarah at the front desk who went above and beyond to accommodate our early check-in request.
                      </p>
                      <div className="pt-2 border-t flex justify-between items-center">
                        <div className="flex gap-2">
                          <Badge variant="outline" className="bg-blue-50 text-blue-700">Front Desk</Badge>
                          <Badge variant="outline" className="bg-green-50 text-green-700">Room Service</Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            Reply
                          </Button>
                          <Button variant="ghost" size="sm">
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            Highlight
                          </Button>
                        </div>
                      </div>
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
                        <div className="text-right">
                          <span className="text-xs text-muted-foreground">3 days ago</span>
                          <div>
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-none">
                              Room 215
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm mb-3">
                        Great experience overall. The spa services were excellent, though the reservation process could be more streamlined.
                        The massage therapist was skilled and professional. Room was clean and comfortable, but WiFi was a bit slow.
                      </p>
                      <div className="pt-2 border-t flex justify-between items-center">
                        <div className="flex gap-2">
                          <Badge variant="outline" className="bg-purple-50 text-purple-700">Spa</Badge>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700">Housekeeping</Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            Reply
                          </Button>
                          <Button variant="ghost" size="sm">
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            Highlight
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center mr-3">
                            <span className="text-sm font-medium">RJ</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Robert Johnson</p>
                            <div className="flex">
                              {[1, 2, 3].map((star) => (
                                <Star key={star} className="h-4 w-4 fill-amber-400 text-amber-400" />
                              ))}
                              {[4, 5].map((star) => (
                                <Star key={star} className="h-4 w-4 text-amber-400" />
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-muted-foreground">1 week ago</span>
                          <div>
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-none">
                              Room 128
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm mb-3">
                        Room was smaller than expected based on the photos online. Housekeeping was inconsistent - 
                        some days the room was perfectly cleaned, other days items were missed. The restaurant food was excellent though.
                      </p>
                      <div className="pt-2 border-t flex justify-between items-center">
                        <div className="flex gap-2">
                          <Badge variant="outline" className="bg-blue-50 text-blue-700">Housekeeping</Badge>
                          <Badge variant="outline" className="bg-green-50 text-green-700">Restaurant</Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            Reply
                          </Button>
                          <Button variant="ghost" size="sm">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            Follow Up
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Review Analytics</CardTitle>
                  <CardDescription>Guest feedback metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-40 flex items-center justify-center border-2 border-dashed rounded-lg mb-4">
                    <div className="text-center">
                      <LineChart className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Rating Trends Chart</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-2">
                        <Star className="h-5 w-5 text-amber-400" />
                        <div>
                          <p className="font-medium">Average Rating</p>
                          <p className="text-sm text-muted-foreground">Last 30 days</p>
                        </div>
                      </div>
                      <div className="text-2xl font-bold">4.7</div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Rating Distribution</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-xs w-6">5 ★</span>
                        <div className="h-2 bg-gray-100 rounded-full flex-1">
                          <div className="h-2 bg-green-500 rounded-full w-[70%]"></div>
                        </div>
                        <span className="text-xs">70%</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-xs w-6">4 ★</span>
                        <div className="h-2 bg-gray-100 rounded-full flex-1">
                          <div className="h-2 bg-green-500 rounded-full w-[20%]"></div>
                        </div>
                        <span className="text-xs">20%</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-xs w-6">3 ★</span>
                        <div className="h-2 bg-gray-100 rounded-full flex-1">
                          <div className="h-2 bg-yellow-500 rounded-full w-[7%]"></div>
                        </div>
                        <span className="text-xs">7%</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-xs w-6">2 ★</span>
                        <div className="h-2 bg-gray-100 rounded-full flex-1">
                          <div className="h-2 bg-orange-500 rounded-full w-[2%]"></div>
                        </div>
                        <span className="text-xs">2%</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-xs w-6">1 ★</span>
                        <div className="h-2 bg-gray-100 rounded-full flex-1">
                          <div className="h-2 bg-red-500 rounded-full w-[1%]"></div>
                        </div>
                        <span className="text-xs">1%</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2 pt-4 border-t">
                      <div className="flex justify-between text-sm">
                        <span>Department Ratings</span>
                      </div>
                      
                      <Table>
                        <TableBody className="text-sm">
                          <TableRow>
                            <TableCell>Front Desk</TableCell>
                            <TableCell className="text-right">4.9 ★</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Housekeeping</TableCell>
                            <TableCell className="text-right">4.5 ★</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Food & Beverage</TableCell>
                            <TableCell className="text-right">4.8 ★</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Spa & Wellness</TableCell>
                            <TableCell className="text-right">4.7 ★</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Overall Facilities</TableCell>
                            <TableCell className="text-right">4.6 ★</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Common Feedback Themes</CardTitle>
                  <CardDescription>Frequently mentioned topics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded p-3 space-y-2">
                      <div className="flex justify-between">
                        <div className="flex items-center gap-2">
                          <ThumbsUp className="h-4 w-4 text-green-600" />
                          <p className="font-medium">Staff Friendliness</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-none">
                          Positive
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Mentioned in 75% of positive reviews. Guests specifically praise front desk staff.
                      </p>
                    </div>
                    
                    <div className="border rounded p-3 space-y-2">
                      <div className="flex justify-between">
                        <div className="flex items-center gap-2">
                          <Utensils className="h-4 w-4 text-green-600" />
                          <p className="font-medium">Food Quality</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-none">
                          Positive
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Mentioned in 62% of reviews. Restaurant and room service equally praised.
                      </p>
                    </div>
                    
                    <div className="border rounded p-3 space-y-2">
                      <div className="flex justify-between">
                        <div className="flex items-center gap-2">
                          <Hotel className="h-4 w-4 text-amber-600" />
                          <p className="font-medium">Room Size</p>
                        </div>
                        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-none">
                          Mixed
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Mentioned in 45% of reviews. Standard rooms receive more negative comments about size.
                      </p>
                    </div>
                    
                    <div className="border rounded p-3 space-y-2">
                      <div className="flex justify-between">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-red-600" />
                          <p className="font-medium">Wait Times</p>
                        </div>
                        <Badge className="bg-red-100 text-red-800 hover:bg-red-100 border-none">
                          Needs Improvement
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Mentioned in 18% of negative reviews. Restaurant during peak breakfast hours most cited.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="training">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Staff Training Programs</CardTitle>
                    <Button>
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Training
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Training Program</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Participants</TableHead>
                        <TableHead>Completion</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Guest Experience Excellence</TableCell>
                        <TableCell>All Departments</TableCell>
                        <TableCell>48/52</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-24 bg-gray-100 rounded-full">
                              <div className="h-2 bg-green-500 rounded-full" style={{ width: '92%' }}></div>
                            </div>
                            <span className="text-xs">92%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-none">
                            Active
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Conflict Resolution</TableCell>
                        <TableCell>Front Desk, F&B</TableCell>
                        <TableCell>22/22</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-24 bg-gray-100 rounded-full">
                              <div className="h-2 bg-green-500 rounded-full" style={{ width: '100%' }}></div>
                            </div>
                            <span className="text-xs">100%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-none">
                            Completed
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Advanced Housekeeping</TableCell>
                        <TableCell>Housekeeping</TableCell>
                        <TableCell>15/18</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-24 bg-gray-100 rounded-full">
                              <div className="h-2 bg-yellow-500 rounded-full" style={{ width: '83%' }}></div>
                            </div>
                            <span className="text-xs">83%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-none">
                            In Progress
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Food Safety Certification</TableCell>
                        <TableCell>Food & Beverage</TableCell>
                        <TableCell>14/14</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-24 bg-gray-100 rounded-full">
                              <div className="h-2 bg-green-500 rounded-full" style={{ width: '100%' }}></div>
                            </div>
                            <span className="text-xs">100%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-none">
                            Completed
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Spa Treatment Protocol Updates</TableCell>
                        <TableCell>Spa & Wellness</TableCell>
                        <TableCell>6/8</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-24 bg-gray-100 rounded-full">
                              <div className="h-2 bg-yellow-500 rounded-full" style={{ width: '75%' }}></div>
                            </div>
                            <span className="text-xs">75%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-none">
                            In Progress
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Training Sessions</CardTitle>
                  <CardDescription>Next 7 days schedule</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border rounded p-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Today, 3:00 PM - 5:00 PM</span>
                    </div>
                    <h3 className="font-medium">Guest Experience Excellence</h3>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Conference Room A</span>
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-none">
                        12 Attendees
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="border rounded p-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Tomorrow, 10:00 AM - 12:00 PM</span>
                    </div>
                    <h3 className="font-medium">Advanced Housekeeping</h3>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Training Room B</span>
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-none">
                        8 Attendees
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="border rounded p-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Friday, 2:00 PM - 4:00 PM</span>
                    </div>
                    <h3 className="font-medium">Spa Treatment Protocol Updates</h3>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Spa Conference Room</span>
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-none">
                        6 Attendees
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Training Performance</CardTitle>
                  <CardDescription>Staff assessment results</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-40 flex items-center justify-center border-2 border-dashed rounded-lg mb-4">
                    <div className="text-center">
                      <LineChart className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Training Assessment Chart</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-2">
                        <Activity className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium">Avg. Assessment Score</p>
                          <p className="text-sm text-muted-foreground">All trainings</p>
                        </div>
                      </div>
                      <div className="text-xl font-bold">88%</div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Top Performers</span>
                      </div>
                      
                      <Table>
                        <TableBody className="text-sm">
                          <TableRow>
                            <TableCell className="py-2">
                              <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center">
                                  <span className="text-xs font-medium">SJ</span>
                                </div>
                                <span>Sarah Johnson</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">97%</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="py-2">
                              <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center">
                                  <span className="text-xs font-medium">RC</span>
                                </div>
                                <span>Robert Chen</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">95%</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="py-2">
                              <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center">
                                  <span className="text-xs font-medium">MG</span>
                                </div>
                                <span>Maria Garcia</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">94%</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="quality">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Quality Control Inspections</CardTitle>
                    <Button>
                      <BadgeCheck className="h-4 w-4 mr-2" />
                      New Inspection
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <div className="space-x-2">
                        <Button variant="outline" size="sm">All</Button>
                        <Button variant="ghost" size="sm">Rooms</Button>
                        <Button variant="ghost" size="sm">F&B</Button>
                        <Button variant="ghost" size="sm">Public Areas</Button>
                        <Button variant="ghost" size="sm">Spa</Button>
                      </div>
                      <Select defaultValue="this-week">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Time period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="today">Today</SelectItem>
                          <SelectItem value="this-week">This Week</SelectItem>
                          <SelectItem value="last-week">Last Week</SelectItem>
                          <SelectItem value="this-month">This Month</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Area/Item</TableHead>
                          <TableHead>Inspector</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Score</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Issues</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Room 304</TableCell>
                          <TableCell>Lisa Wong</TableCell>
                          <TableCell>Today, 10:15 AM</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <span className="font-medium">98%</span>
                              <BadgeCheck className="h-4 w-4 text-green-600" />
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-none">
                              Passed
                            </Badge>
                          </TableCell>
                          <TableCell>0</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">View</Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Room 215</TableCell>
                          <TableCell>Carlos Rodriguez</TableCell>
                          <TableCell>Today, 9:45 AM</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <span className="font-medium">85%</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-none">
                              Minor Issues
                            </Badge>
                          </TableCell>
                          <TableCell>2</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">View</Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Main Restaurant</TableCell>
                          <TableCell>Michael Brown</TableCell>
                          <TableCell>Yesterday, 8:30 AM</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <span className="font-medium">97%</span>
                              <BadgeCheck className="h-4 w-4 text-green-600" />
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-none">
                              Passed
                            </Badge>
                          </TableCell>
                          <TableCell>1</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">View</Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Pool Area</TableCell>
                          <TableCell>Sarah Johnson</TableCell>
                          <TableCell>Yesterday, 2:15 PM</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <span className="font-medium">78%</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-red-100 text-red-800 hover:bg-red-100 border-none">
                              Action Required
                            </Badge>
                          </TableCell>
                          <TableCell>4</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">View</Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Lobby Restrooms</TableCell>
                          <TableCell>Lisa Wong</TableCell>
                          <TableCell>2 days ago, 11:30 AM</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <span className="font-medium">92%</span>
                              <BadgeCheck className="h-4 w-4 text-green-600" />
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-none">
                              Passed
                            </Badge>
                          </TableCell>
                          <TableCell>1</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">View</Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quality Metrics</CardTitle>
                  <CardDescription>Performance by department</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-40 flex items-center justify-center border-2 border-dashed rounded-lg mb-4">
                    <div className="text-center">
                      <BarChart className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Department Quality Chart</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Housekeeping</span>
                        <span className="font-medium">94%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div className="h-2 bg-green-500 rounded-full w-[94%]"></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Food & Beverage</span>
                        <span className="font-medium">91%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div className="h-2 bg-green-500 rounded-full w-[91%]"></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Front Desk</span>
                        <span className="font-medium">96%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div className="h-2 bg-green-500 rounded-full w-[96%]"></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Spa & Wellness</span>
                        <span className="font-medium">93%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div className="h-2 bg-green-500 rounded-full w-[93%]"></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Public Areas</span>
                        <span className="font-medium">89%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div className="h-2 bg-yellow-500 rounded-full w-[89%]"></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Areas Needing Attention</CardTitle>
                  <CardDescription>Top issues to address</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border rounded p-3 space-y-2">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        <p className="font-medium">Pool Area Safety</p>
                      </div>
                      <Badge className="bg-red-100 text-red-800 hover:bg-red-100 border-none">
                        Critical
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Safety signage missing, slippery tiles in shower area, chemical storage not secure.
                    </p>
                    <div className="flex justify-end">
                      <Button variant="default" size="sm">Assign Task</Button>
                    </div>
                  </div>
                  
                  <div className="border rounded p-3 space-y-2">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-amber-600" />
                        <p className="font-medium">Room 215 Maintenance</p>
                      </div>
                      <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-none">
                        Medium
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Bathroom sink slow drainage, AC thermostat not functioning properly.
                    </p>
                    <div className="flex justify-end">
                      <Button variant="default" size="sm">Assign Task</Button>
                    </div>
                  </div>
                  
                  <div className="border rounded p-3 space-y-2">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-amber-600" />
                        <p className="font-medium">Lobby Furniture</p>
                      </div>
                      <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-none">
                        Medium
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Several fabric chairs showing wear and stains, requires cleaning or replacement.
                    </p>
                    <div className="flex justify-end">
                      <Button variant="default" size="sm">Assign Task</Button>
                    </div>
                  </div>
                  
                  <div className="border rounded p-3 space-y-2">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-blue-600" />
                        <p className="font-medium">Restaurant Menu Items</p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-none">
                        Low
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Two seasonal menu items consistently receiving lower quality ratings.
                    </p>
                    <div className="flex justify-end">
                      <Button variant="default" size="sm">Assign Task</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="incidents">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Guest Incidents</CardTitle>
                    <div className="flex gap-2">
                      <Input placeholder="Search incidents..." className="max-w-xs" />
                      <Button>
                        <AlertCircle className="h-4 w-4 mr-2" />
                        Report Incident
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Incident</TableHead>
                        <TableHead>Guest</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Reported By</TableHead>
                        <TableHead>Date/Time</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Room Key Malfunction</TableCell>
                        <TableCell>Robert Johnson</TableCell>
                        <TableCell>Room 412</TableCell>
                        <TableCell>Guest</TableCell>
                        <TableCell>Today, 11:30 AM</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-none">
                            Resolved
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Water Leak</TableCell>
                        <TableCell>Elena Petrova</TableCell>
                        <TableCell>Room 215</TableCell>
                        <TableCell>Housekeeping</TableCell>
                        <TableCell>Today, 8:45 AM</TableCell>
                        <TableCell>
                          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-none">
                            In Progress
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Allergic Reaction</TableCell>
                        <TableCell>Tom Jackson</TableCell>
                        <TableCell>Restaurant</TableCell>
                        <TableCell>F&B Staff</TableCell>
                        <TableCell>Yesterday, 7:20 PM</TableCell>
                        <TableCell>
                          <Badge className="bg-red-100 text-red-800 hover:bg-red-100 border-none">
                            Follow-up Required
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Noise Complaint</TableCell>
                        <TableCell>Sarah Johnson</TableCell>
                        <TableCell>Room 520</TableCell>
                        <TableCell>Front Desk</TableCell>
                        <TableCell>2 days ago, 11:45 PM</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-none">
                            Resolved
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Missing Item</TableCell>
                        <TableCell>Michael Brown</TableCell>
                        <TableCell>Room 304</TableCell>
                        <TableCell>Guest</TableCell>
                        <TableCell>3 days ago, 9:15 AM</TableCell>
                        <TableCell>
                          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-none">
                            Under Investigation
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Incident Summary</CardTitle>
                  <CardDescription>Last 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-40 flex items-center justify-center border-2 border-dashed rounded-lg mb-4">
                    <div className="text-center">
                      <BarChart className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Incident Type Chart</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-amber-500" />
                        <div>
                          <p className="font-medium">Total Incidents</p>
                          <p className="text-sm text-muted-foreground">This month</p>
                        </div>
                      </div>
                      <div className="text-2xl font-bold">24</div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>By Status</span>
                      </div>
                      <Table>
                        <TableBody className="text-sm">
                          <TableRow>
                            <TableCell>Resolved</TableCell>
                            <TableCell className="text-right">15 (62.5%)</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>In Progress</TableCell>
                            <TableCell className="text-right">5 (20.8%)</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Follow-up Required</TableCell>
                            <TableCell className="text-right">3 (12.5%)</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Under Investigation</TableCell>
                            <TableCell className="text-right">1 (4.2%)</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                    
                    <div className="space-y-1 pt-2 border-t">
                      <div className="flex justify-between text-sm">
                        <span>By Category</span>
                      </div>
                      <Table>
                        <TableBody className="text-sm">
                          <TableRow>
                            <TableCell>Maintenance Issues</TableCell>
                            <TableCell className="text-right">9 (37.5%)</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Guest Complaints</TableCell>
                            <TableCell className="text-right">7 (29.2%)</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Service Failures</TableCell>
                            <TableCell className="text-right">5 (20.8%)</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Safety Incidents</TableCell>
                            <TableCell className="text-right">3 (12.5%)</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Action Items</CardTitle>
                  <CardDescription>Required follow-ups</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border rounded p-3 space-y-2">
                    <div className="flex justify-between">
                      <p className="font-medium">Allergic Reaction Follow-up</p>
                      <Badge className="bg-red-100 text-red-800 hover:bg-red-100 border-none">
                        High Priority
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Contact guest to check on well-being. Review menu allergen information with kitchen staff.
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Due: Today</span>
                      <Button variant="default" size="sm">Complete</Button>
                    </div>
                  </div>
                  
                  <div className="border rounded p-3 space-y-2">
                    <div className="flex justify-between">
                      <p className="font-medium">Room 215 Water Leak</p>
                      <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-none">
                        Medium Priority
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Schedule plumber for permanent fix. Prepare incident report for maintenance records.
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Due: Tomorrow</span>
                      <Button variant="default" size="sm">Complete</Button>
                    </div>
                  </div>
                  
                  <div className="border rounded p-3 space-y-2">
                    <div className="flex justify-between">
                      <p className="font-medium">Missing Item Investigation</p>
                      <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-none">
                        Medium Priority
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Review security footage. Interview room attendants who serviced Room 304.
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Due: In 2 days</span>
                      <Button variant="default" size="sm">Complete</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ServiceManagerDashboard;
