
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext"; 
import { adminSidebarItems } from "./AdminSidebarItems";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, ChevronLeft, LogOut } from "lucide-react";
import { hasRole, UserRole } from "@/types/roleTypes";
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const AdminSidebar = () => {
  const location = useLocation();
  const { userRoles, signOut } = useAuth();
  const { t } = useLanguage();
  const [collapsed, setCollapsed] = useState(false);
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});

  // Filter items based on user roles
  const filteredItems = adminSidebarItems.filter(
    (item) => !item.roles || hasRole(userRoles as UserRole[], item.roles as UserRole[])
  );

  const toggleCategory = (href: string) => {
    if (collapsed) return;
    
    setOpenCategories(prev => ({
      ...prev,
      [href]: !prev[href]
    }));
  };

  const isItemActive = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(`${href}/`);
  };

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
              {t('admin.sidebar.title')}
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
              item.children ? (
                <Collapsible 
                  key={index}
                  open={openCategories[item.href] || isItemActive(item.href)}
                  onOpenChange={() => {}}
                  className={collapsed ? "hidden" : ""}
                >
                  <CollapsibleTrigger asChild onClick={(e) => {
                    e.preventDefault();
                    toggleCategory(item.href);
                  }}>
                    <div className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors cursor-pointer ${
                      isItemActive(item.href)
                        ? "bg-accent text-accent-foreground"
                        : "hover:bg-accent hover:text-accent-foreground"
                    }`}>
                      <div className="flex items-center gap-3">
                        <item.icon className="h-4 w-4" />
                        {!collapsed && <span>{t(item.translationKey)}</span>}
                      </div>
                      {!collapsed && (
                        <ChevronDown className={`h-4 w-4 transition-transform ${
                          openCategories[item.href] ? "rotate-180" : ""
                        }`} />
                      )}
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="pl-6 pt-1">
                      {item.children.filter(
                        child => !child.roles || hasRole(userRoles as UserRole[], child.roles as UserRole[])
                      ).map((child, childIndex) => (
                        <Link
                          key={`${index}-${childIndex}`}
                          to={child.href}
                          className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                            location.pathname === child.href
                              ? "bg-accent text-accent-foreground"
                              : "hover:bg-accent hover:text-accent-foreground"
                          }`}
                        >
                          <child.icon className="h-4 w-4" />
                          <span>{t(child.translationKey)}</span>
                        </Link>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ) : (
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
                  {!collapsed && <span>{t(item.translationKey)}</span>}
                </Link>
              )
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
              {!collapsed && <span>{t('admin.sidebar.logout')}</span>}
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default AdminSidebar;
