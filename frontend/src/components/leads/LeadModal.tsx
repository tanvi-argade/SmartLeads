import React from 'react';
import { Modal } from '../ui/Modal';
import { LeadForm } from './LeadForm';
import { Lead, LeadFormData } from '../../types/lead.types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: LeadFormData) => void;
  isLoading: boolean;
  editingLead: Lead | null;
}

export const LeadModal: React.FC<Props> = ({ isOpen, onClose, onSubmit, isLoading, editingLead }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingLead ? 'Edit Lead' : 'Add New Lead'}
    >
      <LeadForm
        initialData={editingLead ? {
          name: editingLead.name,
          email: editingLead.email,
          status: editingLead.status,
          source: editingLead.source,
        } : undefined}
        onSubmit={onSubmit}
        isLoading={isLoading}
        onCancel={onClose}
      />
    </Modal>
  );
};
