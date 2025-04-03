
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

// Layout component
import AdminHome from "./pages/admin/AdminHome";

// Dashboard components 
import Dashboard from "./pages/admin/Dashboard";
import GeneralManagerDashboard from "./pages/admin/GeneralManagerDashboard";
import OperationalManagerDashboard from "./pages/admin/OperationalManagerDashboard";
import ServiceManagerDashboard from "./pages/admin/ServiceManagerDashboard";
import MaintenanceManagerDashboard from "./pages/admin/MaintenanceManagerDashboard";
import MarketingManagerDashboard from "./pages/admin/MarketingManagerDashboard";
import HRManagerDashboard from "./pages/admin/HRManagerDashboard";
import FrontOfficeDashboard from "./pages/admin/FrontOfficeDashboard";
import FinanceDashboard from "./pages/admin/FinanceDashboard";
import PurchasingDashboard from "./pages/admin/PurchasingDashboard";
import SuspendedUserDashboard from "./pages/admin/SuspendedUserDashboard";

// Admin features - Users, Messages, Rooms
import AdminUsers from "./pages/admin/AdminUsers";
import AdminMessages from "./pages/admin/AdminMessages";
import AdminRooms from "./pages/admin/AdminRooms";
import AdminRoomTypes from "./pages/admin/AdminRoomTypes";
import AdminGuests from "./pages/admin/AdminGuests";
import GuestProfile from "./pages/admin/GuestProfile";

// Admin features - Services
import AdminServices from "./pages/admin/AdminServices";
import AdminFoodAndDrink from "./pages/admin/AdminFoodAndDrink";

// Admin features - Reports
import AdminReports from "./pages/admin/AdminReports";

// Admin features - Finance
import AdminBilling from "./pages/admin/AdminBilling";
import AdminInvoice from "./pages/admin/AdminInvoice";
import FinanceReports from "./pages/admin/FinanceReports";
import Transactions from "./pages/admin/Transactions";

// Admin features - Front Office
import FrontDesk from "./pages/admin/FrontDesk";
import Reservations from "./pages/admin/Reservations";

// Admin features - Inventory/Purchasing
import Inventory from "./pages/admin/Inventory";
import Suppliers from "./pages/admin/Suppliers";

// Admin features - Settings
import AdminSettings from "./pages/admin/AdminSettings";

