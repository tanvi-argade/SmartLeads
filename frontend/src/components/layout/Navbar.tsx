import React from 'react';
import { Link } from 'react-router-dom';
import { Moon, Sun, Menu } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useTheme } from '../../context/ThemeContext';

interface NavbarProps {
  setIsMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Navbar: React.FC<NavbarProps> = ({ setIsMobileOpen }) => {
  const { user } = useAuthStore();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="h-16 flex items-center justify-between px-6 bg-white/80 dark:bg-[#07131f]/90 border-b border-slate-200 dark:border-white/[0.07] backdrop-blur-md sticky top-0 z-30 transition-all duration-200">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsMobileOpen(prev => !prev)}
          className="lg:hidden p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
        >
          <Menu className="w-5 h-5" />
        </button>
        <Link to="/" className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white hover:opacity-80 transition-opacity">
          Smart<span className="text-[#3b82f6]">Leads</span>
        </Link>
      </div>
      
      <div className="flex items-center gap-3">
        <button 
          onClick={toggleTheme} 
          className="p-2 rounded-[8px] text-slate-400 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/[0.05] hover:text-slate-700 dark:hover:text-white transition-all duration-150 border border-transparent hover:border-slate-200 dark:hover:border-white/[0.07]"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        <div className="h-8 w-[1px] bg-slate-200 dark:bg-white/[0.07] mx-1" />
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-[500] text-slate-700 dark:text-slate-300 leading-none">
              {user?.name}
            </p>
            <p className="text-[11px] text-slate-400 capitalize mt-1.5 font-medium tracking-wide">{user?.role}</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-[#2563eb] flex items-center justify-center text-white text-sm font-[600] shadow-sm">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>
    </header>
  );
};
