
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { format } from 'date-fns';
import { Card } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CalendarIcon, Wifi, Coffee, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface Room {
  id: string;
  name: string;
  description: string;
  price_per_night: number;
  capacity: number;
  room_type: string;
  image_url: string;
  has_wifi: boolean;
  has_breakfast: boolean;
  amenities?: Amenity[];
}

interface Amenity {
  id: string;
  room_id: string;
  amenity_name: string;
  amenity_description: string | null;
  icon: string | null;
}

const Rooms = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(new Date());
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(new Date(Date.now() + 3 * 24 * 60 * 60 * 1000));
  const [guestsCount, setGuestsCount] = useState(2);
  
  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      
      // Fetch rooms with availability check
      const { data: roomsData, error: roomsError } = await supabase
        .from('rooms')
        .select('*')
        .order('price_per_night');

      if (roomsError) throw roomsError;
      
      // Fetch amenities for each room
      if (roomsData) {
        const enhancedRooms = await Promise.all(
          roomsData.map(async (room) => {
            const { data: amenities, error: amenitiesError } = await supabase
              .from('room_amenities')
              .select('*')
              .eq('room_id', room.id);
            
            if (amenitiesError) console.error('Error fetching amenities:', amenitiesError);
            
            return {
              ...room,
              amenities: amenities || []
            };
          })
        );
        
        setRooms(enhancedRooms);
      }
    } catch (error) {
      console.error('Error fetching rooms:', error);
      toast({
        title: "Error",
        description: "Failed to load rooms. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = (room: Room) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to book a room",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }

    if (!checkInDate || !checkOutDate) {
      toast({
        title: "Invalid dates",
        description: "Please select check-in and check-out dates",
        variant: "destructive"
      });
      return;
    }

    navigate(`/booking/${room.id}`, {
      state: {
        room,
        checkInDate,
        checkOutDate,
        guestsCount
      }
    });
  };

  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="container mx-auto py-24 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Available Rooms</h1>
      
      {/* Search and Filter Section */}
      <div className="bg-slate-50 p-6 rounded-lg shadow-sm mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Check-in Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !checkInDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {checkInDate ? format(checkInDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={checkInDate}
                  onSelect={setCheckInDate}
                  initialFocus
                  disabled={(date) => date < new Date() || (checkOutDate ? date >= checkOutDate : false)}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Check-out Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !checkOutDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {checkOutDate ? format(checkOutDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={checkOutDate}
                  onSelect={setCheckOutDate}
                  initialFocus
                  disabled={(date) => checkInDate ? date <= checkInDate : date <= new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Guests</label>
            <Input
              type="number"
              min={1}
              value={guestsCount}
              onChange={(e) => setGuestsCount(parseInt(e.target.value))}
            />
          </div>
          
          <div className="flex items-end">
            <Button 
              className="w-full" 
              onClick={fetchRooms}
            >
              Search Availability
            </Button>
          </div>
        </div>
        
        {calculateNights() > 0 && (
          <div className="mt-4 text-sm text-slate-600">
            Searching for {calculateNights()} night{calculateNights() > 1 ? 's' : ''} • {guestsCount} guest{guestsCount > 1 ? 's' : ''}
          </div>
        )}
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <Card key={room.id} className="overflow-hidden border border-slate-200 hover:shadow-md transition-shadow">
              <div className="h-48 overflow-hidden bg-slate-200">
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
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">{room.name}</h3>
                  <div className="text-lg font-bold text-blue-600">${room.price_per_night}/night</div>
                </div>
                
                <p className="text-slate-600 mb-4 line-clamp-2">{room.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {room.has_wifi && (
                    <div className="flex items-center text-sm bg-slate-100 px-2 py-1 rounded">
                      <Wifi className="w-4 h-4 mr-1" />
                      <span>WiFi</span>
                    </div>
                  )}
                  {room.has_breakfast && (
                    <div className="flex items-center text-sm bg-slate-100 px-2 py-1 rounded">
                      <Coffee className="w-4 h-4 mr-1" />
                      <span>Breakfast</span>
                    </div>
                  )}
                  {room.amenities?.slice(0, 3).map((amenity) => (
                    <div key={amenity.id} className="flex items-center text-sm bg-slate-100 px-2 py-1 rounded">
                      <Check className="w-4 h-4 mr-1" />
                      <span>{amenity.amenity_name}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-sm text-slate-500">
                    <span className="font-medium">Capacity:</span> {room.capacity} {room.capacity > 1 ? 'guests' : 'guest'}
                  </div>
                  <Button onClick={() => handleBookNow(room)}>
                    Book Now
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
      
      {!loading && rooms.length === 0 && (
        <div className="text-center py-16">
          <h3 className="text-xl font-semibold mb-2">No rooms available</h3>
          <p className="text-slate-600">Please try different dates or check back later.</p>
        </div>
      )}
    </div>
  );
};

export default Rooms;
