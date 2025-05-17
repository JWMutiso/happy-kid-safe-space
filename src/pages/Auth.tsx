
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Layout from '../components/Layout';
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User } from '@supabase/supabase-js';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user);
        navigate('/');
      } else {
        setUser(null);
      }
    });
    
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        navigate('/');
      }
    });
  }, [navigate]);
  
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) throw error;
      
      toast({
        title: "Signup successful!",
        description: "Please check your email for the confirmation link to complete your registration.",
      });
    } catch (error: any) {
      toast({
        title: "Error signing up",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      toast({
        title: "Successfully signed in!",
        description: "You are now logged in.",
      });
      
      navigate('/');
    } catch (error: any) {
      toast({
        title: "Error signing in",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Layout>
      <div className="max-w-md mx-auto mt-10 mb-20 p-6 bg-white rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6 text-safeMinor-purple">SafeMinor Kenya</h1>
        
        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="signin">
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label htmlFor="signin-email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  id="signin-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="safeminor-input mt-1"
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="signin-password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  id="signin-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="safeminor-input mt-1"
                  placeholder="Enter your password"
                  required
                />
              </div>
              
              <button 
                type="submit" 
                className="safeminor-btn-primary w-full"
                disabled={loading}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>
          </TabsContent>
          
          <TabsContent value="signup">
            <form onSubmit={handleSignUp} className="space-y-4">
              <div>
                <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  id="signup-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="safeminor-input mt-1"
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  id="signup-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="safeminor-input mt-1"
                  placeholder="Create a password"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="safeminor-input mt-1"
                  placeholder="Confirm your password"
                  required
                />
              </div>
              
              <button 
                type="submit" 
                className="safeminor-btn-primary w-full"
                disabled={loading}
              >
                {loading ? 'Signing Up...' : 'Sign Up'}
              </button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Auth;
