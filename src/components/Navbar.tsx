
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, ShieldAlert, Clock, HelpCircle, Phone, LogIn, LogOut, UserCheck, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { isUserSuperAdmin } from '@/lib/supabase';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        const admin = await isUserSuperAdmin();
        setIsAdmin(admin);
      }
    };
    
    checkAdminStatus();
  }, [user]);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const navItems = [
    { path: '/', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { path: '/report-case', label: 'Report Case', icon: <ShieldAlert className="w-5 h-5" /> },
    { path: '/delayed-cases', label: 'Delayed Cases', icon: <Clock className="w-5 h-5" /> },
    { path: '/resources', label: 'Resources', icon: <HelpCircle className="w-5 h-5" /> },
    { path: '/contact', label: 'Contact', icon: <Phone className="w-5 h-5" /> },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };
  
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex-shrink-0 flex items-center">
            <span className="text-safeMinor-purple text-2xl font-bold">SafeMinor Kenya</span>
          </Link>
          
          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    isActive(item.path)
                      ? 'bg-safeMinor-purple text-white'
                      : 'text-gray-700 hover:bg-safeMinor-lightPurple hover:text-gray-900'
                  } transition-colors duration-200`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </Link>
              ))}

              {/* Admin link for admin users */}
              {isAdmin && (
                <Link
                  to="/admin"
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname.startsWith('/admin')
                      ? 'bg-safeMinor-purple text-white'
                      : 'text-gray-700 hover:bg-safeMinor-lightPurple hover:text-gray-900'
                  } transition-colors duration-200`}
                >
                  <span className="mr-2"><Settings className="w-5 h-5" /></span>
                  Admin
                </Link>
              )}
            </div>
          </div>
          
          <div className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-700">
                  <span className="flex items-center">
                    <UserCheck className="w-4 h-4 mr-1" />
                    {user.email?.split('@')[0]}
                  </span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition-colors"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="flex items-center bg-safeMinor-purple text-white px-4 py-2 rounded-lg font-medium hover:bg-safeMinor-purple/90 transition-colors"
              >
                <LogIn className="w-5 h-5 mr-2" />
                Sign In
              </Link>
            )}
          </div>
          
          <div className="md:hidden flex items-center">
            {/* Mobile menu button */}
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu, show/hide based on menu state */}
      <div className="md:hidden hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                isActive(item.path)
                  ? 'bg-safeMinor-purple text-white'
                  : 'text-gray-700 hover:bg-safeMinor-lightPurple hover:text-gray-900'
              }`}
            >
              <span className="mr-2">{item.icon}</span>
              {item.label}
            </Link>
          ))}
          
          {/* Admin link for admin users in mobile menu */}
          {isAdmin && (
            <Link
              to="/admin"
              className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                location.pathname.startsWith('/admin')
                  ? 'bg-safeMinor-purple text-white'
                  : 'text-gray-700 hover:bg-safeMinor-lightPurple hover:text-gray-900'
              }`}
            >
              <span className="mr-2"><Settings className="w-5 h-5" /></span>
              Admin
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
