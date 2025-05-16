
import React from 'react';
import AdminLayout from './AdminLayout';
import { Users, UserPlus, Search } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import UserListTable from '@/components/admin/UserListTable';
import AddUserDialog from '@/components/admin/AddUserDialog';
import EditUserDialog from '@/components/admin/EditUserDialog';
import ChangePasswordDialog from '@/components/admin/ChangePasswordDialog';
import { useUsers } from '@/hooks/useUsers';

const UserManagement = () => {
  // Check if current user is super admin - for a real application, this would come from an auth context
  const isCurrentUserSuperAdmin = true; 
  
  const {
    users,
    filteredUsers,
    searchQuery,
    setSearchQuery,
    newUser,
    setNewUser,
    currentUser,
    setCurrentUser,
    showNewUserDialog,
    setShowNewUserDialog,
    showEditUserDialog,
    setShowEditUserDialog,
    showPasswordDialog,
    setShowPasswordDialog,
    newPassword,
    setNewPassword,
    handleAddUser,
    handleEditUser,
    handleChangePassword,
    handleDeleteUser,
    handleToggleStatus,
    selectUserForEdit,
    selectUserForPasswordChange
  } = useUsers();

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
              <AddUserDialog 
                open={showNewUserDialog}
                onOpenChange={setShowNewUserDialog}
                newUser={newUser}
                setNewUser={setNewUser}
                handleAddUser={handleAddUser}
                isCurrentUserSuperAdmin={isCurrentUserSuperAdmin}
              >
                <DialogTrigger asChild>
                  <Button>
                    <UserPlus className="h-4 w-4 mr-2" /> Add New User
                  </Button>
                </DialogTrigger>
              </AddUserDialog>
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
          
          <UserListTable
            users={users}
            filteredUsers={filteredUsers} 
            isCurrentUserSuperAdmin={isCurrentUserSuperAdmin}
            onEditUser={selectUserForEdit}
            onChangePassword={selectUserForPasswordChange}
            onDeleteUser={handleDeleteUser}
            onToggleStatus={handleToggleStatus}
          />
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <div className="text-sm text-gray-500">
            Showing {filteredUsers.length} of {users.length} users
          </div>
        </CardFooter>
      </Card>
      
      {/* Edit User Dialog */}
      <EditUserDialog 
        open={showEditUserDialog}
        onOpenChange={setShowEditUserDialog}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        handleEditUser={handleEditUser}
        isCurrentUserSuperAdmin={isCurrentUserSuperAdmin}
      />
      
      {/* Change Password Dialog */}
      <ChangePasswordDialog 
        open={showPasswordDialog}
        onOpenChange={setShowPasswordDialog}
        newPassword={newPassword}
        setNewPassword={setNewPassword}
        handleChangePassword={handleChangePassword}
        currentUserId={currentUser.id}
        currentUserName={currentUser.name}
      />
    </AdminLayout>
  );
};

export default UserManagement;
