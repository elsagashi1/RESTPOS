export type UserRole = 'admin' | 'waiter';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  status: 'active' | 'inactive';
}

export interface ProductGroup {
  id: string;
  name: string;
  status: 'active' | 'inactive';
}

export interface Product {
  id: string;
  name: string;
  price: number;
  groupId: string;
  status: 'active' | 'inactive';
}

export interface Table {
  id: string;
  name: string;
  status: 'free' | 'active';
  enabled: boolean;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  tableId: string;
  tableName: string;
  items: OrderItem[];
  total: number;
  date: Date;
  status: 'pending' | 'closed';
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
