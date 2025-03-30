
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Utensils, Coffee, DumbbellIcon, Waves, Leaf, Wifi, BookOpen, MapPin, Wine } from "lucide-react";
import Navbar from '../components/layout/Navbar';
import Footer from '../components/home/Footer';

// Mock API function to fetch facilities data
const fetchFacilities = async () => {
  // In a real app, this would be an API call
  // For now, we'll return the static data after a short delay to simulate a network request
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: "Fine Dining Restaurant",
          description: "Experience exquisite cuisine with our award-winning chefs",
          icon: "Utensils",
          category: "dining"
        },
        {
          id: 2,
          name: "Coffee Lounge",
          description: "Relax with premium coffee and pastries throughout the day",
          icon: "Coffee",
          category: "dining"
        },
        {
          id: 3,
          name: "Bar & Lounge",
          description: "Enjoy signature cocktails and an extensive wine selection",
          icon: "Wine",
          category: "dining"
        },
        {
          id: 4,
          name: "Fitness Center",
          description: "State-of-the-art equipment and personal training sessions",
          icon: "DumbbellIcon",
          category: "wellness"
        },
        {
          id: 5,
          name: "Swimming Pool",
          description: "Indoor and outdoor pools with lounging areas",
          icon: "Waves",
          category: "wellness"
        },
        {
          id: 6,
          name: "Spa & Wellness",
          description: "Rejuvenating treatments and massages for ultimate relaxation",
          icon: "Leaf",
          category: "wellness"
        },
        {
          id: 7,
          name: "High-Speed WiFi",
          description: "Complimentary high-speed internet throughout the property",
          icon: "Wifi",
          category: "services"
        },
        {
          id: 8,
          name: "Business Center",
          description: "Meeting rooms and business services available 24/7",
          icon: "BookOpen",
          category: "services"
        },
        {
          id: 9,
          name: "Concierge Services",
          description: "Local recommendations, reservations, and tour arrangements",
          icon: "MapPin",
          category: "services"
        }
      ]);
    }, 500);
  });
};

// Helper function to get the icon component based on icon name
const getIconComponent = (iconName: string) => {
  const icons: Record<string, React.ReactNode> = {
    Utensils: <Utensils className="h-8 w-8 mb-2 text-primary" />,
    Coffee: <Coffee className="h-8 w-8 mb-2 text-primary" />,
    Wine: <Wine className="h-8 w-8 mb-2 text-primary" />,
    DumbbellIcon: <DumbbellIcon className="h-8 w-8 mb-2 text-primary" />,
    Waves: <Waves className="h-8 w-8 mb-2 text-primary" />,
    Leaf: <Leaf className="h-8 w-8 mb-2 text-primary" />,
    Wifi: <Wifi className="h-8 w-8 mb-2 text-primary" />,
    BookOpen: <BookOpen className="h-8 w-8 mb-2 text-primary" />,
    MapPin: <MapPin className="h-8 w-8 mb-2 text-primary" />
  };
  
  return icons[iconName] || null;
};

const Facilities = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  // Use TanStack Query to fetch facilities data
  const { data: facilities = [], isLoading, error } = useQuery({
    queryKey: ['facilities'],
    queryFn: fetchFacilities
  });
  
  // Type the data properly to avoid the filter error
  type Facility = {
    id: number;
    name: string;
    description: string;
    icon: string;
    category: string;
  }
  
  // Now filter the facilities with proper typing
  const filteredFacilities = activeTab === 'all' 
    ? facilities as Facility[]
    : (facilities as Facility[]).filter((facility) => facility.category === activeTab);
  
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <Navbar />
      
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
        
        {isLoading ? (
          <div className="text-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p>Loading facilities...</p>
          </div>
        ) : error ? (
          <div className="text-center py-10 text-red-500">Error loading facilities. Please try again later.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFacilities.map((facility) => (
              <Card key={facility.id} className="transition-all hover:shadow-md">
                <CardHeader className="text-center">
                  <div className="flex justify-center">
                    {getIconComponent(facility.icon)}
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
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Facilities;
