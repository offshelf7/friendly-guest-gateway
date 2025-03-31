
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { MenuItem } from "@/types/menuTypes";

// Sample food and drink data (would normally come from API)
const foodItems: MenuItem[] = [
  {
    id: '1',
    name: 'Grilled Salmon',
    description: 'Fresh salmon fillet with seasonal vegetables',
    price: 24.99,
    category: 'food',
    type: 'main',
  },
  {
    id: '2',
    name: 'Caesar Salad',
    description: 'Romaine lettuce, croutons, parmesan cheese with Caesar dressing',
    price: 12.99,
    category: 'food',
    type: 'appetizer',
  },
  {
    id: '3',
    name: 'Chocolate Fondant',
    description: 'Warm chocolate cake with a molten center',
    price: 8.99,
    category: 'food',
    type: 'dessert',
  }
];

const drinkItems: MenuItem[] = [
  {
    id: '4',
    name: 'Sparkling Water',
    description: 'Refreshing sparkling mineral water',
    price: 3.99,
    category: 'drink',
    type: 'soft drink',
  },
  {
    id: '5',
    name: 'House Red Wine',
    description: 'Full-bodied red wine from local vineyards',
    price: 7.99,
    category: 'drink',
    type: 'wine',
  },
  {
    id: '6',
    name: 'Craft IPA',
    description: 'Hoppy India Pale Ale from local brewery',
    price: 6.99,
    category: 'drink',
    type: 'beer',
  },
  {
    id: '7',
    name: 'Espresso Martini',
    description: 'Vodka, coffee liqueur and espresso shot',
    price: 11.99,
    category: 'drink',
    type: 'cocktail',
  }
];

const AdminFoodAndDrink = () => {
  const [activeTab, setActiveTab] = useState("food");
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const handleAddItem = () => {
    toast({
      title: "Add Item",
      description: `New ${activeTab} item would be added here.`,
    });
  };

  const filteredItems = activeTab === 'food' 
    ? foodItems.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.type.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : drinkItems.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.type.toLowerCase().includes(searchTerm.toLowerCase())
      );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Food & Drink Management</h1>
          <p className="text-muted-foreground">Manage hotel restaurant menu items</p>
        </div>
        <Button onClick={handleAddItem} className="gap-1">
          <Plus className="h-4 w-4" />
          Add {activeTab === 'food' ? 'Food Item' : 'Drink Item'}
        </Button>
      </div>

      <Tabs defaultValue="food" onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="food">Food</TabsTrigger>
          <TabsTrigger value="drink">Drinks</TabsTrigger>
        </TabsList>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>{activeTab === 'food' ? 'Food Items' : 'Drink Items'}</CardTitle>
                <CardDescription>
                  View and manage all {activeTab === 'food' ? 'food' : 'drink'} items on the menu
                </CardDescription>
              </div>
              <div className="relative max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder={`Search ${activeTab}...`}
                  className="pl-8 w-[200px] md:w-[300px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="py-3 px-4 text-left">Name</th>
                    <th className="py-3 px-4 text-left">Type</th>
                    <th className="py-3 px-4 text-left">Description</th>
                    <th className="py-3 px-4 text-left">Price</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item) => (
                    <tr key={item.id} className="border-t hover:bg-muted/30">
                      <td className="py-3 px-4 font-medium">{item.name}</td>
                      <td className="py-3 px-4 capitalize">
                        <Badge variant="outline" className="capitalize">
                          {item.type}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 max-w-xs truncate">{item.description}</td>
                      <td className="py-3 px-4">${item.price.toFixed(2)}</td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="outline">
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
};

export default AdminFoodAndDrink;
