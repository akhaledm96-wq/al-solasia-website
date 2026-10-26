import Hero from '@/components/sections/Hero';
import Stats from '@/components/sections/Stats';
import AboutTeaser from '@/components/sections/AboutTeaser';
import AudiencePathways from '@/components/sections/AudiencePathways';
import ServicesGrid from '@/components/sections/ServicesGrid';
import BeforeAfterShowcase from '@/components/portfolio/BeforeAfterShowcase';
import ProjectsHighlight from '@/components/sections/ProjectsHighlight';
import Process from '@/components/sections/Process';
import CTABand from '@/components/sections/CTABand';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <AboutTeaser />
      <AudiencePathways />
      <ServicesGrid />
      <BeforeAfterShowcase />
      <ProjectsHighlight />
      <Process />
      <CTABand />
    </>
  );
}
