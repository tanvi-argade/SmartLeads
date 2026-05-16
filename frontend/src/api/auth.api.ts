import api from './axios';
import { LoginPayload, RegisterPayload, AuthResponse, User } from '../types/auth.types';
import { ApiResponse } from '../types/api.types';

export const loginApi = async (payload: LoginPayload) =>
  api.post<ApiResponse<AuthResponse>>('auth/login', payload).then(r => r.data);

export const registerApi = async (payload: RegisterPayload) =>
  api.post<ApiResponse<AuthResponse>>('auth/register', payload).then(r => r.data);

export const getMeApi = async () =>
  api.get<ApiResponse<User>>('auth/me').then(r => r.data);
