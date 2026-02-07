import React from "react";
import { FormField, FormInput, FormSelect } from "./WidgetEditorFormFields";

const HeroVisaBannerEditor = ({ config = {}, onChange }) => {
  const update = (key, value) => onChange({ ...config, [key]: value });

  return (
    <>
      <FormInput
        label="Headline"
        value={config.headline}
        onChange={(v) => update("headline", v)}
        placeholder="Get Your Student Visa Faster"
      />
      <FormInput
        label="Subtitle"
        value={config.subtitle}
        onChange={(v) => update("subtitle", v)}
        placeholder="Study abroad with full support from our experts"
      />
      <FormInput
        label="CTA button text"
        value={config.ctaText}
        onChange={(v) => update("ctaText", v)}
        placeholder="Book Free Consultation"
      />
      <FormInput
        label="CTA button link"
        value={config.ctaLink}
        onChange={(v) => update("ctaLink", v)}
        placeholder="#consultation or /consultation"
      />
      <FormSelect
        label="Content alignment"
        value={config.alignment}
        onChange={(v) => update("alignment", v)}
        options={[
          { value: "left", label: "Left" },
          { value: "center", label: "Center" },
          { value: "right", label: "Right" },
        ]}
      />
      <FormSelect
        label="Background type"
        value={config.backgroundType}
        onChange={(v) => update("backgroundType", v)}
        options={[
          { value: "gradient", label: "Gradient" },
          { value: "image", label: "Image" },
        ]}
      />
      {config.backgroundType === "image" && (
        <FormInput
          label="Background image URL"
          value={config.backgroundImage}
          onChange={(v) => update("backgroundImage", v)}
          placeholder="https://..."
        />
      )}
      {config.backgroundType === "gradient" && (
        <FormInput
          label="Background gradient (CSS)"
          value={config.backgroundGradient}
          onChange={(v) => update("backgroundGradient", v)}
          placeholder="linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)"
          hint="e.g. linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)"
        />
      )}
    </>
  );
};

export default HeroVisaBannerEditor;
