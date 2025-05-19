
import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from "@/components/ui/use-toast";

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const { user, isLoading, isAdmin, checkAdminStatus } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAdminAccess = async () => {
      if (!user) return;
      
      try {
        const adminStatus = await checkAdminStatus();
        
        if (!adminStatus) {
          toast({
            title: "Unauthorized",
            description: "You don't have permission to access the admin area",
            variant: "destructive",
          });
          navigate('/admin-login');
        }
      } catch (error) {
        console.error('Error verifying admin status:', error);
        toast({
          title: "Error",
          description: "Could not verify admin privileges",
          variant: "destructive",
        });
        navigate('/admin-login');
      }
    };

    if (!isLoading && user) {
      verifyAdminAccess();
    }
  }, [user, isLoading, navigate, toast, checkAdminStatus]);

  if (isLoading) {
    // Show loading state
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-safeMinor-purple"></div>
      </div>
    );
  }

  // If not authenticated, redirect to admin login
  if (!user) {
    return <Navigate to="/admin-login" replace />;
  }

  // If not admin, will be redirected in the useEffect
  if (!isAdmin) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-safeMinor-purple"></div>
      </div>
    );
  }

  // If admin, render the children
  return <>{children}</>;
};

export default AdminRoute;
