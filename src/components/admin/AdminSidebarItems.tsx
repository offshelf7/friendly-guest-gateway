
import {
  Bed,
  Briefcase,
  Database,
  DollarSign,
  FileText,
  Hotel,
  MessageSquare,
  Package,
  Server,
  Settings,
  ShoppingBag,
  User,
  Users,
  Utensils,
  HelpCircle,
  BarChart,
  Receipt,
  BookOpen,
  ClipboardCheck,
  Calculator,
} from "lucide-react";

type SidebarItem = {
  name: string;
  href: string;
  icon: any;
  roles?: string[];
};

export const adminSidebarItems: SidebarItem[] = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: Database,
    roles: ["admin", "staff", "general_manager", "operational_manager", "front_office_manager", "finance_manager", "purchasing_manager"],
  },
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
  {
    name: "Billing",
    href: "/admin/billing",
    icon: DollarSign,
    roles: ["admin", "staff", "general_manager", "finance_manager"],
  },
  {
    name: "Invoices",
    href: "/admin/invoice",
    icon: FileText,
    roles: ["admin", "staff", "general_manager", "finance_manager"],
  },
  {
    name: "Guests",
    href: "/admin/guests",
    icon: User,
    roles: ["admin", "staff", "general_manager", "operational_manager", "front_office_manager"],
  },
  {
    name: "Reports",
    href: "/admin/reports",
    icon: BarChart,
    roles: ["admin", "general_manager", "operational_manager", "finance_manager"],
  },
  
  // Front Office Specific
  {
    name: "Front Desk",
    href: "/admin/front-desk",
    icon: BookOpen,
    roles: ["admin", "general_manager", "front_office_manager", "staff"],
  },
  {
    name: "Reservations",
    href: "/admin/reservations",
    icon: ClipboardCheck,
    roles: ["admin", "general_manager", "front_office_manager", "staff"],
  },
  
  // Finance Specific
  {
    name: "Financial Reports",
    href: "/admin/finance-reports",
    icon: Calculator,
    roles: ["admin", "general_manager", "finance_manager"],
  },
  {
    name: "Transactions",
    href: "/admin/transactions",
    icon: Receipt,
    roles: ["admin", "general_manager", "finance_manager"],
  },
  
  // Inventory Specific
  {
    name: "Inventory",
    href: "/admin/inventory",
    icon: Package,
    roles: ["admin", "general_manager", "purchasing_manager"],
  },
  {
    name: "Suppliers",
    href: "/admin/suppliers",
    icon: ShoppingBag,
    roles: ["admin", "general_manager", "purchasing_manager"],
  },
  
  {
    name: "Settings",
    href: "/admin/settings",
    icon: Settings,
    roles: ["admin", "general_manager"],
  },
];
