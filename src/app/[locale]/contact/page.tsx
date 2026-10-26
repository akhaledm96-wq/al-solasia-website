import { useTranslations, useLocale } from 'next-intl';
import PageHero from '@/components/layout/PageHero';
import GeneralContactForm from '@/components/forms/GeneralContactForm';
import { Link } from '@/i18n/routing';
import { ArrowUpRightIcon } from '@/components/ui/Icons';

export default function ContactPage() {
  const t = useTranslations('cta');
  const locale = useLocale();
  const isAr = locale === 'ar';

  return (
    <div>
      {/* 1. Dark Architectural Page Hero */}
      <PageHero
        crumb={isAr ? 'الثلاثية / تواصل معنا' : 'AL-SOLASIA / CONTACT'}
        title={isAr ? 'لنتحدث عن المشروع الذي ترغب في تنفيذه.' : "Let's talk about what you want to build."}
        desc={
          isAr
            ? 'سواء كنت تخطط لبناء فيلا جديدة أو تجديد مقر تجاري أو تقييم منشأة قائمة، يسعدنا بدء المحادثة وتحديد الخطوة العملية التالية.'
            : 'Whether you are planning a new build, renovating a home or office, or assessing an existing property, start with a clear engineering conversation.'
        }
      />

      {/* 2. Contact Split Layout */}
      <section className="py-20 bg-[#F4F1EB] border-b border-[#D8D3CA]">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Direct Channels Side Panel (5 cols) */}
            <aside className="lg:col-span-5 bg-[#191A1C] text-white p-8 sm:p-10 rounded-sm shadow-md border border-[#313338] sticky top-36">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#D96B24] block mb-2">
                {isAr ? 'قنوات الاتصال المباشرة' : 'DIRECT COMMUNICATION'}
              </span>

              <h2 className="text-2xl font-bold text-white mb-4 leading-snug">
                {isAr ? 'المشروع الجيد يبدأ بالمحادثة الصحيحة.' : 'A good project starts with the right conversation.'}
              </h2>

              <p className="text-xs text-[#D2CEC7] leading-relaxed mb-8">
                {isAr
                  ? 'شاركنا فكرتك وسيقوم فريقنا الهندسي بدراسة المتطلبات وتحديد أفضل مسار للتنفيذ الفعلي.'
                  : 'Tell us what you have in mind. Our team will review the parameters and suggest the most practical next step.'}
              </p>

              {/* Channels List */}
              <div className="space-y-6 border-t border-[#313338] pt-6">
                <div>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-[#D96B24] block mb-1">
                    {isAr ? 'الهاتف ومحادثات واتساب' : 'PHONE / WHATSAPP'}
                  </span>
                  <div className="text-sm font-semibold text-white">
                    {isAr ? 'يرجى تأكيد رقم الهاتف الرسمي قبل الإطلاق' : 'Official number placeholder (to be confirmed)'}
                  </div>
                  <span className="text-[10px] text-[#A9A49C] block mt-0.5">
                    {isAr ? 'متاح للمحادثات الفنية وإرسال المخططات' : 'Available for technical enquiries & floor plans'}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-[#D96B24] block mb-1">
                    {isAr ? 'البريد الإلكتروني الرسمي' : 'OFFICIAL EMAIL'}
                  </span>
                  <div className="text-sm font-semibold text-white">
                    {isAr ? 'يرجى تأكيد البريد الرسمي للشركة قبل الإطلاق' : 'Official email placeholder (to be confirmed)'}
                  </div>
                  <span className="text-[10px] text-[#A9A49C] block mt-0.5">
                    {isAr ? 'لاستفسارات المشروعات والمناقصات' : 'For project scopes, RFPs, and submittals'}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-[#D96B24] block mb-1">
                    {isAr ? 'المقر ونطاق التغطية' : 'OFFICE & COVERAGE'}
                  </span>
                  <div className="text-sm font-semibold text-white">
                    {isAr ? 'جمهورية مصر العربية · مشروعات عبر كافة المحافظات' : 'Egypt · Nationwide Project Execution'}
                  </div>
                  <span className="text-[10px] text-[#A9A49C] block mt-0.5">
                    {isAr ? 'القاهرة الكبرى، المدن الجديدة، والوجه البحري والساحل' : 'Greater Cairo, New Cities, Delta, and Coast'}
                  </span>
                </div>
              </div>

              {/* Map Placeholder Graphic */}
              <div className="mt-8 p-5 bg-[#24262A] border border-[#3A3B40] rounded-sm text-center">
                <span className="text-xl block mb-1">📍</span>
                <span className="text-xs font-semibold text-white block">
                  {isAr ? 'خريطة مقر الشركة' : 'Company Office Location Map'}
                </span>
                <span className="text-[10px] text-[#A9A49C] block mt-1">
                  {isAr ? 'سيتم ربط خريطة Google المعتمدة فور تأكيد العنوان التفصيلي' : 'Google Maps embed will be activated upon address confirmation'}
                </span>
              </div>

              {/* Pathway to Detailed Enquiry */}
              <div className="mt-8 pt-6 border-t border-[#313338]">
                <p className="text-xs text-[#D2CEC7] mb-3">
                  {isAr
                    ? 'هل لديك رسومات أو رغبة في تحديد نطاق عمل تفصيلي؟'
                    : 'Have drawings or require a comprehensive scope specification?'}
                </p>
                <Link
                  href="/services#enquiry-form"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#D96B24] hover:text-[#F48A44] transition-colors"
                >
                  <span>{isAr ? 'فتح استمارة دراسة المشروع المتكاملة' : 'Open detailed project enquiry form'}</span>
                  <ArrowUpRightIcon className="w-3.5 h-3.5 rtl:-scale-x-100" />
                </Link>
              </div>
            </aside>

            {/* General Contact Form (7 cols) */}
            <div className="lg:col-span-7">
              <GeneralContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
