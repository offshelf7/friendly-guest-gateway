import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AlertTriangle, CheckCircle, Clock, Filter, MoreHorizontal, Plus, Search, Settings, Wrench } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { BarChartIcon } from '@/components/ui/bar-chart-icon';

const statusColorMap: Record<string, string> = {
  available: 'text-green-500 bg-green-100',
  pending: 'text-yellow-500 bg-yellow-100',
  inprogress: 'text-blue-500 bg-blue-100',
  completed: 'text-slate-500 bg-slate-100',
  cancelled: 'text-red-500 bg-red-100',
};

// Sample data (would come from API in real app)
const serviceCategories = [
  {
    id: '1',
    name: 'Room Service',
    description: 'In-room dining and beverage service',
  },
  {
    id: '2',
    name: 'Housekeeping',
    description: 'Cleaning and maintenance of rooms',
  },
  {
    id: '3',
    name: 'Spa & Wellness',
    description: 'Massage, facials, and other treatments',
  },
  {
    id: '4',
    name: 'Concierge',
    description: 'Guest assistance and recommendations',
  },
];

const services = [
  {
    id: '1',
    categoryId: '1',
    name: 'Breakfast in Bed',
    description: 'Continental breakfast served in your room',
    price: 25,
    status: 'available',
  },
  {
    id: '2',
    categoryId: '1',
    name: 'Late Night Snack',
    description: 'Selection of snacks and beverages',
    price: 15,
    status: 'available',
  },
  {
    id: '3',
    categoryId: '2',
    name: 'Deep Cleaning',
    description: 'Thorough cleaning of the room',
    price: 50,
    status: 'available',
  },
  {
    id: '4',
    categoryId: '3',
    name: 'Swedish Massage',
    description: 'Relaxing full-body massage',
    price: 120,
    status: 'available',
  },
  {
    id: '5',
    categoryId: '4',
    name: 'City Tour',
    description: 'Guided tour of local attractions',
    price: 75,
    status: 'available',
  },
  {
    id: '6',
    categoryId: '1',
    name: 'Romantic Dinner',
    description: 'Private dinner setup in the room',
    price: 150,
    status: 'pending',
  },
  {
    id: '7',
    categoryId: '2',
    name: 'Laundry Service',
    description: 'Wash and fold service',
    price: 30,
    status: 'inprogress',
  },
  {
    id: '8',
    categoryId: '3',
    name: 'Facial Treatment',
    description: 'Customized facial treatment',
    price: 90,
    status: 'completed',
  },
  {
    id: '9',
    categoryId: '4',
    name: 'Airport Transfer',
    description: 'Private car service to the airport',
    price: 100,
    status: 'cancelled',
  },
];

const ServiceManagerDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const { toast } = useToast();

  const handleAddService = () => {
    toast({
      title: "Add Service",
      description: "Service creation form would open here.",
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Service Management</h1>
          <p className="text-muted-foreground">Manage hotel services and offerings</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleAddService} className="gap-1">
            <Plus className="h-4 w-4" />
            Add Service
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
            <CardTitle className="text-sm font-medium">Total Services Offered</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">24</div>
            <p className="text-xs text-muted-foreground mt-1">+2 new this month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">18</div>
            <p className="text-xs text-muted-foreground mt-1">5 pending approval</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Service Requests Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-1">↑ 25% from yesterday</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="services">
        <TabsList>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle>Services</CardTitle>
                  <CardDescription>View and manage hotel services</CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search services..."
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
                      <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => setCategoryFilter(null)}>
                        All Categories
                      </DropdownMenuItem>
                      {serviceCategories.map((category) => (
                        <DropdownMenuItem
                          key={category.id}
                          onClick={() => setCategoryFilter(category.id)}
                        >
                          {category.name}
                        </DropdownMenuItem>
                      ))}
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
                          Name
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium">
                          Category
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium">
                          Price
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium">
                          Status
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {services
                        .filter(service => categoryFilter === null || service.categoryId === categoryFilter)
                        .filter(service =>
                          service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          serviceCategories.find(cat => cat.id === service.categoryId)?.name.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((service) => (
                          <tr key={service.id} className="border-b transition-colors hover:bg-muted/50">
                            <td className="p-4 align-middle font-medium">{service.name}</td>
                            <td className="p-4 align-middle">
                              {serviceCategories.find(cat => cat.id === service.categoryId)?.name || 'Unknown'}
                            </td>
                            <td className="p-4 align-middle">${service.price}</td>
                            <td className="p-4 align-middle">
                              <Badge className={statusColorMap[service.status]}>
                                {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                              </Badge>
                            </td>
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
                                  <DropdownMenuItem>Edit service</DropdownMenuItem>
                                  <DropdownMenuItem>Disable service</DropdownMenuItem>
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
        
        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle>Service Categories</CardTitle>
                  <CardDescription>Manage service categories</CardDescription>
                </div>
                <Button onClick={handleAddService} className="gap-1">
                  <Plus className="h-4 w-4" />
                  Add Category
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="bg-slate-50">
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium">
                          Name
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium">
                          Description
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {serviceCategories.map((category) => (
                        <tr key={category.id} className="border-b transition-colors hover:bg-muted/50">
                          <td className="p-4 align-middle font-medium">{category.name}</td>
                          <td className="p-4 align-middle">{category.description}</td>
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
                                <DropdownMenuItem>Edit category</DropdownMenuItem>
                                <DropdownMenuItem>Disable category</DropdownMenuItem>
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
        
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Service Analytics</CardTitle>
              <CardDescription>View service performance and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Popular Services</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px] flex items-center justify-center">
                    <div className="text-center">
                      <BarChartIcon className="h-16 w-16 mx-auto text-slate-300" />
                      <p className="mt-4 text-sm text-muted-foreground">Chart visualization coming soon</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Service Requests by Category</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px] flex items-center justify-center">
                    <div className="text-center">
                      <BarChartIcon className="h-16 w-16 mx-auto text-slate-300" />
                      <p className="mt-4 text-sm text-muted-foreground">Chart visualization coming soon</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Service Revenue by Category</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px] flex items-center justify-center">
                    <div className="text-center">
                      <BarChartIcon className="h-16 w-16 mx-auto text-slate-300" />
                      <p className="mt-4 text-sm text-muted-foreground">Chart visualization coming soon</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Customer Satisfaction</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px] flex items-center justify-center">
                    <div className="text-center">
                      <AlertTriangle className="h-16 w-16 mx-auto text-slate-300" />
                      <p className="mt-4 text-sm text-muted-foreground">Customer satisfaction data coming soon</p>
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

export default ServiceManagerDashboard;
