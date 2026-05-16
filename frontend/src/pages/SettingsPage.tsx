import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { 
  User, 
  Palette, 
  ShieldAlert, 
  Info,
  Save,
  Moon,
  Sun
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useTheme } from '../context/ThemeContext';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';

const SettingsPage: React.FC = () => {
  const { user } = useAuthStore();
  const { theme, toggleTheme } = useTheme();
  
  const [name, setName] = useState(user?.name || '');
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  const handleSaveProfile = () => {
    toast.success('Profile updated successfully!');
  };

  const handleResetData = () => {
    toast.error('This feature is coming soon!');
    setIsResetModalOpen(false);
  };

  interface SettingSectionProps {
    icon: React.ElementType;
    title: string;
    description: string;
    children: React.ReactNode;
  }

  const SettingSection = ({ icon: Icon, title, description, children }: SettingSectionProps) => (
    <div className="bg-white dark:bg-[#0b1a2e] rounded-2xl shadow-sm border border-slate-200 dark:border-white/[0.07] overflow-hidden transition-all duration-200">
      <div className="p-6 border-b border-slate-100 dark:border-white/[0.05] bg-slate-50/50 dark:bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#2563eb]/10 dark:bg-[#2563eb]/15 rounded-lg">
            <Icon className="w-5 h-5 text-[#3b82f6]" />
          </div>
          <div>
            <h3 className="text-base font-[600] text-slate-800 dark:text-white">{title}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{description}</p>
          </div>
        </div>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn pb-12 p-6">
      <div>
        <h1 className="text-2xl font-[800] text-slate-900 dark:text-white tracking-tight">Settings</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage your account preferences and system configuration</p>
      </div>

      {/* Profile Settings */}
      <SettingSection 
        icon={User} 
        title="Profile Settings" 
        description="Update your personal information and access level"
      >
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Input 
              label="Full Name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Your name"
            />
            <div className="space-y-1.5">
              <label className="text-sm font-[500] text-slate-700 dark:text-slate-300">Email Address</label>
              <input 
                type="email" 
                value={user?.email || ''} 
                disabled 
                className="w-full px-4 py-2.5 text-sm rounded-[9px] border border-slate-200 dark:border-white/[0.1] bg-slate-100 dark:bg-white/[0.03] text-slate-400 dark:text-slate-500 cursor-not-allowed outline-none font-medium"
              />
              <p className="text-[10px] text-slate-400 dark:text-slate-600 ml-1">Email cannot be changed manually</p>
            </div>
          </div>
          <div className="flex items-center justify-between p-5 bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.05] rounded-xl">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-[#2563eb] flex items-center justify-center text-white font-bold shadow-md">
                {user?.name?.[0]?.toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">Current Access</p>
                <div className="mt-1">
                  {user?.role === 'admin' ? (
                    <span className="bg-[#2563eb]/10 text-[#3b82f6] border border-[#2563eb]/20 px-3 py-1 rounded-full text-xs font-[600]">
                      Administrator
                    </span>
                  ) : (
                    <span className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-[600]">
                      Sales Representative
                    </span>
                  )}
                </div>
              </div>
            </div>
            <Button onClick={handleSaveProfile} variant="primary" className="flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save Profile
            </Button>
          </div>
        </div>
      </SettingSection>

      {/* Appearance */}
      <SettingSection 
        icon={Palette} 
        title="Appearance" 
        description="Customize the look and feel of your dashboard"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="p-3.5 bg-slate-100 dark:bg-white/[0.05] rounded-xl border border-slate-200 dark:border-white/[0.07]">
              {theme === 'dark' ? <Moon className="w-6 h-6 text-[#3b82f6]" /> : <Sun className="w-6 h-6 text-amber-500" />}
            </div>
            <div>
              <p className="font-bold text-slate-900 dark:text-white">Dark Mode</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Switch between light and dark visual themes</p>
            </div>
          </div>
          <button 
            onClick={toggleTheme}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all focus:outline-none ring-2 ring-offset-2 ring-transparent focus:ring-[#2563eb] ${theme === 'dark' ? 'bg-[#2563eb]' : 'bg-slate-300'}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>
      </SettingSection>

      {/* Account Info */}
      <SettingSection 
        icon={Info} 
        title="System Permissions" 
        description="Details about your workspace access and roles"
      >
        <div className="space-y-6">
          <div className="flex justify-between py-4 border-b border-slate-100 dark:border-white/[0.05]">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Member Status</span>
            <span className="text-sm font-bold text-[#2563eb]">Active Member</span>
          </div>
          <div className="p-5 bg-slate-50 dark:bg-white/[0.03] rounded-xl border border-slate-200 dark:border-white/[0.05]">
            <h4 className="text-sm font-[700] text-slate-900 dark:text-white mb-2 uppercase tracking-wide">{user?.role} Permissions</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              {user?.role === 'admin' 
                ? 'Your account has full administrative privileges. You can create, edit, delete any lead records and perform full CSV data exports for analytics.' 
                : 'Your account has sales representative access. You can create new leads and update existing records that you are assigned to.'}
            </p>
          </div>
        </div>
      </SettingSection>

      {/* Danger Zone */}
      {user?.role === 'admin' && (
        <div className="bg-red-50 dark:bg-red-500/[0.05] border border-red-200 dark:border-red-500/[0.15] rounded-2xl p-6 transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-100 dark:bg-red-500/10 rounded-xl">
                <ShieldAlert className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="text-base font-[600] text-red-600 dark:text-red-400">Danger Zone: Reset All Data</p>
                <p className="text-sm text-red-500/70 dark:text-red-400/50">This will permanently delete all leads and reset the workspace.</p>
              </div>
            </div>
            <Button 
              variant="danger" 
              onClick={() => setIsResetModalOpen(true)}
            >
              Reset Database
            </Button>
          </div>
        </div>
      )}

      {/* Reset Confirmation Modal */}
      <Modal 
        isOpen={isResetModalOpen} 
        onClose={() => setIsResetModalOpen(false)} 
        title="Reset All Data?"
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Are you absolutely sure you want to reset all leads data? This action will permanently delete all records from the database and cannot be undone.
          </p>
          <div className="flex justify-end gap-3 mt-8">
            <Button variant="secondary" onClick={() => setIsResetModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleResetData}>
              Confirm Reset
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SettingsPage;
