
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  AlertCircle,
  Users,
  Settings,
  LogOut
} from 'lucide-react';

const AdminSidebar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { path: '/admin/cases', label: 'Case Management', icon: <FileText size={18} /> },
    { path: '/admin/urgent', label: 'Urgent Cases', icon: <AlertCircle size={18} /> },
    { path: '/admin/users', label: 'User Management', icon: <Users size={18} /> },
    { path: '/admin/settings', label: 'Settings', icon: <Settings size={18} /> },
  ];

  return (
    <div className="h-screen flex flex-col bg-white shadow-lg border-r">
      <div className="p-4 border-b">
        <Link to="/admin" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-safeMinor-purple flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="text-lg font-bold text-gray-900">SafeMinor</p>
            <p className="text-xs text-gray-500">Admin Panel</p>
          </div>
        </Link>
      </div>
      
      <nav className="flex-grow p-4 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-lg ${
                  isActive(item.path)
                    ? 'bg-safeMinor-purple text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                } transition-colors duration-200`}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t">
        <Link
          to="/"
          className="flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <LogOut size={18} className="mr-3" />
          <span>Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;
