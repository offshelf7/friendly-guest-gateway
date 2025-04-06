
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
  translationKey?: string;
  href: string;
  icon: any;
  roles?: UserRole[];
  children?: SidebarItem[];
};

export const adminSidebarItems: SidebarItem[] = [
  {
    name: "Main Dashboard",
    translationKey: "admin.sidebar.mainDashboard",
    href: "/admin",
    icon: Home,
    roles: ["admin", "staff", "general_manager", "operational_manager", "front_office_manager", "finance_manager", "purchasing_manager"],
  },
  
  // Manager Dashboards
  {
    name: "Manager Dashboards",
    translationKey: "admin.sidebar.managerDashboards",
    href: "/admin/dashboards",
    icon: Layout,
    roles: ["admin", "general_manager", "operational_manager"],
    children: [
      {
        name: "General Manager",
        translationKey: "admin.sidebar.generalManager",
        href: "/admin/general-manager/dashboard",
        icon: Building,
        roles: ["admin", "general_manager"],
      },
      {
        name: "Operations Manager",
        translationKey: "admin.sidebar.operationsManager",
        href: "/admin/operation/dashboard",
        icon: Building2,
        roles: ["admin", "operational_manager"],
      },
      {
        name: "Service Manager",
        translationKey: "admin.sidebar.serviceManager",
        href: "/admin/services/manager",
        icon: Briefcase,
        roles: ["admin", "operational_manager"],
      },
      {
        name: "Maintenance Manager",
        translationKey: "admin.sidebar.maintenanceManager",
        href: "/admin/maintenance/dashboard",
        icon: Building,
        roles: ["admin", "operational_manager"],
      },
      {
        name: "Marketing Manager",
        translationKey: "admin.sidebar.marketingManager",
        href: "/admin/marketing/dashboard",
        icon: Building,
        roles: ["admin", "general_manager"],
      },
      {
        name: "HR Manager",
        translationKey: "admin.sidebar.hrManager",
        href: "/admin/hr/dashboard",
        icon: Users,
        roles: ["admin", "general_manager"],
      },
    ],
  },
  
  // Department Dashboards
  {
    name: "Department Dashboards",
    translationKey: "admin.sidebar.departmentDashboards",
    href: "/admin/departments",
    icon: Database,
    roles: ["admin", "general_manager", "operational_manager", "front_office_manager", "finance_manager", "purchasing_manager"],
    children: [
      {
        name: "Front Office",
        translationKey: "admin.sidebar.frontOffice",
        href: "/admin/frontoffice/dashboard",
        icon: BookOpen,
        roles: ["admin", "general_manager", "front_office_manager", "staff"],
      },
      {
        name: "Finance",
        translationKey: "admin.sidebar.finance",
        href: "/admin/finance/dashboard",
        icon: PiggyBank,
        roles: ["admin", "general_manager", "finance_manager"],
      },
      {
        name: "Purchasing",
        translationKey: "admin.sidebar.purchasing",
        href: "/admin/inventory/purchasing-dashboard",
        icon: ShoppingCart,
        roles: ["admin", "general_manager", "purchasing_manager"],
      },
    ],
  },
  
  // User Management
  {
    name: "Users",
    translationKey: "admin.sidebar.users",
    href: "/admin/users",
    icon: Users,
    roles: ["admin", "general_manager"],
  },
  {
    name: "Messages",
    translationKey: "admin.sidebar.messages",
    href: "/admin/messages",
    icon: MessageSquare,
    roles: ["admin", "staff", "general_manager", "operational_manager"],
  },
  
  // Rooms and Facilities
  {
    name: "Rooms",
    translationKey: "admin.sidebar.rooms",
    href: "/admin/rooms",
    icon: Bed,
    roles: ["admin", "staff", "general_manager", "operational_manager", "front_office_manager"],
  },
  {
    name: "Room Types",
    translationKey: "admin.sidebar.roomTypes",
    href: "/admin/room-types",
    icon: Hotel,
    roles: ["admin", "staff", "general_manager", "operational_manager", "front_office_manager"],
  },
  
  // Services
  {
    name: "Services",
    translationKey: "admin.sidebar.services",
    href: "/admin/services",
    icon: Briefcase,
    roles: ["admin", "staff", "general_manager", "operational_manager"],
    children: [
      {
        name: "Dashboard",
        translationKey: "admin.sidebar.servicesDashboard",
        href: "/admin/services/dashboard",
        icon: BarChart,
        roles: ["admin", "staff", "general_manager", "operational_manager"],
      },
      {
        name: "All Services",
        translationKey: "admin.sidebar.allServices",
        href: "/admin/services/list",
        icon: ClipboardCheck,
        roles: ["admin", "staff", "general_manager", "operational_manager"],
      },
      {
        name: "Food & Drink",
        translationKey: "admin.sidebar.foodAndDrink",
        href: "/admin/food-and-drink",
        icon: Utensils,
        roles: ["admin", "staff", "general_manager", "operational_manager"],
      },
    ]
  },
  
  // Guests
  {
    name: "Guests",
    translationKey: "admin.sidebar.guests",
    href: "/admin/guests",
    icon: User,
    roles: ["admin", "staff", "general_manager", "operational_manager", "front_office_manager"],
  },
  
  // Reports
  {
    name: "Reports",
    translationKey: "admin.sidebar.reports",
    href: "/admin/reports",
    icon: BarChart,
    roles: ["admin", "general_manager", "operational_manager", "finance_manager"],
  },
  
  // Finance
  {
    name: "Finance",
    translationKey: "admin.sidebar.finance",
    href: "/admin/finance/dashboard",
    icon: DollarSign,
    roles: ["admin", "staff", "general_manager", "finance_manager"],
    children: [
      {
        name: "Dashboard",
        translationKey: "admin.sidebar.financeDashboard",
        href: "/admin/finance/dashboard",
        icon: BarChart,
        roles: ["admin", "general_manager", "finance_manager"],
      },
      {
        name: "Billing",
        translationKey: "admin.sidebar.billing",
        href: "/admin/finance/billing",
        icon: DollarSign,
        roles: ["admin", "staff", "general_manager", "finance_manager"],
      },
      {
        name: "Invoices",
        translationKey: "admin.sidebar.invoices",
        href: "/admin/finance/invoices",
        icon: FileText,
        roles: ["admin", "staff", "general_manager", "finance_manager"],
      },
      {
        name: "Reports",
        translationKey: "admin.sidebar.financialReports",
        href: "/admin/finance/reports",
        icon: Calculator,
        roles: ["admin", "general_manager", "finance_manager"],
      },
      {
        name: "Transactions",
        translationKey: "admin.sidebar.transactions",
        href: "/admin/finance/transactions",
        icon: Receipt,
        roles: ["admin", "general_manager", "finance_manager"],
      },
    ],
  },
  
  // Front Office
  {
    name: "Front Office",
    translationKey: "admin.sidebar.frontOffice",
    href: "/admin/frontoffice/dashboard",
    icon: BookOpen,
    roles: ["admin", "general_manager", "front_office_manager", "staff"],
    children: [
      {
        name: "Dashboard",
        translationKey: "admin.sidebar.frontOfficeDashboard",
        href: "/admin/frontoffice/dashboard",
        icon: BarChart,
        roles: ["admin", "general_manager", "front_office_manager", "staff"],
      },
      {
        name: "Front Desk",
        translationKey: "admin.sidebar.frontDesk",
        href: "/admin/frontoffice/front-desk",
        icon: BookOpen,
        roles: ["admin", "general_manager", "front_office_manager", "staff"],
      },
      {
        name: "Reservations",
        translationKey: "admin.sidebar.reservations",
        href: "/admin/frontoffice/reservations",
        icon: ClipboardCheck,
        roles: ["admin", "general_manager", "front_office_manager", "staff"],
      },
    ],
  },
  
  // Inventory/Purchasing
  {
    name: "Inventory",
    translationKey: "admin.sidebar.inventory",
    href: "/admin/inventory/dashboard",
    icon: Package,
    roles: ["admin", "general_manager", "purchasing_manager"],
    children: [
      {
        name: "Dashboard",
        translationKey: "admin.sidebar.inventoryDashboard",
        href: "/admin/inventory/dashboard",
        icon: BarChart,
        roles: ["admin", "general_manager", "purchasing_manager"],
      },
      {
        name: "Items",
        translationKey: "admin.sidebar.inventoryItems",
        href: "/admin/inventory/items",
        icon: Package,
        roles: ["admin", "general_manager", "purchasing_manager"],
      },
      {
        name: "Suppliers",
        translationKey: "admin.sidebar.suppliers",
        href: "/admin/inventory/suppliers",
        icon: ShoppingBag,
        roles: ["admin", "general_manager", "purchasing_manager"],
      },
    ],
  },
  
  // Settings
  {
    name: "Settings",
    translationKey: "admin.sidebar.settings",
    href: "/admin/settings",
    icon: Settings,
    roles: ["admin", "general_manager"],
  },
];
