// Type definitions for portfolio data
export interface TrackingConfig {
  enabled: boolean;
  googleAnalytics?: {
    enabled: boolean;
    googleTag: string;
  };
  googleForm: {
    enabled: boolean;
    actionUrl: string;
    fields: {
      timestamp: string;
      eventType: string;
      ipAddress: string;
      userAgent: string;
      country: string;
      additionalData: string;
    };
  };
  ipServices: {
    ipLookup: string;
    geoLookup: string;
  };
  sourceDetection: {
    ignoreParam: string;
    ignoreValue: string;
    referrers: Record<string, string>;
    defaultSource: string;
  };
}

export interface ContactFormProps {
  emailJsConfig: {
    serviceId: string;
    templateId: string;
    publicKey: string;
  };
  formFields: {
    name: { label: string; placeholder?: string };
    email: { label: string; placeholder?: string };
    phone: { label: string; placeholder?: string };
    subject: { label: string; placeholder?: string };
    message: { label: string; placeholder?: string };
  };
  submitButton: {
    text: string;
    sendingText: string;
  };
  successMessage: string;
  errorMessage: string;
  validationMessages: {
    name: string;
    email: string;
    messageMin: string;
    messageMax: string;
    subject: string;
  };
}

interface NavLink {
  label: string;
  section: string;
  navEligibleForDesktop?: boolean;
  navEligibleForMobile?: boolean;
}

interface CustomSectionContent {
  richText?: string[];
  list?: string[];
  links?: { label: string; url: string; description?: string }[];
  button?: { label: string; url: string; description?: string };
  newsletter?: {
    heading?: string;
    subcopy?: string;
    placeholder: string;
    ctaLabel: string;
    ctaUrl: string;
    note?: string;
    stats?: { label: string; value: string }[];
    pitch?: string;
  };
  [key: string]: any;
}

export interface PortfolioData {
  meta: {
    title: string;
    description: string;
    favicon: string;
  };
  header: {
    enabled: boolean;
    logo: {
      text: string;
    };
    navLinks: NavLink[];
  };
  codeElements: {
    text: string;
    x: string;
    y: string;
    delay: string;
  }[];
  intro: {
    enabled: boolean;
    index?: number;
    tagline: string;
    professional: string;
    description: string;
    avatar: {
      enabled: boolean;
      image: string;
      alt: string;
    };
    cta: {
      resumeUrl: string;
      buttonText: string;
      resumeFileName: string;
    };
  };
  stats: {
    enabled: boolean;
    items: {
      value: string;
      label: string;
    }[];
  };
  skills: {
    enabled: boolean;
    index?: number;
    title: string;
    highlight: string;
    categories: {
      name: string;
      highlight: string;
      items: string[];
    }[];
  };
  experience: {
    enabled: boolean;
    index?: number;
    title: string;
    highlight: string;
    items: {
      id: number;
      title: string;
      period: string;
      company: string;
      location: string;
      description: string[];
      tags: string[];
    }[];
  };
  education: {
    enabled: boolean;
    index?: number;
    title: string;
    highlight: string;
    items: {
      degree: string;
      stream: string;
      institute: string;
      result: string;
      duration: string;
      location: string;
    }[];
  };
  publications: {
    enabled: boolean;
    index?: number;
    title: string;
    highlight: string;
    displayLimit?: number;
    showMoreText?: string;
    loadingText?: string;
    items: {
      title: string;
      description: string;
      url: string;
      platform: string;
      date: string;
      type: string;
      image?: string;
      tags: string[];
      authors?: string;
    }[];
  };
  projects: {
    enabled: boolean;
    index?: number;
    title: string;
    highlight: string;
    items: {
      title: string;
      description: string;
      githubLink: string;
      technologies: string[];
      type: string;
    }[];
  };
  achievements: {
    enabled: boolean;
    index?: number;
    title: string;
    highlight: string;
    description: string[];
    certifications: {
      name: string;
      issuer: string;
      icon?: string;
      url?: string;
    }[];
  };
  testimonials: {
    enabled: boolean;
    index?: number;
    title: string;
    highlight: string;
    items: {
      receivedFrom: string;
      designation: string;
      linkedinUserName: string;
      message: string;
    }[];
  };
  contactForm: ContactFormProps;
  contact: {
    enabled: boolean;
    index?: number;
    title: string;
    highlight: string;
    email: string;
    location: string;
    socialLinks: {
      name: string;
      url: string;
      icon: string;
    }[];
  };
  quote: {
    enabled: boolean;
    index?: number;
    text: string;
  };
  customSections?: Array<{
    id: string;
    title: string;
    enabled: boolean;
    index?: number;
    type: 'info' | 'links' | 'button' | 'newsletter' | string;
    description?: string;
    eyebrow?: string;
    content: CustomSectionContent;
  }>;
  footer: {
    enabled: boolean;
    text: string;
  };
  tracking: TrackingConfig;
}