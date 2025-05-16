
import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Check, ChevronDown, Info, Save, User } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with fallback values for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(
  supabaseUrl || 'https://your-project.supabase.co',
  supabaseKey || 'your-anon-key'
);

const Settings = () => {
  const [generalSettings, setGeneralSettings] = useState({
    notificationsEnabled: true,
    emailAlerts: true,
    smsAlerts: false,
    darkMode: false,
    language: 'english',
    timezone: 'africa-nairobi'
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    loginNotifications: true,
    passwordExpiry: 90,
    sessionTimeout: 30
  });
  
  const [savedSuccess, setSavedSuccess] = useState(false);
  
  const handleGeneralSettingsChange = (setting: string, value: any) => {
    setGeneralSettings({
      ...generalSettings,
      [setting]: value
    });
    setSavedSuccess(false);
  };
  
  const handleSecuritySettingsChange = (setting: string, value: any) => {
    setSecuritySettings({
      ...securitySettings,
      [setting]: value
    });
    setSavedSuccess(false);
  };
  
  const handleSaveSettings = async () => {
    try {
      // In a real app, these settings would be saved to the database
      // Here we'll simulate saving to Supabase
      await supabase.from('settings').upsert({
        user_id: 'super-admin', // You would use the actual user ID here
        general_settings: generalSettings,
        security_settings: securitySettings,
        updated_at: new Date().toISOString()
      });
      
      // Log the activity
      await supabase.from('activity_logs').insert({
        user_email: 'super-admin@example.com',
        action: 'settings_update',
        details: 'Updated system settings',
        ip_address: 'N/A'
      });
      
      setSavedSuccess(true);
      
      // Reset the saved success message after 3 seconds
      setTimeout(() => {
        setSavedSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">System Settings</h1>
        <p className="text-gray-600">Configure the GBV case management system settings</p>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <Tabs defaultValue="general" className="w-full">
          <div className="border-b">
            <div className="px-4">
              <TabsList className="flex h-14 items-center gap-6 w-full justify-start rounded-none bg-transparent p-0">
                <TabsTrigger 
                  value="general"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-safeMinor-purple rounded-none bg-transparent px-4 py-2 text-gray-500 data-[state=active]:text-safeMinor-purple"
                >
                  General
                </TabsTrigger>
                <TabsTrigger 
                  value="security"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-safeMinor-purple rounded-none bg-transparent px-4 py-2 text-gray-500 data-[state=active]:text-safeMinor-purple"
                >
                  Security & Privacy
                </TabsTrigger>
                <TabsTrigger 
                  value="notifications"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-safeMinor-purple rounded-none bg-transparent px-4 py-2 text-gray-500 data-[state=active]:text-safeMinor-purple"
                >
                  Notifications
                </TabsTrigger>
                <TabsTrigger 
                  value="advanced"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-safeMinor-purple rounded-none bg-transparent px-4 py-2 text-gray-500 data-[state=active]:text-safeMinor-purple"
                >
                  Advanced
                </TabsTrigger>
              </TabsList>
            </div>
          </div>
          
          <div className="p-6">
            <TabsContent value="general" className="mt-0">
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-medium text-gray-900">General Settings</h2>
                  <p className="text-sm text-gray-500">Configure basic system preferences and regional settings.</p>
                </div>
                
                <Separator />
                
                <div className="grid gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="notifications">Enable Notifications</Label>
                        <Switch 
                          id="notifications" 
                          checked={generalSettings.notificationsEnabled}
                          onCheckedChange={(checked) => handleGeneralSettingsChange('notificationsEnabled', checked)}
                        />
                      </div>
                      <p className="text-sm text-gray-500">
                        Receive system notifications and alerts
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="darkMode">Dark Mode</Label>
                        <Switch 
                          id="darkMode" 
                          checked={generalSettings.darkMode}
                          onCheckedChange={(checked) => handleGeneralSettingsChange('darkMode', checked)}
                        />
                      </div>
                      <p className="text-sm text-gray-500">
                        Use dark theme across the application
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Select 
                        value={generalSettings.language} 
                        onValueChange={(value) => handleGeneralSettingsChange('language', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="swahili">Swahili</SelectItem>
                          <SelectItem value="french">French</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-sm text-gray-500">
                        Set your preferred language for the interface
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select 
                        value={generalSettings.timezone} 
                        onValueChange={(value) => handleGeneralSettingsChange('timezone', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="africa-nairobi">Africa/Nairobi (GMT+3)</SelectItem>
                          <SelectItem value="africa-lagos">Africa/Lagos (GMT+1)</SelectItem>
                          <SelectItem value="africa-cairo">Africa/Cairo (GMT+2)</SelectItem>
                          <SelectItem value="utc">UTC (GMT+0)</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-sm text-gray-500">
                        Set your local timezone
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="security" className="mt-0">
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-medium text-gray-900">Security & Privacy</h2>
                  <p className="text-sm text-gray-500">Manage security settings and data privacy preferences.</p>
                </div>
                
                <Separator />
                
                <div className="grid gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
                        <Switch 
                          id="twoFactorAuth" 
                          checked={securitySettings.twoFactorAuth}
                          onCheckedChange={(checked) => handleSecuritySettingsChange('twoFactorAuth', checked)}
                        />
                      </div>
                      <p className="text-sm text-gray-500">
                        Require a security code in addition to your password
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="loginNotifications">Login Notifications</Label>
                        <Switch 
                          id="loginNotifications" 
                          checked={securitySettings.loginNotifications}
                          onCheckedChange={(checked) => handleSecuritySettingsChange('loginNotifications', checked)}
                        />
                      </div>
                      <p className="text-sm text-gray-500">
                        Get notified when someone logs into your account
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
                      <Input 
                        id="passwordExpiry" 
                        type="number" 
                        value={securitySettings.passwordExpiry}
                        onChange={(e) => handleSecuritySettingsChange('passwordExpiry', parseInt(e.target.value))}
                      />
                      <p className="text-sm text-gray-500">
                        Number of days before passwords expire (0 for never)
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                      <Input 
                        id="sessionTimeout" 
                        type="number" 
                        value={securitySettings.sessionTimeout}
                        onChange={(e) => handleSecuritySettingsChange('sessionTimeout', parseInt(e.target.value))}
                      />
                      <p className="text-sm text-gray-500">
                        Automatically log out after period of inactivity
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="notifications" className="mt-0">
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-medium text-gray-900">Notification Preferences</h2>
                  <p className="text-sm text-gray-500">Choose how and when you receive notifications.</p>
                </div>
                
                <Separator />
                
                <div className="grid gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="emailAlerts">Email Notifications</Label>
                        <Switch 
                          id="emailAlerts" 
                          checked={generalSettings.emailAlerts}
                          onCheckedChange={(checked) => handleGeneralSettingsChange('emailAlerts', checked)}
                        />
                      </div>
                      <p className="text-sm text-gray-500">
                        Receive important alerts via email
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="smsAlerts">SMS Notifications</Label>
                        <Switch 
                          id="smsAlerts" 
                          checked={generalSettings.smsAlerts}
                          onCheckedChange={(checked) => handleGeneralSettingsChange('smsAlerts', checked)}
                        />
                      </div>
                      <p className="text-sm text-gray-500">
                        Receive urgent alerts via SMS
                      </p>
                    </div>
                  </div>
                  
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle>Notification Types</CardTitle>
                      <CardDescription>Select which events trigger notifications</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Check className="h-4 w-4 text-gray-500" />
                            <span className="text-sm font-medium">New Case Reported</span>
                          </div>
                          <Switch id="new-case" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Check className="h-4 w-4 text-gray-500" />
                            <span className="text-sm font-medium">Urgent Case Alerts</span>
                          </div>
                          <Switch id="urgent-case" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Check className="h-4 w-4 text-gray-500" />
                            <span className="text-sm font-medium">Case Status Updates</span>
                          </div>
                          <Switch id="case-status" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Check className="h-4 w-4 text-gray-500" />
                            <span className="text-sm font-medium">System Announcements</span>
                          </div>
                          <Switch id="announcements" defaultChecked />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="advanced" className="mt-0">
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-medium text-gray-900">Advanced Settings</h2>
                  <p className="text-sm text-gray-500">Configure technical and system-level settings.</p>
                </div>
                
                <Separator />
                
                <div className="grid gap-6">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle>Data Management</CardTitle>
                      <CardDescription>Configure how data is managed and stored</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="dataRetention">Data Retention Period (days)</Label>
                          <Input id="dataRetention" type="number" defaultValue="365" />
                          <p className="text-sm text-gray-500">
                            How long to keep inactive data (0 for indefinitely)
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="backupFrequency">Database Backup Frequency</Label>
                          <Select defaultValue="daily">
                            <SelectTrigger>
                              <SelectValue placeholder="Select frequency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="hourly">Hourly</SelectItem>
                              <SelectItem value="daily">Daily</SelectItem>
                              <SelectItem value="weekly">Weekly</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1">
                        <Button variant="outline" className="flex items-center">
                          <Info className="mr-2 h-4 w-4" /> 
                          Export System Data
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle>API Settings</CardTitle>
                      <CardDescription>Configure API access and keys</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="apiEnabled">API Access</Label>
                          <Select defaultValue="restricted">
                            <SelectTrigger>
                              <SelectValue placeholder="Select access level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="disabled">Disabled</SelectItem>
                              <SelectItem value="restricted">Restricted</SelectItem>
                              <SelectItem value="full">Full Access</SelectItem>
                              <SelectItem value="custom">Custom Access</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="apiKey">API Key</Label>
                          <div className="flex">
                            <Input id="apiKey" type="password" value="sk_1234567890abcdef" readOnly className="rounded-r-none" />
                            <Button variant="outline" className="rounded-l-none">Regenerate</Button>
                          </div>
                          <p className="text-sm text-gray-500">
                            Use for API integrations (keep this secure)
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-orange-200 bg-orange-50">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-orange-700">Danger Zone</CardTitle>
                      <CardDescription className="text-orange-600">
                        These actions can't be undone. Please proceed with caution.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 gap-4">
                        <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                          Reset System Settings
                        </Button>
                        <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                          Clear All Cache
                        </Button>
                        <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                          Purge Inactive User Accounts
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
      
      <div className="mt-6 flex items-center justify-between">
        <div>
          {savedSuccess && (
            <div className="flex items-center text-green-600">
              <Check className="mr-2 h-4 w-4" /> 
              Settings saved successfully!
            </div>
          )}
        </div>
        <Button 
          className="bg-safeMinor-purple hover:bg-safeMinor-purple/90"
          onClick={handleSaveSettings}
        >
          <Save className="mr-2 h-4 w-4" />
          Save Settings
        </Button>
      </div>
    </AdminLayout>
  );
};

export default Settings;
