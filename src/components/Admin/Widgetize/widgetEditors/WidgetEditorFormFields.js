import React from "react";
import { Plus, Trash2 } from "lucide-react";
import styles from "../VisaPageBuilder.module.css";

export function FormField({ label, children, hint }) {
  return (
    <div className={styles.formField}>
      {label && <label className={styles.formLabel}>{label}</label>}
      {children}
      {hint && <span className={styles.formHint}>{hint}</span>}
    </div>
  );
}

export function FormInput({ label, value, onChange, placeholder, type = "text", hint }) {
  return (
    <FormField label={label} hint={hint}>
      <input
        type={type}
        className={styles.formInput}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </FormField>
  );
}

export function FormSelect({ label, value, onChange, options, hint }) {
  return (
    <FormField label={label} hint={hint}>
      <select
        className={styles.formSelect}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((opt) => (
          <option key={typeof opt === "object" ? opt.value : opt} value={typeof opt === "object" ? opt.value : opt}>
            {typeof opt === "object" ? opt.label : opt}
          </option>
        ))}
      </select>
    </FormField>
  );
}

export function FormTextarea({ label, value, onChange, placeholder, rows = 3, hint }) {
  return (
    <FormField label={label} hint={hint}>
      <textarea
        className={styles.formTextarea}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
      />
    </FormField>
  );
}

export function FormCheckbox({ label, checked, onChange }) {
  return (
    <div className={styles.formField}>
      <label className={styles.formCheckboxLabel}>
        <input
          type="checkbox"
          checked={!!checked}
          onChange={(e) => onChange(e.target.checked)}
          className={styles.formCheckbox}
        />
        {label}
      </label>
    </div>
  );
}

export function ListEditor({ items, onChange, renderItem, addLabel = "Add item", getNewItem }) {
  const add = () => onChange([...(items || []), getNewItem()]);
  const remove = (index) => onChange(items.filter((_, i) => i !== index));
  const update = (index, value) =>
    onChange(items.map((item, i) => (i === index ? value : item)));

  return (
    <div className={styles.listEditor}>
      {(items || []).map((item, index) => (
        <div key={index} className={styles.listEditorItem}>
          {renderItem(item, index, update)}
          <button
            type="button"
            className={styles.removeItemBtn}
            onClick={() => remove(index)}
            title="Remove"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ))}
      <button type="button" className={styles.addItemBtn} onClick={add}>
        <Plus size={16} />
        {addLabel}
      </button>
    </div>
  );
}
