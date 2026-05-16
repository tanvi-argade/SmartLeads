import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="text-sm font-500 text-slate-700 dark:text-slate-300">
            {label}
          </label>
        )}
        <input
          ref={ref}
          {...props}
          className={`w-full bg-slate-100 dark:bg-white/[0.05] border transition-all duration-200
            ${error 
              ? 'border-red-400 focus:ring-red-500/20' 
              : 'border-slate-200 dark:border-white/[0.1] focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb]/30'
            } 
            text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500
            rounded-[9px] px-4 py-2.5 text-sm outline-none ${props.className ?? ''}`}
        />
        {error && (
          <p className="text-xs text-red-500 font-medium">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
