import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { CheckIcon, ArrowUpRightIcon } from '@/components/ui/Icons';

export default function AboutTeaser() {
  const t = useTranslations('about');

  return (
    <section className="py-20 md:py-28 bg-[#F4F1EB] border-b border-[#D8D3CA]">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Visual Side (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative min-h-[380px] sm:min-h-[440px] bg-[#E7E1D7] rounded-sm overflow-hidden p-8 flex items-end border border-[#D8D3CA] shadow-sm">
              {/* Architectural Grid / Tower Background in CSS */}
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage: `linear-gradient(135deg, rgba(25,26,28,0.06) 25%, transparent 25%), linear-gradient(225deg, rgba(25,26,28,0.06) 25%, transparent 25%), linear-gradient(45deg, rgba(25,26,28,0.06) 25%, transparent 25%), linear-gradient(315deg, rgba(25,26,28,0.06) 25%, #E7E1D7 25%)`,
                  backgroundPosition: '10px 0, 10px 0, 0 0, 0 0',
                  backgroundSize: '20px 20px',
                  backgroundRepeat: 'repeat',
                }}
              />

              {/* Architectural Building Structure Silhouettes */}
              <div className="absolute inset-x-12 bottom-0 top-16 bg-gradient-to-t from-[#B8B4AB] to-[#D4CFCB] clip-path-polygon opacity-80" />

              {/* 1992 Credibility Stamp */}
              <div className="relative z-10 bg-[#D96B24] text-white p-6 rounded-sm shadow-xl max-w-[240px]">
                <span className="block text-3xl font-extrabold tracking-tight font-sans">
                  1992
                </span>
                <span className="block text-xs font-medium text-white/95 mt-1 leading-snug">
                  {t('stampText')}
                </span>
              </div>
            </div>
          </div>

          {/* Copy Side (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-bold tracking-[0.18em] uppercase text-[#D96B24]">
                {t('kicker')}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#191A1C] leading-tight mb-6">
              {t('title')}
            </h2>

            <p className="text-base text-[#686761] leading-relaxed mb-4">
              {t('p1')}
            </p>

            <p className="text-base text-[#686761] leading-relaxed mb-8">
              {t('p2')}
            </p>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
              {['check1', 'check2', 'check3', 'check4'].map((checkKey) => (
                <div key={checkKey} className="flex items-start gap-2.5 text-xs font-semibold text-[#191A1C]">
                  <CheckIcon className="w-3.5 h-3.5 text-[#D96B24] shrink-0 mt-0.5" />
                  <span>{t(checkKey as any)}</span>
                </div>
              ))}
            </div>

            <div>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold text-white bg-[#191A1C] hover:bg-[#383A3E] rounded-sm transition-all duration-200 shadow-sm"
              >
                <span>{t('cta')}</span>
                <ArrowUpRightIcon className="w-3.5 h-3.5 rtl:-scale-x-100" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
