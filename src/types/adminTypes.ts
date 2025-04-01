
import { UserRole } from './roleTypes';

// Type for admin messages
export type AdminMessage = {
  id: string;
  from_user_id: string;
  to_user_id: string;
  message: string;
  read: boolean;
  created_at: string;
  from_user_name?: string;
  to_user_name?: string;
};

// Type definition for user data in AdminUsers
export type UserData = {
  id: string;
  email: string;
  name: string | null;
  role: UserRole | UserRole[] | null;
  created_at: string;
  suspended: boolean;
};
