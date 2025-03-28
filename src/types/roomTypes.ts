
export interface Room {
  id: string;
  name: string;
  description: string;
  room_type: string;
  capacity: number;
  price_per_night: number;
  is_available: boolean;
  has_wifi: boolean;
  has_breakfast: boolean;
  image_url: string;
  created_at: string;
  updated_at: string;
  room_number?: string;
  status?: string;
  bed_type?: string;
  amenities?: Amenity[];
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
  special_requests?: string;
  created_at: string;
  updated_at: string;
}

export interface Amenity {
  id: string;
  room_id: string;
  amenity_name: string;
  amenity_description?: string;
  icon?: string;
  created_at: string;
}
