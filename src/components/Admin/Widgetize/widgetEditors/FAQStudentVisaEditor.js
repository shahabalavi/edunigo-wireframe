import React from "react";
import { FormField, FormCheckbox, ListEditor } from "./WidgetEditorFormFields";
import styles from "../VisaPageBuilder.module.css";

const FAQStudentVisaEditor = ({ config = {}, onChange }) => {
  const update = (key, value) => onChange({ ...config, [key]: value });
  const faqs = config.faqs ?? [];

  return (
    <>
      <FormCheckbox
        label="Accordion style (one open at a time)"
        checked={config.accordionStyle}
        onChange={(v) => update("accordionStyle", v)}
      />
      <FormCheckbox
        label="Group by country"
        checked={config.categoriesByCountry}
        onChange={(v) => update("categoriesByCountry", v)}
      />
      <FormField label="Questions & answers">
        <ListEditor
          items={faqs}
          onChange={(v) => update("faqs", v)}
          addLabel="Add FAQ"
          getNewItem={() => ({ q: "", a: "" })}
          renderItem={(faq, index, updateItem) => (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <input
                type="text"
                className={styles.formInput}
                placeholder="Question"
                value={faq.q ?? ""}
                onChange={(e) => updateItem(index, { ...faq, q: e.target.value })}
              />
              <textarea
                className={styles.formTextarea}
                placeholder="Answer"
                value={faq.a ?? ""}
                onChange={(e) => updateItem(index, { ...faq, a: e.target.value })}
                rows={2}
              />
            </div>
          )}
        />
      </FormField>
    </>
  );
};

export default FAQStudentVisaEditor;
