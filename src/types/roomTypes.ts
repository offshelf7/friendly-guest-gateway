
export interface Room {
  id: string;
  name: string;
  description: string;
  price_per_night: number;
  capacity: number;
  room_type: string;
  image_url: string | null;
  has_wifi: boolean;
  has_breakfast: boolean;
  is_available: boolean;
  created_at: string;
  updated_at: string;
  amenities?: Amenity[];
  room_number?: string;
  status?: 'available' | 'occupied' | 'maintenance';
  bed_type?: string;
}

export interface Amenity {
  id: string;
  room_id: string;
  amenity_name: string;
  amenity_description: string | null;
  icon: string | null;
  created_at: string;
}

export interface Booking {
  id: string;
  user_id: string;
  room_id: string;
  check_in_date: string;
  check_out_date: string;
  guests_count: number;
  total_price: number;
  status: string;
  special_requests: string | null;
  created_at: string;
  updated_at: string;
}
