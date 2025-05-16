
import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { Settings as SettingsIcon, Save, Shield, Bell, Database, Key, Mail, Phone } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

const Settings = () => {
  const { toast } = useToast();
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const [generalSettings, setGeneralSettings] = useState({
    organizationName: "SafeMinor Kenya",
    contactEmail: "contact@safeminor.co.ke",
    contactPhone: "+254 700 123456",
    emergencyHotline: "+254 800 123456",
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    urgentCaseAlerts: true,
    dailyReports: true,
    weeklyReports: true
  });
  
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    passwordExpiryDays: 90,
    sessionTimeoutMinutes: 30,
    requireStrongPasswords: true,
    activityLogging: true
  });

  useEffect(() => {
    const checkUserRole = async () => {
      setIsLoading(true);
      try {
        const { data: userData } = await supabase.auth.getUser();
        if (userData.user?.user_metadata?.isSuperAdmin) {
          setIsSuperAdmin(true);
        } else {
          setIsSuperAdmin(false);
        }
        
        // Try to fetch settings from Supabase
        const { data, error } = await supabase
          .from('system_settings')
          .select('*')
          .single();
          
        if (!error && data) {
          // If we have settings data, use it
          setGeneralSettings({
            organizationName: data.organization_name || "SafeMinor Kenya",
            contactEmail: data.contact_email || "contact@safeminor.co.ke",
            contactPhone: data.contact_phone || "+254 700 123456",
            emergencyHotline: data.emergency_hotline || "+254 800 123456",
          });
          
          setNotificationSettings({
            emailNotifications: data.email_notifications ?? true,
            smsNotifications: data.sms_notifications ?? true,
            urgentCaseAlerts: data.urgent_case_alerts ?? true,
            dailyReports: data.daily_reports ?? true,
            weeklyReports: data.weekly_reports ?? true
          });
          
          setSecuritySettings({
            twoFactorAuth: data.two_factor_auth ?? true,
            passwordExpiryDays: data.password_expiry_days || 90,
            sessionTimeoutMinutes: data.session_timeout_minutes || 30,
            requireStrongPasswords: data.require_strong_passwords ?? true,
            activityLogging: data.activity_logging ?? true
          });
        }
        
        // Log activity
        if (userData.user) {
          await supabase.from('activity_logs').insert({
            user_email: userData.user.email,
            action: 'view',
            details: 'Accessed system settings',
            ip_address: 'N/A'
          });
        }
      } catch (error) {
        console.error('Error checking role or fetching settings:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkUserRole();
  }, []);

  const handleGeneralSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGeneralSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleNotificationToggle = (setting: string, value: boolean) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };
  
  const handleSecuritySettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setSecuritySettings(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) : value
    }));
  };
  
  const handleSecurityToggle = (setting: string, value: boolean) => {
    setSecuritySettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };
  
  const saveSettings = async () => {
    try {
      // In a real app, we would save to database
      const { data: userData } = await supabase.auth.getUser();
      
      // Prepare data for Supabase
      const settingsData = {
        // General
        organization_name: generalSettings.organizationName,
        contact_email: generalSettings.contactEmail,
        contact_phone: generalSettings.contactPhone,
        emergency_hotline: generalSettings.emergencyHotline,
        
        // Notifications
        email_notifications: notificationSettings.emailNotifications,
        sms_notifications: notificationSettings.smsNotifications,
        urgent_case_alerts: notificationSettings.urgentCaseAlerts,
        daily_reports: notificationSettings.dailyReports,
        weekly_reports: notificationSettings.weeklyReports,
        
        // Security
        two_factor_auth: securitySettings.twoFactorAuth,
        password_expiry_days: securitySettings.passwordExpiryDays,
        session_timeout_minutes: securitySettings.sessionTimeoutMinutes,
        require_strong_passwords: securitySettings.requireStrongPasswords,
        activity_logging: securitySettings.activityLogging,
        
        // Metadata
        last_updated_by: userData.user?.email,
        last_updated_at: new Date()
      };
      
      // Try to update existing settings or insert new ones
      const { error } = await supabase
        .from('system_settings')
        .upsert(settingsData, { onConflict: 'id' });
      
      if (error) throw error;
      
      // Log activity
      if (userData.user) {
        await supabase.from('activity_logs').insert({
          user_email: userData.user.email,
          action: 'update',
          details: 'Updated system settings',
          ip_address: 'N/A'
        });
      }
      
      toast({
        title: "Settings Saved",
        description: "Your changes have been applied successfully"
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: "Error",
        description: "There was an error saving your settings. Please try again.",
        variant: "destructive"
      });
    }
  };

  if (!isSuperAdmin && !isLoading) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center h-[80vh] text-center">
          <div className="bg-red-100 p-12 rounded-lg">
            <h1 className="text-2xl font-bold text-red-800 mb-4">Access Restricted</h1>
            <p className="text-red-600 mb-6">
              You need super admin privileges to access system settings.
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
          <SettingsIcon className="h-6 w-6 text-safeMinor-purple" />
          System Settings
        </h1>
        <p className="text-gray-600">
          Configure system behavior and preferences
        </p>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-safeMinor-purple"></div>
        </div>
      ) : (
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="w-full mb-8">
            <TabsTrigger value="general" className="flex-1">General</TabsTrigger>
            <TabsTrigger value="notifications" className="flex-1">Notifications</TabsTrigger>
            <TabsTrigger value="security" className="flex-1">Security</TabsTrigger>
            <TabsTrigger value="database" className="flex-1">Database</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Basic configuration for your SafeMinor system
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="organizationName">Organization Name</Label>
                  <Input 
                    id="organizationName" 
                    name="organizationName"
                    value={generalSettings.organizationName}
                    onChange={handleGeneralSettingsChange}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail" className="flex items-center gap-2">
                      <Mail className="h-4 w-4" /> Contact Email
                    </Label>
                    <Input 
                      id="contactEmail" 
                      name="contactEmail"
                      type="email"
                      value={generalSettings.contactEmail}
                      onChange={handleGeneralSettingsChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contactPhone" className="flex items-center gap-2">
                      <Phone className="h-4 w-4" /> Contact Phone
                    </Label>
                    <Input 
                      id="contactPhone" 
                      name="contactPhone"
                      value={generalSettings.contactPhone}
                      onChange={handleGeneralSettingsChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="emergencyHotline" className="flex items-center gap-2 text-red-600">
                    <Phone className="h-4 w-4" /> Emergency Hotline
                  </Label>
                  <Input 
                    id="emergencyHotline" 
                    name="emergencyHotline"
                    value={generalSettings.emergencyHotline}
                    onChange={handleGeneralSettingsChange}
                    className="border-red-200 focus:ring-red-500"
                  />
                  <p className="text-sm text-gray-500">
                    This number will be displayed prominently in the app for emergency reporting
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={saveSettings}>
                  <Save className="h-4 w-4 mr-2" /> Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Configure how the system notifies users and administrators
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Email Notifications</h3>
                    <p className="text-sm text-gray-500">
                      Send notifications via email
                    </p>
                  </div>
                  <Switch 
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(value) => handleNotificationToggle('emailNotifications', value)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">SMS Notifications</h3>
                    <p className="text-sm text-gray-500">
                      Send notifications via SMS text message
                    </p>
                  </div>
                  <Switch 
                    checked={notificationSettings.smsNotifications}
                    onCheckedChange={(value) => handleNotificationToggle('smsNotifications', value)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Urgent Case Alerts</h3>
                    <p className="text-sm text-gray-500">
                      Send immediate alerts for critical cases
                    </p>
                  </div>
                  <Switch 
                    checked={notificationSettings.urgentCaseAlerts}
                    onCheckedChange={(value) => handleNotificationToggle('urgentCaseAlerts', value)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Daily Reports</h3>
                    <p className="text-sm text-gray-500">
                      Send daily summary reports
                    </p>
                  </div>
                  <Switch 
                    checked={notificationSettings.dailyReports}
                    onCheckedChange={(value) => handleNotificationToggle('dailyReports', value)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Weekly Reports</h3>
                    <p className="text-sm text-gray-500">
                      Send weekly comprehensive reports
                    </p>
                  </div>
                  <Switch 
                    checked={notificationSettings.weeklyReports}
                    onCheckedChange={(value) => handleNotificationToggle('weeklyReports', value)}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={saveSettings}>
                  <Save className="h-4 w-4 mr-2" /> Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Configure security policies and access controls
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-500">
                      Require two-factor authentication for all administrative users
                    </p>
                  </div>
                  <Switch 
                    checked={securitySettings.twoFactorAuth}
                    onCheckedChange={(value) => handleSecurityToggle('twoFactorAuth', value)}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="passwordExpiryDays">Password Expiry (Days)</Label>
                    <Input 
                      id="passwordExpiryDays" 
                      name="passwordExpiryDays"
                      type="number"
                      value={securitySettings.passwordExpiryDays}
                      onChange={handleSecuritySettingsChange}
                    />
                    <p className="text-sm text-gray-500">
                      Set to 0 for no expiration
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeoutMinutes">Session Timeout (Minutes)</Label>
                    <Input 
                      id="sessionTimeoutMinutes" 
                      name="sessionTimeoutMinutes"
                      type="number"
                      value={securitySettings.sessionTimeoutMinutes}
                      onChange={handleSecuritySettingsChange}
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Require Strong Passwords</h3>
                    <p className="text-sm text-gray-500">
                      Enforce strong password requirements (minimum 8 characters, mixed case, numbers, symbols)
                    </p>
                  </div>
                  <Switch 
                    checked={securitySettings.requireStrongPasswords}
                    onCheckedChange={(value) => handleSecurityToggle('requireStrongPasswords', value)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Activity Logging</h3>
                    <p className="text-sm text-gray-500">
                      Log all user activities for audit purposes
                    </p>
                  </div>
                  <Switch 
                    checked={securitySettings.activityLogging}
                    onCheckedChange={(value) => handleSecurityToggle('activityLogging', value)}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={saveSettings}>
                  <Save className="h-4 w-4 mr-2" /> Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="database">
            <Card>
              <CardHeader>
                <CardTitle>Database Configuration</CardTitle>
                <CardDescription>
                  Database connection and maintenance settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4 border rounded-lg p-4 bg-amber-50">
                  <div className="flex items-center text-amber-800">
                    <Shield className="h-5 w-5 mr-2" />
                    <h3 className="font-medium">Database Information</h3>
                  </div>
                  <p className="text-sm text-amber-700">
                    This section shows your current Supabase database configuration.
                    Database connection settings cannot be modified from this interface.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-amber-800">Provider:</p>
                      <p className="text-sm">Supabase</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-amber-800">Status:</p>
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                        <p className="text-sm">Connected</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="backupSchedule">Automatic Backup Schedule</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select backup frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="retentionPolicy">Data Retention Policy</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select retention period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1year">1 Year</SelectItem>
                      <SelectItem value="3years">3 Years</SelectItem>
                      <SelectItem value="5years">5 Years</SelectItem>
                      <SelectItem value="indefinite">Indefinite</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-gray-500">
                    How long to keep historical data before archiving
                  </p>
                </div>
                
                <div className="pt-4 space-y-4">
                  <h3 className="font-medium">Database Maintenance</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline">
                      <Database className="h-4 w-4 mr-2" /> Backup Now
                    </Button>
                    <Button variant="outline" className="text-amber-600 border-amber-300 hover:bg-amber-50">
                      <Key className="h-4 w-4 mr-2" /> Reset API Keys
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={saveSettings}>
                  <Save className="h-4 w-4 mr-2" /> Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </AdminLayout>
  );
};

export default Settings;
