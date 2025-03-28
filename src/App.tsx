
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Rooms from "./pages/Rooms";
import RoomBooking from "./pages/RoomBooking";
import BookingSuccess from "./pages/BookingSuccess";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";

// Import Admin pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminHome from "./pages/admin/AdminHome";
import AdminRooms from "./pages/admin/AdminRooms";
import AdminGuests from "./pages/admin/AdminGuests";
import GuestProfile from "./pages/admin/GuestProfile";
import AdminServices from "./pages/admin/AdminServices";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/booking/:roomId" element={<RoomBooking />} />
            <Route path="/booking-success" element={<BookingSuccess />} />
            <Route path="/profile" element={<Profile />} />
            
            {/* Admin routes */}
            <Route path="/admin" element={<AdminDashboard />}>
              <Route index element={<AdminHome />} />
              <Route path="rooms" element={<AdminRooms />} />
              <Route path="guests" element={<AdminGuests />} />
              <Route path="guests/:id" element={<GuestProfile />} />
              <Route path="services" element={<AdminServices />} />
              <Route path="staff" element={<AdminHome />} />
              <Route path="reservations" element={<AdminHome />} />
              <Route path="messages" element={<AdminHome />} />
              <Route path="billing" element={<AdminHome />} />
              <Route path="invoice" element={<AdminHome />} />
              <Route path="settings" element={<AdminHome />} />
              <Route path="profile" element={<AdminHome />} />
            </Route>
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
        <Sonner />
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
