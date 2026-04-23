'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const productSchema = z.object({
  categoryId: z.string().min(1, "Category is required"),
  titleEn: z.string().min(3),
  titleFr: z.string().min(3),
  descriptionEn: z.string().optional(),
  descriptionFr: z.string().optional(),
  price: z.number().positive(),
  unit: z.string().min(1),
  quantity: z.number().nonnegative(),
  region: z.string().min(1),
  town: z.string().min(1),
});

type ProductValues = z.infer<typeof productSchema>;

export default function ProductForm({ t, locale }: { t: any, locale: string }) {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  useEffect(() => {
    // Categories should ideally be fetched from API
    // If API endpoint for categories exists, use it. 
    // For now, using a fallback or fetching if possible.
    axios.get(`${apiBase}/api/products/categories`).then(res => setCategories(res.data)).catch(() => {});
  }, [apiBase]);

  const { register, handleSubmit, formState: { errors } } = useForm<ProductValues>({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = async (data: ProductValues) => {
    setLoading(true);
    setError(null);
    try {
      const token = Cookies.get('token');
      await axios.post(`${apiBase}/api/products`, data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      router.push(`/${locale}/dashboard/products`);
      router.refresh();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-8 border rounded-2xl shadow-sm max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-green-700">{t('listNewProduct')}</h2>
      
      {error && <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1">{t('form.titleEn')}</label>
          <input {...register('titleEn')} className="w-full p-2 border rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">{t('form.titleFr')}</label>
          <input {...register('titleFr')} className="w-full p-2 border rounded-md" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1">{t('form.price')}</label>
          <input type="number" {...register('price', { valueAsNumber: true })} className="w-full p-2 border rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">{t('form.unit')}</label>
          <input {...register('unit')} placeholder="kg, bag, ton" className="w-full p-2 border rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">{t('form.quantity')}</label>
          <input type="number" {...register('quantity', { valueAsNumber: true })} className="w-full p-2 border rounded-md" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">{t('form.category')}</label>
        <select {...register('categoryId')} className="w-full p-2 border rounded-md bg-white">
          <option value="">Select Category</option>
          {categories.map(cat => (
             <option key={cat.id} value={cat.id}>{locale === 'en' ? cat.nameEn : cat.nameFr}</option>
          ))}
          {/* Fallback if categories fail to load */}
          {categories.length === 0 && <option value="clonr6v0k000008j8h1zq9z3k">General</option>}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Region</label>
          <input {...register('region')} className="w-full p-2 border rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Town</label>
          <input {...register('town')} className="w-full p-2 border rounded-md" />
        </div>
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-green-600 text-white py-3 rounded-md font-bold hover:bg-green-700 transition disabled:opacity-50"
      >
        {loading ? "..." : t('form.submit')}
      </button>
    </form>
  );
}
