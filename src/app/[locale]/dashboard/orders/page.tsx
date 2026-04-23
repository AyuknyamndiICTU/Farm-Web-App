import { useTranslations } from 'next-intl';
import OrderManager from '@/components/dashboard/OrderManager';
import { cookies } from 'next/headers';

async function getFarmerOrders() {
  const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  const token = cookies().get('token')?.value;
  
  const res = await fetch(`${apiBase}/api/orders/my`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store'
  });
  
  if (!res.ok) return [];
  return res.json();
}

export default async function FarmerOrdersPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations('Dashboard');
  const orders = await getFarmerOrders();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">{t('manageOrders')}</h1>
      <OrderManager orders={orders} locale={locale} />
    </div>
  );
}
