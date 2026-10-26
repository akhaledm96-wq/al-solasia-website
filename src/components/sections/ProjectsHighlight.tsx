import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowUpRightIcon } from '@/components/ui/Icons';

export default function ProjectsHighlight() {
  const t = useTranslations('projects');

  return (
    <section className="py-20 md:py-28 bg-[#F4F1EB] border-b border-[#D8D3CA]">
      <div className="container-custom">
        {/* Header */}
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

        {/* 3 Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Project 1: Telecom Egypt Infrastructure (Verified Project Photo) */}
          <div className="relative min-h-[360px] rounded-sm overflow-hidden bg-[#191A1C] border border-[#D8D3CA] flex items-end group shadow-sm">
            <Image
              src="/images/hero-telecom-egypt.jpg"
              alt="Telecommunications Infrastructure Project"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover object-center transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

            <div className="relative z-10 p-6 text-white w-full">
              <span className="inline-block text-[10px] font-bold tracking-widest text-[#D96B24] uppercase mb-1.5">
                {t('p1.tag')}
              </span>
              <h3 className="text-base font-bold text-white mb-1 leading-snug group-hover:text-[#F48A44] transition-colors">
                {t('p1.title')}
              </h3>
              <p className="text-xs text-[#D2CEC7]">{t('p1.loc')}</p>
            </div>
          </div>

          {/* Project 2: Private Residential Works */}
          <div className="relative min-h-[360px] rounded-sm overflow-hidden bg-[#24262A] border border-[#D8D3CA] flex items-end group shadow-sm">
            {/* Architectural Abstract Texture / Representation */}
            <div
              className="absolute inset-0 opacity-40 group-hover:opacity-50 transition-opacity"
              style={{
                backgroundImage: `linear-gradient(45deg, #191A1C 25%, transparent 25%), linear-gradient(-45deg, #191A1C 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #191A1C 75%), linear-gradient(-45deg, transparent 75%, #191A1C 75%)`,
                backgroundSize: '24px 24px',
                backgroundPosition: '0 0, 0 12px, 12px -12px, -12px 0px',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

            <div className="relative z-10 p-6 text-white w-full">
              <span className="inline-block text-[10px] font-bold tracking-widest text-[#D96B24] uppercase mb-1.5">
                {t('p2.tag')}
              </span>
              <h3 className="text-base font-bold text-white mb-1 leading-snug group-hover:text-[#F48A44] transition-colors">
                {t('p2.title')}
              </h3>
              <p className="text-xs text-[#D2CEC7]">{t('p2.loc')}</p>
            </div>
          </div>

          {/* Project 3: Commercial Outlets & Civic Facilities */}
          <div className="relative min-h-[360px] rounded-sm overflow-hidden bg-[#2D2E33] border border-[#D8D3CA] flex items-end group shadow-sm">
            {/* Architectural Grid lines representation */}
            <div
              className="absolute inset-0 opacity-30 group-hover:opacity-40 transition-opacity"
              style={{
                backgroundImage: `repeating-linear-gradient(0deg, #FFFFFF, #FFFFFF 1px, transparent 1px, transparent 32px)`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

            <div className="relative z-10 p-6 text-white w-full">
              <span className="inline-block text-[10px] font-bold tracking-widest text-[#D96B24] uppercase mb-1.5">
                {t('p3.tag')}
              </span>
              <h3 className="text-base font-bold text-white mb-1 leading-snug group-hover:text-[#F48A44] transition-colors">
                {t('p3.title')}
              </h3>
              <p className="text-xs text-[#D2CEC7]">{t('p3.loc')}</p>
            </div>
          </div>
        </div>

        {/* Note & CTA */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#686761] pt-6 border-t border-[#D8D3CA]">
          <p className="max-w-xl">{t('note')}</p>
          <Link
            href="/projects"
            className="font-bold text-[#D96B24] hover:text-[#B85819] inline-flex items-center gap-1.5 shrink-0"
          >
            <span>{t('kicker')}</span>
            <ArrowUpRightIcon className="w-3.5 h-3.5 rtl:-scale-x-100" />
          </Link>
        </div>
      </div>
    </section>
  );
}
