
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Utensils, Coffee, DumbbellIcon, Waves, Leaf, Wifi, BookOpen, MapPin, Wine } from "lucide-react";
import Navbar from '../components/layout/Navbar';
import Footer from '../components/home/Footer';
import FacilityDetailDialog from '../components/facilities/FacilityDetailDialog';
import { Facility } from '@/types/facilityTypes';
import { useLanguage } from '@/contexts/LanguageContext';

// Mock API function to fetch facilities data with extended information
const fetchFacilities = async () => {
  // In a real app, this would be an API call
  // For now, we'll return the static data after a short delay to simulate a network request
  return new Promise<Facility[]>((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: "Fine Dining Restaurant",
          description: "Experience exquisite cuisine with our award-winning chefs",
          icon: "Utensils",
          category: "dining",
          fullDescription: "Our Fine Dining Restaurant offers an unforgettable culinary journey crafted by our award-winning chefs. Using only the finest local and seasonal ingredients, each dish is a masterpiece of flavor and presentation. The elegant ambiance and impeccable service create the perfect setting for romantic dinners, special celebrations, or business meetings.",
          images: [
            "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1592861956120-e524fc739696?q=80&w=2070&auto=format&fit=crop"
          ],
          features: [
            "Private dining rooms available",
            "Seasonal menu with local ingredients",
            "Award-winning wine selection",
            "Vegetarian and vegan options",
            "Tasting menu with wine pairing",
            "Professional sommelier service"
          ],
          priceInfo: "$$$$ (Fine dining)",
          openingHours: "Dinner: 6:00 PM - 11:00 PM daily",
          location: "Main Building, Ground Floor",
          bookingRequired: true
        },
        {
          id: 2,
          name: "Coffee Lounge",
          description: "Relax with premium coffee and pastries throughout the day",
          icon: "Coffee",
          category: "dining",
          fullDescription: "Our Coffee Lounge is the perfect retreat for coffee enthusiasts and casual meetings. We serve specialty coffee sourced from sustainable farms worldwide, expertly prepared by our trained baristas. Complement your beverage with freshly baked pastries and light snacks made in-house daily. The lounge features comfortable seating, ambient lighting, and complimentary Wi-Fi.",
          images: [
            "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=2070&auto=format&fit=crop"
          ],
          features: [
            "Specialty coffee selection",
            "Freshly baked pastries",
            "Light meals and snacks",
            "Comfortable lounge seating",
            "Free Wi-Fi",
            "Power outlets at every table"
          ],
          priceInfo: "$$ (Moderate)",
          openingHours: "6:00 AM - 8:00 PM daily",
          location: "Main Building, Lobby Level",
          bookingRequired: false
        },
        {
          id: 3,
          name: "Bar & Lounge",
          description: "Enjoy signature cocktails and an extensive wine selection",
          icon: "Wine",
          category: "dining",
          fullDescription: "Unwind in our sophisticated Bar & Lounge, where expert mixologists craft signature cocktails and pour premium spirits. Our extensive wine list features selections from renowned vineyards worldwide. The ambient lighting, plush seating, and live piano music on select evenings create an atmosphere of refined relaxation. Perfect for pre-dinner drinks or nightcaps.",
          images: [
            "https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=2069&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1525268323446-0505b6fe7778?q=80&w=2072&auto=format&fit=crop"
          ],
          features: [
            "Signature cocktails",
            "Extensive wine selection",
            "Premium spirits collection",
            "Light gourmet snacks",
            "Live piano music (Thu-Sat)",
            "Outdoor terrace seating"
          ],
          priceInfo: "$$$ (Premium)",
          openingHours: "4:00 PM - 1:00 AM daily",
          location: "Main Building, Lobby Level",
          bookingRequired: false
        },
        {
          id: 4,
          name: "Fitness Center",
          description: "State-of-the-art equipment and personal training sessions",
          icon: "DumbbellIcon",
          category: "wellness",
          fullDescription: "Our modern Fitness Center features state-of-the-art Technogym equipment for both cardio and strength training. Certified personal trainers are available for one-on-one sessions tailored to your fitness goals. The center also offers daily group classes including yoga, HIIT, and spinning. Towels, water, and fresh fruit are complimentary for all guests.",
          images: [
            "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1571902943202-507ec2618538?q=80&w=2075&auto=format&fit=crop"
          ],
          features: [
            "State-of-the-art Technogym equipment",
            "Cardio and strength training zones",
            "Personal training available",
            "Daily group fitness classes",
            "Complimentary towels and water",
            "Open 24 hours for hotel guests"
          ],
          priceInfo: "Complimentary for hotel guests, Personal training: $$$",
          openingHours: "24 hours for hotel guests",
          location: "Wellness Wing, Level 2",
          bookingRequired: false
        },
        {
          id: 5,
          name: "Swimming Pool",
          description: "Indoor and outdoor pools with lounging areas",
          icon: "Waves",
          category: "wellness",
          fullDescription: "Our swimming facilities include both indoor and outdoor pools designed for relaxation and exercise. The heated indoor pool is perfect for lap swimming year-round, while the outdoor infinity pool offers breathtaking views. Comfortable loungers, cabanas, and poolside service ensure a luxurious experience. An adjacent whirlpool spa and children's splash area complete the offering.",
          images: [
            "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1519214605650-76a613ee3245?q=80&w=2069&auto=format&fit=crop"
          ],
          features: [
            "Heated indoor lap pool",
            "Outdoor infinity pool with views",
            "Whirlpool spa",
            "Children's splash area",
            "Poolside food and beverage service",
            "Private cabanas available"
          ],
          priceInfo: "Complimentary for hotel guests, Cabana rental: $$$",
          openingHours: "Indoor: 6:00 AM - 10:00 PM, Outdoor: 8:00 AM - 8:00 PM (seasonal)",
          location: "Wellness Wing, Level 1",
          bookingRequired: false
        },
        {
          id: 6,
          name: "Spa & Wellness",
          description: "Rejuvenating treatments and massages for ultimate relaxation",
          icon: "Leaf",
          category: "wellness",
          fullDescription: "Our Spa & Wellness center is a sanctuary dedicated to rejuvenation and relaxation. Indulge in a wide range of treatments including massages, facials, body wraps, and aromatherapy, all using premium organic products. Our expert therapists customize each treatment to your specific needs. The spa facilities include steam rooms, saunas, relaxation lounges, and a vitality pool.",
          images: [
            "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=2070&auto=format&fit=crop"
          ],
          features: [
            "Customized massage therapies",
            "Facial treatments",
            "Body wraps and scrubs",
            "Couples treatment rooms",
            "Steam room and sauna",
            "Relaxation lounges with refreshments"
          ],
          priceInfo: "$$$$ (Premium)",
          openingHours: "9:00 AM - 8:00 PM daily",
          location: "Wellness Wing, Level 2",
          bookingRequired: true
        },
        {
          id: 7,
          name: "High-Speed WiFi",
          description: "Complimentary high-speed internet throughout the property",
          icon: "Wifi",
          category: "services",
          fullDescription: "Stay connected with our complimentary high-speed WiFi available throughout the property. Our enterprise-grade network ensures consistent coverage and bandwidth for everything from casual browsing to video conferencing. A dedicated secure network is available for business needs, and technical support is available 24/7 through our IT concierge service.",
          features: [
            "Complimentary access for all guests",
            "Enterprise-grade security",
            "Coverage throughout the property",
            "Dedicated business network available",
            "24/7 technical support",
            "Unlimited devices per room"
          ],
          priceInfo: "Complimentary",
          openingHours: "Available 24/7",
          location: "Property-wide",
          bookingRequired: false
        },
        {
          id: 8,
          name: "Business Center",
          description: "Meeting rooms and business services available 24/7",
          icon: "BookOpen",
          category: "services",
          fullDescription: "Our Business Center offers a comprehensive suite of services and facilities for corporate travelers. Fully equipped meeting rooms of various sizes are available with the latest audiovisual technology. The center provides printing, scanning, and videoconferencing capabilities, as well as secretarial and translation services upon request. Private office spaces can be rented hourly or daily.",
          images: [
            "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069&auto=format&fit=crop"
          ],
          features: [
            "Private meeting rooms",
            "Video conferencing facilities",
            "Printing and scanning services",
            "Secretarial services available",
            "Translation services",
            "Complimentary beverages"
          ],
          priceInfo: "Meeting rooms: $$-$$$ depending on size",
          openingHours: "24/7 access for hotel guests",
          location: "Main Building, Level B1",
          bookingRequired: true
        },
        {
          id: 9,
          name: "Concierge Services",
          description: "Local recommendations, reservations, and tour arrangements",
          icon: "MapPin",
          category: "services",
          fullDescription: "Our dedicated concierge team is available to enhance your stay with personalized assistance and local expertise. From restaurant reservations and theater tickets to customized itineraries and exclusive experiences, our team can handle all your requests with discretion and efficiency. The concierge desk also offers transportation arrangements, shopping assistance, and special occasion planning.",
          images: [
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop"
          ],
          features: [
            "Restaurant reservations",
            "Theater and event tickets",
            "Custom itinerary planning",
            "Transportation arrangements",
            "Shopping assistance",
            "Special occasion planning"
          ],
          priceInfo: "Complimentary service (excludes third-party costs)",
          openingHours: "7:00 AM - 11:00 PM daily",
          location: "Main Lobby, Front Desk",
          bookingRequired: false
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
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { t } = useLanguage();
  
  // Use TanStack Query to fetch facilities data
  const { data: facilities = [], isLoading, error } = useQuery({
    queryKey: ['facilities'],
    queryFn: fetchFacilities
  });
  
  // Filter the facilities based on the active tab
  const filteredFacilities = activeTab === 'all' 
    ? facilities
    : facilities.filter((facility) => facility.category === activeTab);
  
  const handleLearnMore = (facility: Facility) => {
    setSelectedFacility(facility);
    setIsDialogOpen(true);
  };
  
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <Navbar />
      
      <div className="container mx-auto py-24 px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">{t('facilities.title')}</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('facilities.subtitle')}
          </p>
        </div>
        
        <div className="flex justify-center flex-wrap gap-2 mb-10">
          <Button 
            variant={activeTab === 'all' ? 'default' : 'outline'} 
            onClick={() => setActiveTab('all')}
            className="mb-2"
          >
            {t('facilities.allFacilities')}
          </Button>
          <Button 
            variant={activeTab === 'dining' ? 'default' : 'outline'} 
            onClick={() => setActiveTab('dining')}
            className="mb-2"
          >
            {t('facilities.dining')}
          </Button>
          <Button 
            variant={activeTab === 'wellness' ? 'default' : 'outline'} 
            onClick={() => setActiveTab('wellness')}
            className="mb-2"
          >
            {t('facilities.wellness')}
          </Button>
          <Button 
            variant={activeTab === 'services' ? 'default' : 'outline'} 
            onClick={() => setActiveTab('services')}
            className="mb-2"
          >
            {t('facilities.services')}
          </Button>
        </div>
        
        {isLoading ? (
          <div className="text-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p>{t('facilities.loading')}</p>
          </div>
        ) : error ? (
          <div className="text-center py-10 text-red-500">{t('facilities.error')}</div>
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
                  <Button 
                    variant="outline" 
                    onClick={() => handleLearnMore(facility)}
                  >
                    {t('facilities.learnMore')}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      
      {selectedFacility && (
        <FacilityDetailDialog
          facility={selectedFacility}
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
        />
      )}
      
      <Footer />
    </div>
  );
};

export default Facilities;
