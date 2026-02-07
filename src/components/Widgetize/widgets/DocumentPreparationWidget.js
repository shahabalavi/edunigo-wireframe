import React, { useState } from "react";
import { ChevronDown, ChevronUp, FileText } from "lucide-react";
import styles from "./DocumentPreparationWidget.module.css";

const DEFAULT_DOCS = [
  { name: "SOP (Statement of Purpose)", hasAttachment: false },
  { name: "Bank statements", hasAttachment: false },
  { name: "Sponsor letter", hasAttachment: false },
  { name: "Travel insurance", hasAttachment: false },
];

const DocumentPreparationWidget = ({ config = {}, isRtl = false }) => {
  const { expandable = true, documents = DEFAULT_DOCS } = config;
  const [expanded, setExpanded] = useState(!expandable);

  return (
    <section className={`${styles.section} ${isRtl ? styles.rtl : ""}`}>
      <div className={styles.container}>
        <h2 className={styles.title}>Document Preparation</h2>
        <p className={styles.subtitle}>Key documents you need for your visa application</p>
        <div className={styles.list}>
          {documents.map((doc, i) => (
            <div
              key={i}
              className={`${styles.item} ${expandable && expanded ? styles.open : ""}`}
            >
              <div className={styles.itemHeader}>
                <FileText className={styles.icon} size={20} />
                <span className={styles.name}>{doc.name}</span>
                {doc.hasAttachment && <span className={styles.badge}>PDF</span>}
                {expandable && (
                  <button
                    type="button"
                    className={styles.toggle}
                    onClick={() => setExpanded((e) => !e)}
                    aria-expanded={expanded}
                  >
                    {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                )}
              </div>
              {expandable && expanded && (
                <div className={styles.detail}>
                  Prepare this document according to your destination country requirements.
                  {doc.hasAttachment && " Download our template below."}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DocumentPreparationWidget;
