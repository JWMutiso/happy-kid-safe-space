
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

// Case management helper functions
export const updateCaseStatus = async (caseId: string, status: string) => {
  try {
    const { error } = await supabase
      .from('cases')
      .update({ status })
      .eq('id', caseId);

    if (error) throw error;
    
    // Log the activity
    await logAdminActivity(
      'update_case_status',
      `Updated case ${caseId} status to ${status}`
    );
    
    return { success: true };
  } catch (error) {
    console.error('Error updating case status:', error);
    return { success: false, error };
  }
};

// Get all delayed cases
export const getDelayedCases = async () => {
  try {
    const { data, error } = await supabase
      .from('cases')
      .select('*')
      .eq('is_delayed', true)
      .order('days_elapsed', { ascending: false });
      
    if (error) throw error;
    
    return { data };
  } catch (error) {
    console.error('Error fetching delayed cases:', error);
    return { data: null, error };
  }
};

// Manually update days elapsed and check if case is delayed
export const updateCaseDaysElapsed = async (caseId: string) => {
  try {
    // Instead of trying to update 'updated_at', use 'created_at' which exists in the type
    // This will trigger the database function we created to recalculate days_elapsed
    const now = new Date().toISOString();
    const { error } = await supabase
      .from('cases')
      .update({ 
        // We'll update any field that exists in the cases table to trigger our database trigger
        // Since the trigger runs on any update, this will recalculate days_elapsed
        created_at: now 
      })
      .eq('id', caseId);
      
    if (error) throw error;
    
    // Log the activity
    await logAdminActivity(
      'update_case_days',
      `Manually triggered days_elapsed update for case ${caseId}`
    );
    
    return { success: true };
  } catch (error) {
    console.error('Error updating case days elapsed:', error);
    return { success: false, error };
  }
};
