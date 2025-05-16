
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock user credentials for demo
const userCredentials = {
  reporter: { email: 'reporter@example.com', password: 'password123' },
  medical: { email: 'medical@example.com', password: 'password123' },
  police: { email: 'police@example.com', password: 'password123' },
  admin: { email: 'admin@example.com', password: 'password123' }
};

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [userType, setUserType] = useState('reporter');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.email || !formData.password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    // Check credentials based on user type
    const credentials = userCredentials[userType as keyof typeof userCredentials];
    
    if (formData.email === credentials.email && formData.password === credentials.password) {
      toast({
        title: "Login successful",
        description: `Welcome back, ${userType}!`,
        variant: "default",
      });
      
      // Redirect based on user type
      if (userType === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-20 w-20 rounded-full bg-safeMinor-purple flex items-center justify-center">
            <ShieldCheck className="h-10 w-10 text-white" />
          </div>
          <h1 className="mt-6 text-3xl font-bold text-gray-900">Login to SafeMinor Kenya</h1>
          <p className="mt-2 text-sm text-gray-600">Access the system based on your role</p>
        </div>
        
        <div className="mt-8 bg-white rounded-xl shadow-lg p-8">
          <Tabs defaultValue="reporter" onValueChange={setUserType} className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6">
              <TabsTrigger value="reporter" className="data-[state=active]:bg-safeMinor-purple data-[state=active]:text-white">
                Reporter
              </TabsTrigger>
              <TabsTrigger value="medical" className="data-[state=active]:bg-safeMinor-purple data-[state=active]:text-white">
                Medical Officer
              </TabsTrigger>
              <TabsTrigger value="police" className="data-[state=active]:bg-safeMinor-purple data-[state=active]:text-white">
                Police Officer
              </TabsTrigger>
              <TabsTrigger value="admin" className="data-[state=active]:bg-safeMinor-purple data-[state=active]:text-white">
                Administrator
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="reporter">
              <p className="mb-4 text-gray-600 text-sm">
                Regular users who report cases - Enter your credentials to login.
              </p>
            </TabsContent>
            <TabsContent value="medical">
              <p className="mb-4 text-gray-600 text-sm">
                Medical professionals handling GBV cases - Enter your credentials to login.
              </p>
            </TabsContent>
            <TabsContent value="police">
              <p className="mb-4 text-gray-600 text-sm">
                Law enforcement officers responding to cases - Enter your credentials to login.
              </p>
            </TabsContent>
            <TabsContent value="admin">
              <p className="mb-4 text-gray-600 text-sm">
                System administrators with full access - Enter your credentials to login.
              </p>
            </TabsContent>
          </Tabs>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email or ID Number
              </label>
              <input
                id="email"
                name="email"
                type="text"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="safeminor-input mt-1"
                placeholder="Enter your email or ID"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative mt-1">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="safeminor-input pr-10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                      <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-safeMinor-purple focus:ring-safeMinor-purple border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              
              <div className="text-sm">
                <a href="#" className="font-medium text-safeMinor-purple hover:text-safeMinor-purple/80">
                  Forgot password?
                </a>
              </div>
            </div>
            
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-safeMinor-purple hover:bg-safeMinor-purple/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-safeMinor-purple"
              >
                Login
              </button>
            </div>
          </form>
          
          <div className="mt-6">
            <p className="text-center text-sm text-gray-600">
              By logging in, you agree to our{' '}
              <a href="#" className="font-medium text-safeMinor-purple hover:text-safeMinor-purple/80">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="font-medium text-safeMinor-purple hover:text-safeMinor-purple/80">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
