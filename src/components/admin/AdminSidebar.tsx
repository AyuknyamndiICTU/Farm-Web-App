'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Shield, Users, FileText, BarChart } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function AdminSidebar() {
  const t = useTranslations('Admin');
  const locale = useLocale();
  const pathname = usePathname();

  const links = [
    { href: `/${locale}/admin`, icon: Shield, label: 'Overview' },
    { href: `/${locale}/admin/users`, icon: Users, label: t('users') },
    { href: `/${locale}/admin/listings`, icon: FileText, label: t('listings') },
    { href: `/${locale}/admin/analytics`, icon: BarChart, label: t('analytics') },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-[calc(100vh-64px)] p-4 hidden md:block">
      <div className="space-y-2">
        {links.map((link) => (
          <Link 
            key={link.href} 
            href={link.href}
            className={`flex items-center gap-3 p-3 rounded-lg transition ${
              pathname === link.href ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            <link.icon size={20} />
            {link.label}
          </Link>
        ))}
      </div>
    </aside>
  );
}
