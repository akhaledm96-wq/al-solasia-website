'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import BeforeAfterSlider from '@/components/ui/BeforeAfterSlider';
import { Link } from '@/i18n/routing';
import { CheckIcon, ArrowUpRightIcon } from '@/components/ui/Icons';

interface ShowcaseProject {
  id: string;
  tabLabel: { en: string; ar: string };
  title: { en: string; ar: string };
  client: { en: string; ar: string };
  location: { en: string; ar: string };
  year: string;
  beforeImage: string;
  afterImage: string;
  beforeTag: { en: string; ar: string };
  afterTag: { en: string; ar: string };
  aspectRatioClass: string;
  specs: Array<{
    title: { en: string; ar: string };
    desc: { en: string; ar: string };
  }>;
}

const showcaseProjects: ShowcaseProject[] = [
  {
    id: 'dokki',
    tabLabel: {
      en: '01 DOKKI CENTRAL EXCHANGE',
      ar: '٠١ سنترال الدقي — تأهيل وتطوير الواجهات',
    },
    title: {
      en: 'Dokki Central Exchange Facade Rehabilitation',
      ar: 'تأهيل وتجديد واجهات سنترال الدقي الرئيسي',
    },
    client: {
      en: 'Telecom Egypt',
      ar: 'المصرية للاتصالات',
    },
    location: {
      en: 'Dokki, Giza, Egypt',
      ar: 'الدقي، الجيزة، مصر',
    },
    year: '2021',
    beforeImage: '/projects/dokki-before.jpg',
    afterImage: '/projects/dokki-after.jpg',
    beforeTag: {
      en: 'BEFORE — WEATHERED CONCRETE FACADE',
      ar: 'قبل — الواجهة الخرسانية المتقادمة',
    },
    afterTag: {
      en: 'AFTER — COMPLETED MODERN FACADE',
      ar: 'بعد — اكتمال أعمال التأهيل والتطوير',
    },
    aspectRatioClass: 'aspect-[4/3] md:aspect-[16/10]',
    specs: [
      {
        title: { en: 'STRUCTURAL REPAIR', ar: 'معالجة الخرسانات' },
        desc: {
          en: 'Concrete spall repair, carbonation treatment & structural reinforcement',
          ar: 'معالجة الشروخ والخرسانات المتضررة وعزل حديد التسليح وحمايته',
        },
      },
      {
        title: { en: 'ARCHITECTURAL CLADDING', ar: 'التكسيات المعمارية' },
        desc: {
          en: 'Precision composite aluminum cladding with corporate brand alignment',
          ar: 'تكسيات كلادينج معمارية متطورة مطابقة للهوية البصرية المعتمدة',
        },
      },
      {
        title: { en: 'WEATHERPROOF FINISHES', ar: 'دهانات الحماية' },
        desc: {
          en: 'High-performance elastomeric UV & moisture barrier exterior coating',
          ar: 'أنظمة دهانات مطاطية متقدمة مقاومة للأشعة فوق البنفسجية والعوامل الجوية',
        },
      },
      {
        title: { en: 'OPERATIONAL CONTINUITY', ar: 'استمرارية التشغيل' },
        desc: {
          en: '100% zero-disruption delivery while maintaining active telecom services',
          ar: 'تسليم كامل ومنضبط للموقع دون توقف أو انقطاع لخدمات السنترال',
        },
      },
    ],
  },
  {
    id: 'portsaid',
    tabLabel: {
      en: '02 PORT SAID EXCHANGE',
      ar: '٠٢ سنترال بورسعيد — تطوير إنشائي ومعماري',
    },
    title: {
      en: 'Port Said Exchange Building Coastal Renovation',
      ar: 'تطوير وتجديد مبنى سنترال بورسعيد الساحلي',
    },
    client: {
      en: 'Telecom Egypt',
      ar: 'المصرية للاتصالات',
    },
    location: {
      en: 'Port Said, Egypt',
      ar: 'بورسعيد، مصر',
    },
    year: 'Selected Works',
    beforeImage: '/projects/portsaid-before.jpg',
    afterImage: '/projects/portsaid-after.png',
    beforeTag: {
      en: 'BEFORE — MARITIME CONCRETE WEAR',
      ar: 'قبل — تآكل الخرسانات بالأجواء الساحلية',
    },
    afterTag: {
      en: 'AFTER — CLADDED & GLAZED FACADE',
      ar: 'بعد — تكسيات كلادينج وواجهات زجاجية حديثة',
    },
    aspectRatioClass: 'aspect-[3/4] sm:aspect-[4/5] md:aspect-[3/4] max-w-2xl mx-auto',
    specs: [
      {
        title: { en: 'MARITIME DURABILITY', ar: 'مقاومة البيئة الساحلية' },
        desc: {
          en: 'Marine-grade materials resistant to high salinity, humidity and sea mist',
          ar: 'مكونات وتشطيبات عالية المقاومة للأملاح والرطوبة البحرية المباشرة',
        },
      },
      {
        title: { en: 'STRUCTURAL GLAZING', ar: 'الواجهات الزجاجية' },
        desc: {
          en: 'Double-glazed solar reflective glass panels for thermal efficiency',
          ar: 'قطاعات زجاجية مزدوجة عاكسة وموفرة للطاقة ومانعة للحرارة',
        },
      },
      {
        title: { en: 'FACADE ILLUMINATION', ar: 'الإضاءة المعمارية' },
        desc: {
          en: 'Integrated daytime & nighttime architectural presence and corporate signage',
          ar: 'تنسيق واجهات المبنى وإبراز الهوية البصرية الرسمية بأعلى دقة',
        },
      },
      {
        title: { en: 'CIVIL PROTECTION', ar: 'معايير السلامة' },
        desc: {
          en: 'Compliance with public building safety and perimeter standards',
          ar: 'الالتزام التام باشتراطات الحماية المدنية وسلامة المنشآت الحيوية',
        },
      },
    ],
  },
  {
    id: 'shubra',
    tabLabel: {
      en: '03 SHUBRA EL KHEIMA EXCHANGE',
      ar: '٠٣ سنترال شبرا الخيمة — تأهيل الواجهات والمبنى',
    },
    title: {
      en: 'Shubra El Kheima Exchange Courtyard & Facade Renovation',
      ar: 'تأهيل وتجديد واجهات وفناء سنترال شبرا الخيمة',
    },
    client: {
      en: 'Telecom Egypt',
      ar: 'المصرية للاتصالات',
    },
    location: {
      en: 'Qalyubia / Greater Cairo, Egypt',
      ar: 'شبرا الخيمة، القليوبية، مصر',
    },
    year: 'Selected Works',
    beforeImage: '/projects/shubra-before.jpg',
    afterImage: '/projects/shubra-after.jpg',
    beforeTag: {
      en: 'BEFORE — STRUCTURAL WEAR & SPALLING',
      ar: 'قبل — تضرر الواجهات وتآكل العناصر الإنشائية',
    },
    afterTag: {
      en: 'AFTER — RESTORED FACADE & APERTURES',
      ar: 'بعد — تجديد الواجهات والنوافذ وتنسيق الموقع',
    },
    aspectRatioClass: 'aspect-square max-w-2xl mx-auto',
    specs: [
      {
        title: { en: 'STRUCTURAL REMEDIATION', ar: 'المعالجة الإنشائية' },
        desc: {
          en: 'Concrete spall remediation, surface decontamination & reinforcement',
          ar: 'إزالة الأضرار السطحية وترميم ومعالجة الخرسانات المتضررة بعناية',
        },
      },
      {
        title: { en: 'ALUMINUM FENESTRATION', ar: 'القطاعات والألمنيوم' },
        desc: {
          en: 'Continuous architectural aluminum windows & perimeter thermal sealing',
          ar: 'تركيب قطاعات ألمنيوم حديثة وعزل النوافذ والفتحات المعمارية',
        },
      },
      {
        title: { en: 'PROTECTIVE FINISHES', ar: 'دهانات الحماية' },
        desc: {
          en: 'Multi-coat weather-resistant mineral plaster and facade coatings',
          ar: 'دهانات وتشطيبات خارجية متطورة مقاومة للعوامل الجوية وتغير المناخ',
        },
      },
      {
        title: { en: 'SITE INFRASTRUCTURE', ar: 'تنسيق الموقع والأرضيات' },
        desc: {
          en: 'Ground-level surface paving, safety curbs, and site access coordination',
          ar: 'تجديد أرضيات الفناء وتنسيق البردورات والأرصفة ومسارات السلامة',
        },
      },
    ],
  },
];

