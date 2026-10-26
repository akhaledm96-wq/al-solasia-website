import { useTranslations, useLocale } from 'next-intl';
import PageHero from '@/components/layout/PageHero';
import { Link } from '@/i18n/routing';
import { ArrowUpRightIcon } from '@/components/ui/Icons';

export default function AboutPage() {
  const t = useTranslations('about');
  const locale = useLocale();
  const isAr = locale === 'ar';

  const values = [
    {
      num: '01',
      title: isAr ? 'الانضباط الهندسي' : 'Engineering Discipline',
      desc: isAr
        ? 'الالتزام التام بالمواصفات الفنية القياسية والمعايير الإنشائية في كافة مراحل التنفيذ من الأساسات حتى التشطيب النهائي.'
        : 'Strict adherence to technical codes, structural standards, and rigorous specification compliance from foundations to handover.',
    },
    {
      num: '02',
      title: isAr ? 'المسؤولية الميدانية المباشرة' : 'On-Site Accountability',
      desc: isAr
        ? 'فريق إشراف وإدارة موقع متفرغ يضمن الرقابة اليومية على جودة المواد وسلامة التنفيذ والالتزام بالجدول الزمني المحدد.'
        : 'Dedicated engineering presence on site ensuring daily quality control, material verification, and schedule compliance.',
    },
    {
      num: '03',
      title: isAr ? 'الشفافية في المراحل والمدفوعات' : 'Milestone & Cost Transparency',
      desc: isAr
        ? 'تقارير دورية موثقة للمالك توضح ما تم إنجازه ونسب التنفيذ والخطوات القادمة بوضوح تام ودون مفاجآت.'
        : 'Clear milestone definitions, documented progress reporting, and structured payment schedules with zero hidden costs.',
    },
    {
      num: '04',
      title: isAr ? 'خبرة متوازنة بين القطاعات' : 'Dual Sector Experience',
      desc: isAr
        ? 'سجل أعمال يجمع بين صرامة المشروعات المؤسسية والبنية التحتية، والدقة العالية المطلوبة في تشطيبات الفيلات والمشروعات الخاصة.'
        : 'A proven track record spanning institutional and public-sector infrastructure alongside high-end private villas and residences.',
    },
  ];

  return (
    <div>
      {/* 1. Page Hero */}
      <PageHero
        crumb={isAr ? 'الثلاثية / من نحن' : 'AL-SOLASIA / ABOUT US'}
        title={isAr ? 'ثلاثة عقود من الخبرة الهندسية في قطاع البناء المصري.' : 'Three Decades of Engineering Experience in Egypt.'}
        desc={
          isAr
            ? 'تأسست شركة الثلاثية لهندسة البناء عام ١٩٩٢، وكرست خبراتها في تقديم حلول متكاملة في التشييد والبنية التحتية والتشطيبات وإعادة التأهيل.'
            : 'Established in 1992, Al-Solasia Building Engineering delivers integrated construction, structural execution, finishing, and rehabilitation across Egypt.'
        }
      />

      {/* 2. Detailed Company Story Section */}
      <section className="py-20 bg-[#F4F1EB] border-b border-[#D8D3CA]">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual Box */}
            <div className="lg:col-span-5 relative">
              <div className="relative min-h-[420px] bg-[#191A1C] text-white p-8 sm:p-10 rounded-sm overflow-hidden flex flex-col justify-between border border-[#313338] shadow-lg">
                <div
                  className="absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage: `repeating-linear-gradient(0deg, #FFFFFF, #FFFFFF 1px, transparent 1px, transparent 32px), repeating-linear-gradient(90deg, #FFFFFF, #FFFFFF 1px, transparent 1px, transparent 32px)`,
                  }}
                  aria-hidden="true"
                />

                <div className="relative z-10">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-[#D96B24] uppercase block mb-2">
                    {isAr ? 'المسيرة والتأسيس' : 'HERITAGE & FOUNDATION'}
                  </span>
                  <div className="text-4xl sm:text-5xl font-extrabold text-white font-sans mb-1">
                    1992
                  </div>
                  <div className="text-xs text-[#D2CEC7] tracking-wider">
                    {isAr ? 'القاهرة، جمهورية مصر العربية' : 'Cairo, Arab Republic of Egypt'}
                  </div>
                </div>

                <div className="relative z-10 border-t border-white/15 pt-6 mt-12">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="block text-2xl font-bold text-[#D96B24]">30+</span>
                      <span className="text-[11px] text-[#A9A49C]">
                        {isAr ? 'عامًا في قطاع البناء' : 'Years of Field Experience'}
                      </span>
                    </div>
                    <div>
                      <span className="block text-2xl font-bold text-white">100%</span>
                      <span className="text-[11px] text-[#A9A49C]">
                        {isAr ? 'التزام بالمواصفات الفنية' : 'Code Compliance Rate'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Narrative Box */}
            <div className="lg:col-span-7">
              <span className="text-xs font-bold tracking-[0.18em] uppercase text-[#D96B24] block mb-2">
                {isAr ? 'فلسفة الشركة ومنهج العمل' : 'OUR PHILOSOPHY & CAPABILITIES'}
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#191A1C] mb-6 leading-tight">
                {isAr
                  ? 'نبني الثقة من خلال الانضباط الهندسي والتنفيذ المسؤول.'
                  : 'Building Trust Through Engineering Discipline & Accountable Execution.'}
              </h2>

              <p className="text-sm sm:text-base text-[#686761] leading-relaxed mb-4">
                {isAr
                  ? 'بدأت الثلاثية لهندسة البناء مسيرتها في قطاع المقاولات والإنشاءات المصري منذ أكثر من ثلاثين عامًا، حيث شاركت في تنفيذ وتأهيل مشروعات حيوية في البنية التحتية للاتصالات، والمنشآت الخدمية، والمباني التجارية والسكنية.'
                  : "Al-Solasia Building Engineering began its journey in Egypt's construction and contracting sector more than three decades ago, executing and rehabilitating critical telecommunications infrastructure, civic centers, and commercial and residential developments."}
              </p>

              <p className="text-sm sm:text-base text-[#686761] leading-relaxed mb-6">
                {isAr
                  ? 'نعتمد منهجًا يربط بين الدراسات الهندسية الدقيقة وتنسيق التصميم من جهة، والتنفيذ الحازم والمتابع في الموقع من جهة أخرى. هذا التنسيق يضمن تلافي الأخطاء الميدانية، والتحكم في تكاليف المشروع، وتوفير الشفافية الكاملة للمالك في كل خطوة.'
                  : 'Our approach unifies technical coordination and constructability planning with disciplined on-site execution. This prevents costly field adjustments, safeguards client budgets, and provides property owners with clarity across every phase.'}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#D96B24] hover:bg-[#B85819] text-white text-xs font-bold rounded-sm transition-colors shadow-sm"
                >
                  <span>{isAr ? 'استعرض مشروعاتنا المنفذة' : 'Explore our portfolio'}</span>
                  <ArrowUpRightIcon className="w-3.5 h-3.5 rtl:-scale-x-100" />
                </Link>

                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-[#191A1C] hover:text-white text-[#191A1C] text-xs font-semibold rounded-sm border border-[#D8D3CA] transition-colors"
                >
                  <span>{isAr ? 'استكشف نطاق خدماتنا' : 'Explore services'}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Values Grid */}
      <section className="py-20 bg-[#EEEDE9] border-b border-[#D8D3CA]">
        <div className="container-custom">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-bold tracking-[0.18em] uppercase text-[#D96B24] block mb-2">
              {isAr ? 'قيم العمل' : 'OUR CORE PRINCIPLES'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#191A1C]">
              {isAr ? 'المعايير التي تحكم كل موقع نشرف عليه' : 'The Standards That Govern Every Site We Deliver'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div
                key={v.num}
                className="bg-white p-7 rounded-sm border border-[#D8D3CA] hover:border-[#D96B24] transition-all duration-200 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono font-bold text-[#D96B24] block mb-3">
                    {v.num}
                  </span>
                  <h3 className="text-base font-bold text-[#191A1C] mb-2 leading-snug">
                    {v.title}
                  </h3>
                  <p className="text-xs text-[#686761] leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
