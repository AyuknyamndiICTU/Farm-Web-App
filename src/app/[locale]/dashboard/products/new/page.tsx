import { useTranslations } from 'next-intl';
import ProductForm from '@/components/dashboard/ProductForm';

export default function NewProductPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations('Dashboard');

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">{t('listNewProduct')}</h1>
      <ProductForm t={t} locale={locale} />
    </div>
  );
}
