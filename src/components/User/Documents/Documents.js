import React, { useState } from "react";
import {
  Upload,
  Download,
  Eye,
  Edit,
  Trash2,
  FileText,
  Image,
  File,
  Folder,
  Search,
  Filter,
  Plus,
  X,
  Save,
  CheckCircle,
  AlertCircle,
  Clock,
} from "lucide-react";
import styles from "./Documents.module.css";

const Documents = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [viewMode] = useState("grid");
  const [selectedFiles, setSelectedFiles] = useState([]);

  const documents = [
    {
      id: 1,
      name: "Passport.pdf",
      type: "pdf",
      category: "Identity",
      size: "2.4 MB",
      uploadDate: "2024-11-15",
      status: "verified",
      description: "Valid passport document",
    },
    {
      id: 2,
      name: "Academic Transcripts.pdf",
      type: "pdf",
      category: "Academic",
      size: "1.8 MB",
      uploadDate: "2024-11-10",
      status: "pending",
      description: "Official academic transcripts",
    },
    {
      id: 3,
      name: "TOEFL Score Report.pdf",
      type: "pdf",
      category: "Test Scores",
      size: "0.9 MB",
      uploadDate: "2024-11-08",
      status: "verified",
      description: "Official TOEFL test scores",
    },
    {
      id: 4,
      name: "Financial Statement.pdf",
      type: "pdf",
      category: "Financial",
      size: "3.2 MB",
      uploadDate: "2024-11-05",
      status: "verified",
      description: "Bank statements and financial proof",
    },
    {
      id: 5,
      name: "Recommendation Letter 1.pdf",
      type: "pdf",
      category: "Recommendations",
      size: "1.1 MB",
      uploadDate: "2024-11-03",
      status: "pending",
      description: "Academic recommendation letter",
    },
    {
      id: 6,
      name: "Personal Statement.pdf",
      type: "pdf",
      category: "Essays",
      size: "0.7 MB",
      uploadDate: "2024-11-01",
      status: "verified",
      description: "Personal statement for applications",
    },
    {
      id: 7,
      name: "Photo ID.jpg",
      type: "image",
      category: "Identity",
      size: "0.5 MB",
      uploadDate: "2024-10-28",
      status: "verified",
      description: "Passport size photograph",
    },
    {
      id: 8,
      name: "Resume.pdf",
      type: "pdf",
      category: "Professional",
      size: "0.8 MB",
      uploadDate: "2024-10-25",
      status: "verified",
      description: "Updated resume/CV",
    },
  ];

  const categories = [
    "Identity",
    "Academic",
    "Test Scores",
    "Financial",
    "Recommendations",
    "Essays",
    "Professional",
  ];

  const openModal = (modalType, data = {}) => {
    setActiveModal(modalType);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const getFileIcon = (type) => {
    switch (type) {
      case "pdf":
        return <FileText size={20} className={styles["file-icon-pdf"]} />;
      case "image":
        return <Image size={20} className={styles["file-icon-image"]} />;
      default:
        return <File size={20} className={styles["file-icon-default"]} />;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "verified":
        return (
          <CheckCircle size={16} className={styles["status-icon-verified"]} />
        );
      case "pending":
        return <Clock size={16} className={styles["status-icon-pending"]} />;
      case "rejected":
        return (
          <AlertCircle size={16} className={styles["status-icon-rejected"]} />
        );
      default:
        return (
          <AlertCircle size={16} className={styles["status-icon-default"]} />
        );
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "verified":
        return "verified";
      case "pending":
        return "pending";
      case "rejected":
        return "rejected";
      default:
        return "pending";
    }
  };

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || doc.category === filterType;
    return matchesSearch && matchesFilter;
  });

  const toggleFileSelection = (fileId) => {
    setSelectedFiles((prev) =>
      prev.includes(fileId)
        ? prev.filter((id) => id !== fileId)
        : [...prev, fileId]
    );
  };

  const renderUploadModal = () => (
    <div className={styles["modal-overlay"]} onClick={closeModal}>
      <div
        className={[styles["modal"], styles["large-modal"]]
          .filter(Boolean)
          .join(" ")}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles["modal-header"]}>
          <h3>Upload Documents</h3>
          <button className={styles["close-btn"]} onClick={closeModal}>
            <X size={20} />
          </button>
        </div>
        <div className={styles["modal-content"]}>
          <div className={styles["upload-area"]}>
            <div className={styles["upload-zone"]}>
              <Upload size={48} className={styles["upload-icon"]} />
              <h4>Drag & drop files here</h4>
              <p>or click to browse</p>
              <button className={styles["btn-primary"]}>
                <Upload size={16} />
                Choose Files
              </button>
            </div>
          </div>

          <div className={styles["upload-form"]}>
            <div className={styles["form-section"]}>
              <h4>File Information</h4>
              <div className={styles["form-row"]}>
                <div className={styles["form-group"]}>
                  <label>Category</label>
                  <select>
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles["form-group"]}>
                  <label>Document Type</label>
                  <select>
                    <option value="">Select Type</option>
                    <option value="pdf">PDF Document</option>
                    <option value="image">Image</option>
                    <option value="word">Word Document</option>
                  </select>
                </div>
              </div>
              <div className={styles["form-group"]}>
                <label>Description</label>
                <textarea
                  rows="3"
                  placeholder="Brief description of the document..."
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        <div className={styles["modal-footer"]}>
          <button className={styles["btn-secondary"]} onClick={closeModal}>
            Cancel
          </button>
          <button className={styles["btn-primary"]} onClick={closeModal}>
            <Save size={16} />
            Upload Files
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles["page-content"]}>
      <div className={styles["page-header"]}>
        <div className={styles["header-content"]}>
          <h1>Documents</h1>
          <p>Manage and organize your application documents</p>
        </div>
        <button
          className={styles["btn-primary"]}
          onClick={() => openModal("upload")}
        >
          <Plus size={16} />
          Upload Documents
        </button>
      </div>

      <div className={styles["documents-stats"]}>
        <div className={styles["stat-card"]}>
          <div className={styles["stat-icon"]}>
            <FileText size={20} />
          </div>
          <div className={styles["stat-content"]}>
            <span className={styles["stat-number"]}>{documents.length}</span>
            <span className={styles["stat-label"]}>Total Documents</span>
          </div>
        </div>
        <div className={styles["stat-card"]}>
          <div className={styles["stat-icon"]}>
            <CheckCircle size={20} />
          </div>
          <div className={styles["stat-content"]}>
            <span className={styles["stat-number"]}>
              {documents.filter((doc) => doc.status === "verified").length}
            </span>
            <span className={styles["stat-label"]}>Verified</span>
          </div>
        </div>
        <div className={styles["stat-card"]}>
          <div className={styles["stat-icon"]}>
            <Clock size={20} />
          </div>
          <div className={styles["stat-content"]}>
            <span className={styles["stat-number"]}>
              {documents.filter((doc) => doc.status === "pending").length}
            </span>
            <span className={styles["stat-label"]}>Pending Review</span>
          </div>
        </div>
        <div className={styles["stat-card"]}>
          <div className={styles["stat-icon"]}>
            <Folder size={20} />
          </div>
          <div className={styles["stat-content"]}>
            <span className={styles["stat-number"]}>{categories.length}</span>
            <span className={styles["stat-label"]}>Categories</span>
          </div>
        </div>
      </div>

      <div className={styles["documents-controls"]}>
        <div className={styles["search-box"]}>
          <Search size={16} />
          <input
            type="text"
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className={styles["filter-group"]}>
          <Filter size={16} />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedFiles.length > 0 && (
        <div className={styles["bulk-actions"]}>
          <span className={styles["selection-count"]}>
            {selectedFiles.length} file{selectedFiles.length > 1 ? "s" : ""}{" "}
            selected
          </span>
          <div className={styles["bulk-buttons"]}>
            <button className={styles["btn-outline"]}>
              <Download size={16} />
              Download
            </button>
            <button className={styles["btn-outline"]}>
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        </div>
      )}

      <div
        className={[styles["documents-container"], viewMode]
          .filter(Boolean)
          .join(" ")}
      >
        {filteredDocuments.map((doc) => (
          <div
            key={doc.id}
            className={[
              styles["document-card"],
              selectedFiles.includes(doc.id) ? styles["selected"] : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onClick={() => toggleFileSelection(doc.id)}
          >
            <div className={styles["document-header"]}>
              <div className={styles["file-icon"]}>{getFileIcon(doc.type)}</div>
              <div className={styles["document-actions"]}>
                <button className={styles["action-btn"]} title="View">
                  <Eye size={14} />
                </button>
                <button className={styles["action-btn"]} title="Download">
                  <Download size={14} />
                </button>
                <button className={styles["action-btn"]} title="Edit">
                  <Edit size={14} />
                </button>
                <button
                  className={[styles["action-btn"], styles["danger"]]
                    .filter(Boolean)
                    .join(" ")}
                  title="Delete"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            <div className={styles["document-content"]}>
              <h4 className={styles["document-name"]}>{doc.name}</h4>
              <p className={styles["document-description"]}>
                {doc.description}
              </p>

              <div className={styles["document-meta"]}>
                <span className={styles["category-badge"]}>{doc.category}</span>
                <span
                  className={[
                    styles["status-badge"],
                    styles[getStatusColor(doc.status)],
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {getStatusIcon(doc.status)}
                  {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                </span>
              </div>

              <div className={styles["document-details"]}>
                <span className={styles["file-size"]}>{doc.size}</span>
                <span className={styles["upload-date"]}>{doc.uploadDate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {activeModal === "upload" && renderUploadModal()}
    </div>
  );
};

export default Documents;
