
import React from 'react';
import { NewUser } from '@/types/user';
import { Shield } from 'lucide-react';
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
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddUserDialogProps {
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleAddUser}>Add User</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserDialog;
