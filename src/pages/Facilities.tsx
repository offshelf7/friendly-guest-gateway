
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Utensils, Coffee, DumbbellIcon, Waves, Spa, Wifi, BookOpen, MapPin, Wine } from "lucide-react";

const Facilities = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  const facilities = [
    {
      id: 1,
      name: "Fine Dining Restaurant",
      description: "Experience exquisite cuisine with our award-winning chefs",
      icon: <Utensils className="h-8 w-8 mb-2 text-primary" />,
      category: "dining"
    },
    {
      id: 2,
      name: "Coffee Lounge",
      description: "Relax with premium coffee and pastries throughout the day",
      icon: <Coffee className="h-8 w-8 mb-2 text-primary" />,
      category: "dining"
    },
    {
      id: 3,
      name: "Bar & Lounge",
      description: "Enjoy signature cocktails and an extensive wine selection",
      icon: <Wine className="h-8 w-8 mb-2 text-primary" />,
      category: "dining"
    },
    {
      id: 4,
      name: "Fitness Center",
      description: "State-of-the-art equipment and personal training sessions",
      icon: <DumbbellIcon className="h-8 w-8 mb-2 text-primary" />,
      category: "wellness"
    },
    {
      id: 5,
      name: "Swimming Pool",
      description: "Indoor and outdoor pools with lounging areas",
      icon: <Waves className="h-8 w-8 mb-2 text-primary" />,
      category: "wellness"
    },
    {
      id: 6,
      name: "Spa & Wellness",
      description: "Rejuvenating treatments and massages for ultimate relaxation",
      icon: <Spa className="h-8 w-8 mb-2 text-primary" />,
      category: "wellness"
    },
    {
      id: 7,
      name: "High-Speed WiFi",
      description: "Complimentary high-speed internet throughout the property",
      icon: <Wifi className="h-8 w-8 mb-2 text-primary" />,
      category: "services"
    },
    {
      id: 8,
      name: "Business Center",
      description: "Meeting rooms and business services available 24/7",
      icon: <BookOpen className="h-8 w-8 mb-2 text-primary" />,
      category: "services"
    },
    {
      id: 9,
      name: "Concierge Services",
      description: "Local recommendations, reservations, and tour arrangements",
      icon: <MapPin className="h-8 w-8 mb-2 text-primary" />,
      category: "services"
    }
  ];
  
  const filteredFacilities = activeTab === 'all' 
    ? facilities 
    : facilities.filter(facility => facility.category === activeTab);
  
  return (
    <div className="container mx-auto py-24 px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Our Facilities</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover our premium facilities designed to enhance your stay and provide unforgettable experiences.
        </p>
      </div>
      
      <div className="flex justify-center flex-wrap gap-2 mb-10">
        <Button 
          variant={activeTab === 'all' ? 'default' : 'outline'} 
          onClick={() => setActiveTab('all')}
          className="mb-2"
        >
          All Facilities
        </Button>
        <Button 
          variant={activeTab === 'dining' ? 'default' : 'outline'} 
          onClick={() => setActiveTab('dining')}
          className="mb-2"
        >
          Dining
        </Button>
        <Button 
          variant={activeTab === 'wellness' ? 'default' : 'outline'} 
          onClick={() => setActiveTab('wellness')}
          className="mb-2"
        >
          Wellness
        </Button>
        <Button 
          variant={activeTab === 'services' ? 'default' : 'outline'} 
          onClick={() => setActiveTab('services')}
          className="mb-2"
        >
          Services
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFacilities.map((facility) => (
          <Card key={facility.id} className="transition-all hover:shadow-md">
            <CardHeader className="text-center">
              <div className="flex justify-center">
                {facility.icon}
              </div>
              <CardTitle>{facility.name}</CardTitle>
              <CardDescription>{facility.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center pb-6">
              <Button variant="outline">Learn More</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Facilities;
