import { useTranslations } from 'next-intl';
import { cookies } from 'next/headers';
import { Users, Package, Clock, Banknote } from 'lucide-react';

async function getAdminStats() {
  const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  const token = cookies().get('token')?.value;
  
  const res = await fetch(`${apiBase}/api/admin/stats`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store'
  });
  
  if (!res.ok) return null;
  return res.json();
}

export default async function AdminDashboardPage() {
  const t = useTranslations('Admin');
  const stats = await getAdminStats();

  if (!stats) return <div>Failed to load stats</div>;

  const statCards = [
    { label: t('stats.totalUsers'), value: stats.totalUsers, icon: Users, color: 'text-blue-600' },
    { label: 'Active Listings', value: stats.totalProducts, icon: Package, color: 'text-green-600' },
    { label: t('stats.pendingVerifications'), value: stats.pendingVerifications, icon: Clock, color: 'text-orange-600' },
    { label: t('stats.totalRevenue'), value: `${stats.revenue} XAF`, icon: Banknote, color: 'text-emerald-600' },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-slate-800">{t('title')}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-lg bg-slate-50 ${card.color}`}>
                <card.icon size={24} />
              </div>
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">{card.label}</p>
              <p className="text-2xl font-bold text-slate-900">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
         <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
            <div className="text-slate-400 text-sm italic">Activity log coming soon...</div>
         </div>
         <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold mb-4">Platform Health</h2>
            <div className="flex items-center gap-2 text-green-600 font-medium">
               <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
               All systems operational
            </div>
         </div>
      </div>
    </div>
  );
}