import "./App.css";

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Index />} />
      <Route path="/rooms" element={<Rooms />} />
      <Route path="/login" element={<Login />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/facilities" element={<Facilities />} />
      <Route path="/food-and-drink" element={<FoodAndDrink />} />
      
      {/* Protected customer routes */}
      <Route path="/profile" element={<Profile />} />
      <Route path="/rooms/:id" element={<RoomBooking />} />
      <Route path="/booking-success" element={<BookingSuccess />} />
      <Route path="/my-bookings" element={<MyBookings />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/cart" element={<Cart />} />

      {/* Admin Routes with Role-Based Access */}
      <Route
        path="/admin"
        element={
          <RoleBasedRoute
            allowedRoles={["admin", "staff", "general_manager", "operational_manager", "front_office_manager", "finance_manager", "purchasing_manager"]}
            redirectPath="/"
          >
            <AdminHome />
          </RoleBasedRoute>
        }
      >
        {/* Main Dashboard - accessible to all admin roles */}
        <Route index element={<Dashboard />} />

        {/* Manager Dashboards */}
        <Route path="dashboards">
          <Route path="general-manager" element={
            <RoleBasedRoute allowedRoles={["admin", "general_manager"]}>
              <GeneralManagerDashboard />
            </RoleBasedRoute>
          } />
          <Route path="operational-manager" element={
            <RoleBasedRoute allowedRoles={["admin", "operational_manager"]}>
              <OperationalManagerDashboard />
            </RoleBasedRoute>
          } />
          <Route path="service-manager" element={
            <RoleBasedRoute allowedRoles={["admin", "operational_manager"]}>
              <ServiceManagerDashboard />
            </RoleBasedRoute>
          } />
          <Route path="maintenance-manager" element={
            <RoleBasedRoute allowedRoles={["admin", "operational_manager"]}>
              <MaintenanceManagerDashboard />
            </RoleBasedRoute>
          } />
          <Route path="marketing-manager" element={
            <RoleBasedRoute allowedRoles={["admin", "general_manager"]}>
              <MarketingManagerDashboard />
            </RoleBasedRoute>
          } />
          <Route path="hr-manager" element={
            <RoleBasedRoute allowedRoles={["admin", "general_manager"]}>
              <HRManagerDashboard />
            </RoleBasedRoute>
          } />
        </Route>

        {/* Department Dashboards */}
        <Route path="departments">
          <Route path="front-office" element={
            <RoleBasedRoute allowedRoles={["admin", "general_manager", "front_office_manager", "staff"]}>
              <FrontOfficeDashboard />
            </RoleBasedRoute>
          } />
          <Route path="finance" element={
            <RoleBasedRoute allowedRoles={["admin", "general_manager", "finance_manager"]}>
              <FinanceDashboard />
            </RoleBasedRoute>
          } />
          <Route path="purchasing" element={
            <RoleBasedRoute allowedRoles={["admin", "general_manager", "purchasing_manager"]}>
              <PurchasingDashboard />
            </RoleBasedRoute>
          } />
        </Route>

        {/* User Management */}
        <Route path="users" element={
          <RoleBasedRoute allowedRoles={["admin", "general_manager"]}>
            <AdminUsers />
          </RoleBasedRoute>
        } />
        <Route path="suspended" element={<SuspendedUserDashboard />} />
        
        {/* Communication */}
        <Route path="messages" element={
          <RoleBasedRoute allowedRoles={["admin", "staff", "general_manager", "operational_manager"]}>
            <AdminMessages />
          </RoleBasedRoute>
        } />
        
        {/* Rooms and Facilities */}
        <Route path="rooms" element={
          <RoleBasedRoute allowedRoles={["admin", "staff", "general_manager", "operational_manager", "front_office_manager"]}>
            <AdminRooms />
          </RoleBasedRoute>
        } />
        <Route path="room-types" element={
          <RoleBasedRoute allowedRoles={["admin", "staff", "general_manager", "operational_manager", "front_office_manager"]}>
            <AdminRoomTypes />
          </RoleBasedRoute>
        } />
        
        {/* Guest Management */}
        <Route path="guests" element={
          <RoleBasedRoute allowedRoles={["admin", "staff", "general_manager", "operational_manager", "front_office_manager"]}>
            <AdminGuests />
          </RoleBasedRoute>
        } />
        <Route path="guest/:id" element={
          <RoleBasedRoute allowedRoles={["admin", "staff", "general_manager", "operational_manager", "front_office_manager"]}>
            <GuestProfile />
          </RoleBasedRoute>
        } />
        
        {/* Services */}
        <Route path="services" element={
          <RoleBasedRoute allowedRoles={["admin", "staff", "general_manager", "operational_manager"]}>
            <AdminServices />
          </RoleBasedRoute>
        } />
        <Route path="food-and-drink" element={
          <RoleBasedRoute allowedRoles={["admin", "staff", "general_manager", "operational_manager"]}>
            <AdminFoodAndDrink />
          </RoleBasedRoute>
        } />
        
        {/* Reports */}
        <Route path="reports" element={
          <RoleBasedRoute allowedRoles={["admin", "general_manager", "operational_manager", "finance_manager"]}>
            <AdminReports />
          </RoleBasedRoute>
        } />
        
        {/* Finance */}
        <Route path="finance">
          <Route path="billing" element={
            <RoleBasedRoute allowedRoles={["admin", "staff", "general_manager", "finance_manager"]}>
              <AdminBilling />
            </RoleBasedRoute>
          } />
          <Route path="invoices" element={
            <RoleBasedRoute allowedRoles={["admin", "staff", "general_manager", "finance_manager"]}>
              <AdminInvoice />
            </RoleBasedRoute>
          } />
          <Route path="invoice/:id" element={
            <RoleBasedRoute allowedRoles={["admin", "staff", "general_manager", "finance_manager"]}>
              <AdminInvoice />
            </RoleBasedRoute>
          } />
          <Route path="reports" element={
            <RoleBasedRoute allowedRoles={["admin", "general_manager", "finance_manager"]}>
              <FinanceReports />
            </RoleBasedRoute>
          } />
          <Route path="transactions" element={
            <RoleBasedRoute allowedRoles={["admin", "general_manager", "finance_manager"]}>
              <Transactions />
            </RoleBasedRoute>
          } />
        </Route>
        
        {/* Front Office */}
        <Route path="front-office">
          <Route path="front-desk" element={
            <RoleBasedRoute allowedRoles={["admin", "general_manager", "front_office_manager", "staff"]}>
              <FrontDesk />
            </RoleBasedRoute>
          } />
          <Route path="reservations" element={
            <RoleBasedRoute allowedRoles={["admin", "general_manager", "front_office_manager", "staff"]}>
              <Reservations />
            </RoleBasedRoute>
          } />
        </Route>
        
        {/* Inventory/Purchasing */}
        <Route path="inventory">
          <Route path="items" element={
            <RoleBasedRoute allowedRoles={["admin", "general_manager", "purchasing_manager"]}>
              <Inventory />
            </RoleBasedRoute>
          } />
          <Route path="suppliers" element={
            <RoleBasedRoute allowedRoles={["admin", "general_manager", "purchasing_manager"]}>
              <Suppliers />
            </RoleBasedRoute>
          } />
        </Route>
        
        {/* Settings */}
        <Route path="settings" element={
          <RoleBasedRoute allowedRoles={["admin", "general_manager"]}>
            <AdminSettings />
          </RoleBasedRoute>
        } />
      </Route>

      {/* Catch all for 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
