/**
 * Page Widget Registry
 * Each widget type can be added, removed, reordered, and configured in admin.
 * Used by the Widgetize module for any dynamic page (landing pages, visa, etc.).
 */

export const WIDGET_TYPES = {
  HERO_VISA_BANNER: "hero_visa_banner",
  COUNTRIES_WE_SUPPORT: "countries_we_support",
  WHY_CHOOSE_STUDY_ABROAD: "why_choose_study_abroad",
  VISA_REQUIREMENTS_CHECKLIST: "visa_requirements_checklist",
  STEP_BY_STEP_VISA_PROCESS: "step_by_step_visa_process",
  DOCUMENT_PREPARATION: "document_preparation",
  UNIVERSITY_PROGRAM_FINDER: "university_program_finder",
  SUCCESS_STORIES_TESTIMONIALS: "success_stories_testimonials",
  VISA_CONSULTATION_CTA: "visa_consultation_cta",
  FAQ_STUDENT_VISA: "faq_student_visa",
  PRICING_SERVICE_PACKAGES: "pricing_service_packages",
  IMMIGRATION_FOOTER: "immigration_footer",
  DYNAMIC_COURSE_LIST: "dynamic_course_list",
};

export const WIDGET_REGISTRY = [
  {
    type: WIDGET_TYPES.HERO_VISA_BANNER,
    label: "Hero Visa Banner",
    description: "First impression + CTA",
    defaultConfig: {
      headline: "Get Your Student Visa Faster",
      subtitle: "Study abroad with full support from our experts",
      ctaText: "Book Free Consultation",
      ctaLink: "#consultation",
      alignment: "center",
      backgroundType: "gradient",
      backgroundImage: "",
      backgroundGradient: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)",
    },
  },
  {
    type: WIDGET_TYPES.COUNTRIES_WE_SUPPORT,
    label: "Countries We Support",
    description: "Show study destinations",
    defaultConfig: {
      layout: "grid",
      cardStyle: "default",
      countryDetailLink: "/pages/",
      countries: [
        { code: "CA", name: "Canada", flag: "🇨🇦" },
        { code: "DE", name: "Germany", flag: "🇩🇪" },
        { code: "GB", name: "UK", flag: "🇬🇧" },
        { code: "AU", name: "Australia", flag: "🇦🇺" },
        { code: "US", name: "USA", flag: "🇺🇸" },
      ],
    },
  },
  {
    type: WIDGET_TYPES.WHY_CHOOSE_STUDY_ABROAD,
    label: "Why Choose Study Abroad?",
    description: "Motivation + trust",
    defaultConfig: {
      columns: 4,
      cards: [
        { title: "Better education quality", icon: "graduation", image: "" },
        { title: "Global job opportunities", icon: "briefcase", image: "" },
        { title: "Residency pathways", icon: "home", image: "" },
        { title: "Scholarships available", icon: "award", image: "" },
      ],
    },
  },
  {
    type: WIDGET_TYPES.VISA_REQUIREMENTS_CHECKLIST,
    label: "Visa Requirements Checklist",
    description: "Practical value",
    defaultConfig: {
      style: "list",
      items: [
        "Acceptance letter from university",
        "Proof of funds",
        "Language certificate (IELTS/TOEFL)",
        "Passport validity",
        "Motivation letter",
      ],
    },
  },
  {
    type: WIDGET_TYPES.STEP_BY_STEP_VISA_PROCESS,
    label: "Step-by-Step Visa Process",
    description: "Explain the journey",
    defaultConfig: {
      orientation: "horizontal",
      steps: [
        "Choose country & program",
        "Apply to university",
        "Receive acceptance letter",
        "Prepare documents",
        "Submit visa application",
        "Get approval & travel",
      ],
    },
  },
  {
    type: WIDGET_TYPES.DOCUMENT_PREPARATION,
    label: "Document Preparation",
    description: "Highlight key documents",
    defaultConfig: {
      expandable: true,
      documents: [
        { name: "SOP (Statement of Purpose)", hasAttachment: false },
        { name: "Bank statements", hasAttachment: false },
        { name: "Sponsor letter", hasAttachment: false },
        { name: "Travel insurance", hasAttachment: false },
      ],
    },
  },
  {
    type: WIDGET_TYPES.UNIVERSITY_PROGRAM_FINDER,
    label: "University & Program Finder",
    description: "Lead generation",
    defaultConfig: {
      placeholder: "Find programs in Canada",
      filterOptions: ["country", "degree", "intake"],
      featuredUniversities: [],
    },
  },
  {
    type: WIDGET_TYPES.SUCCESS_STORIES_TESTIMONIALS,
    label: "Success Stories / Testimonials",
    description: "Social proof",
    defaultConfig: {
      layout: "slider",
      testimonials: [
        { quote: "I got my visa in 6 weeks!", author: "Student", photo: "" },
        { quote: "They helped me with my SOP and embassy interview", author: "Student", photo: "" },
      ],
    },
  },
  {
    type: WIDGET_TYPES.VISA_CONSULTATION_CTA,
    label: "Visa Consultation CTA",
    description: "Conversion section",
    defaultConfig: {
      headline: "Not sure where to start?",
      buttonText: "Talk to a Visa Advisor",
      buttonLink: "#consultation",
      backgroundColor: "#0f172a",
      backgroundImage: "",
      buttonStyle: "primary",
    },
  },
  {
    type: WIDGET_TYPES.FAQ_STUDENT_VISA,
    label: "FAQ for Student Visa",
    description: "Common questions",
    defaultConfig: {
      accordionStyle: true,
      categoriesByCountry: false,
      faqs: [
        { q: "How long does it take?", a: "Typically 4–12 weeks depending on country." },
        { q: "Can I work while studying?", a: "Most countries allow part-time work for students." },
        { q: "What if my visa is rejected?", a: "We help you reapply with stronger documentation." },
        { q: "Do I need IELTS?", a: "Most English-speaking destinations require proof of English proficiency." },
      ],
    },
  },
  {
    type: WIDGET_TYPES.PRICING_SERVICE_PACKAGES,
    label: "Pricing / Service Packages",
    description: "Service plans",
    defaultConfig: {
      featuredPlanId: "standard",
      plans: [
        { id: "basic", name: "Basic", description: "Document review", price: "From $99" },
        { id: "standard", name: "Standard", description: "Full application support", price: "From $299" },
        { id: "premium", name: "Premium", description: "Interview + scholarship guidance", price: "From $499" },
      ],
    },
  },
  {
    type: WIDGET_TYPES.IMMIGRATION_FOOTER,
    label: "Immigration Footer",
    description: "Contact & legal",
    defaultConfig: {
      variant: "full",
      whatsAppLink: "",
      showSocialMedia: true,
      showLegalDisclaimer: true,
      contactEmail: "contact@edunigo.com",
    },
  },
  {
    type: WIDGET_TYPES.DYNAMIC_COURSE_LIST,
    label: "Dynamic Course List",
    description: "Fetch and display courses from Courses API with filters",
    defaultConfig: {
      title: "Featured Programs",
      description: "Explore programs that match your goals.",
      apiEndpointUrl: "mock",
      sortBy: "newest",
      university: "",
      country: "",
      category: "",
      limit: 8,
    },
  },
];

export const getWidgetDefinition = (type) =>
  WIDGET_REGISTRY.find((w) => w.type === type);

export const getDefaultConfig = (type) => {
  const def = getWidgetDefinition(type);
  return def ? { ...def.defaultConfig } : {};
};
