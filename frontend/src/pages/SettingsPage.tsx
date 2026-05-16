import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { 
  User, 
  Settings, 
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
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/20">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-600 bg-opacity-10 rounded-lg">
            <Icon className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white">{title}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{description}</p>
          </div>
        </div>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your account preferences and system configuration</p>
      </div>

      {/* Profile Settings */}
      <SettingSection 
        icon={User} 
        title="Profile Settings" 
        description="Update your personal information"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input 
              label="Full Name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Your name"
            />
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
              <input 
                type="email" 
                value={user?.email || ''} 
                disabled 
                className="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-500 cursor-not-allowed outline-none"
              />
              <p className="text-[10px] text-gray-400">Email cannot be changed</p>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-indigo-50/50 dark:bg-indigo-900/10 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                {user?.name[0].toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Access Level</p>
                <Badge type="role" value={user?.role || 'sales'} />
              </div>
            </div>
            <Button onClick={handleSaveProfile} className="flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save Changes
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
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-xl">
              {theme === 'dark' ? <Moon className="w-6 h-6 text-indigo-400" /> : <Sun className="w-6 h-6 text-amber-500" />}
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">Dark Mode</p>
              <p className="text-sm text-gray-500">Switch between light and dark theme</p>
            </div>
          </div>
          <button 
            onClick={toggleTheme}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ring-2 ring-offset-2 ring-transparent focus:ring-indigo-500 ${theme === 'dark' ? 'bg-indigo-600' : 'bg-gray-200'}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>
      </SettingSection>

      {/* Account Info */}
      <SettingSection 
        icon={Info} 
        title="Account Information" 
        description="Details about your workspace permissions"
      >
        <div className="space-y-6">
          <div className="flex justify-between py-3 border-b border-gray-100 dark:border-gray-700">
            <span className="text-sm text-gray-500">Member Since</span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">May 2026</span>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-700">
            <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1 capitalize">{user?.role} Role</h4>
            <p className="text-sm text-gray-500">
              {user?.role === 'admin' 
                ? 'Full access — can create, edit, delete leads and export data' 
                : 'Limited access — can create and edit leads only'}
            </p>
          </div>
        </div>
      </SettingSection>

      {/* Danger Zone */}
      {user?.role === 'admin' && (
        <SettingSection 
          icon={ShieldAlert} 
          title="Danger Zone" 
          description="Irreversible system actions"
        >
          <div className="p-4 border border-red-200 dark:border-red-900/30 bg-red-50/30 dark:bg-red-900/10 rounded-xl flex items-center justify-between">
            <div>
              <p className="font-bold text-red-600 dark:text-red-400">Reset All Data</p>
              <p className="text-sm text-red-500/70">Wipe all leads and start fresh. This cannot be undone.</p>
            </div>
            <Button 
              variant="danger" 
              onClick={() => setIsResetModalOpen(true)}
            >
              Reset Data
            </Button>
          </div>
        </SettingSection>
      )}

      {/* Reset Confirmation Modal */}
      <Modal 
        isOpen={isResetModalOpen} 
        onClose={() => setIsResetModalOpen(false)} 
        title="Reset All Data?"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Are you absolutely sure you want to reset all leads data? This action will permanently delete all records from the database.
          </p>
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="secondary" onClick={() => setIsResetModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleResetData}>
              Yes, Reset Everything
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SettingsPage;
