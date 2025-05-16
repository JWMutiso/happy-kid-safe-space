
import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import { Users, UserPlus, Search, Edit, Trash2, Shield, ShieldAlert, Lock } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

// Sample users data
const initialUsers = [
  {
    id: 1,
    name: "Admin User",
    email: "minor-kenya@gmail.com",
    role: "Super Admin",
    status: "Active",
    lastLogin: "May 16, 2025, 9:30 AM",
    isSuperAdmin: true
  },
  {
    id: 2,
    name: "John Kimani",
    email: "john.kimani@example.com",
    role: "Case Manager",
    status: "Active",
    lastLogin: "May 15, 2025, 2:45 PM",
    isSuperAdmin: false
  },
  {
    id: 3,
    name: "Mary Mwangi",
    email: "mary.mwangi@example.com",
    role: "Medical Officer",
    status: "Active",
    lastLogin: "May 14, 2025, 4:20 PM",
    isSuperAdmin: false
  },
  {
    id: 4,
    name: "Peter Ochieng",
    email: "peter.ochieng@example.com",
    role: "Police Officer",
    status: "Inactive",
    lastLogin: "May 10, 2025, 10:15 AM",
    isSuperAdmin: false
  },
  {
    id: 5,
    name: "Susan Wanjiku",
    email: "susan.wanjiku@example.com",
    role: "Case Manager",
    status: "Active",
    lastLogin: "May 16, 2025, 8:45 AM",
    isSuperAdmin: false
  }
];

// Check if current user is super admin
const currentUserEmail = "minor-kenya@gmail.com";

