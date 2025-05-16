
import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { Activity, Search, Download, Calendar, Filter } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase, isUserSuperAdmin } from '@/lib/supabase';

// Sample activity logs
const sampleLogs = [
  {
    id: 1,
    user_email: "minor-kenya@gmail.com",
    action: "login",
    details: "Super admin login",
    ip_address: "192.168.1.1",
    created_at: "2025-05-16T09:30:00.000Z"
  },
  {
    id: 2,
    user_email: "minor-kenya@gmail.com",
    action: "view",
    details: "Viewed urgent cases",
    ip_address: "192.168.1.1",
    created_at: "2025-05-16T09:32:15.000Z"
  },
  {
    id: 3,
    user_email: "minor-kenya@gmail.com",
    action: "respond",
    details: "Responded to case CASE-017",
    ip_address: "192.168.1.1",
    created_at: "2025-05-16T09:45:22.000Z"
  },
  {
    id: 4,
    user_email: "john.kimani@example.com",
    action: "login",
    details: "Case Manager login",
    ip_address: "192.168.1.2",
    created_at: "2025-05-16T10:15:03.000Z"
  },
  {
    id: 5,
    user_email: "john.kimani@example.com",
    action: "create",
    details: "Created new case CASE-018",
    ip_address: "192.168.1.2",
    created_at: "2025-05-16T10:25:47.000Z"
  }
];

const ActivityLogs = () => {
  const [logs, setLogs] = useState<any[]>(sampleLogs);
  const [searchQuery, setSearchQuery] = useState("");
  const [actionFilter, setActionFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  useEffect(() => {
    const fetchLogs = async () => {
      setIsLoading(true);
      try {
        // Check if user is super admin using our helper function
        const superAdmin = await isUserSuperAdmin();
        setIsSuperAdmin(superAdmin);
        
        // Try to fetch logs from Supabase
        const { data, error } = await supabase
          .from('activity_logs')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        
        // If we have data, use it; otherwise use sample data
        if (data && data.length > 0) {
          setLogs(data);
        }
        
        // Log this activity
        const { data: userData } = await supabase.auth.getUser();
        if (userData.user) {
          await supabase.from('activity_logs').insert({
            user_email: userData.user.email,
            action: 'view',
            details: 'Viewed activity logs',
            ip_address: 'N/A'
          });
        }
      } catch (error) {
        console.error('Error fetching logs:', error);
        // Fallback to sample data if there's an error
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchLogs();
  }, []);

  // Filter logs based on search and action filter
  const filteredLogs = logs.filter(log => {
    const matchesSearch = searchQuery === "" || 
      (log.user_email && log.user_email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (log.details && log.details.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (log.ip_address && log.ip_address.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesAction = actionFilter === "" || 
      (log.action && log.action.toLowerCase() === actionFilter.toLowerCase());
    
    return matchesSearch && matchesAction;
  });

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  // Generate CSV of logs for download
  const downloadLogs = () => {
    // Create CSV content
    const headers = ["ID", "User", "Action", "Details", "IP Address", "Date/Time"];
    const csvContent = [
      headers.join(","),
      ...filteredLogs.map(log => [
        log.id,
        log.user_email,
        log.action,
        `"${log.details}"`, // Quote details to handle commas
        log.ip_address,
        formatDate(log.created_at)
      ].join(","))
    ].join("\n");
    
    // Create download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `activity_logs_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // Get badge color based on action
  const getActionBadgeColor = (action: string) => {
    switch (action.toLowerCase()) {
      case 'login':
        return "bg-green-500 hover:bg-green-600";
      case 'logout':
        return "bg-blue-500 hover:bg-blue-600";
      case 'create':
        return "bg-purple-500 hover:bg-purple-600";
      case 'update':
        return "bg-orange-500 hover:bg-orange-600";
      case 'delete':
        return "bg-red-500 hover:bg-red-600";
      case 'view':
        return "bg-cyan-500 hover:bg-cyan-600";
      case 'respond':
        return "bg-safeMinor-purple hover:bg-safeMinor-purple/90";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  if (!isSuperAdmin && !isLoading) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center h-[80vh] text-center">
          <div className="bg-red-100 p-12 rounded-lg">
            <h1 className="text-2xl font-bold text-red-800 mb-4">Access Restricted</h1>
            <p className="text-red-600 mb-6">
              You need super admin privileges to view the activity logs.
            </p>
            <Button
              variant="outline"
              onClick={() => window.history.back()}
            >
              Go Back
            </Button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Activity className="h-6 w-6 text-safeMinor-purple" />
          Activity Logs
        </h1>
        <p className="text-gray-600">
          System-wide activity monitoring for security and audit purposes
        </p>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-lg font-medium">System Activity</CardTitle>
              <CardDescription>Track user actions and system events</CardDescription>
            </div>
            <Button onClick={downloadLogs}>
              <Download className="h-4 w-4 mr-2" /> Export Logs
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search logs..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={actionFilter} onValueChange={setActionFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Actions</SelectItem>
                <SelectItem value="login">Login</SelectItem>
                <SelectItem value="logout">Logout</SelectItem>
                <SelectItem value="create">Create</SelectItem>
                <SelectItem value="update">Update</SelectItem>
                <SelectItem value="delete">Delete</SelectItem>
                <SelectItem value="view">View</SelectItem>
                <SelectItem value="respond">Respond</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => {
              setSearchQuery("");
              setActionFilter("");
            }}>
              Reset
            </Button>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-safeMinor-purple"></div>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date/Time</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead className="w-full">Details</TableHead>
                    <TableHead>IP Address</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.length > 0 ? (
                    filteredLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="whitespace-nowrap">
                          {formatDate(log.created_at)}
                        </TableCell>
                        <TableCell>{log.user_email}</TableCell>
                        <TableCell>
                          <Badge className={getActionBadgeColor(log.action)}>
                            {log.action}
                          </Badge>
                        </TableCell>
                        <TableCell>{log.details}</TableCell>
                        <TableCell>{log.ip_address}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                        No logs found matching your filters
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default ActivityLogs;
