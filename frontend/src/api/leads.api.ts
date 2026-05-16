import api from './axios';
import { Lead, LeadFilters, LeadFormData } from '../types/lead.types';
import { ApiResponse } from '../types/api.types';

export const getLeadsApi = async (filters: LeadFilters) => {
  const params = new URLSearchParams();
  if (filters.search) params.set('search', filters.search);
  if (filters.status) params.set('status', filters.status);
  if (filters.source) params.set('source', filters.source);
  params.set('sortBy', 'createdAt');
  params.set('sortOrder', filters.sortOrder);
  params.set('page', String(filters.page));
  params.set('limit', String(filters.limit ?? 10));
  return api.get<ApiResponse<Lead[]>>(`leads?${params}`).then(r => r.data);
};

export const createLeadApi = async (data: LeadFormData) =>
  api.post<ApiResponse<Lead>>('leads', data).then(r => r.data);

export const updateLeadApi = async (id: string, data: Partial<LeadFormData>) =>
  api.put<ApiResponse<Lead>>(`leads/${id}`, data).then(r => r.data);

export const deleteLeadApi = async (id: string) =>
  api.delete<ApiResponse<null>>(`leads/${id}`).then(r => r.data);

export const exportLeadsCSVApi = async () => {
  const res = await api.get('leads/export/csv', { responseType: 'blob' });
  const url = window.URL.createObjectURL(new Blob([res.data]));
  const a = document.createElement('a');
  a.href = url;
  a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  window.URL.revokeObjectURL(url);
};
