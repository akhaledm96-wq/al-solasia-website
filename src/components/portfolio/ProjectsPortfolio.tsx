'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { projectsData, ProjectItem } from '@/lib/projects-data';
import { Link } from '@/i18n/routing';
import BeforeAfterSlider from '@/components/ui/BeforeAfterSlider';
import { ArrowUpRightIcon, ArrowLeftRightIcon, CloseIcon } from '@/components/ui/Icons';

export default function ProjectsPortfolio() {
  const locale = useLocale();
  const isAr = locale === 'ar';

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [showBefore, setShowBefore] = useState<Record<string, boolean>>({});

  const categories = [
    { id: 'all', label: isAr ? 'جميع المشروعات' : 'All Projects' },
    { id: 'infrastructure', label: isAr ? 'البنية التحتية والاتصالات' : 'Infrastructure & Telecom' },
    { id: 'restoration', label: isAr ? 'التأهيل والترميم (قبل وبعد)' : 'Restoration & Facades' },
    { id: 'civic', label: isAr ? 'المساجد والمباني الخدمية' : 'Civic & Mosques' },
    { id: 'commercial', label: isAr ? 'التشطيبات والمقرات التجارية' : 'Commercial & Fit-out' },
  ];

  const filteredProjects =
    activeCategory === 'all'
      ? projectsData
      : projectsData.filter((p) => p.category === activeCategory);

  const toggleBeforeAfter = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setShowBefore((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="py-16 md:py-24 bg-[#F4F1EB]">
      <div className="container-custom">
        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2.5 mb-12">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs font-semibold rounded-sm transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#191A1C] text-white shadow-sm'
                    : 'bg-white text-[#686761] hover:text-[#191A1C] border border-[#D8D3CA] hover:border-[#D96B24]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            const isShowingBefore = !!showBefore[project.id];
            const currentImg =
              isShowingBefore && project.beforeImage
                ? project.beforeImage
                : project.image;

            return (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="bg-white rounded-sm border border-[#D8D3CA] hover:border-[#D96B24] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              >
                {/* Image Container with Before/After badge */}
                <div className="relative aspect-[4/3] bg-[#191A1C] overflow-hidden">
                  <Image
                    src={currentImg}
                    alt={isAr ? project.title.ar : project.title.en}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Gradient bottom shadow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Top Category Badge */}
                  <div className="absolute top-3.5 start-3.5 flex items-center gap-2">
                    <span className="px-2.5 py-1 bg-[#191A1C]/85 backdrop-blur-xs text-white text-[10px] font-bold tracking-widest uppercase rounded-xs border border-white/10">
                      {isAr ? project.client.ar : project.client.en}
                    </span>
                  </div>

                  {/* Before / After Toggle Button if applicable */}
                  {project.isBeforeAfter && project.beforeImage && (
                    <div className="absolute top-3.5 end-3.5">
                      <button
                        onClick={(e) => toggleBeforeAfter(project.id, e)}
                        className="px-2.5 py-1 bg-[#D96B24] hover:bg-[#B85819] text-white text-[10px] font-bold uppercase rounded-xs shadow-md transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <ArrowLeftRightIcon className="w-3 h-3" />
                        <span>
                          {isShowingBefore
                            ? isAr ? 'عرض بعد' : 'View After'
                            : isAr ? 'عرض قبل' : 'View Before'}
                        </span>
                      </button>
                    </div>
                  )}

                  {/* Year Tag */}
                  {project.year && (
                    <div className="absolute bottom-3 end-3 text-[10px] text-white/90 font-mono bg-black/60 px-2 py-0.5 rounded-xs">
                      {project.year}
                    </div>
                  )}
                </div>

                {/* Content Box */}
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-[#D96B24] block mb-1.5">
                      {isAr ? project.location.ar : project.location.en}
                    </span>

                    <h3 className="text-base sm:text-lg font-bold text-[#191A1C] leading-snug mb-3 group-hover:text-[#D96B24] transition-colors">
                      {isAr ? project.title.ar : project.title.en}
                    </h3>

                    <p className="text-xs text-[#686761] line-clamp-2 leading-relaxed mb-4">
                      {isAr ? project.scope.ar : project.scope.en}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#D8D3CA]/60 flex items-center justify-between text-xs font-bold text-[#D96B24]">
                    <span>{isAr ? 'عرض التفاصيل الكاملة' : 'View project details'}</span>
                    <ArrowUpRightIcon className="w-3.5 h-3.5 rtl:-scale-x-100 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal / Detailed Inspection Drawer */}
        {selectedProject && (
          <div
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
            onClick={() => setSelectedProject(null)}
          >
            <div
              className="bg-white rounded-sm max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#D8D3CA] text-[#191A1C]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Image View */}
              <div className="relative aspect-[16/9] sm:aspect-[21/9] bg-[#191A1C] overflow-hidden">
                <Image
                  src={selectedProject.image}
                  alt={isAr ? selectedProject.title.ar : selectedProject.title.en}
                  fill
                  className="object-cover"
                />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 end-4 w-9 h-9 bg-black/70 hover:bg-[#D96B24] text-white rounded-full flex items-center justify-center transition-colors shadow-md"
                  aria-label="Close"
                >
                  <CloseIcon className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="px-2.5 py-0.5 bg-[#D96B24] text-white text-[10px] font-bold uppercase rounded-xs">
                    {isAr ? selectedProject.client.ar : selectedProject.client.en}
                  </span>
                  <span className="text-xs text-[#686761] font-mono">
                    {selectedProject.year}
                  </span>
                  <span className="text-xs text-[#686761]">·</span>
                  <span className="text-xs text-[#686761]">
                    {isAr ? selectedProject.location.ar : selectedProject.location.en}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-[#191A1C] mb-4 leading-tight">
                  {isAr ? selectedProject.title.ar : selectedProject.title.en}
                </h2>

                <div className="bg-[#F4F1EB] p-4 rounded-sm border border-[#D8D3CA] mb-6">
                  <h4 className="text-xs font-bold text-[#D96B24] tracking-widest uppercase mb-1">
                    {isAr ? 'نطاق الأعمال المنفذة' : 'SCOPE OF WORK'}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#191A1C] leading-relaxed">
                    {isAr ? selectedProject.scope.ar : selectedProject.scope.en}
                  </p>
                </div>

                <div className="mb-8">
                  <h4 className="text-xs font-bold text-[#191A1C] tracking-widest uppercase mb-2">
                    {isAr ? 'عن المشروع' : 'PROJECT OVERVIEW'}
                  </h4>
                  <p className="text-sm text-[#686761] leading-relaxed">
                    {isAr
                      ? selectedProject.description.ar
                      : selectedProject.description.en}
                  </p>
                </div>

                {/* Before Image comparison if available */}
                {selectedProject.beforeImage && (
                  <div className="mb-8 p-4 sm:p-5 bg-[#EEEDE9] rounded-sm border border-[#D8D3CA]">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-xs font-bold text-[#191A1C] tracking-wider uppercase">
                        {isAr ? 'مقارنة تفاعلية لحالة الواجهة (قبل وبعد)' : 'Interactive Transformation Inspection (Before & After)'}
                      </h4>
                      <span className="flex items-center gap-1.5 text-[11px] text-[#D96B24] font-mono font-semibold">
                        <span>{isAr ? 'اسحب الفاصل' : 'Drag divider'}</span>
                        <ArrowLeftRightIcon className="w-3.5 h-3.5" />
                      </span>
                    </div>
                    <BeforeAfterSlider
                      beforeImage={selectedProject.beforeImage}
                      afterImage={selectedProject.image}
                      alt={isAr ? selectedProject.title.ar : selectedProject.title.en}
                      aspectRatioClass={
                        selectedProject.id === 'shubra-exchange'
                          ? 'aspect-square max-w-xl mx-auto'
                          : selectedProject.id === 'portsaid-exchange'
                          ? 'aspect-[3/4] sm:aspect-[4/5] max-w-lg mx-auto'
                          : 'aspect-[16/10] sm:aspect-[16/9]'
                      }
                      initialPosition={50}
                    />
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[#D8D3CA]">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#D96B24] hover:bg-[#B85819] text-white text-xs font-bold rounded-sm transition-colors"
                  >
                    <span>{isAr ? 'ناقش مشروعًا مماثلاً معنا' : 'Discuss a similar project with us'}</span>
                    <ArrowUpRightIcon className="w-3.5 h-3.5 rtl:-scale-x-100" />
                  </Link>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="px-5 py-3 text-xs font-semibold text-[#686761] hover:text-[#191A1C] cursor-pointer"
                  >
                    {isAr ? 'إغلاق' : 'Close'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
