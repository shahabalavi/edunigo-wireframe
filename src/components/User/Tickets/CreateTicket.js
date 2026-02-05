import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Send, Paperclip } from "lucide-react";
import styles from "./UserTicketForm.module.css";

const TOPICS = [
  {
    id: "applications",
    title: "Applications",
    children: [
      {
        id: "application-status",
        title: "Application Status",
        children: [
          { id: "review-timeline", title: "Review Timeline" },
          { id: "decision-update", title: "Decision Update" },
        ],
      },
      {
        id: "document-uploads",
        title: "Document Uploads",
        children: [
          { id: "file-errors", title: "File Errors" },
          { id: "missing-docs", title: "Missing Documents" },
        ],
      },
    ],
  },
  {
    id: "payments",
    title: "Payments",
    children: [
      { id: "invoice", title: "Invoice & Billing" },
      { id: "refund", title: "Refund Request" },
    ],
  },
  {
    id: "enrollment",
    title: "Enrollment",
    children: [
      { id: "course-enroll", title: "Course Enrollment" },
      { id: "schedule", title: "Schedule Changes" },
    ],
  },
  {
    id: "profile",
    title: "Profile & Account",
    children: [
      { id: "profile-update", title: "Profile Updates" },
      { id: "account-access", title: "Account Access" },
    ],
  },
];

const TARGETS = [
  "Computer Science - Fall 2026",
  "MBA Admission Review",
  "Fee Payment Portal",
  "Enrollment Services",
  "Student Profile",
];

