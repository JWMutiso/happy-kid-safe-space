
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Inactive";
  lastLogin: string;
  isSuperAdmin: boolean;
}

export interface NewUser {
  name: string;
  email: string;
  role: string;
  password: string;
  isSuperAdmin: boolean;
}

export interface EditUserData {
  id: number;
  name: string;
  email: string;
  role: string;
  isSuperAdmin: boolean;
}
