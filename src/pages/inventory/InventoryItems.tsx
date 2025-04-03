
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { InventoryItem, InventoryItemStatus } from '@/types/adminTypes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

// Function for casting inventory status type that can be used in any function that handles inventory items
const castItemStatus = (item: any) => {
  // Convert string status to InventoryItemStatus type
  const typedStatus = item.status as InventoryItemStatus;
  return {
    ...item,
    status: typedStatus
  } as InventoryItem;
};

const InventoryItems = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        // Since the inventory table might not exist yet, we'll use mock data for demonstration
        const mockInventoryData = [
          {
            id: "1",
            name: "Bath Towels",
            category: "Linens",
            quantity: 150,
            min_quantity: 50,
            supplier: "Premium Textiles",
            unit_price: 12.99,
            last_order_date: "2023-03-15",
            status: "in_stock" as InventoryItemStatus
          },
          {
            id: "2",
            name: "Shampoo Bottles",
            category: "Toiletries",
            quantity: 300,
            min_quantity: 100,
            supplier: "Eco Essentials",
            unit_price: 2.50,
            last_order_date: "2023-04-20",
            status: "in_stock" as InventoryItemStatus
          },
          {
            id: "3",
            name: "Coffee Sachets",
            category: "Food & Beverage",
            quantity: 25,
            min_quantity: 50,
            supplier: "Gourmet Supplies",
            unit_price: 0.75,
            last_order_date: "2023-02-28",
            status: "low_stock" as InventoryItemStatus
          }
        ];
        
        setInventory(mockInventoryData);
      } catch (error: any) {
        console.error('Error fetching inventory:', error);
        toast({
          title: 'Error fetching inventory',
          description: error.message,
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, [toast]);

  const filteredInventory = inventory.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.supplier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Inventory Items</h1>
          <p className="text-muted-foreground">Manage hotel inventory and stock levels</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Item
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 items-center">
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
        <Button variant="outline" className="shrink-0">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>All Items</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading inventory items...</div>
          ) : filteredInventory.length === 0 ? (
            <div className="text-center py-8">No inventory items found</div>
          ) : (
            <div className="border rounded-md">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="py-3 px-4 text-left">Name</th>
                    <th className="py-3 px-4 text-left">Category</th>
                    <th className="py-3 px-4 text-left">Quantity</th>
                    <th className="py-3 px-4 text-left">Supplier</th>
                    <th className="py-3 px-4 text-left">Unit Price</th>
                    <th className="py-3 px-4 text-left">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInventory.map((item) => (
                    <tr key={item.id} className="border-t">
                      <td className="py-3 px-4 font-medium">{item.name}</td>
                      <td className="py-3 px-4">{item.category}</td>
                      <td className="py-3 px-4">
                        {item.quantity} 
                        {item.quantity < item.min_quantity && (
                          <span className="ml-2 text-amber-500 text-xs">
                            (Below minimum)
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4">{item.supplier}</td>
                      <td className="py-3 px-4">${item.unit_price.toFixed(2)}</td>
                      <td className="py-3 px-4">
                        <Badge 
                          variant="outline"
                          className={
                            item.status === 'in_stock' 
                              ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                              : 'bg-amber-100 text-amber-800 hover:bg-amber-100'
                          }
                        >
                          {item.status === 'in_stock' ? 'In Stock' : 'Low Stock'}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button variant="outline" size="sm">Edit</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryItems;
