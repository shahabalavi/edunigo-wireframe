import HeroVisaBanner from "./HeroVisaBanner";
import CountriesWeSupport from "./CountriesWeSupport";
import WhyChooseStudyAbroad from "./WhyChooseStudyAbroad";
import VisaRequirementsChecklist from "./VisaRequirementsChecklist";
import StepByStepVisaProcess from "./StepByStepVisaProcess";
import DocumentPreparationWidget from "./DocumentPreparationWidget";
import UniversityProgramFinder from "./UniversityProgramFinder";
import SuccessStoriesTestimonials from "./SuccessStoriesTestimonials";
import VisaConsultationCTA from "./VisaConsultationCTA";
import FAQStudentVisa from "./FAQStudentVisa";
import PricingServicePackages from "./PricingServicePackages";
import ImmigrationFooterWidget from "./ImmigrationFooterWidget";
import { WIDGET_TYPES } from "../../../config/visaWidgets";

export const WIDGET_COMPONENTS = {
  [WIDGET_TYPES.HERO_VISA_BANNER]: HeroVisaBanner,
  [WIDGET_TYPES.COUNTRIES_WE_SUPPORT]: CountriesWeSupport,
  [WIDGET_TYPES.WHY_CHOOSE_STUDY_ABROAD]: WhyChooseStudyAbroad,
  [WIDGET_TYPES.VISA_REQUIREMENTS_CHECKLIST]: VisaRequirementsChecklist,
  [WIDGET_TYPES.STEP_BY_STEP_VISA_PROCESS]: StepByStepVisaProcess,
  [WIDGET_TYPES.DOCUMENT_PREPARATION]: DocumentPreparationWidget,
  [WIDGET_TYPES.UNIVERSITY_PROGRAM_FINDER]: UniversityProgramFinder,
  [WIDGET_TYPES.SUCCESS_STORIES_TESTIMONIALS]: SuccessStoriesTestimonials,
  [WIDGET_TYPES.VISA_CONSULTATION_CTA]: VisaConsultationCTA,
  [WIDGET_TYPES.FAQ_STUDENT_VISA]: FAQStudentVisa,
  [WIDGET_TYPES.PRICING_SERVICE_PACKAGES]: PricingServicePackages,
  [WIDGET_TYPES.IMMIGRATION_FOOTER]: ImmigrationFooterWidget,
};

export {
  HeroVisaBanner,
  CountriesWeSupport,
  WhyChooseStudyAbroad,
  VisaRequirementsChecklist,
  StepByStepVisaProcess,
  DocumentPreparationWidget,
  UniversityProgramFinder,
  SuccessStoriesTestimonials,
  VisaConsultationCTA,
  FAQStudentVisa,
  PricingServicePackages,
  ImmigrationFooterWidget,
};
