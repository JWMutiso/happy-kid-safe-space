
import React from 'react';
import { User } from '@/types/user';
import { ShieldAlert, Edit, Lock, Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface UserListTableProps {
  users: User[];
  filteredUsers: User[];
  isCurrentUserSuperAdmin: boolean;
  onEditUser: (user: User) => void;
  onChangePassword: (user: User) => void;
  onDeleteUser: (userId: number) => void;
  onToggleStatus: (userId: number) => void;
}

const UserListTable = ({
  users,
  filteredUsers,
  isCurrentUserSuperAdmin,
  onEditUser,
  onChangePassword,
  onDeleteUser,
  onToggleStatus,
}: UserListTableProps) => {
  return (
    <>
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
                          onClick={() => onEditUser(user)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => onChangePassword(user)}
                        >
                          <Lock className="h-4 w-4" />
                        </Button>
                        
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-red-500"
                          onClick={() => onDeleteUser(user.id)}
                          disabled={user.email === "minor-kenya@gmail.com"}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        
                        <Button
                          variant={user.status === "Active" ? "outline" : "default"}
                          size="sm"
                          onClick={() => onToggleStatus(user.id)}
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
      <div className="mt-4 text-sm text-gray-500">
        Showing {filteredUsers.length} of {users.length} users
      </div>
    </>
  );
};

export default UserListTable;
