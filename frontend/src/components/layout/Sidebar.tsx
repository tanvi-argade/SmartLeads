import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { LayoutDashboard, LogOut, PieChart, Settings } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

interface SidebarProps {
  isMobileOpen: boolean;
  setIsMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, setIsMobileOpen }) => {
  const { user, logout } = useAuthStore();

  const navItems = [
    { icon: LayoutDashboard, label: 'Leads', path: '/dashboard/leads' },
    { icon: PieChart, label: 'Analytics', path: '/dashboard/analytics' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/50 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-64 h-screen flex flex-col
        bg-white dark:bg-[#07131f]
        border-r border-slate-200 dark:border-white/[0.07]
        transform transition-transform duration-200 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="px-6 py-5 border-b border-slate-200 dark:border-white/[0.07] flex-shrink-0">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#2563eb] rounded-xl flex items-center justify-center shadow-lg shadow-[#2563eb]/30">
              <LayoutDashboard className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Smart<span className="text-[#3b82f6]">Leads</span>
            </span>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              onClick={() => setIsMobileOpen(false)}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-2.5 rounded-[9px] mx-2 transition-all duration-150
                ${isActive 
                  ? 'bg-[#2563eb]/10 dark:bg-[#2563eb]/15 text-[#2563eb] dark:text-[#3b82f6] text-sm font-[700] border border-[#2563eb]/20' 
                  : 'text-slate-500 dark:text-slate-400 text-sm font-medium hover:bg-slate-100 dark:hover:bg-white/[0.05] hover:text-slate-900 dark:hover:text-white'}
              `}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex-shrink-0 p-4 border-t border-slate-200 dark:border-white/[0.07]">
          <button 
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-[9px] text-red-400 hover:bg-red-500/10 text-sm font-medium transition-all duration-150"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};
