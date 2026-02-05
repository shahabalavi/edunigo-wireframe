import React, { useState } from "react";
import { X, AlertCircle } from "lucide-react";
import styles from "./TransitionModal.module.css";

const CreateTransitionModal = ({ onClose, onCreate, statuses, events }) => {
  const [formData, setFormData] = useState({
    type: "time",
    source_status: "",
    target_status: "",
    days: 3,
    trigger_event: "",
    is_active: true,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "days" ? Number(value) : name === "is_active"
          ? e.target.checked
          : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.target_status) {
      newErrors.target_status = "Target status is required";
    }

    if (formData.type === "time") {
      if (!formData.source_status) {
        newErrors.source_status = "Source status is required";
      }
      if (!formData.days || formData.days < 1) {
        newErrors.days = "Number of days must be 1 or higher";
      }
    }

    if (formData.type === "event" && !formData.trigger_event) {
      newErrors.trigger_event = "Trigger event is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      onCreate({
        ...formData,
      });
    } catch (error) {
      console.error("Error creating transition:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles["modal-overlay"]} onClick={handleBackdropClick}>
      <div className={styles["modal-container"]}>
        <div className={styles["modal-header"]}>
          <h3 className={styles["modal-title"]}>Create Transition</h3>
          <button className={styles["close-btn"]} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles["modal-form"]}>
          <div className={styles["form-group"]}>
            <label className={styles["form-label"]}>
              Transition Type <span className={styles["required"]}>*</span>
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className={styles["form-select"]}
            >
              <option value="time">Time-Based</option>
              <option value="event">Event-Based</option>
            </select>
          </div>

          {formData.type === "time" ? (
            <>
              <div className={styles["form-row"]}>
                <div className={styles["form-group"]}>
                  <label className={styles["form-label"]}>
                    Source Status <span className={styles["required"]}>*</span>
                  </label>
                  <select
                    name="source_status"
                    value={formData.source_status}
                    onChange={handleInputChange}
                    className={`${styles["form-select"]} ${
                      errors.source_status ? styles["error"] : ""
                    }`}
                  >
                    <option value="">Select status</option>
                    {statuses.map((status) => (
                      <option key={status.id} value={status.name}>
                        {status.title}
                      </option>
                    ))}
                  </select>
                  {errors.source_status && (
                    <div className={styles["error-message"]}>
                      <AlertCircle size={16} />
                      {errors.source_status}
                    </div>
                  )}
                </div>

                <div className={styles["form-group"]}>
                  <label className={styles["form-label"]}>
                    Target Status <span className={styles["required"]}>*</span>
                  </label>
                  <select
                    name="target_status"
                    value={formData.target_status}
                    onChange={handleInputChange}
                    className={`${styles["form-select"]} ${
                      errors.target_status ? styles["error"] : ""
                    }`}
                  >
                    <option value="">Select status</option>
                    {statuses.map((status) => (
                      <option key={status.id} value={status.name}>
                        {status.title}
                      </option>
                    ))}
                  </select>
                  {errors.target_status && (
                    <div className={styles["error-message"]}>
                      <AlertCircle size={16} />
                      {errors.target_status}
                    </div>
                  )}
                </div>
              </div>

              <div className={styles["form-group"]}>
                <label className={styles["form-label"]}>
                  Number of Days <span className={styles["required"]}>*</span>
                </label>
                <input
                  type="number"
                  name="days"
                  min="1"
                  value={formData.days}
                  onChange={handleInputChange}
                  className={`${styles["form-input"]} ${
                    errors.days ? styles["error"] : ""
                  }`}
                />
                {errors.days && (
                  <div className={styles["error-message"]}>
                    <AlertCircle size={16} />
                    {errors.days}
                  </div>
                )}
                <div className={styles["field-hint"]}>
                  Transition occurs after this many days in the source status.
                </div>
              </div>
            </>
          ) : (
            <>
              <div className={styles["form-group"]}>
                <label className={styles["form-label"]}>
                  Trigger Event <span className={styles["required"]}>*</span>
                </label>
                <select
                  name="trigger_event"
                  value={formData.trigger_event}
                  onChange={handleInputChange}
                  className={`${styles["form-select"]} ${
                    errors.trigger_event ? styles["error"] : ""
                  }`}
                >
                  <option value="">Select event</option>
                  {events.map((event) => (
                    <option key={event.id} value={event.id}>
                      {event.name}
                    </option>
                  ))}
                </select>
                {errors.trigger_event && (
                  <div className={styles["error-message"]}>
                    <AlertCircle size={16} />
                    {errors.trigger_event}
                  </div>
                )}
              </div>

              <div className={styles["form-group"]}>
                <label className={styles["form-label"]}>
                  Target Status <span className={styles["required"]}>*</span>
                </label>
                <select
                  name="target_status"
                  value={formData.target_status}
                  onChange={handleInputChange}
                  className={`${styles["form-select"]} ${
                    errors.target_status ? styles["error"] : ""
                  }`}
                >
                  <option value="">Select status</option>
                  {statuses.map((status) => (
                    <option key={status.id} value={status.name}>
                      {status.title}
                    </option>
                  ))}
                </select>
                {errors.target_status && (
                  <div className={styles["error-message"]}>
                    <AlertCircle size={16} />
                    {errors.target_status}
                  </div>
                )}
              </div>
            </>
          )}

          <div className={styles["form-group"]}>
            <label className={styles["toggle-row"]}>
              <input
                type="checkbox"
                name="is_active"
                checked={formData.is_active}
                onChange={handleInputChange}
              />
              <span className={styles["toggle-label"]}>
                Active rule
              </span>
            </label>
          </div>

          <div className={styles["modal-actions"]}>
            <button
              type="button"
              className={styles["cancel-btn"]}
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles["submit-btn"]}
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className={styles["loading-spinner"]}></div>
                  Creating...
                </>
              ) : (
                "Create Transition"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTransitionModal;
