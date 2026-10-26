'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  alt?: string;
  aspectRatioClass?: string;
  initialPosition?: number;
  className?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel,
  afterLabel,
  alt = 'Before and after engineering comparison',
  aspectRatioClass = 'aspect-[16/10] sm:aspect-[16/9]',
  initialPosition = 50,
  className = '',
}: BeforeAfterSliderProps) {
  const locale = useLocale();
  const isAr = locale === 'ar';

  const defaultBeforeLabel = isAr ? 'قبل — الحالة الإنشائية السابقة' : 'BEFORE — EXISTING STRUCTURE';
  const defaultAfterLabel = isAr ? 'بعد — اكتمال أعمال التطوير' : 'AFTER — COMPLETED REHABILITATION';

  const bLabel = beforeLabel || defaultBeforeLabel;
  const aLabel = afterLabel || defaultAfterLabel;

  const [position, setPosition] = useState<number>(initialPosition);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate position percentage from clientX
  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setPosition(percentage);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // In case pointer capture was already lost
    }
  };

  // Keyboard navigation for accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setPosition((prev) => Math.max(0, prev - 2));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setPosition((prev) => Math.min(100, prev + 2));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setPosition(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setPosition(100);
    } else if (e.key === 'PageDown') {
      e.preventDefault();
      setPosition((prev) => Math.max(0, prev - 10));
    } else if (e.key === 'PageUp') {
      e.preventDefault();
      setPosition((prev) => Math.min(100, prev + 10));
    }
  };

  const roundedPos = Math.round(position);

  return (
    <div className={`w-full ${className}`}>
      {/* Visual Comparison Frame */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        tabIndex={0}
        role="slider"
        aria-label={isAr ? 'مقارنة الصور قبل وبعد' : 'Before and after comparison slider'}
        aria-valuenow={roundedPos}
        aria-valuemin={0}
        aria-valuemax={100}
        onKeyDown={handleKeyDown}
        className={`relative ${aspectRatioClass} w-full overflow-hidden border border-[#191A1C]/25 bg-[#191A1C] select-none cursor-ew-resize focus:outline-hidden focus:ring-2 focus:ring-[#D96B24] rounded-xs shadow-md`}
      >
        {/* Underneath Image: AFTER (Right) */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={afterImage}
            alt={`${alt} - After`}
            fill
            sizes="(max-width: 1024px) 100vw, 1200px"
            className="object-cover object-center pointer-events-none"
            priority
            draggable={false}
          />
          {/* Top-Right Badge: AFTER */}
          <div className="absolute top-4 end-4 z-10 pointer-events-none">
            <span className="inline-block px-3 py-1.5 bg-[#191A1C]/85 backdrop-blur-xs text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-wider rounded-xs border border-white/15 shadow-sm">
              {aLabel}
            </span>
          </div>
        </div>

        {/* Top Image: BEFORE (Left) with Dynamic Clip Path */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
          style={{
            clipPath: `polygon(0% 0%, ${position}% 0%, ${position}% 100%, 0% 100%)`,
          }}
        >
          <Image
            src={beforeImage}
            alt={`${alt} - Before`}
            fill
            sizes="(max-width: 1024px) 100vw, 1200px"
            className="object-cover object-center pointer-events-none"
            priority
            draggable={false}
          />
          {/* Top-Left Badge: BEFORE */}
          <div className="absolute top-4 start-4 z-10 pointer-events-none">
            <span className="inline-block px-3 py-1.5 bg-[#191A1C]/85 backdrop-blur-xs text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-wider rounded-xs border border-white/15 shadow-sm">
              {bLabel}
            </span>
          </div>
        </div>

        {/* Center Vertical Divider Line */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-white pointer-events-none z-20 shadow-[0_0_12px_rgba(0,0,0,0.8)]"
          style={{ left: `${position}%` }}
        />

        {/* Circular Draggable Handle */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-30 pointer-events-none"
          style={{ left: `${position}%` }}
        >
          <div
            className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#191A1C] border-2 border-white flex items-center justify-center text-white shadow-2xl transition-transform duration-100 ${
              isDragging ? 'scale-110 ring-4 ring-[#D96B24]/40' : 'hover:scale-105'
            }`}
          >
            {/* Bidirectional Arrows Icon (TRIA style) */}
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="7 8 3 12 7 16" />
              <polyline points="17 8 21 12 17 16" />
              <line x1="3" y1="12" x2="21" y2="12" />
            </svg>
          </div>
        </div>
      </div>

      {/* Info & Technical Readout Bar (TRIA style) */}
      <div className="mt-2.5 px-1 flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#706E67] font-mono">
        <div className="flex items-center gap-1.5">
          <svg
            className="w-3.5 h-3.5 text-[#D96B24] shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="12" y1="10" x2="12" y2="16" />
            <line x1="9" y1="13" x2="15" y2="13" />
          </svg>
          <span>
            {isAr
              ? 'اسحب الفاصل أو استخدم مفاتيح الأسهم لمشاهدة الفارق'
              : 'Drag the divider or use the arrow keys to see the difference'}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <span className="text-[#8E8B82]">
            {isAr ? 'موضع الفاصل:' : 'Divider position:'}
          </span>
          <span className="font-bold text-[#191A1C] tabular-nums">
            {roundedPos}%
          </span>
        </div>
      </div>
    </div>
  );
}
