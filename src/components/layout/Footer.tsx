import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowUpRightIcon } from '@/components/ui/Icons';

export default function Footer() {
  const tNav = useTranslations('nav');
  const tFoot = useTranslations('footer');
  const locale = useLocale();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#141516] text-[#F4F1EB] pt-16 pb-8 border-t border-[#292A2E]">
      <div className="container-custom">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#2C2D32]">
          {/* Brand Info (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3.5 group w-fit">
              <div className="relative w-11 h-11 shrink-0 flex items-center justify-center filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] transition-transform duration-200 group-hover:scale-105">
                <Image
                  src="/logo/al-solasia-logo-white.svg"
                  alt="Al-Solasia Building Engineering"
                  width={44}
                  height={44}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg tracking-wider text-white uppercase font-sans">
                  {tNav('brandName')}
                </span>
                <span className="text-[11px] tracking-[0.16em] uppercase text-[#A9A49C] font-semibold">
                  {tNav('brandSub')}
                </span>
              </div>
            </Link>

            <p className="text-sm text-[#A9A49C] max-w-md leading-relaxed mt-1">
              {tFoot('desc')}
            </p>

            <div className="flex items-center gap-3 text-xs text-[#D96B24] font-semibold tracking-wider mt-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[#D96B24]"></span>
              <span>1992 – {currentYear} · 30+ YEARS IN CONSTRUCTION</span>
            </div>
          </div>

          {/* Column 1: Explore (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="text-xs font-bold tracking-widest uppercase text-[#D96B24] mb-1">
              {tFoot('col1Title')}
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-[#C7C2BA]">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  {tNav('about')}
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  {tNav('services')}
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-white transition-colors">
                  {tNav('projects')}
                </Link>
              </li>
              <li>
                <Link href="/#process" className="hover:text-white transition-colors">
                  {tNav('process')}
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white transition-colors">
                  {tNav('careers')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Services Scope (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="text-xs font-bold tracking-widest uppercase text-[#D96B24] mb-1">
              {tFoot('col2Title')}
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-[#C7C2BA]">
              <li>
                <Link href="/services#design" className="hover:text-white transition-colors">
                  {locale === 'ar' ? 'التصميم والهندسة' : 'Design & Engineering'}
                </Link>
              </li>
              <li>
                <Link href="/services#construction" className="hover:text-white transition-colors">
                  {locale === 'ar' ? 'الإنشاءات والمقاولات' : 'Construction'}
                </Link>
              </li>
              <li>
                <Link href="/services#finishing" className="hover:text-white transition-colors">
                  {locale === 'ar' ? 'التشطيبات والتجهيز' : 'Finishing & Fit-out'}
                </Link>
              </li>
              <li>
                <Link href="/services#repair" className="hover:text-white transition-colors">
                  {locale === 'ar' ? 'الإصلاح والترميم' : 'Rehabilitation'}
                </Link>
              </li>
              <li>
                <Link href="/services#supervision" className="hover:text-white transition-colors">
                  {locale === 'ar' ? 'الإشراف وإدارة الموقع' : 'Site Supervision'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Enquiry (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="text-xs font-bold tracking-widest uppercase text-[#D96B24] mb-1">
              {tFoot('col3Title')}
            </h4>
            <p className="text-xs text-[#8E8B84] leading-relaxed">
              {tFoot('contactText')}
            </p>
            <Link
              href="/contact"
              className="mt-2 inline-flex items-center gap-2 text-xs font-bold text-[#D96B24] hover:text-[#F48A44] transition-colors"
            >
              <span>{locale === 'ar' ? 'إرسال استفسار عن مشروع' : 'Start a project enquiry'}</span>
              <ArrowUpRightIcon className="w-3.5 h-3.5 rtl:-scale-x-100" />
            </Link>
            <div className="pt-2 text-[11px] text-[#7A7873]">
              {locale === 'ar'
                ? 'القاهرة والجيزة وكافة محافظات مصر'
                : 'Cairo, Giza & Projects across Egypt'}
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-[#7A7873]">
          <div>
            © {currentYear} {tFoot('copyright')}
          </div>
          <div className="flex items-center gap-4">
            <Link href="/careers" className="hover:text-[#A9A49C] transition-colors">
              {locale === 'ar' ? 'وظائف هندسية' : 'Careers'}
            </Link>
            <span>·</span>
            <Link href="/privacy" className="hover:text-[#A9A49C] transition-colors">
              {locale === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
            </Link>
            <span>·</span>
            <span>{tFoot('disclaimer')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
