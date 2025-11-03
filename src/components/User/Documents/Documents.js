import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Plus,
  Search,
  Filter,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Folder,
} from "lucide-react";
import styles from "./Documents.module.css";

const Documents = () => {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("list"); // 'list' or 'add'

  // Utility function to check if document is expired
  const checkExpiration = (submissionData) => {
    if (submissionData.status === "verified" && submissionData.expirationDate) {
      const expirationDate = new Date(submissionData.expirationDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      expirationDate.setHours(0, 0, 0, 0);

      if (expirationDate < today) {
        return {
          isExpired: true,
          status: "expired",
          statusLabel: "Expired",
        };
      }
    }
    return {
      isExpired: false,
      status: submissionData.status,
      statusLabel: submissionData.statusLabel,
    };
  };

  // Sample data - replace with actual API call
  useEffect(() => {
    setTimeout(() => {
      const sampleSubmissionsRaw = [
        {
          id: 1,
          document: {
            id: 1,
            name: "Passport",
            category: "Identity Documents",
            description: "Valid passport document for identification",
          },
          status: "verified",
          statusLabel: "Verified",
          submittedAt: "2024-12-10T10:30:00Z",
          expirationDate: null,
          rejectionReason: null,
        },
        {
          id: 2,
          document: {
            id: 3,
            name: "IELTS Certificate",
            category: "Language Certificates",
            description:
              "International English Language Testing System certificate",
          },
          status: "pending",
          statusLabel: "Pending Verification",
          submittedAt: "2024-12-11T08:15:00Z",
          expirationDate: null,
          rejectionReason: null,
        },
        {
          id: 3,
          document: {
            id: 6,
            name: "Bachelor's Degree Certificate",
            category: "Academic Records",
            description: "Bachelor's degree certificate and transcript",
          },
          status: "verified",
          statusLabel: "Verified",
          submittedAt: "2024-12-05T16:45:00Z",
          expirationDate: null,
          rejectionReason: null,
        },
        {
          id: 6,
          document: {
            id: 7,
            name: "Master's Degree Certificate",
            category: "Academic Records",
            description: "Master's degree certificate and transcript",
          },
          status: "pending",
          statusLabel: "Pending Verification",
          submittedAt: "2024-12-12T10:20:00Z",
          expirationDate: null,
          rejectionReason: null,
        },
        {
          id: 7,
          document: {
            id: 5,
            name: "High School Diploma",
            category: "Academic Records",
            description: "High school diploma certificate",
          },
          status: "verified",
          statusLabel: "Verified",
          submittedAt: "2024-11-20T14:30:00Z",
          expirationDate: null,
          rejectionReason: null,
        },
        {
          id: 4,
          document: {
            id: 4,
            name: "TOEFL Score Report",
            category: "Language Certificates",
            description: "Test of English as a Foreign Language score report",
          },
          status: "verified",
          statusLabel: "Verified",
          submittedAt: "2024-12-08T14:20:00Z",
          expirationDate: "2025-12-09T00:00:00Z",
          rejectionReason: null,
        },
        {
          id: 5,
          document: {
            id: 6,
            name: "Cambridge Certificate",
            category: "Language Certificates",
            description: "Cambridge English language certificate",
          },
          status: "verified",
          statusLabel: "Verified", // Will be changed to expired
          submittedAt: "2023-06-15T10:00:00Z",
          expirationDate: "2024-06-20T00:00:00Z", // Already expired
          rejectionReason: null,
        },
      ];

      // Add uploadedFiles to all submissions
      sampleSubmissionsRaw.forEach((sub) => {
        if (!sub.uploadedFiles) {
          const fileName = sub.document.name
            .toLowerCase()
            .replace(/'/g, "")
            .replace(/\s+/g, "_")
            .replace(/[^a-z0-9_]/g, "");
          sub.uploadedFiles = [
            {
              id: sub.id,
              name: `${fileName}_document.pdf`,
              url: "#",
              size: `${(Math.random() * 2 + 1).toFixed(1)} MB`,
              type: "application/pdf",
            },
          ];
        }
      });

      // Check expiration for all submissions
      const sampleSubmissions = sampleSubmissionsRaw.map((sub) => {
        const expirationCheck = checkExpiration(sub);
        return {
          ...sub,
          status: expirationCheck.status,
          statusLabel: expirationCheck.statusLabel,
          isExpired: expirationCheck.isExpired,
        };
      });

      setSubmissions(sampleSubmissions);
      setFilteredSubmissions(sampleSubmissions);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter functionality
  useEffect(() => {
    let filtered = submissions;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (submission) =>
          submission.document.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          submission.document.category
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          submission.document.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (submission) => submission.status === statusFilter
      );
    }

    setFilteredSubmissions(filtered);
  }, [searchTerm, statusFilter, submissions]);

  const handleViewDetails = (submissionId) => {
    navigate(`/user/documents/${submissionId}`);
  };

  const handleAddDocument = () => {
    setActiveTab("add");
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "verified":
        return (
          <CheckCircle2 size={20} className={styles["status-icon-verified"]} />
        );
      case "rejected":
        return <XCircle size={20} className={styles["status-icon-rejected"]} />;
      case "expired":
        return (
          <AlertCircle size={20} className={styles["status-icon-expired"]} />
        );
      case "pending":
      default:
        return <Clock size={20} className={styles["status-icon-pending"]} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "verified":
        return "verified";
      case "rejected":
        return "rejected";
      case "expired":
        return "expired";
      case "pending":
      default:
        return "pending";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className={styles["loading-container"]}>
        <div className={styles["loading-spinner"]}></div>
        <p>Loading documents...</p>
      </div>
    );
  }

  return (
    <div className={styles["documents-page"]}>
      {/* Header */}
      <div className={styles["page-header"]}>
        <div className={styles["header-content"]}>
          <h1>My Documents</h1>
          <p>Manage and track your uploaded documents</p>
        </div>
        {activeTab === "list" && (
          <button className={styles["add-btn"]} onClick={handleAddDocument}>
            <Plus size={18} />
            Add Document
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className={styles["tabs-container"]}>
        <button
          className={[
            styles["tab"],
            activeTab === "list" ? styles["active"] : "",
          ]
            .filter(Boolean)
            .join(" ")}
          onClick={() => setActiveTab("list")}
        >
          <FileText size={18} />
          My Documents ({submissions.length})
        </button>
        <button
          className={[
            styles["tab"],
            activeTab === "add" ? styles["active"] : "",
          ]
            .filter(Boolean)
            .join(" ")}
          onClick={() => setActiveTab("add")}
        >
          <Plus size={18} />
          Add New Document
        </button>
      </div>

      {/* List View */}
      {activeTab === "list" && (
        <>
          {/* Stats */}
          <div className={styles["stats-section"]}>
            <div className={styles["stat-card"]}>
              <div className={styles["stat-icon"]}>
                <FileText size={20} />
              </div>
              <div className={styles["stat-content"]}>
                <span className={styles["stat-number"]}>
                  {submissions.length}
                </span>
                <span className={styles["stat-label"]}>Total Documents</span>
              </div>
            </div>
            <div className={styles["stat-card"]}>
              <div className={styles["stat-icon"]}>
                <CheckCircle2 size={20} />
              </div>
              <div className={styles["stat-content"]}>
                <span className={styles["stat-number"]}>
                  {submissions.filter((s) => s.status === "verified").length}
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
                  {submissions.filter((s) => s.status === "pending").length}
                </span>
                <span className={styles["stat-label"]}>Pending</span>
              </div>
            </div>
            <div className={styles["stat-card"]}>
              <div className={styles["stat-icon"]}>
                <XCircle size={20} />
              </div>
              <div className={styles["stat-content"]}>
                <span className={styles["stat-number"]}>
                  {submissions.filter((s) => s.status === "rejected").length}
                </span>
                <span className={styles["stat-label"]}>Rejected</span>
              </div>
            </div>
            <div className={styles["stat-card"]}>
              <div className={styles["stat-icon"]}>
                <AlertCircle size={20} />
              </div>
              <div className={styles["stat-content"]}>
                <span className={styles["stat-number"]}>
                  {submissions.filter((s) => s.status === "expired").length}
                </span>
                <span className={styles["stat-label"]}>Expired</span>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className={styles["filters-section"]}>
            <div className={styles["search-container"]}>
              <Search size={18} className={styles["search-icon"]} />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles["search-input"]}
              />
            </div>
            <div className={styles["filter-container"]}>
              <Filter size={18} className={styles["filter-icon"]} />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className={styles["filter-select"]}
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending Verification</option>
                <option value="verified">Verified</option>
                <option value="expired">Expired</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          {/* Documents Grid */}
          {filteredSubmissions.length > 0 ? (
            <div className={styles["documents-grid"]}>
              {filteredSubmissions.map((submission) => (
                <div
                  key={submission.id}
                  className={styles["document-card"]}
                  onClick={() => handleViewDetails(submission.id)}
                >
                  <div className={styles["card-header"]}>
                    <div className={styles["document-icon"]}>
                      <FileText size={24} />
                    </div>
                    <div
                      className={[
                        styles["status-badge"],
                        styles[getStatusColor(submission.status)],
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {getStatusIcon(submission.status)}
                      {submission.statusLabel}
                    </div>
                  </div>

                  <div className={styles["card-content"]}>
                    <h3 className={styles["document-name"]}>
                      {submission.document.name}
                    </h3>
                    <p className={styles["document-description"]}>
                      {submission.document.description}
                    </p>
                    <div className={styles["card-meta"]}>
                      <span className={styles["category-badge"]}>
                        <Folder size={12} />
                        {submission.document.category}
                      </span>
                      <span className={styles["date-info"]}>
                        {formatDate(submission.submittedAt)}
                      </span>
                    </div>
                    {submission.rejectionReason && (
                      <div className={styles["rejection-notice"]}>
                        <AlertCircle size={14} />
                        <span>Rejected: Click to view reason</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles["empty-state"]}>
              <FileText size={48} className={styles["empty-icon"]} />
              <h3>No documents found</h3>
              <p>
                {searchTerm || statusFilter !== "all"
                  ? "No documents match your search criteria"
                  : "You haven't uploaded any documents yet"}
              </p>
              {!searchTerm && statusFilter === "all" && (
                <button
                  className={styles["add-btn-primary"]}
                  onClick={handleAddDocument}
                >
                  <Plus size={18} />
                  Add Your First Document
                </button>
              )}
            </div>
          )}
        </>
      )}

      {/* Add Document View */}
      {activeTab === "add" && (
        <AddDocumentView
          onBack={() => setActiveTab("list")}
          existingSubmissions={submissions}
        />
      )}
    </div>
  );
};

// Add Document Component
const AddDocumentView = ({ onBack, existingSubmissions = [] }) => {
  // Sample categories from admin - defined first
  const categories = [
    { id: 1, name: "Identity Documents", icon: FileText },
    { id: 2, name: "Language Certificates", icon: FileText },
    { id: 3, name: "Academic Records", icon: Folder },
    { id: 4, name: "Financial Documents", icon: FileText },
    { id: 5, name: "Recommendation Letters", icon: FileText },
  ];

  // Check for category filter from URL
  const urlParams = new URLSearchParams(window.location.search);
  const categoryFromUrl = urlParams.get("category");

  // Find initial category if provided in URL
  const getInitialCategory = () => {
    if (!categoryFromUrl) return null;
    const categoryMap = {
      "Academic Records": 3,
      "Language Certificates": 2,
      "Identity Documents": 1,
      "Financial Documents": 4,
      "Recommendation Letters": 5,
    };
    const categoryId = categoryMap[categoryFromUrl];
    if (categoryId) {
      return categories.find((cat) => cat.id === categoryId);
    }
    return null;
  };

  const [step, setStep] = useState(categoryFromUrl ? 2 : 1); // Start at step 2 if category is provided
  const [selectedCategory, setSelectedCategory] = useState(
    getInitialCategory()
  );
  const [selectedDocumentType, setSelectedDocumentType] = useState(null);

  // Auto-select category if provided in URL
  useEffect(() => {
    const initialCategory = getInitialCategory();
    if (initialCategory) {
      setSelectedCategory(initialCategory);
      setStep(2); // Jump to document type selection
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryFromUrl]);

  // Sample document types - would come from API based on category
  const allDocumentTypes = [
    // Identity Documents
    { id: 1, name: "Passport", categoryId: 1 },
    { id: 2, name: "National ID", categoryId: 1 },
    // Language Certificates
    { id: 3, name: "IELTS Certificate", categoryId: 2 },
    { id: 4, name: "TOEFL Score Report", categoryId: 2 },
    { id: 15, name: "Cambridge Certificate", categoryId: 2 },
    // Academic Records - Separate degree types
    { id: 5, name: "High School Diploma", categoryId: 3 },
    { id: 6, name: "Bachelor's Degree Certificate", categoryId: 3 },
    { id: 7, name: "Master's Degree Certificate", categoryId: 3 },
    { id: 8, name: "PhD Certificate", categoryId: 3 },
    { id: 9, name: "Associate Degree Certificate", categoryId: 3 },
    { id: 10, name: "Diploma Certificate", categoryId: 3 },
    // Financial Documents
    { id: 11, name: "Bank Statement", categoryId: 4 },
    { id: 12, name: "Financial Sponsorship Letter", categoryId: 4 },
    // Recommendation Letters
    { id: 13, name: "Academic Recommendation Letter", categoryId: 5 },
    { id: 14, name: "Professional Recommendation Letter", categoryId: 5 },
  ];

  // Get document types for selected category and check their statuses
  const getDocumentStatus = (docTypeId) => {
    const submission = existingSubmissions.find(
      (s) => s.document.id === docTypeId
    );
    return submission ? submission.status : null;
  };

  const documentTypes = selectedCategory
    ? allDocumentTypes
        .filter((doc) => doc.categoryId === selectedCategory.id)
        .map((doc) => ({
          ...doc,
          status: getDocumentStatus(doc.id),
        }))
    : [];

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setStep(2);
  };

  const handleDocumentTypeSelect = (documentType) => {
    setSelectedDocumentType(documentType);
    setStep(3);
  };

  // Get document template fields - would come from API in real implementation
  const getDocumentFields = (documentTypeId) => {
    const fieldTemplates = {
      // Bachelor's Degree
      6: [
        {
          name: "Institution",
          type: "text",
          required: true,
          placeholder: "University or College name",
        },
        {
          name: "Degree Name",
          type: "text",
          required: true,
          placeholder: "e.g., Bachelor of Science",
        },
        {
          name: "Field of Study",
          type: "text",
          required: true,
          placeholder: "e.g., Computer Science",
        },
        {
          name: "GPA",
          type: "number",
          required: false,
          placeholder: "e.g., 3.8",
          step: "0.01",
        },
        { name: "Graduation Date", type: "date", required: true },
      ],
      // Master's Degree
      7: [
        {
          name: "Institution",
          type: "text",
          required: true,
          placeholder: "University or College name",
        },
        {
          name: "Degree Name",
          type: "text",
          required: true,
          placeholder: "e.g., Master of Science",
        },
        {
          name: "Field of Study",
          type: "text",
          required: true,
          placeholder: "e.g., Artificial Intelligence",
        },
        {
          name: "GPA",
          type: "number",
          required: false,
          placeholder: "e.g., 4.0",
          step: "0.01",
        },
        { name: "Graduation Date", type: "date", required: true },
        {
          name: "Thesis Title",
          type: "text",
          required: false,
          placeholder: "Master's thesis title",
        },
      ],
      // PhD Certificate
      8: [
        {
          name: "Institution",
          type: "text",
          required: true,
          placeholder: "University name",
        },
        {
          name: "Degree Name",
          type: "text",
          required: true,
          placeholder: "e.g., Doctor of Philosophy",
        },
        {
          name: "Field of Study",
          type: "text",
          required: true,
          placeholder: "e.g., Computer Science",
        },
        { name: "Graduation Date", type: "date", required: true },
        {
          name: "Dissertation Title",
          type: "text",
          required: true,
          placeholder: "PhD dissertation title",
        },
      ],
      // High School Diploma
      5: [
        {
          name: "School Name",
          type: "text",
          required: true,
          placeholder: "High school name",
        },
        {
          name: "Graduation Year",
          type: "number",
          required: true,
          placeholder: "e.g., 2018",
          min: "1900",
          max: "2030",
        },
        {
          name: "GPA",
          type: "number",
          required: false,
          placeholder: "e.g., 3.9",
          step: "0.01",
        },
      ],
      // IELTS Certificate
      3: [
        {
          name: "Overall Score",
          type: "number",
          required: true,
          placeholder: "0-9",
          min: "0",
          max: "9",
          step: "0.5",
        },
        {
          name: "Listening Score",
          type: "number",
          required: false,
          min: "0",
          max: "9",
          step: "0.5",
        },
        {
          name: "Reading Score",
          type: "number",
          required: false,
          min: "0",
          max: "9",
          step: "0.5",
        },
        {
          name: "Writing Score",
          type: "number",
          required: false,
          min: "0",
          max: "9",
          step: "0.5",
        },
        {
          name: "Speaking Score",
          type: "number",
          required: false,
          min: "0",
          max: "9",
          step: "0.5",
        },
      ],
      // TOEFL Score Report
      4: [
        {
          name: "Total Score",
          type: "number",
          required: true,
          placeholder: "0-120",
          min: "0",
          max: "120",
        },
        {
          name: "Reading",
          type: "number",
          required: false,
          min: "0",
          max: "30",
        },
        {
          name: "Listening",
          type: "number",
          required: false,
          min: "0",
          max: "30",
        },
        {
          name: "Speaking",
          type: "number",
          required: false,
          min: "0",
          max: "30",
        },
        {
          name: "Writing",
          type: "number",
          required: false,
          min: "0",
          max: "30",
        },
      ],
    };
    return (
      fieldTemplates[documentTypeId] || [
        {
          name: "Additional Information",
          type: "textarea",
          required: false,
          placeholder: "Enter any additional details",
        },
      ]
    );
  };

  // Render form fields dynamically
  const renderDocumentFields = () => {
    if (!selectedDocumentType) return null;

    const fields = getDocumentFields(selectedDocumentType.id);

    return (
      <>
        {fields.map((field, index) => {
          if (field.type === "textarea") {
            return (
              <div key={index} className={styles["form-group"]}>
                <label>
                  {field.name}
                  {field.required && (
                    <span className={styles["required"]}>*</span>
                  )}
                </label>
                <textarea
                  rows="4"
                  required={field.required}
                  placeholder={field.placeholder || ""}
                />
              </div>
            );
          }

          return (
            <div key={index} className={styles["form-group"]}>
              <label>
                {field.name}
                {field.required && (
                  <span className={styles["required"]}>*</span>
                )}
              </label>
              <input
                type={field.type}
                required={field.required}
                placeholder={field.placeholder || ""}
                min={field.min}
                max={field.max}
                step={field.step}
              />
            </div>
          );
        })}
      </>
    );
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Submit document
    // In real implementation, collect form data here
    console.log("Submitting document:", {
      category: selectedCategory,
      documentType: selectedDocumentType,
    });
    // Navigate back to list or show success
    onBack();
  };

  return (
    <div className={styles["add-document-container"]}>
      {/* Steps Indicator */}
      <div className={styles["steps-indicator"]}>
        <div
          className={[
            styles["step"],
            step >= 1 ? styles["active"] : "",
            step > 1 ? styles["completed"] : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <div className={styles["step-number"]}>1</div>
          <span>Select Category</span>
        </div>
        <div className={styles["step-connector"]}></div>
        <div
          className={[
            styles["step"],
            step >= 2 ? styles["active"] : "",
            step > 2 ? styles["completed"] : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <div className={styles["step-number"]}>2</div>
          <span>Choose Document</span>
        </div>
        <div className={styles["step-connector"]}></div>
        <div
          className={[styles["step"], step >= 3 ? styles["active"] : ""]
            .filter(Boolean)
            .join(" ")}
        >
          <div className={styles["step-number"]}>3</div>
          <span>Fill & Upload</span>
        </div>
      </div>

      {/* Step 1: Select Category */}
      {step === 1 && (
        <div className={styles["step-content"]}>
          <h2>Select Document Category</h2>
          <p>Choose the category for the document you want to upload</p>
          <div className={styles["categories-grid"]}>
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <div
                  key={category.id}
                  className={styles["category-card"]}
                  onClick={() => handleCategorySelect(category)}
                >
                  <IconComponent
                    size={32}
                    className={styles["category-icon"]}
                  />
                  <h3>{category.name}</h3>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Step 2: Select Document Type */}
      {step === 2 && (
        <div className={styles["step-content"]}>
          <div className={styles["step-header"]}>
            <button
              onClick={() => {
                setStep(1);
                setSelectedCategory(null);
              }}
              className={styles["back-btn"]}
            >
              ← Back
            </button>
            <h2>Select Document Type</h2>
            <p>
              Choose the specific document type from{" "}
              <strong>{selectedCategory.name}</strong>
            </p>
          </div>
          <div className={styles["document-types-list"]}>
            {documentTypes.length > 0 ? (
              documentTypes.map((docType) => {
                const isVerified = docType.status === "verified";
                const isUploaded = docType.status !== null;

                return (
                  <div
                    key={docType.id}
                    className={[
                      styles["document-type-card"],
                      isVerified ? styles["disabled"] : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={() =>
                      !isVerified && handleDocumentTypeSelect(docType)
                    }
                    title={
                      isVerified
                        ? "This document is verified and cannot be re-uploaded"
                        : ""
                    }
                  >
                    <FileText size={20} />
                    <div className={styles["document-type-info"]}>
                      <span className={styles["document-type-name"]}>
                        {docType.name}
                      </span>
                      {isUploaded && (
                        <div
                          className={[
                            styles["document-status-badge"],
                            styles[docType.status],
                          ]
                            .filter(Boolean)
                            .join(" ")}
                        >
                          {docType.status === "verified" && (
                            <CheckCircle2 size={12} />
                          )}
                          {docType.status === "pending" && <Clock size={12} />}
                          {docType.status === "rejected" && (
                            <XCircle size={12} />
                          )}
                          <span>
                            {docType.status === "verified"
                              ? "Verified"
                              : docType.status === "pending"
                              ? "Pending"
                              : "Rejected"}
                          </span>
                        </div>
                      )}
                      {!isUploaded && (
                        <span className={styles["document-status-new"]}>
                          Not uploaded
                        </span>
                      )}
                    </div>
                    {isVerified ? (
                      <span className={styles["disabled-icon"]}>🔒</span>
                    ) : (
                      <span className={styles["select-arrow"]}>→</span>
                    )}
                  </div>
                );
              })
            ) : (
              <div className={styles["empty-state"]}>
                <p>No document types available for this category</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Step 3: Fill Form & Upload */}
      {step === 3 && selectedDocumentType && (
        <div className={styles["step-content"]}>
          <div className={styles["step-header"]}>
            <button
              onClick={() => {
                setStep(2);
                setSelectedDocumentType(null);
              }}
              className={styles["back-btn"]}
            >
              ← Back
            </button>
            <h2>Upload {selectedDocumentType.name}</h2>
            <p>Fill in the required fields and upload your document</p>
          </div>
          <form onSubmit={handleFormSubmit} className={styles["document-form"]}>
            {/* Dynamic form fields based on document template */}
            <div className={styles["form-section"]}>
              <h3>Document Information</h3>
              {renderDocumentFields()}
            </div>

            <div className={styles["form-section"]}>
              <h3>Upload File</h3>
              <div className={styles["upload-zone"]}>
                <FileText size={32} />
                <p>Drag and drop your file here, or click to browse</p>
                <button type="button" className={styles["browse-btn"]}>
                  Choose File
                </button>
                <span className={styles["file-hint"]}>
                  Supported formats: PDF, JPG, PNG (Max 10MB)
                </span>
              </div>
            </div>

            <div className={styles["form-actions"]}>
              <button
                type="button"
                onClick={onBack}
                className={styles["cancel-btn"]}
              >
                Cancel
              </button>
              <button type="submit" className={styles["submit-btn"]}>
                Submit Document
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Documents;
