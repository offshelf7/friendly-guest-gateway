
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
  status?: 'available' | 'occupied' | 'cleaning' | 'maintenance';
  bed_type?: string;
  amenities?: Amenity[];
  is_clean?: boolean;
  last_cleaned?: string;
  maintenance_notes?: string;
}

export interface RoomDetails {
  name: string;
  room_number: string;
  room_type: string;
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
  payment_status?: string;
  room: RoomDetails;
  profile?: {
    full_name?: string;
    email?: string;
    phone?: string;
  };
}

export type UserRole = 'guest' | 'staff' | 'admin' | 'general_manager' | 'operational_manager' | 'front_office_manager' | 'finance_manager' | 'purchasing_manager';

export interface ServiceCategory {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  category_id?: string;
  name: string;
  description?: string;
  price?: number;
  duration?: number; // in minutes
  is_available: boolean;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  email?: string;
  name?: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at?: string;
  role: UserRole;
}
