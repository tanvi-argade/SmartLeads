import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PaginationMeta } from '../../types/api.types';

interface PaginationProps {
  meta: PaginationMeta;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ meta, onPageChange }) => {
  const { page, totalPages, hasPrevPage, hasNextPage, total, limit } = meta;
  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  return (
    <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 dark:border-white/[0.05] bg-slate-50/50 dark:bg-white/[0.02]">
      <p className="text-xs font-medium text-slate-500 dark:text-slate-500">
        Showing <span className="text-slate-900 dark:text-slate-300">{start}</span>–<span className="text-slate-900 dark:text-slate-300">{end}</span> of <span className="text-slate-900 dark:text-slate-300">{total}</span>
      </p>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={!hasPrevPage}
          className="p-2 rounded-[8px] border border-slate-200 dark:border-white/[0.07] text-slate-600 dark:text-slate-400 disabled:opacity-30 hover:bg-slate-100 dark:hover:bg-white/[0.05] transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        
        <div className="flex items-center gap-1">
          <span className="px-3 py-1 rounded-[6px] bg-[#2563eb] text-white text-xs font-[700] shadow-sm">
            {page}
          </span>
          <span className="text-xs font-bold text-slate-400 px-1">/</span>
          <span className="px-3 py-1 rounded-[6px] text-slate-600 dark:text-slate-400 text-xs font-[700]">
            {totalPages}
          </span>
        </div>

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={!hasNextPage}
          className="p-2 rounded-[8px] border border-slate-200 dark:border-white/[0.07] text-slate-600 dark:text-slate-400 disabled:opacity-30 hover:bg-slate-100 dark:hover:bg-white/[0.05] transition-all"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
