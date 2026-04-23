import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('Index'); // Reusing Index translations for simplicity

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-6xl font-bold text-green-700 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">
        Oops! The page you're looking for doesn't exist.
        <br />
        <span className="italic text-sm">Oups ! La page que vous recherchez n'existe pas.</span>
      </p>
      <Link 
        href="/" 
        className="bg-green-600 text-white px-8 py-3 rounded-full font-bold hover:bg-green-700 transition"
      >
        Go Home / Accueil
      </Link>
    </div>
  );
}
