
import { NavLink } from "react-router-dom";
import { 
  Home, 
  Users, 
  Bed, 
  Calendar, 
  MessageSquare, 
  CreditCard, 
  FileText, 
  Settings, 
  UserCircle,
  BarChart3,
  Coffee,
  Building2,
  Workflow,
  HelpingHand,
  Wrench,
  Megaphone,
  UserCog
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { ROLE_DISPLAY_NAMES, UserRole, hasRole } from "@/types/roleTypes";

// Common menu items for all dashboard users
const commonMenuItems = [
  { path: "/admin", label: "Home", icon: Home, roles: ["admin", "staff", "general_manager", "operational_manager", "service_manager", "maintenance_manager", "marketing_manager", "human_resources_manager"] },
  { path: "/admin/profile", label: "Profile", icon: UserCircle, roles: ["admin", "staff", "general_manager", "operational_manager", "service_manager", "maintenance_manager", "marketing_manager", "human_resources_manager"] },
];

// Role-specific menu items
const roleMenuItems = [
  // General Manager specific
  { path: "/admin/general-manager", label: "GM Dashboard", icon: Building2, roles: ["general_manager", "admin"] },
  { path: "/admin/reports", label: "Reports", icon: BarChart3, roles: ["general_manager", "admin"] },
  { path: "/admin/staff", label: "Staff", icon: Users, roles: ["general_manager", "admin", "human_resources_manager"] },
  
  // Operational Manager specific
  { path: "/admin/operational-manager", label: "Operations Dashboard", icon: Workflow, roles: ["operational_manager", "admin"] },
  { path: "/admin/reservations", label: "Reservations", icon: Calendar, roles: ["operational_manager", "admin", "general_manager"] },
  
  // Service Manager specific
  { path: "/admin/service-manager", label: "Service Dashboard", icon: HelpingHand, roles: ["service_manager", "admin"] },
  { path: "/admin/services", label: "Services", icon: Users, roles: ["service_manager", "admin", "general_manager"] },
  { path: "/admin/guests", label: "Guests", icon: Users, roles: ["service_manager", "operational_manager", "admin", "general_manager"] },
  
  // Maintenance Manager specific
  { path: "/admin/maintenance-manager", label: "Maintenance Dashboard", icon: Wrench, roles: ["maintenance_manager", "admin"] },
  { path: "/admin/rooms", label: "Rooms", icon: Bed, roles: ["maintenance_manager", "admin", "operational_manager"] },
  { path: "/admin/room-types", label: "Room Types", icon: Bed, roles: ["maintenance_manager", "admin", "operational_manager"] },
  
  // Marketing Manager specific
  { path: "/admin/marketing-manager", label: "Marketing Dashboard", icon: Megaphone, roles: ["marketing_manager", "admin"] },
  { path: "/admin/food-and-drink", label: "Food & Drink", icon: Coffee, roles: ["marketing_manager", "admin", "service_manager"] },
  
  // HR Manager specific
  { path: "/admin/hr-manager", label: "HR Dashboard", icon: UserCog, roles: ["human_resources_manager", "admin"] },
  
  // Admin only
  { path: "/admin/messages", label: "Messages", icon: MessageSquare, roles: ["admin"] },
  { path: "/admin/billing", label: "Billing", icon: CreditCard, roles: ["admin"] },
  { path: "/admin/invoice", label: "Invoice", icon: FileText, roles: ["admin"] },
  { path: "/admin/settings", label: "Settings", icon: Settings, roles: ["admin"] },
];

export function AdminSidebar() {
  const { user, userRoles } = useAuth();
  
  // Combine all menu items
  const allMenuItems = [...commonMenuItems, ...roleMenuItems];
  
  // Display all user's roles as a comma-separated list
  const userRoleDisplay = userRoles && userRoles.length > 0 
    ? userRoles.map(role => ROLE_DISPLAY_NAMES[role as UserRole]).join(', ')
    : 'Guest';
  
  // Filter menu items based on user roles
  const filteredMenuItems = allMenuItems.filter(item => 
    hasRole(userRoles, item.roles as UserRole[])
  );

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <h2 className="text-xl font-bold">Hotel Admin</h2>
        <p className="text-sm text-muted-foreground">{userRoleDisplay}</p>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {filteredMenuItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              <SidebarMenuButton
                asChild
                tooltip={item.label}
              >
                <NavLink
                  to={item.path}
                  className={({ isActive }) => (isActive ? "w-full font-medium" : "w-full")}
                  end={item.path === "/admin"}
                >
                  <item.icon className="shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-slate-300 flex items-center justify-center">
            <span className="text-sm font-medium">{user?.email?.charAt(0).toUpperCase() || 'A'}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{user?.email?.split('@')[0] || 'Admin User'}</span>
            <span className="text-xs text-muted-foreground">{user?.email || 'admin@hotel.com'}</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
