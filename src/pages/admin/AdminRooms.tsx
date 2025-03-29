
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

// Sample room data (would normally come from API)
const roomsData = [
  {
    id: '1',
    name: 'Deluxe Suite',
    type: 'suite',
    price: 299,
    capacity: 2,
    status: 'available'
  },
  {
    id: '2',
    name: 'Premium King',
    type: 'king',
    price: 199,
    capacity: 2,
    status: 'occupied'
  },
  {
    id: '3',
    name: 'Standard Double',
    type: 'double',
    price: 149,
    capacity: 2,
    status: 'maintenance'
  },
  {
    id: '4',
    name: 'Family Suite',
    type: 'suite',
    price: 349,
    capacity: 4,
    status: 'available'
  },
  {
    id: '5',
    name: 'Economy Single',
    type: 'single',
    price: 99,
    capacity: 1,
    status: 'available'
  }
];

const AdminRooms = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  
  const getRoomStatusVariant = (status: string) => {
    switch (status) {
      case 'available':
        return "outline";
      case 'occupied':
        return "secondary";
      case 'maintenance':
        return "destructive";
      default:
        return "default";
    }
  };

  const handleAddRoom = () => {
    toast({
      title: "Add Room",
      description: "Room creation form would open here.",
    });
  };

  const filteredRooms = roomsData.filter(room => 
    room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Room Management</h1>
          <p className="text-muted-foreground">Manage hotel rooms and availability</p>
        </div>
        <Button onClick={handleAddRoom} className="gap-1">
          <Plus className="h-4 w-4" />
          Add Room
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>All Rooms</CardTitle>
              <CardDescription>View and manage all hotel rooms</CardDescription>
            </div>
            <div className="relative max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search rooms..."
                className="pl-8 w-[200px] md:w-[300px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="py-3 px-4 text-left">Name</th>
                    <th className="py-3 px-4 text-left">Type</th>
                    <th className="py-3 px-4 text-left">Price</th>
                    <th className="py-3 px-4 text-left">Capacity</th>
                    <th className="py-3 px-4 text-left">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRooms.map((room) => (
                    <tr key={room.id} className="border-t hover:bg-muted/30">
                      <td className="py-3 px-4 font-medium">{room.name}</td>
                      <td className="py-3 px-4 capitalize">{room.type}</td>
                      <td className="py-3 px-4">${room.price}</td>
                      <td className="py-3 px-4">{room.capacity} {room.capacity > 1 ? 'persons' : 'person'}</td>
                      <td className="py-3 px-4">
                        <Badge variant={getRoomStatusVariant(room.status)} className="capitalize">
                          {room.status}
                        </Badge>
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminRooms;
