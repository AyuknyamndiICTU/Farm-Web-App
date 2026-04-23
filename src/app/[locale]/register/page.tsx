import { useTranslations } from 'next-intl';
import RegisterForm from '@/components/auth/RegisterForm';

export default function RegisterPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations('Auth');

  return (
    <div className="py-12 bg-gray-50 min-h-[90vh]">
      <div className="container mx-auto px-4">
        <RegisterForm t={t} locale={locale} />
      </div>
    </div>
  );
}
