
import { useState } from 'react';
import { 
  ShoppingBag, 
  Plus, 
  Search, 
  FileDown, 
  Edit, 
  Trash2, 
  Phone, 
  Mail,
  MapPin,
  CreditCard
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

// Mock supplier data for demonstration
const mockSuppliers = [
  {
    id: '1',
    name: 'Premium Textiles',
    category: 'Linens & Textiles',
    contact_person: 'David Wilson',
    phone: '+1 (555) 123-4567',
    email: 'david@premiumtextiles.com',
    address: '123 Fabric Lane, Textile City, TC 12345',
    payment_terms: 'Net 30',
    status: 'active'
  },
  {
    id: '2',
    name: 'Clean Supplies Co.',
    category: 'Cleaning & Toiletries',
    contact_person: 'Sarah Johnson',
    phone: '+1 (555) 234-5678',
    email: 'sarah@cleansupplies.com',
    address: '456 Clean Street, Sparkle Town, ST 23456',
    payment_terms: 'Net 15',
    status: 'active'
  },
  {
    id: '3',
    name: 'Gourmet Distributors',
    category: 'Food & Beverage',
    contact_person: 'Michael Chen',
    phone: '+1 (555) 345-6789',
    email: 'michael@gourmetdist.com',
    address: '789 Flavor Avenue, Taste City, TC 34567',
    payment_terms: 'Net 7',
    status: 'active'
  },
  {
    id: '4',
    name: 'Hotel Essentials Inc.',
    category: 'Amenities',
    contact_person: 'Lisa Rodriguez',
    phone: '+1 (555) 456-7890',
    email: 'lisa@hotelessentails.com',
    address: '101 Comfort Plaza, Amenity Villa, AV 45678',
    payment_terms: 'Net 30',
    status: 'inactive'
  },
  {
    id: '5',
    name: 'FixIt Services',
    category: 'Maintenance',
    contact_person: 'James Smith',
    phone: '+1 (555) 567-8901',
    email: 'james@fixitservices.com',
    address: '202 Repair Road, Fix City, FC 56789',
    payment_terms: 'Net 15',
    status: 'active'
  }
];

type Supplier = {
  id: string;
  name: string;
  category: string;
  contact_person: string;
  phone: string;
  email: string;
  address: string;
  payment_terms: string;
  status: 'active' | 'inactive';
};

const Suppliers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [suppliers] = useState<Supplier[]>(mockSuppliers);
  const [newSupplierOpen, setNewSupplierOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const { toast } = useToast();
  
  // Filter suppliers based on search term and category
  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = 
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.contact_person.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || supplier.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });
  
  // Get unique categories for the filter
  const categories = ['all', ...new Set(suppliers.map(supplier => supplier.category))];
  
  // Handle editing a supplier
  const handleEditSupplier = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setNewSupplierOpen(true);
  };
  
  // Handle adding a new supplier
  const handleAddSupplier = () => {
    toast({
      title: "Supplier Added",
      description: "The new supplier has been added successfully",
    });
    
    setNewSupplierOpen(false);
  };
  
  // Handle deleting a supplier
  const handleDeleteSupplier = (id: string) => {
    // Delete logic would go here in a real application
    toast({
      title: "Supplier Deleted",
      description: "The supplier has been removed from your list",
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Suppliers</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <FileDown className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button onClick={() => {
            setSelectedSupplier(null);
            setNewSupplierOpen(true);
          }}>
            <Plus className="mr-2 h-4 w-4" />
            Add Supplier
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Suppliers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{suppliers.length}</div>
            <p className="text-xs text-muted-foreground">
              Across all categories
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Suppliers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {suppliers.filter(s => s.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Currently working with
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(suppliers.map(s => s.category)).size}
            </div>
            <p className="text-xs text-muted-foreground">
              Different supplier types
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search suppliers..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Supplier Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Contact Person</TableHead>
                <TableHead>Contact Info</TableHead>
                <TableHead>Payment Terms</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSuppliers.length > 0 ? (
                filteredSuppliers.map((supplier) => (
                  <TableRow key={supplier.id}>
                    <TableCell className="font-medium">{supplier.name}</TableCell>
                    <TableCell>{supplier.category}</TableCell>
                    <TableCell>{supplier.contact_person}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="flex items-center text-sm">
                          <Phone className="h-3 w-3 mr-1" />
                          {supplier.phone}
                        </span>
                        <span className="flex items-center text-sm">
                          <Mail className="h-3 w-3 mr-1" />
                          {supplier.email}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{supplier.payment_terms}</TableCell>
                    <TableCell>
                      <Badge
                        variant={supplier.status === 'active' ? 'outline' : 'secondary'}
                      >
                        {supplier.status === 'active' ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEditSupplier(supplier)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteSupplier(supplier.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    No suppliers found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Add/Edit Supplier Dialog */}
      <Dialog open={newSupplierOpen} onOpenChange={setNewSupplierOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedSupplier ? 'Edit Supplier' : 'Add New Supplier'}</DialogTitle>
            <DialogDescription>
              {selectedSupplier ? 'Update the details for this supplier.' : 'Enter the details for the new supplier.'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="supplier-name" className="text-sm font-medium">Supplier Name</label>
                <Input
                  id="supplier-name"
                  placeholder="Enter supplier name"
                  defaultValue={selectedSupplier?.name || ''}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="category" className="text-sm font-medium">Category</label>
                <Select defaultValue={selectedSupplier?.category || ''}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Linens & Textiles">Linens & Textiles</SelectItem>
                    <SelectItem value="Cleaning & Toiletries">Cleaning & Toiletries</SelectItem>
                    <SelectItem value="Food & Beverage">Food & Beverage</SelectItem>
                    <SelectItem value="Amenities">Amenities</SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="contact-person" className="text-sm font-medium">Contact Person</label>
                <Input
                  id="contact-person"
                  placeholder="Enter contact person name"
                  defaultValue={selectedSupplier?.contact_person || ''}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="payment-terms" className="text-sm font-medium">Payment Terms</label>
                <Select defaultValue={selectedSupplier?.payment_terms || 'Net 30'}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment terms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Net 7">Net 7</SelectItem>
                    <SelectItem value="Net 15">Net 15</SelectItem>
                    <SelectItem value="Net 30">Net 30</SelectItem>
                    <SelectItem value="Net 60">Net 60</SelectItem>
                    <SelectItem value="Cash on Delivery">Cash on Delivery</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
                <Input
                  id="phone"
                  placeholder="Enter phone number"
                  defaultValue={selectedSupplier?.phone || ''}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                  defaultValue={selectedSupplier?.email || ''}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="address" className="text-sm font-medium">Address</label>
              <Input
                id="address"
                placeholder="Enter full address"
                defaultValue={selectedSupplier?.address || ''}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="status" className="text-sm font-medium">Status</label>
              <Select defaultValue={selectedSupplier?.status || 'active'}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewSupplierOpen(false)}>Cancel</Button>
            <Button className="gap-2" onClick={handleAddSupplier}>
              {selectedSupplier ? (
                <>
                  <Edit className="h-4 w-4" />
                  Update Supplier
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  Add Supplier
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Suppliers;
