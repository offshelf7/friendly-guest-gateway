
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Room, Amenity } from '@/types/roomTypes';

// Fetch a single room by ID
export const fetchRoomById = async (roomId: string | undefined) => {
  if (!roomId) return null;
  
  try {
    // Fetch room details
    const { data, error } = await supabase
      .from('rooms')
      .select('*')
      .eq('id', roomId)
      .single();
    
    if (error) throw error;
    
    if (data) {
      // Fetch amenities
      const { data: amenities, error: amenitiesError } = await supabase
        .from('room_amenities')
        .select('*')
        .eq('room_id', data.id);
      
      if (amenitiesError) throw amenitiesError;
      
      return {
        ...data,
        amenities: amenities as Amenity[] || []
      } as Room;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching room details:', error);
    throw error;
  }
};

// Check room availability
export const checkRoomAvailability = async (
  roomId: string | undefined, 
  checkIn: string, 
  checkOut: string
) => {
  if (!roomId || !checkIn || !checkOut) return false;
  
  try {
    const { data, error } = await supabase.rpc(
      'check_room_availability',
      { 
        room_id: roomId,
        check_in: checkIn,
        check_out: checkOut
      }
    );
    
    if (error) throw error;
    
    return !!data;
  } catch (error) {
    console.error('Error checking room availability:', error);
    return false;
  }
};

// Custom hook to get room data
export const useRoomData = (roomId: string | undefined) => {
  return useQuery({
    queryKey: ['room', roomId],
    queryFn: () => fetchRoomById(roomId),
    enabled: !!roomId
  });
};

// Custom hook to check room availability
export const useRoomAvailability = (
  roomId: string | undefined, 
  checkIn: string, 
  checkOut: string
) => {
  return useQuery({
    queryKey: ['roomAvailability', roomId, checkIn, checkOut],
    queryFn: () => checkRoomAvailability(roomId, checkIn, checkOut),
    enabled: !!roomId && !!checkIn && !!checkOut
  });
};
