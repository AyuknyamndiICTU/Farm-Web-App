import { useTranslations } from 'next-intl';
import EquipmentCard from '@/components/equipment/EquipmentCard';

async function getEquipment(searchParams: any) {
  const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  const query = new URLSearchParams(searchParams).toString();
  const res = await fetch(`${apiBase}/api/equipment?${query}`, { cache: 'no-store' });
  
  if (!res.ok) return [];
  return res.json();
}

export default async function EquipmentPage({ 
  params: { locale },
  searchParams 
}: { 
  params: { locale: string },
  searchParams: any
}) {
  const t = useTranslations('Equipment');
  const equipmentList = await getEquipment(searchParams);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">{t('title')}</h1>
        
        <div className="flex w-full md:w-auto gap-2">
          <input 
            type="text" 
            placeholder="Search equipment..."
            className="flex-grow md:w-64 p-2 border rounded-md"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium">
            Search
          </button>
        </div>
      </div>

      {equipmentList.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p className="text-xl">{t('noEquipment')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {equipmentList.map((item: any) => (
            <EquipmentCard key={item.id} equipment={item} />
          ))}
        </div>
      )}
    </div>
  );
}
