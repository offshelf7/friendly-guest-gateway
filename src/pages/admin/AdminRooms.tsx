
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";

// Define room interface
interface Room {
  id: string;
  name: string;
  type: string;
  price: number;
  capacity: number;
  status: 'available' | 'occupied' | 'maintenance';
  description?: string;
  image_url?: string;
}

// Sample room data (would normally come from API)
const initialRoomsData: Room[] = [
  {
    id: '1',
    name: 'Deluxe Suite',
    type: 'suite',
    price: 299,
    capacity: 2,
    status: 'available',
    description: 'Spacious suite with a king bed and city view.'
  },
  {
    id: '2',
    name: 'Premium King',
    type: 'king',
    price: 199,
    capacity: 2,
    status: 'occupied',
    description: 'Comfortable room with a king bed and modern amenities.'
  },
  {
    id: '3',
    name: 'Standard Double',
    type: 'double',
    price: 149,
    capacity: 2,
    status: 'maintenance',
    description: 'Cozy room with two double beds.'
  },
  {
    id: '4',
    name: 'Family Suite',
    type: 'suite',
    price: 349,
    capacity: 4,
    status: 'available',
    description: 'Large suite with separate bedrooms, perfect for families.'
  },
  {
    id: '5',
    name: 'Economy Single',
    type: 'single',
    price: 99,
    capacity: 1,
    status: 'available',
    description: 'Compact room with a single bed, ideal for solo travelers.'
  }
];

const roomTypeOptions = [
  { value: 'single', label: 'Single' },
  { value: 'double', label: 'Double' },
  { value: 'king', label: 'King' },
  { value: 'queen', label: 'Queen' },
  { value: 'suite', label: 'Suite' },
  { value: 'penthouse', label: 'Penthouse' }
];

const roomStatusOptions = [
  { value: 'available', label: 'Available' },
  { value: 'occupied', label: 'Occupied' },
  { value: 'maintenance', label: 'Maintenance' }
];

const AdminRooms = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [roomsData, setRoomsData] = useState<Room[]>(initialRoomsData);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const { toast } = useToast();
  
  // Define room form schema with Zod
  const roomFormSchema = z.object({
    name: z.string().min(1, "Room name is required"),
    type: z.string().min(1, "Room type is required"),
    price: z.coerce.number().positive("Price must be a positive number"),
    capacity: z.coerce.number().int().positive("Capacity must be a positive integer"),
    status: z.enum(["available", "occupied", "maintenance"]),
    description: z.string().optional(),
    image_url: z.string().optional()
  });

  // Create form
  const form = useForm<z.infer<typeof roomFormSchema>>({
    resolver: zodResolver(roomFormSchema),
    defaultValues: {
      name: "",
      type: "single",
      price: 99,
      capacity: 1,
      status: "available",
      description: "",
      image_url: ""
    }
  });

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
    setEditingRoom(null);
    form.reset({
      name: "",
      type: "single",
      price: 99,
      capacity: 1,
      status: "available",
      description: "",
      image_url: ""
    });
    setIsDialogOpen(true);
  };

  const handleEditRoom = (room: Room) => {
    setEditingRoom(room);
    form.reset({
      name: room.name,
      type: room.type,
      price: room.price,
      capacity: room.capacity,
      status: room.status,
      description: room.description || "",
      image_url: room.image_url || ""
    });
    setIsDialogOpen(true);
  };

  const handleDeleteRoom = (roomId: string) => {
    setRoomsData(roomsData.filter(room => room.id !== roomId));
    toast({
      title: "Room deleted",
      description: "The room has been deleted successfully.",
    });
  };

  const onSubmit = (data: z.infer<typeof roomFormSchema>) => {
    if (editingRoom) {
      // Update existing room
      setRoomsData(roomsData.map(room => 
        room.id === editingRoom.id 
          ? { ...room, ...data } 
          : room
      ));
      toast({
        title: "Room updated",
        description: "The room has been updated successfully.",
      });
    } else {
      // Add new room
      const newRoom: Room = {
        id: Date.now().toString(), // In a real app, this would be generated by the backend
        ...data
      };
      setRoomsData([...roomsData, newRoom]);
      toast({
        title: "Room added",
        description: "New room has been added successfully.",
      });
    }
    setIsDialogOpen(false);
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
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleEditRoom(room)}
                          >
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleDeleteRoom(room.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredRooms.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-6 text-center">
                        No rooms found. Try adjusting your search or add a new room.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Room Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>{editingRoom ? 'Edit Room' : 'Add New Room'}</DialogTitle>
            <DialogDescription>
              {editingRoom 
                ? 'Make changes to the room details below.' 
                : 'Fill in the details to add a new room.'}
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Room Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Deluxe Suite" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Room Type</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a room type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {roomTypeOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price (per night)</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" step="0.01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="capacity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Capacity</FormLabel>
                      <FormControl>
                        <Input type="number" min="1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select room status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {roomStatusOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe the room..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="image_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/image.jpg" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="submit">
                  {editingRoom ? 'Save Changes' : 'Add Room'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminRooms;
