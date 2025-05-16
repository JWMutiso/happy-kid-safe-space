
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { NewUser } from '@/types/user';
import { Switch } from '@/components/ui/switch';

export interface AddUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newUser: NewUser;
  setNewUser: React.Dispatch<React.SetStateAction<NewUser>>;
  handleAddUser: () => void;
  isCurrentUserSuperAdmin: boolean;
}

const AddUserDialog = ({
  open,
  onOpenChange,
  newUser,
  setNewUser,
  handleAddUser,
  isCurrentUserSuperAdmin,
}: AddUserDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>
            Create a new user account in the system
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name" 
              placeholder="Enter user's full name"
              value={newUser.name}
              onChange={(e) => setNewUser({...newUser, name: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="Enter user's email address"
              value={newUser.email}
              onChange={(e) => setNewUser({...newUser, email: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <select
              id="role"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={newUser.role}
              onChange={(e) => setNewUser({...newUser, role: e.target.value})}
            >
              <option value="">Select a role</option>
              <option value="reporter">Reporter</option>
              <option value="medical">Medical Officer</option>
              <option value="police">Police Officer</option>
              <option value="admin">Administrator</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Initial Password</Label>
            <Input 
              id="password" 
              type="password" 
              placeholder="Set initial password"
              value={newUser.password}
              onChange={(e) => setNewUser({...newUser, password: e.target.value})}
            />
          </div>
          
          {isCurrentUserSuperAdmin && (
            <div className="flex items-center space-x-2">
              <Switch 
                id="superadmin"
                checked={newUser.isSuperAdmin}
                onCheckedChange={(checked) => setNewUser({...newUser, isSuperAdmin: checked})}
              />
              <Label htmlFor="superadmin">Grant Super Admin privileges</Label>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleAddUser}>Add User</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserDialog;
