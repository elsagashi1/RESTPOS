import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { DataProvider } from "@/contexts/DataContext";

// Pages
import Login from "./pages/Login";
import AdminLayout from "./components/AdminLayout";
import WaiterLayout from "./components/WaiterLayout";
import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Products";
import Groups from "./pages/admin/Groups";
import Tables from "./pages/admin/Tables";
import Users from "./pages/admin/Users";
import Orders from "./pages/admin/Orders";
import TableSelect from "./pages/pos/TableSelect";
import OrderScreen from "./pages/pos/OrderScreen";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute: React.FC<{
  children: React.ReactNode;
  allowedRoles?: ('admin' | 'waiter')[];
}> = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on role
    if (user.role === 'admin') {
      return <Navigate to="/admin" replace />;
    } else {
      return <Navigate to="/pos" replace />;
    }
  }

  return <>{children}</>;
};

// Auth redirect component
const AuthRedirect: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated && user) {
    if (user.role === 'admin') {
      return <Navigate to="/admin" replace />;
    } else {
      return <Navigate to="/pos" replace />;
    }
  }

  return <Login />;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/" element={<AuthRedirect />} />

      {/* Admin routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="groups" element={<Groups />} />
        <Route path="tables" element={<Tables />} />
        <Route path="users" element={<Users />} />
        <Route path="orders" element={<Orders />} />
      </Route>

      {/* Waiter/POS routes */}
      <Route
        path="/pos"
        element={
          <ProtectedRoute allowedRoles={['waiter']}>
            <WaiterLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<TableSelect />} />
        <Route path="order" element={<OrderScreen />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <DataProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </DataProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
