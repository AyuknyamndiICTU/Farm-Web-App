import { useTranslations } from 'next-intl';
import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations('Auth');

  return (
    <div className="py-12 bg-gray-50 min-h-[90vh]">
      <div className="container mx-auto px-4">
        <LoginForm t={t} locale={locale} />
      </div>
    </div>
  );
}
