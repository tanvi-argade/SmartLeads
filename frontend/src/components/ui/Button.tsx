import React from 'react';

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'danger' | 'ghost' }> = ({ children, variant = 'primary', ...props }) => {
  const styles = {
    primary: 'bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold rounded-[9px] shadow-[0_0_24px_rgba(37,99,235,0.3)] border-none',
    secondary: 'bg-white/5 dark:bg-white/5 hover:bg-white/10 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/[0.12] rounded-[9px]',
    danger: 'bg-red-600 hover:bg-red-700 text-white rounded-[9px]',
    ghost: 'bg-transparent hover:bg-slate-100 dark:hover:bg-white/10 text-slate-500 dark:text-slate-400 rounded-[9px]',
  };
  return (
    <button
      {...props}
      className={`px-5 py-2.5 text-sm transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed outline-none flex items-center justify-center gap-2 ${styles[variant]} ${props.className || ''}`}
    >
      {children}
    </button>
  );
};
