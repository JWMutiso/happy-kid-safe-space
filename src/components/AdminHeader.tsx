
import React from 'react';
import { Bell, User, Search } from 'lucide-react';

const AdminHeader = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="h-16 flex justify-between items-center px-6">
        <div className="flex-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="block w-full max-w-xs pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-safeMinor-purple focus:border-safeMinor-purple"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-500 hover:text-gray-700 relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 transform translate-x-1 -translate-y-1"></span>
          </button>
          
          <div className="flex items-center space-x-2">
            <div className="flex flex-col items-end">
              <span className="font-medium text-sm">Admin User</span>
              <span className="text-xs text-gray-500">Administrator</span>
            </div>
            <div className="h-8 w-8 bg-safeMinor-purple rounded-full flex items-center justify-center text-white">
              <User className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
