'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Cookies from 'js-cookie';

const loginSchema = z.object({
  phone: z.string().min(9),
  password: z.string().min(6),
});

type LoginValues = z.infer<typeof loginSchema>;

export default function LoginForm({ t, locale }: { t: any, locale: string }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginValues) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/auth/login`, data);
      
      const { token, user } = response.data;
      
      // Store token and user role
      Cookies.set('token', token, { expires: 7 });
      localStorage.setItem('user', JSON.stringify(user));

      router.push(`/${locale}/`);
      router.refresh();
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto p-6 border rounded-xl shadow-lg bg-white">
      <h2 className="text-2xl font-bold text-center text-green-700">{t('login')}</h2>
      
      {error && <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">{error}</div>}

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

      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-green-600 text-white py-2 rounded-md font-semibold hover:bg-green-700 transition disabled:opacity-50"
      >
        {loading ? "..." : t('login')}
      </button>

      <p className="text-center text-sm text-gray-600">
        <a href={`/${locale}/register`} className="text-green-600 hover:underline">
           {t('alreadyHaveAccount')}
        </a>
      </p>
    </form>
  );
}
