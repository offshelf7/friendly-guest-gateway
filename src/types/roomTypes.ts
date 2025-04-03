
export interface Room {
  id: string;
  name: string;
  description: string;
  room_type: string;
  price_per_night: number;
  capacity: number;
  image_url: string;
  has_wifi: boolean;
  has_breakfast: boolean;
  is_available: boolean;
  created_at: string;
  updated_at: string;
  amenities?: Amenity[]; // Added amenities as optional property
}

export interface Amenity {
  id: string;
  room_id: string;
  amenity_name: string;
  amenity_description?: string;
  icon?: string;
  created_at?: string;
}

export interface RoomWithAmenities extends Room {
  amenities: Amenity[];
}

export interface Booking {
  id: string;
  user_id: string;
  guest_id?: string;
  room_id: string;
  check_in_date: string;
  check_out_date: string;
  special_requests?: string;
  guests_count: number;
  status: string;
  payment_status: string;
  total_price: number;
  created_at: string;
  updated_at: string;
  room: {
    name: string;
    room_number: string;
    room_type: string;
    [key: string]: any;
  };
  profile?: {
    full_name?: string;
    email?: string;
    [key: string]: any;
  };
}

// Add the missing service-related types
export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  category_id: string;
  image_url?: string;
  duration?: number;
  is_available: boolean;
  created_at: string;
  updated_at: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  created_at: string;
  updated_at: string;
  services?: Service[];
}
