import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowUpRightIcon } from '@/components/ui/Icons';

export default function CTABand() {
  const t = useTranslations('cta');

  return (
    <section className="py-16 md:py-20 bg-[#D96B24] text-white">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl text-center lg:text-start">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight mb-3">
              {t('title')}
            </h2>
            <p className="text-sm md:text-base text-white/90 leading-relaxed max-w-xl">
              {t('desc')}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-bold text-white bg-[#191A1C] hover:bg-[#34363A] rounded-sm transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>{t('button')}</span>
              <ArrowUpRightIcon className="w-4 h-4 rtl:-scale-x-100" />
            </Link>

            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/10 rounded-sm border border-white/60 hover:border-white transition-all duration-200"
            >
              <span>{t('secondary')}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
