
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

import AdminHome from "./pages/admin/AdminHome";

import Dashboard from "./pages/admin/Dashboard";
import GeneralManagerDashboard from "./pages/general-manager/GeneralManagerDashboard";
import OperationalManagerDashboard from "./pages/operation/OperationalManagerDashboard";
import ServiceManagerDashboard from "./pages/services/ServiceManagerDashboard";
import MaintenanceManagerDashboard from "./pages/maintenance/MaintenanceManagerDashboard";
import MarketingManagerDashboard from "./pages/marketing/MarketingManagerDashboard";
import HRManagerDashboard from "./pages/hr/HRManagerDashboard";
import FrontOfficeDashboard from "./pages/frontoffice/FrontOfficeDashboard";
import FinanceDashboard from "./pages/finance/FinanceDashboard";
import PurchasingDashboard from "./pages/inventory/PurchasingDashboard";
import SuspendedUserDashboard from "./pages/users/SuspendedUserDashboard";

import AdminUsers from "./pages/users/AdminUsers";
import AdminMessages from "./pages/admin/AdminMessages";
import AdminRooms from "./pages/admin/AdminRooms";
import AdminRoomTypes from "./pages/admin/AdminRoomTypes";
import AdminGuests from "./pages/admin/AdminGuests";
import GuestProfile from "./pages/users/GuestProfile";

import AdminServices from "./pages/admin/AdminServices";
import AdminFoodAndDrink from "./pages/admin/AdminFoodAndDrink";

import AdminReports from "./pages/admin/AdminReports";

import AdminBilling from "./pages/admin/AdminBilling";
import AdminInvoice from "./pages/admin/AdminInvoice";
import FinanceReports from "./pages/finance/FinancialReports";
import Transactions from "./pages/admin/Transactions";

import FrontDesk from "./pages/frontoffice/FrontDesk";
import Reservations from "./pages/frontoffice/Reservations";

import Inventory from "./pages/inventory/Inventory";
import Suppliers from "./pages/inventory/Suppliers";

import AdminSettings from "./pages/admin/AdminSettings";

// Import components from their new locations
import ServicesDashboard from "./pages/services/ServicesDashboard";
import ServicesList from "./pages/services/ServicesList";
import Billing from "./pages/finance/Billing";
import Invoices from "./pages/finance/Invoices";
import FinancialReports from "./pages/finance/FinancialReports";
import InventoryDashboard from "./pages/inventory/InventoryDashboard";
import InventoryItems from "./pages/inventory/InventoryItems";
import SuppliersList from "./pages/inventory/SuppliersList";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/rooms" element={<Rooms />} />
      <Route path="/login" element={<Login />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/facilities" element={<Facilities />} />
      <Route path="/food-and-drink" element={<FoodAndDrink />} />
      
      <Route path="/profile" element={<Profile />} />
      <Route path="/rooms/:id" element={<RoomBooking />} />
      <Route path="/booking-success" element={<BookingSuccess />} />
      <Route path="/my-bookings" element={<MyBookings />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/cart" element={<Cart />} />

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
        <Route index element={<Dashboard />} />

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

        <Route path="users" element={
          <RoleBasedRoute allowedRoles={["admin", "general_manager"]}>
            <AdminUsers />
          </RoleBasedRoute>
        } />
        <Route path="suspended" element={<SuspendedUserDashboard />} />
        
        <Route path="messages" element={
          <RoleBasedRoute allowedRoles={["admin", "staff", "general_manager", "operational_manager"]}>
            <AdminMessages />
          </RoleBasedRoute>
        } />
        
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
        
        <Route path="services" element={
          <RoleBasedRoute allowedRoles={["admin", "staff", "general_manager", "operational_manager"]}>
            <ServicesDashboard />
          </RoleBasedRoute>
        } />
        <Route path="services/list" element={
          <RoleBasedRoute allowedRoles={["admin", "staff", "general_manager", "operational_manager"]}>
            <ServicesList />
          </RoleBasedRoute>
        } />
        <Route path="food-and-drink" element={
          <RoleBasedRoute allowedRoles={["admin", "staff", "general_manager", "operational_manager"]}>
            <AdminFoodAndDrink />
          </RoleBasedRoute>
        } />
        
        <Route path="reports" element={
          <RoleBasedRoute allowedRoles={["admin", "general_manager", "operational_manager", "finance_manager"]}>
            <AdminReports />
          </RoleBasedRoute>
        } />
        
        <Route path="finance">
          <Route path="billing" element={
            <RoleBasedRoute allowedRoles={["admin", "staff", "general_manager", "finance_manager"]}>
              <Billing />
            </RoleBasedRoute>
          } />
          <Route path="invoices" element={
            <RoleBasedRoute allowedRoles={["admin", "staff", "general_manager", "finance_manager"]}>
              <Invoices />
            </RoleBasedRoute>
          } />
          <Route path="invoice/:id" element={
            <RoleBasedRoute allowedRoles={["admin", "staff", "general_manager", "finance_manager"]}>
              <AdminInvoice />
            </RoleBasedRoute>
          } />
          <Route path="reports" element={
            <RoleBasedRoute allowedRoles={["admin", "general_manager", "finance_manager"]}>
              <FinancialReports />
            </RoleBasedRoute>
          } />
          <Route path="transactions" element={
            <RoleBasedRoute allowedRoles={["admin", "general_manager", "finance_manager"]}>
              <Transactions />
            </RoleBasedRoute>
          } />
        </Route>
        
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
        
        <Route path="inventory">
          <Route path="dashboard" element={
            <RoleBasedRoute allowedRoles={["admin", "general_manager", "purchasing_manager"]}>
              <InventoryDashboard />
            </RoleBasedRoute>
          } />
          <Route path="items" element={
            <RoleBasedRoute allowedRoles={["admin", "general_manager", "purchasing_manager"]}>
              <InventoryItems />
            </RoleBasedRoute>
          } />
          <Route path="suppliers" element={
            <RoleBasedRoute allowedRoles={["admin", "general_manager", "purchasing_manager"]}>
              <SuppliersList />
            </RoleBasedRoute>
          } />
        </Route>
        
        <Route path="settings" element={
          <RoleBasedRoute allowedRoles={["admin", "general_manager"]}>
            <AdminSettings />
          </RoleBasedRoute>
        } />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
