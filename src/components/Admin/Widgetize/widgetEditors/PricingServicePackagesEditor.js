import React from "react";
import { FormField, FormSelect, ListEditor } from "./WidgetEditorFormFields";
import styles from "../VisaPageBuilder.module.css";

const PricingServicePackagesEditor = ({ config = {}, onChange }) => {
  const update = (key, value) => onChange({ ...config, [key]: value });
  const plans = config.plans ?? [];

  return (
    <>
      <FormSelect
        label="Featured plan (highlighted)"
        value={config.featuredPlanId}
        onChange={(v) => update("featuredPlanId", v)}
        options={[
          ...plans.map((p) => ({ value: p.id, label: p.name })),
          ...(plans.length === 0 ? [{ value: "", label: "(Add plans below first)" }] : []),
        ]}
      />
      <FormField label="Plans">
        <ListEditor
          items={plans}
          onChange={(v) => update("plans", v)}
          addLabel="Add plan"
          getNewItem={() => ({ id: `plan_${Date.now()}`, name: "", description: "", price: "" })}
          renderItem={(plan, index, updateItem) => (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <input
                type="text"
                className={styles.formInput}
                placeholder="Plan ID (e.g. basic, standard)"
                value={plan.id ?? ""}
                onChange={(e) => updateItem(index, { ...plan, id: e.target.value })}
              />
              <input
                type="text"
                className={styles.formInput}
                placeholder="Plan name"
                value={plan.name ?? ""}
                onChange={(e) => updateItem(index, { ...plan, name: e.target.value })}
              />
              <input
                type="text"
                className={styles.formInput}
                placeholder="Description"
                value={plan.description ?? ""}
                onChange={(e) => updateItem(index, { ...plan, description: e.target.value })}
              />
              <input
                type="text"
                className={styles.formInput}
                placeholder="Price (e.g. From $99)"
                value={plan.price ?? ""}
                onChange={(e) => updateItem(index, { ...plan, price: e.target.value })}
              />
            </div>
          )}
        />
      </FormField>
    </>
  );
};

export default PricingServicePackagesEditor;
