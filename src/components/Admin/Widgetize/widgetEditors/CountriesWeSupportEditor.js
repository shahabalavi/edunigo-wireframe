import React from "react";
import { FormField, FormInput, FormSelect, ListEditor } from "./WidgetEditorFormFields";
import styles from "../VisaPageBuilder.module.css";

const COUNTRY_PRESETS = [
  { code: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "DE", name: "Germany", flag: "🇩🇪" },
  { code: "GB", name: "UK", flag: "🇬🇧" },
  { code: "AU", name: "Australia", flag: "🇦🇺" },
  { code: "US", name: "USA", flag: "🇺🇸" },
  { code: "FR", name: "France", flag: "🇫🇷" },
  { code: "NL", name: "Netherlands", flag: "🇳🇱" },
  { code: "NZ", name: "New Zealand", flag: "🇳🇿" },
];

const CountriesWeSupportEditor = ({ config = {}, onChange }) => {
  const update = (key, value) => onChange({ ...config, [key]: value });
  const countries = config.countries ?? COUNTRY_PRESETS;

  return (
    <>
      <FormSelect
        label="Layout"
        value={config.layout}
        onChange={(v) => update("layout", v)}
        options={[
          { value: "grid", label: "Grid" },
          { value: "carousel", label: "Carousel" },
        ]}
      />
      <FormSelect
        label="Card style"
        value={config.cardStyle}
        onChange={(v) => update("cardStyle", v)}
        options={[
          { value: "default", label: "Default" },
        ]}
      />
      <FormInput
        label="Country detail link (base path)"
        value={config.countryDetailLink}
        onChange={(v) => update("countryDetailLink", v)}
        placeholder="/visa/"
        hint="Clicking a country goes to {base}/{countryCode}"
      />
      <FormField label="Countries">
        <ListEditor
          items={countries}
          onChange={(v) => update("countries", v)}
          addLabel="Add country"
          getNewItem={() => ({ code: "", name: "", flag: "🏳️" })}
          renderItem={(country, index, updateItem) => (
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
              <input
                type="text"
                className={styles.formInput}
                placeholder="Code (e.g. CA)"
                value={country.code ?? ""}
                onChange={(e) => updateItem(index, { ...country, code: e.target.value })}
                style={{ width: "4rem" }}
              />
              <input
                type="text"
                className={styles.formInput}
                placeholder="Name"
                value={country.name ?? ""}
                onChange={(e) => updateItem(index, { ...country, name: e.target.value })}
                style={{ flex: 1, minWidth: "100px" }}
              />
              <input
                type="text"
                className={styles.formInput}
                placeholder="Flag emoji"
                value={country.flag ?? ""}
                onChange={(e) => updateItem(index, { ...country, flag: e.target.value })}
                style={{ width: "3rem" }}
              />
            </div>
          )}
        />
      </FormField>
    </>
  );
};

export default CountriesWeSupportEditor;
