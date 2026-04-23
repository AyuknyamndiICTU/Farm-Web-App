import { useTranslations } from 'next-intl';

export default function Index() {
  const t = useTranslations('Index');
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-6">
      <h1 className="text-4xl font-bold text-green-700 mb-4">{t('title')}</h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl">{t('description')}</p>
      <button className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition">
        {t('getStarted')}
      </button>

      <div className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-4">
        {['FARMER', 'BUYER', 'WHOLESALER', 'EQUIPMENT_OWNER', 'ADMIN'].map((role) => (
          <div key={role} className="p-4 border rounded-lg shadow-sm bg-white">
            <p className="font-medium text-gray-800">{t(`roles.${role}`)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
