export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'lost';
export type LeadSource = 'website' | 'instagram' | 'referral';

export interface Lead {
  _id: string;
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
  createdAt: string;
  updatedAt: string;
  createdBy: { _id: string; name: string; email: string };
}

export interface LeadFormData {
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
}

export interface LeadFilters {
  search: string;
  status: LeadStatus | '';
  source: LeadSource | '';
  sortOrder: 'asc' | 'desc';
  page: number;
  limit?: number;
}
