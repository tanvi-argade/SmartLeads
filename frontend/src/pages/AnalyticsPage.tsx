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
    delay?: string;
  }

  const StatCard = ({ icon: Icon, label, value, delay = '0s' }: StatCardProps) => (
    <div 
      className="bg-white dark:bg-[#0b1a2e] border border-slate-200 dark:border-white/[0.07] rounded-2xl p-5 hover:border-slate-300 dark:hover:border-white/[0.12] transition-all duration-200 animate-fadeIn opacity-0"
      style={{ animationDelay: delay }}
    >
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-[10px] bg-[#2563eb]/10 dark:bg-[#2563eb]/15 flex items-center justify-center">
          <Icon className="w-5 h-5 text-[#3b82f6]" />
        </div>
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-[400]">{label}</p>
          <p className="text-3xl font-[800] text-slate-900 dark:text-white tracking-tight">{value}</p>
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
    const [width, setWidth] = React.useState(0);

    React.useEffect(() => {
      const timer = setTimeout(() => setWidth(percentage), 100);
      return () => clearTimeout(timer);
    }, [percentage]);

    return (
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-semibold">
          <span className="text-slate-500 dark:text-slate-400 capitalize">{label}</span>
          <span className="text-slate-900 dark:text-slate-200">{count} ({percentage.toFixed(0)}%)</span>
        </div>
        <div className="h-2 bg-slate-100 dark:bg-white/[0.05] rounded-full overflow-hidden">
          <div 
            className={`h-full ${color} rounded-full transition-all duration-700 ease-out`} 
            style={{ width: `${width}%` }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 bg-slate-50 dark:bg-[#05101f] min-h-screen space-y-8 animate-fadeIn">
      <div>
        <h1 className="text-2xl font-[800] text-slate-900 dark:text-white tracking-tight">Analytics Overview</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Detailed performance metrics from your lead database</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={Users} label="Total Leads" value={totalLeads} delay="0s" />
        <StatCard icon={UserPlus} label="New Leads" value={newLeads} delay="0.05s" />
        <StatCard icon={UserCheck} label="Qualified" value={qualifiedLeads} delay="0.1s" />
        <StatCard icon={UserX} label="Lost Leads" value={lostLeads} delay="0.15s" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Status Breakdown */}
        <div className="bg-white dark:bg-[#0b1a2e] border border-slate-200 dark:border-white/[0.07] rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-5 h-5 text-[#3b82f6]" />
            <h3 className="text-base font-[600] text-slate-800 dark:text-white">Leads by Status</h3>
          </div>
          <div className="space-y-6">
            <ProgressBar label="New" count={statusCounts.new} total={totalLeads} color="bg-[#3b82f6]" />
            <ProgressBar label="Contacted" count={statusCounts.contacted} total={totalLeads} color="bg-[#8b5cf6]" />
            <ProgressBar label="Qualified" count={statusCounts.qualified} total={totalLeads} color="bg-emerald-500" />
            <ProgressBar label="Lost" count={statusCounts.lost} total={totalLeads} color="bg-red-500" />
          </div>
        </div>

        {/* Source Breakdown */}
        <div className="bg-white dark:bg-[#0b1a2e] border border-slate-200 dark:border-white/[0.07] rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="w-5 h-5 text-[#3b82f6]" />
            <h3 className="text-base font-[600] text-slate-800 dark:text-white">Leads by Source</h3>
          </div>
          <div className="space-y-6">
            <ProgressBar label="Website" count={sourceCounts.website} total={totalLeads} color="bg-[#2563eb]" />
            <ProgressBar label="Instagram" count={sourceCounts.instagram} total={totalLeads} color="bg-pink-500" />
            <ProgressBar label="Referral" count={sourceCounts.referral} total={totalLeads} color="bg-purple-500" />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-[#0b1a2e] border border-slate-200 dark:border-white/[0.07] rounded-2xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100 dark:border-white/[0.05] bg-slate-50/50 dark:bg-white/[0.02] flex items-center gap-3">
          <Clock className="w-5 h-5 text-[#3b82f6]" />
          <h3 className="text-base font-[600] text-slate-800 dark:text-white">Recent Activity</h3>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-white/[0.05]">
          {recentLeads.length > 0 ? (
            recentLeads.map((lead) => (
              <div key={lead._id} className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-white/[0.03] transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#2563eb] flex items-center justify-center text-white font-bold text-sm shadow-sm">
                    {lead.name[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white text-sm">{lead.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-500">{lead.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge type="status" value={lead.status} />
                  <span className="text-xs text-slate-400 font-medium">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center text-slate-500 dark:text-slate-500 italic text-sm">No recent activity recorded yet.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
