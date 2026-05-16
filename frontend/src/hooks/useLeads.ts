import { useQuery } from '@tanstack/react-query';
import { getLeadsApi } from '../api/leads.api';
import { LeadFilters } from '../types/lead.types';

export const useLeads = (filters: LeadFilters) => {
  return useQuery({
    queryKey: ['leads', filters],
    queryFn: () => getLeadsApi(filters),
  });
};
