
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Facility } from "@/types/facilityTypes";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Calendar, Clock, MapPin, DollarSign } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface FacilityDetailDialogProps {
  facility: Facility;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const FacilityDetailDialog = ({ facility, isOpen, onOpenChange }: FacilityDetailDialogProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();
  
  const handleBookNow = () => {
    onOpenChange(false);
    
    if (facility.category === 'dining') {
      navigate('/food-and-drink');
    } else {
      // For other services, navigate to contact page
      navigate('/contact', { 
        state: { 
          subject: `Inquiry about ${facility.name}`,
          message: `I would like more information about ${facility.name}.`
        } 
      });
    }
  };
  
  const defaultImage = "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?q=80&w=2071&auto=format&fit=crop";
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{facility.name}</DialogTitle>
          <DialogDescription>{facility.description}</DialogDescription>
        </DialogHeader>
        
        <div className="mt-4">
          {/* Image Gallery */}
          {(facility.images && facility.images.length > 0) ? (
            <div className="relative mb-6">
              <AspectRatio ratio={16 / 9} className="bg-muted rounded-md overflow-hidden">
                <img 
                  src={facility.images[currentImageIndex]} 
                  alt={`${facility.name} - ${currentImageIndex + 1}`}
                  className="object-cover w-full h-full"
                />
              </AspectRatio>
              
              {facility.images.length > 1 && (
                <div className="flex justify-center mt-2 gap-2">
                  {facility.images.map((_, index) => (
                    <button 
                      key={index} 
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full ${index === currentImageIndex ? 'bg-primary' : 'bg-muted-foreground'}`}
                      aria-label={`View image ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <AspectRatio ratio={16 / 9} className="bg-muted rounded-md overflow-hidden mb-6">
              <img 
                src={defaultImage} 
                alt={facility.name}
                className="object-cover w-full h-full"
              />
            </AspectRatio>
          )}
          
          {/* Key Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {facility.openingHours && (
              <div className="flex items-start gap-2">
                <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium">Opening Hours</h4>
                  <p className="text-sm text-muted-foreground">{facility.openingHours}</p>
                </div>
              </div>
            )}
            
            {facility.location && (
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium">Location</h4>
                  <p className="text-sm text-muted-foreground">{facility.location}</p>
                </div>
              </div>
            )}
            
            {facility.priceInfo && (
              <div className="flex items-start gap-2">
                <DollarSign className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium">Pricing</h4>
                  <p className="text-sm text-muted-foreground">{facility.priceInfo}</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Extended Description */}
          {facility.fullDescription && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">About {facility.name}</h3>
              <p className="text-muted-foreground">{facility.fullDescription}</p>
            </div>
          )}
          
          {/* Features List */}
          {facility.features && facility.features.length > 0 && (
            <Accordion type="single" collapsible className="mb-6">
              <AccordionItem value="features">
                <AccordionTrigger>Features & Amenities</AccordionTrigger>
                <AccordionContent>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 list-disc pl-5">
                    {facility.features.map((feature, index) => (
                      <li key={index} className="text-muted-foreground">{feature}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
            <Button onClick={handleBookNow} className="flex-1">
              {facility.category === 'dining' ? 'View Menu' : 'Book Now'}
            </Button>
            <Button variant="outline" onClick={() => navigate('/contact')} className="flex-1">
              Contact Us
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FacilityDetailDialog;
