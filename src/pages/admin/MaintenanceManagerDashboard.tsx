import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AlertTriangle, CheckCircle, Clock, Filter, MoreHorizontal, Search, Settings, Wrench } from 'lucide-react';
import { ToolIcon } from '@/components/ui/tool-icon';
import { ArrowUpDownIcon } from '@/components/ui/arrow-up-down-icon';
import { LineChartIcon } from '@/components/ui/line-chart-icon';

const statusColorMap: Record<string, string> = {
  urgent: 'text-red-500 bg-red-100',
  high: 'text-orange-500 bg-orange-100',
  medium: 'text-yellow-500 bg-yellow-100',
  low: 'text-green-500 bg-green-100',
  completed: 'text-slate-500 bg-slate-100',
  inprogress: 'text-blue-500 bg-blue-100',
  pending: 'text-purple-500 bg-purple-100',
};

// Sample data (would come from API in real app)
const maintenanceRequests = [
  {
    id: 1,
    issue: 'Leaky faucet in room 101',
    location: 'Room 101',
    priority: 'urgent',
    reportedAt: '2023-11-15',
  },
  {
    id: 2,
    issue: 'Broken AC in room 204',
    location: 'Room 204',
    priority: 'high',
    reportedAt: '2023-11-14',
  },
  {
    id: 3,
    issue: 'Toilet not flushing in room 302',
    location: 'Room 302',
    priority: 'medium',
    reportedAt: '2023-11-13',
  },
  {
    id: 4,
    issue: 'Lightbulb out in hallway',
    location: 'Hallway 2nd floor',
    priority: 'low',
    reportedAt: '2023-11-12',
  },
  {
    id: 5,
    issue: 'Painting required in lobby',
    location: 'Lobby',
    priority: 'completed',
    reportedAt: '2023-11-10',
  },
  {
    id: 6,
    issue: 'Carpet cleaning in room 404',
    location: 'Room 404',
    priority: 'inprogress',
    reportedAt: '2023-11-09',
  },
  {
    id: 7,
    issue: 'New furniture required in room 505',
    location: 'Room 505',
    priority: 'pending',
    reportedAt: '2023-11-08',
  },
];

const workOrders = [
  {
    id: 101,
    title: 'Fix leaky faucet in room 101',
    assignee: 'John Doe',
    status: 'completed',
    dueDate: '2023-11-16',
  },
  {
    id: 102,
    title: 'Repair broken AC in room 204',
    assignee: 'Jane Smith',
    status: 'inprogress',
    dueDate: '2023-11-17',
  },
  {
    id: 103,
    title: 'Unclog toilet in room 302',
    assignee: 'Mike Johnson',
    status: 'pending',
    dueDate: '2023-11-18',
  },
];

const MaintenanceManagerDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Maintenance Dashboard</h1>
          <p className="text-muted-foreground">Manage maintenance requests and work orders</p>
        </div>
        <div className="flex gap-2">
          <Button>
            <ToolIcon className="mr-2 h-4 w-4" />
            Create Work Order
          </Button>
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stats Cards */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Maintenance Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">24</div>
            <p className="text-xs text-muted-foreground mt-1">+2 from yesterday</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Open Work Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">18</div>
            <p className="text-xs text-muted-foreground mt-1">5 urgent priority</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-1">↑ 25% from last week</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="requests">
        <TabsList>
          <TabsTrigger value="requests">Maintenance Requests</TabsTrigger>
          <TabsTrigger value="workorders">Work Orders</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="requests" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle>Maintenance Requests</CardTitle>
                  <CardDescription>View and manage maintenance requests from guests and staff</CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search requests..."
                      className="pl-8 w-[200px] md:w-[250px]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => setStatusFilter(null)}>
                        All
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setStatusFilter('urgent')}>
                        Urgent
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setStatusFilter('high')}>
                        High
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setStatusFilter('medium')}>
                        Medium
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setStatusFilter('low')}>
                        Low
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setStatusFilter('completed')}>
                        Completed
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="bg-slate-50">
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium">
                          <div className="flex items-center space-x-1">
                            <span>ID</span>
                            <ArrowUpDownIcon className="h-4 w-4" />
                          </div>
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium">
                          <div className="flex items-center space-x-1">
                            <span>Request</span>
                            <ArrowUpDownIcon className="h-4 w-4" />
                          </div>
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium">
                          <div className="flex items-center space-x-1">
                            <span>Location</span>
                            <ArrowUpDownIcon className="h-4 w-4" />
                          </div>
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium">
                          <div className="flex items-center space-x-1">
                            <span>Status</span>
                            <ArrowUpDownIcon className="h-4 w-4" />
                          </div>
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium">
                          <div className="flex items-center space-x-1">
                            <span>Reported</span>
                            <ArrowUpDownIcon className="h-4 w-4" />
                          </div>
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {maintenanceRequests
                        .filter(request => statusFilter === null || request.priority === statusFilter)
                        .filter(request => 
                          request.issue.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          request.location.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((request) => (
                          <tr key={request.id} className="border-b transition-colors hover:bg-muted/50">
                            <td className="p-4 align-middle font-medium">#{request.id}</td>
                            <td className="p-4 align-middle">{request.issue}</td>
                            <td className="p-4 align-middle">{request.location}</td>
                            <td className="p-4 align-middle">
                              <Badge className={statusColorMap[request.priority]}>
                                {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)}
                              </Badge>
                            </td>
                            <td className="p-4 align-middle">{request.reportedAt}</td>
                            <td className="p-4 align-middle">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Open menu</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem>View details</DropdownMenuItem>
                                  <DropdownMenuItem>Create work order</DropdownMenuItem>
                                  <DropdownMenuItem>Change priority</DropdownMenuItem>
                                  <DropdownMenuItem>Mark as completed</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="workorders" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle>Work Orders</CardTitle>
                  <CardDescription>Manage and track work orders</CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search work orders..."
                      className="pl-8 w-[200px] md:w-[250px]"
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="bg-slate-50">
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium">
                          <div className="flex items-center space-x-1">
                            <span>ID</span>
                            <ArrowUpDownIcon className="h-4 w-4" />
                          </div>
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium">
                          <div className="flex items-center space-x-1">
                            <span>Title</span>
                            <ArrowUpDownIcon className="h-4 w-4" />
                          </div>
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium">
                          <div className="flex items-center space-x-1">
                            <span>Assignee</span>
                            <ArrowUpDownIcon className="h-4 w-4" />
                          </div>
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium">
                          <div className="flex items-center space-x-1">
                            <span>Status</span>
                            <ArrowUpDownIcon className="h-4 w-4" />
                          </div>
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium">
                          <div className="flex items-center space-x-1">
                            <span>Due Date</span>
                            <ArrowUpDownIcon className="h-4 w-4" />
                          </div>
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {workOrders.map((order) => (
                        <tr key={order.id} className="border-b transition-colors hover:bg-muted/50">
                          <td className="p-4 align-middle font-medium">#{order.id}</td>
                          <td className="p-4 align-middle">{order.title}</td>
                          <td className="p-4 align-middle">{order.assignee}</td>
                          <td className="p-4 align-middle">
                            <div className="flex items-center">
                              {order.status === 'completed' ? (
                                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                              ) : order.status === 'inprogress' ? (
                                <Clock className="mr-2 h-4 w-4 text-blue-500" />
                              ) : (
                                <AlertTriangle className="mr-2 h-4 w-4 text-yellow-500" />
                              )}
                              <Badge className={statusColorMap[order.status]}>
                                {order.status === 'inprogress' ? 'In Progress' : 
                                 order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </Badge>
                            </div>
                          </td>
                          <td className="p-4 align-middle">{order.dueDate}</td>
                          <td className="p-4 align-middle">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Open menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>View details</DropdownMenuItem>
                                <DropdownMenuItem>Update status</DropdownMenuItem>
                                <DropdownMenuItem>Reassign</DropdownMenuItem>
                                <DropdownMenuItem>Add parts used</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Inventory</CardTitle>
              <CardDescription>Track maintenance supplies and equipment</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-12 text-muted-foreground">
                Inventory management module coming soon...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Analytics</CardTitle>
              <CardDescription>View maintenance performance and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Requests by Category</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px] flex items-center justify-center">
                    <div className="text-center">
                      <LineChartIcon className="h-16 w-16 mx-auto text-slate-300" />
                      <p className="mt-4 text-sm text-muted-foreground">Chart visualization coming soon</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Average Resolution Time</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px] flex items-center justify-center">
                    <div className="text-center">
                      <LineChartIcon className="h-16 w-16 mx-auto text-slate-300" />
                      <p className="mt-4 text-sm text-muted-foreground">Chart visualization coming soon</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MaintenanceManagerDashboard;
