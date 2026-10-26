import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowUpRightIcon } from '@/components/ui/Icons';

export default function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const isAr = locale === 'ar';

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#121315] text-white pt-32 sm:pt-36 lg:pt-40 pb-20 border-b border-[#2C2D31]">
      {/* 1. Full-Bleed Project Photograph Covering the Entire Top Page */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-telecom-egypt.jpg"
          alt={t('imgAlt')}
          fill
          priority
          sizes="100vw"
          className={`object-cover ${
            isAr ? 'object-[left_center]' : 'object-[right_center]'
          } scale-100 transition-transform duration-1000 ease-out`}
        />

        {/* 2. Cinematic Architectural Vignettes & Directional Gradient Overlay */}
        {/* Horizontal directional gradient: denser on the text side, revealing the majestic building facade on the opposite side */}
        <div
          className={`absolute inset-0 ${
            isAr
              ? 'bg-gradient-to-l from-[#121315]/95 via-[#141516]/85 via-50% to-black/25'
              : 'bg-gradient-to-r from-[#121315]/95 via-[#141516]/85 via-50% to-black/25'
          }`}
        />

        {/* Top subtle vignette for transparent header legibility */}
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none" />

        {/* Bottom subtle vignette blending into the stats strip */}
        <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#121315] to-transparent pointer-events-none" />

        {/* Micro-grid architectural coordinates (subtle engineering texture) */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, #FFFFFF, #FFFFFF 1px, transparent 1px, transparent 64px), repeating-linear-gradient(90deg, #FFFFFF, #FFFFFF 1px, transparent 1px, transparent 64px)`,
          }}
          aria-hidden="true"
        />
      </div>

      {/* 3. Hero Content — Monumental Typography & Clear Action Pathways */}
      <div className="container-custom relative z-10 w-full">
        <div className="max-w-2xl lg:max-w-3xl">
          {/* Eyebrow with Orange Accent Line */}
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 sm:w-10 h-[2px] bg-[#D96B24] shrink-0"></span>
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase text-[#D96B24]">
              {t('kicker')}
            </span>
          </div>

          {/* Monumental Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[58px] font-bold tracking-tight text-white leading-[1.1] mb-6 drop-shadow-sm">
            {isAr ? (
              <>
                أساس قوي لما <em className="not-italic text-[#D96B24]">هو قادم.</em>
              </>
            ) : (
              <>
                A solid foundation for what comes{' '}
                <em className="not-italic text-[#D96B24]">next.</em>
              </>
            )}
          </h1>

          {/* Architectural Accent Line */}
          <div className="w-24 sm:w-28 h-[3px] bg-[#D96B24] mb-6"></div>

          {/* Supporting Copy */}
          <p className="text-base sm:text-lg lg:text-xl text-[#E5E1D8] max-w-2xl leading-relaxed mb-9 font-light drop-shadow-sm">
            {t('desc')}
          </p>

          {/* Dual Action Pathways */}
          <div className="flex flex-wrap items-center gap-4 mb-12">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm font-bold text-white bg-[#D96B24] hover:bg-[#B85819] rounded-sm border border-[#D96B24] transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>{t('ctaPrimary')}</span>
              <ArrowUpRightIcon className="w-4 h-4 rtl:-scale-x-100" />
            </Link>

            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-[#F4F1EB] hover:text-white bg-black/30 hover:bg-white/10 rounded-sm border border-white/40 hover:border-white transition-all duration-200 backdrop-blur-xs"
            >
              <span>{t('ctaSecondary')}</span>
            </Link>
          </div>

          {/* Credibility Proof Line */}
          <div className="pt-6 border-t border-white/15 flex flex-wrap items-center gap-4 text-xs tracking-wider text-[#D2CEC7]">
            <span className="font-semibold text-white">{t('proof1')}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#D96B24]"></span>
            <span>{t('proof2')}</span>
            <span className="hidden sm:inline w-1.5 h-1.5 rounded-full bg-white/40"></span>
            <span className="hidden sm:inline font-mono text-[11px] text-[#D96B24] font-bold">
              EST. 1992
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
