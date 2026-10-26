export interface ProjectItem {
  id: string;
  category: 'infrastructure' | 'civic' | 'commercial' | 'restoration';
  image: string;
  beforeImage?: string;
  isBeforeAfter?: boolean;
  year?: string;
  title: {
    en: string;
    ar: string;
  };
  client: {
    en: string;
    ar: string;
  };
  location: {
    en: string;
    ar: string;
  };
  scope: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
}

export const projectsData: ProjectItem[] = [
  {
    id: 'telecom-facility',
    category: 'infrastructure',
    image: '/projects/telecom-egypt-facility.jpg',
    year: '2021 – 2024',
    title: {
      en: 'Modern Telecommunications & Data Facility',
      ar: 'مبنى ومجمع اتصالات وبنية تحتية حديث',
    },
    client: {
      en: 'Telecom Egypt',
      ar: 'المصرية للاتصالات',
    },
    location: {
      en: 'Greater Cairo, Egypt',
      ar: 'القاهرة الكبرى، مصر',
    },
    scope: {
      en: 'Civil construction, composite cladding, structural curtain walling, MEP coordination, and site delivery.',
      ar: 'أعمال التشييد المدني، التكسيات المعمارية بالكلادينج، الواجهات الزجاجية، والأعمال الكهروميكانيكية.',
    },
    description: {
      en: 'Comprehensive execution of administrative and critical technical facility featuring multi-story composite aluminum paneling, solar-reflective structural curtain walling, and security perimeter fencing.',
      ar: 'تنفيذ متكامل لمبنى إداري وتشغيلي متطور يشمل واجهات الكلادينج والزجاج العاكس المزدوج والأسوار الأمنية والبوابات.',
    },
  },
  {
    id: 'dokki-exchange',
    category: 'restoration',
    image: '/projects/dokki-after.jpg',
    beforeImage: '/projects/dokki-before.jpg',
    isBeforeAfter: true,
    year: '2021',
    title: {
      en: 'Dokki Central Exchange Facade Rehabilitation',
      ar: 'تأهيل وتجديد واجهات سنترال الدقي',
    },
    client: {
      en: 'Telecom Egypt',
      ar: 'المصرية للاتصالات',
    },
    location: {
      en: 'Dokki, Giza, Egypt',
      ar: 'الدقي، الجيزة، مصر',
    },
    scope: {
      en: 'Structural concrete repair, exterior facade modern overhaul, high-performance exterior painting, and brand installation.',
      ar: 'معالجة وترميم الخرسانات المتضررة، تجديد شامل للواجهات الخارجية، ودهانات مقاومة للعوامل الجوية وتثبيت الهوية البصرية.',
    },
    description: {
      en: 'Turnkey rehabilitation project addressing concrete spalling and weathering, upgrading the urban facade of an active high-capacity telecommunications exchange building.',
      ar: 'مشروع ترميم وإعادة تأهيل متكامل لواجهة مبنى السنترال الرئيسي بالدقي مع استمرار تشغيل المبنى دون انقطاع للخدمة.',
    },
  },
  {
    id: 'portsaid-exchange',
    category: 'restoration',
    image: '/projects/portsaid-after.png',
    beforeImage: '/projects/portsaid-before.jpg',
    isBeforeAfter: true,
    year: 'Selected Works',
    title: {
      en: 'Port Said Exchange Building Renovation',
      ar: 'تطوير وتجديد مبنى سنترال بورسعيد',
    },
    client: {
      en: 'Telecom Egypt',
      ar: 'المصرية للاتصالات',
    },
    location: {
      en: 'Port Said, Egypt',
      ar: 'بورسعيد، مصر',
    },
    scope: {
      en: 'Exterior restoration, architectural cladding, thermal insulation, and facade lighting.',
      ar: 'أعمال الترميم الخارجي، تكسيات الواجهات الحديثة، العزل الحراري والرطوبي، والإضاءة المعمارية.',
    },
    description: {
      en: 'Complete visual and structural upgrade from dated weathered concrete to modern corporate architectural cladding with marine-grade environmental resistance.',
      ar: 'تحديث إنشائي ومعماري شامل لمبنى السنترال بمواد وتشطيبات مقاومة للرطوبة والأجواء الساحلية.',
    },
  },
  {
    id: 'shubra-exchange',
    category: 'restoration',
    image: '/projects/shubra-after.jpg',
    beforeImage: '/projects/shubra-before.jpg',
    isBeforeAfter: true,
    year: 'Selected Works',
    title: {
      en: 'Shubra El Kheima Exchange Renovation',
      ar: 'تطوير وإعادة تأهيل سنترال شبرا الخيمة',
    },
    client: {
      en: 'Telecom Egypt',
      ar: 'المصرية للاتصالات',
    },
    location: {
      en: 'Qalyubia / Greater Cairo, Egypt',
      ar: 'شبرا الخيمة، القليوبية، مصر',
    },
    scope: {
      en: 'Facade transformation, entrance redesign, structural integrity assessment, and high-durability finishes.',
      ar: 'تطوير واجهة المبنى بالكامل، إعادة تصميم المدخل الرئيسي، الفحص الإنشائي للواجهات، والتشطيبات عالية التحمل.',
    },
    description: {
      en: 'Major transformation of one of the busiest telecom hubs in Greater Cairo, transforming a worn facade into a modern engineering milestone.',
      ar: 'تطوير جذري لأحد أهم مراكز الاتصالات في القاهرة الكبرى وتحويل الواجهات القديمة إلى مظهر عصري منضبط.',
    },
  },
  {
    id: 'fustat-exchange',
    category: 'infrastructure',
    image: '/projects/fustat-exchange.jpg',
    year: 'Selected Works',
    title: {
      en: 'Fustat Central Telecommunications Center',
      ar: 'أعمال مبنى سنترال الفسطاط',
    },
    client: {
      en: 'Telecom Egypt',
      ar: 'المصرية للاتصالات',
    },
    location: {
      en: 'Old Cairo / Fustat, Cairo, Egypt',
      ar: 'الفسطاط، القاهرة القديمة، مصر',
    },
    scope: {
      en: 'Structural development, interior fit-out coordination, and site boundary fencing.',
      ar: 'التطوير الإنشائي وتجهيز المبنى وتنسيق الأعمال الداخلية والأسوار المحيطة.',
    },
    description: {
      en: 'Specialized construction and finishing works designed to meet heavy equipment loadings and telecom infrastructure standards.',
      ar: 'أعمال المقاولات والتشطيبات التخصصية المتوافقة مع متطلبات الأحمال الثقيلة لمعدات شبكات الاتصال.',
    },
  },
  {
    id: 'ahmed-orabi-hall',
    category: 'commercial',
    image: '/projects/ahmed-orabi-hall-1.jpg',
    year: 'Selected Works',
    title: {
      en: 'Ahmed Orabi Exchange Customer Operations Hall',
      ar: 'صالة خدمة العملاء والعمليات بسنترال أحمد عرابي',
    },
    client: {
      en: 'Telecom Egypt',
      ar: 'المصرية للاتصالات',
    },
    location: {
      en: 'Mohandessin, Giza, Egypt',
      ar: 'المهندسين، الجيزة، مصر',
    },
    scope: {
      en: 'Turnkey interior finishing, acoustic ceiling installation, lighting design, technical flooring, and teller counter fit-out.',
      ar: 'تشطيبات داخلية متكاملة، أسقف صوتية معلقة، أرضيات فنية متخصصة، وأعمال كاونترات خدمة العملاء.',
    },
    description: {
      en: 'High-traffic commercial customer service hall built to corporate brand guidelines with durable flooring and modern architectural lighting.',
      ar: 'تنفيذ صالة خدمة عملاء رئيسية ذات معدلات تردد عالية وفق أحدث المواصفات المعمارية للتجهيزات الداخلية.',
    },
  },
  {
    id: 'rokn-elsafa-mosque',
    category: 'civic',
    image: '/projects/rokn-elsafa-mosque.jpg',
    year: 'Selected Works',
    title: {
      en: 'Rokn El Safa Mosque Construction',
      ar: 'مشروع بناء وتشييد مسجد ركن الصفا',
    },
    client: {
      en: 'Civic & Community Works',
      ar: 'أعمال ومباني خدمية ومجتمعية',
    },
    location: {
      en: 'Egypt',
      ar: 'جمهورية مصر العربية',
    },
    scope: {
      en: 'Reinforced concrete structure, dome and minaret structural engineering, Islamic architectural plasterwork, and prayer hall finishing.',
      ar: 'الهيكل الخرساني المسلح، الهندسة الإنشائية للقبة والمئذنة، الزخارف والكرانيش المعمارية، وتشطيبات قاعة الصلاة.',
    },
    description: {
      en: 'Complete structural construction and finishing of a landmark community mosque with detailed minaret and dome construction.',
      ar: 'تنفيذ إنشائي ومعماري متكامل يشمل بناء القباب والمآذن والتشطيبات الداخلية والخارجية وفق الطراز المعماري الإسلامي.',
    },
  },
  {
    id: 'shorouk-outlet',
    category: 'commercial',
    image: '/projects/shorouk-sales-outlet.jpg',
    year: 'Selected Works',
    title: {
      en: 'Shorouk Commercial Sales & Service Outlet',
      ar: 'منفذ بيع وخدمات تجاري بمدينة الشروق',
    },
    client: {
      en: 'Commercial Client',
      ar: 'قطاع تجاري ومؤسسي',
    },
    location: {
      en: 'El Shorouk City, Cairo, Egypt',
      ar: 'مدينة الشروق، القاهرة، مصر',
    },
    scope: {
      en: 'Fast-track interior & exterior commercial fit-out, storefront glazing, and MEP integration.',
      ar: 'أعمال التجهيزات والتشطيبات التجارية السريعة، الواجهات الزجاجية، والأعمال الكهروميكانيكية.',
    },
    description: {
      en: 'Modern commercial retail facility delivered on an accelerated schedule with premium aluminum composite finishes.',
      ar: 'تنفيذ مقر ومنفذ تجاري متكامل بمواصفات معمارية حديثة وتسليم في زمن قياسي.',
    },
  },
  {
    id: 'new-mansoura-facade',
    category: 'infrastructure',
    image: '/projects/new-mansoura-facade.jpg',
    year: 'Selected Works',
    title: {
      en: 'New Mansoura Facade & Structural Works',
      ar: 'أعمال واجهات وتشييد بالمنصورة الجديدة',
    },
    client: {
      en: 'Institutional Works',
      ar: 'أعمال ومشروعات مؤسسية',
    },
    location: {
      en: 'New Mansoura City, Egypt',
      ar: 'مدينة المنصورة الجديدة، مصر',
    },
    scope: {
      en: 'Civil construction, modern cladding installations, architectural cornices, and coastal-grade exterior protection.',
      ar: 'أعمال البناء والتشييد، تركيب تكسيات حديثة، والتشطيبات الخارجية المقاومة للظروف المناخية.',
    },
    description: {
      en: 'Engineering execution in Egypt’s modern fourth-generation coastal smart city, reflecting contemporary Egyptian civil development.',
      ar: 'أعمال تنفيذ هندسي بإحدى مدن الجيل الرابع الذكية في مصر بمواصفات معمارية متطورة.',
    },
  },
];
