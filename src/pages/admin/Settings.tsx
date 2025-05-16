
import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import { Settings as SettingsIcon, Save, Database, ShieldAlert, Bell, LogOut, Server, Loader2 } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Settings = () => {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [showActivityLogs, setShowActivityLogs] = useState(false);
  const [showDatabaseSettings, setShowDatabaseSettings] = useState(false);
  
  // General settings state
  const [generalSettings, setGeneralSettings] = useState({
    systemName: "SafeMinor Kenya",
    contactEmail: "info@safeminorkenya.org",
    contactPhone: "+254 712 345 678",
    emergencyContact: "999",
    language: "english"
  });
  
  // Notification settings state
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    urgentCaseAlerts: true,
    systemUpdates: false,
    dailyReports: true,
  });
  
  // Security settings state
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    strongPasswords: true,
    sessionTimeout: "30",
    ipRestriction: false,
    auditLogs: true
  });
  
  // Activity logs data (mock data)
  const activityLogs = [
    { id: 1, user: "Admin User", action: "User Login", timestamp: "May 16, 2025 - 10:30:15", ipAddress: "196.200.125.30" },
    { id: 2, user: "Admin User", action: "Updated Case #CASE-021", timestamp: "May 16, 2025 - 09:45:22", ipAddress: "196.200.125.30" },
    { id: 3, user: "John Kimani", action: "Created New Case #CASE-023", timestamp: "May 15, 2025 - 16:12:05", ipAddress: "196.200.125.42" },
    { id: 4, user: "System", action: "Backup Completed", timestamp: "May 15, 2025 - 02:00:00", ipAddress: "196.200.125.10" },
    { id: 5, user: "Mary Mwangi", action: "User Login", timestamp: "May 14, 2025 - 08:30:45", ipAddress: "196.200.125.51" },
    { id: 6, user: "Admin User", action: "Added User Mary Mwangi", timestamp: "May 13, 2025 - 11:20:33", ipAddress: "196.200.125.30" },
    { id: 7, user: "System", action: "System Update", timestamp: "May 12, 2025 - 03:15:00", ipAddress: "196.200.125.10" },
  ];
  
  const handleSaveSettings = (settingType: string) => {
    setSaving(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Settings Saved",
        description: `${settingType} settings have been updated successfully.`
      });
    }, 1000);
  };
  
  const handleResetSettings = (settingType: string) => {
    if (settingType === 'general') {
      setGeneralSettings({
        systemName: "SafeMinor Kenya",
        contactEmail: "info@safeminorkenya.org",
        contactPhone: "+254 712 345 678",
        emergencyContact: "999",
        language: "english"
      });
    } else if (settingType === 'notification') {
      setNotificationSettings({
        emailNotifications: true,
        smsNotifications: true,
        urgentCaseAlerts: true,
        systemUpdates: false,
        dailyReports: true,
      });
    } else if (settingType === 'security') {
      setSecuritySettings({
        twoFactorAuth: false,
        strongPasswords: true,
        sessionTimeout: "30",
        ipRestriction: false,
        auditLogs: true
      });
    }
    
    toast({
      title: "Settings Reset",
      description: `${settingType.charAt(0).toUpperCase() + settingType.slice(1)} settings have been reset to defaults.`
    });
  };
  
  // Check if current user is super admin (in a real app, this would come from auth)
  const isSuperAdmin = true;
  
  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <SettingsIcon className="h-6 w-6 text-safeMinor-purple" />
          System Settings
        </h1>
        <p className="text-gray-600">
          Configure system preferences and global settings
        </p>
      </div>
      
      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          {isSuperAdmin && (
            <TabsTrigger value="admin">Admin Tools</TabsTrigger>
          )}
        </TabsList>
        
        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Basic system configuration and contact information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="system-name">System Name</Label>
                <Input 
                  id="system-name" 
                  value={generalSettings.systemName}
                  onChange={(e) => setGeneralSettings({...generalSettings, systemName: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Contact Email</Label>
                  <Input 
                    id="contact-email" 
                    type="email"
                    value={generalSettings.contactEmail}
                    onChange={(e) => setGeneralSettings({...generalSettings, contactEmail: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contact-phone">Contact Phone</Label>
                  <Input 
                    id="contact-phone" 
                    value={generalSettings.contactPhone}
                    onChange={(e) => setGeneralSettings({...generalSettings, contactPhone: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="emergency-contact">Emergency Contact Number</Label>
                  <Input 
                    id="emergency-contact" 
                    value={generalSettings.emergencyContact}
                    onChange={(e) => setGeneralSettings({...generalSettings, emergencyContact: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="language">Default Language</Label>
                  <Select 
                    value={generalSettings.language} 
                    onValueChange={(value) => setGeneralSettings({...generalSettings, language: value})}
                  >
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="swahili">Swahili</SelectItem>
                      <SelectItem value="french">French</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => handleResetSettings('general')}
              >
                Reset to Defaults
              </Button>
              <Button 
                onClick={() => handleSaveSettings('General')}
                disabled={saving}
              >
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" /> Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure how the system notifies users</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-gray-500">Receive case updates and alerts via email</p>
                </div>
                <Switch 
                  id="email-notifications" 
                  checked={notificationSettings.emailNotifications}
                  onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, emailNotifications: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label htmlFor="sms-notifications">SMS Notifications</Label>
                  <p className="text-sm text-gray-500">Receive case updates and alerts via SMS</p>
                </div>
                <Switch 
                  id="sms-notifications" 
                  checked={notificationSettings.smsNotifications}
                  onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, smsNotifications: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label htmlFor="urgent-alerts">Urgent Case Alerts</Label>
                  <p className="text-sm text-gray-500">Get immediate notifications for urgent cases</p>
                </div>
                <Switch 
                  id="urgent-alerts" 
                  checked={notificationSettings.urgentCaseAlerts}
                  onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, urgentCaseAlerts: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label htmlFor="system-updates">System Updates</Label>
                  <p className="text-sm text-gray-500">Notifications about system updates and maintenance</p>
                </div>
                <Switch 
                  id="system-updates" 
                  checked={notificationSettings.systemUpdates}
                  onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, systemUpdates: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label htmlFor="daily-reports">Daily Reports</Label>
                  <p className="text-sm text-gray-500">Receive daily summary reports</p>
                </div>
                <Switch 
                  id="daily-reports" 
                  checked={notificationSettings.dailyReports}
                  onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, dailyReports: checked})}
                />
              </div>
              
              <div className="space-y-2 pt-4">
                <Label htmlFor="notify-additional">Additional Email Recipients</Label>
                <Textarea 
                  id="notify-additional" 
                  placeholder="Enter additional email addresses (one per line)" 
                  rows={3}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => handleResetSettings('notification')}
              >
                Reset to Defaults
              </Button>
              <Button 
                onClick={() => handleSaveSettings('Notification')}
                disabled={saving}
              >
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" /> Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure system security and access controls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label htmlFor="2fa">Two-Factor Authentication</Label>
                  <p className="text-sm text-gray-500">Require 2FA for all administrative accounts</p>
                </div>
                <Switch 
                  id="2fa" 
                  checked={securitySettings.twoFactorAuth}
                  onCheckedChange={(checked) => setSecuritySettings({...securitySettings, twoFactorAuth: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label htmlFor="strong-passwords">Strong Password Policy</Label>
                  <p className="text-sm text-gray-500">Enforce complex password requirements</p>
                </div>
                <Switch 
                  id="strong-passwords" 
                  checked={securitySettings.strongPasswords}
                  onCheckedChange={(checked) => setSecuritySettings({...securitySettings, strongPasswords: checked})}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                  <Select 
                    value={securitySettings.sessionTimeout} 
                    onValueChange={(value) => setSecuritySettings({...securitySettings, sessionTimeout: value})}
                  >
                    <SelectTrigger id="session-timeout">
                      <SelectValue placeholder="Select timeout" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">60 minutes</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label htmlFor="ip-restriction">IP Address Restriction</Label>
                  <p className="text-sm text-gray-500">Restrict access based on IP address</p>
                </div>
                <Switch 
                  id="ip-restriction" 
                  checked={securitySettings.ipRestriction}
                  onCheckedChange={(checked) => setSecuritySettings({...securitySettings, ipRestriction: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label htmlFor="audit-logs">Enable Audit Logs</Label>
                  <p className="text-sm text-gray-500">Track user actions and system changes</p>
                </div>
                <Switch 
                  id="audit-logs" 
                  checked={securitySettings.auditLogs}
                  onCheckedChange={(checked) => setSecuritySettings({...securitySettings, auditLogs: checked})}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => handleResetSettings('security')}
              >
                Reset to Defaults
              </Button>
              <Button 
                onClick={() => handleSaveSettings('Security')}
                disabled={saving}
              >
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" /> Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Admin Tools (Only for Super Admin) */}
        {isSuperAdmin && (
          <TabsContent value="admin">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-safeMinor-purple" />
                    Database Management
                  </CardTitle>
                  <CardDescription>Manage system database settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Database Status</p>
                        <p className="text-sm text-gray-500">Connection is active</p>
                      </div>
                      <Badge className="bg-green-500">Connected</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Last Backup</p>
                        <p className="text-sm text-gray-500">May 16, 2025 - 02:00 AM</p>
                      </div>
                      <Badge variant="outline">12 hours ago</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Storage Usage</p>
                        <p className="text-sm text-gray-500">Current database size</p>
                      </div>
                      <Badge variant="outline">245 MB</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Auto Backup</p>
                        <p className="text-sm text-gray-500">Daily backups enabled</p>
                      </div>
                      <Switch checked={true} disabled />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowDatabaseSettings(!showDatabaseSettings)}
                  >
                    {showDatabaseSettings ? "Hide Settings" : "Show Settings"}
                  </Button>
                  <Button>
                    <Save className="mr-2 h-4 w-4" /> Backup Now
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShieldAlert className="h-5 w-5 text-safeMinor-purple" />
                    System Security
                  </CardTitle>
                  <CardDescription>Advanced security tools and monitoring</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <Button className="w-full" onClick={() => setShowActivityLogs(!showActivityLogs)}>
                      {showActivityLogs ? "Hide Activity Logs" : "View Activity Logs"}
                    </Button>
                    
                    <Button className="w-full">
                      Security Audit
                    </Button>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" className="w-full">
                          Reset All Passwords
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action will force a password reset for ALL users in the system. Each user will need to create a new password at next login.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" className="w-full">
                          System Lockdown
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>System Lockdown</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will immediately log out all users and prevent new logins. Only super administrators will be able to access the system. Are you sure?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction>Initiate Lockdown</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Activity Logs Section */}
            {showActivityLogs && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Activity Logs</CardTitle>
                  <CardDescription>System and user activity history</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="h-10 px-4 text-left font-medium">User</th>
                          <th className="h-10 px-4 text-left font-medium">Action</th>
                          <th className="h-10 px-4 text-left font-medium">Timestamp</th>
                          <th className="h-10 px-4 text-left font-medium">IP Address</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activityLogs.map((log) => (
                          <tr key={log.id} className="border-b">
                            <td className="p-4">{log.user}</td>
                            <td className="p-4">{log.action}</td>
                            <td className="p-4">{log.timestamp}</td>
                            <td className="p-4">{log.ipAddress}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">
                    Export Logs
                  </Button>
                  <Button variant="outline">
                    Clear Logs
                  </Button>
                </CardFooter>
              </Card>
            )}
            
            {/* Database Settings Section */}
            {showDatabaseSettings && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Database Configuration</CardTitle>
                  <CardDescription>Advanced database settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="db-host">Database Host</Label>
                      <Input id="db-host" value="safeminor.supabase.co" readOnly />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="db-port">Database Port</Label>
                      <Input id="db-port" value="5432" readOnly />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="db-name">Database Name</Label>
                      <Input id="db-name" value="safeminor_prod" readOnly />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="db-user">Database User</Label>
                      <Input id="db-user" value="postgres" readOnly />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="backup-schedule">Backup Schedule</Label>
                    <Select defaultValue="daily">
                      <SelectTrigger id="backup-schedule">
                        <SelectValue placeholder="Select schedule" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="backup-retention">Backup Retention (days)</Label>
                    <Input id="backup-retention" type="number" defaultValue="30" />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={() => {
                    toast({
                      title: "Settings Saved",
                      description: "Database configuration has been updated successfully."
                    });
                  }}>
                    <Save className="mr-2 h-4 w-4" /> Save Configuration
                  </Button>
                </CardFooter>
              </Card>
            )}
          </TabsContent>
        )}
      </Tabs>
    </AdminLayout>
  );
};

export default Settings;
