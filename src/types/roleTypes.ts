
// Define all possible user roles in the system
export type UserRole = 
  | 'guest' 
  | 'staff' 
  | 'admin' 
  | 'general_manager' 
  | 'operational_manager' 
  | 'service_manager'
  | 'maintenance_manager'
  | 'marketing_manager'
  | 'human_resources_manager';

// Dashboard access mapping
export const DASHBOARD_ACCESS: Record<UserRole, boolean> = {
  guest: false,
  staff: true,
  admin: true,
  general_manager: true,
  operational_manager: true,
  service_manager: true,
  maintenance_manager: true,
  marketing_manager: true,
  human_resources_manager: true
};

// Role display names for UI
export const ROLE_DISPLAY_NAMES: Record<UserRole, string> = {
  guest: 'Guest',
  staff: 'Staff',
  admin: 'Administrator',
  general_manager: 'General Manager',
  operational_manager: 'Operational Manager',
  service_manager: 'Service Manager',
  maintenance_manager: 'Maintenance Manager',
  marketing_manager: 'Marketing Manager',
  human_resources_manager: 'HR Manager'
};