const CreateUserTicket = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    subject: "",
    topic: "",
    target: "",
    description: "",
  });
  const [topicLevel1, setTopicLevel1] = useState("");
  const [topicLevel2, setTopicLevel2] = useState("");
  const [topicLevel3, setTopicLevel3] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const topics = TOPICS;
  const targets = TARGETS;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    const presetRaw = params.get("topic");
    if (!presetRaw) return;

    const preset = presetRaw.toLowerCase();
    if (preset === "general") {
      setTopicLevel1("");
      setTopicLevel2("");
      setTopicLevel3("");
      setFormData((prev) => ({ ...prev, topic: "" }));
      return;
    }

    const matchLevel1 = topics.find(
      (topic) =>
        topic.id.toLowerCase() === preset ||
        topic.title.toLowerCase() === preset
    );
    if (matchLevel1) {
      setTopicLevel1(matchLevel1.id);
      setTopicLevel2("");
      setTopicLevel3("");
      setFormData((prev) => ({ ...prev, topic: matchLevel1.id }));
      return;
    }

    let matchLevel2 = null;
    let matchLevel2Parent = null;
    topics.forEach((topic) => {
      topic.children?.forEach((child) => {
        if (
          child.id.toLowerCase() === preset ||
          child.title.toLowerCase() === preset
        ) {
          matchLevel2 = child;
          matchLevel2Parent = topic;
        }
      });
    });
    if (matchLevel2 && matchLevel2Parent) {
      setTopicLevel1(matchLevel2Parent.id);
      setTopicLevel2(matchLevel2.id);
      setTopicLevel3("");
      setFormData((prev) => ({ ...prev, topic: matchLevel2.id }));
      return;
    }

    let matchLevel3 = null;
    let matchLevel3Parent = null;
    let matchLevel3Root = null;
    topics.forEach((topic) => {
      topic.children?.forEach((child) => {
        child.children?.forEach((grandchild) => {
          if (
            grandchild.id.toLowerCase() === preset ||
            grandchild.title.toLowerCase() === preset
          ) {
            matchLevel3 = grandchild;
            matchLevel3Parent = child;
            matchLevel3Root = topic;
          }
        });
      });
    });
    if (matchLevel3 && matchLevel3Parent && matchLevel3Root) {
      setTopicLevel1(matchLevel3Root.id);
      setTopicLevel2(matchLevel3Parent.id);
      setTopicLevel3(matchLevel3.id);
      setFormData((prev) => ({ ...prev, topic: matchLevel3.id }));
    }
  }, [location.search]);

  const handleTopicLevel1Change = (value) => {
    setTopicLevel1(value);
    setTopicLevel2("");
    setTopicLevel3("");
    setFormData((prev) => ({ ...prev, topic: value }));
  };

  const handleTopicLevel2Change = (value) => {
    setTopicLevel2(value);
    setTopicLevel3("");
    setFormData((prev) => ({ ...prev, topic: value }));
  };

  const handleTopicLevel3Change = (value) => {
    setTopicLevel3(value);
    setFormData((prev) => ({ ...prev, topic: value }));
  };

  const selectedLevel1 = topics.find((topic) => topic.id === topicLevel1);
  const level2Options = selectedLevel1?.children || [];
  const selectedLevel2 = level2Options.find(
    (topic) => topic.id === topicLevel2
  );
  const level3Options = selectedLevel2?.children || [];

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setAttachments((prev) => [...prev, ...files]);
  };

  const removeAttachment = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.subject.trim() || !formData.description.trim()) return;

    setSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      navigate("/user/tickets");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles["form-container"]}>
      <div className={styles["page-header"]}>
        <div className={styles["header-left"]}>
          <button
            className={styles["back-btn"]}
            onClick={() => navigate("/user/tickets")}
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1>Create Ticket</h1>
            <p>Submit a request to your assigned support admin</p>
          </div>
        </div>
      </div>

      <div className={styles["form-section"]}>
        <form onSubmit={handleSubmit} className={styles["ticket-form"]}>
          <div className={styles["form-group"]}>
            <label className={styles["form-label"]}>Title *</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              className={styles["form-input"]}
              placeholder="Short summary of your request"
              required
            />
          </div>

          <div className={styles["form-group"]}>
            <label className={styles["form-label"]}>
              Topic <span className={styles["optional"]}>(Optional)</span>
            </label>
            <div className={styles["topic-stack"]}>
              <select
                value={topicLevel1}
                onChange={(e) => handleTopicLevel1Change(e.target.value)}
                className={styles["form-select"]}
              >
                <option value="">Select category</option>
                {topics.map((topic) => (
                  <option key={topic.id} value={topic.id}>
                    {topic.title}
                  </option>
                ))}
              </select>
              {level2Options.length > 0 && (
                <select
                  value={topicLevel2}
                  onChange={(e) => handleTopicLevel2Change(e.target.value)}
                  className={styles["form-select"]}
                  disabled={!topicLevel1}
                >
                  <option value="">Select subcategory</option>
                  {level2Options.map((topic) => (
                    <option key={topic.id} value={topic.id}>
                      {topic.title}
                    </option>
                  ))}
                </select>
              )}
              {level3Options.length > 0 && (
                <select
                  value={topicLevel3}
                  onChange={(e) => handleTopicLevel3Change(e.target.value)}
                  className={styles["form-select"]}
                  disabled={!topicLevel2}
                >
                  <option value="">Select detail</option>
                  {level3Options.map((topic) => (
                    <option key={topic.id} value={topic.id}>
                      {topic.title}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <p className={styles["field-hint"]}>
              Select a topic level if it applies. You can submit without a
              topic.
            </p>
          </div>

          <div className={styles["form-row"]}>
            <div className={styles["form-group"]}>
              <label className={styles["form-label"]}>Target</label>
              <select
                name="target"
                value={formData.target}
                onChange={handleInputChange}
                className={styles["form-select"]}
              >
                <option value="">Select target</option>
                {targets.map((target) => (
                  <option key={target} value={target}>
                    {target}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles["form-group"]}>
            <label className={styles["form-label"]}>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className={styles["form-textarea"]}
              rows={5}
              placeholder="Provide details, links, or steps to reproduce"
              required
            />
          </div>

          {attachments.length > 0 && (
            <div className={styles["attachments-preview"]}>
              <h4>Attachments</h4>
              {attachments.map((file, index) => (
                <div key={index} className={styles["attachment-item"]}>
                  <Paperclip size={14} />
                  <span>{file.name}</span>
                  <button
                    type="button"
                    onClick={() => removeAttachment(index)}
                    className={styles["remove-attachment"]}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className={styles["form-actions"]}>
            <input
              type="file"
              id="file-upload"
              multiple
              onChange={handleFileUpload}
              className={styles["file-input"]}
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
            />
            <label htmlFor="file-upload" className={styles["file-upload-btn"]}>
              <Paperclip size={16} />
              Attach Files
            </label>
            <button
              type="submit"
              className={styles["submit-btn"]}
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit Ticket"}
              <Send size={16} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUserTicket;
