import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { DASHBOARD_ACCESS } from '@/types/roleTypes';

type RoleBasedRouteProps = {
  allowedRoles?: string[];
  redirectPath?: string;
};

export const RoleBasedRoute = ({
  allowedRoles = [],
  redirectPath = '/login',
}: RoleBasedRouteProps) => {
  const { user, userRole, loading } = useAuth();
  
  // Show loading state if auth is still being checked
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  // If user isn't logged in, redirect to login
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }
  
  // If no specific roles are required, or user's role is allowed, render the route
  if (
    allowedRoles.length === 0 ||
    (userRole && allowedRoles.includes(userRole))
  ) {
    return <Outlet />;
  }
  
  // If user has dashboard access but not to this specific area, redirect to main dashboard
  if (userRole && DASHBOARD_ACCESS[userRole]) {
    return <Navigate to="/admin" replace />;
  }
  
  // Otherwise redirect to login
  return <Navigate to={redirectPath} replace />;
};
