import {
  Home,
  LayoutDashboard,
  ListChecks,
  Calendar,
  Users,
  BarChart,
  Settings,
  Wrench,
  MessageSquare,
  FileInvoice,
  UserCog,
  Bell,
  ConciergeBell,
} from "lucide-react";
import { NavLink } from "react-router-dom";

interface SidebarItem {
  path: string;
  name: string;
  icon: any;
  children?: SidebarItem[];
}

const sidebarItems: SidebarItem[] = [
  {
    path: "/admin",
    name: "Dashboard",
    icon: Home,
  },
  {
    path: "/admin/rooms",
    name: "Rooms",
    icon: LayoutDashboard,
  },
  {
    path: "/admin/room-types",
    name: "Room Types",
    icon: ListChecks,
  },
  {
    path: "/admin/food-and-drink",
    name: "Food & Drink",
    icon: Calendar,
  },
  {
    path: "/admin/guests",
    name: "Guests",
    icon: Users,
  },
  {
    path: "/admin/users",
    name: "Users",
    icon: UserCog,
  },
  {
    path: "/admin/services",
    name: "Services",
    icon: ConciergeBell,
  },
  {
    path: "/admin/reports",
    name: "Reports",
    icon: BarChart,
  },
  {
    path: "/admin/staff",
    name: "Staff",
    icon: Bell,
  },
  {
    path: "/admin/reservations",
    name: "Reservations",
    icon: Calendar,
  },
  {
    path: "/admin/messages",
    name: "Messages",
    icon: MessageSquare,
  },
  {
    path: "/admin/billing",
    name: "Billing",
    icon: FileInvoice,
  },
  {
    path: "/admin/invoice",
    name: "Invoice",
    icon: FileInvoice,
  },
  {
    path: "/admin/settings",
    name: "Settings",
    icon: Settings,
  },
  {
    path: "/admin/profile",
    name: "Profile",
    icon: UserCog,
  },
  {
    path: "/admin/maintenance",
    name: "Maintenance",
    icon: Wrench,
  },
];

const AdminSidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen fixed top-0 left-0 overflow-y-auto">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
      </div>
      <nav>
        <ul>
          {sidebarItems.map((item) => (
            <li key={item.name} className="hover:bg-gray-700">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center p-4 ${
                    isActive ? "bg-gray-700" : ""
                  }`
                }
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;
