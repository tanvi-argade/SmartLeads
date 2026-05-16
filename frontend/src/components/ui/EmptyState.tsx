import React from 'react';
import { Users } from 'lucide-react';

export const EmptyState: React.FC<{ message?: string }> = ({ message = 'No leads found' }) => (
  <div className="flex flex-col items-center justify-center py-16 text-gray-400 dark:text-gray-500">
    <Users className="w-12 h-12 mb-3 opacity-50" />
    <p className="text-sm">{message}</p>
  </div>
);
