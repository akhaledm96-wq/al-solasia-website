import { useTranslations, useLocale } from 'next-intl';
import PageHero from '@/components/layout/PageHero';
import ProjectEnquiryForm from '@/components/forms/ProjectEnquiryForm';
import { CheckIcon, ArrowDownIcon } from '@/components/ui/Icons';

export default function ServicesPage() {
  const t = useTranslations('services');
  const locale = useLocale();
  const isAr = locale === 'ar';

  const servicesDetails = [
    {
      num: '01',
      title: isAr ? 'التصميم المعماري والتنسيق الهندسي' : 'Architectural Design & Engineering Coordination',
      desc: isAr
        ? 'تنسيق عملي للتصميم المعماري والإنشائي للمشروعات السكنية والتجارية والمؤسسية مع مراجعة دقيقة لقابلية التنفيذ والجدوى الميدانية.'
        : 'Practical architectural and structural coordination for residential, commercial, and institutional projects with constructability input.',
      deliverables: isAr
        ? [
            'تنسيق ومراجعة المخططات المعمارية والإنشائية',
            'دراسة قابلية التنفيذ وترشيد تكاليف التشييد',
            'التنسيق الفني بين مختلف التخصصات الكهروميكانيكية',
          ]
        : [
            'Architectural & structural design coordination',
            'Constructability reviews and value engineering',
            'MEP and structural integration input',
          ],
    },
    {
      num: '02',
      title: isAr ? 'الإنشاءات والمقاولات المتكاملة' : 'Turnkey Construction & Contracting',
      desc: isAr
        ? 'تنفيذ مخطط للأعمال من الأساسات والهيكل الخرساني المسلح وأعمال البناء حتى التسليم المنضبط وفق المواصفات القياسية المصرية.'
        : 'Planned construction delivery from earthworks, foundations, and reinforced concrete to structured turnkey delivery.',
      deliverables: isAr
        ? [
            'تشييد الفيلات والمباني السكنية والتجارية',
            'تنفيذ الهياكل الخرسانية المسلحة والجمالونات',
            'إدارة الموقع ومقاولي الباطن والجدول الزمني',
          ]
        : [
            'New-build villa, residential, and commercial works',
            'Reinforced concrete and structural frameworks',
            'Site management and contractor coordination',
          ],
    },
    {
      num: '03',
      title: isAr ? 'التشطيبات والتجهيز والتجديد' : 'Finishing, Fit-out & Renovation',
      desc: isAr
        ? 'تنفيذ دقيق للتشطيبات الداخلية والخارجية للفيلات والشقق الفاخرة والمقرات الإدارية والتجارية بعناية فائقة للتفاصيل وجودة المواد.'
        : 'Interior and exterior architectural finishing, high-end apartment and villa renovations, and commercial space fit-outs.',
      deliverables: isAr
        ? [
            'أعمال التشطيبات المعمارية والديكورية المتكاملة',
            'تجديد شامل للفيلات والوحدات السكنية القائمة',
            'توريد وتنسيق الخامات والأرضيات والدهانات الفنية',
          ]
        : [
            'Integrated interior and exterior architectural finishes',
            'Full villa and apartment modern renovations',
            'Material selection, technical flooring, and acoustic work',
          ],
    },
    {
      num: '04',
      title: isAr ? 'الإصلاح والترميم وإعادة التأهيل' : 'Repair, Rehabilitation & Restoration',
      desc: isAr
        ? 'تقييم منظم وتخطيط أعمال معالجة عيوب المنشآت القائمة وإصلاح الشروخ وتآكل الخرسانات وتحديث واجهات المباني التاريخية والمؤسسية.'
        : 'Structured defect assessment and repair planning for existing buildings, concrete spalling rehabilitation, and facade modernization.',
      deliverables: isAr
        ? [
            'معالجة صدأ حديد التسليح وتدعيم العناصر الخرسانية',
            'تجديد وتكسية واجهات المباني القائمة بالكلادينج',
            'عزل مائي وحراري متطور لحماية الأصول العقارية',
          ]
        : [
            'Concrete repair, spalling remediation, and strengthening',
            'Modern facade recladding and architectural upgrades',
            'Advanced waterproofing and thermal barrier restoration',
          ],
    },
    {
      num: '05',
      title: isAr ? 'الإشراف الهندسي وإدارة الموقع' : 'Site Supervision & Quality Coordination',
      desc: isAr
        ? 'متابعة ميدانية منضبطة لمطابقة التنفيذ للمخططات والمواصفات ومراقبة الجودة وتوثيق تقدم الإنجاز عبر تقارير دورية شفافة.'
        : 'Disciplined site follow-up, quality control checks, milestone tracking, and transparent progress visibility for property owners.',
      deliverables: isAr
        ? [
            'زيارات دورية وإشراف فني على مطابقة المواصفات',
            'اعتماد العينات ومطابقة المواد للتوريدات',
            'تقارير متابعة دورية بالصور ومؤشرات الإنجاز',
          ]
        : [
            'Site inspection visits and technical specification compliance',
            'Material sampling approval and delivery verification',
            'Milestone reporting with visual progress documentation',
          ],
    },
    {
      num: '06',
      title: isAr ? 'تنسيق الموافقات والمستندات الفنية' : 'Approvals & Technical Documentation',
      desc: isAr
        ? 'المساعدة في تنظيم وإعداد مستندات المشروع ومطابقة الكود وتنسيق مسارات التراخيص وفق متطلبات الجهات المعنية ونطاق التعاقد.'
        : 'Assistance organizing technical submittals, building code compliance review, and coordinating approval documentation with authorities.',
      deliverables: isAr
        ? [
            'تجهيز وتنسيق المخططات والمستندات الفنية',
            'متابعة متطلبات الجهات التنظيمية والهندسية',
            'إعداد حزم التسليم النهائي وملفات (As-Built)',
          ]
        : [
            'Preparation of technical drawings and submittal sets',
            'Regulatory and authority coordination support',
            'As-built documentation packages and handover records',
          ],
    },
  ];

  return (
    <div>
      {/* 1. Dark Architectural Page Hero */}
      <PageHero
        crumb={isAr ? 'الثلاثية / خدماتنا' : 'AL-SOLASIA / SERVICES'}
        title={t('title')}
        desc={t('desc')}
      />

      {/* 2. Detailed Service Capability Sections */}
      <section className="py-20 bg-[#F4F1EB] border-b border-[#D8D3CA]">
        <div className="container-custom">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-bold tracking-[0.18em] uppercase text-[#D96B24] block mb-2">
              {isAr ? 'مجالات الاختصاص' : 'AREAS OF EXPERTISE'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#191A1C]">
              {isAr ? 'منهج هندسي متكامل من المخطط حتى التسليم' : 'Integrated Engineering from Blueprint to Handover'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {servicesDetails.map((svc) => (
              <div
                key={svc.num}
                className="bg-white p-8 rounded-sm border border-[#D8D3CA] hover:border-[#D96B24] transition-all duration-300 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#D8D3CA]/60">
                    <span className="text-sm font-extrabold text-[#D96B24] font-mono tracking-widest">
                      {svc.num}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-[#686761] tracking-widest">
                      AL-SOLASIA SCOPE
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#191A1C] mb-3 leading-snug">
                    {svc.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#686761] leading-relaxed mb-6">
                    {svc.desc}
                  </p>

                  <div className="space-y-2 mb-6">
                    <h4 className="text-[11px] font-bold tracking-wider uppercase text-[#191A1C]">
                      {isAr ? 'المخرجات الرئيسية:' : 'Key Deliverables:'}
                    </h4>
                    <ul className="space-y-1.5 text-xs text-[#191A1C]">
                      {svc.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckIcon className="w-3.5 h-3.5 text-[#D96B24] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#D8D3CA]/60">
                  <a
                    href="#enquiry-form"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D96B24] hover:text-[#B85819] transition-colors"
                  >
                    <span>{isAr ? 'طلب استشارة عن هذه الخدمة' : 'Request consultation for this service'}</span>
                    <ArrowDownIcon className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Detailed Project Enquiry Form Section */}
      <section className="py-20 bg-[#EEEDE9] border-b border-[#D8D3CA]">
        <div className="container-custom">
          <ProjectEnquiryForm />
        </div>
      </section>
    </div>
  );
}
