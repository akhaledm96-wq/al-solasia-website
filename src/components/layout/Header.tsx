'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import LanguageSwitch from './LanguageSwitch';
import TopBar from './TopBar';
import { ArrowUpRightIcon } from '@/components/ui/Icons';

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/about', label: t('about') },
    { href: '/services', label: t('services') },
    { href: '/projects', label: t('projects') },
    { href: '/#process', label: t('process') },
    { href: '/contact', label: t('contact') },
  ];

  return (
    <div
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#121315]/95 backdrop-blur-md shadow-xl border-b border-white/10'
          : 'bg-gradient-to-b from-black/85 via-black/40 to-transparent border-b border-white/10'
      }`}
    >
      {/* Top Heritage Notice Bar */}
      <TopBar />

      {/* Main Navigation Bar */}
      <header className="transition-colors">
        <div className="container-custom flex items-center justify-between min-h-[74px] gap-6">
          {/* Brand Logo & Name */}
          <Link
            href="/"
            className="flex items-center gap-3.5 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D96B24]"
          >
            {/* White-accent SVG logo with no box container and natural drop shadow */}
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 shrink-0 flex items-center justify-center transition-transform duration-200 group-hover:scale-105 filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
              <Image
                src="/logo/al-solasia-logo-white.svg"
                alt="Al-Solasia Building Engineering"
                width={48}
                height={48}
                className="w-full h-full object-contain"
                priority
              />
            </div>

            <div className="flex flex-col">
              <span className="font-bold text-base sm:text-lg tracking-wider text-white uppercase leading-tight font-sans drop-shadow-sm">
                {t('brandName')}
              </span>
              <span className="text-[10px] sm:text-[11px] tracking-[0.16em] uppercase text-[#D2CEC7] font-semibold drop-shadow-sm">
                {t('brandSub')}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold tracking-wide text-white">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`py-2 transition-colors duration-150 relative drop-shadow-sm ${
                    isActive
                      ? 'text-[#D96B24] font-bold'
                      : 'text-white/90 hover:text-[#D96B24]'
                  } after:content-[''] after:absolute after:bottom-0 after:start-0 after:h-[2px] after:bg-[#D96B24] transition-all duration-200 ${
                    isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions (Language Switch + CTA Button) */}
          <div className="hidden sm:flex items-center gap-3.5">
            <LanguageSwitch />
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#D96B24] hover:bg-[#B85819] rounded-sm border border-[#D96B24] transition-all duration-200 shadow-sm hover:shadow hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>{t('cta')}</span>
              <ArrowUpRightIcon className="w-3.5 h-3.5 rtl:-scale-x-100 transition-transform" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <LanguageSwitch />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-sm text-white hover:bg-white/10 transition-colors focus:outline-none"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 bg-[#121315]/98 backdrop-blur-xl px-6 py-5 shadow-2xl animate-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col gap-4 text-sm font-semibold text-white">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-2 transition-colors border-b border-white/10 ${
                    pathname === link.href ? 'text-[#D96B24]' : 'hover:text-[#D96B24]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-3 inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-bold text-white bg-[#D96B24] rounded-sm text-center"
              >
                <span>{t('cta')}</span>
                <ArrowUpRightIcon className="w-3.5 h-3.5 rtl:-scale-x-100" />
              </Link>
            </nav>
          </div>
        )}
      </header>
    </div>
  );
}
