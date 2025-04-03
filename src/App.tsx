
import { Routes, Route } from "react-router-dom";
import { RoleBasedRoute } from "./components/auth/RoleBasedRoute";
import Index from "./pages/Index";
import Rooms from "./pages/Rooms";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import RoomBooking from "./pages/RoomBooking";
import BookingSuccess from "./pages/BookingSuccess";
import MyBookings from "./pages/MyBookings";
import Checkout from "./pages/Checkout";
import Cart from "./pages/Cart";
import Facilities from "./pages/Facilities";
import FoodAndDrink from "./pages/FoodAndDrink";

// Admin imports
import AdminHome from "./pages/admin/AdminHome";
import Dashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminMessages from "./pages/admin/AdminMessages";
import AdminRooms from "./pages/admin/AdminRooms";
import AdminRoomTypes from "./pages/admin/AdminRoomTypes";
import AdminServices from "./pages/admin/AdminServices";
import AdminFoodAndDrink from "./pages/admin/AdminFoodAndDrink";
import AdminBilling from "./pages/admin/AdminBilling";
import AdminInvoice from "./pages/admin/AdminInvoice";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminGuests from "./pages/admin/AdminGuests";
import AdminReports from "./pages/admin/AdminReports";
import GuestProfile from "./pages/admin/GuestProfile";
import GeneralManagerDashboard from "./pages/admin/GeneralManagerDashboard";
import OperationalManagerDashboard from "./pages/admin/OperationalManagerDashboard";
import SuspendedUserDashboard from "./pages/admin/SuspendedUserDashboard";
import ServiceManagerDashboard from "./pages/admin/ServiceManagerDashboard";
import MaintenanceManagerDashboard from "./pages/admin/MaintenanceManagerDashboard";
import MarketingManagerDashboard from "./pages/admin/MarketingManagerDashboard";
import HRManagerDashboard from "./pages/admin/HRManagerDashboard";

// New department dashboards
import FrontOfficeDashboard from "./pages/admin/FrontOfficeDashboard";
import FinanceDashboard from "./pages/admin/FinanceDashboard";
import PurchasingDashboard from "./pages/admin/PurchasingDashboard";

// New department pages
import FrontDesk from "./pages/admin/FrontDesk";
import Reservations from "./pages/admin/Reservations";
import FinanceReports from "./pages/admin/FinanceReports";
import Transactions from "./pages/admin/Transactions";
import Inventory from "./pages/admin/Inventory";
import Suppliers from "./pages/admin/Suppliers";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/rooms" element={<Rooms />} />
      <Route path="/login" element={<Login />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/rooms/:id" element={<RoomBooking />} />
      <Route path="/booking-success" element={<BookingSuccess />} />
      <Route path="/my-bookings" element={<MyBookings />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/facilities" element={<Facilities />} />
      <Route path="/food-and-drink" element={<FoodAndDrink />} />

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <RoleBasedRoute
            allowedRoles={["admin", "staff", "general_manager", "operational_manager", "front_office_manager", "finance_manager", "purchasing_manager"]}
            redirectTo="/"
          >
            <AdminHome />
          </RoleBasedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="messages" element={<AdminMessages />} />
        <Route path="rooms" element={<AdminRooms />} />
        <Route path="room-types" element={<AdminRoomTypes />} />
        <Route path="services" element={<AdminServices />} />
        <Route path="food-and-drink" element={<AdminFoodAndDrink />} />
        <Route path="billing" element={<AdminBilling />} />
        <Route path="invoice" element={<AdminInvoice />} />
        <Route path="invoice/:id" element={<AdminInvoice />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="guests" element={<AdminGuests />} />
        <Route path="reports" element={<AdminReports />} />
        <Route path="guest/:id" element={<GuestProfile />} />

        {/* Manager Dashboards */}
        <Route path="general-manager" element={<GeneralManagerDashboard />} />
        <Route path="operational-manager" element={<OperationalManagerDashboard />} />
        <Route path="suspended" element={<SuspendedUserDashboard />} />
        <Route path="service-manager" element={<ServiceManagerDashboard />} />
        <Route path="maintenance-manager" element={<MaintenanceManagerDashboard />} />
        <Route path="marketing-manager" element={<MarketingManagerDashboard />} />
        <Route path="hr-manager" element={<HRManagerDashboard />} />
        
        {/* Department Dashboards */}
        <Route path="front-office" element={<FrontOfficeDashboard />} />
        <Route path="finance" element={<FinanceDashboard />} />
        <Route path="purchasing" element={<PurchasingDashboard />} />
        
        {/* Front Office Pages */}
        <Route path="front-desk" element={<FrontDesk />} />
        <Route path="reservations" element={<Reservations />} />
        
        {/* Finance Pages */}
        <Route path="finance-reports" element={<FinanceReports />} />
        <Route path="transactions" element={<Transactions />} />
        
        {/* Inventory/Purchasing Pages */}
        <Route path="inventory" element={<Inventory />} />
        <Route path="suppliers" element={<Suppliers />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
