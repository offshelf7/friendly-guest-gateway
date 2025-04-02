
// Define UserRole type
export type UserRole = 
  | "guest" 
  | "staff" 
  | "admin" 
  | "general_manager" 
  | "operational_manager"
  | "front_office_manager"
  | "finance_manager"
  | "purchasing_manager";

// Display names for each role
export const ROLE_DISPLAY_NAMES: Record<UserRole, string> = {
  guest: "Guest",
  staff: "Staff",
  admin: "Administrator",
  general_manager: "General Manager",
  operational_manager: "Operational Manager",
  front_office_manager: "Front Office Manager",
  finance_manager: "Finance Manager",
  purchasing_manager: "Purchasing Manager"
};
