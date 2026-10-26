import { useTranslations, useLocale } from 'next-intl';
import PageHero from '@/components/layout/PageHero';
import BeforeAfterShowcase from '@/components/portfolio/BeforeAfterShowcase';
import ProjectsPortfolio from '@/components/portfolio/ProjectsPortfolio';

export default function ProjectsPage() {
  const t = useTranslations('projects');
  const locale = useLocale();

  return (
    <div>
      <PageHero
        crumb={locale === 'ar' ? 'الثلاثية / مشروعاتنا' : 'AL-SOLASIA / PROJECTS'}
        title={t('title')}
        desc={t('desc')}
      />

      <BeforeAfterShowcase />

      <ProjectsPortfolio />
    </div>
  );
}
