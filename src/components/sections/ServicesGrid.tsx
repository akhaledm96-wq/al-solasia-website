import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowUpRightIcon } from '@/components/ui/Icons';

export default function ServicesGrid() {
  const t = useTranslations('services');

  const services = ['s1', 's2', 's3', 's4', 's5', 's6'] as const;

  return (
    <section className="py-20 md:py-28 bg-[#EEEDE9] border-b border-[#D8D3CA]">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="text-xs font-bold tracking-[0.18em] uppercase text-[#D96B24] block mb-2">
              {t('kicker')}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#191A1C] leading-tight">
              {t('title')}
            </h2>
          </div>
          <p className="text-sm text-[#686761] max-w-md leading-relaxed">
            {t('desc')}
          </p>
        </div>

        {/* 6-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((key) => {
            const num = t(`${key}.num`);
            const category = t(`${key}.category`);
            const title = t(`${key}.title`);
            const desc = t(`${key}.desc`);

            return (
              <div
                key={key}
                className="bg-white p-7 rounded-sm border border-[#D8D3CA] hover:border-[#D96B24] transition-all duration-200 hover:-translate-y-1 shadow-xs hover:shadow-md flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-[#D96B24] tracking-widest uppercase mb-4">
                    <span>{num} / {category}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D96B24] opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  </div>

                  <h3 className="text-lg font-bold text-[#191A1C] mb-2.5 group-hover:text-[#D96B24] transition-colors">
                    {title}
                  </h3>

                  <p className="text-xs text-[#686761] leading-relaxed mb-6">
                    {desc}
                  </p>
                </div>

                <div>
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D96B24] hover:text-[#B85819] transition-colors"
                  >
                    <span>{t('ctaDiscuss')}</span>
                    <ArrowUpRightIcon className="w-3.5 h-3.5 rtl:-scale-x-100" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Explore All Link */}
        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-bold text-[#191A1C] hover:text-white bg-transparent hover:bg-[#191A1C] border border-[#191A1C] rounded-sm transition-all duration-200"
          >
            <span>{t('exploreAll')}</span>
            <ArrowUpRightIcon className="w-3.5 h-3.5 rtl:-scale-x-100" />
          </Link>
        </div>
      </div>
    </section>
  );
}
