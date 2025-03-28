
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Room } from "@/types/roomTypes";
import { Card, CardContent } from "@/components/ui/card";
import { Bed } from "lucide-react";

const AdminRooms = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("rooms")
        .select("*")
        .order("price_per_night");

      if (error) throw error;

      // Assign room numbers if they don't exist and cast data to Room type
      const roomsWithNumbers = data?.map((room, index) => ({
        ...room,
        room_number: room.room_number || `00${index + 1}`,
        bed_type: getBedType(room.room_type),
        status: getRoomStatus(room.is_available)
      })) as Room[];

      setRooms(roomsWithNumbers);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    } finally {
      setLoading(false);
    }
  };

  const getBedType = (roomType: string): string => {
    if (roomType.toLowerCase().includes("single")) return "Single Bed";
    if (roomType.toLowerCase().includes("delux")) return "King Bed";
    if (roomType.toLowerCase().includes("suite")) return "Queen Bed";
    return "Queen Bed";
  };

  const getRoomStatus = (isAvailable: boolean): 'available' | 'occupied' => {
    return isAvailable ? 'available' : 'occupied';
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Rooms</h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {rooms.map((room) => (
            <Card key={room.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex">
                  <div className="w-[200px] h-[150px] overflow-hidden">
                    {room.image_url ? (
                      <img
                        src={room.image_url}
                        alt={room.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src={`https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&auto=format&fit=crop&q=60`}
                        alt={room.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1 p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold">{room.name}</h3>
                        <div className="flex items-center mt-1 text-slate-600">
                          <Bed className="w-4 h-4 mr-1" />
                          <span>{room.bed_type}</span>
                        </div>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs ${
                        room.status === 'available' 
                          ? 'bg-green-100 text-green-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {room.status === 'available' ? 'Available' : 'Occupied'}
                      </div>
                    </div>
                    <p className="text-slate-600 mt-2">
                      A cozy and budget friendly option perfect for solo travelers or couples features a queen
                      bed, private bathroom, work desk, and all essential amenities for a comfortable stay
                    </p>
                    <div className="flex justify-between items-center mt-4">
                      <div className="text-slate-600">
                        Room no #{room.room_number}
                      </div>
                      <div className="text-xl font-bold">
                        ${room.price_per_night}<span className="text-sm text-slate-500">/night</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminRooms;
