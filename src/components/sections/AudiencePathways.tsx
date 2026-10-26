'use client';

import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { CheckIcon, ArrowUpRightIcon } from '@/components/ui/Icons';

export default function AudiencePathways() {
  const locale = useLocale();
  const isAr = locale === 'ar';

  return (
    <section className="py-16 md:py-24 bg-[#EEEDE9] border-b border-[#D8D3CA]">
      <div className="container-custom">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#D96B24] block mb-2">
            {isAr ? 'مسارات العمل والعملاء' : 'CLIENT PATHWAYS'}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#191A1C] leading-tight mb-4">
            {isAr
              ? 'قطاعان رئيسيان. معيار هندسي واحد لا يتغير.'
              : 'Two Distinct Client Sectors. One Uncompromising Engineering Standard.'}
          </h2>
          <p className="text-xs sm:text-sm text-[#686761] leading-relaxed">
            {isAr
              ? 'تخدم شركة الثلاثية الملاك الأفراد الباحثين عن الدقة الهندسية والشفافية، إلى جانب المؤسسات والهيئات العامة التي تتطلب خبرة موثقة وسرعة تسليم.'
              : 'Al-Solasia delivers disciplined engineering for private owners seeking transparency and quality, alongside corporate and institutional clients requiring proven field experience.'}
          </p>
        </div>

        {/* Dual Pathways Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pathway A: Private Clients */}
          <div className="bg-white p-8 sm:p-10 rounded-sm border border-[#D8D3CA] hover:border-[#D96B24] transition-all duration-300 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#D8D3CA]/60">
                <span className="text-[10px] font-bold tracking-widest uppercase text-[#D96B24] bg-[#D96B24]/10 px-2.5 py-1 rounded-xs">
                  {isAr ? 'الملاك والأفراد' : 'PRIVATE CLIENTS'}
                </span>
                <span className="text-xs text-[#8E8B82] font-mono">
                  PATHWAY 01
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-[#191A1C] mb-3 leading-snug">
                {isAr
                  ? 'تخطط لتشييد فيلا، مبنى خاص، أو تشطيب راقٍ؟'
                  : 'Planning a Villa, Private Building, or Luxury Renovation?'}
              </h3>

              <p className="text-xs sm:text-sm text-[#686761] leading-relaxed mb-6">
                {isAr
                  ? 'نوفر لأصحاب العقارات والأراضي مسارًا آمنًا وخاليًا من المفاجآت، يشمل التنسيق المعماري، دراسة التكاليف، والإشراف الصارم على كل مرحلة.'
                  : 'We provide property owners with a predictable, transparent build process — combining design coordination, accurate budgeting, and disciplined on-site supervision.'}
              </p>

              <div className="space-y-3 mb-8">
                <h4 className="text-[11px] font-bold tracking-wider uppercase text-[#191A1C]">
                  {isAr ? 'الخدمات الموجهة للملاك:' : 'Tailored For Private Owners:'}
                </h4>
                <ul className="space-y-2 text-xs text-[#191A1C]">
                  <li className="flex items-start gap-2.5">
                    <CheckIcon className="w-3.5 h-3.5 text-[#D96B24] shrink-0 mt-0.5" />
                    <span>
                      {isAr
                        ? 'تشييد الفيلات والمباني السكنية وتسليم المفتاح بالكامل'
                        : 'Custom villa and residential turnkey construction'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckIcon className="w-3.5 h-3.5 text-[#D96B24] shrink-0 mt-0.5" />
                    <span>
                      {isAr
                        ? 'أعمال التشطيبات المعمارية الراقية وتجهيز الشقق الفاخرة'
                        : 'Premium interior finishing, villa upgrades, and fit-out'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckIcon className="w-3.5 h-3.5 text-[#D96B24] shrink-0 mt-0.5" />
                    <span>
                      {isAr
                        ? 'الاستشارات الهندسية والإشراف الميداني لضبط الجودة والميزانية'
                        : 'Technical site supervision and milestone budget tracking'}
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-6 border-t border-[#D8D3CA]/60 flex flex-wrap items-center justify-between gap-4">
              <Link
                href="/services#enquiry-form"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#D96B24] hover:bg-[#B85819] text-white text-xs font-bold rounded-sm transition-colors shadow-sm"
              >
                <span>{isAr ? 'تخطيط أو بدء مشروع خاص' : 'Plan or Build a Project'}</span>
                <ArrowUpRightIcon className="w-3.5 h-3.5 rtl:-scale-x-100" />
              </Link>
              <Link
                href="/services"
                className="text-xs font-semibold text-[#686761] hover:text-[#191A1C] transition-colors"
              >
                {isAr ? 'استعراض خدمات الملاك ←' : 'View residential services →'}
              </Link>
            </div>
          </div>

          {/* Pathway B: Institutional & Corporate */}
          <div className="bg-white p-8 sm:p-10 rounded-sm border border-[#D8D3CA] hover:border-[#191A1C] transition-all duration-300 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#D8D3CA]/60">
                <span className="text-[10px] font-bold tracking-widest uppercase text-[#191A1C] bg-[#191A1C]/10 px-2.5 py-1 rounded-xs">
                  {isAr ? 'الجهات والشركات' : 'INSTITUTIONAL & CORPORATE'}
                </span>
                <span className="text-xs text-[#8E8B82] font-mono">
                  PATHWAY 02
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-[#191A1C] mb-3 leading-snug">
                {isAr
                  ? 'تبحث عن مقاولات بنية تحتية أو إعادة تأهيل منشآت؟'
                  : 'Requiring Infrastructure Contracting or Facility Rehabilitation?'}
              </h3>

              <p className="text-xs sm:text-sm text-[#686761] leading-relaxed mb-6">
                {isAr
                  ? 'خبرة تزيد عن ٣٠ عامًا وسابقة أعمال معتمدة مع كبرى الهيئات والمؤسسات (مثل المصرية للاتصالات)، مع التزام تام باشتراطات الكود والسلامة والتشغيل.'
                  : 'Over 30 years of verified track record delivering critical facilities for premier organizations (including Telecom Egypt) with zero downtime.'}
              </p>

              <div className="space-y-3 mb-8">
                <h4 className="text-[11px] font-bold tracking-wider uppercase text-[#191A1C]">
                  {isAr ? 'القدرات المؤسسية الرئيسية:' : 'Core Institutional Capabilities:'}
                </h4>
                <ul className="space-y-2 text-xs text-[#191A1C]">
                  <li className="flex items-start gap-2.5">
                    <CheckIcon className="w-3.5 h-3.5 text-[#191A1C] shrink-0 mt-0.5" />
                    <span>
                      {isAr
                        ? 'مجمعات ومراكز الاتصالات ومباني البنية التحتية الحيوية'
                        : 'Telecommunications hubs and critical infrastructure facilities'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckIcon className="w-3.5 h-3.5 text-[#191A1C] shrink-0 mt-0.5" />
                    <span>
                      {isAr
                        ? 'ترميم ومعالجة الخرسانات المتضررة وتكسيات الواجهات الحديثة'
                        : 'Turnkey structural repair, concrete spall remediation & cladding'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckIcon className="w-3.5 h-3.5 text-[#191A1C] shrink-0 mt-0.5" />
                    <span>
                      {isAr
                        ? 'التنفيذ الدقيق مع استمرار التشغيل الكامل دون انقطاع للخدمة'
                        : 'Live site execution with zero interruption to ongoing operations'}
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-6 border-t border-[#D8D3CA]/60 flex flex-wrap items-center justify-between gap-4">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#191A1C] hover:bg-[#34363A] text-white text-xs font-bold rounded-sm transition-colors shadow-sm"
              >
                <span>{isAr ? 'استكشف القدرات والمشروعات' : 'Explore Our Capabilities'}</span>
                <ArrowUpRightIcon className="w-3.5 h-3.5 rtl:-scale-x-100" />
              </Link>
              <Link
                href="/contact"
                className="text-xs font-semibold text-[#686761] hover:text-[#191A1C] transition-colors"
              >
                {isAr ? 'تواصل بشأن شراكة مؤسسية ←' : 'Corporate RFP & enquiries →'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
