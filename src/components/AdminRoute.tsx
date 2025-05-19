
import React, { useEffect, useState } from 'react';
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
  const [isVerifying, setIsVerifying] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const verifyAdminAccess = async () => {
      if (!user) {
        setIsVerifying(false);
        return;
      }
      
      try {
        // Only check admin status if we don't already know
        if (!isAdmin) {
          const adminStatus = await checkAdminStatus();
          setIsAuthorized(adminStatus);
        } else {
          setIsAuthorized(true);
        }
      } catch (error) {
        console.error('Error verifying admin status:', error);
        toast({
          title: "Error",
          description: "Could not verify admin privileges",
          variant: "destructive",
        });
        setIsAuthorized(false);
      } finally {
        setIsVerifying(false);
      }
    };

    if (!isLoading) {
      verifyAdminAccess();
    }
  }, [user, isLoading, navigate, toast, checkAdminStatus, isAdmin]);

  // While initial loading or verifying, show loading state
  if (isLoading || isVerifying) {
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

  // If authenticated but not admin, redirect to admin login
  if (!isAuthorized) {
    return <Navigate to="/admin-login" replace />;
  }

  // If admin, render the children
  return <>{children}</>;
};

export default AdminRoute;
