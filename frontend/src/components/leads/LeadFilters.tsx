import React from 'react';
import { Search, Download, Plus, X } from 'lucide-react';
import { LeadFilters as FiltersType } from '../../types/lead.types';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../ui/Button';

interface Props {
  filters: FiltersType;
  onChange: (f: Partial<FiltersType>) => void;
  onAdd: () => void;
  onExport: () => void;
  searchInput: string;
  onSearchInput: (v: string) => void;
  onClearFilters: () => void;
}

export const LeadFilters: React.FC<Props> = ({ filters, onChange, onAdd, onExport, searchInput, onSearchInput, onClearFilters }) => {
  const { user } = useAuthStore();
  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center flex-1 min-w-[280px] gap-2.5 px-4 py-2.5 rounded-[9px] border border-slate-200 dark:border-white/[0.1] bg-slate-50 dark:bg-white/[0.05] transition-all duration-200 focus-within:ring-1 focus-within:ring-[#2563eb]/30 focus-within:border-[#2563eb]">
        <Search className="w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search leads by name or email..."
          className="flex-1 bg-transparent text-sm outline-none text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
          value={searchInput}
          onChange={(e) => onSearchInput(e.target.value)}
        />
        {(searchInput || filters.status || filters.source) && (
          <button 
            onClick={onClearFilters} 
            className="text-[11px] font-[600] uppercase tracking-wider text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1.5"
          >
            <X className="w-3.5 h-3.5" /> Clear
          </button>
        )}
      </div>

      <div className="flex items-center gap-3">
        <select
          value={filters.status}
          onChange={(e) => onChange({ status: e.target.value as any, page: 1 })}
          className="px-3 py-2.5 text-sm rounded-[9px] border border-slate-200 dark:border-white/[0.1] bg-slate-50 dark:bg-white/[0.05] text-slate-700 dark:text-slate-200 outline-none focus:border-[#2563eb] transition-all cursor-pointer"
        >
          <option value="">All Statuses</option>
          {['new', 'contacted', 'qualified', 'lost'].map((s) => (
            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
          ))}
        </select>

        <select
          value={filters.source}
          onChange={(e) => onChange({ source: e.target.value as any, page: 1 })}
          className="px-3 py-2.5 text-sm rounded-[9px] border border-slate-200 dark:border-white/[0.1] bg-slate-50 dark:bg-white/[0.05] text-slate-700 dark:text-slate-200 outline-none focus:border-[#2563eb] transition-all cursor-pointer"
        >
          <option value="">All Sources</option>
          {['website', 'instagram', 'referral'].map((s) => (
            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
          ))}
        </select>

        <select
          value={filters.sortOrder}
          onChange={(e) => onChange({ sortOrder: e.target.value as any })}
          className="px-3 py-2.5 text-sm rounded-[9px] border border-slate-200 dark:border-white/[0.1] bg-slate-50 dark:bg-white/[0.05] text-slate-700 dark:text-slate-200 outline-none focus:border-[#2563eb] transition-all cursor-pointer"
        >
          <option value="desc">Latest First</option>
          <option value="asc">Oldest First</option>
        </select>
      </div>

      <div className="flex gap-2 ml-auto">
        {user?.role === 'admin' && (
          <Button variant="secondary" onClick={onExport} className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>
        )}
        <Button variant="primary" onClick={onAdd} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Lead
        </Button>
      </div>
    </div>
  );
};
