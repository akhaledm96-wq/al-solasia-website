import { useLocale } from 'next-intl';
import PageHero from '@/components/layout/PageHero';
import { MailIcon, CheckIcon, ShieldCheckIcon, ArrowUpRightIcon } from '@/components/ui/Icons';
import { Link } from '@/i18n/routing';

export default function CareersPage() {
  const locale = useLocale();
  const isAr = locale === 'ar';

  const careerRoles = [
    {
      id: 'civil-engineer',
      title: isAr ? 'مهندس موقع مدني' : 'Site Civil Engineer',
      type: isAr ? 'دوام كامل · مواقع المشروعات' : 'Full-Time · Project Sites',
      experience: isAr ? 'خبرة ٣ - ٧ سنوات' : '3 – 7 Years Experience',
      responsibilities: isAr
        ? [
            'الإشراف المباشر على صب الخرسانات المسلحة وتنسيق أعمال الهيكل الإنشائي',
            'متابعة مقاولي الباطن ومطابقة التنفيذ للمخططات الإنشائية المعتمدة',
            'تطبيق اشتراطات السلامة المهنية وضبط الجودة في الموقع',
          ]
        : [
            'Direct supervision of reinforced concrete casting and structural framing',
            'Subcontractor coordination and compliance with approved structural drawings',
            'Enforcement of site occupational safety and rigorous quality control',
          ],
    },
    {
      id: 'finishing-engineer',
      title: isAr ? 'مهندس تشطيبات معمارية' : 'Architectural Finishing Engineer',
      type: isAr ? 'دوام كامل · مواقع المشروعات' : 'Full-Time · Project Sites',
      experience: isAr ? 'خبرة ٣ - ٦ سنوات' : '3 – 6 Years Experience',
      responsibilities: isAr
        ? [
            'إدارة وتنفيذ التشطيبات الداخلية والخارجية وتكسيات الواجهات والكلادينج',
            'فحص جودة المواد واعتماد عينات التوريدات وفق المواصفات القياسية',
            'التنسيق الدقيق مع مهندسي الكهرباء والميكانيكا لتلافي أي تعارضات',
          ]
        : [
            'Management and execution of interior/exterior finishes and facade cladding',
            'Material inspection and specification sampling verification',
            'Coordination with MEP disciplines to prevent on-site discrepancies',
          ],
    },
    {
      id: 'technical-office',
      title: isAr ? 'مهندس مكتب فني وحصر كميات' : 'Technical Office & QS Engineer',
      type: isAr ? 'دوام كامل · المقر الرئيسي' : 'Full-Time · Main Office',
      experience: isAr ? 'خبرة ٤ - ٨ سنوات' : '4 – 8 Years Experience',
      responsibilities: isAr
        ? [
            'إعداد ومراجعة المخططات التنفيذية (Shop Drawings) ومطابقتها للموقع',
            'حصر الكميات ومراجعة المستخلصات الشهرية ومطابقة التوريدات',
            'تجهيز ملفات الاعتمادات الفنية للمواد ومتابعة استشاري المشروع',
          ]
        : [
            'Preparation and review of approved shop drawings and site as-builts',
            'Quantity surveying, contractor interim invoices, and procurement audit',
            'Technical submittals compilation and consultant coordination',
          ],
    },
    {
      id: 'site-supervisor',
      title: isAr ? 'مشرف موقع عام' : 'Site General Supervisor',
      type: isAr ? 'دوام كامل · مواقع المشروعات' : 'Full-Time · Project Sites',
      experience: isAr ? 'خبرة ٥+ سنوات' : '5+ Years Experience',
      responsibilities: isAr
        ? [
            'المتابعة اليومية للعمالة ومقاولي التخصصات وتنظيم حركة التشوينات',
            'التأكد من التزام الموقع بالجدول الزمني اليومي ونظافة الموقع',
            'استلام الأعمال اليومية وإعداد تقرير الحضور والتشغيل الميداني',
          ]
        : [
            'Daily supervision of labor and specialist trades on project premises',
            'Material staging coordination and site safety logistics management',
            'Milestone handover inspection and daily progress reporting',
          ],
    },
  ];

  const benefits = [
    {
      title: isAr ? 'بيئة هندسية منضبطة' : 'Disciplined Engineering Culture',
      desc: isAr
        ? 'العمل ضمن منظومة مقاولات عريقة تلتزم بالكود والمواصفات القياسية.'
        : 'Work within an established contracting firm with strict code compliance.',
    },
    {
      title: isAr ? 'مشروعات متنوعة وكبرى' : 'Diverse Project Portfolio',
      desc: isAr
        ? 'فرص اكتساب خبرة ميدانية عبر قطاعات البنية التحتية، الفيلات، والترميم.'
        : 'Hands-on experience across critical infrastructure, villas, and rehabilitation.',
    },
    {
      title: isAr ? 'الاستقرار والشفافية' : 'Stability & Transparency',
      desc: isAr
        ? 'بيئة عمل تقدر الكفاءة المهنية والالتزام الميداني وتكافئ الإنجاز.'
        : 'A collaborative environment that values technical rigor and rewards execution.',
    },
  ];

  return (
    <div>
      <PageHero
        crumb={isAr ? 'الثلاثية / التوظيف' : 'AL-SOLASIA / CAREERS'}
        title={isAr ? 'انضم إلى فريق العمل الهندسي' : 'Join Our Engineering Team'}
        desc={
          isAr
            ? 'نرحب دائمًا بالمهندسين والمشرفين والكوادر الفنية ذات الكفاءة العالية للانضمام إلى مشروعاتنا في مختلف محافظات مصر.'
            : 'We welcome qualified civil engineers, site supervisors, and technical professionals who share our commitment to precision, accountability, and engineering craft.'
        }
      />

      {/* Culture & Benefits */}
      <section className="py-16 bg-[#F4F1EB] border-b border-[#D8D3CA]">
        <div className="container-custom">
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#D96B24] block mb-2">
              {isAr ? 'بيئة العمل' : 'WHY WORK WITH AL-SOLASIA'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#191A1C]">
              {isAr ? 'أكثر من ٣٠ عامًا من الخبرة والانضباط الميداني' : 'More Than 30 Years of Engineering Integrity'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((b, idx) => (
              <div key={idx} className="bg-white p-6 rounded-sm border border-[#D8D3CA] shadow-xs">
                <div className="w-8 h-8 rounded-full bg-[#D96B24]/10 text-[#D96B24] flex items-center justify-center mb-4">
                  <ShieldCheckIcon className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-[#191A1C] mb-2">{b.title}</h3>
                <p className="text-xs text-[#686761] leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Disciplines */}
      <section className="py-20 bg-[#EEEDE9] border-b border-[#D8D3CA]">
        <div className="container-custom">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#D96B24] block mb-2">
              {isAr ? 'التخصصات المطلوبة' : 'KEY ENGINEERING DISCIPLINES'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#191A1C]">
              {isAr ? 'مسارات وظيفية وفرص للمهندسين والمشرفين' : 'Opportunities for Technical & Field Professionals'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {careerRoles.map((role) => (
              <div
                key={role.id}
                className="bg-white p-6 sm:p-8 rounded-sm border border-[#D8D3CA] hover:border-[#D96B24] transition-all duration-200 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#D96B24] bg-[#D96B24]/10 px-2.5 py-1 rounded-xs">
                      {role.type}
                    </span>
                    <span className="text-[11px] font-mono text-[#686761]">
                      {role.experience}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#191A1C] mb-4">
                    {role.title}
                  </h3>

                  <div className="space-y-2 mb-6">
                    <h4 className="text-[11px] font-bold tracking-wider uppercase text-[#191A1C]">
                      {isAr ? 'المسؤوليات الرئيسية:' : 'Key Responsibilities:'}
                    </h4>
                    <ul className="space-y-2 text-xs text-[#686761]">
                      {role.responsibilities.map((resp, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-2">
                          <CheckIcon className="w-3.5 h-3.5 text-[#D96B24] shrink-0 mt-0.5" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#D8D3CA]/60">
                  <a
                    href="#apply-section"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D96B24] hover:text-[#B85819] transition-colors"
                  >
                    <span>{isAr ? 'التقديم لهذه الوظيفة' : 'Apply for this role'}</span>
                    <ArrowUpRightIcon className="w-3.5 h-3.5 rtl:-scale-x-100" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Submission Guidelines & Email Channel */}
          <div id="apply-section" className="bg-[#191A1C] text-white p-8 sm:p-10 rounded-sm shadow-xl border border-white/10">
            <div className="max-w-2xl">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#D96B24] block mb-2">
                {isAr ? 'آلية التقديم' : 'APPLICATION SUBMISSION'}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                {isAr ? 'أرسل سيرتك الذاتية وملف أعمالك' : 'Submit Your CV & Portfolio'}
              </h3>
              <p className="text-xs sm:text-sm text-[#D2CEC7] leading-relaxed mb-6">
                {isAr
                  ? 'يرجى إرسال السيرة الذاتية المحدثة مع سابقة المشروعات المشرف عليها إلى البريد الإلكتروني الرسمي لإدارة الموارد البشرية. يُرجى كتابة (المسمى الوظيفي - الاسم - سنوات الخبرة) في عنوان الرسالة.'
                  : 'Please send your updated CV and project reference list to our human resources department. Specify [Role Title - Candidate Name - Years of Experience] in the email subject line.'}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="mailto:careers@al-solasia.com"
                  className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#D96B24] hover:bg-[#B85819] text-white text-xs font-bold rounded-sm transition-colors shadow-md"
                >
                  <MailIcon className="w-4 h-4" />
                  <span>careers@al-solasia.com</span>
                </a>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-sm border border-white/20 transition-colors"
                >
                  <span>{isAr ? 'استفسار عام أو تواصل مباشر' : 'General Contact'}</span>
                </Link>
              </div>

              <p className="text-[10px] text-[#8E8B82] mt-4">
                {isAr
                  ? '* سيتم تأكيد عنوان البريد الإلكتروني الرسمي قبل الإطلاق النهائي للموقع.'
                  : '* Official recruiting email inbox will be verified prior to public domain deployment.'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
