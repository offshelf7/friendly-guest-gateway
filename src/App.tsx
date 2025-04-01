
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { RoleBasedRoute } from "@/components/auth/RoleBasedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Rooms from "./pages/Rooms";
import RoomBooking from "./pages/RoomBooking";
import BookingSuccess from "./pages/BookingSuccess";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Facilities from "./pages/Facilities";
import MyBookings from "./pages/MyBookings";
import Contact from "./pages/Contact";
import FoodAndDrink from "./pages/FoodAndDrink";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

// Import Admin pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminHome from "./pages/admin/AdminHome";
import AdminRooms from "./pages/admin/AdminRooms";
import AdminRoomTypes from "./pages/admin/AdminRoomTypes";
import AdminFoodAndDrink from "./pages/admin/AdminFoodAndDrink";
import AdminGuests from "./pages/admin/AdminGuests";
import GuestProfile from "./pages/admin/GuestProfile";
import AdminServices from "./pages/admin/AdminServices";
import AdminReports from "./pages/admin/AdminReports";
import AdminUsers from "./pages/admin/AdminUsers";
import SuspendedUserDashboard from "./pages/admin/SuspendedUserDashboard";

// Import role-specific dashboard pages
import GeneralManagerDashboard from "./pages/admin/GeneralManagerDashboard";
import OperationalManagerDashboard from "./pages/admin/OperationalManagerDashboard";
import ServiceManagerDashboard from "./pages/admin/ServiceManagerDashboard";
import MaintenanceManagerDashboard from "./pages/admin/MaintenanceManagerDashboard";
import MarketingManagerDashboard from "./pages/admin/MarketingManagerDashboard";
import HRManagerDashboard from "./pages/admin/HRManagerDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/rooms" element={<Rooms />} />
              <Route path="/booking/:roomId" element={<RoomBooking />} />
              <Route path="/booking-success" element={<BookingSuccess />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/facilities" element={<Facilities />} />
              <Route path="/my-bookings" element={<MyBookings />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/food-and-drink" element={<FoodAndDrink />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              
              {/* Admin routes with role-based access control */}
              <Route element={<RoleBasedRoute allowedRoles={['admin', 'staff', 'general_manager', 'operational_manager', 'service_manager', 'maintenance_manager', 'marketing_manager', 'human_resources_manager']} />}>
                <Route path="/admin" element={<AdminDashboard />}>
                  <Route index element={<AdminHome />} />
                  
                  {/* Common admin routes accessible by all admin roles */}
                  <Route path="rooms" element={<AdminRooms />} />
                  <Route path="room-types" element={<AdminRoomTypes />} />
                  <Route path="food-and-drink" element={<AdminFoodAndDrink />} />
                  <Route path="guests" element={<AdminGuests />} />
                  <Route path="guests/:id" element={<GuestProfile />} />
                  <Route path="services" element={<AdminServices />} />
                  <Route path="reports" element={<AdminReports />} />
                  <Route path="staff" element={<AdminHome />} />
                  <Route path="reservations" element={<AdminHome />} />
                  <Route path="messages" element={<AdminHome />} />
                  <Route path="billing" element={<AdminHome />} />
                  <Route path="invoice" element={<AdminHome />} />
                  <Route path="settings" element={<AdminHome />} />
                  <Route path="profile" element={<AdminHome />} />
                  
                  {/* User management - admin only */}
                  <Route path="users" element={<AdminUsers />} />
                  
                  {/* Role-specific dashboard pages */}
                  <Route path="general-manager" element={<GeneralManagerDashboard />} />
                  <Route path="operational-manager" element={<OperationalManagerDashboard />} />
                  <Route path="service-manager" element={<ServiceManagerDashboard />} />
                  <Route path="maintenance-manager" element={<MaintenanceManagerDashboard />} />
                  <Route path="marketing-manager" element={<MarketingManagerDashboard />} />
                  <Route path="hr-manager" element={<HRManagerDashboard />} />
                </Route>
              </Route>
              
              {/* Suspended user dashboard - accessible only by suspended users */}
              <Route path="/admin/suspended" element={<RoleBasedRoute checkSuspension={false} />}>
                <Route index element={<SuspendedUserDashboard />} />
              </Route>
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          <Toaster />
          <Sonner />
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
