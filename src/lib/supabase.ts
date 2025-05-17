
// This file is deprecated - use the client from @/integrations/supabase/client instead
import { supabase } from '@/integrations/supabase/client';

// Reexport the supabase client
export { supabase };

// Helper function to get the current user
export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error('Error getting user:', error);
    return null;
  }
  return data.user;
};

// Helper for checking if the current user is a super admin
export const isUserSuperAdmin = async () => {
  const { data } = await supabase.auth.getUser();
  const user = data.user;
  
  if (!user) return false;
  
  // Check if the user is the default admin or has the admin role in metadata
  return user.email === 'safeminor@gmail.com' || user.user_metadata?.role === 'admin';
};

// Log admin activity
export const logAdminActivity = async (action: string, details: string) => {
  try {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) return;
    
    await supabase.from('activity_logs').insert({
      user_id: userData.user.id,
      user_email: userData.user.email || 'unknown',
      action,
      details,
      ip_address: 'N/A' // In a production app, you could capture the real IP
    });
  } catch (error) {
    console.error('Error logging activity:', error);
  }
};
