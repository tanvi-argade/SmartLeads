import React from 'react';
import { Search, Download, Plus } from 'lucide-react';
import { LeadFilters as FiltersType } from '../../types/lead.types';
import { useAuthStore } from '../../store/authStore';

interface Props {
  filters: FiltersType;
  onChange: (f: Partial<FiltersType>) => void;
  onAdd: () => void;
  onExport: () => void;
  searchInput: string;
  onSearchInput: (v: string) => void;
}

export const LeadFilters: React.FC<Props> = ({ filters, onChange, onAdd, onExport, searchInput, onSearchInput }) => {
  const { user } = useAuthStore();
  return (
    <div className="flex flex-wrap gap-3 p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center flex-1 min-w-[200px] gap-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
        <Search className="w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name or email..."
          className="flex-1 bg-transparent text-sm outline-none text-gray-700 dark:text-gray-200 placeholder-gray-400"
          value={searchInput}
          onChange={(e) => onSearchInput(e.target.value)}
        />
      </div>

      <select
        value={filters.status}
        onChange={(e) => onChange({ status: e.target.value as any, page: 1 })}
        className="px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
      >
        <option value="">All Statuses</option>
        {['new', 'contacted', 'qualified', 'lost'].map((s) => (
          <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
        ))}
      </select>

      <select
        value={filters.source}
        onChange={(e) => onChange({ source: e.target.value as any, page: 1 })}
        className="px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
      >
        <option value="">All Sources</option>
        {['website', 'instagram', 'referral'].map((s) => (
          <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
        ))}
      </select>

      <select
        value={filters.sortOrder}
        onChange={(e) => onChange({ sortOrder: e.target.value as any })}
        className="px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
      >
        <option value="desc">Latest First</option>
        <option value="asc">Oldest First</option>
      </select>

      <div className="flex gap-2 ml-auto">
        {user?.role === 'admin' && (
          <button onClick={onExport} className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 transition-colors">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        )}
        <button onClick={onAdd} className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors">
          <Plus className="w-4 h-4" />
          Add Lead
        </button>
      </div>
    </div>
  );
};
