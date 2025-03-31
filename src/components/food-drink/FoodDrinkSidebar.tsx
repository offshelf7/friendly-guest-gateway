
import { Beer, Coffee, CupSoda, Grape, Wine } from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Define the categories with their icons
const drinkCategories = [
  { id: 'all', label: 'All Drinks', icon: CupSoda },
  { id: 'soft', label: 'Soft Drinks', icon: CupSoda },
  { id: 'beer', label: 'Beer', icon: Beer },
  { id: 'wine', label: 'Wine', icon: Wine },
  { id: 'cocktail', label: 'Cocktails', icon: CupSoda },
  { id: 'coffee', label: 'Coffee', icon: Coffee },
  { id: 'tea', label: 'Tea', icon: Coffee },
  { id: 'other', label: 'Other Beverages', icon: CupSoda },
];

// Define food categories
const foodCategories = [
  { id: 'all', label: 'All Food', icon: CupSoda },
  { id: 'main', label: 'Main Course', icon: CupSoda },
  { id: 'appetizer', label: 'Appetizers', icon: CupSoda },
  { id: 'dessert', label: 'Desserts', icon: CupSoda },
];

interface FoodDrinkSidebarProps {
  activeTab: string;
  activeCategory: string;
  onCategorySelect: (category: string) => void;
}

export function FoodDrinkSidebar({ activeTab, activeCategory, onCategorySelect }: FoodDrinkSidebarProps) {
  const categories = activeTab === 'food' ? foodCategories : activeTab === 'drink' ? drinkCategories : [];

  return (
    <Sidebar variant="inset" className="bg-sidebar border-r border-border">
      <SidebarHeader className="p-4">
        <h2 className="text-xl font-bold">Categories</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {categories.map((category) => (
            <SidebarMenuItem key={category.id}>
              <SidebarMenuButton
                isActive={activeCategory === category.id}
                onClick={() => onCategorySelect(category.id)}
                tooltip={category.label}
              >
                <category.icon className="shrink-0" />
                <span>{category.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="text-sm text-muted-foreground">
          Explore our delicious selections
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
