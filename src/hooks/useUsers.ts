
import { useState } from 'react';
import { User, NewUser, EditUserData } from '@/types/user';
import { useToast } from "@/components/ui/use-toast";

// Sample users data
const initialUsers: User[] = [
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

export const useUsers = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [newUser, setNewUser] = useState<NewUser>({
    name: "",
    email: "",
    role: "",
    password: "",
    isSuperAdmin: false
  });

  const [currentUser, setCurrentUser] = useState<EditUserData>({
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

  const selectUserForEdit = (user: User) => {
    setCurrentUser({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isSuperAdmin: user.isSuperAdmin
    });
    setShowEditUserDialog(true);
  };

  const selectUserForPasswordChange = (user: User) => {
    setCurrentUser({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isSuperAdmin: user.isSuperAdmin
    });
    setShowPasswordDialog(true);
  };

  return {
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
  };
};
