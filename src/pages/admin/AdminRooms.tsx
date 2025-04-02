
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Room } from "@/types/adminTypes";
import { format } from "date-fns";
import {
  LayoutDashboard,
  Plus,
  Edit,
  Trash,
  Search,
  Filter,
  Bed,
  Users,
  DollarSign,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Form schema for room
const roomFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  room_type: z.string().min(1, "Room type is required"),
  price_per_night: z.coerce.number().positive("Price must be positive"),
  capacity: z.coerce.number().int().positive("Capacity must be a positive integer"),
  description: z.string().min(1, "Description is required"),
  image_url: z.string().url("Must be a valid URL").or(z.string().length(0)),
  is_available: z.boolean().default(true),
});

const AdminRooms = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const { toast } = useToast();

  // Setup form with react-hook-form
  const form = useForm<z.infer<typeof roomFormSchema>>({
    resolver: zodResolver(roomFormSchema),
    defaultValues: {
      name: "",
      room_type: "",
      price_per_night: 0,
      capacity: 1,
      description: "",
      image_url: "",
      is_available: true,
    },
  });

  // Load rooms
  const fetchRooms = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("rooms")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setRooms(data as Room[]);
    } catch (error: any) {
      console.error("Error fetching rooms:", error);
      toast({
        title: "Error fetching rooms",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  // Set form values when editing
  useEffect(() => {
    if (selectedRoom) {
      form.reset({
        name: selectedRoom.name,
        room_type: selectedRoom.room_type,
        price_per_night: selectedRoom.price_per_night,
        capacity: selectedRoom.capacity,
        description: selectedRoom.description,
        image_url: selectedRoom.image_url || "",
        is_available: selectedRoom.is_available,
      });
    } else {
      form.reset({
        name: "",
        room_type: "",
        price_per_night: 0,
        capacity: 1,
        description: "",
        image_url: "",
        is_available: true,
      });
    }
  }, [selectedRoom, form]);

  // Filter rooms based on search term and room type
  const filteredRooms = rooms.filter((room) => {
    const matchesSearch =
      room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterType === "all") return matchesSearch;
    return matchesSearch && room.room_type === filterType;
  });

  // Get unique room types for filter
  const roomTypes = Array.from(
    new Set(rooms.map((room) => room.room_type))
  );

  // Handle form submission
  const onSubmit = async (data: z.infer<typeof roomFormSchema>) => {
    try {
      if (selectedRoom) {
        // Update existing room
        const { error } = await supabase
          .from("rooms")
          .update({
            name: data.name,
            room_type: data.room_type,
            price_per_night: data.price_per_night,
            capacity: data.capacity,
            description: data.description,
            image_url: data.image_url || null,
            is_available: data.is_available,
          })
          .eq("id", selectedRoom.id);

        if (error) throw error;

        // Update local state
        setRooms(
          rooms.map((room) =>
            room.id === selectedRoom.id
              ? { ...room, ...data, updated_at: new Date().toISOString() }
              : room
          )
        );

        toast({
          title: "Room updated",
          description: "Room has been updated successfully.",
        });
      } else {
        // Create new room
        const { data: newRoom, error } = await supabase
          .from("rooms")
          .insert({
            name: data.name,
            room_type: data.room_type,
            price_per_night: data.price_per_night,
            capacity: data.capacity,
            description: data.description,
            image_url: data.image_url || null,
            is_available: data.is_available,
          })
          .select()
          .single();

        if (error) throw error;

        // Update local state
        setRooms([newRoom as Room, ...rooms]);

        toast({
          title: "Room created",
          description: "New room has been created successfully.",
        });
      }

      // Close dialog and reset form
      setIsDialogOpen(false);
      setSelectedRoom(null);
    } catch (error: any) {
      console.error("Error saving room:", error);
      toast({
        title: "Error saving room",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  // Delete a room
  const deleteRoom = async (id: string) => {
    try {
      const { error } = await supabase.from("rooms").delete().eq("id", id);

      if (error) throw error;

      // Update local state
      setRooms(rooms.filter((room) => room.id !== id));

      toast({
        title: "Room deleted",
        description: "Room has been deleted successfully.",
      });
    } catch (error: any) {
      console.error("Error deleting room:", error);
      toast({
        title: "Error deleting room",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Room Management</CardTitle>
              <CardDescription>
                Manage hotel rooms and availability
              </CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setSelectedRoom(null)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Room
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                  <DialogTitle>
                    {selectedRoom ? "Edit Room" : "Create New Room"}
                  </DialogTitle>
                  <DialogDescription>
                    {selectedRoom
                      ? "Update the room information below"
                      : "Fill out the form below to create a new room"}
                  </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4 mt-4"
                  >
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="room_type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Room Type</FormLabel>
                            <FormControl>
                              <Input placeholder="Suite, Standard, etc." {...field} />
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
                              <Input type="number" min={1} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="price_per_night"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price per Night</FormLabel>
                          <FormControl>
                            <Input type="number" min={0} step="0.01" {...field} />
                          </FormControl>
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
                            <Textarea
                              placeholder="A luxurious suite with ocean view..."
                              rows={3}
                              {...field}
                            />
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
                          <FormDescription>
                            Link to room image (leave empty if none)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="is_available"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between space-x-2 space-y-0 rounded-md border p-4">
                          <div className="space-y-0.5">
                            <FormLabel>Available for Booking</FormLabel>
                            <FormDescription>
                              Whether this room can be booked by guests
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <DialogFooter>
                      <Button type="submit">
                        {selectedRoom ? "Update Room" : "Create Room"}
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search rooms..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full md:w-[200px]">
              <Select
                value={filterType}
                onValueChange={setFilterType}
              >
                <SelectTrigger>
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="All Room Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Room Types</SelectItem>
                  {roomTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <p>Loading rooms...</p>
            </div>
          ) : filteredRooms.length === 0 ? (
            <div className="text-center py-10">
              <LayoutDashboard className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium">No rooms found</h3>
              <p className="text-muted-foreground">
                {searchTerm || filterType !== "all"
                  ? "Try changing your search or filter criteria"
                  : "Create a new room to get started"}
              </p>
            </div>
          ) : (
            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableCaption>List of all hotel rooms</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Room Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-center">Capacity</TableHead>
                    <TableHead className="text-right">Price/Night</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRooms.map((room) => (
                    <TableRow key={room.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Bed className="h-4 w-4 text-muted-foreground" />
                          {room.name}
                        </div>
                        <div className="text-sm text-muted-foreground truncate max-w-[250px]">
                          {room.description}
                        </div>
                      </TableCell>
                      <TableCell>{room.room_type}</TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          {room.capacity}
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        <div className="flex items-center justify-end gap-1">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          {room.price_per_night.toFixed(2)}
                        </div>
                      </TableCell>
                      <TableCell>
                        {room.is_available ? (
                          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-200">
                            Available
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-200">
                            Unavailable
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setSelectedRoom(room);
                              setIsDialogOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteRoom(room.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminRooms;
