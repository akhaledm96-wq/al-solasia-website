'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { useTransition } from 'react';

export default function LanguageSwitch() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const toggleLanguage = () => {
    const nextLocale = locale === 'ar' ? 'en' : 'ar';
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <button
      onClick={toggleLanguage}
      disabled={isPending}
      className="inline-flex items-center justify-center px-3.5 py-1.5 text-xs font-semibold tracking-wider rounded-sm border border-white/30 hover:border-[#D96B24] text-white hover:text-[#D96B24] bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all duration-200 cursor-pointer disabled:opacity-50"
      aria-label={locale === 'ar' ? 'Switch to English' : 'التحويل إلى العربية'}
    >
      {locale === 'ar' ? 'English' : 'عربي'}
    </button>
  );
}
