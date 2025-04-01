
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Users, UserPlus, UserMinus, Calendar, FileText, GraduationCap, 
  Briefcase, DollarSign, Award, Clock, Clipboard, CheckCircle2 
} from "lucide-react";
import { useState } from "react";

const HRManagerDashboard = () => {
  const [activeEmployeeTab, setActiveEmployeeTab] = useState("all");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Human Resources Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">86</div>
            <p className="text-xs text-muted-foreground">Full-time: 64, Part-time: 22</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">New Hires</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Turnover</CardTitle>
            <UserMinus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">1.2% monthly rate</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Reviews</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Next 30 days</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="employees" className="w-full">
        <TabsList className="grid grid-cols-5 w-full md:w-auto">
          <TabsTrigger value="employees">Employees</TabsTrigger>
          <TabsTrigger value="recruitment">Recruitment</TabsTrigger>
          <TabsTrigger value="training">Training</TabsTrigger>
          <TabsTrigger value="payroll">Payroll</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="employees">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center flex-wrap gap-4">
                <CardTitle>Employee Directory</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setActiveEmployeeTab("all")} 
                    className={activeEmployeeTab === "all" ? "bg-primary text-primary-foreground" : ""}>
                    All
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setActiveEmployeeTab("active")}
                    className={activeEmployeeTab === "active" ? "bg-primary text-primary-foreground" : ""}>
                    Active
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setActiveEmployeeTab("onboarding")}
                    className={activeEmployeeTab === "onboarding" ? "bg-primary text-primary-foreground" : ""}>
                    Onboarding
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setActiveEmployeeTab("offboarding")}
                    className={activeEmployeeTab === "offboarding" ? "bg-primary text-primary-foreground" : ""}>
                    Offboarding
                  </Button>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <Label htmlFor="department-filter">Department:</Label>
                  <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      <SelectItem value="front-desk">Front Desk</SelectItem>
                      <SelectItem value="housekeeping">Housekeeping</SelectItem>
                      <SelectItem value="food">Food & Beverage</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="admin">Administration</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1 min-w-[200px]">
                  <Input placeholder="Search employees..." />
                </div>
                <Button>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Employee
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Sarah Johnson</TableCell>
                    <TableCell>Front Desk</TableCell>
                    <TableCell>Manager</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">
                        Active
                      </Badge>
                    </TableCell>
                    <TableCell>Mar 15, 2020</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <FileText className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Calendar className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Robert Chen</TableCell>
                    <TableCell>Housekeeping</TableCell>
                    <TableCell>Supervisor</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">
                        Active
                      </Badge>
                    </TableCell>
                    <TableCell>Jun 10, 2019</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <FileText className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Calendar className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Maria Garcia</TableCell>
                    <TableCell>Food & Beverage</TableCell>
                    <TableCell>Director</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">
                        Active
                      </Badge>
                    </TableCell>
                    <TableCell>Sep 5, 2021</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <FileText className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Calendar className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">James Wilson</TableCell>
                    <TableCell>Maintenance</TableCell>
                    <TableCell>Technician</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-200">
                        Onboarding
                      </Badge>
                    </TableCell>
                    <TableCell>Jul 1, 2023</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <FileText className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Clipboard className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="recruitment">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Open Positions</CardTitle>
                <CardDescription>Currently recruiting for these roles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded p-3 space-y-2">
                  <div className="flex justify-between">
                    <h3 className="font-medium">Front Desk Receptionist</h3>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-none">
                      3 Applicants
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Part-time | Posted: 3 days ago</p>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">View Applicants</Button>
                  </div>
                </div>
                
                <div className="border rounded p-3 space-y-2">
                  <div className="flex justify-between">
                    <h3 className="font-medium">Housekeeping Staff</h3>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-none">
                      7 Applicants
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Full-time | Posted: 5 days ago</p>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">View Applicants</Button>
                  </div>
                </div>
                
                <div className="border rounded p-3 space-y-2">
                  <div className="flex justify-between">
                    <h3 className="font-medium">Sous Chef</h3>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-none">
                      2 Applicants
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Full-time | Posted: 1 day ago</p>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">View Applicants</Button>
                  </div>
                </div>
                
                <Button className="w-full">
                  <Briefcase className="h-4 w-4 mr-2" />
                  Post New Position
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Candidate Pipeline</CardTitle>
                <CardDescription>Application progress by stage</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Applied</span>
                    <Badge variant="outline">12</Badge>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div className="h-2 bg-blue-500 rounded-full w-full"></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Screening</span>
                    <Badge variant="outline">8</Badge>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div className="h-2 bg-blue-500 rounded-full w-2/3"></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Interview</span>
                    <Badge variant="outline">5</Badge>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div className="h-2 bg-blue-500 rounded-full w-1/2"></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Offer</span>
                    <Badge variant="outline">2</Badge>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div className="h-2 bg-blue-500 rounded-full w-1/6"></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Hired</span>
                    <Badge variant="outline">1</Badge>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div className="h-2 bg-blue-500 rounded-full w-[8%]"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Interview Schedule</CardTitle>
                <CardDescription>Upcoming interviews this week</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded p-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Today, 11:00 AM</span>
                  </div>
                  <h3 className="font-medium">Emma Watson</h3>
                  <p className="text-sm text-muted-foreground">Front Desk Receptionist</p>
                  <div className="flex justify-between">
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-none">
                      First Interview
                    </Badge>
                    <Button variant="ghost" size="sm">Details</Button>
                  </div>
                </div>
                
                <div className="border rounded p-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Tomorrow, 2:30 PM</span>
                  </div>
                  <h3 className="font-medium">Michael Rodriguez</h3>
                  <p className="text-sm text-muted-foreground">Sous Chef</p>
                  <div className="flex justify-between">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-none">
                      Second Interview
                    </Badge>
                    <Button variant="ghost" size="sm">Details</Button>
                  </div>
                </div>
                
                <div className="border rounded p-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Fri, 10:00 AM</span>
                  </div>
                  <h3 className="font-medium">David Kim</h3>
                  <p className="text-sm text-muted-foreground">Housekeeping Staff</p>
                  <div className="flex justify-between">
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-none">
                      First Interview
                    </Badge>
                    <Button variant="ghost" size="sm">Details</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="training">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Training Programs</CardTitle>
                <CardDescription>Active programs and completion rates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded p-3 space-y-2">
                  <div className="flex justify-between">
                    <h3 className="font-medium">Customer Service Excellence</h3>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-none">
                      Active
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Front Desk & F&B Staff | 24 Participants</p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Completion</span>
                      <span>75%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full">
                      <div className="h-2 bg-green-500 rounded-full w-3/4"></div>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded p-3 space-y-2">
                  <div className="flex justify-between">
                    <h3 className="font-medium">Health & Safety Protocol</h3>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-none">
                      Active
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">All Staff | 86 Participants</p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Completion</span>
                      <span>92%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full">
                      <div className="h-2 bg-green-500 rounded-full w-[92%]"></div>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded p-3 space-y-2">
                  <div className="flex justify-between">
                    <h3 className="font-medium">Management Leadership</h3>
                    <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-none">
                      Upcoming
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Supervisors & Managers | 12 Participants</p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Starts in 7 days</span>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full">
                  <GraduationCap className="h-4 w-4 mr-2" />
                  Create New Training
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Certification Tracking</CardTitle>
                <CardDescription>Required certifications by department</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Certification</TableHead>
                      <TableHead>Required</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Food Safety</TableCell>
                      <TableCell>F&B Staff (24)</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">
                          100% Complete
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>First Aid & CPR</TableCell>
                      <TableCell>All Staff (86)</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50 border-amber-200">
                          82% Complete
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Fire Safety</TableCell>
                      <TableCell>All Staff (86)</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">
                          95% Complete
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Pool Maintenance</TableCell>
                      <TableCell>Maintenance (8)</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50 border-red-200">
                          75% Complete
                        </Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Training Calendar</CardTitle>
                <CardDescription>Upcoming training events</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded p-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Today, 2:00 PM - 4:00 PM</span>
                  </div>
                  <h3 className="font-medium">Guest Relations Workshop</h3>
                  <p className="text-sm text-muted-foreground">Conference Room A | Front Desk Staff</p>
                  <div className="flex justify-between">
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-none">
                      12 Attendees
                    </Badge>
                    <Button variant="ghost" size="sm">Details</Button>
                  </div>
                </div>
                
                <div className="border rounded p-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Tomorrow, 9:00 AM - 12:00 PM</span>
                  </div>
                  <h3 className="font-medium">First Aid Recertification</h3>
                  <p className="text-sm text-muted-foreground">Training Room B | All Departments</p>
                  <div className="flex justify-between">
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-none">
                      25 Attendees
                    </Badge>
                    <Button variant="ghost" size="sm">Details</Button>
                  </div>
                </div>
                
                <div className="border rounded p-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Aug 15, 1:00 PM - 3:00 PM</span>
                  </div>
                  <h3 className="font-medium">New Technology Orientation</h3>
                  <p className="text-sm text-muted-foreground">IT Lab | Reception & Reservations</p>
                  <div className="flex justify-between">
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-none">
                      8 Attendees
                    </Badge>
                    <Button variant="ghost" size="sm">Details</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="payroll">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Payroll Overview</CardTitle>
                <CardDescription>Current pay period: Jul 1 - Jul 15</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-8 w-8 text-green-600" />
                    <div>
                      <p className="text-sm font-medium">Total Payroll</p>
                      <p className="text-xl font-bold">$124,850.00</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border rounded-md">
                    <p className="text-sm font-medium">Regular Hours</p>
                    <p className="text-xl font-bold">3,240</p>
                  </div>
                  <div className="p-4 border rounded-md">
                    <p className="text-sm font-medium">Overtime Hours</p>
                    <p className="text-xl font-bold">186</p>
                  </div>
                </div>
                
                <div className="p-4 border rounded-md space-y-2">
                  <div className="flex justify-between">
                    <p className="text-sm font-medium">Payroll Processing</p>
                    <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-none">
                      In Progress
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">Payment date: Jul 20, 2023</p>
                  <div className="h-2 bg-gray-100 rounded-full mt-2">
                    <div className="h-2 bg-amber-500 rounded-full w-2/3"></div>
                  </div>
                </div>
                
                <Button className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  Run Payroll Report
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Compensation Analysis</CardTitle>
                <CardDescription>Department wage distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Department</TableHead>
                      <TableHead>Avg. Hourly</TableHead>
                      <TableHead>Headcount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Front Desk</TableCell>
                      <TableCell>$18.75</TableCell>
                      <TableCell>12</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Housekeeping</TableCell>
                      <TableCell>$16.50</TableCell>
                      <TableCell>24</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Food & Beverage</TableCell>
                      <TableCell>$19.25</TableCell>
                      <TableCell>18</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Maintenance</TableCell>
                      <TableCell>$22.00</TableCell>
                      <TableCell>8</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Management</TableCell>
                      <TableCell>$35.50</TableCell>
                      <TableCell>10</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <div className="mt-4">
                  <Button variant="outline" size="sm" className="w-full">
                    <Award className="h-4 w-4 mr-2" />
                    View Compensation Plans
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Time & Attendance</CardTitle>
                <CardDescription>Recent time tracking entries</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <div className="space-x-2">
                    <Button variant="outline" size="sm">Today</Button>
                    <Button variant="ghost" size="sm">Week</Button>
                    <Button variant="ghost" size="sm">Month</Button>
                  </div>
                  <Button variant="outline" size="sm">
                    <Clock className="h-4 w-4 mr-2" />
                    Time Sheet
                  </Button>
                </div>
                
                <div className="space-y-3 mt-2">
                  <div className="p-3 border rounded-md flex justify-between items-center">
                    <div>
                      <p className="font-medium">Sarah Johnson</p>
                      <p className="text-xs text-muted-foreground">Front Desk</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">8:02 AM - 4:15 PM</p>
                      <p className="text-xs text-muted-foreground">8.22 hrs</p>
                    </div>
                  </div>
                  
                  <div className="p-3 border rounded-md flex justify-between items-center">
                    <div>
                      <p className="font-medium">Robert Chen</p>
                      <p className="text-xs text-muted-foreground">Housekeeping</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">7:45 AM - 4:00 PM</p>
                      <p className="text-xs text-muted-foreground">8.25 hrs</p>
                    </div>
                  </div>
                  
                  <div className="p-3 border rounded-md flex justify-between items-center">
                    <div>
                      <p className="font-medium">Maria Garcia</p>
                      <p className="text-xs text-muted-foreground">F&B Director</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">9:15 AM - 6:30 PM</p>
                      <p className="text-xs text-muted-foreground">9.25 hrs</p>
                    </div>
                  </div>
                  
                  <div className="p-3 border rounded-md flex justify-between items-center">
                    <div>
                      <p className="font-medium">James Wilson</p>
                      <p className="text-xs text-muted-foreground">Maintenance</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">7:30 AM - 3:45 PM</p>
                      <p className="text-xs text-muted-foreground">8.25 hrs</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="performance">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Reviews</CardTitle>
                <CardDescription>Upcoming and recent evaluations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded p-3 space-y-2">
                  <div className="flex justify-between">
                    <h3 className="font-medium">Sarah Johnson</h3>
                    <Badge className="bg-red-100 text-red-800 hover:bg-red-100 border-none">
                      Overdue
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Front Desk Manager | Due: Jul 15, 2023</p>
                  <div className="flex justify-end">
                    <Button variant="default" size="sm">
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Complete Review
                    </Button>
                  </div>
                </div>
                
                <div className="border rounded p-3 space-y-2">
                  <div className="flex justify-between">
                    <h3 className="font-medium">Robert Chen</h3>
                    <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-none">
                      Due Soon
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Housekeeping Supervisor | Due: Aug 5, 2023</p>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">
                      Schedule Review
                    </Button>
                  </div>
                </div>
                
                <div className="border rounded p-3 space-y-2">
                  <div className="flex justify-between">
                    <h3 className="font-medium">Maria Garcia</h3>
                    <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-none">
                      Due Soon
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">F&B Director | Due: Aug 12, 2023</p>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">
                      Schedule Review
                    </Button>
                  </div>
                </div>
                
                <div className="border rounded p-3 space-y-2">
                  <div className="flex justify-between">
                    <h3 className="font-medium">David Kim</h3>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-none">
                      Completed
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Chef | Completed: Jul 2, 2023</p>
                  <div className="flex justify-end">
                    <Button variant="ghost" size="sm">
                      View Results
                    </Button>
                  </div>
                </div>
                
                <Button className="w-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  Create New Review Cycle
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Development Plans</CardTitle>
                <CardDescription>Employee growth and advancement tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Career Path</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Sarah Johnson</TableCell>
                      <TableCell>Operations Director</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">
                          On Track
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Robert Chen</TableCell>
                      <TableCell>Facilities Manager</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50 border-amber-200">
                          In Progress
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>James Wilson</TableCell>
                      <TableCell>Maintenance Supervisor</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50 border-amber-200">
                          In Progress
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Lisa Wong</TableCell>
                      <TableCell>Executive Chef</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">
                          On Track
                        </Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Team development progress</span>
                    <span className="font-medium">75%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div className="h-2 bg-blue-500 rounded-full w-3/4"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recognition & Awards</CardTitle>
                <CardDescription>Employee achievements and recognition</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded p-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-amber-500" />
                    <h3 className="font-medium">Employee of the Month</h3>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium">Maria Garcia</p>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-none">
                      July 2023
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Exceptional leadership in F&B department, resulting in 15% increase in customer satisfaction.
                  </p>
                </div>
                
                <div className="border rounded p-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-blue-500" />
                    <h3 className="font-medium">Outstanding Service Award</h3>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium">Carlos Rodriguez</p>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-none">
                      Q2 2023
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Consistently received excellent guest reviews for personalized service.
                  </p>
                </div>
                
                <div className="border rounded p-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-green-500" />
                    <h3 className="font-medium">Innovation Award</h3>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium">Sarah Johnson</p>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-none">
                      Q2 2023
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Implemented a new check-in system that reduced wait times by 40%.
                  </p>
                </div>
                
                <Button className="w-full">
                  <Award className="h-4 w-4 mr-2" />
                  Create New Recognition
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HRManagerDashboard;
