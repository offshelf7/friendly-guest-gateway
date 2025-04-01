
import { useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { hasRole } from '@/types/roleTypes';
import {
  Home,
  Hotel,
  Users,
  Coffee,
  Settings,
  Inbox,
  CreditCard,
  FileText,
  BarChart3,
  Layers,
  UserCog,
  Building,
  Briefcase,
  Tool,
  LineChart,
  HeartPulse,
} from 'lucide-react';

export function AdminSidebar() {
  const { collapsed } = useSidebar();
  const location = useLocation();
  const { userRoles } = useAuth();
  
  // Check if the current user has admin role
  const isAdmin = hasRole(userRoles, 'admin');

  const isActive = (path: string) => location.pathname === path;

  const links = [
    {
      title: 'Dashboard',
      href: '/admin',
      icon: <Home className="h-4 w-4" />,
      roles: ['admin', 'staff', 'general_manager', 'operational_manager', 'service_manager', 'maintenance_manager', 'marketing_manager', 'human_resources_manager'],
    },
    {
      title: 'Rooms',
      href: '/admin/rooms',
      icon: <Hotel className="h-4 w-4" />,
      roles: ['admin', 'staff', 'general_manager', 'operational_manager'],
    },
    {
      title: 'Room Types',
      href: '/admin/room-types',
      icon: <Layers className="h-4 w-4" />,
      roles: ['admin', 'staff', 'general_manager', 'operational_manager'],
    },
    {
      title: 'Guests',
      href: '/admin/guests',
      icon: <Users className="h-4 w-4" />,
      roles: ['admin', 'staff', 'general_manager', 'service_manager'],
    },
    {
      title: 'Food & Drink',
      href: '/admin/food-and-drink',
      icon: <Coffee className="h-4 w-4" />,
      roles: ['admin', 'staff', 'general_manager', 'service_manager'],
    },
    {
      title: 'Services',
      href: '/admin/services',
      icon: <HeartPulse className="h-4 w-4" />,
      roles: ['admin', 'staff', 'general_manager', 'service_manager', 'operational_manager'],
    },
    {
      title: 'User Management',
      href: '/admin/users',
      icon: <UserCog className="h-4 w-4" />,
      roles: ['admin'],
    },
    {
      title: 'Reports',
      href: '/admin/reports',
      icon: <BarChart3 className="h-4 w-4" />,
      roles: ['admin', 'general_manager', 'marketing_manager'],
    },
    {
      title: 'Messages',
      href: '/admin/messages',
      icon: <Inbox className="h-4 w-4" />,
      roles: ['admin', 'staff', 'general_manager', 'service_manager', 'operational_manager', 'maintenance_manager', 'marketing_manager', 'human_resources_manager'],
    },
    {
      title: 'Billing',
      href: '/admin/billing',
      icon: <CreditCard className="h-4 w-4" />,
      roles: ['admin', 'general_manager', 'operational_manager'],
    },
    {
      title: 'Invoices',
      href: '/admin/invoice',
      icon: <FileText className="h-4 w-4" />,
      roles: ['admin', 'general_manager', 'operational_manager'],
    },
    {
      title: 'Settings',
      href: '/admin/settings',
      icon: <Settings className="h-4 w-4" />,
      roles: ['admin', 'general_manager'],
    },
  ];

  // Role-specific dashboard links
  const roleLinks = [
    {
      title: 'General Manager',
      href: '/admin/general-manager',
      icon: <Building className="h-4 w-4" />,
      role: 'general_manager',
    },
    {
      title: 'Operational Manager',
      href: '/admin/operational-manager',
      icon: <Briefcase className="h-4 w-4" />,
      role: 'operational_manager',
    },
    {
      title: 'Service Manager',
      href: '/admin/service-manager',
      icon: <HeartPulse className="h-4 w-4" />,
      role: 'service_manager',
    },
    {
      title: 'Maintenance Manager',
      href: '/admin/maintenance-manager',
      icon: <Tool className="h-4 w-4" />,
      role: 'maintenance_manager',
    },
    {
      title: 'Marketing Manager',
      href: '/admin/marketing-manager',
      icon: <LineChart className="h-4 w-4" />,
      role: 'marketing_manager',
    },
    {
      title: 'HR Manager',
      href: '/admin/hr-manager',
      icon: <Users className="h-4 w-4" />,
      role: 'human_resources_manager',
    },
  ];

  // Filter links based on user's roles
  const filteredLinks = links.filter(link => 
    hasRole(userRoles, link.roles as any[])
  );

  // Filter role-specific dashboards based on user's roles
  const filteredRoleLinks = roleLinks.filter(link => 
    hasRole(userRoles, link.role as any)
  );

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-10 flex h-full max-h-screen w-56 flex-col border-r bg-background',
        collapsed && 'w-16'
      )}
    >
      <div className="flex flex-col flex-1 p-4 space-y-4">
        <div className="flex items-center justify-center h-12">
          {collapsed ? (
            <span className="h-6 w-6 bg-primary rounded-md"></span>
          ) : (
            <span className="text-xl font-semibold">Hotel Admin</span>
          )}
        </div>
        <Separator />
        <nav className="grid gap-1">
          {filteredLinks.map((link, idx) => (
            <Button
              key={idx}
              asChild
              variant={isActive(link.href) ? 'secondary' : 'ghost'}
              className={cn(
                'justify-start h-10',
                collapsed && 'justify-center px-2'
              )}
            >
              <Link to={link.href}>
                {link.icon}
                {!collapsed && <span className="ml-2">{link.title}</span>}
              </Link>
            </Button>
          ))}
        </nav>

        {filteredRoleLinks.length > 0 && (
          <>
            <Separator />
            <div className={cn('text-xs text-muted-foreground', collapsed && 'hidden')}>
              Role Dashboards
            </div>
            <nav className="grid gap-1">
              {filteredRoleLinks.map((link, idx) => (
                <Button
                  key={idx}
                  asChild
                  variant={isActive(link.href) ? 'secondary' : 'ghost'}
                  className={cn(
                    'justify-start h-10',
                    collapsed && 'justify-center px-2'
                  )}
                >
                  <Link to={link.href}>
                    {link.icon}
                    {!collapsed && <span className="ml-2">{link.title}</span>}
                  </Link>
                </Button>
              ))}
            </nav>
          </>
        )}
      </div>
    </aside>
  );
}
