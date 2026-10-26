import { useTranslations } from 'next-intl';

export default function Stats() {
  const t = useTranslations('stats');

  const stats = [
    { key: 'stat1', ...t.raw('stat1') },
    { key: 'stat2', ...t.raw('stat2') },
    { key: 'stat3', ...t.raw('stat3') },
    { key: 'stat4', ...t.raw('stat4') },
  ];

  return (
    <section className="bg-[#D96B24] text-white">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/20 rtl:divide-x-reverse">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="py-6 px-4 md:px-6 flex flex-col justify-center first:ps-0 last:pe-0"
            >
              <span className="text-3xl md:text-4xl font-extrabold tracking-tight font-sans">
                {stat.val}
              </span>
              <span className="text-xs md:text-sm font-medium text-white/90 mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
