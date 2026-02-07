import React from "react";
import { FormField, FormSelect, ListEditor } from "./WidgetEditorFormFields";
import styles from "../VisaPageBuilder.module.css";

const SuccessStoriesTestimonialsEditor = ({ config = {}, onChange }) => {
  const update = (key, value) => onChange({ ...config, [key]: value });
  const testimonials = config.testimonials ?? [];

  return (
    <>
      <FormSelect
        label="Layout"
        value={config.layout}
        onChange={(v) => update("layout", v)}
        options={[
          { value: "slider", label: "Slider" },
          { value: "grid", label: "Grid" },
        ]}
      />
      <FormField label="Testimonials (student name, quote, photo)">
        <ListEditor
          items={testimonials}
          onChange={(v) => update("testimonials", v)}
          addLabel="Add testimonial"
          getNewItem={() => ({ quote: "", author: "Student", photo: "" })}
          renderItem={(t, index, updateItem) => (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <input
                type="text"
                className={styles.formInput}
                placeholder="Student name"
                value={t.author ?? ""}
                onChange={(e) => updateItem(index, { ...t, author: e.target.value })}
              />
              <textarea
                className={styles.formTextarea}
                placeholder="Quote (e.g. I got my visa in 6 weeks!)"
                value={t.quote ?? ""}
                onChange={(e) => updateItem(index, { ...t, quote: e.target.value })}
                rows={2}
              />
              <input
                type="text"
                className={styles.formInput}
                placeholder="Photo URL (optional)"
                value={t.photo ?? ""}
                onChange={(e) => updateItem(index, { ...t, photo: e.target.value })}
              />
            </div>
          )}
        />
      </FormField>
    </>
  );
};

export default SuccessStoriesTestimonialsEditor;
