
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Room } from '@/types/roomTypes';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const AdminRooms = () => {
  const { data: rooms, isLoading, error } = useQuery({
    queryKey: ['adminRooms'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('rooms')
        .select('*');

      if (error) throw error;
      return data as Room[];
    }
  });

  if (isLoading) return <div>Loading rooms...</div>;
  if (error) return <div>Error loading rooms: {(error as Error).message}</div>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Room Management</h1>
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" /> Add New Room
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Room Number</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Price/Night</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rooms?.map((room) => (
                <TableRow key={room.id}>
                  <TableCell className="font-medium">{room.name}</TableCell>
                  <TableCell>{room.room_type}</TableCell>
                  <TableCell>{room.room_number || 'N/A'}</TableCell>
                  <TableCell>{room.capacity} people</TableCell>
                  <TableCell>${room.price_per_night}</TableCell>
                  <TableCell>
                    <Badge variant={room.is_available ? "success" : "destructive"}>
                      {room.is_available ? 'Available' : 'Not Available'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="destructive" size="sm">Delete</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminRooms;
