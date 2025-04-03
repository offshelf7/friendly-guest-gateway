
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

// Check if a user has one of the allowed roles
export const hasRole = (userRoles: UserRole | UserRole[] | null, allowedRoles: UserRole[]): boolean => {
  if (!userRoles) return false;
  
  // Convert single role to array
  const roles = Array.isArray(userRoles) ? userRoles : [userRoles];
  
  // Check if any of the user's roles is in the allowed roles
  return roles.some(role => allowedRoles.includes(role));
};

// Check if a user has access to the admin dashboard
export const hasDashboardAccess = (userRoles: UserRole | UserRole[] | null): boolean => {
  const dashboardRoles: UserRole[] = [
    "admin", 
    "staff", 
    "general_manager", 
    "operational_manager",
    "front_office_manager",
    "finance_manager",
    "purchasing_manager"
  ];
  
  return hasRole(userRoles, dashboardRoles);
};
