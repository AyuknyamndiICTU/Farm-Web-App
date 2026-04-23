import ProductActions from '@/components/products/ProductActions';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

async function getProduct(id: string) {
  const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  const res = await fetch(`${apiBase}/api/products/${id}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

export default async function ProductDetailsPage({ 
  params: { id, locale } 
}: { 
  params: { id: string, locale: string } 
}) {
  const product = await getProduct(id);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <Link href={`/${locale}/products`} className="text-green-600 hover:underline">
          Back to Marketplace
        </Link>
      </div>
    );
  }

  const title = locale === 'en' ? product.titleEn : product.titleFr;
  const description = locale === 'en' ? product.descriptionEn : product.descriptionFr;

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Link 
          href={`/${locale}/products`} 
          className="inline-flex items-center text-gray-600 hover:text-green-600 mb-6 transition"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Marketplace
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="h-[400px] bg-gray-200">
                {product.images?.[0] ? (
                  <img src={product.images[0]} alt={title} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
                )}
              </div>
              <div className="p-8">
                <h1 className="text-3xl font-bold mb-4">{title}</h1>
                <div className="prose max-w-none text-gray-600">
                   {description || 'No description provided.'}
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-xl font-bold mb-4">Details</h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Category</p>
                  <p className="font-semibold">{locale === 'en' ? product.category?.nameEn : product.category?.nameFr}</p>
                </div>
                <div>
                  <p className="text-gray-500">Organic</p>
                  <p className="font-semibold">{product.isOrganic ? 'Yes' : 'No'}</p>
                </div>
                <div>
                  <p className="text-gray-500">Harvest Date</p>
                  <p className="font-semibold">{product.harvestDate ? new Date(product.harvestDate).toLocaleDateString() : 'N/A'}</p>
                </div>
                <div>
                  <p className="text-gray-500">Stock Available</p>
                  <p className="font-semibold">{product.quantity} {product.unit}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Actions */}
          <div className="lg:col-span-1">
            <ProductActions product={product} locale={locale} />
          </div>
        </div>
      </div>
    </div>
  );
}
