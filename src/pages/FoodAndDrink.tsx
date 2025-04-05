
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, Coffee, Utensils, ShoppingCart } from "lucide-react";
import { useCart } from '@/contexts/CartContext';
import { MenuItem } from '@/types/menuTypes';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/home/Footer';
import { SidebarProvider } from '@/components/ui/sidebar';
import { FoodDrinkSidebar } from '@/components/food-drink/FoodDrinkSidebar';
import { useLanguage } from '@/contexts/LanguageContext';

// Sample menu data (would normally come from an API/Supabase)
const menuItems: MenuItem[] = [
  // Food items
  {
    id: 'f1',
    name: 'Classic Burger',
    description: 'Beef patty with lettuce, tomato, cheese, and special sauce',
    price: 18,
    image_url: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800',
    category: 'food',
    type: 'main'
  },
  {
    id: 'f2',
    name: 'Margherita Pizza',
    description: 'Fresh tomato sauce, mozzarella, and basil',
    price: 16,
    image_url: 'https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?w=800',
    category: 'food',
    type: 'main'
  },
  {
    id: 'f3',
    name: 'Caesar Salad',
    description: 'Romaine lettuce, croutons, parmesan, and Caesar dressing',
    price: 12,
    image_url: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=800',
    category: 'food',
    type: 'starter'
  },
  {
    id: 'f4',
    name: 'Grilled Salmon',
    description: 'Salmon fillet with lemon butter sauce and vegetables',
    price: 24,
    image_url: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800',
    category: 'food',
    type: 'main'
  },
  {
    id: 'f5',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with a molten center, served with ice cream',
    price: 10,
    image_url: 'https://images.unsplash.com/photo-1623270212276-8057d7235ce2?w=800',
    category: 'food',
    type: 'dessert'
  },
  // Drink items with updated drinkType property
  {
    id: 'd1',
    name: 'Margarita',
    description: 'Tequila, triple sec, and lime juice with salt rim',
    price: 12,
    image_url: 'https://images.unsplash.com/photo-1582375986551-5458f580dfdb?w=800',
    category: 'drink',
    type: 'cocktail',
    drinkType: 'cocktail'
  },
  {
    id: 'd2',
    name: 'Red Wine',
    description: 'House selection of premium red wine',
    price: 14,
    image_url: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800',
    category: 'drink',
    type: 'wine',
    drinkType: 'wine'
  },
  {
    id: 'd3',
    name: 'Cappuccino',
    description: 'Espresso with steamed milk and foam',
    price: 6,
    image_url: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=800',
    category: 'drink',
    type: 'coffee',
    drinkType: 'coffee'
  },
  {
    id: 'd4',
    name: 'Mojito',
    description: 'White rum, sugar, lime juice, soda water, and mint',
    price: 10,
    image_url: 'https://images.unsplash.com/photo-1546171753-e89320ec0c12?w=800',
    category: 'drink',
    type: 'cocktail',
    drinkType: 'cocktail'
  },
  {
    id: 'd5',
    name: 'Fresh Orange Juice',
    description: 'Freshly squeezed orange juice',
    price: 5,
    image_url: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800',
    category: 'drink',
    type: 'soft',
    drinkType: 'soft'
  },
  // Additional drink items for better sidebar demonstration
  {
    id: 'd6',
    name: 'Craft IPA',
    description: 'Hoppy India Pale Ale from local brewery',
    price: 8,
    image_url: 'https://images.unsplash.com/photo-1566633806327-68e152aaf26d?w=800',
    category: 'drink',
    type: 'beer',
    drinkType: 'beer'
  },
  {
    id: 'd7',
    name: 'Green Tea',
    description: 'Premium Japanese green tea',
    price: 4,
    image_url: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=800',
    category: 'drink',
    type: 'tea',
    drinkType: 'tea'
  }
];

