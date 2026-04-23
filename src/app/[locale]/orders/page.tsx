import { useTranslations } from 'next-intl';
import BuyerOrderList from '@/components/orders/BuyerOrderList';
import { cookies } from 'next/headers';

async function getBuyerOrders() {
  const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  const token = cookies().get('token')?.value;
  
  const res = await fetch(`${apiBase}/api/orders/my`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store'
  });
  
  if (!res.ok) return [];
  return res.json();
}

export default async function BuyerOrdersPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations('Navigation');
  const orders = await getBuyerOrders();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">{t('orders')}</h1>
      <BuyerOrderList orders={orders} locale={locale} />
    </div>
  );
}
