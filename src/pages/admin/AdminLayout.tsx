
import React, { ReactNode, useEffect, useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import AdminHeader from '../../components/AdminHeader';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { isUserSuperAdmin } from '@/lib/supabase';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Check admin status when component mounts
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        setIsLoading(false);
        navigate('/login');
        return;
      }
      
      try {
        const isAdmin = await isUserSuperAdmin();
        setIsAdmin(isAdmin);
        
        if (!isAdmin) {
          navigate('/');
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAdminStatus();
  }, [user, navigate]);
  
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-safeMinor-purple"></div>
      </div>
    );
  }
  
  if (!isAdmin) {
    return null; // Will redirect in the useEffect
  }
  
  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-64 hidden md:block">
        <AdminSidebar />
      </div>
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />
        
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
