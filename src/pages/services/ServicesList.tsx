
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Search, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Service, ServiceCategory } from '@/types/roomTypes';

// Mock data for services
const serviceCategories: ServiceCategory[] = [
  {
    id: '1',
    name: 'Spa & Wellness',
    description: 'Relaxation and wellness services',
    icon: 'spa',
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Transportation',
    description: 'Airport and local transportation services',
    icon: 'car',
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z',
  },
  {
    id: '3',
    name: 'Dining',
    description: 'Restaurant and in-room dining services',
    icon: 'utensils',
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z',
  },
  {
    id: '4',
    name: 'Concierge',
    description: 'Personal assistance services',
    icon: 'concierge-bell',
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z',
  },
];

const services: Service[] = [
  {
    id: '1',
    name: 'Swedish Massage',
    description: 'Relaxing full-body massage that works the soft tissues and muscles to help restore health',
    price: 120,
    category_id: '1',
    duration: 60,
    is_available: true,
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Deep Tissue Massage',
    description: 'Focuses on realigning deeper layers of muscles and connective tissue',
    price: 140,
    category_id: '1',
    duration: 60,
    is_available: true,
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z',
  },
  {
    id: '3',
    name: 'Airport Pickup',
    description: 'Transportation from the airport to the hotel',
    price: 75,
    category_id: '2',
    is_available: true,
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z',
  },
  {
    id: '4',
    name: 'City Tour',
    description: 'Guided tour around the city highlights',
    price: 120,
    category_id: '2',
    duration: 240,
    is_available: true,
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z',
  },
  {
    id: '5',
    name: 'Room Service',
    description: '24/7 in-room dining service',
    price: 0,
    category_id: '3',
    is_available: true,
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z',
  },
  {
    id: '6',
    name: 'Ticket Booking',
    description: 'Assistance with booking tickets for local attractions',
    price: 10,
    category_id: '4',
    is_available: true,
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z',
  },
  {
    id: '7',
    name: 'Hot Stone Therapy',
    description: 'Massage therapy that uses smooth, heated stones',
    price: 180,
    category_id: '1',
    duration: 90,
    is_available: false,
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z',
  },
];

const ServicesList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const { toast } = useToast();
  
  const filteredServices = services.filter(service => {
    const matchesSearch = 
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !categoryFilter || service.category_id === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });
  
  const handleAddService = () => {
    toast({
      title: "Coming Soon",
      description: "Service creation form will be available soon.",
    });
  };
  
  const handleEditService = (service: Service) => {
    toast({
      title: "Coming Soon",
      description: `Edit form for ${service.name} will be available soon.`,
    });
  };
  
  const handleDeleteService = (service: Service) => {
    toast({
      title: "Coming Soon",
      description: `Delete functionality for ${service.name} will be available soon.`,
    });
  };
  
  const getCategoryName = (categoryId: string) => {
    const category = serviceCategories.find(c => c.id === categoryId);
    return category ? category.name : 'Unknown';
  };
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Services</h1>
          <p className="text-muted-foreground">Manage hotel services and offerings</p>
        </div>
        <Button onClick={handleAddService}>
          <Plus className="mr-2 h-4 w-4" />
          Add Service
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search services..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="shrink-0">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>
      
      <Tabs defaultValue="all" onValueChange={(value) => setCategoryFilter(value === 'all' ? null : value)}>
        <TabsList>
          <TabsTrigger value="all">All Categories</TabsTrigger>
          {serviceCategories.map((category) => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>All Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="py-3 px-4 text-left">Name</th>
                      <th className="py-3 px-4 text-left">Category</th>
                      <th className="py-3 px-4 text-left">Description</th>
                      <th className="py-3 px-4 text-left">Price</th>
                      <th className="py-3 px-4 text-left">Duration</th>
                      <th className="py-3 px-4 text-left">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredServices.map((service) => (
                      <tr key={service.id} className="border-t">
                        <td className="py-3 px-4 font-medium">{service.name}</td>
                        <td className="py-3 px-4">{getCategoryName(service.category_id)}</td>
                        <td className="py-3 px-4 max-w-xs truncate">{service.description}</td>
                        <td className="py-3 px-4">${service.price}</td>
                        <td className="py-3 px-4">{service.duration ? `${service.duration} min` : 'N/A'}</td>
                        <td className="py-3 px-4">
                          {service.is_available ? (
                            <Badge className="bg-green-100 text-green-800">Available</Badge>
                          ) : (
                            <Badge variant="secondary">Unavailable</Badge>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleEditService(service)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleDeleteService(service)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredServices.length === 0 && (
                      <tr>
                        <td colSpan={7} className="py-6 text-center text-muted-foreground">
                          No services found matching your search criteria
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {serviceCategories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{category.name} Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="py-3 px-4 text-left">Name</th>
                        <th className="py-3 px-4 text-left">Description</th>
                        <th className="py-3 px-4 text-left">Price</th>
                        <th className="py-3 px-4 text-left">Duration</th>
                        <th className="py-3 px-4 text-left">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredServices.map((service) => (
                        <tr key={service.id} className="border-t">
                          <td className="py-3 px-4 font-medium">{service.name}</td>
                          <td className="py-3 px-4 max-w-xs truncate">{service.description}</td>
                          <td className="py-3 px-4">${service.price}</td>
                          <td className="py-3 px-4">{service.duration ? `${service.duration} min` : 'N/A'}</td>
                          <td className="py-3 px-4">
                            {service.is_available ? (
                              <Badge className="bg-green-100 text-green-800">Available</Badge>
                            ) : (
                              <Badge variant="secondary">Unavailable</Badge>
                            )}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex justify-end gap-2">
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => handleEditService(service)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => handleDeleteService(service)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {filteredServices.length === 0 && (
                        <tr>
                          <td colSpan={6} className="py-6 text-center text-muted-foreground">
                            No services found matching your search criteria
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ServicesList;
