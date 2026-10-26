export interface ProjectEnquiryInput {
  fullName: string;
  phone: string;
  email?: string;
  preferredContact: 'whatsapp' | 'phone' | 'email';
  projectType: string;
  location: string;
  currentStage: string;
  requiredServices: string[];
  fundingReadiness?: string;
  expectedStart?: string;
  description: string;
  privacyConsent: boolean;
  locale: 'ar' | 'en';
}

export interface StoredProjectEnquiry extends ProjectEnquiryInput {
  id: string;
  timestamp: string;
  source: 'website';
  status: 'new' | 'reviewed' | 'contacted';
}

export interface ContactEnquiryInput {
  fullName: string;
  phone?: string;
  email?: string;
  enquiryType: string;
  message: string;
  privacyConsent: boolean;
  locale: 'ar' | 'en';
}

export interface StoredContactEnquiry extends ContactEnquiryInput {
  id: string;
  timestamp: string;
  source: 'website';
  status: 'new' | 'reviewed' | 'contacted';
}
