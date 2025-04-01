
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Calendar, CheckCircle, Clock, AlertTriangle, BarChart, Users,
  Briefcase, Clipboard, FileText, Settings, Printer, ArrowUpDown
} from "lucide-react";
import { useState } from "react";

const OperationalManagerDashboard = () => {
  const [selectedDateRange, setSelectedDateRange] = useState("today");
  const [selectedTaskCategory, setSelectedTaskCategory] = useState("all");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Operational Manager Dashboard</h1>
      
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
        <Button>
          <Printer className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">12 high priority</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">67% completion rate</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10</div>
            <p className="text-xs text-muted-foreground">3 delayed</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Issues</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">2 critical</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="tasks" className="w-full">
        <TabsList className="grid grid-cols-5 w-full md:w-auto">
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="schedule">Staff Schedule</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="efficiency">Efficiency</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tasks">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Operational Tasks</CardTitle>
                    <Button>
                      <Clipboard className="h-4 w-4 mr-2" />
                      Create Task
                    </Button>
                  </div>
                  <div className="flex gap-4 mt-4">
                    <div className="space-x-2">
                      <Button 
                        variant={selectedTaskCategory === "all" ? "default" : "outline"} 
                        size="sm"
                        onClick={() => setSelectedTaskCategory("all")}
                      >
                        All
                      </Button>
                      <Button 
                        variant={selectedTaskCategory === "high" ? "default" : "outline"} 
                        size="sm"
                        onClick={() => setSelectedTaskCategory("high")}
                      >
                        High Priority
                      </Button>
                      <Button 
                        variant={selectedTaskCategory === "maintenance" ? "default" : "outline"} 
                        size="sm"
                        onClick={() => setSelectedTaskCategory("maintenance")}
                      >
                        Maintenance
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-md mb-4">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Task</TableHead>
                          <TableHead>Assigned To</TableHead>
                          <TableHead>Priority</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Due Date</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">HVAC System Inspection</TableCell>
                          <TableCell>John Miller</TableCell>
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
                          <TableCell>Aug 30, 2023</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">Edit</Button>
                              <Button variant="ghost" size="sm">Details</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Pool Maintenance</TableCell>
                          <TableCell>Lisa Wong</TableCell>
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
                          <TableCell>Aug 28, 2023</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">Edit</Button>
                              <Button variant="ghost" size="sm">Details</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Kitchen Equipment Check</TableCell>
                          <TableCell>Carlos Rodriguez</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-200">
                              Low
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-gray-50 text-gray-700 hover:bg-gray-50 border-gray-200">
                              Pending
                            </Badge>
                          </TableCell>
                          <TableCell>Sep 05, 2023</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">Edit</Button>
                              <Button variant="ghost" size="sm">Details</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Lobby Furniture Rearrangement</TableCell>
                          <TableCell>Emma Davis</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50 border-yellow-200">
                              Medium
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-gray-50 text-gray-700 hover:bg-gray-50 border-gray-200">
                              Pending
                            </Badge>
                          </TableCell>
                          <TableCell>Sep 08, 2023</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">Edit</Button>
                              <Button variant="ghost" size="sm">Details</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Safety Inspection</TableCell>
                          <TableCell>Michael Brown</TableCell>
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
                          <TableCell>Sep 02, 2023</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">Edit</Button>
                              <Button variant="ghost" size="sm">Details</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Task Summary</CardTitle>
                  <CardDescription>Task status distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-40 flex items-center justify-center border-2 border-dashed rounded-lg mb-4">
                    <div className="text-center">
                      <BarChart className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Task Chart Placeholder</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Completed</span>
                        <span className="font-medium">67%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div className="h-2 bg-green-500 rounded-full w-[67%]"></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>In Progress</span>
                        <span className="font-medium">24%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div className="h-2 bg-yellow-500 rounded-full w-[24%]"></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Pending</span>
                        <span className="font-medium">9%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div className="h-2 bg-blue-500 rounded-full w-[9%]"></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Task Categories</CardTitle>
                  <CardDescription>Distribution by department</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Category</TableHead>
                        <TableHead>Tasks</TableHead>
                        <TableHead>% Complete</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Maintenance</TableCell>
                        <TableCell>15</TableCell>
                        <TableCell className="font-medium">73%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Housekeeping</TableCell>
                        <TableCell>8</TableCell>
                        <TableCell className="font-medium">88%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Front Desk</TableCell>
                        <TableCell>6</TableCell>
                        <TableCell className="font-medium">50%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>F&B</TableCell>
                        <TableCell>13</TableCell>
                        <TableCell className="font-medium">62%</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="schedule">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Staff Schedule</CardTitle>
                    <div className="flex gap-2">
                      <Button variant="outline">
                        <Calendar className="h-4 w-4 mr-2" />
                        Full Calendar
                      </Button>
                      <Button>
                        <Users className="h-4 w-4 mr-2" />
                        Schedule Shift
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <div className="space-x-2">
                        <Button variant="outline" size="sm">Today</Button>
                        <Button variant="ghost" size="sm">Week</Button>
                        <Button variant="ghost" size="sm">Month</Button>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">August 10, 2023</Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="border rounded-md">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[150px]">Department</TableHead>
                            <TableHead>Morning (6AM-2PM)</TableHead>
                            <TableHead>Afternoon (2PM-10PM)</TableHead>
                            <TableHead>Night (10PM-6AM)</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">Front Desk</TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="bg-blue-50 p-1 rounded text-xs">Sarah Johnson</div>
                                <div className="bg-blue-50 p-1 rounded text-xs">David Chen</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="bg-blue-50 p-1 rounded text-xs">Emily Wu</div>
                                <div className="bg-blue-50 p-1 rounded text-xs">James Wilson</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="bg-blue-50 p-1 rounded text-xs">Robert Kim</div>
                              </div>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Housekeeping</TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="bg-green-50 p-1 rounded text-xs">Maria Garcia</div>
                                <div className="bg-green-50 p-1 rounded text-xs">Lisa Wong</div>
                                <div className="bg-green-50 p-1 rounded text-xs">Pedro Martinez</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="bg-green-50 p-1 rounded text-xs">Carlos Rodriguez</div>
                                <div className="bg-green-50 p-1 rounded text-xs">Ana Perez</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="bg-green-50 p-1 rounded text-xs">Jose Sanchez</div>
                              </div>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Food & Beverage</TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="bg-amber-50 p-1 rounded text-xs">Michael Brown (Chef)</div>
                                <div className="bg-amber-50 p-1 rounded text-xs">Sophia Lee</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="bg-amber-50 p-1 rounded text-xs">Daniel Smith (Chef)</div>
                                <div className="bg-amber-50 p-1 rounded text-xs">Amy Taylor</div>
                                <div className="bg-amber-50 p-1 rounded text-xs">Thomas Jackson</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="bg-amber-50 p-1 rounded text-xs">Emma Davis</div>
                              </div>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Maintenance</TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="bg-purple-50 p-1 rounded text-xs">John Miller</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="bg-purple-50 p-1 rounded text-xs">Steve Williams</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="bg-red-50 p-1 rounded text-xs font-medium">Unstaffed</div>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Staffing Overview</CardTitle>
                  <CardDescription>Current shift coverage</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium">Total Staff On Duty</p>
                          <p className="text-sm text-muted-foreground">Current shift</p>
                        </div>
                      </div>
                      <div className="text-2xl font-bold">18</div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Front Desk</span>
                        <span>2/3 (1 needed)</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div className="h-2 bg-yellow-500 rounded-full w-2/3"></div>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span>Housekeeping</span>
                        <span>3/3 (Fully staffed)</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div className="h-2 bg-green-500 rounded-full w-full"></div>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span>Food & Beverage</span>
                        <span>3/3 (Fully staffed)</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div className="h-2 bg-green-500 rounded-full w-full"></div>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span>Maintenance</span>
                        <span>1/2 (1 needed)</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div className="h-2 bg-yellow-500 rounded-full w-1/2"></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Shift Changes</CardTitle>
                  <CardDescription>Schedule changes for next 24 hours</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border rounded p-3 space-y-2">
                    <div className="flex justify-between">
                      <p className="font-medium">Robert Kim (Front Desk)</p>
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-none">
                        Swap
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Swapping with Emily Wu for tomorrow's morning shift (6AM-2PM)
                    </p>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">Deny</Button>
                      <Button variant="default" size="sm">Approve</Button>
                    </div>
                  </div>
                  
                  <div className="border rounded p-3 space-y-2">
                    <div className="flex justify-between">
                      <p className="font-medium">Maria Garcia (Housekeeping)</p>
                      <Badge className="bg-red-100 text-red-800 hover:bg-red-100 border-none">
                        Time Off
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Requested sick leave for tomorrow's afternoon shift
                    </p>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">Deny</Button>
                      <Button variant="default" size="sm">Approve</Button>
                    </div>
                  </div>
                  
                  <div className="border rounded p-3 space-y-2">
                    <div className="flex justify-between">
                      <p className="font-medium">Maintenance Night Shift</p>
                      <Badge className="bg-red-100 text-red-800 hover:bg-red-100 border-none">
                        Unstaffed
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Need to assign staff for tonight's shift (10PM-6AM)
                    </p>
                    <div className="flex justify-end">
                      <Button variant="default" size="sm">Assign Staff</Button>
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
                    <CardTitle>Inventory Management</CardTitle>
                    <div className="flex gap-2">
                      <Button variant="outline">
                        <FileText className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                      <Button>
                        <Clipboard className="h-4 w-4 mr-2" />
                        New Order
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex gap-2">
                      <Select defaultValue="all">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Filter by category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Categories</SelectItem>
                          <SelectItem value="linens">Linens & Bedding</SelectItem>
                          <SelectItem value="cleaning">Cleaning Supplies</SelectItem>
                          <SelectItem value="amenities">Guest Amenities</SelectItem>
                          <SelectItem value="maintenance">Maintenance</SelectItem>
                          <SelectItem value="food">Food & Beverage</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select defaultValue="all">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="normal">Normal Stock</SelectItem>
                          <SelectItem value="low">Low Stock</SelectItem>
                          <SelectItem value="critical">Critical</SelectItem>
                          <SelectItem value="ordered">Ordered</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Input placeholder="Search inventory..." className="max-w-xs" />
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>
                          <Button variant="ghost" className="flex items-center gap-1 p-0 h-auto font-semibold">
                            Item Name
                            <ArrowUpDown className="h-3 w-3" />
                          </Button>
                        </TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Current Stock</TableHead>
                        <TableHead>Min. Stock</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Order</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Bath Towels (White)</TableCell>
                        <TableCell>Linens & Bedding</TableCell>
                        <TableCell>120</TableCell>
                        <TableCell>50</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">
                            Normal
                          </Badge>
                        </TableCell>
                        <TableCell>Jul 15, 2023</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Order</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Hand Soap</TableCell>
                        <TableCell>Guest Amenities</TableCell>
                        <TableCell>42</TableCell>
                        <TableCell>50</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50 border-yellow-200">
                            Low Stock
                          </Badge>
                        </TableCell>
                        <TableCell>Jul 28, 2023</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Order</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">All-Purpose Cleaner</TableCell>
                        <TableCell>Cleaning Supplies</TableCell>
                        <TableCell>8</TableCell>
                        <TableCell>20</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50 border-red-200">
                            Critical
                          </Badge>
                        </TableCell>
                        <TableCell>Aug 02, 2023</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Order</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Light Bulbs (LED)</TableCell>
                        <TableCell>Maintenance</TableCell>
                        <TableCell>45</TableCell>
                        <TableCell>30</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">
                            Normal
                          </Badge>
                        </TableCell>
                        <TableCell>Jun 22, 2023</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Order</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Coffee Pods</TableCell>
                        <TableCell>Food & Beverage</TableCell>
                        <TableCell>15</TableCell>
                        <TableCell>50</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-200">
                            Ordered
                          </Badge>
                        </TableCell>
                        <TableCell>Aug 08, 2023</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Track</Button>
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
                  <CardTitle>Inventory Summary</CardTitle>
                  <CardDescription>Stock level breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-40 flex items-center justify-center border-2 border-dashed rounded-lg mb-4">
                    <div className="text-center">
                      <BarChart className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Inventory Status Chart</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                        <span className="text-sm">Normal Stock (62)</span>
                      </div>
                      <span className="text-sm font-medium">62%</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                        <span className="text-sm">Low Stock (24)</span>
                      </div>
                      <span className="text-sm font-medium">24%</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-red-500"></div>
                        <span className="text-sm">Critical (8)</span>
                      </div>
                      <span className="text-sm font-medium">8%</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                        <span className="text-sm">Ordered (6)</span>
                      </div>
                      <span className="text-sm font-medium">6%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>Latest inventory purchases</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border rounded p-3 space-y-2">
                    <div className="flex justify-between">
                      <p className="font-medium">Coffee Pods (200 pcs)</p>
                      <p className="text-sm">$320</p>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Order #12458</span>
                      <span>Aug 08, 2023</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-none">
                        In Transit
                      </Badge>
                      <Button variant="ghost" size="sm">Track</Button>
                    </div>
                  </div>
                  
                  <div className="border rounded p-3 space-y-2">
                    <div className="flex justify-between">
                      <p className="font-medium">Hand Soap (100 bottles)</p>
                      <p className="text-sm">$285</p>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Order #12457</span>
                      <span>Jul 28, 2023</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-none">
                        Delivered
                      </Badge>
                      <Button variant="ghost" size="sm">Details</Button>
                    </div>
                  </div>
                  
                  <div className="border rounded p-3 space-y-2">
                    <div className="flex justify-between">
                      <p className="font-medium">Bed Sheets (King, 50 sets)</p>
                      <p className="text-sm">$1,250</p>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Order #12452</span>
                      <span>Jul 15, 2023</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-none">
                        Delivered
                      </Badge>
                      <Button variant="ghost" size="sm">Details</Button>
                    </div>
                  </div>
                  
                  <Button className="w-full">
                    <Clipboard className="h-4 w-4 mr-2" />
                    View All Orders
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="reports">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-3">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Operational Reports</CardTitle>
                    <div className="flex gap-2">
                      <Select defaultValue="monthly">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Report period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily Report</SelectItem>
                          <SelectItem value="weekly">Weekly Report</SelectItem>
                          <SelectItem value="monthly">Monthly Report</SelectItem>
                          <SelectItem value="quarterly">Quarterly Report</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button>
                        <FileText className="h-4 w-4 mr-2" />
                        Generate Report
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Occupancy Rate</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">78.5%</div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
                          <span className="text-green-500">4.2%</span>
                          <span className="ml-1">vs. last month</span>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Average Daily Rate</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">$185</div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
                          <span className="text-green-500">2.8%</span>
                          <span className="ml-1">vs. last month</span>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">RevPAR</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">$145</div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
                          <span className="text-green-500">7.1%</span>
                          <span className="ml-1">vs. last month</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="h-60 flex items-center justify-center border-2 border-dashed rounded-lg mb-6">
                    <div className="text-center">
                      <BarChart className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Monthly Performance Metrics Chart</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Department Performance</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Department</TableHead>
                              <TableHead>Efficiency</TableHead>
                              <TableHead>Tasks Completed</TableHead>
                              <TableHead>Issues</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell>Front Desk</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1">
                                  <span>92%</span>
                                  <ArrowUpRight className="h-3 w-3 text-green-500" />
                                </div>
                              </TableCell>
                              <TableCell>124</TableCell>
                              <TableCell>3</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Housekeeping</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1">
                                  <span>88%</span>
                                  <ArrowUpRight className="h-3 w-3 text-green-500" />
                                </div>
                              </TableCell>
                              <TableCell>342</TableCell>
                              <TableCell>8</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>F&B</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1">
                                  <span>85%</span>
                                  <ArrowDownRight className="h-3 w-3 text-red-500" />
                                </div>
                              </TableCell>
                              <TableCell>215</TableCell>
                              <TableCell>12</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Maintenance</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1">
                                  <span>90%</span>
                                  <ArrowUpRight className="h-3 w-3 text-green-500" />
                                </div>
                              </TableCell>
                              <TableCell>98</TableCell>
                              <TableCell>5</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Room Turnover</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Room Type</TableHead>
                              <TableHead>Avg. Cleaning Time</TableHead>
                              <TableHead>Rooms Cleaned</TableHead>
                              <TableHead>Avg. Inspection Score</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell>Standard</TableCell>
                              <TableCell>32 mins</TableCell>
                              <TableCell>240</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1">
                                  <span>4.7/5</span>
                                </div>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Deluxe</TableCell>
                              <TableCell>45 mins</TableCell>
                              <TableCell>120</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1">
                                  <span>4.8/5</span>
                                </div>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Suite</TableCell>
                              <TableCell>62 mins</TableCell>
                              <TableCell>45</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1">
                                  <span>4.9/5</span>
                                </div>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Presidential</TableCell>
                              <TableCell>90 mins</TableCell>
                              <TableCell>5</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1">
                                  <span>5.0/5</span>
                                </div>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="efficiency">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Efficiency Metrics</CardTitle>
                  <CardDescription>Performance trends over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-60 flex items-center justify-center border-2 border-dashed rounded-lg mb-6">
                    <div className="text-center">
                      <LineChart className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Efficiency Trends Chart</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Task Completion</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">88%</div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
                          <span className="text-green-500">3.2%</span>
                          <span className="ml-1">vs. last period</span>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Response Time</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">14 min</div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <ArrowDownRight className="h-3 w-3 mr-1 text-green-500" />
                          <span className="text-green-500">-2.5 min</span>
                          <span className="ml-1">vs. last period</span>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Resource Utilization</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">92%</div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
                          <span className="text-green-500">1.8%</span>
                          <span className="ml-1">vs. last period</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Metric</TableHead>
                        <TableHead>Current</TableHead>
                        <TableHead>Target</TableHead>
                        <TableHead>Last Period</TableHead>
                        <TableHead>Change</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Avg. Check-in Time</TableCell>
                        <TableCell>3.5 min</TableCell>
                        <TableCell>3.0 min</TableCell>
                        <TableCell>4.2 min</TableCell>
                        <TableCell className="text-green-600">-0.7 min</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Room Cleaning Time</TableCell>
                        <TableCell>34 min</TableCell>
                        <TableCell>30 min</TableCell>
                        <TableCell>38 min</TableCell>
                        <TableCell className="text-green-600">-4 min</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Room Service Delivery</TableCell>
                        <TableCell>22 min</TableCell>
                        <TableCell>20 min</TableCell>
                        <TableCell>25 min</TableCell>
                        <TableCell className="text-green-600">-3 min</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Maintenance Response</TableCell>
                        <TableCell>28 min</TableCell>
                        <TableCell>25 min</TableCell>
                        <TableCell>35 min</TableCell>
                        <TableCell className="text-green-600">-7 min</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Guest Request Resolution</TableCell>
                        <TableCell>18 min</TableCell>
                        <TableCell>15 min</TableCell>
                        <TableCell>22 min</TableCell>
                        <TableCell className="text-green-600">-4 min</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Process Optimization</CardTitle>
                  <CardDescription>Areas for improvement</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <p className="font-medium">Check-in Process</p>
                      <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-none">
                        Needs Attention
                      </Badge>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full">
                      <div className="h-2 bg-amber-500 rounded-full w-3/4"></div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Front desk check-in time is 16% longer during peak hours (4-7pm).
                      Consider additional staff allocation during these times.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <p className="font-medium">Housekeeping Workflow</p>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-none">
                        Optimized
                      </Badge>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full">
                      <div className="h-2 bg-green-500 rounded-full w-[95%]"></div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      New housekeeping workflow has reduced room turnaround time by 10% while
                      improving quality scores by 5%.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <p className="font-medium">Maintenance Request Handling</p>
                      <Badge className="bg-red-100 text-red-800 hover:bg-red-100 border-none">
                        Needs Improvement
                      </Badge>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full">
                      <div className="h-2 bg-red-500 rounded-full w-1/2"></div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      28% of maintenance requests take longer than the 30-minute response target.
                      Review staffing and prioritization system.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <p className="font-medium">Inventory Management</p>
                      <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-none">
                        Needs Attention
                      </Badge>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full">
                      <div className="h-2 bg-amber-500 rounded-full w-2/3"></div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Stock-outs occurred for 8 high-use items in the past month.
                      Adjust minimum stock levels and review order frequency.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Improvement Initiatives</CardTitle>
                  <CardDescription>Ongoing optimization projects</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border rounded p-3 space-y-2">
                    <div className="flex justify-between">
                      <p className="font-medium">Mobile Check-in Implementation</p>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-none">
                        On Track
                      </Badge>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Start: Jul 1, 2023</span>
                      <span>Target: Sep 30, 2023</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Progress</span>
                        <span>65%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div className="h-2 bg-blue-500 rounded-full w-[65%]"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded p-3 space-y-2">
                    <div className="flex justify-between">
                      <p className="font-medium">Housekeeping Task Optimization</p>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-none">
                        Completed
                      </Badge>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Start: May 15, 2023</span>
                      <span>Completed: Jul 20, 2023</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Results</span>
                        <span className="text-green-600">10% time reduction</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded p-3 space-y-2">
                    <div className="flex justify-between">
                      <p className="font-medium">Maintenance Workflow Redesign</p>
                      <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-none">
                        Delayed
                      </Badge>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Start: Jun 1, 2023</span>
                      <span>Target: Aug 15, 2023 (at risk)</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Progress</span>
                        <span>40%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div className="h-2 bg-amber-500 rounded-full w-[40%]"></div>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full">
                    <Settings className="h-4 w-4 mr-2" />
                    View All Initiatives
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Missing components used in layout
const ChevronLeft = ({ className }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
};

const ChevronRight = ({ className }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
};

const ArrowUpRight = ({ className }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="7" y1="17" x2="17" y2="7"></line>
      <polyline points="7 7 17 7 17 17"></polyline>
    </svg>
  );
};

const ArrowDownRight = ({ className }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="7" y1="7" x2="17" y2="17"></line>
      <polyline points="17 7 17 17 7 17"></polyline>
    </svg>
  );
};

export default OperationalManagerDashboard;
