
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole, hasRole, hasDashboardAccess } from '@/types/roleTypes';

type RoleBasedRouteProps = {
  allowedRoles?: UserRole[];
  redirectPath?: string;
  checkSuspension?: boolean;
  children?: React.ReactNode;
};

export const RoleBasedRoute = ({
  allowedRoles = [],
  redirectPath = '/login',
  checkSuspension = true,
  children,
}: RoleBasedRouteProps) => {
  const { user, userRoles, loading, userSuspended } = useAuth();
  
  // Show loading state if auth is still being checked
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  // If user isn't logged in, redirect to login
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }
  
  // If user is suspended and this route should check suspension,
  // redirect to suspended dashboard
  if (checkSuspension && userSuspended) {
    // Only allow access to the suspended dashboard
    if (window.location.pathname !== '/admin/suspended') {
      return <Navigate to="/admin/suspended" replace />;
    }
    return children ? <>{children}</> : <Outlet />;
  }
  
  // Special case for the suspended dashboard - only suspended users should access it
  if (window.location.pathname === '/admin/suspended' && !userSuspended) {
    return <Navigate to="/admin" replace />;
  }
  
  // Special case for admin access - if user email is admin@hotel.com or has admin role
  const isAdmin = user.email === 'admin@hotel.com' || 
                 (userRoles && userRoles.includes('admin'));
  
  if (isAdmin && window.location.pathname.startsWith('/admin')) {
    return children ? <>{children}</> : <Outlet />;
  }
  
  // If no specific roles are required, or user has at least one of the allowed roles, render the route
  if (
    allowedRoles.length === 0 ||
    hasRole(userRoles as UserRole | UserRole[] | null, allowedRoles as UserRole[])
  ) {
    return children ? <>{children}</> : <Outlet />;
  }
  
  // If user has dashboard access but not to this specific area, redirect to main dashboard
  if (hasDashboardAccess(userRoles as UserRole | UserRole[] | null)) {
    return <Navigate to="/admin" replace />;
  }
  
  // Otherwise redirect to login
  return <Navigate to={redirectPath} replace />;
};

export default RoleBasedRoute;
