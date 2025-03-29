
import Navbar from '../components/layout/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Utensils, Wifi, Dumbbell, Cocktail, Car, Coffee, Waves, Shirt } from "lucide-react";
import Footer from '../components/home/Footer';

interface FacilityProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FacilityCard = ({ icon, title, description }: FacilityProps) => (
  <Card className="h-full transition-all hover:shadow-md">
    <CardHeader>
      <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
        {icon}
      </div>
      <CardTitle className="text-xl">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <CardDescription className="text-base">{description}</CardDescription>
    </CardContent>
  </Card>
);

const Facilities = () => {
  const facilities = [
    {
      icon: <Utensils className="h-6 w-6 text-primary" />,
      title: "Fine Dining",
      description: "Experience our award-winning restaurant with cuisine prepared by world-class chefs using locally sourced ingredients."
    },
    {
      icon: <Wifi className="h-6 w-6 text-primary" />,
      title: "High-Speed WiFi",
      description: "Stay connected with complimentary high-speed wireless internet access throughout the hotel."
    },
    {
      icon: <Dumbbell className="h-6 w-6 text-primary" />,
      title: "Fitness Center",
      description: "Maintain your fitness routine in our state-of-the-art gym equipped with modern cardio and strength-training equipment."
    },
    {
      icon: <Waves className="h-6 w-6 text-primary" />,
      title: "Swimming Pool",
      description: "Relax in our temperature-controlled indoor and outdoor swimming pools with dedicated lanes for lap swimming."
    },
    {
      icon: <Cocktail className="h-6 w-6 text-primary" />,
      title: "Bar & Lounge",
      description: "Unwind with premium cocktails and beverages in our elegant bar and lounge area with live entertainment."
    },
    {
      icon: <Shirt className="h-6 w-6 text-primary" />,
      title: "Laundry Service",
      description: "Keep your wardrobe fresh with our prompt laundry and dry-cleaning services available daily."
    },
    {
      icon: <Car className="h-6 w-6 text-primary" />,
      title: "Valet Parking",
      description: "Enjoy hassle-free arrival and departure with our professional valet parking service."
    },
    {
      icon: <Coffee className="h-6 w-6 text-primary" />,
      title: "Business Center",
      description: "Access our fully equipped business center with printing, scanning, and video conferencing capabilities."
    }
  ];

  return (
    <div className="min-h-screen pt-20 bg-slate-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[400px] bg-gradient-to-r from-blue-800 to-blue-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative h-full max-w-7xl mx-auto px-4 flex flex-col justify-center items-center text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Our Facilities</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl">
            Discover the exceptional amenities and services that make your stay with us truly memorable.
          </p>
        </div>
      </div>
      
      {/* Facilities Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">World-Class Amenities</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            We pride ourselves on offering the finest facilities and services to ensure your stay is as comfortable and enjoyable as possible.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {facilities.map((facility, index) => (
            <FacilityCard 
              key={index}
              icon={facility.icon}
              title={facility.title}
              description={facility.description}
            />
          ))}
        </div>
      </div>
      
      {/* Facilities Overview */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Experience Luxury at Every Turn</h2>
              <p className="text-slate-600 mb-6">
                Our hotel boasts a wide range of facilities designed to provide you with the ultimate luxury experience. From our exquisite dining options to recreational amenities, we ensure that every aspect of your stay exceeds expectations.
              </p>
              <p className="text-slate-600">
                All facilities are maintained to the highest standards of cleanliness and service excellence, with our dedicated staff available 24/7 to assist with any requests you may have.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                alt="Hotel facilities" 
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Facilities;
