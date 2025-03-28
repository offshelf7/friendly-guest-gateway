
import { ServiceCategory } from "@/types/roomTypes";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Utensils, 
  Brush, 
  Heart, 
  HelpCircle, 
  User, 
  Edit, 
  Trash2 
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface ServiceCategoryCardProps {
  category: ServiceCategory;
  onEdit?: (category: ServiceCategory) => void;
  onDelete?: (id: string) => void;
}

export const ServiceCategoryCard = ({ 
  category, 
  onEdit, 
  onDelete 
}: ServiceCategoryCardProps) => {
  const getIcon = (iconName?: string) => {
    switch (iconName?.toLowerCase()) {
      case 'utensils': return <Utensils className="w-5 h-5" />;
      case 'broom': 
      case 'brush': return <Brush className="w-5 h-5" />;
      case 'spa': 
      case 'heart': return <Heart className="w-5 h-5" />;
      case 'concierge-bell': return <User className="w-5 h-5" />;
      case 'person-swimming': return <User className="w-5 h-5" />;
      default: return <HelpCircle className="w-5 h-5" />;
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="bg-slate-100 p-2 rounded-full">
              {getIcon(category.icon)}
            </div>
            <h3 className="font-medium text-lg">{category.name}</h3>
          </div>
          <div className="flex gap-2">
            {onEdit && (
              <Button variant="ghost" size="icon" onClick={() => onEdit(category)}>
                <Edit className="w-4 h-4" />
              </Button>
            )}
            {onDelete && (
              <Button variant="ghost" size="icon" onClick={() => onDelete(category.id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
        {category.description && (
          <p className="text-sm text-slate-600">{category.description}</p>
        )}
      </CardContent>
    </Card>
  );
};
