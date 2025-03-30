
import { Check, Coffee, Users, Wifi } from 'lucide-react';
import { Room } from '@/types/roomTypes';

type RoomDetailsProps = {
  room: Room;
};

const RoomDetails = ({ room }: RoomDetailsProps) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-slate-200 mb-8">
      <div className="h-64 overflow-hidden bg-slate-200">
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
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold mb-1">{room.name}</h2>
            <div className="text-slate-600">{room.room_type.charAt(0).toUpperCase() + room.room_type.slice(1)} Room</div>
          </div>
          <div className="text-xl font-bold text-blue-600">${room.price_per_night}/night</div>
        </div>
        
        <p className="text-slate-700 mb-6">{room.description}</p>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center">
            <Users className="w-5 h-5 mr-2 text-slate-500" />
            <span>Up to {room.capacity} guests</span>
          </div>
          {room.has_wifi && (
            <div className="flex items-center">
              <Wifi className="w-5 h-5 mr-2 text-slate-500" />
              <span>Free WiFi</span>
            </div>
          )}
          {room.has_breakfast && (
            <div className="flex items-center">
              <Coffee className="w-5 h-5 mr-2 text-slate-500" />
              <span>Breakfast included</span>
            </div>
          )}
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Amenities</h3>
          <div className="grid grid-cols-2 gap-2">
            {room.amenities?.map((amenity) => (
              <div key={amenity.id} className="flex items-center">
                <Check className="w-4 h-4 mr-2 text-green-500" />
                <span>{amenity.amenity_name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