const FoodAndDrink = () => {
  const navigate = useNavigate();
  const { addToCart, totalItems } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [activeCategory, setActiveCategory] = useState('all');
  const { t } = useLanguage();

  const filterItems = (items: MenuItem[]): MenuItem[] => {
    // Filter by search term
    let filtered = items.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // Filter by main category (food, drink, all)
    if (activeTab !== 'all') {
      filtered = filtered.filter(item => item.category === activeTab);
    }
    
    // Filter by subcategory using the category from sidebar
    if (activeTab === 'food' && activeCategory !== 'all') {
      filtered = filtered.filter(item => item.type === activeCategory);
    }
    
    if (activeTab === 'drink' && activeCategory !== 'all') {
      filtered = filtered.filter(item => item.drinkType === activeCategory);
    }
    
    return filtered;
  };

  const filteredItems = filterItems(menuItems);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex">
        <SidebarProvider>
          <div className="flex min-h-screen w-full pt-16"> {/* Account for fixed navbar */}
            <FoodDrinkSidebar 
              activeTab={activeTab} 
              activeCategory={activeCategory} 
              onCategorySelect={setActiveCategory} 
            />
            
            <div className="flex-1 p-6">
              <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{t('foodDrink.title')}</h1>
                  <p className="text-muted-foreground">{t('foodDrink.subtitle')}</p>
                </div>
                
                <div className="flex items-center mt-4 md:mt-0">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="relative mr-2"
                    onClick={() => navigate('/cart')}
                  >
                    <ShoppingCart />
                    {totalItems > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">
                        {totalItems}
                      </Badge>
                    )}
                  </Button>
                  
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder={t('foodDrink.searchMenu')}
                      className="pl-8 w-[200px] md:w-[300px]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              
              <Tabs defaultValue="all" value={activeTab} onValueChange={(value) => {
                setActiveTab(value);
                setActiveCategory('all');
              }} className="w-full">
                <TabsList className="mb-8 flex justify-start overflow-x-auto">
                  <TabsTrigger value="all">{t('foodDrink.allItems')}</TabsTrigger>
                  <TabsTrigger value="food" className="flex items-center gap-1">
                    <Utensils className="w-4 h-4" />
                    {t('foodDrink.food')}
                  </TabsTrigger>
                  <TabsTrigger value="drink" className="flex items-center gap-1">
                    <Coffee className="w-4 h-4" />
                    {t('foodDrink.drinks')}
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredItems.map((item) => (
                      <MenuItemCard key={item.id} item={item} onAddToCart={addToCart} />
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="food" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredItems.map((item) => (
                      <MenuItemCard key={item.id} item={item} onAddToCart={addToCart} />
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="drink" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredItems.map((item) => (
                      <MenuItemCard key={item.id} item={item} onAddToCart={addToCart} />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </SidebarProvider>
      </div>
      
      <Footer />
    </div>
  );
};

// Menu Item Card Component
const MenuItemCard = ({ item, onAddToCart }: { item: MenuItem, onAddToCart: (item: MenuItem) => void }) => {
  const { t } = useLanguage();
  
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="h-48 overflow-hidden">
        {item.image_url ? (
          <img 
            src={item.image_url} 
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-slate-200 flex items-center justify-center">
            {item.category === 'food' ? <Utensils className="h-12 w-12 text-slate-400" /> : <Coffee className="h-12 w-12 text-slate-400" />}
          </div>
        )}
      </div>
      
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{item.name}</CardTitle>
            <Badge variant="outline" className="mt-1">
              {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
            </Badge>
          </div>
          <div className="text-lg font-bold">${item.price.toFixed(2)}</div>
        </div>
        <CardDescription className="mt-2">{item.description}</CardDescription>
      </CardHeader>
      
      <CardFooter className="mt-auto pt-0">
        <Button 
          onClick={() => onAddToCart(item)} 
          className="w-full"
        >
          {t('foodDrink.addToCart')}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FoodAndDrink;
