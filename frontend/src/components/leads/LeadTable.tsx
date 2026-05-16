import React from 'react';
import { Lead } from '../../types/lead.types';
import { LeadRow } from './LeadRow';
import { EmptyState } from '../ui/EmptyState';

interface LeadTableProps {
  leads: Lead[];
  onEdit: (lead: Lead) => void;
  onDelete: (id: string) => void;
  onView: (lead: Lead) => void;
}

export const LeadTable: React.FC<LeadTableProps> = ({ leads, onEdit, onDelete, onView }) => {
  if (leads.length === 0) return <EmptyState />;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 dark:bg-white/[0.03] text-xs font-[600] uppercase tracking-wider text-slate-500 dark:text-slate-500">
            <th className="px-6 py-4">Name</th>
            <th className="px-6 py-4">Email</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Source</th>
            <th className="px-6 py-4">Created At</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-white/[0.05]">
          {leads.map((lead, index) => (
            <LeadRow
              key={lead._id}
              lead={lead}
              index={index}
              onEdit={onEdit}
              onDelete={onDelete}
              onView={onView}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
