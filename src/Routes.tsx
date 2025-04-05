
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

// Admin routes
import Dashboard from './pages/admin/Dashboard';
import RoleBasedRoute from './components/auth/RoleBasedRoute';

// Finance
import Billing from './pages/finance/Billing';
import FinanceDashboard from './pages/finance/FinanceDashboard';
import Invoices from './pages/finance/Invoices';
import FinancialReports from './pages/finance/FinancialReports';
import Transactions from './pages/finance/Transactions';

// Front Office
import FrontOfficeDashboard from './pages/frontoffice/FrontOfficeDashboard';
import FrontDesk from './pages/frontoffice/FrontDesk';
import Reservations from './pages/frontoffice/Reservations';

// Inventory
import InventoryDashboard from './pages/inventory/InventoryDashboard';
import InventoryItems from './pages/inventory/InventoryItems';
import Suppliers from './pages/inventory/Suppliers';
import PurchasingDashboard from './pages/inventory/PurchasingDashboard';

// Manager dashboards
import GeneralManagerDashboard from './pages/general-manager/GeneralManagerDashboard';
import OperationalManagerDashboard from './pages/operation/OperationalManagerDashboard';
import ServiceManagerDashboard from './pages/services/ServiceManagerDashboard';
import MaintenanceManagerDashboard from './pages/maintenance/MaintenanceManagerDashboard';
import MarketingManagerDashboard from './pages/marketing/MarketingManagerDashboard';
import HRManagerDashboard from './pages/hr/HRManagerDashboard';

// Admin pages
import AdminHome from './pages/admin/AdminHome';
import AdminRooms from './pages/admin/AdminRooms';
import AdminRoomTypes from './pages/admin/AdminRoomTypes';
import AdminUsers from './pages/admin/AdminUsers';
import AdminGuests from './pages/admin/AdminGuests';
import AdminMessages from './pages/admin/AdminMessages';
import AdminServices from './pages/admin/AdminServices';
import AdminReports from './pages/admin/AdminReports';
import AdminSettings from './pages/admin/AdminSettings';
import AdminFoodAndDrink from './pages/admin/AdminFoodAndDrink';
import SuspendedUserDashboard from './pages/admin/SuspendedUserDashboard';

// Services
import ServicesList from './pages/services/ServicesList';
import ServicesDashboard from './pages/services/ServicesDashboard';

const Routes = () => {
  return (
    <RouterRoutes>
      {/* Public routes */}
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
        path="/admin" 
        element={
          <RoleBasedRoute allowedRoles={['admin', 'staff']}>
            <Dashboard />
          </RoleBasedRoute>
        } 
      >
        {/* Admin home page */}
        <Route index element={<AdminHome />} />
        
        {/* Rooms management */}
        <Route path="rooms" element={<AdminRooms />} />
        <Route path="room-types" element={<AdminRoomTypes />} />
        
        {/* User management */}
        <Route path="users" element={<AdminUsers />} />
        <Route path="guests" element={<AdminGuests />} />
        <Route path="messages" element={<AdminMessages />} />
        
        {/* Services */}
        <Route path="services">
          <Route index element={<AdminServices />} />
          <Route path="dashboard" element={<ServicesDashboard />} />
          <Route path="list" element={<ServicesList />} />
          <Route path="manager" element={<ServiceManagerDashboard />} />
        </Route>
        
        <Route path="food-and-drink" element={<AdminFoodAndDrink />} />
        <Route path="reports" element={<AdminReports />} />
        <Route path="settings" element={<AdminSettings />} />
        
        {/* Department routes */}
        <Route path="finance">
          <Route path="dashboard" element={<FinanceDashboard />} />
          <Route path="billing" element={<Billing />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="reports" element={<FinancialReports />} />
          <Route path="transactions" element={<Transactions />} />
        </Route>
        
        <Route path="frontoffice">
          <Route path="dashboard" element={<FrontOfficeDashboard />} />
          <Route path="front-desk" element={<FrontDesk />} />
          <Route path="reservations" element={<Reservations />} />
        </Route>
        
        <Route path="inventory">
          <Route path="dashboard" element={<InventoryDashboard />} />
          <Route path="items" element={<InventoryItems />} />
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="purchasing-dashboard" element={<PurchasingDashboard />} />
        </Route>
        
        {/* Manager dashboards */}
        <Route path="general-manager">
          <Route path="dashboard" element={<GeneralManagerDashboard />} />
        </Route>
        
        <Route path="operation">
          <Route path="dashboard" element={<OperationalManagerDashboard />} />
        </Route>
        
        <Route path="maintenance">
          <Route path="dashboard" element={<MaintenanceManagerDashboard />} />
        </Route>
        
        <Route path="marketing">
          <Route path="dashboard" element={<MarketingManagerDashboard />} />
        </Route>
        
        <Route path="hr">
          <Route path="dashboard" element={<HRManagerDashboard />} />
        </Route>
        
        {/* Suspended users */}
        <Route path="suspended" element={<SuspendedUserDashboard />} />
      </Route>
      
      {/* 404 page */}
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </RouterRoutes>
  );
};

export default Routes;
