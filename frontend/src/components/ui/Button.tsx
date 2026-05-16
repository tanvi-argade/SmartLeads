import React from 'react';

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'danger' }> = ({ children, variant = 'primary', ...props }) => {
  const styles = {
    primary: 'bg-indigo-600 hover:bg-indigo-700 text-white',
    secondary: 'border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
  };
  return (
    <button
      {...props}
      className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none ${styles[variant]} ${props.className || ''}`}
    >
      {children}
    </button>
  );
};
