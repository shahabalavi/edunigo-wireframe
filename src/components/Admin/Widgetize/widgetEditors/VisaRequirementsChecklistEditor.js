import React from "react";
import { FormField, FormSelect, ListEditor } from "./WidgetEditorFormFields";
import styles from "../PageBuilder.module.css";

const VisaRequirementsChecklistEditor = ({ config = {}, onChange }) => {
  const update = (key, value) => onChange({ ...config, [key]: value });
  const items = config.items ?? [];

  return (
    <>
      <FormSelect
        label="Display style"
        value={config.style}
        onChange={(v) => update("style", v)}
        options={[
          { value: "list", label: "List" },
          { value: "cards", label: "Cards" },
        ]}
      />
      <FormField label="Checklist items">
        <ListEditor
          items={items}
          onChange={(v) => update("items", v)}
          addLabel="Add item"
          getNewItem={() => ""}
          renderItem={(item, index, updateItem) => (
            <input
              type="text"
              className={styles.formInput}
              placeholder="e.g. Acceptance letter from university"
              value={typeof item === "string" ? item : ""}
              onChange={(e) => updateItem(index, e.target.value)}
            />
          )}
        />
      </FormField>
    </>
  );
};

export default VisaRequirementsChecklistEditor;
