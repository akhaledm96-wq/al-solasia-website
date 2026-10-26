import { ReactNode } from 'react';

interface PageHeroProps {
  crumb: string;
  title: string;
  desc?: string;
  children?: ReactNode;
}

export default function PageHero({ crumb, title, desc, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#121315] text-white pt-36 sm:pt-40 md:pt-44 pb-16 sm:pb-20 border-b border-[#2C2D31]">
      {/* Background Architectural Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, #FFFFFF, #FFFFFF 1px, transparent 1px, transparent 64px), repeating-linear-gradient(90deg, #FFFFFF, #FFFFFF 1px, transparent 1px, transparent 64px)`,
        }}
        aria-hidden="true"
      />

      {/* Architectural Angle Graphic in Top Right / Top Left in RTL */}
      <div
        className="absolute top-0 end-0 w-80 h-80 border-b border-s border-[#D96B24]/20 pointer-events-none -translate-y-20 translate-x-20 rotate-12"
        aria-hidden="true"
      />

      <div className="container-custom relative z-10 max-w-4xl">
        {/* Breadcrumb / Kicker */}
        <div className="flex items-center gap-3 mb-4">
          <span className="w-6 h-[2px] bg-[#D96B24] shrink-0"></span>
          <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase text-[#D96B24]">
            {crumb}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-5 leading-[1.15]">
          {title}
        </h1>

        {/* Optional Description */}
        {desc && (
          <p className="text-base sm:text-lg text-[#D2CEC7] max-w-2xl leading-relaxed font-light">
            {desc}
          </p>
        )}

        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
