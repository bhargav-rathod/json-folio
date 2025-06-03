interface TrackingConfig {
  enabled: boolean;
  googleForm: {
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

interface ContactFormProps {
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

// Type definitions
type PortfolioData = {
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
    navLinks: {
      label: string;
      section: string;
    }[];
  };
  codeElements: {
    text: string;
    x: string;
    y: string;
    delay: string;
  }[];
  intro: {
    enabled: boolean;
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
  projects: {
    enabled: boolean;
    title: string;
    highlight: string;
    items: {
      index: number;
      title: string;
      description: string;
      githubLink: string;
      technologies: string[];
      type: string;
    }[];
  };
  achievements: {
    enabled: boolean;
    title: string;
    highlight: string;
    description: string[];
    certifications: {
      name: string;
      issuer: string;
      icon: string;
    }[];
  };
  contactForm: ContactFormProps;
  contact: {
    enabled: boolean;
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
    text: string;
  };
  footer: {
    enabled: boolean;
    text: string;
  };
  tracking: TrackingConfig
};