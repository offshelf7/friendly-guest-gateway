
import { Routes as RouterRoutes, Route, Navigate } from 'react-router-dom';
import Index from './pages/Index';
import Rooms from './pages/Rooms';
import Facilities from './pages/Facilities';
import FoodAndDrink from './pages/FoodAndDrink';
import Contact from './pages/Contact';
import Login from './pages/Login';
import RoomBooking from './pages/RoomBooking';
import BookingSuccess from './pages/BookingSuccess';
import Profile from './pages/Profile';
import MyBookings from './pages/MyBookings';
import NotFound from './pages/NotFound';

// Admin and role-specific components
import Dashboard from './pages/admin/Dashboard';
import RoleBasedRoute from './components/auth/RoleBasedRoute';

const Routes = () => {
  return (
    <RouterRoutes>
      <Route path="/" element={<Index />} />
      <Route path="/rooms" element={<Rooms />} />
      <Route path="/facilities" element={<Facilities />} />
      <Route path="/food-and-drink" element={<FoodAndDrink />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/booking/:roomId" element={<RoomBooking />} />
      <Route path="/booking-success" element={<BookingSuccess />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/my-bookings" element={<MyBookings />} />
      
      {/* Admin routes */}
      <Route 
        path="/admin/*" 
        element={
          <RoleBasedRoute allowedRoles={['admin', 'staff']}>
            <Dashboard />
          </RoleBasedRoute>
        } 
      />
      
      {/* 404 page */}
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </RouterRoutes>
  );
};

export default Routes;
