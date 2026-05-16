import React from 'react';
import { LeadStatus, LeadSource } from '../../types/lead.types';

const statusColors: Record<LeadStatus, string> = {
  new: 'bg-[#3b82f6]/10 text-[#3b82f6] border border-[#3b82f6]/20',
  contacted: 'bg-[#8b5cf6]/10 text-[#8b5cf6] border border-[#8b5cf6]/20',
  qualified: 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20',
  lost: 'bg-red-500/10 text-red-500 border border-red-500/20',
};

const sourceColors: Record<LeadSource, string> = {
  website: 'bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10',
  instagram: 'bg-pink-500/10 text-pink-500 border border-pink-500/20',
  referral: 'bg-indigo-500/10 text-indigo-500 border border-indigo-500/20',
};

interface BadgeProps {
  type: 'status' | 'source';
  value: LeadStatus | LeadSource;
}

export const Badge: React.FC<BadgeProps> = ({ type, value }) => {
  const colorClass = type === 'status'
    ? statusColors[value as LeadStatus]
    : sourceColors[value as LeadSource];
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-[600] capitalize transition-colors duration-150 ${colorClass}`}>
      {value}
    </span>
  );
};
