import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  Sun,
  Moon
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const LandingPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-[#05101f] font-['Inter',_sans-serif] text-slate-900 dark:text-white transition-colors duration-500 overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/85 dark:bg-[#05101f]/85 backdrop-blur-md border-b border-slate-200 dark:border-[rgba(255,255,255,0.06)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight">
                Smart<span className="text-[#3b82f6]">Leads</span>
              </span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-slate-500 dark:text-[#94a3b8] hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <Link
                to="/login"
                className="text-sm font-medium text-slate-500 dark:text-[#94a3b8] hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-[0_0_16px_rgba(37,99,235,0.25)]"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4">
        {/* Radial Gradient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[400px] bg-[#3b82f6]/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#3b82f6]/30 bg-[#3b82f6]/5 dark:bg-[#3b82f6]/5 mb-8 animate-fadeIn">
            <Sparkles className="w-3.5 h-3.5 text-[#3b82f6]" />
            <span className="text-[12px] font-semibold tracking-wide uppercase text-[#3b82f6]">
              Powered by ServiceHive
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-[800] leading-tight tracking-[-2px] mb-6 text-slate-900 dark:text-[#e2e8f0]">
            Smart Lead Management for <br className="hidden sm:block" />
            <span className="text-[#3b82f6]">Growing Businesses</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-500 dark:text-[#94a3b8] mb-10 max-w-2xl mx-auto leading-relaxed">
            Track, filter, and convert leads faster with role-based access,
            CSV export, and a real-time dashboard — all in one place.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              to="/register"
              className="w-full sm:w-auto bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-[0_0_32px_rgba(37,99,235,0.35)] active:scale-[0.98]"
            >
              Get Started Free
            </Link>
            <Link
              to="/login"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-slate-700 dark:text-[#e2e8f0] hover:bg-slate-100 dark:hover:bg-white/5 border border-slate-200 dark:border-transparent hover:border-slate-300 dark:hover:border-white/10 transition-all active:scale-[0.98]"
            >
              Login to Dashboard <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <p className="text-[13px] font-medium text-slate-400 dark:text-[#64748b] tracking-wide uppercase">
            Built for the internship assignment @ <span className="text-[#3b82f6]">ServiceHive</span>
          </p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
