import React from 'react';
import { Edit2, Trash2, Eye } from 'lucide-react';
import { Lead } from '../../types/lead.types';
import { Badge } from '../ui/Badge';
import { useAuthStore } from '../../store/authStore';

interface Props {
  lead: Lead;
  onEdit: (lead: Lead) => void;
  onDelete: (id: string) => void;
  onView: (lead: Lead) => void;
}

export const LeadRow: React.FC<Props> = ({ lead, onEdit, onDelete, onView }) => {
  const { user } = useAuthStore();

  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 font-bold text-xs">
            {lead.name[0].toUpperCase()}
          </div>
          <span className="text-sm font-semibold text-gray-900 dark:text-white">{lead.name}</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{lead.email}</td>
      <td className="px-6 py-4 whitespace-nowrap"><Badge type="status" value={lead.status} /></td>
      <td className="px-6 py-4 whitespace-nowrap"><Badge type="source" value={lead.source} /></td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
        {new Date(lead.createdAt).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
        <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => onView(lead)} className="p-2 rounded-lg text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30">
            <Eye className="w-4 h-4" />
          </button>
          <button onClick={() => onEdit(lead)} className="p-2 rounded-lg text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30">
            <Edit2 className="w-4 h-4" />
          </button>
          {user?.role === 'admin' && (
            <button onClick={() => onDelete(lead._id)} className="p-2 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30">
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};
