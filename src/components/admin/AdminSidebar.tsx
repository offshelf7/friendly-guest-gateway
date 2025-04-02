
import { useLocation, Link } from "react-router-dom";
import {
  Users,
  Home,
  Hotel,
  Settings,
  MessageSquare,
  CreditCard,
  FileText,
  Coffee,
  Briefcase,
  BarChart,
  User,
  UserCog,
  Wrench,
  LineChart,
  UserPlus,
  Building,
  DollarSign,
  ShoppingCart,
} from "lucide-react";

const AdminSidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isLinkActive = (path: string) => {
    return currentPath === path || currentPath.startsWith(`${path}/`);
  };

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: Home },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Messages", href: "/admin/messages", icon: MessageSquare },
    { name: "Rooms", href: "/admin/rooms", icon: Hotel },
    { name: "Room Types", href: "/admin/room-types", icon: Building },
    { name: "Services", href: "/admin/services", icon: Briefcase },
    { name: "Food & Drink", href: "/admin/food-and-drink", icon: Coffee },
    { name: "Billing", href: "/admin/billing", icon: CreditCard },
    { name: "Invoices", href: "/admin/invoice", icon: FileText },
    { name: "Guests", href: "/admin/guests", icon: User },
    { name: "Reports", href: "/admin/reports", icon: BarChart },
  ];

  const departments = [
    { name: "General Manager", href: "/admin/general-manager", icon: UserCog },
    { name: "Operational Manager", href: "/admin/operational-manager", icon: Wrench },
    { name: "Service Manager", href: "/admin/service-manager", icon: Briefcase },
    { name: "Maintenance", href: "/admin/maintenance-manager", icon: Wrench },
    { name: "Marketing", href: "/admin/marketing-manager", icon: LineChart },
    { name: "HR Manager", href: "/admin/hr-manager", icon: UserPlus },
    { name: "Front Office", href: "/admin/front-office", icon: Building },
    { name: "Finance & Accounting", href: "/admin/finance", icon: DollarSign },
    { name: "Purchasing & Stores", href: "/admin/purchasing", icon: ShoppingCart },
  ];

  const footer = [
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="flex h-full w-64 flex-col bg-white border-r">
      <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
        <div className="flex flex-shrink-0 items-center px-4">
          <Link to="/" className="text-xl font-bold">
            Hotel Admin
          </Link>
        </div>
        <nav className="mt-5 flex-1 space-y-1 px-2">
          <div className="mb-4">
            <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Main
            </p>
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md my-1 ${
                  isLinkActive(item.href)
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <item.icon
                  className={`mr-3 flex-shrink-0 h-6 w-6 ${
                    isLinkActive(item.href)
                      ? "text-gray-500"
                      : "text-gray-400 group-hover:text-gray-500"
                  }`}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            ))}
          </div>

          <div className="mb-4">
            <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Departments
            </p>
            {departments.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md my-1 ${
                  isLinkActive(item.href)
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <item.icon
                  className={`mr-3 flex-shrink-0 h-6 w-6 ${
                    isLinkActive(item.href)
                      ? "text-gray-500"
                      : "text-gray-400 group-hover:text-gray-500"
                  }`}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
      </div>
      <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
        {footer.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={`group flex w-full items-center px-2 py-2 text-sm font-medium rounded-md ${
              isLinkActive(item.href)
                ? "bg-gray-100 text-gray-900"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <item.icon
              className={`mr-3 flex-shrink-0 h-6 w-6 ${
                isLinkActive(item.href)
                  ? "text-gray-500"
                  : "text-gray-400 group-hover:text-gray-500"
              }`}
              aria-hidden="true"
            />
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminSidebar;