const UserManagement = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
    isSuperAdmin: false
  });
  const [currentUser, setCurrentUser] = useState({
    id: 0,
    name: "",
    email: "",
    role: "",
    isSuperAdmin: false
  });
  
  const [showNewUserDialog, setShowNewUserDialog] = useState(false);
  const [showEditUserDialog, setShowEditUserDialog] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  
  // Filter user records based on search query
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.role || !newUser.password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    // Add new user
    setUsers([...users, {
      id: users.length + 1,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: "Active",
      lastLogin: "Never",
      isSuperAdmin: newUser.isSuperAdmin
    }]);
    
    toast({
      title: "Success",
      description: `User ${newUser.name} added successfully`,
    });
    
    // Reset form
    setNewUser({
      name: "",
      email: "",
      role: "",
      password: "",
      isSuperAdmin: false
    });
    
    setShowNewUserDialog(false);
  };
  
  const handleEditUser = () => {
    setUsers(users.map(user => 
      user.id === currentUser.id 
        ? { 
            ...user, 
            name: currentUser.name, 
            email: currentUser.email, 
            role: currentUser.role,
            isSuperAdmin: currentUser.isSuperAdmin
          } 
        : user
    ));
    
    toast({
      title: "Success",
      description: `User ${currentUser.name} updated successfully`,
    });
    
    setShowEditUserDialog(false);
  };
  
  const handleChangePassword = (userId: number) => {
    // In a real application, this would make an API call to change the password
    toast({
      title: "Success",
      description: "Password updated successfully",
    });
    
    setNewPassword("");
    setShowPasswordDialog(false);
  };
  
  const handleDeleteUser = (userId: number) => {
    // Check if trying to delete the super admin account
    const userToDelete = users.find(user => user.id === userId);
    if (userToDelete?.email === "minor-kenya@gmail.com") {
      toast({
        title: "Error",
        description: "Cannot delete the primary super admin account",
        variant: "destructive",
      });
      return;
    }
    
    // Delete user
    setUsers(users.filter(user => user.id !== userId));
    
    toast({
      title: "Success",
      description: "User deleted successfully",
    });
  };
  
  const handleToggleStatus = (userId: number) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === "Active" ? "Inactive" : "Active" } 
        : user
    ));
    
    const targetUser = users.find(user => user.id === userId);
    const newStatus = targetUser?.status === "Active" ? "Inactive" : "Active";
    
    toast({
      title: "Success",
      description: `User status changed to ${newStatus}`,
    });
  };
  
  // Check if current user is super admin
  const isCurrentUserSuperAdmin = true; // For demo, we'll assume yes

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Users className="h-6 w-6 text-safeMinor-purple" />
          User Management
        </h1>
        <p className="text-gray-600">
          Manage system users and their access permissions
        </p>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-lg font-medium">System Users</CardTitle>
              <CardDescription>Manage administrators and staff accounts</CardDescription>
            </div>
            {isCurrentUserSuperAdmin && (
              <Dialog open={showNewUserDialog} onOpenChange={setShowNewUserDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <UserPlus className="h-4 w-4 mr-2" /> Add New User
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New User</DialogTitle>
                    <DialogDescription>
                      Create a new user account. They'll receive an email with login instructions.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        placeholder="Enter full name"
                        value={newUser.name}
                        onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="Enter email address"
                        value={newUser.email}
                        onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Select 
                        value={newUser.role} 
                        onValueChange={(value) => setNewUser({...newUser, role: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Case Manager">Case Manager</SelectItem>
                          <SelectItem value="Medical Officer">Medical Officer</SelectItem>
                          <SelectItem value="Police Officer">Police Officer</SelectItem>
                          <SelectItem value="Admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="password">Temporary Password</Label>
                      <Input 
                        id="password" 
                        type="password" 
                        placeholder="Enter temporary password"
                        value={newUser.password}
                        onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                      />
                    </div>
                    
                    {isCurrentUserSuperAdmin && (
                      <div className="flex items-center space-x-2">
                        <Switch 
                          id="super-admin" 
                          checked={newUser.isSuperAdmin}
                          onCheckedChange={(checked) => setNewUser({...newUser, isSuperAdmin: checked})}
                        />
                        <Label htmlFor="super-admin" className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-safeMinor-purple" />
                          Grant Super Admin privileges
                        </Label>
                      </div>
                    )}
                  </div>
                  
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowNewUserDialog(false)}>Cancel</Button>
                    <Button onClick={handleAddUser}>Add User</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search users..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" onClick={() => setSearchQuery("")}>
              Reset
            </Button>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium flex items-center gap-2">
                      {user.isSuperAdmin && (
                        <ShieldAlert className="h-4 w-4 text-safeMinor-purple" />
                      )}
                      {user.name}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <Badge variant={user.status === "Active" ? "default" : "secondary"}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.lastLogin}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {isCurrentUserSuperAdmin && (
                          <>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={() => {
                                setCurrentUser({
                                  id: user.id,
                                  name: user.name,
                                  email: user.email,
                                  role: user.role,
                                  isSuperAdmin: user.isSuperAdmin
                                });
                                setShowEditUserDialog(true);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={() => {
                                setCurrentUser({
                                  id: user.id,
                                  name: user.name,
                                  email: user.email,
                                  role: user.role,
                                  isSuperAdmin: user.isSuperAdmin
                                });
                                setShowPasswordDialog(true);
                              }}
                            >
                              <Lock className="h-4 w-4" />
                            </Button>
                            
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-red-500"
                              onClick={() => handleDeleteUser(user.id)}
                              disabled={user.email === "minor-kenya@gmail.com"}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                            
                            <Button
                              variant={user.status === "Active" ? "outline" : "default"}
                              size="sm"
                              onClick={() => handleToggleStatus(user.id)}
                            >
                              {user.status === "Active" ? "Deactivate" : "Activate"}
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <div className="text-sm text-gray-500">
            Showing {filteredUsers.length} of {users.length} users
          </div>
        </CardFooter>
      </Card>
      
      {/* Edit User Dialog */}
      <Dialog open={showEditUserDialog} onOpenChange={setShowEditUserDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update user information and permissions
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Full Name</Label>
              <Input 
                id="edit-name" 
                placeholder="Enter full name"
                value={currentUser.name}
                onChange={(e) => setCurrentUser({...currentUser, name: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-email">Email Address</Label>
              <Input 
                id="edit-email" 
                type="email" 
                placeholder="Enter email address"
                value={currentUser.email}
                onChange={(e) => setCurrentUser({...currentUser, email: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-role">Role</Label>
              <Select 
                value={currentUser.role} 
                onValueChange={(value) => setCurrentUser({...currentUser, role: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Case Manager">Case Manager</SelectItem>
                  <SelectItem value="Medical Officer">Medical Officer</SelectItem>
                  <SelectItem value="Police Officer">Police Officer</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                  {isCurrentUserSuperAdmin && (
                    <SelectItem value="Super Admin">Super Admin</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
            
            {isCurrentUserSuperAdmin && currentUser.email !== "minor-kenya@gmail.com" && (
              <div className="flex items-center space-x-2">
                <Switch 
                  id="edit-super-admin" 
                  checked={currentUser.isSuperAdmin}
                  onCheckedChange={(checked) => setCurrentUser({...currentUser, isSuperAdmin: checked})}
                />
                <Label htmlFor="edit-super-admin" className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-safeMinor-purple" />
                  Grant Super Admin privileges
                </Label>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditUserDialog(false)}>Cancel</Button>
            <Button onClick={handleEditUser}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Change Password Dialog */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Set a new password for {currentUser.name}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input 
                id="new-password" 
                type="password" 
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPasswordDialog(false)}>Cancel</Button>
            <Button onClick={() => handleChangePassword(currentUser.id)}>Change Password</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default UserManagement;
