import React from "react";
import { FormInput, FormField, ListEditor } from "./WidgetEditorFormFields";
import styles from "../PageBuilder.module.css";

const UniversityProgramFinderEditor = ({ config = {}, onChange }) => {
  const update = (key, value) => onChange({ ...config, [key]: value });
  const filterOptions = config.filterOptions ?? ["country", "degree", "intake"];
  const featured = config.featuredUniversities ?? [];

  const toggleFilter = (name) => {
    const current = filterOptions || [];
    const next = current.includes(name)
      ? current.filter((f) => f !== name)
      : [...current, name];
    update("filterOptions", next);
  };

  return (
    <>
      <FormInput
        label="Search placeholder text"
        value={config.placeholder}
        onChange={(v) => update("placeholder", v)}
        placeholder="Find programs in Canada"
      />
      <FormField label="Filter options (check to show)">
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {["country", "degree", "intake", "university"].map((name) => (
            <label key={name} style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.9rem" }}>
              <input
                type="checkbox"
                checked={(filterOptions || []).includes(name)}
                onChange={() => toggleFilter(name)}
              />
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </label>
          ))}
        </div>
      </FormField>
      <FormField label="Featured universities (names only for now)">
        <ListEditor
          items={featured}
          onChange={(v) => update("featuredUniversities", v)}
          addLabel="Add university"
          getNewItem={() => ({ name: "" })}
          renderItem={(u, index, updateItem) => (
            <input
              type="text"
              className={styles.formInput}
              placeholder="University name"
              value={u.name ?? ""}
              onChange={(e) => updateItem(index, { ...u, name: e.target.value })}
            />
          )}
        />
      </FormField>
    </>
  );
};

export default UniversityProgramFinderEditor;
