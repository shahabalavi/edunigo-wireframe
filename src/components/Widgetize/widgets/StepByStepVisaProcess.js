import React from "react";
import styles from "./StepByStepVisaProcess.module.css";

const DEFAULT_STEPS = [
  "Choose country & program",
  "Apply to university",
  "Receive acceptance letter",
  "Prepare documents",
  "Submit visa application",
  "Get approval & travel",
];

const StepByStepVisaProcess = ({ config = {}, isRtl = false }) => {
  const { orientation = "horizontal", steps = DEFAULT_STEPS } = config;
  const isVertical = orientation === "vertical";

  return (
    <section className={`${styles.section} ${isRtl ? styles.rtl : ""}`}>
      <div className={styles.container}>
        <h2 className={styles.title}>Step-by-Step Visa Process</h2>
        <p className={styles.subtitle}>Your journey from application to approval</p>
        <div className={isVertical ? styles.vertical : styles.horizontal}>
          {steps.map((label, i) => (
            <div key={i} className={styles.step}>
              <div className={styles.number}>{i + 1}</div>
              <span className={styles.label}>{label}</span>
              {!isVertical && i < steps.length - 1 && <div className={styles.connector} />}
            </div>
          ))}
        </div>
        {isVertical && (
          <div className={styles.verticalConnector} aria-hidden="true" />
        )}
      </div>
    </section>
  );
};

export default StepByStepVisaProcess;
