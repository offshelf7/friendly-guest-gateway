
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { 
  Package, 
  Plus, 
  Archive, 
  Search, 
  FileDown, 
  Edit, 
  Trash2, 
  AlertCircle,
  ShoppingBag 
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

// Mock inventory items for demonstration
// In a real application, these would come from the database
const mockInventoryItems = [
  {
    id: '1',
    name: 'Bath Towels',
    category: 'Linens',
    quantity: 120,
    min_quantity: 50,
    supplier: 'Premium Textiles',
    unit_price: 12.99,
    last_order_date: '2025-03-15',
    status: 'in_stock'
  },
  {
    id: '2',
    name: 'Shampoo Bottles',
    category: 'Toiletries',
    quantity: 250,
    min_quantity: 100,
    supplier: 'Clean Supplies Co.',
    unit_price: 3.50,
    last_order_date: '2025-03-10',
    status: 'in_stock'
  },
  {
    id: '3',
    name: 'Bed Sheets (Queen)',
    category: 'Linens',
    quantity: 45,
    min_quantity: 40,
    supplier: 'Premium Textiles',
    unit_price: 24.99,
    last_order_date: '2025-02-28',
    status: 'low_stock'
  },
  {
    id: '4',
    name: 'Toilet Paper',
    category: 'Toiletries',
    quantity: 300,
    min_quantity: 150,
    supplier: 'Clean Supplies Co.',
    unit_price: 0.75,
    last_order_date: '2025-03-01',
    status: 'in_stock'
  },
  {
    id: '5',
    name: 'Coffee Sachets',
    category: 'Food & Beverage',
    quantity: 12,
    min_quantity: 50,
    supplier: 'Gourmet Distributors',
    unit_price: 0.35,
    last_order_date: '2025-03-05',
    status: 'out_of_stock'
  }
];

// Type definitions
type InventoryItem = {
  id: string;
  name: string;
  category: string;
  quantity: number;
  min_quantity: number;
  supplier: string;
  unit_price: number;
  last_order_date: string;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
};

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [newItemDialog, setNewItemDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const { toast } = useToast();
  
  // In a real application, this would be a database query
  // For now, we'll use our mock data
  const { data: inventoryItems = mockInventoryItems } = useQuery({
    queryKey: ['inventoryItems'],
    queryFn: async () => {
      // Simulate API call
      return mockInventoryItems;
    }
  });
  
  // Filter items based on search term, category, and status
  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });
  
  // Get unique categories for the filter
  const categories = ['all', ...new Set(inventoryItems.map(item => item.category))];
  
  // Calculate stats
  const totalItems = inventoryItems.reduce((sum, item) => sum + item.quantity, 0);
  const lowStockItems = inventoryItems.filter(item => item.status === 'low_stock').length;
  const outOfStockItems = inventoryItems.filter(item => item.status === 'out_of_stock').length;
  const totalInventoryValue = inventoryItems.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0);
  
  const handleAddNewItem = () => {
    toast({
      title: "Item Added",
      description: "New inventory item has been added successfully",
    });
    setNewItemDialog(false);
  };
  
  const handleEditItem = (item: InventoryItem) => {
    setSelectedItem(item);
    setNewItemDialog(true);
  };
  
  const handleDeleteItem = (id: string) => {
    // Delete logic would go here
    toast({
      title: "Item Deleted",
      description: "Inventory item has been removed",
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Inventory Management</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => {}}>
            <FileDown className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button onClick={() => setNewItemDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Item
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalItems}</div>
            <p className="text-xs text-muted-foreground">
              Across all categories
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
            <AlertCircle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lowStockItems}</div>
            <p className="text-xs text-muted-foreground">
              Items need reordering
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{outOfStockItems}</div>
            <p className="text-xs text-muted-foreground">
              Items to reorder urgently
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalInventoryValue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Current inventory worth
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search inventory..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 flex-wrap md:flex-nowrap">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[150px]">
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
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="in_stock">In Stock</SelectItem>
              <SelectItem value="low_stock">Low Stock</SelectItem>
              <SelectItem value="out_of_stock">Out of Stock</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Tabs defaultValue="items">
        <TabsList>
          <TabsTrigger value="items">Inventory Items</TabsTrigger>
          <TabsTrigger value="orders">Purchase Orders</TabsTrigger>
          <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
        </TabsList>
        
        <TabsContent value="items" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead className="text-right">Unit Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell className="text-right">{item.quantity}</TableCell>
                      <TableCell>{item.supplier}</TableCell>
                      <TableCell className="text-right">${item.unit_price.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            item.status === 'in_stock'
                              ? 'outline'
                              : item.status === 'low_stock'
                              ? 'secondary'
                              : 'destructive'
                          }
                        >
                          {item.status === 'in_stock'
                            ? 'In Stock'
                            : item.status === 'low_stock'
                            ? 'Low Stock'
                            : 'Out of Stock'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleEditItem(item)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteItem(item.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                Purchase orders will be displayed here
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="suppliers" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                Suppliers information will be displayed here
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Add/Edit Item Dialog */}
      <Dialog open={newItemDialog} onOpenChange={setNewItemDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedItem ? 'Edit Inventory Item' : 'Add New Inventory Item'}</DialogTitle>
            <DialogDescription>
              {selectedItem ? 'Update the details for this inventory item.' : 'Enter the details for the new inventory item.'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="item-name" className="text-sm font-medium">Item Name</label>
                <Input
                  id="item-name"
                  placeholder="Enter item name"
                  defaultValue={selectedItem?.name || ''}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="category" className="text-sm font-medium">Category</label>
                <Select defaultValue={selectedItem?.category || 'Linens'}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Linens">Linens</SelectItem>
                    <SelectItem value="Toiletries">Toiletries</SelectItem>
                    <SelectItem value="Food & Beverage">Food & Beverage</SelectItem>
                    <SelectItem value="Cleaning">Cleaning</SelectItem>
                    <SelectItem value="Amenities">Amenities</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="quantity" className="text-sm font-medium">Quantity</label>
                <Input
                  id="quantity"
                  type="number"
                  min="0"
                  placeholder="Enter quantity"
                  defaultValue={selectedItem?.quantity || ''}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="min-quantity" className="text-sm font-medium">Minimum Quantity</label>
                <Input
                  id="min-quantity"
                  type="number"
                  min="0"
                  placeholder="Enter minimum quantity"
                  defaultValue={selectedItem?.min_quantity || ''}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="supplier" className="text-sm font-medium">Supplier</label>
                <Select defaultValue={selectedItem?.supplier || 'Premium Textiles'}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Premium Textiles">Premium Textiles</SelectItem>
                    <SelectItem value="Clean Supplies Co.">Clean Supplies Co.</SelectItem>
                    <SelectItem value="Gourmet Distributors">Gourmet Distributors</SelectItem>
                    <SelectItem value="Hotel Essentials Inc.">Hotel Essentials Inc.</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label htmlFor="unit-price" className="text-sm font-medium">Unit Price ($)</label>
                <Input
                  id="unit-price"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="Enter unit price"
                  defaultValue={selectedItem?.unit_price || ''}
                />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewItemDialog(false)}>Cancel</Button>
            <Button onClick={handleAddNewItem}>
              {selectedItem ? 'Update Item' : 'Add Item'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Inventory;
