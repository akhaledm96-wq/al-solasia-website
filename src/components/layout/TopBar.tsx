import { useTranslations } from 'next-intl';

export default function TopBar() {
  const t = useTranslations('topline');

  return (
    <div className="bg-black/35 backdrop-blur-sm text-white/85 text-xs border-b border-white/10 transition-colors">
      <div className="container-custom flex justify-between items-center py-2 tracking-wider">
        <span className="font-medium text-[11px] sm:text-xs opacity-95">{t('left')}</span>
        <span className="text-[#C7C2BA] text-[11px] sm:text-xs hidden sm:inline">{t('right')}</span>
      </div>
    </div>
  );
}
