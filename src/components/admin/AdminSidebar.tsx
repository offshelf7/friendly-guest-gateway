
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
  UserCircle 
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

const menuItems = [
  { path: "/admin", label: "Home", icon: Home },
  { path: "/admin/staff", label: "Staff", icon: Users },
  { path: "/admin/guests", label: "Guests", icon: Users },
  { path: "/admin/reservations", label: "Reservations", icon: Calendar },
  { path: "/admin/rooms", label: "Rooms", icon: Bed },
  { path: "/admin/services", label: "Services", icon: Users },
  { path: "/admin/messages", label: "Messages", icon: MessageSquare },
  { path: "/admin/billing", label: "Billing", icon: CreditCard },
  { path: "/admin/invoice", label: "Invoice", icon: FileText },
  { path: "/admin/settings", label: "Settings", icon: Settings },
  { path: "/admin/profile", label: "Profile", icon: UserCircle },
];

export function AdminSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <h2 className="text-xl font-bold">Hotel Admin</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
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
            <span className="text-sm font-medium">A</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Admin User</span>
            <span className="text-xs text-muted-foreground">admin@hotel.com</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
