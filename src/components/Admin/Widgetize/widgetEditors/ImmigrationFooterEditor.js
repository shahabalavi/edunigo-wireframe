import React from "react";
import { FormInput, FormSelect, FormCheckbox } from "./WidgetEditorFormFields";

const ImmigrationFooterEditor = ({ config = {}, onChange }) => {
  const update = (key, value) => onChange({ ...config, [key]: value });

  return (
    <>
      <FormSelect
        label="Footer variant"
        value={config.variant}
        onChange={(v) => update("variant", v)}
        options={[
          { value: "full", label: "Full (brand, contact, social, disclaimer)" },
          { value: "minimal", label: "Minimal (copyright + disclaimer only)" },
        ]}
      />
      <FormInput
        label="Contact email"
        value={config.contactEmail}
        onChange={(v) => update("contactEmail", v)}
        placeholder="visa@edunigo.com"
      />
      <FormInput
        label="WhatsApp link (optional)"
        value={config.whatsAppLink}
        onChange={(v) => update("whatsAppLink", v)}
        placeholder="https://wa.me/..."
      />
      <FormCheckbox
        label="Show social media links"
        checked={config.showSocialMedia}
        onChange={(v) => update("showSocialMedia", v)}
      />
      <FormCheckbox
        label="Show legal disclaimer"
        checked={config.showLegalDisclaimer}
        onChange={(v) => update("showLegalDisclaimer", v)}
      />
    </>
  );
};

export default ImmigrationFooterEditor;
