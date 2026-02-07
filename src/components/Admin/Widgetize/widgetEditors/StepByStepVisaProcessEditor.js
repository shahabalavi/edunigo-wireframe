import React from "react";
import { FormField, FormSelect, ListEditor } from "./WidgetEditorFormFields";
import styles from "../VisaPageBuilder.module.css";

const StepByStepVisaProcessEditor = ({ config = {}, onChange }) => {
  const update = (key, value) => onChange({ ...config, [key]: value });
  const steps = config.steps ?? [];

  return (
    <>
      <FormSelect
        label="Orientation"
        value={config.orientation}
        onChange={(v) => update("orientation", v)}
        options={[
          { value: "horizontal", label: "Horizontal" },
          { value: "vertical", label: "Vertical" },
        ]}
      />
      <FormField label="Steps (in order)">
        <ListEditor
          items={steps}
          onChange={(v) => update("steps", v)}
          addLabel="Add step"
          getNewItem={() => ""}
          renderItem={(step, index, updateItem) => (
            <input
              type="text"
              className={styles.formInput}
              placeholder="e.g. Choose country & program"
              value={typeof step === "string" ? step : ""}
              onChange={(e) => updateItem(index, e.target.value)}
            />
          )}
        />
      </FormField>
    </>
  );
};

export default StepByStepVisaProcessEditor;
