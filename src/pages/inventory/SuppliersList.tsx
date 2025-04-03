
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
  Filter
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Supplier, SupplierStatus } from '@/types/adminTypes';

const mockSuppliers: Supplier[] = [
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

const SuppliersList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [suppliers] = useState<Supplier[]>(mockSuppliers);
  const { toast } = useToast();
  
  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = 
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.contact_person.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || supplier.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });
  
  const categories = ['all', ...new Set(suppliers.map(supplier => supplier.category))];
  
  const handleAddSupplier = () => {
    toast({
      title: "Coming Soon",
      description: "Supplier management functionality will be added soon.",
    });
  };
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Suppliers</h1>
          <p className="text-muted-foreground">Manage vendor relationships</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <FileDown className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button onClick={handleAddSupplier}>
            <Plus className="mr-2 h-4 w-4" />
            Add Supplier
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 items-center">
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
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
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
    </div>
  );
};

export default SuppliersList;
