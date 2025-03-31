
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

// Function to check if a user has a specific role
export const hasRole = (userRoles: UserRole[] | UserRole | null, role: UserRole | UserRole[]): boolean => {
  // If no user roles, return false
  if (!userRoles) return false;
  
  // Convert single roles to arrays for easier comparison
  const userRolesArray = Array.isArray(userRoles) ? userRoles : [userRoles];
  const checkRolesArray = Array.isArray(role) ? role : [role];
  
  // Check if any of the user's roles match any of the required roles
  return userRolesArray.some(userRole => checkRolesArray.includes(userRole));
};

// Function to check if a user has access to dashboard based on roles
export const hasDashboardAccess = (userRoles: UserRole[] | UserRole | null): boolean => {
  if (!userRoles) return false;
  
  const userRolesArray = Array.isArray(userRoles) ? userRoles : [userRoles];
  return userRolesArray.some(role => DASHBOARD_ACCESS[role]);
};
