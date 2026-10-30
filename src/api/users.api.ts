import API from './auth.api';

export type UserRole = 'Admin' | 'SubAdmin' | 'Instructor' | 'Student';
export type UserStatus = 'Active' | 'Pending' | 'Suspended';

export interface AdminUser {
  _id: string;
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  permissions?: string[];
  profilePicture?: string;
  isEmailVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
  lastLogin?: string;
  lastLoginAt?: string;
  courses?: unknown[];
  coursesCount?: number;
  enrolledCoursesCount?: number;
}

export interface UsersPagination {
  page?: number;
  limit?: number;
  total?: number;
  totalResults?: number;
  totalPages?: number;
  [key: string]: unknown;
}

export interface UsersResponse {
  status: string;
  pagination: UsersPagination;
  data: {
    users: AdminUser[];
  };
}

interface UserResponse {
  status: string;
  data: {
    user: AdminUser;
  };
}

interface DeleteUserResponse {
  status: string;
  message: string;
}

export interface GetUsersParams {
  page?: number;
  limit?: number;
  sort?: string;
  search?: string;
  role?: UserRole;
  status?: UserStatus;
}

export interface UpdateUserPayload {
  firstName?: string;
  lastName?: string;
  status?: UserStatus;
  profilePicture?: string;
}

/**
 * General user creation is restricted to Student and Instructor.
 * Admin and SubAdmin creation use separate protected backend flows.
 */
export interface CreateUserPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'Student' | 'Instructor';
  status: UserStatus;
}

export async function getUsers(
  params: GetUsersParams = {},
): Promise<UsersResponse> {
  const response = await API.get<UsersResponse>('/users', {
    params,
  });

  return response.data;
}

export async function getUserById(
  id: string,
): Promise<AdminUser> {
  const response = await API.get<UserResponse>(
    `/users/${encodeURIComponent(id)}`,
  );

  return response.data.data.user;
}

export async function createUser(
  payload: CreateUserPayload,
): Promise<AdminUser> {
  const response = await API.post<UserResponse>('/users', payload);

  return response.data.data.user;
}

export async function updateUser(
  id: string,
  payload: UpdateUserPayload,
): Promise<AdminUser> {
  const response = await API.put<UserResponse>(
    `/users/${encodeURIComponent(id)}`,
    payload,
  );

  return response.data.data.user;
}

export async function updateSubAdmin(
  id: string,
  payload: UpdateUserPayload,
): Promise<AdminUser> {
  const response = await API.patch<UserResponse>(
    `/users/sub-admins/${encodeURIComponent(id)}`,
    payload,
  );

  return response.data.data.user;
}

export async function deleteUser(id: string): Promise<string> {
  const response = await API.delete<DeleteUserResponse>(
    `/users/${encodeURIComponent(id)}`,
  );

  return response.data.message;
}