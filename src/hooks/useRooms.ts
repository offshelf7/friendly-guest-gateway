
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Room, Amenity } from '@/types/roomTypes';

// Fetch all rooms
export const fetchRooms = async () => {
  try {
    // Fetch rooms
    const { data: roomsData, error: roomsError } = await supabase
      .from('rooms')
      .select('*')
      .order('price_per_night');

    if (roomsError) throw roomsError;
    
    // Fetch amenities for each room
    if (roomsData) {
      const enhancedRooms: Room[] = await Promise.all(
        roomsData.map(async (room: Room) => {
          const { data: amenities, error: amenitiesError } = await supabase
            .from('room_amenities')
            .select('*')
            .eq('room_id', room.id);
          
          if (amenitiesError) throw amenitiesError;
          
          return {
            ...room,
            amenities: amenities as Amenity[] || []
          };
        })
      );
      
      return enhancedRooms;
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching rooms:', error);
    throw error;
  }
};

// Custom hook to get rooms data
export const useRooms = () => {
  return useQuery({
    queryKey: ['rooms'],
    queryFn: fetchRooms
  });
};
