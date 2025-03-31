
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { hasRole, hasDashboardAccess } from '@/types/roleTypes';

type RoleBasedRouteProps = {
  allowedRoles?: string[];
  redirectPath?: string;
};

export const RoleBasedRoute = ({
  allowedRoles = [],
  redirectPath = '/login',
}: RoleBasedRouteProps) => {
  const { user, userRoles, loading } = useAuth();
  
  // Show loading state if auth is still being checked
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  // If user isn't logged in, redirect to login
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }
  
  // If no specific roles are required, or user has at least one of the allowed roles, render the route
  if (
    allowedRoles.length === 0 ||
    hasRole(userRoles, allowedRoles as any[])
  ) {
    return <Outlet />;
  }
  
  // If user has dashboard access but not to this specific area, redirect to main dashboard
  if (hasDashboardAccess(userRoles)) {
    return <Navigate to="/admin" replace />;
  }
  
  // Otherwise redirect to login
  return <Navigate to={redirectPath} replace />;
};
