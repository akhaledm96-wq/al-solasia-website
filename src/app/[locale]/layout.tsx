import { notFound } from 'next/navigation';
import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { routing } from '@/i18n/routing';
import { IBM_Plex_Sans, IBM_Plex_Sans_Arabic } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LiveContentEditor from '@/components/editor/LiveContentEditor';
import VisualSiteEditor from '@/components/editor/VisualSiteEditor';

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-arabic',
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isAr = locale === 'ar';
  const siteUrl = 'https://al-solasia.com';

  const title = isAr
    ? 'الثلاثية لهندسة البناء | مشروعات مقاولات وهندسة في مصر منذ ١٩٩٢'
    : 'Al-Solasia Building Engineering | Construction & Contracting in Egypt since 1992';

  const description = isAr
    ? 'شركة الثلاثية لهندسة البناء — خبرة تمتد لأكثر من ٣٠ عامًا في الإنشاءات، البنية التحتية، التشطيبات، والترميم في مصر.'
    : 'Al-Solasia Building Engineering — More than 30 years of construction, infrastructure, finishing, and rehabilitation experience across Egypt.';

  return {
    metadataBase: new URL(siteUrl),
    title: {
      template: isAr ? '%s | الثلاثية لهندسة البناء' : '%s | Al-Solasia Building Engineering',
      default: title,
    },
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/en',
        ar: '/ar',
      },
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/${locale}`,
      siteName: isAr ? 'الثلاثية لهندسة البناء' : 'Al-Solasia Building Engineering',
      locale: isAr ? 'ar_EG' : 'en_US',
      type: 'website',
      images: [
        {
          url: '/images/hero-telecom-egypt.jpg',
          width: 1200,
          height: 630,
          alt: isAr
            ? 'مشروع مبنى ومجمع اتصالات نفذته شركة الثلاثية لهندسة البناء'
            : 'Telecommunications facility project executed by Al-Solasia Building Engineering',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/hero-telecom-egypt.jpg'],
    },
    icons: {
      icon: '/logo/al-solasia-logo.svg',
      apple: '/logo/al-solasia-logo.svg',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${ibmPlexSans.variable} ${ibmPlexArabic.variable} ${
        dir === 'rtl' ? 'font-arabic' : 'font-sans'
      }`}
    >
      <body className="flex flex-col min-h-screen bg-[#F4F1EB] text-[#191A1C] antialiased relative selection:bg-[#D96B24] selection:text-white">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <LiveContentEditor initialLocale={locale} />
          <VisualSiteEditor />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
