import { useLocale } from 'next-intl';
import PageHero from '@/components/layout/PageHero';
import { ShieldCheckIcon, CheckIcon } from '@/components/ui/Icons';
import { Link } from '@/i18n/routing';

export default function PrivacyPage() {
  const locale = useLocale();
  const isAr = locale === 'ar';

  const sections = [
    {
      title: isAr ? '١. جمع البيانات ونطاق المعلومات' : '1. Information We Collect',
      content: isAr
        ? 'نقوم بجمع المعلومات التي يقدمها العميل طوعًا عبر نماذج الموقع (استمارة دراسة المشروع المتكاملة ونموذج التواصل العام)، وتشمل: الاسم، رقم الهاتف، البريد الإلكتروني، موقع العقار أو قطعة الأرض، نوع المشروع ونطاق الأعمال المطلوبة، وأي ملاحظات أو ملفات هندسية مرفقة.'
        : 'We collect information voluntarily submitted by prospective clients through our website enquiry and contact forms. This includes: client name, contact telephone, email address, property or plot location, project typology and desired scope of work, and any technical notes or architectural attachments provided.',
    },
    {
      title: isAr ? '٢. الغرض من معالجة البيانات' : '2. Purpose of Data Use',
      content: isAr
        ? 'تُستخدم كافة البيانات المستلمة حصرًا للأغراض الهندسية والتعاقدية التالية: دراسة الجدوى الفنية للمشروع، إعداد المقايسات ونطاق الأعمال التقديري، التواصل المباشر مع المالك لتنسيق المعاينات الميدانية، والرد على الاستفسارات الفنية.'
        : 'All submitted data is utilized strictly for engineering and project coordination purposes: conducting constructability and technical feasibility evaluations, preparing preliminary scopes of work and estimates, coordinating on-site visits with property owners, and responding to technical enquiries.',
    },
    {
      title: isAr ? '٣. سرية المخططات والرسومات الهندسية' : '3. Confidentiality of Architectural Drawings',
      content: isAr
        ? 'تلتزم شركة الثلاثية بالسرية التامة لكافة المخططات المعمارية، التصاميم الإنشائية، وبيانات الملكية التي يشاركها العميل معنا. لا يتم نشر أي مستندات أو تصاميم أو تفاصيل خاصة دون موافقة كتابية صريحة من المالك.'
        : 'Al-Solasia enforces strict confidentiality over all architectural drawings, structural calculations, and proprietary site data shared with us. No project documentation, plans, or owner details are published or disclosed without explicit written authorization.',
    },
    {
      title: isAr ? '٤. عدم مشاركة البيانات مع أطراف ثالثة' : '4. Zero Third-Party Data Sharing',
      content: isAr
        ? 'لا نقوم ببيع، تأجير، أو مشاركة بيانات التواصل الخاصة بعملائنا مع أي جهات تسويقية أو شركات تجارية خارجية. تقتصر معالجة البيانات على المهندسين والإداريين المختصين داخل الشركة فقط.'
        : 'We do not sell, rent, monetize, or distribute client contact details to third-party marketers or commercial platforms. Data handling is strictly restricted to designated engineering and administrative personnel within Al-Solasia.',
    },
    {
      title: isAr ? '٥. أمن البيانات والتخزين المحلي' : '5. Data Security & Storage Boundaries',
      content: isAr
        ? 'تُحفظ سجلات الاستفسارات في بيئة رقمية آمنة ومشفرة، ويتم إسناد معرفات موحدة (UUID v4) لكل استفسار لتسهيل المتابعة، مع عزل تام عن أي منصات تتبع خارجية غير موثوقة.'
        : 'Enquiry records are stored within a secured digital environment, utilizing UUID v4 identifiers and strict data ingestion boundaries that prevent unauthorized external telemetry or data exposure.',
    },
    {
      title: isAr ? '٦. حقوق العميل والتواصل' : '6. Client Rights & Data Inquiries',
      content: isAr
        ? 'يحق للعميل في أي وقت طلب مراجعة، تحديث، أو حذف بيانات التواصل الخاصة به من سجلاتنا بمجرد مراسلتنا عبر البريد الرسمي أو الاتصال بنا.'
        : 'Clients have the right at any time to request review, rectification, or complete deletion of their contact records from our systems by contacting our administration directly.',
    },
  ];

  return (
    <div>
      <PageHero
        crumb={isAr ? 'الثلاثية / الخصوصية' : 'AL-SOLASIA / PRIVACY'}
        title={isAr ? 'سياسة الخصوصية وسرية البيانات' : 'Privacy & Data Protection Policy'}
        desc={
          isAr
            ? 'نلتزم بأعلى معايير الأمان والسرية المهنية في التعامل مع بيانات عملائنا والمخططات الهندسية للمشروعات.'
            : 'We maintain strict professional confidentiality and transparent data governance regarding client information and architectural documentation.'
        }
      />

      <section className="py-20 bg-[#F4F1EB] border-b border-[#D8D3CA]">
        <div className="container-custom max-w-4xl">
          {/* Trust Banner */}
          <div className="bg-white p-6 sm:p-8 rounded-sm border border-[#D8D3CA] shadow-xs mb-10 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#D96B24]/10 text-[#D96B24] flex items-center justify-center shrink-0 mt-1">
              <ShieldCheckIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#191A1C] mb-1">
                {isAr ? 'التزام مهني مستمر منذ عام ١٩٩٢' : 'Professional Commitment Since 1992'}
              </h3>
              <p className="text-xs sm:text-sm text-[#686761] leading-relaxed">
                {isAr
                  ? 'تتعامل شركة الثلاثية لهندسة البناء مع كل مشروع واستفسار بأقصى درجات المسؤولية والنزاهة المهنية. جميع الحقوق محمية بموجب القوانين واللوائح المعمول بها في جمهورية مصر العربية.'
                  : 'Al-Solasia Building Engineering treats every project inquiry with the utmost engineering accountability. All policies adhere to applicable commercial and data privacy regulations in Egypt.'}
              </p>
            </div>
          </div>

          {/* Policy Sections */}
          <div className="space-y-6">
            {sections.map((section, idx) => (
              <div
                key={idx}
                className="bg-white p-6 sm:p-8 rounded-sm border border-[#D8D3CA] shadow-xs"
              >
                <h3 className="text-base font-bold text-[#191A1C] mb-3">
                  {section.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#686761] leading-relaxed">
                  {section.content}
                </p>
              </div>
            ))}
          </div>

          {/* Contact Box */}
          <div className="mt-10 p-6 bg-[#EEEDE9] rounded-sm border border-[#D8D3CA] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-xs font-bold text-[#191A1C] uppercase tracking-wider mb-1">
                {isAr ? 'لديك استفسار حول سياسة الخصوصية؟' : 'Questions Regarding Our Privacy Standards?'}
              </h4>
              <p className="text-xs text-[#686761]">
                {isAr
                  ? 'فريقنا الهندسي والإداري جاهز للإجابة على أي تساؤل يتعلق بحماية وسرية بيانات مشروعك.'
                  : 'Our engineering and administrative management is available to clarify any aspect of our confidentiality practices.'}
              </p>
            </div>

            <Link
              href="/contact"
              className="px-5 py-2.5 bg-[#D96B24] hover:bg-[#B85819] text-white text-xs font-bold rounded-sm transition-colors shrink-0"
            >
              <span>{isAr ? 'تواصل معنا' : 'Contact Us'}</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
