
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { isUserSuperAdmin } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const { user, isLoading: authLoading } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [checkingAdmin, setCheckingAdmin] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        setCheckingAdmin(false);
        return;
      }

      try {
        // Check if user is an admin
        const adminStatus = await isUserSuperAdmin();
        setIsAdmin(adminStatus);
        
        // Only navigate away if NOT admin to avoid potential loop
        if (!adminStatus) {
          toast({
            title: "Unauthorized",
            description: "You don't have permission to access the admin area",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
        toast({
          title: "Error",
          description: "Could not verify admin privileges",
          variant: "destructive",
        });
      } finally {
        setCheckingAdmin(false);
      }
    };

    if (!authLoading) {
      checkAdminStatus();
    }
  }, [user, authLoading, toast]);

  if (authLoading || checkingAdmin) {
    // Show loading state
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-safeMinor-purple"></div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // If authenticated but not admin, redirect to home
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  // If admin, render the children
  return <>{children}</>;
};

export default AdminRoute;
