'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { LayoutDashboard, Package, ShoppingBag, Settings } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function DashboardSidebar() {
  const t = useTranslations('Dashboard');
  const locale = useLocale();
  const pathname = usePathname();

  const links = [
    { href: `/${locale}/dashboard`, icon: LayoutDashboard, label: 'Overview' },
    { href: `/${locale}/dashboard/products`, icon: Package, label: t('myProducts') },
    { href: `/${locale}/dashboard/orders`, icon: ShoppingBag, label: t('manageOrders') },
  ];

  return (
    <aside className="w-64 bg-white border-r min-h-[calc(100vh-64px)] p-4 hidden md:block">
      <div className="space-y-2">
        {links.map((link) => (
          <Link 
            key={link.href} 
            href={link.href}
            className={`flex items-center gap-3 p-3 rounded-lg transition ${
              pathname === link.href ? 'bg-green-50 text-green-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'
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
