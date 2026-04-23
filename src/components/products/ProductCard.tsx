import Link from 'next/link';
import { useLocale } from 'next-intl';

interface ProductCardProps {
  product: any;
}

export default function ProductCard({ product }: ProductCardProps) {
  const locale = useLocale();
  const title = locale === 'en' ? product.titleEn : product.titleFr;
  const unit = product.unit;

  return (
    <div className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
      <div className="h-48 bg-gray-200 relative">
        {product.images?.[0] ? (
          <img 
            src={product.images[0]} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            No Image
          </div>
        )}
        <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full font-bold">
          {product.price} XAF / {unit}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1 truncate">{title}</h3>
        <p className="text-gray-500 text-sm mb-3">
          {product.region}, {product.town}
        </p>
        
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-400">
            Seller: {product.seller?.name || 'Unknown'}
          </span>
          <Link 
            href={`/${locale}/products/${product.id}`}
            className="text-green-600 font-semibold text-sm hover:underline"
          >
            Details →
          </Link>
        </div>
      </div>
    </div>
  );
}
