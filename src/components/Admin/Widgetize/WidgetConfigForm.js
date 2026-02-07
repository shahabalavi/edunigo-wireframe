import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { getWidgetDefinition, getDefaultConfig } from "../../../config/visaWidgets";
import { getWidgetEditor } from "./widgetEditors";
import styles from "./VisaPageBuilder.module.css";

const WidgetConfigForm = ({ widget, onSave, onClose }) => {
  const def = getWidgetDefinition(widget?.type);
  const EditorComponent = getWidgetEditor(widget?.type);
  const defaultConfig = getDefaultConfig(widget?.type) || {};
  const [config, setConfig] = useState({ ...defaultConfig, ...(widget?.config || {}) });

  useEffect(() => {
    setConfig({ ...defaultConfig, ...(widget?.config || {}) });
  }, [widget?.id, widget?.type]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(config);
  };

  if (!EditorComponent) {
    return (
      <div className={styles.modalOverlay} onClick={onClose}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <div className={styles.modalHeader}>
            <h3>Edit: {def?.label ?? widget?.type}</h3>
            <button type="button" className={styles.closeBtn} onClick={onClose}>
              <X size={20} />
            </button>
          </div>
          <div className={styles.modalBody}>
            <p>No form editor available for this widget type.</p>
          </div>
          <div className={styles.modalFooter}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3>Edit: {def?.label ?? widget?.type}</h3>
          <button type="button" className={styles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.modalBodyScroll}>
            <EditorComponent config={config} onChange={setConfig} />
          </div>
          <div className={styles.modalFooter}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={styles.saveBtn}>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WidgetConfigForm;
