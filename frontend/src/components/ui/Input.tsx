import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </label>
        )}
        <input
          ref={ref}
          {...props}
          className={`w-full px-4 py-2.5 text-sm rounded-lg border 
            ${error 
              ? 'border-red-400 focus:ring-red-500/20' 
              : 'border-gray-200 dark:border-gray-600 focus:border-indigo-500 focus:ring-indigo-500/20'
            } 
            bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
            outline-none focus:ring-2 transition ${props.className ?? ''}`}
        />
        {error && (
          <p className="text-xs text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
