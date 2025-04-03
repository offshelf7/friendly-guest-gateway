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
        href: "/admin/dashboards/general-manager",
        icon: Building,
        roles: ["admin", "general_manager"],
      },
      {
        name: "Operations Manager",
        href: "/admin/dashboards/operational-manager",
        icon: Building2,
        roles: ["admin", "operational_manager"],
      },
      {
        name: "Service Manager",
        href: "/admin/dashboards/service-manager",
        icon: Briefcase,
        roles: ["admin", "operational_manager"],
      },
      {
        name: "Maintenance Manager",
        href: "/admin/dashboards/maintenance-manager",
        icon: Building,
        roles: ["admin", "operational_manager"],
      },
      {
        name: "Marketing Manager",
        href: "/admin/dashboards/marketing-manager",
        icon: Building,
        roles: ["admin", "general_manager"],
      },
      {
        name: "HR Manager",
        href: "/admin/dashboards/hr-manager",
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
        href: "/admin/departments/front-office",
        icon: BookOpen,
        roles: ["admin", "general_manager", "front_office_manager", "staff"],
      },
      {
        name: "Finance",
        href: "/admin/departments/finance",
        icon: PiggyBank,
        roles: ["admin", "general_manager", "finance_manager"],
      },
      {
        name: "Purchasing",
        href: "/admin/departments/purchasing",
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
  },
  {
    name: "Food & Drink",
    href: "/admin/food-and-drink",
    icon: Utensils,
    roles: ["admin", "staff", "general_manager", "operational_manager"],
  },
  
  // Finance
  {
    name: "Finance",
    href: "/admin/finance",
    icon: DollarSign,
    roles: ["admin", "staff", "general_manager", "finance_manager"],
    children: [
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
        name: "Financial Reports",
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
    href: "/admin/front-office",
    icon: BookOpen,
    roles: ["admin", "general_manager", "front_office_manager", "staff"],
    children: [
      {
        name: "Front Desk",
        href: "/admin/front-office/front-desk",
        icon: BookOpen,
        roles: ["admin", "general_manager", "front_office_manager", "staff"],
      },
      {
        name: "Reservations",
        href: "/admin/front-office/reservations",
        icon: ClipboardCheck,
        roles: ["admin", "general_manager", "front_office_manager", "staff"],
      },
    ],
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
  
  // Inventory/Purchasing
  {
    name: "Inventory",
    href: "/admin/inventory",
    icon: Package,
    roles: ["admin", "general_manager", "purchasing_manager"],
    children: [
      {
        name: "Inventory Items",
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
