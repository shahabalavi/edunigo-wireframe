import React from "react";
import { FormField, FormCheckbox, ListEditor } from "./WidgetEditorFormFields";
import styles from "../PageBuilder.module.css";

const DocumentPreparationEditor = ({ config = {}, onChange }) => {
  const update = (key, value) => onChange({ ...config, [key]: value });
  const documents = config.documents ?? [];

  return (
    <>
      <FormCheckbox
        label="Expandable (show expand/collapse per document)"
        checked={config.expandable}
        onChange={(v) => update("expandable", v)}
      />
      <FormField label="Documents">
        <ListEditor
          items={documents}
          onChange={(v) => update("documents", v)}
          addLabel="Add document"
          getNewItem={() => ({ name: "", hasAttachment: false })}
          renderItem={(doc, index, updateItem) => (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <input
                type="text"
                className={styles.formInput}
                placeholder="Document name (e.g. SOP, Bank statements)"
                value={doc.name ?? ""}
                onChange={(e) => updateItem(index, { ...doc, name: e.target.value })}
              />
              <label className={styles.formCheckboxLabel}>
                <input
                  type="checkbox"
                  className={styles.formCheckbox}
                  checked={!!doc.hasAttachment}
                  onChange={(e) => updateItem(index, { ...doc, hasAttachment: e.target.checked })}
                />
                Has attachment / template
              </label>
            </div>
          )}
        />
      </FormField>
    </>
  );
};

export default DocumentPreparationEditor;
