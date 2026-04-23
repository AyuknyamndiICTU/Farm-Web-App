'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingCart, MessageCircle } from 'lucide-react';

export default function ProductActions({ product, locale }: { product: any, locale: string }) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [quantity, setQuantity] = useState(product.minOrder || 1);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleOrder = () => {
    if (!user) {
      router.push(`/${locale}/login?redirect=/products/${product.id}`);
      return;
    }
    // Redirect to checkout/order confirmation page
    router.push(`/${locale}/checkout?productId=${product.id}&quantity=${quantity}`);
  };

  const handleChat = () => {
     if (!user) {
      router.push(`/${locale}/login?redirect=/products/${product.id}`);
      return;
    }
    router.push(`/${locale}/chat?sellerId=${product.sellerId}&productId=${product.id}`);
  }

  return (
    <div className="border rounded-xl p-6 bg-white shadow-sm sticky top-24">
      <div className="mb-6">
        <span className="text-3xl font-bold text-green-700">{product.price} XAF</span>
        <span className="text-gray-500"> / {product.unit}</span>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-600">Quantity</label>
          <div className="flex items-center gap-2">
            <input 
              type="number" 
              min={product.minOrder}
              max={product.quantity}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-full p-2 border rounded-md"
            />
            <span className="text-gray-400 text-sm">Max: {product.quantity}</span>
          </div>
        </div>

        <button 
          onClick={handleOrder}
          className="w-full bg-green-600 text-white py-3 rounded-md font-bold hover:bg-green-700 transition flex items-center justify-center gap-2"
        >
          <ShoppingCart size={20} />
          Order Now
        </button>

        <button 
          onClick={handleChat}
          className="w-full border border-green-600 text-green-600 py-3 rounded-md font-bold hover:bg-green-50 transition flex items-center justify-center gap-2"
        >
          <MessageCircle size={20} />
          Chat with Seller
        </button>
      </div>

      <div className="mt-6 pt-6 border-t text-sm text-gray-500">
        <p>Seller: <span className="font-semibold text-gray-800">{product.seller?.name}</span></p>
        <p>Location: <span className="font-semibold text-gray-800">{product.region}, {product.town}</span></p>
      </div>
    </div>
  );
}
