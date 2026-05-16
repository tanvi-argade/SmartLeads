import React from 'react';
import { LeadStatus, LeadSource } from '../../types/lead.types';

const statusColors: Record<LeadStatus, string> = {
  new: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  contacted: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  qualified: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  lost: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};

const sourceColors: Record<LeadSource, string> = {
  website: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  instagram: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
  referral: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
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
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${colorClass}`}>
      {value}
    </span>
  );
};
