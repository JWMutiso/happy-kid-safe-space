
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/Home";
import ReportCase from "./pages/ReportCase";
import DelayedCases from "./pages/DelayedCases";
import Resources from "./pages/Resources";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Auth from "./pages/Auth";
import Dashboard from "./pages/admin/Dashboard";
import CaseManagement from "./pages/admin/CaseManagement";
import UrgentCases from "./pages/admin/UrgentCases";
import UserManagement from "./pages/admin/UserManagement";
import ActivityLogs from "./pages/admin/ActivityLogs";
import Settings from "./pages/admin/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/report-case" element={<ReportCase />} />
            <Route path="/delayed-cases" element={<DelayedCases />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/auth" element={<Auth />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/cases" element={<CaseManagement />} />
            <Route path="/admin/urgent" element={<UrgentCases />} />
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/admin/activity-logs" element={<ActivityLogs />} />
            <Route path="/admin/settings" element={<Settings />} />
            
            {/* Catch All Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