export default function BeforeAfterShowcase() {
  const locale = useLocale();
  const isAr = locale === 'ar';
  const [activeTab, setActiveTab] = useState<string>('dokki');

  const currentProject =
    showcaseProjects.find((p) => p.id === activeTab) || showcaseProjects[0];

  return (
    <section className="py-16 md:py-24 bg-[#EBE7DF] border-b border-[#D8D3CA]">
      <div className="container-custom">
        {/* Section Heading */}
        <div className="max-w-3xl mb-10">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#D96B24] block mb-2">
            {isAr
              ? 'التأهيل الإنشائي والمعماري (قبل وبعد)'
              : 'ENGINEERING REHABILITATION & RESTORATION'}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#191A1C] leading-tight mb-4">
            {isAr
              ? 'توثيق ميداني للتحول الهندسي للمشروعات'
              : 'Documented Before & After Transformations'}
          </h2>
          <p className="text-xs sm:text-sm text-[#686761] leading-relaxed">
            {isAr
              ? 'اسحب الفاصل التفاعلي لمشاهدة كيف تحول الثلاثية لهندسة البناء المنشآت القديمة والمتقادمة إلى صروح معمارية حديثة ومطابقة لأعلى المواصفات الإنشائية.'
              : 'Drag the interactive divider to inspect how Al-Solasia transforms aging public infrastructure into modernized, resilient architectural landmarks.'}
          </p>
        </div>

        {/* Project Selector Tabs (TRIA Style) */}
        <div className="flex overflow-x-auto border-b border-[#D8D3CA] mb-0 bg-[#E0DCD4]">
          {showcaseProjects.map((p) => {
            const isActive = activeTab === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setActiveTab(p.id)}
                className={`shrink-0 px-4 sm:px-7 py-3.5 text-xs sm:text-sm font-bold tracking-wider transition-all duration-200 cursor-pointer border-t-2 whitespace-nowrap ${
                  isActive
                    ? 'border-[#D96B24] bg-white text-[#191A1C] shadow-xs'
                    : 'border-transparent text-[#686761] hover:text-[#191A1C] hover:bg-white/60'
                }`}
              >
                {isAr ? p.tabLabel.ar : p.tabLabel.en}
              </button>
            );
          })}
        </div>

        {/* Interactive Comparison Container */}
        <div className="bg-white p-4 sm:p-6 md:p-8 border-x border-b border-[#D8D3CA] shadow-sm">
          {/* Project Meta Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-[#D8D3CA]/60">
            <div>
              <span className="text-[10px] font-bold tracking-widest uppercase text-[#D96B24] block mb-1">
                {isAr ? currentProject.location.ar : currentProject.location.en}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-[#191A1C]">
                {isAr ? currentProject.title.ar : currentProject.title.en}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-[#191A1C] text-white text-[10px] font-bold uppercase rounded-xs">
                {isAr ? currentProject.client.ar : currentProject.client.en}
              </span>
              <span className="px-2.5 py-1 bg-[#F4F1EB] text-[#191A1C] text-[10px] font-mono rounded-xs border border-[#D8D3CA]">
                {currentProject.year}
              </span>
            </div>
          </div>

          {/* TRIA Style Slider */}
          <BeforeAfterSlider
            key={currentProject.id}
            beforeImage={currentProject.beforeImage}
            afterImage={currentProject.afterImage}
            beforeLabel={isAr ? currentProject.beforeTag.ar : currentProject.beforeTag.en}
            afterLabel={isAr ? currentProject.afterTag.ar : currentProject.afterTag.en}
            alt={isAr ? currentProject.title.ar : currentProject.title.en}
            aspectRatioClass={currentProject.aspectRatioClass}
            initialPosition={50}
          />

          {/* 4-Column Engineering Specification Cards (TRIA Style) */}
          <div className="mt-10 pt-8 border-t border-[#D8D3CA] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentProject.specs.map((spec, idx) => (
              <div key={idx} className="flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-5 h-5 rounded-full bg-[#D96B24]/10 text-[#D96B24] flex items-center justify-center shrink-0">
                    <CheckIcon className="w-3 h-3 text-[#D96B24]" />
                  </span>
                  <h4 className="text-xs font-bold tracking-wider uppercase text-[#191A1C]">
                    {isAr ? spec.title.ar : spec.title.en}
                  </h4>
                </div>
                <p className="text-xs text-[#686761] leading-relaxed ps-6">
                  {isAr ? spec.desc.ar : spec.desc.en}
                </p>
              </div>
            ))}
          </div>

          {/* Consultation CTA Bar */}
          <div className="mt-8 pt-6 border-t border-[#D8D3CA]/60 flex flex-wrap items-center justify-between gap-4 bg-[#F4F1EB] p-4 rounded-sm">
            <div className="max-w-xl">
              <h5 className="text-xs font-bold text-[#191A1C] mb-1">
                {isAr
                  ? 'هل تمتلك منشأة أو مبنى يحتاج إلى فحص إنشائي وتجديد واجهات؟'
                  : 'Own a building or facility requiring structural assessment and facade renovation?'}
              </h5>
              <p className="text-[11px] text-[#686761]">
                {isAr
                  ? 'يقدم فريقنا الهندسي دراسات تقييم دقيقة وجداول تنفيذ تضمن استمرارية العمل دون انقطاع.'
                  : 'Our engineering team delivers detailed structural surveys and scheduled execution plans that guarantee operational continuity.'}
              </p>
            </div>
            <Link
              href="/contact"
              className="px-5 py-2.5 bg-[#191A1C] hover:bg-[#D96B24] text-white text-xs font-bold rounded-sm transition-colors flex items-center gap-2"
            >
              <span>{isAr ? 'طلب معاينة وتقييم موقع' : 'Request Site Evaluation'}</span>
              <ArrowUpRightIcon className="w-3.5 h-3.5 rtl:-scale-x-100" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
