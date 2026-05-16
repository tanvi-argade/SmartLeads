import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getLeadsApi, createLeadApi, updateLeadApi, deleteLeadApi, exportLeadsCSVApi } from '../api/leads.api';
import { LeadFilters as FiltersType, Lead, LeadFormData } from '../types/lead.types';
import { useDebounce } from '../hooks/useDebounce';
import { LeadFilters } from '../components/leads/LeadFilters';
import { LeadTable } from '../components/leads/LeadTable';
import { Pagination } from '../components/ui/Pagination';
import { Modal } from '../components/ui/Modal';
import { LeadModal } from '../components/leads/LeadModal';
import { LeadDetailPanel } from '../components/leads/LeadDetailPanel';
import { Spinner } from '../components/ui/Spinner';

const DashboardPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState<FiltersType>({
    search: '',
    status: '',
    source: '',
    sortOrder: 'desc',
    page: 1,
  });
  const [searchInput, setSearchInput] = useState('');
  const debouncedSearch = useDebounce(searchInput);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [viewingLead, setViewingLead] = useState<Lead | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['leads', { ...filters, search: debouncedSearch }],
    queryFn: () => getLeadsApi({ ...filters, search: debouncedSearch }),
  });

  const createMutation = useMutation({
    mutationFn: createLeadApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      toast.success('Lead created successfully');
      closeModal();
    },
    onError: (err) => {
      const message = err instanceof Error ? (err as any).response?.data?.message || err.message : 'Failed to create lead';
      toast.error(message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: LeadFormData }) => updateLeadApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      toast.success('Lead updated successfully');
      closeModal();
    },
    onError: (err) => {
      const message = err instanceof Error ? (err as any).response?.data?.message || err.message : 'Failed to update lead';
      toast.error(message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteLeadApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      toast.success('Lead deleted');
    },
    onError: (err) => {
      const message = err instanceof Error ? (err as any).response?.data?.message || err.message : 'Failed to delete lead';
      toast.error(message);
    },
  });

  const handleAdd = () => {
    setEditingLead(null);
    setIsModalOpen(true);
  };

  const handleEdit = (lead: Lead) => {
    setEditingLead(lead);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleView = (lead: Lead) => {
    setViewingLead(lead);
    setIsDetailOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingLead(null);
  };

  const closeDetail = () => {
    setIsDetailOpen(false);
    setViewingLead(null);
  };

  const handleFormSubmit = (formData: LeadFormData) => {
    if (editingLead) {
      updateMutation.mutate({ id: editingLead._id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleClearFilters = () => {
    setSearchInput('');
    setFilters({
      search: '',
      status: '',
      source: '',
      sortOrder: 'desc',
      page: 1,
    });
  };

  return (
    <div className="p-6 bg-slate-50 dark:bg-[#05101f] min-h-screen space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-[800] text-slate-900 dark:text-white tracking-tight">Leads Management</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Track and manage your incoming leads in real-time</p>
        </div>
      </div>

      <div className="bg-white dark:bg-[#0b1a2e] border border-slate-200 dark:border-white/[0.07] rounded-2xl p-4 shadow-sm">
        <LeadFilters
          filters={filters}
          onChange={(f) => setFilters((prev) => ({ ...prev, ...f }))}
          onAdd={handleAdd}
          onExport={exportLeadsCSVApi}
          searchInput={searchInput}
          onSearchInput={setSearchInput}
          onClearFilters={handleClearFilters}
        />
      </div>

      <div className="bg-white dark:bg-[#0b1a2e] border border-slate-200 dark:border-white/[0.07] rounded-2xl overflow-hidden shadow-sm">
        <div className="relative">
          {isLoading ? (
            <div className="h-64 flex items-center justify-center">
              <Spinner size="lg" />
            </div>
          ) : (
            <LeadTable
              leads={data?.data || []}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onView={handleView}
            />
          )}
        </div>

        {data?.meta && (
          <Pagination
            meta={data.meta}
            onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))}
          />
        )}
      </div>

      <LeadModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleFormSubmit}
        isLoading={createMutation.isPending || updateMutation.isPending}
        editingLead={editingLead}
      />

      <Modal
        isOpen={isDetailOpen}
        onClose={closeDetail}
        title="Lead Details"
      >
        <LeadDetailPanel lead={viewingLead} onClose={closeDetail} />
      </Modal>
    </div>
  );
};

export default DashboardPage;
