export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'lost';
export type LeadSource = 'website' | 'instagram' | 'referral';

export interface ILead {
  _id: string;
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

export interface LeadQueryParams {
  page: number;
  limit: number;
  status?: LeadStatus;
  source?: LeadSource;
  search?: string;
  sortBy?: 'createdAt';
  sortOrder?: 'asc' | 'desc';
}
