'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocale } from 'next-intl';

interface TextToolbarState {
  visible: boolean;
  x: number;
  y: number;
  targetElement: HTMLElement | null;
  currentSize: number;
  isBold: boolean;
  isItalic: boolean;
  currentColor: string;
}

interface ImageManagerState {
  isOpen: boolean;
  targetImg: HTMLImageElement | null;
}

export default function VisualSiteEditor() {
  const locale = useLocale();
  const isAr = locale === 'ar';

  const [isEditorActive, setIsEditorActive] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [changeCount, setChangeCount] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Text selection toolbar
  const [textToolbar, setTextToolbar] = useState<TextToolbarState>({
    visible: false,
    x: 0,
    y: 0,
    targetElement: null,
    currentSize: 16,
    isBold: false,
    isItalic: false,
    currentColor: '#191A1C',
  });

  // Image replacement modal
  const [imageManager, setImageManager] = useState<ImageManagerState>({
    isOpen: false,
    targetImg: null,
  });

  const [availableImages, setAvailableImages] = useState<Array<{ name: string; url: string; size: number }>>([]);
  const [imagesLoading, setImagesLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Track modified elements
  const modifiedElementsRef = useRef<Map<HTMLElement, { originalText: string; originalStyle: string }>>(new Map());

  // Listen for double click or text selection across the document
  const handleSelection = useCallback(() => {
    if (!isEditorActive) return;

    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || selection.rangeCount === 0) {
      return;
    }

    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    let container = range.commonAncestorContainer as HTMLElement;
    if (container.nodeType === Node.TEXT_NODE) {
      container = container.parentElement as HTMLElement;
    }

    // Ignore clicks inside editor UI
    if (container.closest('#visual-site-editor-root')) return;

    const computedStyle = window.getComputedStyle(container);
    const fontSize = parseFloat(computedStyle.fontSize) || 16;
    const isBold = computedStyle.fontWeight === 'bold' || parseInt(computedStyle.fontWeight, 10) >= 600;
    const isItalic = computedStyle.fontStyle === 'italic';
    const color = computedStyle.color;

    // Position above the selection
    const x = Math.max(10, Math.min(window.innerWidth - 320, rect.left + rect.width / 2 - 160));
    const y = Math.max(10, rect.top + window.scrollY - 58);

    setTextToolbar({
      visible: true,
      x,
      y,
      targetElement: container,
      currentSize: fontSize,
      isBold,
      isItalic,
      currentColor: color,
    });
  }, [isEditorActive]);

  const handleDoubleClick = useCallback((e: MouseEvent) => {
    if (!isEditorActive) return;
    const target = e.target as HTMLElement;

    // Ignore clicks inside editor UI
    if (target.closest('#visual-site-editor-root')) return;

    // If double-clicked an image, open image manager
    if (target.tagName.toLowerCase() === 'img') {
      setImageManager({
        isOpen: true,
        targetImg: target as HTMLImageElement,
      });
      return;
    }

    // Enable direct content editing on the element
    target.contentEditable = 'true';
    target.focus();

    if (!modifiedElementsRef.current.has(target)) {
      modifiedElementsRef.current.set(target, {
        originalText: target.innerText,
        originalStyle: target.getAttribute('style') || '',
      });
      setChangeCount((c) => c + 1);
    }

    // Show toolbar
    const rect = target.getBoundingClientRect();
    const computedStyle = window.getComputedStyle(target);
    const fontSize = parseFloat(computedStyle.fontSize) || 16;
    const isBold = computedStyle.fontWeight === 'bold' || parseInt(computedStyle.fontWeight, 10) >= 600;
    const isItalic = computedStyle.fontStyle === 'italic';

    const x = Math.max(10, Math.min(window.innerWidth - 320, rect.left + rect.width / 2 - 160));
    const y = Math.max(10, rect.top + window.scrollY - 58);

    setTextToolbar({
      visible: true,
      x,
      y,
      targetElement: target,
      currentSize: fontSize,
      isBold,
      isItalic,
      currentColor: computedStyle.color,
    });
  }, [isEditorActive]);

  useEffect(() => {
    if (!isEditorActive) {
      setTextToolbar((prev) => ({ ...prev, visible: false }));
      return;
    }

    const onMouseUp = () => {
      setTimeout(handleSelection, 20);
    };

    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('dblclick', handleDoubleClick);

    return () => {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('dblclick', handleDoubleClick);
    };
  }, [isEditorActive, handleSelection, handleDoubleClick]);

  // Load available gallery images
  const loadImages = async () => {
    setImagesLoading(true);
    try {
      const res = await fetch('/api/images');
      const data = await res.json();
      if (data.success && data.images) {
        setAvailableImages(data.images);
      }
    } catch {
      // ignore
    } finally {
      setImagesLoading(false);
    }
  };

  useEffect(() => {
    if (imageManager.isOpen) {
      loadImages();
    }
  }, [imageManager.isOpen]);

  // Formatting operations
  const applyBold = () => {
    if (!textToolbar.targetElement) return;
    const newBold = !textToolbar.isBold;
    textToolbar.targetElement.style.fontWeight = newBold ? '700' : '400';
    setTextToolbar((prev) => ({ ...prev, isBold: newBold }));
    setChangeCount((c) => c + 1);
  };

  const applyItalic = () => {
    if (!textToolbar.targetElement) return;
    const newItalic = !textToolbar.isItalic;
    textToolbar.targetElement.style.fontStyle = newItalic ? 'italic' : 'normal';
    setTextToolbar((prev) => ({ ...prev, isItalic: newItalic }));
    setChangeCount((c) => c + 1);
  };

  const applyFontSize = (delta: number) => {
    if (!textToolbar.targetElement) return;
    const newSize = Math.max(10, Math.min(72, textToolbar.currentSize + delta));
    textToolbar.targetElement.style.fontSize = `${newSize}px`;
    setTextToolbar((prev) => ({ ...prev, currentSize: newSize }));
    setChangeCount((c) => c + 1);
  };

  const applyColor = (color: string) => {
    if (!textToolbar.targetElement) return;
    textToolbar.targetElement.style.color = color;
    setTextToolbar((prev) => ({ ...prev, currentColor: color }));
    setChangeCount((c) => c + 1);
  };

  // Image replacement
  const replaceSelectedImage = (newUrl: string) => {
    if (!imageManager.targetImg) return;
    imageManager.targetImg.src = newUrl;
    imageManager.targetImg.srcset = '';
    setImageManager({ isOpen: false, targetImg: null });
    setChangeCount((c) => c + 1);
    setFeedback(isAr ? 'تم استبدال الصورة بنجاح!' : 'Photo replaced successfully!');
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'projects');

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        replaceSelectedImage(data.url);
      } else {
        alert(data.error || 'فشل في رفع الصورة');
      }
    } catch (err: any) {
      alert('خطأ أثناء رفع الصورة: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const paletteColors = [
    { label: 'Charcoal', hex: '#191A1C' },
    { label: 'Orange', hex: '#D96B24' },
    { label: 'Rust', hex: '#B85819' },
    { label: 'White', hex: '#FFFFFF' },
    { label: 'Muted', hex: '#686761' },
    { label: 'Sand', hex: '#F4F1EB' },
  ];

  return (
    <div id="visual-site-editor-root" className="select-none">
      {/* 1. Main Floating Docked Bar (Top of Screen) */}
      <aside
        aria-label={isAr ? 'شريط أدوات التعديل المرئي المباشر' : 'Visual Site Editor Toolbar'}
        className="fixed top-4 end-4 z-50 flex items-center shadow-2xl transition-all duration-300"
      >
        <div className="bg-[#121315]/95 backdrop-blur-md border border-white/20 text-white rounded-full p-1.5 flex items-center gap-2">
          {/* Active Mode Toggle */}
          <button
            type="button"
            onClick={() => {
              const nextState = !isEditorActive;
              setIsEditorActive(nextState);
              if (!nextState) setTextToolbar((p) => ({ ...p, visible: false }));
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              isEditorActive
                ? 'bg-[#D96B24] text-white shadow-md'
                : 'bg-white/10 text-white/90 hover:bg-white/20'
            }`}
          >
            <span className="text-sm">🎨</span>
            <span>
              {isEditorActive
                ? isAr
                  ? 'وضع التعديل المرئي: نشط'
                  : 'Visual Editor: ACTIVE'
                : isAr
                ? 'تفعيل التعديل المرئي'
                : 'Enable Visual Editor'}
            </span>
            {isEditorActive && (
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            )}
          </button>

          {isEditorActive && (
            <>
              {/* Modifications Counter */}
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-black/40 rounded-full text-[11px] font-mono text-[#D2CEC7]">
                <span>{isAr ? 'التعديلات:' : 'Changes:'}</span>
                <span className="text-[#D96B24] font-bold">{changeCount}</span>
              </div>

              {/* Quick Image Picker Button */}
              <button
                type="button"
                onClick={() => setImageManager({ isOpen: true, targetImg: null })}
                className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-full transition-colors flex items-center gap-1.5 cursor-pointer"
                title="استعراض وتغيير الصور"
              >
                <span>📷</span>
                <span className="hidden md:inline">{isAr ? 'الصور' : 'Photos'}</span>
              </button>

              {/* Toast Feedback */}
              {feedback && (
                <span className="text-xs text-emerald-400 font-bold px-2 animate-in fade-in">
                  {feedback}
                </span>
              )}
            </>
          )}

          {/* Minimize / Help Toggle */}
          <button
            type="button"
            onClick={() => setMinimized(!minimized)}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xs cursor-pointer"
            title={isAr ? 'إخفاء / إظهار' : 'Toggle minimize'}
            aria-label={isAr ? 'إخفاء أو إظهار شريط الأدوات' : 'Toggle minimize toolbar'}
          >
            {minimized ? '▼' : '▲'}
          </button>
        </div>
      </aside>

      {/* Floating Instructions Banner when Editor is Active */}
      {isEditorActive && !minimized && (
        <div className="fixed top-20 end-4 z-40 bg-[#191A1C]/90 backdrop-blur-md text-white text-[11px] p-3 rounded-sm border border-white/10 shadow-xl max-w-xs animate-in slide-in-from-top-2">
          <p className="font-bold text-[#D96B24] mb-1 flex items-center gap-1">
            <span>💡</span>
            <span>{isAr ? 'تعليمات التعديل السريع:' : 'Quick Edit Instructions:'}</span>
          </p>
          <ul className="space-y-1 text-[#D2CEC7] text-[10px] leading-relaxed">
            <li>• {isAr ? 'انقر مرتين (Double Click) على أي نص لتعديله مباشرة.' : 'Double-click any text to edit directly on screen.'}</li>
            <li>• {isAr ? 'حدد أي نص لتغيير حجمه، لونه، وسماكته (Bold/Italic).' : 'Select text to change its size, color, bold or italic.'}</li>
            <li>• {isAr ? 'انقر مرتين على أي صورة لاستبدالها أو رفع صورة جديدة.' : 'Double-click any photo to replace or upload a new one.'}</li>
          </ul>
        </div>
      )}

      {/* 2. Floating Contextual Text Formatting Toolbar */}
      {textToolbar.visible && isEditorActive && (
        <div
          role="toolbar"
          aria-label={isAr ? 'شريط تنسيق الخط' : 'Text formatting toolbar'}
          className="fixed z-50 bg-[#121315] text-white p-1.5 rounded-lg shadow-2xl border border-white/25 flex items-center gap-1.5 animate-in fade-in zoom-in-95 duration-150"
          style={{
            left: `${textToolbar.x}px`,
            top: `${textToolbar.y}px`,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Bold Button */}
          <button
            type="button"
            onClick={applyBold}
            className={`w-7 h-7 rounded-sm text-xs font-black transition-colors flex items-center justify-center cursor-pointer ${
              textToolbar.isBold ? 'bg-[#D96B24] text-white' : 'hover:bg-white/10 text-white'
            }`}
            title="Bold (عريض)"
            aria-label="Bold"
          >
            B
          </button>

          {/* Italic Button */}
          <button
            type="button"
            onClick={applyItalic}
            className={`w-7 h-7 rounded-sm text-xs italic font-serif transition-colors flex items-center justify-center cursor-pointer ${
              textToolbar.isItalic ? 'bg-[#D96B24] text-white' : 'hover:bg-white/10 text-white'
            }`}
            title="Italic (مائل)"
            aria-label="Italic"
          >
            I
          </button>

          <span className="w-px h-5 bg-white/20" />

          {/* Font Size Steppers */}
          <div className="flex items-center gap-0.5 bg-black/40 rounded-sm p-0.5 text-xs">
            <button
              type="button"
              onClick={() => applyFontSize(-2)}
              className="px-1.5 py-0.5 hover:bg-white/20 rounded-xs font-bold cursor-pointer"
              title="تصغير الخط (Smaller)"
            >
              A-
            </button>
            <span className="px-1 text-[10px] font-mono text-[#D2CEC7]">
              {Math.round(textToolbar.currentSize)}px
            </span>
            <button
              type="button"
              onClick={() => applyFontSize(+2)}
              className="px-1.5 py-0.5 hover:bg-white/20 rounded-xs font-bold cursor-pointer"
              title="تكبير الخط (Larger)"
            >
              A+
            </button>
          </div>

          <span className="w-px h-5 bg-white/20" />

          {/* Color Palette Swatches */}
          <div className="flex items-center gap-1">
            {paletteColors.map((c) => (
              <button
                key={c.hex}
                type="button"
                onClick={() => applyColor(c.hex)}
                className="w-4 h-4 rounded-full border border-white/40 hover:scale-125 transition-transform cursor-pointer"
                style={{ backgroundColor: c.hex }}
                title={c.label}
              />
            ))}
            {/* Native Color Picker */}
            <input
              type="color"
              value={textToolbar.currentColor.startsWith('#') ? textToolbar.currentColor : '#D96B24'}
              onChange={(e) => applyColor(e.target.value)}
              className="w-5 h-5 rounded-full p-0 border-0 cursor-pointer bg-transparent"
              title="اختر لونًا مخصصًا (Custom Color)"
            />
          </div>

          <span className="w-px h-5 bg-white/20" />

          {/* Close toolbar */}
          <button
            type="button"
            onClick={() => setTextToolbar((p) => ({ ...p, visible: false }))}
            className="w-6 h-6 rounded-full hover:bg-red-600 text-white flex items-center justify-center text-xs cursor-pointer"
            title="إغلاق الشريط"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
      )}

      {/* 3. Photo Replacement & Upload Modal */}
      {imageManager.isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setImageManager({ isOpen: false, targetImg: null })}
        >
          <div
            className="bg-white rounded-sm max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl border border-[#D8D3CA] text-[#191A1C]"
            onClick={(e) => e.stopPropagation()}
            dir={isAr ? 'rtl' : 'ltr'}
          >
            {/* Modal Header */}
            <div className="bg-[#191A1C] text-white p-4 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <span className="text-lg">📷</span>
                <div>
                  <h3 className="font-bold text-base leading-tight">
                    {isAr ? 'إدارة واستبدال الصور' : 'Replace & Manage Photos'}
                  </h3>
                  <p className="text-[11px] text-[#A9A49C]">
                    {isAr
                      ? 'اختر صورة من المشروعات السابقة أو ارفع صورة جديدة من جهازك.'
                      : 'Pick an approved project photo or upload a new photo from your device.'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setImageManager({ isOpen: false, targetImg: null })}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-red-600 text-white flex items-center justify-center text-sm cursor-pointer"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Upload Area */}
            <div className="p-4 bg-[#F4F1EB] border-b border-[#D8D3CA] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <label className="inline-flex items-center gap-2 px-4 py-2 bg-[#D96B24] hover:bg-[#B85819] text-white text-xs font-bold rounded-sm transition-colors cursor-pointer shadow-xs">
                  <span>{uploading ? (isAr ? 'جاري الرفع...' : 'Uploading...') : (isAr ? 'رفع صورة جديدة من جهازك ↗' : 'Upload New Image ↗')}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    disabled={uploading}
                    className="hidden"
                  />
                </label>
                <span className="text-[11px] text-[#686761]">
                  (JPG, PNG, WEBP)
                </span>
              </div>

              <span className="text-[11px] text-[#8E8B82] font-mono">
                {availableImages.length} {isAr ? 'صورة متاحة' : 'photos available'}
              </span>
            </div>

            {/* Gallery Grid */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-white">
              {imagesLoading ? (
                <div className="py-16 text-center text-sm text-[#686761]">
                  {isAr ? 'جاري تحميل الصور المتاحة...' : 'Loading photo gallery...'}
                </div>
              ) : availableImages.length === 0 ? (
                <div className="py-16 text-center text-xs text-[#686761]">
                  {isAr ? 'لا توجد صور في المجلد.' : 'No photos found in gallery.'}
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {availableImages.map((img) => (
                    <div
                      key={img.url}
                      onClick={() => replaceSelectedImage(img.url)}
                      className="group relative aspect-[4/3] rounded-sm overflow-hidden border border-[#D8D3CA] hover:border-[#D96B24] cursor-pointer shadow-2xs hover:shadow-md transition-all"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img.url}
                        alt={img.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 text-center">
                        <span className="text-[10px] text-white font-bold bg-[#D96B24] px-2 py-1 rounded-xs mb-1">
                          {isAr ? 'استخدام هذه الصورة' : 'Use This Photo'}
                        </span>
                        <span className="text-[9px] text-white/90 truncate max-w-full font-mono">
                          {img.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-3 bg-[#EEEDE9] border-t border-[#D8D3CA] text-end">
              <button
                type="button"
                onClick={() => setImageManager({ isOpen: false, targetImg: null })}
                className="px-4 py-1.5 text-xs font-semibold text-[#686761] hover:text-[#191A1C] cursor-pointer"
              >
                {isAr ? 'إلغاء' : 'Cancel'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
