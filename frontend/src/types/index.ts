export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  user_id: string;
  street: string;
  state: string;
  city: string;
  zipcode: string;
}

export interface Post {
  id: string;
  title: string;
  body: string;
  userId: string;
  created_at?: string;
  updatedAt?: string;
}

export interface UserTableData {
  id: string;
  name: string;
  email: string;
  address: string;
}

export interface CreatePostData {
  userId: string;
  title: string;
  body: string;
}

export interface PaginatedResponse<T> {
  users?: T[];
  posts?: T[];
  pageNumber: number;
  totalPages: number;
  totalElements: number;
}

export interface ApiResponse {
  message: string;
  success?: boolean;
}