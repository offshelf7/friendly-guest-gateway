
// Add AdminMessage type
export interface AdminMessage {
  id: string;
  from_user_id: string;
  to_user_id: string;
  message: string;
  read: boolean;
  created_at: string;
  updated_at: string;
  from_user: {
    name: string;
    email: string;
  };
  to_user: {
    name: string;
    email: string;
  };
}

// Add UserData interface
export interface UserData {
  id: string;
  email: string;
  name?: string;
  role?: string | string[] | null;
  created_at?: string;
  suspended?: boolean;
}

// Add Invoice type
export type InvoiceStatus = "paid" | "draft" | "sent" | "overdue";

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  customer: {
    name: string;
    email: string;
    address: string;
  };
  date: string;
  dueDate: string;
  items: InvoiceItem[];
  status: InvoiceStatus;
  notes?: string;
}

// Add type for Room
export interface Room {
  id: string;
  name: string;
  description: string;
  room_type: string;
  price_per_night: number;
  capacity: number;
  image_url: string;
  is_available: boolean;
  created_at: string;
  updated_at: string;
}
