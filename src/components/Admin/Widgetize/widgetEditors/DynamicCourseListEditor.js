import React from "react";
import { FormInput, FormTextarea, FormSelect } from "./WidgetEditorFormFields";

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "popularity", label: "Popularity" },
];

const LIMIT_OPTIONS = [
  { value: "4", label: "4" },
  { value: "6", label: "6" },
  { value: "8", label: "8" },
  { value: "12", label: "12" },
  { value: "24", label: "24" },
];

const COUNTRY_OPTIONS = [
  { value: "", label: "Any country" },
  { value: "Canada", label: "Canada" },
  { value: "Germany", label: "Germany" },
  { value: "UK", label: "UK" },
  { value: "Australia", label: "Australia" },
  { value: "USA", label: "USA" },
  { value: "France", label: "France" },
  { value: "Netherlands", label: "Netherlands" },
  { value: "New Zealand", label: "New Zealand" },
];

const UNIVERSITY_OPTIONS = [
  { value: "", label: "Any university" },
  { value: "toronto", label: "University of Toronto" },
  { value: "harvard", label: "Harvard University" },
  { value: "oxford", label: "University of Oxford" },
  { value: "melbourne", label: "University of Melbourne" },
  { value: "munich", label: "LMU Munich" },
  { value: "amsterdam", label: "University of Amsterdam" },
  { value: "ubc", label: "University of British Columbia" },
];

const CATEGORY_OPTIONS = [
  { value: "", label: "Any category" },
  { value: "Engineering", label: "Engineering" },
  { value: "Business", label: "Business" },
  { value: "Medicine", label: "Medicine" },
  { value: "Computer Science", label: "Computer Science" },
  { value: "Law", label: "Law" },
  { value: "Arts", label: "Arts" },
  { value: "Sciences", label: "Sciences" },
  { value: "Education", label: "Education" },
];

const DynamicCourseListEditor = ({ config = {}, onChange }) => {
  const update = (key, value) => onChange({ ...config, [key]: value });

  return (
    <>
      <FormInput
        label="Widget Title"
        value={config.title}
        onChange={(v) => update("title", v)}
        placeholder="e.g. Top Programs in Canada"
      />
      <FormTextarea
        label="Widget Description"
        value={config.description}
        onChange={(v) => update("description", v)}
        placeholder="e.g. Explore the most popular student visa programs this year."
        rows={3}
      />
      <FormInput
        label="API Endpoint URL"
        value={config.apiEndpointUrl}
        onChange={(v) => update("apiEndpointUrl", v)}
        placeholder="mock or https://api.example.com/courses"
        hint="Use 'mock' or '/api/mock/courses' for simulated data with filters. Otherwise use your real Courses API base URL."
      />
      <FormSelect
        label="Sort By"
        value={config.sortBy}
        onChange={(v) => update("sortBy", v)}
        options={SORT_OPTIONS}
        hint="Sent as ?sort= to the API"
      />
      <FormSelect
        label="University Filter"
        value={config.university}
        onChange={(v) => update("university", v)}
        options={UNIVERSITY_OPTIONS}
        hint="Optional. Sent as ?university= to the API"
      />
      <FormSelect
        label="Country Filter"
        value={config.country}
        onChange={(v) => update("country", v)}
        options={COUNTRY_OPTIONS}
        hint="Optional. Sent as ?country= to the API"
      />
      <FormSelect
        label="Category / Field of Study"
        value={config.category}
        onChange={(v) => update("category", v)}
        options={CATEGORY_OPTIONS}
        hint="Optional. Sent as ?category= to the API"
      />
      <FormSelect
        label="Limit (number of courses to show)"
        value={String(config.limit ?? 8)}
        onChange={(v) => update("limit", parseInt(v, 10) || 8)}
        options={LIMIT_OPTIONS}
        hint="Sent as ?limit= to the API"
      />
    </>
  );
};

export default DynamicCourseListEditor;
