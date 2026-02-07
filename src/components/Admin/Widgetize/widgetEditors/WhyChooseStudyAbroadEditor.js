import React from "react";
import { FormField, FormSelect, ListEditor } from "./WidgetEditorFormFields";
import styles from "../VisaPageBuilder.module.css";

const ICON_OPTIONS = [
  { value: "graduation", label: "Graduation" },
  { value: "briefcase", label: "Briefcase" },
  { value: "home", label: "Home" },
  { value: "award", label: "Award" },
];

const WhyChooseStudyAbroadEditor = ({ config = {}, onChange }) => {
  const update = (key, value) => onChange({ ...config, [key]: value });
  const cards = config.cards ?? [];

  return (
    <>
      <FormSelect
        label="Number of columns (desktop)"
        value={String(config.columns ?? 4)}
        onChange={(v) => update("columns", parseInt(v, 10) || 4)}
        options={["2", "3", "4"]}
      />
      <FormField label="Cards">
        <ListEditor
          items={cards}
          onChange={(v) => update("cards", v)}
          addLabel="Add card"
          getNewItem={() => ({ title: "", icon: "graduation", image: "" })}
          renderItem={(card, index, updateItem) => (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <input
                type="text"
                className={styles.formInput}
                placeholder="Card title"
                value={card.title ?? ""}
                onChange={(e) => updateItem(index, { ...card, title: e.target.value })}
              />
              <select
                className={styles.formSelect}
                value={card.icon ?? "graduation"}
                onChange={(e) => updateItem(index, { ...card, icon: e.target.value })}
              >
                {ICON_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <input
                type="text"
                className={styles.formInput}
                placeholder="Image URL (optional)"
                value={card.image ?? ""}
                onChange={(e) => updateItem(index, { ...card, image: e.target.value })}
              />
            </div>
          )}
        />
      </FormField>
    </>
  );
};

export default WhyChooseStudyAbroadEditor;
