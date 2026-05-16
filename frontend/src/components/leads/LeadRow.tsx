import React from 'react';
import { Edit2, Trash2, Eye } from 'lucide-react';
import { Lead } from '../../types/lead.types';
import { Badge } from '../ui/Badge';
import { useAuthStore } from '../../store/authStore';

interface Props {
  lead: Lead;
  index: number;
  onEdit: (lead: Lead) => void;
  onDelete: (id: string) => void;
  onView: (lead: Lead) => void;
}

export const LeadRow: React.FC<Props> = ({ lead, index, onEdit, onDelete, onView }) => {
  const { user } = useAuthStore();

  return (
    <tr 
      className="border-t border-slate-100 dark:border-white/[0.05] hover:bg-slate-50 dark:hover:bg-white/[0.03] text-sm text-slate-700 dark:text-slate-300 transition-colors duration-100 group animate-fadeIn opacity-0"
      style={{ animationDelay: `${index * 0.03}s` }}
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#2563eb] flex items-center justify-center text-white font-[700] text-[11px] shadow-sm">
            {lead.name[0].toUpperCase()}
          </div>
          <span className="font-[600] text-slate-900 dark:text-white">{lead.name}</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-slate-500 dark:text-slate-400">{lead.email}</td>
      <td className="px-6 py-4 whitespace-nowrap"><Badge type="status" value={lead.status} /></td>
      <td className="px-6 py-4 whitespace-nowrap"><Badge type="source" value={lead.source} /></td>
      <td className="px-6 py-4 whitespace-nowrap text-slate-500 dark:text-slate-500 font-medium">
        {new Date(lead.createdAt).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right">
        <div className="flex justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200">
          <button 
            onClick={() => onView(lead)} 
            className="p-1.5 rounded-[7px] text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button 
            onClick={() => onEdit(lead)} 
            className="p-1.5 rounded-[7px] text-slate-400 hover:text-[#2563eb] hover:bg-[#2563eb]/10 transition-all"
            title="Edit Lead"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          {user?.role === 'admin' && (
            <button 
              onClick={() => onDelete(lead._id)} 
              className="p-1.5 rounded-[7px] text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
              title="Delete Lead"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};
