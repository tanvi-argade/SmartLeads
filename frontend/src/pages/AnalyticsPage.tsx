import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Users, 
  UserPlus, 
  UserCheck, 
  UserX, 
  TrendingUp, 
  BarChart3, 
  Clock 
} from 'lucide-react';
import { getLeadsApi } from '../api/leads.api';
import { Spinner } from '../components/ui/Spinner';
import { Badge } from '../components/ui/Badge';

const AnalyticsPage: React.FC = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['analytics-leads'],
    queryFn: () => getLeadsApi({ 
      page: 1, 
      limit: 100, 
      sortOrder: 'desc', 
      search: '', 
      status: '', 
      source: '' 
    }),
  });

  if (isLoading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-500">
        <p>Failed to load analytics data. Please try again later.</p>
      </div>
    );
  }

  const leads = data?.data || [];
  const totalLeads = leads.length;
  const newLeads = leads.filter(l => l.status === 'new').length;
  const qualifiedLeads = leads.filter(l => l.status === 'qualified').length;
  const lostLeads = leads.filter(l => l.status === 'lost').length;

  const statusCounts = {
    new: newLeads,
    contacted: leads.filter(l => l.status === 'contacted').length,
    qualified: qualifiedLeads,
    lost: lostLeads,
  };

  const sourceCounts = {
    website: leads.filter(l => l.source === 'website').length,
    instagram: leads.filter(l => l.source === 'instagram').length,
    referral: leads.filter(l => l.source === 'referral').length,
  };

  const recentLeads = leads.slice(0, 5);

  interface StatCardProps {
    icon: React.ElementType;
    label: string;
    value: string | number;
    color: string;
  }

  const StatCard = ({ icon: Icon, label, value, color }: StatCardProps) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
          <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{label}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
      </div>
    </div>
  );

  interface ProgressBarProps {
    label: string;
    count: number;
    total: number;
    color: string;
  }

  const ProgressBar = ({ label, count, total, color }: ProgressBarProps) => {
    const percentage = total > 0 ? (count / total) * 100 : 0;
    return (
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400 capitalize">{label}</span>
          <span className="font-semibold text-gray-900 dark:text-white">{count} ({percentage.toFixed(0)}%)</span>
        </div>
        <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className={`h-full ${color} transition-all duration-500`} 
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics Overview</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Real-time performance metrics from your lead database</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={Users} label="Total Leads" value={totalLeads} color="bg-indigo-600" />
        <StatCard icon={UserPlus} label="New Leads" value={newLeads} color="bg-blue-500" />
        <StatCard icon={UserCheck} label="Qualified" value={qualifiedLeads} color="bg-emerald-500" />
        <StatCard icon={UserX} label="Lost Leads" value={lostLeads} color="bg-rose-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Status Breakdown */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-gray-900 dark:text-white">Leads by Status</h3>
          </div>
          <div className="space-y-6">
            <ProgressBar label="New" count={statusCounts.new} total={totalLeads} color="bg-blue-500" />
            <ProgressBar label="Contacted" count={statusCounts.contacted} total={totalLeads} color="bg-amber-500" />
            <ProgressBar label="Qualified" count={statusCounts.qualified} total={totalLeads} color="bg-emerald-500" />
            <ProgressBar label="Lost" count={statusCounts.lost} total={totalLeads} color="bg-rose-500" />
          </div>
        </div>

        {/* Source Breakdown */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-8">
            <BarChart3 className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-gray-900 dark:text-white">Leads by Source</h3>
          </div>
          <div className="space-y-6">
            <ProgressBar label="Website" count={sourceCounts.website} total={totalLeads} color="bg-indigo-600" />
            <ProgressBar label="Instagram" count={sourceCounts.instagram} total={totalLeads} color="bg-pink-500" />
            <ProgressBar label="Referral" count={sourceCounts.referral} total={totalLeads} color="bg-purple-500" />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
          <Clock className="w-5 h-5 text-indigo-600" />
          <h3 className="font-bold text-gray-900 dark:text-white">Recent Activity</h3>
        </div>
        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          {recentLeads.length > 0 ? (
            recentLeads.map((lead) => (
              <div key={lead._id} className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 font-bold">
                    {lead.name[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{lead.name}</p>
                    <p className="text-xs text-gray-500">{lead.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge type="status" value={lead.status} />
                  <span className="text-xs text-gray-400">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-500">No recent activity found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
