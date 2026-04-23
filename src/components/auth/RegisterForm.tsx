'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const registerSchema = z.object({
  phone: z.string().min(9, "Invalid phone number"),
  password: z.string().min(6, "Password too short"),
  name: z.string().min(2, "Name too short"),
  role: z.enum(['FARMER', 'BUYER', 'WHOLESALER', 'EQUIPMENT_OWNER']),
  region: z.string().min(1, "Region is required"),
  town: z.string().min(1, "Town is required"),
});

type RegisterValues = z.infer<typeof registerSchema>;

export default function RegisterForm({ t, locale }: { t: any, locale: string }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: 'BUYER',
    }
  });

  const onSubmit = async (data: RegisterValues) => {
    setLoading(true);
    setError(null);
    try {
      // Assuming API runs on port 4000
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/auth/register`, data);
      router.push(`/${locale}/login?registered=true`);
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto p-6 border rounded-xl shadow-lg bg-white">
      <h2 className="text-2xl font-bold text-center text-green-700">{t('register')}</h2>
      
      {error && <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">{error}</div>}

      <div>
        <label className="block text-sm font-medium mb-1">{t('name')}</label>
        <input {...register('name')} className="w-full p-2 border rounded-md" />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">{t('phone')}</label>
        <input {...register('phone')} placeholder="6XXXXXXXX" className="w-full p-2 border rounded-md" />
        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">{t('password')}</label>
        <input {...register('password')} type="password" className="w-full p-2 border rounded-md" />
        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">{t('region')}</label>
          <input {...register('region')} className="w-full p-2 border rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">{t('town')}</label>
          <input {...register('town')} className="w-full p-2 border rounded-md" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">{t('role')}</label>
        <select {...register('role')} className="w-full p-2 border rounded-md bg-white">
          <option value="FARMER">Farmer / Agriculteur</option>
          <option value="BUYER">Buyer / Acheteur</option>
          <option value="WHOLESALER">Wholesaler / Grossiste</option>
          <option value="EQUIPMENT_OWNER">Equipment Owner / Propriétaire</option>
        </select>
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-green-600 text-white py-2 rounded-md font-semibold hover:bg-green-700 transition disabled:opacity-50"
      >
        {loading ? "..." : t('submit')}
      </button>
    </form>
  );
}
