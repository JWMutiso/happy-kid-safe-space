
import React from 'react';
import { EditUserData } from '@/types/user';
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

interface EditUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentUser: EditUserData;
  setCurrentUser: React.Dispatch<React.SetStateAction<EditUserData>>;
  handleEditUser: () => void;
  isCurrentUserSuperAdmin: boolean;
}

const EditUserDialog = ({
  open,
  onOpenChange,
  currentUser,
  setCurrentUser,
  handleEditUser,
  isCurrentUserSuperAdmin,
}: EditUserDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleEditUser}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserDialog;
