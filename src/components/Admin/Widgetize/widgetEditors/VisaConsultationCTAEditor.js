import React from "react";
import { FormInput, FormSelect } from "./WidgetEditorFormFields";

const VisaConsultationCTAEditor = ({ config = {}, onChange }) => {
  const update = (key, value) => onChange({ ...config, [key]: value });

  return (
    <>
      <FormInput
        label="Headline"
        value={config.headline}
        onChange={(v) => update("headline", v)}
        placeholder="Not sure where to start?"
      />
      <FormInput
        label="Button text"
        value={config.buttonText}
        onChange={(v) => update("buttonText", v)}
        placeholder="Talk to a Visa Advisor"
      />
      <FormInput
        label="Button link"
        value={config.buttonLink}
        onChange={(v) => update("buttonLink", v)}
        placeholder="#consultation or /consultation"
      />
      <FormSelect
        label="Button style"
        value={config.buttonStyle}
        onChange={(v) => update("buttonStyle", v)}
        options={[
          { value: "primary", label: "Primary" },
          { value: "secondary", label: "Secondary" },
        ]}
      />
      <FormInput
        label="Background color (CSS)"
        value={config.backgroundColor}
        onChange={(v) => update("backgroundColor", v)}
        placeholder="#0f172a"
      />
      <FormInput
        label="Background image URL (optional)"
        value={config.backgroundImage}
        onChange={(v) => update("backgroundImage", v)}
        placeholder="https://..."
      />
    </>
  );
};

export default VisaConsultationCTAEditor;
