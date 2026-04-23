'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ShoppingCart, User, Menu, X, Globe } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

export default function Navbar() {
  const t = useTranslations('Navigation');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const toggleLanguage = () => {
    const nextLocale = locale === 'en' ? 'fr' : 'en';
    const newPath = pathname.replace(`/${locale}`, `/${nextLocale}`);
    router.push(newPath);
  };

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href={`/${locale}`} className="text-2xl font-bold text-green-700">
            AgriConnect CM
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href={`/${locale}/products`} className="text-gray-600 hover:text-green-600">{t('products')}</Link>
            <Link href={`/${locale}/equipment`} className="text-gray-600 hover:text-green-600">{t('equipment')}</Link>
            {user && (
              <>
                <Link href={`/${locale}/orders`} className="text-gray-600 hover:text-green-600">{t('orders')}</Link>
                <Link href={`/${locale}/chat`} className="text-gray-600 hover:text-green-600">{t('chat')}</Link>
              </>
            )}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button onClick={toggleLanguage} className="p-2 hover:bg-gray-100 rounded-full flex items-center gap-1">
              <Globe size={20} />
              <span className="uppercase text-xs font-bold">{locale}</span>
            </button>
            {user ? (
              <Link href={`/${locale}/profile`} className="p-2 hover:bg-gray-100 rounded-full">
                <User size={20} />
              </Link>
            ) : (
              <Link href={`/${locale}/login`} className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-600">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t p-4 space-y-4">
          <Link href={`/${locale}/products`} className="block text-gray-600">{t('products')}</Link>
          <Link href={`/${locale}/equipment`} className="block text-gray-600">{t('equipment')}</Link>
          {user ? (
             <>
               <Link href={`/${locale}/orders`} className="block text-gray-600">{t('orders')}</Link>
               <Link href={`/${locale}/chat`} className="block text-gray-600">{t('chat')}</Link>
               <Link href={`/${locale}/profile`} className="block text-gray-600">{t('profile')}</Link>
             </>
          ) : (
            <Link href={`/${locale}/login`} className="block text-green-600 font-bold">Login</Link>
          )}
          <button onClick={toggleLanguage} className="flex items-center gap-2 text-gray-600 w-full text-left">
            <Globe size={20} /> {locale === 'en' ? 'Français' : 'English'}
          </button>
        </div>
      )}
    </nav>
  );
}
