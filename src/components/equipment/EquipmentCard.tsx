import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

export default function EquipmentCard({ equipment }: { equipment: any }) {
  const locale = useLocale();
  const t = useTranslations('Equipment');
  const name = locale === 'en' ? equipment.nameEn : equipment.nameFr;

  return (
    <div className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
      <div className="h-48 bg-gray-200 relative">
        {equipment.images?.[0] ? (
          <img 
            src={equipment.images[0]} 
            alt={name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            No Image
          </div>
        )}
        <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-bold shadow-sm">
          {equipment.dailyRate} XAF / Day
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1 truncate">{name}</h3>
        <p className="text-gray-500 text-sm mb-3">
          {equipment.region}, {equipment.town}
        </p>

        <div className="flex justify-between items-center pt-2 border-t mt-2">
           <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
             equipment.condition === 'Excellent' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
           }`}>
             {equipment.condition}
           </span>
          <Link 
            href={`/${locale}/equipment/${equipment.id}`}
            className="text-blue-600 font-semibold text-sm hover:underline"
          >
            {t('bookNow')} →
          </Link>
        </div>
      </div>
    </div>
  );
}
