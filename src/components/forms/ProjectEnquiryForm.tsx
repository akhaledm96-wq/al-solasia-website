'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { CheckIcon, ArrowUpRightIcon } from '@/components/ui/Icons';

export default function ProjectEnquiryForm() {
  const locale = useLocale();
  const isAr = locale === 'ar';

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    preferredContact: 'whatsapp' as 'whatsapp' | 'phone' | 'email',
    projectType: '',
    location: '',
    currentStage: '',
    requiredServices: [] as string[],
    fundingReadiness: '',
    expectedStart: '',
    description: '',
    privacyConsent: false,
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState<string>('');

  const servicesList = isAr
    ? [
        'التصميم المعماري والإنشائي',
        'الإنشاءات والمقاولات المتكاملة',
        'التشطيبات والتجهيزات الداخلية والخارجية',
        'الترميم ومعالجة العيوب الإنشائية',
        'الإشراف الهندسي وإدارة الموقع',
        'تنسيق ملفات التراخيص والموافقات',
      ]
    : [
        'Architectural & Structural Design',
        'Turnkey Construction & Contracting',
        'Interior & Exterior Finishing',
        'Structural Repair & Rehabilitation',
        'Site Supervision & Quality Control',
        'Permits & Approvals Coordination',
      ];

  const handleServiceToggle = (service: string) => {
    setFormData((prev) => {
      const exists = prev.requiredServices.includes(service);
      return {
        ...prev,
        requiredServices: exists
          ? prev.requiredServices.filter((s) => s !== service)
          : [...prev.requiredServices, service],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.privacyConsent) {
      alert(isAr ? 'يرجى الموافقة على شروط الخصوصية' : 'Please agree to the privacy terms');
      return;
    }

    setStatus('loading');
    setFeedback('');

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, locale }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        setFeedback(
          isAr
            ? `تم استلام استفسارك بنجاح برقم مرجعي: ${data.id.slice(0, 8)}. سيتواصل معك فريقنا الهندسي قريبًا.`
            : `Your project enquiry has been received (Ref: ${data.id.slice(0, 8)}). Our engineering team will review it and follow up shortly.`
        );
        setFormData({
          fullName: '',
          phone: '',
          email: '',
          preferredContact: 'whatsapp',
          projectType: '',
          location: '',
          currentStage: '',
          requiredServices: [],
          fundingReadiness: '',
          expectedStart: '',
          description: '',
          privacyConsent: false,
        });
      } else {
        setStatus('error');
        setFeedback(data.error || (isAr ? 'حدث خطأ أثناء الإرسال. يرجى المحاولة لاحقًا.' : 'Error sending enquiry. Please try again.'));
      }
    } catch {
      setStatus('error');
      setFeedback(isAr ? 'تعذر الاتصال بالخادم. يرجى التحقق من الاتصال.' : 'Server connection failed. Please try again.');
    }
  };

  return (
    <div id="enquiry-form" className="bg-white p-6 sm:p-10 rounded-sm border border-[#D8D3CA] shadow-sm max-w-4xl mx-auto">
      <div className="mb-8 pb-4 border-b border-[#D8D3CA]">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#191A1C] mb-2">
          {isAr ? 'استفسار عن مشروع جديد' : 'Detailed Project Enquiry'}
        </h2>
        <p className="text-xs sm:text-sm text-[#686761]">
          {isAr
            ? 'الحقول المميزة بـ (*) مطلوبة. تساعدنا هذه البيانات على فهم نطاق مشروعك بدقة قبل المحادثة الأولى.'
            : 'Fields marked with (*) are required. This information helps us understand your project scope and prepare for the initial consultation.'}
        </p>
      </div>

      {status === 'success' ? (
        <div className="p-6 bg-[#EDF4EB] border border-[#C8DDC2] rounded-sm text-[#294E27] text-sm animate-in fade-in duration-300">
          <div className="flex items-center gap-2 font-bold text-base mb-2">
            <CheckIcon className="w-5 h-5 text-[#294E27]" />
            <span>{isAr ? 'تم تأكيد استلام الاستفسار' : 'Enquiry Successfully Registered'}</span>
          </div>
          <p className="leading-relaxed">{feedback}</p>
          <button
            onClick={() => setStatus('idle')}
            className="mt-4 px-4 py-2 bg-[#294E27] text-white text-xs font-semibold rounded-xs"
          >
            {isAr ? 'إرسال استفسار آخر' : 'Submit Another Enquiry'}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: Project Details */}
          <div>
            <h3 className="text-xs font-bold tracking-widest uppercase text-[#D96B24] mb-4 pb-1 border-b border-[#D8D3CA]/60">
              {isAr ? 'بيانات المشروع' : '1. ABOUT THE PROJECT'}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Project Type */}
              <div>
                <label className="block text-xs font-bold text-[#191A1C] mb-1.5">
                  {isAr ? 'نوع المشروع *' : 'Project Type *'}
                </label>
                <select
                  required
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="w-full text-xs p-3 bg-[#FCFBF9] border border-[#D8D3CA] rounded-sm text-[#191A1C] focus:outline-none focus:border-[#D96B24] focus:ring-1 focus:ring-[#D96B24]"
                >
                  <option value="">{isAr ? 'اختر نوع المشروع' : 'Select project type'}</option>
                  <option value="villa">{isAr ? 'فيلا سكنية خاصة' : 'Private Villa'}</option>
                  <option value="residential-building">{isAr ? 'عمارة سكنية' : 'Residential Building'}</option>
                  <option value="commercial-fitout">{isAr ? 'مقر إداري أو تجاري' : 'Commercial / Office Fit-out'}</option>
                  <option value="apartment-renovation">{isAr ? 'تشطيب أو تجديد شقة' : 'Apartment Finishing / Renovation'}</option>
                  <option value="structural-repair">{isAr ? 'ترميم أو إصلاح مبنى قائم' : 'Building Repair & Rehabilitation'}</option>
                  <option value="institutional">{isAr ? 'مشروع مؤسسي أو بنية تحتية' : 'Institutional / Infrastructure Project'}</option>
                  <option value="other">{isAr ? 'أخرى' : 'Other'}</option>
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-bold text-[#191A1C] mb-1.5">
                  {isAr ? 'موقع المشروع (المدينة / المنطقة) *' : 'Project Location (City / Area) *'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={isAr ? 'مثال: القاهرة الجديدة، التجمع الخامس' : 'e.g., New Cairo, 5th Settlement'}
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full text-xs p-3 bg-[#FCFBF9] border border-[#D8D3CA] rounded-sm text-[#191A1C] focus:outline-none focus:border-[#D96B24] focus:ring-1 focus:ring-[#D96B24]"
                />
              </div>

              {/* Current Stage */}
              <div>
                <label className="block text-xs font-bold text-[#191A1C] mb-1.5">
                  {isAr ? 'المرحلة الحالية للمشروع *' : 'Current Project Stage *'}
                </label>
                <select
                  required
                  value={formData.currentStage}
                  onChange={(e) => setFormData({ ...formData, currentStage: e.target.value })}
                  className="w-full text-xs p-3 bg-[#FCFBF9] border border-[#D8D3CA] rounded-sm text-[#191A1C] focus:outline-none focus:border-[#D96B24] focus:ring-1 focus:ring-[#D96B24]"
                >
                  <option value="">{isAr ? 'اختر المرحلة الحالية' : 'Select current stage'}</option>
                  <option value="land-planning">{isAr ? 'الأرض متوفرة / مرحلة التخطيط' : 'Land acquired / Planning'}</option>
                  <option value="design-progress">{isAr ? 'التصميم قيد الإعداد' : 'Design in progress'}</option>
                  <option value="permits-approvals">{isAr ? 'مرحلة التراخيص والموافقات' : 'Permits & Approvals stage'}</option>
                  <option value="foundations-structure">{isAr ? 'الأساسات والهيكل الإنشائي' : 'Foundations & Structure'}</option>
                  <option value="finishing-fitout">{isAr ? 'أعمال التشطيبات والتجهيزات' : 'Finishing & Fit-out stage'}</option>
                  <option value="existing-repair">{isAr ? 'مبنى قائم بحاجة لترميم أو فحص' : 'Existing building requiring repairs'}</option>
                </select>
              </div>

              {/* Expected Start */}
              <div>
                <label className="block text-xs font-bold text-[#191A1C] mb-1.5">
                  {isAr ? 'موعد البدء المتوقع' : 'Expected Start Date'}
                </label>
                <select
                  value={formData.expectedStart}
                  onChange={(e) => setFormData({ ...formData, expectedStart: e.target.value })}
                  className="w-full text-xs p-3 bg-[#FCFBF9] border border-[#D8D3CA] rounded-sm text-[#191A1C] focus:outline-none focus:border-[#D96B24] focus:ring-1 focus:ring-[#D96B24]"
                >
                  <option value="">{isAr ? 'حدد الإطار الزمني' : 'Choose timeframe'}</option>
                  <option value="immediate">{isAr ? 'في أقرب وقت ممكن' : 'Immediately / As soon as possible'}</option>
                  <option value="1-3-months">{isAr ? 'خلال ١ – ٣ أشهر' : 'Within 1 – 3 months'}</option>
                  <option value="3-6-months">{isAr ? 'خلال ٣ – ٦ أشهر' : 'Within 3 – 6 months'}</option>
                  <option value="exploring">{isAr ? 'دراسة خيارات فقط' : 'Exploring options for future'}</option>
                </select>
              </div>
            </div>

            {/* Required Services Checkboxes */}
            <div className="mt-5">
              <label className="block text-xs font-bold text-[#191A1C] mb-2.5">
                {isAr ? 'الخدمات المطلوبة (يمكن اختيار أكثر من خدمة)' : 'Required Services (Select all that apply)'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {servicesList.map((svc) => {
                  const isChecked = formData.requiredServices.includes(svc);
                  return (
                    <label
                      key={svc}
                      onClick={() => handleServiceToggle(svc)}
                      className={`flex items-center gap-2.5 p-3 rounded-sm border text-xs cursor-pointer transition-colors ${
                        isChecked
                          ? 'bg-[#D96B24]/10 border-[#D96B24] font-semibold text-[#191A1C]'
                          : 'bg-[#FCFBF9] border-[#D8D3CA] text-[#686761] hover:border-[#D96B24]'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="accent-[#D96B24] w-3.5 h-3.5"
                      />
                      <span>{svc}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Description */}
            <div className="mt-5">
              <label className="block text-xs font-bold text-[#191A1C] mb-1.5">
                {isAr ? 'نبذة مختصرة عن المشروع ومتطلباتك *' : 'Brief Project Description *'}
              </label>
              <textarea
                required
                rows={4}
                placeholder={
                  isAr
                    ? 'اشرح لنا بإيجاز طبيعة العمل المطلوب، المساحة التقريبية، وأي تفاصيل فنية تساعدنا في دراسة المشروع...'
                    : 'Briefly describe what you are planning, approximate area, and specific technical requirements...'
                }
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full text-xs p-3 bg-[#FCFBF9] border border-[#D8D3CA] rounded-sm text-[#191A1C] focus:outline-none focus:border-[#D96B24] focus:ring-1 focus:ring-[#D96B24]"
              />
            </div>
          </div>

          {/* Section 2: Contact Info */}
          <div>
            <h3 className="text-xs font-bold tracking-widest uppercase text-[#D96B24] mb-4 pb-1 border-b border-[#D8D3CA]/60">
              {isAr ? 'بيانات التواصل' : '2. YOUR CONTACT DETAILS'}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-[#191A1C] mb-1.5">
                  {isAr ? 'الاسم بالكامل *' : 'Full Name *'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={isAr ? 'الاسم' : 'Your full name'}
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full text-xs p-3 bg-[#FCFBF9] border border-[#D8D3CA] rounded-sm text-[#191A1C] focus:outline-none focus:border-[#D96B24] focus:ring-1 focus:ring-[#D96B24]"
                />
              </div>

              {/* Phone / WhatsApp */}
              <div>
                <label className="block text-xs font-bold text-[#191A1C] mb-1.5">
                  {isAr ? 'رقم الهاتف / واتساب *' : 'Phone / WhatsApp Number *'}
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+20 ..."
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full text-xs p-3 bg-[#FCFBF9] border border-[#D8D3CA] rounded-sm text-[#191A1C] focus:outline-none focus:border-[#D96B24] focus:ring-1 focus:ring-[#D96B24]"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-[#191A1C] mb-1.5">
                  {isAr ? 'البريد الإلكتروني (اختياري)' : 'Email Address (Optional)'}
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full text-xs p-3 bg-[#FCFBF9] border border-[#D8D3CA] rounded-sm text-[#191A1C] focus:outline-none focus:border-[#D96B24] focus:ring-1 focus:ring-[#D96B24]"
                />
              </div>

              {/* Preferred Contact Method */}
              <div>
                <label className="block text-xs font-bold text-[#191A1C] mb-1.5">
                  {isAr ? 'طريقة التواصل المفضلة' : 'Preferred Contact Channel'}
                </label>
                <select
                  value={formData.preferredContact}
                  onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value as any })}
                  className="w-full text-xs p-3 bg-[#FCFBF9] border border-[#D8D3CA] rounded-sm text-[#191A1C] focus:outline-none focus:border-[#D96B24] focus:ring-1 focus:ring-[#D96B24]"
                >
                  <option value="whatsapp">{isAr ? 'محادثة واتساب' : 'WhatsApp Chat'}</option>
                  <option value="phone">{isAr ? 'اتصال هاتفي' : 'Phone Call'}</option>
                  <option value="email">{isAr ? 'بريد إلكتروني' : 'Email'}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Privacy Consent Checkbox */}
          <div className="pt-2">
            <label className="flex items-start gap-2.5 text-xs text-[#686761] cursor-pointer">
              <input
                type="checkbox"
                required
                checked={formData.privacyConsent}
                onChange={(e) => setFormData({ ...formData, privacyConsent: e.target.checked })}
                className="accent-[#D96B24] mt-0.5 w-4 h-4 shrink-0"
              />
              <span>
                {isAr
                  ? 'أوافق على قيام شركة الثلاثية لهندسة البناء باستخدام هذه البيانات للرد على استفساري بشأن المشروع ودراسة المتطلبات الفنية. *'
                  : 'I agree that Al-Solasia Building Engineering may use these details to review project scope and respond to this enquiry. *'}
              </span>
            </label>
          </div>

          {/* Feedback error */}
          {status === 'error' && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-sm">
              {feedback}
            </div>
          )}

          {/* Submit Action */}
          <div className="pt-4 border-t border-[#D8D3CA] flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#D96B24] hover:bg-[#B85819] text-white text-xs font-bold rounded-sm transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer"
            >
              <span>{status === 'loading' ? (isAr ? 'جاري الإرسال...' : 'Submitting...') : (isAr ? 'إرسال بيانات المشروع' : 'Submit Project Enquiry')}</span>
              <ArrowUpRightIcon className="w-3.5 h-3.5 rtl:-scale-x-100" />
            </button>

            <span className="text-[11px] text-[#A9A49C]">
              {isAr ? 'بياناتك محمية ولن تتم مشاركتها مع أي طرف ثالث' : 'Your data is confidential and securely handled.'}
            </span>
          </div>
        </form>
      )}
    </div>
  );
}
