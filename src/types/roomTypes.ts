
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
  room_number?: string; // Added as optional
  status?: string; // Added as optional
  bed_type?: string; // Added as optional
}
