'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';

interface LiveContentEditorProps {
  initialLocale?: string;
}

export default function LiveContentEditor({ initialLocale }: LiveContentEditorProps) {
  const currentLocale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [editLocale, setEditLocale] = useState<'ar' | 'en'>(
    (initialLocale as 'ar' | 'en') || (currentLocale === 'en' ? 'en' : 'ar')
  );
  const [messages, setMessages] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [selectedSection, setSelectedSection] = useState<string>('hero');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Load messages when editor opens or editLocale changes
  useEffect(() => {
    if (!isOpen) return;
    loadMessages(editLocale);
  }, [isOpen, editLocale]);

  const loadMessages = async (loc: 'ar' | 'en') => {
    setLoading(true);
    setFeedback(null);
    try {
      const res = await fetch(`/api/content?locale=${loc}`);
      const data = await res.json();
      if (data.success && data.messages) {
        setMessages(data.messages);
        setHasUnsavedChanges(false);
      } else {
        setFeedback({ type: 'error', text: 'فشل في تحميل النصوص.' });
      }
    } catch {
      setFeedback({ type: 'error', text: 'خطأ في الاتصال بالخادم.' });
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (section: string, key: string, value: string, subKey?: string) => {
    setHasUnsavedChanges(true);
    setMessages((prev) => {
      const updatedSection = { ...(prev[section] || {}) };
      if (subKey) {
        updatedSection[key] = {
          ...(updatedSection[key] || {}),
          [subKey]: value,
        };
      } else {
        updatedSection[key] = value;
      }
      return {
        ...prev,
        [section]: updatedSection,
      };
    });
  };

  const handleSave = async () => {
    setSaving(true);
    setFeedback(null);
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          locale: editLocale,
          messages,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setHasUnsavedChanges(false);
        setFeedback({
          type: 'success',
          text: editLocale === 'ar'
            ? 'تم حفظ التعديلات بنجاح في ملف النصوص! جاري تطبيق التغييرات...'
            : 'Changes saved successfully to disk! Applying changes...',
        });
        setTimeout(() => {
          window.location.reload();
        }, 1200);
      } else {
        setFeedback({
          type: 'error',
          text: data.error || 'فشل في حفظ التعديلات.',
        });
      }
    } catch (err: any) {
      setFeedback({
        type: 'error',
        text: err?.message || 'حدث خطأ أثناء حفظ التعديلات.',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleExportBackup = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(messages, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `al-solasia-${editLocale}-messages.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const sectionsList = [
    { id: 'hero', name: editLocale === 'ar' ? 'الواجهة الرئيسية (Hero)' : 'Hero Section' },
    { id: 'stats', name: editLocale === 'ar' ? 'الأرقام والإحصائيات (Stats)' : 'Stats Band' },
    { id: 'about', name: editLocale === 'ar' ? 'عن الشركة (About)' : 'About Us' },
    { id: 'services', name: editLocale === 'ar' ? 'الخدمات (Services)' : 'Services Scope' },
    { id: 'projects', name: editLocale === 'ar' ? 'المشروعات (Projects)' : 'Projects Copy' },
    { id: 'process', name: editLocale === 'ar' ? 'آلية العمل (Process)' : 'Process Steps' },
    { id: 'cta', name: editLocale === 'ar' ? 'دعوة التواصل (CTA Band)' : 'Call To Action' },
    { id: 'footer', name: editLocale === 'ar' ? 'تذييل الموقع (Footer)' : 'Footer' },
    { id: 'nav', name: editLocale === 'ar' ? 'القائمة العلوية (Navigation)' : 'Navigation' },
  ];

  const currentSectionData = messages[selectedSection] || {};

  return (
    <>
      {/* Discreet Floating Trigger Button (Bottom Corner) */}
      <div className="fixed bottom-5 start-5 z-50 select-none">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2 bg-[#191A1C] hover:bg-[#D96B24] text-white text-xs font-bold rounded-full shadow-2xl border border-white/20 hover:border-[#D96B24] transition-all duration-200 cursor-pointer group"
          title="تعديل نصوص الموقع مباشرة | Live Text Editor"
        >
          <svg
            className="w-4 h-4 text-[#D96B24] group-hover:text-white transition-colors"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
          </svg>
          <span className="text-[11px] font-sans">
            {currentLocale === 'ar' ? 'تعديل النصوص' : 'Edit Text'}
          </span>
          {hasUnsavedChanges && (
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          )}
        </button>
      </div>

      {/* Editor Modal / Drawer */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={() => !hasUnsavedChanges && setIsOpen(false)}
        >
          <div
            className="bg-white rounded-sm w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl border border-[#D8D3CA] overflow-hidden text-[#191A1C]"
            onClick={(e) => e.stopPropagation()}
            dir={editLocale === 'ar' ? 'rtl' : 'ltr'}
          >
            {/* Modal Header */}
            <div className="bg-[#191A1C] text-white p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-sm bg-[#D96B24] flex items-center justify-center text-white font-bold">
                  ✎
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg leading-tight">
                    {editLocale === 'ar' ? 'محرر نصوص الموقع المباشر' : 'Live Website Content Editor'}
                  </h3>
                  <p className="text-[11px] text-[#A9A49C]">
                    {editLocale === 'ar'
                      ? 'قم بتعديل أي نص على الموقع ثم اضغط حفظ لتطبيقه فورًا على الملفات.'
                      : 'Edit any text across sections and click save to write directly to translation files.'}
                  </p>
                </div>
              </div>

              {/* Language Switcher & Close */}
              <div className="flex items-center gap-2">
                <div className="flex bg-[#2A2B30] rounded-sm p-1 border border-white/10 text-xs">
                  <button
                    onClick={() => {
                      if (!hasUnsavedChanges || confirm('لديك تعديلات غير محفوظة، هل تريد المتابعة؟')) {
                        setEditLocale('ar');
                      }
                    }}
                    className={`px-3 py-1 rounded-xs font-bold transition-colors cursor-pointer ${
                      editLocale === 'ar' ? 'bg-[#D96B24] text-white' : 'text-[#D2CEC7] hover:text-white'
                    }`}
                  >
                    العربية
                  </button>
                  <button
                    onClick={() => {
                      if (!hasUnsavedChanges || confirm('You have unsaved changes. Continue?')) {
                        setEditLocale('en');
                      }
                    }}
                    className={`px-3 py-1 rounded-xs font-bold transition-colors cursor-pointer ${
                      editLocale === 'en' ? 'bg-[#D96B24] text-white' : 'text-[#D2CEC7] hover:text-white'
                    }`}
                  >
                    English
                  </button>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-sm bg-white/10 hover:bg-red-600 text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Feedback Alert Bar */}
            {feedback && (
              <div
                className={`px-4 py-2.5 text-xs font-semibold flex items-center justify-between ${
                  feedback.type === 'success'
                    ? 'bg-emerald-50 text-emerald-800 border-b border-emerald-200'
                    : 'bg-red-50 text-red-800 border-b border-red-200'
                }`}
              >
                <span>{feedback.text}</span>
                <button
                  onClick={() => setFeedback(null)}
                  className="font-bold px-2 cursor-pointer"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Section Selector Tabs Bar */}
            <div className="bg-[#EEEDE9] border-b border-[#D8D3CA] px-4 flex gap-1 overflow-x-auto shrink-0 no-scrollbar">
              {sectionsList.map((sec) => {
                const isActive = selectedSection === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => setSelectedSection(sec.id)}
                    className={`shrink-0 py-3 px-3.5 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'border-[#D96B24] text-[#D96B24] bg-white'
                        : 'border-transparent text-[#686761] hover:text-[#191A1C]'
                    }`}
                  >
                    {sec.name}
                  </button>
                );
              })}
            </div>

            {/* Scrollable Form Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-[#FAF8F5]">
              {loading ? (
                <div className="py-20 text-center text-sm text-[#686761]">
                  جاري تحميل النصوص...
                </div>
              ) : Object.keys(currentSectionData).length === 0 ? (
                <div className="py-12 text-center text-xs text-[#686761]">
                  لا توجد حقول في هذا القسم حاليًا.
                </div>
              ) : (
                Object.entries(currentSectionData).map(([key, value]) => {
                  // If nested object (e.g. s1: { num, category, title, desc } or stat1: { val, label })
                  if (typeof value === 'object' && value !== null) {
                    return (
                      <div
                        key={key}
                        className="bg-white p-4 rounded-sm border border-[#D8D3CA] shadow-2xs space-y-3"
                      >
                        <h4 className="text-xs font-bold text-[#D96B24] uppercase tracking-wider font-mono">
                          [{key.toUpperCase()}]
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {Object.entries(value).map(([subKey, subVal]) => (
                            <div key={subKey} className="flex flex-col gap-1">
                              <label className="text-[11px] font-bold text-[#686761] uppercase tracking-wide">
                                {subKey}
                              </label>
                              {String(subVal).length > 60 ? (
                                <textarea
                                  rows={2}
                                  value={String(subVal)}
                                  onChange={(e) =>
                                    handleFieldChange(selectedSection, key, e.target.value, subKey)
                                  }
                                  className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-[#D8D3CA] focus:border-[#D96B24] rounded-xs focus:outline-hidden transition-colors"
                                />
                              ) : (
                                <input
                                  type="text"
                                  value={String(subVal)}
                                  onChange={(e) =>
                                    handleFieldChange(selectedSection, key, e.target.value, subKey)
                                  }
                                  className="w-full text-xs p-2 bg-[#FAF8F5] border border-[#D8D3CA] focus:border-[#D96B24] rounded-xs focus:outline-hidden transition-colors"
                                />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  }

                  // Primitive string field
                  const isLongText = String(value).length > 80;
                  return (
                    <div key={key} className="flex flex-col gap-1.5 bg-white p-3.5 rounded-sm border border-[#D8D3CA]">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-[#191A1C] font-mono">
                          {key}
                        </label>
                        <span className="text-[10px] text-[#8E8B82] font-mono">
                          {String(value).length} chars
                        </span>
                      </div>

                      {isLongText ? (
                        <textarea
                          rows={3}
                          value={String(value)}
                          onChange={(e) =>
                            handleFieldChange(selectedSection, key, e.target.value)
                          }
                          className="w-full text-xs sm:text-sm p-2.5 bg-[#FAF8F5] border border-[#D8D3CA] focus:border-[#D96B24] rounded-xs focus:outline-hidden transition-colors leading-relaxed"
                        />
                      ) : (
                        <input
                          type="text"
                          value={String(value)}
                          onChange={(e) =>
                            handleFieldChange(selectedSection, key, e.target.value)
                          }
                          className="w-full text-xs sm:text-sm p-2 bg-[#FAF8F5] border border-[#D8D3CA] focus:border-[#D96B24] rounded-xs focus:outline-hidden transition-colors"
                        />
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Modal Bottom Actions */}
            <div className="bg-white p-4 border-t border-[#D8D3CA] flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleExportBackup}
                  className="px-3 py-1.5 text-xs text-[#686761] hover:text-[#191A1C] border border-[#D8D3CA] hover:border-[#191A1C] rounded-sm transition-colors cursor-pointer"
                >
                  {editLocale === 'ar' ? 'تحميل نسخة احتياطية (JSON)' : 'Download Backup (JSON)'}
                </button>
                {hasUnsavedChanges && (
                  <span className="text-[11px] text-amber-700 font-bold">
                    {editLocale === 'ar' ? 'يوجد تعديلات غير محفوظة' : 'Unsaved changes pending'}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#686761] hover:text-[#191A1C] cursor-pointer"
                >
                  {editLocale === 'ar' ? 'إغلاق' : 'Close'}
                </button>

                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving || !hasUnsavedChanges}
                  className="px-6 py-2 bg-[#D96B24] hover:bg-[#B85819] text-white text-xs font-bold rounded-sm transition-all shadow-md disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <span>
                    {saving
                      ? editLocale === 'ar'
                        ? 'جاري الحفظ...'
                        : 'Saving...'
                      : editLocale === 'ar'
                      ? 'حفظ وتطبيق التعديلات فورًا'
                      : 'Save & Apply Changes'}
                  </span>
                  <span>💾</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
