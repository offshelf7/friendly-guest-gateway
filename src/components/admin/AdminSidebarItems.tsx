
import {
  Bed,
  Briefcase,
  Database,
  DollarSign,
  FileText,
  Hotel,
  MessageSquare,
  Package,
  Settings,
  ShoppingBag,
  User,
  Users,
  Utensils,
  BarChart,
  Receipt,
  BookOpen,
  ClipboardCheck,
  Calculator,
  Layout,
  Home,
  Building,
  Building2,
  PiggyBank,
  ShoppingCart,
} from "lucide-react";
import { UserRole } from "@/types/roleTypes";

type SidebarItem = {
  name: string;
  href: string;
  icon: any;
  roles?: UserRole[];
  children?: SidebarItem[];
};

export const adminSidebarItems: SidebarItem[] = [
  {
    name: "Main Dashboard",
    href: "/admin",
    icon: Home,
    roles: ["admin", "staff", "general_manager", "operational_manager", "front_office_manager", "finance_manager", "purchasing_manager"],
  },
  
  // Manager Dashboards
  {
    name: "Manager Dashboards",
    href: "/admin/dashboards",
    icon: Layout,
    roles: ["admin", "general_manager", "operational_manager"],
    children: [
      {
        name: "General Manager",
        href: "/admin/general-manager/dashboard",
        icon: Building,
        roles: ["admin", "general_manager"],
      },
      {
        name: "Operations Manager",
        href: "/admin/operation/dashboard",
        icon: Building2,
        roles: ["admin", "operational_manager"],
      },
      {
        name: "Service Manager",
        href: "/admin/services/manager",
        icon: Briefcase,
        roles: ["admin", "operational_manager"],
      },
      {
        name: "Maintenance Manager",
        href: "/admin/maintenance/dashboard",
        icon: Building,
        roles: ["admin", "operational_manager"],
      },
      {
        name: "Marketing Manager",
        href: "/admin/marketing/dashboard",
        icon: Building,
        roles: ["admin", "general_manager"],
      },
      {
        name: "HR Manager",
        href: "/admin/hr/dashboard",
        icon: Users,
        roles: ["admin", "general_manager"],
      },
    ],
  },
  
  // Department Dashboards
  {
    name: "Department Dashboards",
    href: "/admin/departments",
    icon: Database,
    roles: ["admin", "general_manager", "operational_manager", "front_office_manager", "finance_manager", "purchasing_manager"],
    children: [
      {
        name: "Front Office",
        href: "/admin/frontoffice/dashboard",
        icon: BookOpen,
        roles: ["admin", "general_manager", "front_office_manager", "staff"],
      },
      {
        name: "Finance",
        href: "/admin/finance/dashboard",
        icon: PiggyBank,
        roles: ["admin", "general_manager", "finance_manager"],
      },
      {
        name: "Purchasing",
        href: "/admin/inventory/purchasing-dashboard",
        icon: ShoppingCart,
        roles: ["admin", "general_manager", "purchasing_manager"],
      },
    ],
  },
  
  // User Management
  {
    name: "Users",
    href: "/admin/users",
    icon: Users,
    roles: ["admin", "general_manager"],
  },
  {
    name: "Messages",
    href: "/admin/messages",
    icon: MessageSquare,
    roles: ["admin", "staff", "general_manager", "operational_manager"],
  },
  
  // Rooms and Facilities
  {
    name: "Rooms",
    href: "/admin/rooms",
    icon: Bed,
    roles: ["admin", "staff", "general_manager", "operational_manager", "front_office_manager"],
  },
  {
    name: "Room Types",
    href: "/admin/room-types",
    icon: Hotel,
    roles: ["admin", "staff", "general_manager", "operational_manager", "front_office_manager"],
  },
  
  // Services
  {
    name: "Services",
    href: "/admin/services",
    icon: Briefcase,
    roles: ["admin", "staff", "general_manager", "operational_manager"],
    children: [
      {
        name: "Dashboard",
        href: "/admin/services/dashboard",
        icon: BarChart,
        roles: ["admin", "staff", "general_manager", "operational_manager"],
      },
      {
        name: "All Services",
        href: "/admin/services/list",
        icon: ClipboardCheck,
        roles: ["admin", "staff", "general_manager", "operational_manager"],
      },
      {
        name: "Food & Drink",
        href: "/admin/food-and-drink",
        icon: Utensils,
        roles: ["admin", "staff", "general_manager", "operational_manager"],
      },
    ]
  },
  
  // Guests
  {
    name: "Guests",
    href: "/admin/guests",
    icon: User,
    roles: ["admin", "staff", "general_manager", "operational_manager", "front_office_manager"],
  },
  
  // Reports
  {
    name: "Reports",
    href: "/admin/reports",
    icon: BarChart,
    roles: ["admin", "general_manager", "operational_manager", "finance_manager"],
  },
  
  // Finance
  {
    name: "Finance",
    href: "/admin/finance/dashboard",
    icon: DollarSign,
    roles: ["admin", "staff", "general_manager", "finance_manager"],
    children: [
      {
        name: "Dashboard",
        href: "/admin/finance/dashboard",
        icon: BarChart,
        roles: ["admin", "general_manager", "finance_manager"],
      },
      {
        name: "Billing",
        href: "/admin/finance/billing",
        icon: DollarSign,
        roles: ["admin", "staff", "general_manager", "finance_manager"],
      },
      {
        name: "Invoices",
        href: "/admin/finance/invoices",
        icon: FileText,
        roles: ["admin", "staff", "general_manager", "finance_manager"],
      },
      {
        name: "Reports",
        href: "/admin/finance/reports",
        icon: Calculator,
        roles: ["admin", "general_manager", "finance_manager"],
      },
      {
        name: "Transactions",
        href: "/admin/finance/transactions",
        icon: Receipt,
        roles: ["admin", "general_manager", "finance_manager"],
      },
    ],
  },
  
  // Front Office
  {
    name: "Front Office",
    href: "/admin/frontoffice/dashboard",
    icon: BookOpen,
    roles: ["admin", "general_manager", "front_office_manager", "staff"],
    children: [
      {
        name: "Dashboard",
        href: "/admin/frontoffice/dashboard",
        icon: BarChart,
        roles: ["admin", "general_manager", "front_office_manager", "staff"],
      },
      {
        name: "Front Desk",
        href: "/admin/frontoffice/front-desk",
        icon: BookOpen,
        roles: ["admin", "general_manager", "front_office_manager", "staff"],
      },
      {
        name: "Reservations",
        href: "/admin/frontoffice/reservations",
        icon: ClipboardCheck,
        roles: ["admin", "general_manager", "front_office_manager", "staff"],
      },
    ],
  },
  
  // Inventory/Purchasing
  {
    name: "Inventory",
    href: "/admin/inventory/dashboard",
    icon: Package,
    roles: ["admin", "general_manager", "purchasing_manager"],
    children: [
      {
        name: "Dashboard",
        href: "/admin/inventory/dashboard",
        icon: BarChart,
        roles: ["admin", "general_manager", "purchasing_manager"],
      },
      {
        name: "Items",
        href: "/admin/inventory/items",
        icon: Package,
        roles: ["admin", "general_manager", "purchasing_manager"],
      },
      {
        name: "Suppliers",
        href: "/admin/inventory/suppliers",
        icon: ShoppingBag,
        roles: ["admin", "general_manager", "purchasing_manager"],
      },
    ],
  },
  
  // Settings
  {
    name: "Settings",
    href: "/admin/settings",
    icon: Settings,
    roles: ["admin", "general_manager"],
  },
];
