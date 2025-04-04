
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Search, Plus, MoreHorizontal } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data for demo purposes
const mockSuppliers = [
  {
    id: "1",
    name: "Premium Textiles",
    contact: "John Smith",
    email: "john@premiumtextiles.com",
    phone: "+1 (555) 123-4567",
    address: "123 Supplier St, Boston, MA",
    category: "Linens",
    lastOrderDate: "2023-03-15",
    status: "Active",
  },
  {
    id: "2",
    name: "Eco Essentials",
    contact: "Sarah Johnson",
    email: "sarah@ecoessentials.com",
    phone: "+1 (555) 987-6543",
    address: "456 Green Ave, Portland, OR",
    category: "Toiletries",
    lastOrderDate: "2023-04-20",
    status: "Active",
  },
  {
    id: "3",
    name: "Gourmet Supplies",
    contact: "Michael Lee",
    email: "michael@gourmetsupplies.com",
    phone: "+1 (555) 456-7890",
    address: "789 Culinary Blvd, Chicago, IL",
    category: "Food & Beverage",
    lastOrderDate: "2023-02-28",
    status: "Inactive",
  },
];

const Suppliers = () => {
  const [suppliers] = useState(mockSuppliers);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const filteredSuppliers = suppliers.filter(supplier => 
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddSupplier = () => {
    toast({
      title: "Add Supplier",
      description: "This would open a form to add a new supplier.",
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Suppliers</h1>
          <p className="text-muted-foreground">Manage your inventory suppliers</p>
        </div>
        <Button onClick={handleAddSupplier} className="sm:self-start">
          <Plus className="mr-2 h-4 w-4" /> Add Supplier
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <CardTitle>Suppliers List</CardTitle>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search suppliers..."
                className="pl-8 sm:w-[300px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Contact Person</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Order</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSuppliers.map((supplier) => (
                  <TableRow key={supplier.id}>
                    <TableCell className="font-medium">{supplier.name}</TableCell>
                    <TableCell>{supplier.category}</TableCell>
                    <TableCell>{supplier.contact}</TableCell>
                    <TableCell>{supplier.email}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        supplier.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {supplier.status}
                      </span>
                    </TableCell>
                    <TableCell>{new Date(supplier.lastOrderDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Suppliers;
