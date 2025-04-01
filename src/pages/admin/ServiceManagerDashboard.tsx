import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ClipboardList, Coffee, DollarSign, Users, Star, Award, Clock, Calendar, CheckCircle, AlertTriangle, Search, Filter, ArrowDownToLine, ClipboardCheck, Utensils, ChevronUp, Clipboard, CupSoda, BarChart3 } from "lucide-react";
import { useState } from "react";

// Create a BarChartIcon component for the missing BarChart icon
const BarChartIcon = ({ className }: { className?: string }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <line x1="12" y1="20" x2="12" y2="10" />
      <line x1="18" y1="20" x2="18" y2="4" />
      <line x1="6" y1="20" x2="6" y2="16" />
    </svg>
  );
};

const ServiceManagerDashboard = () => {
  const [selectedDateRange, setSelectedDateRange] = useState("week");
  const [selectedService, setSelectedService] = useState("all");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Service Manager Dashboard</h1>
      
      <div className="flex justify-between items-center mb-6">
        <div className="space-x-2">
          <Button 
            variant={selectedDateRange === "day" ? "default" : "outline"} 
            size="sm"
            onClick={() => setSelectedDateRange("day")}
          >
            Day
          </Button>
          <Button 
            variant={selectedDateRange === "week" ? "default" : "outline"} 
            size="sm"
            onClick={() => setSelectedDateRange("week")}
          >
            Week
          </Button>
          <Button 
            variant={selectedDateRange === "month" ? "default" : "outline"} 
            size="sm"
            onClick={() => setSelectedDateRange("month")}
          >
            Month
          </Button>
          <Button 
            variant={selectedDateRange === "quarter" ? "default" : "outline"} 
            size="sm"
            onClick={() => setSelectedDateRange("quarter")}
          >
            Quarter
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="location">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="location">Location</SelectItem>
              <SelectItem value="type">Service Type</SelectItem>
              <SelectItem value="staff">Staff</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">12 new today</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$7,350</div>
            <p className="text-xs text-muted-foreground text-green-500">+15% from last week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Top Service</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Room Service</div>
            <p className="text-xs text-muted-foreground">Most requested</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Customer Satisfaction</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">9.2</div>
            <p className="text-xs text-muted-foreground">Out of 10</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="orders" className="w-full">
        <TabsList className="grid grid-cols-4 w-full md:w-auto">
          <TabsTrigger value="orders">Service Orders</TabsTrigger>
          <TabsTrigger value="menu">Menu Management</TabsTrigger>
          <TabsTrigger value="staff">Staff Schedule</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="orders">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Active Service Orders</CardTitle>
                    <Button>
                      <ClipboardCheck className="h-4 w-4 mr-2" />
                      Create Order
                    </Button>
                  </div>
                  <div className="flex items-center gap-4 mt-4">
                    <Input 
                      placeholder="Search orders..." 
                      className="max-w-sm" 
                    />
                    <div className="flex items-center gap-2">
                      <Button 
                        variant={selectedService === "all" ? "default" : "outline"} 
                        size="sm"
                        onClick={() => setSelectedService("all")}
                      >
                        All
                      </Button>
                      <Button 
                        variant={selectedService === "room" ? "default" : "outline"} 
                        size="sm"
                        onClick={() => setSelectedService("room")}
                      >
                        Room Service
                      </Button>
                      <Button 
                        variant={selectedService === "dining" ? "default" : "outline"} 
                        size="sm"
                        onClick={() => setSelectedService("dining")}
                      >
                        Dining
                      </Button>
                      <Button 
                        variant={selectedService === "other" ? "default" : "outline"} 
                        size="sm"
                        onClick={() => setSelectedService("other")}
                      >
                        Other
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Service</TableHead>
                        <TableHead>Guest</TableHead>
                        <TableHead>Room</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">#1245</TableCell>
                        <TableCell>Room Service</TableCell>
                        <TableCell>John Smith</TableCell>
                        <TableCell>304</TableCell>
                        <TableCell>8:30 AM</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50 border-yellow-200">
                            Pending
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">View</Button>
                            <Button variant="ghost" size="sm">Edit</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">#1246</TableCell>
                        <TableCell>Dining</TableCell>
                        <TableCell>Alice Johnson</TableCell>
                        <TableCell>Restaurant</TableCell>
                        <TableCell>9:15 AM</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">
                            Completed
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">View</Button>
                            <Button variant="ghost" size="sm">Log</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">#1247</TableCell>
                        <TableCell>Room Service</TableCell>
                        <TableCell>Michael Brown</TableCell>
                        <TableCell>215</TableCell>
                        <TableCell>10:00 AM</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-200">
                            Scheduled
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">View</Button>
                            <Button variant="ghost" size="sm">Assign</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">#1248</TableCell>
                        <TableCell>Other</TableCell>
                        <TableCell>Emily White</TableCell>
                        <TableCell>Spa</TableCell>
                        <TableCell>10:45 AM</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50 border-red-200">
                            Urgent
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">View</Button>
                            <Button variant="ghost" size="sm">Edit</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">#1249</TableCell>
                        <TableCell>Dining</TableCell>
                        <TableCell>David Lee</TableCell>
                        <TableCell>Bar</TableCell>
                        <TableCell>11:30 AM</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50 border-yellow-200">
                            Pending
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">View</Button>
                            <Button variant="ghost" size="sm">Edit</Button>
                          </div>
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
                  <CardTitle>Order Summary</CardTitle>
                  <CardDescription>Status distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-40 flex items-center justify-center border-2 border-dashed rounded-lg mb-4">
                    <div className="text-center">
                      <BarChart3 className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Order Status Chart</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Pending</span>
                        <span className="font-medium">12 (27%)</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div className="h-2 bg-yellow-500 rounded-full w-[27%]"></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Scheduled</span>
                        <span className="font-medium">8 (18%)</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div className="h-2 bg-blue-500 rounded-full w-[18%]"></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>In Progress</span>
                        <span className="font-medium">5 (11%)</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div className="h-2 bg-purple-500 rounded-full w-[11%]"></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Completed</span>
                        <span className="font-medium">20 (44%)</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div className="h-2 bg-green-500 rounded-full w-[44%]"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mt-6 pt-4 border-t">
                    <h3 className="text-sm font-medium">Order Types</h3>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                        <span className="text-sm">Room Service (35%)</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                        <span className="text-sm">Dining (30%)</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                        <span className="text-sm">Spa (20%)</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                        <span className="text-sm">Other (15%)</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Staff Performance</CardTitle>
                  <CardDescription>Order completion rates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 border rounded-md">
                      <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center">
                        <span className="text-xs font-medium">MB</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Michael Brown</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <ClipboardCheck className="h-3 w-3" />
                          <span>Room Service</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">95%</p>
                        <p className="text-xs text-muted-foreground">Completion Rate</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 border rounded-md">
                      <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center">
                        <span className="text-xs font-medium">AJ</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Alice Johnson</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Utensils className="h-3 w-3" />
                          <span>Dining</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">92%</p>
                        <p className="text-xs text-muted-foreground">Completion Rate</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 border rounded-md">
                      <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center">
                        <span className="text-xs font-medium">EW</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Emily White</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Star className="h-3 w-3" />
                          <span>Spa</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">98%</p>
                        <p className="text-xs text-muted-foreground">Completion Rate</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="menu">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Menu Management</CardTitle>
                    <div className="flex gap-2">
                      <Input placeholder="Search menu..." className="max-w-xs" />
                      <Button>
                        <Utensils className="h-4 w-4 mr-2" />
                        Add Item
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Availability</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Coffee</TableCell>
                        <TableCell>Beverage</TableCell>
                        <TableCell>$3.50</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-none">
                            In Stock
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Edit</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Club Sandwich</TableCell>
                        <TableCell>Food</TableCell>
                        <TableCell>$12.00</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-none">
                            In Stock
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Edit</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Spa Package</TableCell>
                        <TableCell>Service</TableCell>
                        <TableCell>$50.00</TableCell>
                        <TableCell>
                          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-none">
                            Limited
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Edit</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Cocktail</TableCell>
                        <TableCell>Beverage</TableCell>
                        <TableCell>$8.00</TableCell>
                        <TableCell>
                          <Badge className="bg-red-100 text-red-800 hover:bg-red-100 border-none">
                            Out of Stock
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Edit</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Massage</TableCell>
                        <TableCell>Service</TableCell>
                        <TableCell>$60.00</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-none">
                            In Stock
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Edit</Button>
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
                  <CardTitle>Menu Status</CardTitle>
                  <CardDescription>Availability overview</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-40 flex items-center justify-center border-2 border-dashed rounded-lg mb-4">
                    <div className="text-center">
                      <BarChart3 className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Menu Status Chart</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                        <span className="text-sm">In Stock (75%)</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                        <span className="text-sm">Limited (15%)</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-red-500"></div>
                        <span className="text-sm">Out of Stock (10%)</span>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <div className="flex items-center justify-between p-3 border rounded-md">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-5 w-5 text-red-600" />
                          <div>
                            <p className="font-medium">Items to Restock</p>
                            <p className="text-sm text-muted-foreground">Low availability</p>
                          </div>
                        </div>
                        <div className="text-2xl font-bold">3</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Promotions</CardTitle>
                  <CardDescription>Special offers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border rounded p-3 space-y-2">
                    <div className="flex justify-between">
                      <p className="font-medium">Happy Hour</p>
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-none">
                        Active
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      50% off on selected cocktails from 5 PM to 7 PM.
                    </p>
                    <div className="flex justify-end">
                      <Button variant="default" size="sm">Edit</Button>
                    </div>
                  </div>
                  
                  <div className="border rounded p-3 space-y-2">
                    <div className="flex justify-between">
                      <p className="font-medium">Weekend Brunch</p>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-none">
                        Scheduled
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Special brunch menu available every Saturday and Sunday.
                    </p>
                    <div className="flex justify-end">
                      <Button variant="default" size="sm">Edit</Button>
                    </div>
                  </div>
                  
                  <div className="border rounded p-3 space-y-2">
                    <div className="flex justify-between">
                      <p className="font-medium">Spa Day Package</p>
                      <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-none">
                        Upcoming
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Full day spa package with massage, facial, and pool access.
                    </p>
                    <div className="flex justify-end">
                      <Button variant="default" size="sm">Edit</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="staff">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Staff Schedule</CardTitle>
                    <div className="flex gap-2">
                      <Select defaultValue="week">
                        <SelectTrigger className="w-[150px]">
                          <SelectValue placeholder="Select week" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="week">This Week</SelectItem>
                          <SelectItem value="month">Next Month</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button>
                        <Calendar className="h-4 w-4 mr-2" />
                        View Calendar
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Staff</TableHead>
                        <TableHead>Service</TableHead>
                        <TableHead>Monday</TableHead>
                        <TableHead>Tuesday</TableHead>
                        <TableHead>Wednesday</TableHead>
                        <TableHead>Thursday</TableHead>
                        <TableHead>Friday</TableHead>
                        <TableHead>Saturday</TableHead>
                        <TableHead>Sunday</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Michael Brown</TableCell>
                        <TableCell>Room Service</TableCell>
                        <TableCell>8 AM - 4 PM</TableCell>
                        <TableCell>8 AM - 4 PM</TableCell>
                        <TableCell>Off</TableCell>
                        <TableCell>8 AM - 4 PM</TableCell>
                        <TableCell>8 AM - 4 PM</TableCell>
                        <TableCell>Off</TableCell>
                        <TableCell>Off</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Alice Johnson</TableCell>
                        <TableCell>Dining</TableCell>
                        <TableCell>Off</TableCell>
                        <TableCell>9 AM - 5 PM</TableCell>
                        <TableCell>9 AM - 5 PM</TableCell>
                        <TableCell>Off</TableCell>
                        <TableCell>9 AM - 5 PM</TableCell>
                        <TableCell>9 AM - 5 PM</TableCell>
                        <TableCell>Off</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Emily White</TableCell>
                        <TableCell>Spa</TableCell>
                        <TableCell>10 AM - 6 PM</TableCell>
                        <TableCell>Off</TableCell>
                        <TableCell>10 AM - 6 PM</TableCell>
                        <TableCell>10 AM - 6 PM</TableCell>
                        <TableCell>Off</TableCell>
                        <TableCell>10 AM - 6 PM</TableCell>
                        <TableCell>10 AM - 6 PM</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">David Lee</TableCell>
                        <TableCell>Bar</TableCell>
                        <TableCell>5 PM - 1 AM</TableCell>
                        <TableCell>5 PM - 1 AM</TableCell>
                        <TableCell>Off</TableCell>
                        <TableCell>5 PM - 1 AM</TableCell>
                        <TableCell>5 PM - 1 AM</TableCell>
                        <TableCell>Off</TableCell>
                        <TableCell>5 PM - 1 AM</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Staff Availability</CardTitle>
                  <CardDescription>Scheduled hours</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-40 flex items-center justify-center border-2 border-dashed rounded-lg mb-4">
                    <div className="text-center">
                      <BarChart3 className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Staff Availability Chart</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                        <span className="text-sm">Michael Brown (40 hrs)</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                        <span className="text-sm">Alice Johnson (32 hrs)</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                        <span className="text-sm">Emily White (48 hrs)</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                        <span className="text-sm">David Lee (40 hrs)</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium">Total Hours Scheduled</p>
                          <p className="text-sm text-muted-foreground">This week</p>
                        </div>
                      </div>
                      <div className="text-2xl font-bold">160</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Requests</CardTitle>
                  <CardDescription>Time off and swaps</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border rounded p-3 space-y-2">
                    <div
