import React from "react";
import { Check } from "lucide-react";
import styles from "./VisaRequirementsChecklist.module.css";

const DEFAULT_ITEMS = [
  "Acceptance letter from university",
  "Proof of funds",
  "Language certificate (IELTS/TOEFL)",
  "Passport validity",
  "Motivation letter",
];

const VisaRequirementsChecklist = ({ config = {}, isRtl = false }) => {
  const { style = "list", items = DEFAULT_ITEMS } = config;

  return (
    <section className={`${styles.section} ${isRtl ? styles.rtl : ""}`}>
      <div className={styles.container}>
        <h2 className={styles.title}>Visa Requirements Checklist</h2>
        <p className={styles.subtitle}>What you need to prepare for your student visa</p>
        {style === "cards" ? (
          <div className={styles.cards}>
            {items.map((item, i) => (
              <div key={i} className={styles.card}>
                <Check className={styles.check} size={20} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        ) : (
          <ul className={styles.list}>
            {items.map((item, i) => (
              <li key={i} className={styles.listItem}>
                <Check className={styles.check} size={20} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default VisaRequirementsChecklist;
