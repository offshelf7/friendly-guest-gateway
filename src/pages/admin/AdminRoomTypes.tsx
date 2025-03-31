
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

// Sample room types data (would normally come from API)
const roomTypesData = [
  {
    id: '1',
    name: 'Standard Double',
    basePrice: 149,
    maxOccupancy: 2,
    amenities: ['Wi-Fi', 'TV', 'Air Conditioning', 'Private Bathroom'],
    description: 'Comfortable room with a double bed, suitable for couples',
  },
  {
    id: '2',
    name: 'Deluxe Suite',
    basePrice: 299,
    maxOccupancy: 2,
    amenities: ['Wi-Fi', 'TV', 'Mini Bar', 'King Bed', 'Lounge Area', 'Jacuzzi'],
    description: 'Spacious suite with separate bedroom and living area',
  },
  {
    id: '3',
    name: 'Family Room',
    basePrice: 249,
    maxOccupancy: 4,
    amenities: ['Wi-Fi', 'TV', 'Air Conditioning', 'Multiple Beds', 'Extra Space'],
    description: 'Larger room ideal for families, with multiple bed configurations available',
  },
  {
    id: '4',
    name: 'Economy Single',
    basePrice: 99,
    maxOccupancy: 1,
    amenities: ['Wi-Fi', 'TV', 'Single Bed', 'Desk'],
    description: 'Cozy room with a single bed, perfect for solo travelers',
  }
];

const AdminRoomTypes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  
  const handleAddRoomType = () => {
    toast({
      title: "Add Room Type",
      description: "Room type creation form would open here.",
    });
  };

  const filteredRoomTypes = roomTypesData.filter(type => 
    type.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    type.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Room Type Management</h1>
          <p className="text-muted-foreground">Manage hotel room types and their amenities</p>
        </div>
        <Button onClick={handleAddRoomType} className="gap-1">
          <Plus className="h-4 w-4" />
          Add Room Type
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>All Room Types</CardTitle>
              <CardDescription>Configure room types, pricing, and included amenities</CardDescription>
            </div>
            <div className="relative max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search room types..."
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
                  <th className="py-3 px-4 text-left">Base Price</th>
                  <th className="py-3 px-4 text-left">Max Occupancy</th>
                  <th className="py-3 px-4 text-left">Amenities</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRoomTypes.map((type) => (
                  <tr key={type.id} className="border-t hover:bg-muted/30">
                    <td className="py-3 px-4 font-medium">{type.name}</td>
                    <td className="py-3 px-4">${type.basePrice}</td>
                    <td className="py-3 px-4">{type.maxOccupancy} {type.maxOccupancy > 1 ? 'persons' : 'person'}</td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {type.amenities.slice(0, 3).map((amenity, index) => (
                          <Badge key={index} variant="outline" className="mr-1">
                            {amenity}
                          </Badge>
                        ))}
                        {type.amenities.length > 3 && (
                          <Badge variant="outline">+{type.amenities.length - 3} more</Badge>
                        )}
                      </div>
                    </td>
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
    </div>
  );
};

export default AdminRoomTypes;
