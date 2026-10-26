'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { CheckIcon, ArrowUpRightIcon } from '@/components/ui/Icons';

export default function GeneralContactForm() {
  const locale = useLocale();
  const isAr = locale === 'ar';

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    enquiryType: 'general',
    message: '',
    privacyConsent: false,
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.privacyConsent) {
      alert(isAr ? 'يرجى الموافقة على شروط الخصوصية' : 'Please agree to the privacy terms');
      return;
    }

    setStatus('loading');
    setFeedback('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, locale }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        setFeedback(
          isAr
            ? `تم استلام رسالتك بنجاح (رقم مرجعي: ${data.id.slice(0, 8)}). شكرًا لتواصلك معنا.`
            : `Your message has been received (Ref: ${data.id.slice(0, 8)}). Thank you for reaching out.`
        );
        setFormData({
          fullName: '',
          phone: '',
          email: '',
          enquiryType: 'general',
          message: '',
          privacyConsent: false,
        });
      } else {
        setStatus('error');
        setFeedback(data.error || (isAr ? 'حدث خطأ. يرجى المحاولة لاحقًا.' : 'An error occurred. Please try again.'));
      }
    } catch {
      setStatus('error');
      setFeedback(isAr ? 'تعذر الاتصال بالخادم.' : 'Could not connect to server.');
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-sm border border-[#D8D3CA] shadow-sm">
      <div className="mb-6 pb-3 border-b border-[#D8D3CA]">
        <h3 className="text-xl font-bold text-[#191A1C]">
          {isAr ? 'أرسل رسالة أو استفسارًا' : 'Send a General Enquiry'}
        </h3>
        <p className="text-xs text-[#686761] mt-1">
          {isAr ? 'يسعدنا الرد على استفساراتك العامة أو طلبات التعاون الهندسي.' : 'Reach out for general questions, consultancy inquiries, or specialist collaboration.'}
        </p>
      </div>

      {status === 'success' ? (
        <div className="p-5 bg-[#EDF4EB] border border-[#C8DDC2] rounded-sm text-[#294E27] text-xs">
          <p className="font-bold mb-1 flex items-center gap-1.5">
            <CheckIcon className="w-4 h-4 text-[#294E27]" />
            <span>{isAr ? 'تم استلام الرسالة' : 'Message Sent'}</span>
          </p>
          <p>{feedback}</p>
          <button
            onClick={() => setStatus('idle')}
            className="mt-3 px-3 py-1.5 bg-[#294E27] text-white text-[11px] font-semibold rounded-xs"
          >
            {isAr ? 'إرسال رسالة أخرى' : 'Send another message'}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#191A1C] mb-1">
              {isAr ? 'الاسم بالكامل *' : 'Full Name *'}
            </label>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full text-xs p-2.5 bg-[#FCFBF9] border border-[#D8D3CA] rounded-sm text-[#191A1C] focus:outline-none focus:border-[#D96B24]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-[#191A1C] mb-1">
                {isAr ? 'رقم الهاتف / واتساب *' : 'Phone / WhatsApp *'}
              </label>
              <input
                type="tel"
                required
                placeholder="+20 ..."
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full text-xs p-2.5 bg-[#FCFBF9] border border-[#D8D3CA] rounded-sm text-[#191A1C] focus:outline-none focus:border-[#D96B24]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#191A1C] mb-1">
                {isAr ? 'البريد الإلكتروني' : 'Email Address'}
              </label>
              <input
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full text-xs p-2.5 bg-[#FCFBF9] border border-[#D8D3CA] rounded-sm text-[#191A1C] focus:outline-none focus:border-[#D96B24]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#191A1C] mb-1">
              {isAr ? 'نوع الاستفسار *' : 'Enquiry Topic *'}
            </label>
            <select
              value={formData.enquiryType}
              onChange={(e) => setFormData({ ...formData, enquiryType: e.target.value })}
              className="w-full text-xs p-2.5 bg-[#FCFBF9] border border-[#D8D3CA] rounded-sm text-[#191A1C] focus:outline-none focus:border-[#D96B24]"
            >
              <option value="general">{isAr ? 'استفسار عام' : 'General Enquiry'}</option>
              <option value="construction">{isAr ? 'مشروع إنشاءات ومقاولات' : 'New Construction Project'}</option>
              <option value="renovation">{isAr ? 'تشطيبات أو تجديد فيلا / شقة' : 'Renovation & Fit-out'}</option>
              <option value="consultancy">{isAr ? 'استشارة هندسية أو إشراف' : 'Engineering Supervision & Advice'}</option>
              <option value="collaboration">{isAr ? 'شراكة أو توريدات' : 'Partnership & Specialist Subcontracting'}</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#191A1C] mb-1">
              {isAr ? 'الرسالة *' : 'Message *'}
            </label>
            <textarea
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full text-xs p-2.5 bg-[#FCFBF9] border border-[#D8D3CA] rounded-sm text-[#191A1C] focus:outline-none focus:border-[#D96B24]"
            />
          </div>

          <label className="flex items-start gap-2 text-xs text-[#686761] cursor-pointer pt-1">
            <input
              type="checkbox"
              required
              checked={formData.privacyConsent}
              onChange={(e) => setFormData({ ...formData, privacyConsent: e.target.checked })}
              className="accent-[#D96B24] mt-0.5"
            />
            <span>
              {isAr
                ? 'أوافق على استخدام بياناتي للرد على هذا الاستفسار. *'
                : 'I agree that Al-Solasia may use these details to respond to my enquiry. *'}
            </span>
          </label>

          {status === 'error' && (
            <div className="p-3 bg-red-50 text-red-700 text-xs rounded-sm">
              {feedback}
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#D96B24] hover:bg-[#B85819] text-white text-xs font-bold rounded-sm transition-colors cursor-pointer disabled:opacity-50"
            >
              <span>{status === 'loading' ? (isAr ? 'جاري الإرسال...' : 'Sending...') : (isAr ? 'إرسال الرسالة' : 'Send Message')}</span>
              <ArrowUpRightIcon className="w-3.5 h-3.5 rtl:-scale-x-100" />
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
