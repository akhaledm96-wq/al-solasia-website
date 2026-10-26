import { useTranslations } from 'next-intl';

export default function Process() {
  const t = useTranslations('process');

  const steps = ['step1', 'step2', 'step3', 'step4'] as const;

  return (
    <section id="process" className="py-20 md:py-28 bg-[#191A1C] text-white border-b border-[#2C2D31]">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <span className="text-xs font-bold tracking-[0.18em] uppercase text-[#D96B24] block mb-2">
              {t('kicker')}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
              {t('title')}
            </h2>
          </div>
          <p className="text-sm text-[#A9A49C] max-w-md leading-relaxed">
            {t('desc')}
          </p>
        </div>

        {/* 4 Process Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((stepKey) => {
            const step = t(`${stepKey}.step`);
            const title = t(`${stepKey}.title`);
            const desc = t(`${stepKey}.desc`);

            return (
              <div
                key={stepKey}
                className="relative pt-6 border-t border-[#3A3B40] group hover:border-[#D96B24] transition-colors"
              >
                {/* Step Marker Dot */}
                <span className="absolute -top-1 start-0 w-2.5 h-2.5 rounded-full bg-[#D96B24] group-hover:scale-125 transition-transform" />

                <span className="text-[11px] font-bold tracking-widest text-[#D96B24] uppercase block mb-3">
                  {step}
                </span>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#F48A44] transition-colors">
                  {title}
                </h3>

                <p className="text-xs text-[#A9A49C] leading-relaxed">
                  {desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
