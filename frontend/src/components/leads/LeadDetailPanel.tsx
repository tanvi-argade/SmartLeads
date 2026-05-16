import React from 'react';
import { Mail, Phone, Calendar, User, Globe, MessageSquare } from 'lucide-react';
import { Lead } from '../../types/lead.types';
import { Badge } from '../ui/Badge';

interface Props {
  lead: Lead | null;
  onClose: () => void;
}

export const LeadDetailPanel: React.FC<Props> = ({ lead, onClose }) => {
  if (!lead) return null;

  const info = [
    { icon: Mail, label: 'Email', value: lead.email },
    { icon: Globe, label: 'Source', value: lead.source, isBadge: true, type: 'source' },
    { icon: MessageSquare, label: 'Status', value: lead.status, isBadge: true, type: 'status' },
    { icon: Calendar, label: 'Created', value: new Date(lead.createdAt).toLocaleDateString() },
    { icon: User, label: 'Added By', value: lead.createdBy.name },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 text-2xl font-bold">
          {lead.name[0].toUpperCase()}
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{lead.name}</h3>
          <p className="text-sm text-gray-500">{lead.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {info.map((item) => (
          <div key={item.label} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-3 text-gray-500">
              <item.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{item.label}</span>
            </div>
            <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              {item.isBadge ? <Badge type={item.type as any} value={item.value as any} /> : item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
