import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Wrench, AlertTriangle, CheckCircle, Clock, Calendar, Settings,
  FileText, Building, BarChart3, User, Home, 
  HelpCircle, Filter, RefreshCw, Workflow, Activity, Search,
  ArrowDownToLine
} from "lucide-react";
import { useState } from "react";

const MaintenanceManagerDashboard = () => {
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [selectedDateRange, setSelectedDateRange] = useState("week");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Maintenance Manager Dashboard</h1>
      
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
              <SelectItem value="type">Work Type</SelectItem>
              <SelectItem value="technician">Technician</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Work Orders</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32</div>
            <p className="text-xs text-muted-foreground">8 created today</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Critical Issues</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground text-red-500">Requires immediate attention</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">5 completed today</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">11</div>
            <p className="text-xs text-muted-foreground">For next 7 days</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="workorders" className="w-full">
        <TabsList className="grid grid-cols-5 w-full md:w-auto">
          <TabsTrigger value="workorders">Work Orders</TabsTrigger>
          <TabsTrigger value="preventive">Preventive Maintenance</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="assets">Asset Management</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="workorders">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Active Work Orders</CardTitle>
                    <Button>
                      <Wrench className="h-4 w-4 mr-2" />
                      Create Work Order
                    </Button>
                  </div>
                  <div className="flex items-center gap-4 mt-4">
                    <Input 
                      placeholder="Search work orders..." 
                      className="max-w-sm" 
                    />
                    <div className="flex items-center gap-2">
                      <Button 
                        variant={selectedPriority === "all" ? "default" : "outline"} 
                        size="sm"
                        onClick={() => setSelectedPriority("all")}
                      >
                        All
                      </Button>
                      <Button 
                        variant={selectedPriority === "high" ? "default" : "outline"} 
                        size="sm"
                        className="border-red-200 text-red-700 hover:bg-red-50"
                        onClick={() => setSelectedPriority("high")}
                      >
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        High
                      </Button>
                      <Button 
                        variant={selectedPriority === "medium" ? "default" : "outline"} 
                        size="sm"
                        className="border-yellow-200 text-yellow-700 hover:bg-yellow-50"
                        onClick={() => setSelectedPriority("medium")}
                      >
                        Medium
                      </Button>
                      <Button 
                        variant={selectedPriority === "low" ? "default" : "outline"} 
                        size="sm"
                        className="border-blue-200 text-blue-700 hover:bg-blue-50"
                        onClick={() => setSelectedPriority("low")}
                      >
                        Low
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>
                          <Button variant="ghost" className="flex items-center gap-1 p-0 h-auto font-semibold">
                            Issue
                            <ArrowUpDownIcon className="h-3 w-3" />
                          </Button>
                        </TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Reported By</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Assigned To</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Leaking Shower</TableCell>
                        <TableCell>Room 304</TableCell>
                        <TableCell>Front Desk</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50 border-red-200">
                            High
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50 border-yellow-200">
                            In Progress
                          </Badge>
                        </TableCell>
                        <TableCell>Michael Brown</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">View</Button>
                            <Button variant="ghost" size="sm">Edit</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">AC Not Working</TableCell>
                        <TableCell>Room 215</TableCell>
                        <TableCell>Guest</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50 border-red-200">
                            High
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-200">
                            Scheduled
                          </Badge>
                        </TableCell>
                        <TableCell>David Kim</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">View</Button>
                            <Button variant="ghost" size="sm">Edit</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Light Bulb Replacement</TableCell>
                        <TableCell>Hallway 2</TableCell>
                        <TableCell>Housekeeping</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-200">
                            Low
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-200">
                            Pending
                          </Badge>
                        </TableCell>
                        <TableCell>Unassigned</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">View</Button>
                            <Button variant="ghost" size="sm">Assign</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">TV Not Working</TableCell>
                        <TableCell>Room 412</TableCell>
                        <TableCell>Guest</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50 border-yellow-200">
                            Medium
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">
                            Completed
                          </Badge>
                        </TableCell>
                        <TableCell>Sarah Johnson</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">View</Button>
                            <Button variant="ghost" size="sm">Log</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Broken Chair</TableCell>
                        <TableCell>Restaurant</TableCell>
                        <TableCell>F&B Staff</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50 border-yellow-200">
                            Medium
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50 border-yellow-200">
                            In Progress
                          </Badge>
                        </TableCell>
                        <TableCell>Robert Lee</TableCell>
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
                  <CardTitle>Work Order Summary</CardTitle>
                  <CardDescription>Status distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-40 flex items-center justify-center border-2 border-dashed rounded-lg mb-4">
                    <div className="text-center">
                      <BarChart3 className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Work Order Status Chart</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Pending</span>
                        <span className="font-medium">7 (22%)</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div className="h-2 bg-blue-500 rounded-full w-[22%]"></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Scheduled</span>
                        <span className="font-medium">4 (12%)</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div className="h-2 bg-purple-500 rounded-full w-[12%]"></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>In Progress</span>
                        <span className="font-medium">3 (9%)</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div className="h-2 bg-yellow-500 rounded-full w-[9%]"></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Completed</span>
                        <span className="font-medium">18 (56%)</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div className="h-2 bg-green-500 rounded-full w-[56%]"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mt-6 pt-4 border-t">
                    <h3 className="text-sm font-medium">Work Order Types</h3>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                        <span className="text-sm">Plumbing (28%)</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                        <span className="text-sm">Electrical (22%)</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                        <span className="text-sm">HVAC (18%)</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                        <span className="text-sm">Furniture (15%)</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-gray-500"></div>
                        <span className="text-sm">Other (17%)</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Technician Workload</CardTitle>
                  <CardDescription>Current assignments</CardDescription>
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
                          <Wrench className="h-3 w-3" />
                          <span>Plumbing Specialist</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">4</p>
                        <p className="text-xs text-muted-foreground">Active tasks</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 border rounded-md">
                      <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center">
                        <span className="text-xs font-medium">DK</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">David Kim</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Wrench className="h-3 w-3" />
                          <span>HVAC Technician</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">3</p>
                        <p className="text-xs text-muted-foreground">Active tasks</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 border rounded-md">
                      <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center">
                        <span className="text-xs font-medium">SJ</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Sarah Johnson</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Wrench className="h-3 w-3" />
                          <span>Electronics Technician</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">2</p>
                        <p className="text-xs text-muted-foreground">Active tasks</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 border rounded-md">
                      <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center">
                        <span className="text-xs font-medium">RL</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Robert Lee</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Wrench className="h-3 w-3" />
                          <span>General Maintenance</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">5</p>
                        <p className="text-xs text-muted-foreground">Active tasks</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="preventive">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Preventive Maintenance Schedule</CardTitle>
                    <div className="flex gap-2">
                      <Button variant="outline">
                        <Calendar className="h-4 w-4 mr-2" />
                        Calendar View
                      </Button>
                      <Button>
                        <Settings className="h-4 w-4 mr-2" />
                        Schedule Task
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Maintenance Task</TableHead>
                        <TableHead>Area/Equipment</TableHead>
                        <TableHead>Frequency</TableHead>
                        <TableHead>Last Performed</TableHead>
                        <TableHead>Next Due</TableHead>
                        <TableHead>Assigned To</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">HVAC Filter Change</TableCell>
                        <TableCell>All Guest Rooms</TableCell>
                        <TableCell>Monthly</TableCell>
                        <TableCell>Jul 15, 2023</TableCell>
                        <TableCell className="font-medium text-amber-600">Aug 15, 2023</TableCell>
                        <TableCell>David Kim</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-none">
                            On Schedule
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Start</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Pool Equipment Check</TableCell>
                        <TableCell>Swimming Pool</TableCell>
                        <TableCell>Weekly</TableCell>
                        <TableCell>Aug 7, 2023</TableCell>
                        <TableCell className="font-medium text-red-600">Aug 14, 2023</TableCell>
                        <TableCell>Michael Brown</TableCell>
                        <TableCell>
                          <Badge className="bg-red-100 text-red-800 hover:bg-red-100 border-none">
                            Overdue
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Start</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Elevator Inspection</TableCell>
                        <TableCell>All Elevators</TableCell>
                        <TableCell>Quarterly</TableCell>
                        <TableCell>Jun 10, 2023</TableCell>
                        <TableCell className="font-medium">Sep 10, 2023</TableCell>
                        <TableCell>Vendor (ABC Elevators)</TableCell>
                        <TableCell>
                          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-none">
                            Scheduled
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Details</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Kitchen Equipment Service</TableCell>
                        <TableCell>Main Kitchen</TableCell>
                        <TableCell>Monthly</TableCell>
                        <TableCell>Jul 25, 2023</TableCell>
                        <TableCell className="font-medium">Aug 25, 2023</TableCell>
                        <TableCell>Robert Lee</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-none">
                            On Schedule
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Start</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Emergency Lighting Test</TableCell>
                        <TableCell>All Floors</TableCell>
                        <TableCell>Monthly</TableCell>
                        <TableCell>Jul 30, 2023</TableCell>
                        <TableCell className="font-medium text-amber-600">Aug 30, 2023</TableCell>
                        <TableCell>Sarah Johnson</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-none">
                            On Schedule
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Start</Button>
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
                  <CardTitle>PM Compliance</CardTitle>
                  <CardDescription>Preventive maintenance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-40 flex items-center justify-center border-2 border-dashed rounded-lg mb-4">
                    <div className="text-center">
                      <BarChart3 className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">PM Compliance Chart</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-2">
                        <Activity className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium">PM Compliance Rate</p>
                          <p className="text-sm text-muted-foreground">Last 30 days</p>
                        </div>
                      </div>
                      <div className="text-2xl font-bold">92%</div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-amber-600" />
                        <div>
                          <p className="font-medium">Overdue Tasks</p>
                          <p className="text-sm text-muted-foreground">Needs attention</p>
                        </div>
                      </div>
                      <div className="text-2xl font-bold">3</div>
                    </div>
                    
                    <div className="space-y-2 pt-2">
                      <h3 className="text-sm font-medium">PM Compliance by Area</h3>
                      <Table>
                        <TableBody className="text-sm">
                          <TableRow>
                            <TableCell>Guest Rooms</TableCell>
                            <TableCell className="text-right">96%</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Common Areas</TableCell>
                            <TableCell className="text-right">93%</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Kitchen & F&B</TableCell>
                            <TableCell className="text-right">88%</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Swimming Pool</TableCell>
                            <TableCell className="text-right">85%</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Maintenance</CardTitle>
                  <CardDescription>Due in next 7 days</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border rounded p-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Tomorrow</span>
                    </div>
                    <h3 className="font-medium">Pool Water Testing</h3>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Swimming Pool</span>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-none">
                        Daily Task
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="border rounded p-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Aug 18, 2023</span>
                    </div>
                    <h3 className="font-medium">Fire Alarm Testing</h3>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">All Floors</span>
                      <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-none">
                        High Priority
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="border rounded p-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Aug 20, 2023</span>
                    </div>
                    <h3 className="font-medium">Landscape Maintenance</h3>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Exterior</span>
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-none">
                        Vendor
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="inventory">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Maintenance Inventory</CardTitle>
                    <div className="flex gap-2">
                      <Input placeholder="Search inventory..." className="max-w-xs" />
                      <Button>
                        <Building className="h-4 w-4 mr-2" />
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
                        <TableHead>Current Stock</TableHead>
                        <TableHead>Min. Level</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Order</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">HVAC Filters (Standard)</TableCell>
                        <TableCell>HVAC</TableCell>
                        <TableCell>45</TableCell>
                        <TableCell>25</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-none">
                            In Stock
                          </Badge>
                        </TableCell>
                        <TableCell>Jul 10, 2023</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Order</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Shower Heads</TableCell>
                        <TableCell>Plumbing</TableCell>
                        <TableCell>12</TableCell>
                        <TableCell>15</TableCell>
                        <TableCell>
                          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-none">
                            Low Stock
                          </Badge>
                        </TableCell>
                        <TableCell>Jun 25, 2023</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Order</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Light Bulbs (LED, 10W)</TableCell>
                        <TableCell>Electrical</TableCell>
                        <TableCell>85</TableCell>
                        <TableCell>50</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-none">
                            In Stock
                          </Badge>
                        </TableCell>
                        <TableCell>Jul 22, 2023</
