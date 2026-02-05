import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  Upload,
  X,
  CheckCircle,
} from "lucide-react";
import styles from "./GuidanceEditor.module.css";

const GuidanceEditor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [attachments, setAttachments] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    content: "",
    categoryId: "",
    status: "Draft",
    layout: "Card",
    ctaText: "Get Help",
    ctaUrl: "",
    keywords: "",
    tags: "",
  });

  const categories = [
    { id: 1, title: "Documents" },
    { id: 2, title: "Payments" },
    { id: 3, title: "Visa" },
    { id: 4, title: "General" },
  ];

  useEffect(() => {
    if (!id) return;
    const sampleArticle = {
      title: "Upload documents correctly",
      summary: "Step-by-step guidance to avoid common document upload errors.",
      content:
        "## Before you upload\n- Scan in color\n- Save as PDF\n- Keep file size under 5MB\n\n## Common issues\n- Missing signatures\n- Illegible scans",
      categoryId: "1",
      status: "Published",
      layout: "Card",
      ctaText: "Get Help",
      ctaUrl: "https://edunigo.com/support",
      keywords: "documents, upload, pdf",
      tags: "documents, onboarding",
    };

    setFormData(sampleArticle);
    setAttachments([
      { name: "document-checklist.pdf", size: 248000 },
      { name: "file-size-guide.png", size: 84000 },
    ]);
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAttachmentChange = (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;
    setAttachments((prev) => [
      ...prev,
      ...files.map((file) => ({ name: file.name, size: file.size })),
    ]);
    event.target.value = "";
  };

  const removeAttachment = (name) => {
    setAttachments((prev) => prev.filter((file) => file.name !== name));
  };

  const handleSave = () => {
    console.log("Saving guidance item", formData, attachments);
    navigate("/admin/guidance/articles");
  };

  const tags = formData.tags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  const formatSize = (size) => {
    if (size > 1024 * 1024) return `${(size / (1024 * 1024)).toFixed(1)} MB`;
    return `${Math.round(size / 1024)} KB`;
  };

  return (
    <div className={styles["editor-container"]}>
      <div className={styles["header"]}>
        <div className={styles["header-left"]}>
          <button className={styles["back-btn"]} onClick={() => navigate("/admin/guidance/articles")}>
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1>{id ? "Edit Guidance Item" : "Create Guidance Item"}</h1>
            <p>Build rich, searchable guidance content for students.</p>
          </div>
        </div>
        <div className={styles["header-actions"]}>
          <button className={styles["secondary-btn"]} onClick={handleSave}>
            <Save size={16} />
            Save Draft
          </button>
          <button className={styles["primary-btn"]} onClick={handleSave}>
            <CheckCircle size={16} />
            Publish
          </button>
        </div>
      </div>

      <div className={styles["content-grid"]}>
        <div className={styles["panel"]}>
          <h2>Content</h2>

          <div className={styles["form-group"]}>
            <label className={styles["form-label"]}>Title</label>
            <input
              className={styles["form-input"]}
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Upload documents correctly"
            />
          </div>

          <div className={styles["form-group"]}>
            <label className={styles["form-label"]}>Short Summary</label>
            <textarea
              className={styles["form-textarea"]}
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              placeholder="A short preview shown in the guidance library"
              rows={3}
            />
          </div>

          <div className={styles["form-group"]}>
            <label className={styles["form-label"]}>Full Content (Markdown supported)</label>
            <textarea
              className={styles["form-textarea"]}
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write the step-by-step guidance here"
              rows={10}
            />
          </div>

          <div className={styles["form-group"]}>
            <label className={styles["form-label"]}>Attachments</label>
            <input type="file" multiple onChange={handleAttachmentChange} />
            <div className={styles["field-hint"]}>
              Upload PDFs or images that appear alongside the guidance content.
            </div>
            <div className={styles["attachment-list"]}>
              {attachments.map((file) => (
                <div key={file.name} className={styles["attachment-item"]}>
                  <span>
                    {file.name} ({formatSize(file.size)})
                  </span>
                  <button
                    className={styles["attachment-remove"]}
                    onClick={() => removeAttachment(file.name)}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles["panel"]}>
          <h2>Settings</h2>

          <div className={styles["form-group"]}>
            <label className={styles["form-label"]}>Category</label>
            <select
              className={styles["form-select"]}
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>

          <div className={styles["inline-row"]}>
            <div className={styles["form-group"]}>
              <label className={styles["form-label"]}>Status</label>
              <select
                className={styles["form-select"]}
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
                <option value="Archived">Archived</option>
              </select>
            </div>
            <div className={styles["form-group"]}>
              <label className={styles["form-label"]}>Layout</label>
              <select
                className={styles["form-select"]}
                name="layout"
                value={formData.layout}
                onChange={handleChange}
              >
                <option value="Card">Card</option>
                <option value="Collapsible">Collapsible</option>
              </select>
            </div>
          </div>

          <div className={styles["form-group"]}>
            <label className={styles["form-label"]}>CTA Button Text</label>
            <input
              className={styles["form-input"]}
              name="ctaText"
              value={formData.ctaText}
              onChange={handleChange}
              placeholder="Get Help"
            />
          </div>

          <div className={styles["form-group"]}>
            <label className={styles["form-label"]}>CTA Destination URL</label>
            <input
              className={styles["form-input"]}
              name="ctaUrl"
              value={formData.ctaUrl}
              onChange={handleChange}
              placeholder="https://edunigo.com/support"
            />
          </div>

          <div className={styles["form-group"]}>
            <label className={styles["form-label"]}>Keywords</label>
            <input
              className={styles["form-input"]}
              name="keywords"
              value={formData.keywords}
              onChange={handleChange}
              placeholder="documents, visa, payment"
            />
            <div className={styles["field-hint"]}>
              Helps improve search relevance in the Guidance Library.
            </div>
          </div>

          <div className={styles["form-group"]}>
            <label className={styles["form-label"]}>Tags (comma separated)</label>
            <input
              className={styles["form-input"]}
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="documents, onboarding"
            />
            <div className={styles["tag-list"]}>
              {tags.map((tag) => (
                <span key={tag} className={styles["tag"]}>
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className={styles["form-group"]}>
            <label className={styles["form-label"]}>Quick Search Indexing</label>
            <div className={styles["field-hint"]}>
              Content, tags, and keywords are indexed automatically when you publish.
            </div>
            <button className={styles["secondary-btn"]} type="button">
              <Upload size={16} />
              Rebuild Index
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuidanceEditor;
