
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { InventoryItem, InventoryItemStatus } from '@/types/adminTypes';

// Function for casting inventory status type that can be used in any function that handles inventory items
const castItemStatus = (item: any) => {
  // Convert string status to InventoryItemStatus type
  const typedStatus = item.status as InventoryItemStatus;
  return {
    ...item,
    status: typedStatus
  } as InventoryItem;
};

const Inventory = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
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

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Inventory Management</h1>
      <p>This is the inventory management page. Content to be added soon.</p>
      
      {loading ? (
        <div className="text-center py-8">Loading inventory items...</div>
      ) : inventory.length === 0 ? (
        <div className="text-center py-8">No inventory items found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {inventory.map((item) => (
            <div key={item.id} className="border rounded-lg p-4 shadow-sm">
              <h3 className="font-medium text-lg">{item.name}</h3>
              <div className="mt-2 text-sm text-gray-600">
                <p>Category: {item.category}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Min Quantity: {item.min_quantity}</p>
                <p>Supplier: {item.supplier}</p>
                <p>Unit Price: ${item.unit_price.toFixed(2)}</p>
                <p>Last Order: {new Date(item.last_order_date).toLocaleDateString()}</p>
                <p>Status: {item.status}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Inventory;
