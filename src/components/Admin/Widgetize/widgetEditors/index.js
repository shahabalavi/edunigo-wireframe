import { WIDGET_TYPES } from "../../../../config/pageWidgets";
import HeroVisaBannerEditor from "./HeroVisaBannerEditor";
import CountriesWeSupportEditor from "./CountriesWeSupportEditor";
import WhyChooseStudyAbroadEditor from "./WhyChooseStudyAbroadEditor";
import VisaRequirementsChecklistEditor from "./VisaRequirementsChecklistEditor";
import StepByStepVisaProcessEditor from "./StepByStepVisaProcessEditor";
import DocumentPreparationEditor from "./DocumentPreparationEditor";
import UniversityProgramFinderEditor from "./UniversityProgramFinderEditor";
import SuccessStoriesTestimonialsEditor from "./SuccessStoriesTestimonialsEditor";
import VisaConsultationCTAEditor from "./VisaConsultationCTAEditor";
import FAQStudentVisaEditor from "./FAQStudentVisaEditor";
import PricingServicePackagesEditor from "./PricingServicePackagesEditor";
import ImmigrationFooterEditor from "./ImmigrationFooterEditor";

export const WIDGET_EDITORS = {
  [WIDGET_TYPES.HERO_VISA_BANNER]: HeroVisaBannerEditor,
  [WIDGET_TYPES.COUNTRIES_WE_SUPPORT]: CountriesWeSupportEditor,
  [WIDGET_TYPES.WHY_CHOOSE_STUDY_ABROAD]: WhyChooseStudyAbroadEditor,
  [WIDGET_TYPES.VISA_REQUIREMENTS_CHECKLIST]: VisaRequirementsChecklistEditor,
  [WIDGET_TYPES.STEP_BY_STEP_VISA_PROCESS]: StepByStepVisaProcessEditor,
  [WIDGET_TYPES.DOCUMENT_PREPARATION]: DocumentPreparationEditor,
  [WIDGET_TYPES.UNIVERSITY_PROGRAM_FINDER]: UniversityProgramFinderEditor,
  [WIDGET_TYPES.SUCCESS_STORIES_TESTIMONIALS]: SuccessStoriesTestimonialsEditor,
  [WIDGET_TYPES.VISA_CONSULTATION_CTA]: VisaConsultationCTAEditor,
  [WIDGET_TYPES.FAQ_STUDENT_VISA]: FAQStudentVisaEditor,
  [WIDGET_TYPES.PRICING_SERVICE_PACKAGES]: PricingServicePackagesEditor,
  [WIDGET_TYPES.IMMIGRATION_FOOTER]: ImmigrationFooterEditor,
};

export function getWidgetEditor(type) {
  return WIDGET_EDITORS[type] || null;
}
