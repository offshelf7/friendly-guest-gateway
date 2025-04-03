import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/MockAuthContext";
import { adminSidebarItems } from "./AdminSidebarItems";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, LogOut } from "lucide-react";
import { hasRole, UserRole } from "@/types/roleTypes";

const AdminSidebar = () => {
  const location = useLocation();
  const { userRoles, signOut } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  // Filter items based on user roles - ensure userRoles is treated as UserRole[]
  const filteredItems = adminSidebarItems.filter(
    (item) => !item.roles || hasRole(userRoles as UserRole[], item.roles as UserRole[])
  );

  return (
    <div
      className={`border-r bg-background fixed z-30 h-full transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="flex h-16 items-center px-4 border-b">
        <div className="flex items-center justify-between w-full">
          {!collapsed && (
            <Link to="/admin" className="font-semibold text-lg">
              Hotel Admin
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto"
          >
            <ChevronLeft
              className={`h-4 w-4 transition-transform ${
                collapsed ? "rotate-180" : ""
              }`}
            />
          </Button>
        </div>
      </div>
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="py-2">
          <nav className="grid gap-1 px-2">
            {filteredItems.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                  location.pathname === item.href
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-accent hover:text-accent-foreground"
                } ${collapsed ? "justify-center" : ""}`}
              >
                <item.icon className="h-4 w-4" />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            ))}
          </nav>
          <Separator className="my-2" />
          <div className="px-3">
            <Button
              variant="ghost"
              className={`w-full justify-${
                collapsed ? "center" : "start"
              } gap-2`}
              onClick={signOut}
            >
              <LogOut className="h-4 w-4" />
              {!collapsed && <span>Logout</span>}
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default AdminSidebar;
