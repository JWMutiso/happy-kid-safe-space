
import { createClient } from '@supabase/supabase-js';

// Get environment variables with fallbacks for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

// Log availability for debugging
console.log('Supabase URL in lib:', supabaseUrl ? 'Found' : 'Missing');
console.log('Supabase Key in lib:', supabaseKey ? 'Found' : 'Missing');

// Create a single Supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseKey);

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
  const user = await getCurrentUser();
  return user?.user_metadata?.isSuperAdmin === true;
};
