import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  Download,
  Eye,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Folder,
  Upload,
  Lock,
  AlertTriangle,
} from "lucide-react";
import styles from "./DocumentDetail.module.css";

const DocumentDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showReUpload, setShowReUpload] = useState(false);

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

  useEffect(() => {
    setTimeout(() => {
      // Sample submission data - replace with actual API call
      // Different sample data based on ID to show different states
      const samples = {
        1: {
          id: 1,
          document: {
            id: 1,
            name: "Passport",
            description: "Valid passport document for identification",
            category: "Identity Documents",
            fields: [
              { name: "Passport Number", type: "text", value: "AB123456" },
              { name: "Country of Issue", type: "text", value: "USA" },
            ],
          },
          status: "verified",
          statusLabel: "Verified",
          submittedAt: "2024-12-10T10:30:00Z",
          updatedAt: "2024-12-10T10:30:00Z",
          verifiedAt: "2024-12-11T14:20:00Z",
          expirationDate: null, // No expiration for passport in this example
          rejectionReason: null,
          uploadedFiles: [
            {
              id: 1,
              name: "passport_john_smith.pdf",
              url: "#",
              size: "2.1 MB",
              type: "application/pdf",
            },
          ],
        },
        2: {
          id: 2,
          document: {
            id: 3,
            name: "IELTS Certificate",
            description:
              "International English Language Testing System certificate",
            category: "Language Certificates",
            fields: [
              { name: "Overall Score", type: "number", value: "7.5" },
              { name: "Listening Score", type: "number", value: "8.0" },
              { name: "Reading Score", type: "number", value: "7.0" },
              { name: "Writing Score", type: "number", value: "7.0" },
              { name: "Speaking Score", type: "number", value: "8.0" },
            ],
          },
          status: "pending",
          statusLabel: "Pending Verification",
          submittedAt: "2024-12-11T08:15:00Z",
          updatedAt: "2024-12-11T08:15:00Z",
          verifiedAt: null,
          expirationDate: null,
          rejectionReason: null,
          uploadedFiles: [
            {
              id: 1,
              name: "ielts_certificate_john_smith.pdf",
              url: "#",
              size: "2.4 MB",
              type: "application/pdf",
            },
          ],
        },
        3: {
          id: 3,
          document: {
            id: 6,
            name: "Bachelor's Degree Certificate",
            category: "Academic Records",
            description: "Bachelor's degree certificate and transcript",
            fields: [
              {
                name: "Institution",
                type: "text",
                value: "Harvard University",
              },
              {
                name: "Degree Name",
                type: "text",
                value: "Bachelor of Science",
              },
              {
                name: "Field of Study",
                type: "text",
                value: "Computer Science",
              },
              {
                name: "GPA",
                type: "number",
                value: "3.8",
              },
              {
                name: "Graduation Date",
                type: "date",
                value: "2022-05-15",
              },
            ],
          },
          status: "verified",
          statusLabel: "Verified",
          submittedAt: "2024-12-05T16:45:00Z",
          updatedAt: "2024-12-06T10:30:00Z",
          verifiedAt: "2024-12-07T09:20:00Z",
          expirationDate: null,
          rejectionReason: null,
          uploadedFiles: [
            {
              id: 1,
              name: "bachelors_degree_certificate.pdf",
              url: "#",
              size: "1.8 MB",
              type: "application/pdf",
            },
            {
              id: 2,
              name: "bachelors_transcript.pdf",
              url: "#",
              size: "2.3 MB",
              type: "application/pdf",
            },
          ],
        },
        6: {
          id: 6,
          document: {
            id: 7,
            name: "Master's Degree Certificate",
            category: "Academic Records",
            description: "Master's degree certificate and transcript",
            fields: [
              {
                name: "Institution",
                type: "text",
                value: "MIT",
              },
              {
                name: "Degree Name",
                type: "text",
                value: "Master of Science",
              },
              {
                name: "Field of Study",
                type: "text",
                value: "Artificial Intelligence",
              },
              {
                name: "GPA",
                type: "number",
                value: "4.0",
              },
              {
                name: "Graduation Date",
                type: "date",
                value: "2024-05-20",
              },
              {
                name: "Thesis Title",
                type: "text",
                value: "Advanced Machine Learning Techniques",
              },
            ],
          },
          status: "pending",
          statusLabel: "Pending Verification",
          submittedAt: "2024-12-12T10:20:00Z",
          updatedAt: "2024-12-12T10:20:00Z",
          verifiedAt: null,
          expirationDate: null,
          rejectionReason: null,
          uploadedFiles: [
            {
              id: 1,
              name: "masters_degree_certificate.pdf",
              url: "#",
              size: "2.1 MB",
              type: "application/pdf",
            },
            {
              id: 2,
              name: "masters_transcript.pdf",
              url: "#",
              size: "2.5 MB",
              type: "application/pdf",
            },
          ],
        },
        7: {
          id: 7,
          document: {
            id: 5,
            name: "High School Diploma",
            category: "Academic Records",
            description: "High school diploma certificate",
            fields: [
              {
                name: "School Name",
                type: "text",
                value: "Lincoln High School",
              },
              {
                name: "Graduation Year",
                type: "number",
                value: "2018",
              },
              {
                name: "GPA",
                type: "number",
                value: "3.9",
              },
            ],
          },
          status: "verified",
          statusLabel: "Verified",
          submittedAt: "2024-11-20T14:30:00Z",
          updatedAt: "2024-11-21T11:15:00Z",
          verifiedAt: "2024-11-21T11:15:00Z",
          expirationDate: null,
          rejectionReason: null,
          uploadedFiles: [
            {
              id: 1,
              name: "high_school_diploma.pdf",
              url: "#",
              size: "1.2 MB",
              type: "application/pdf",
            },
          ],
        },
        4: {
          id: 4,
          document: {
            id: 4,
            name: "TOEFL Score Report",
            category: "Language Certificates",
            description: "Test of English as a Foreign Language score report",
            fields: [
              { name: "Total Score", type: "number", value: "110" },
              { name: "Reading", type: "number", value: "28" },
              { name: "Listening", type: "number", value: "27" },
              { name: "Speaking", type: "number", value: "26" },
              { name: "Writing", type: "number", value: "29" },
            ],
          },
          status: "verified",
          statusLabel: "Verified",
          submittedAt: "2024-12-08T14:20:00Z",
          updatedAt: "2024-12-09T09:15:00Z",
          verifiedAt: "2024-12-09T09:15:00Z",
          expirationDate: "2025-12-09T00:00:00Z", // Will expire in the future
          rejectionReason: null,
          uploadedFiles: [
            {
              id: 1,
              name: "toefl_score_report.pdf",
              url: "#",
              size: "1.5 MB",
              type: "application/pdf",
            },
          ],
        },
        5: {
          id: 5,
          document: {
            id: 6,
            name: "Cambridge Certificate",
            category: "Language Certificates",
            description: "Cambridge English language certificate",
            fields: [
              { name: "Level", type: "text", value: "Advanced (C1)" },
              { name: "Score", type: "number", value: "195" },
            ],
          },
          status: "verified",
          statusLabel: "Verified", // Will be changed to expired
          submittedAt: "2023-06-15T10:00:00Z",
          updatedAt: "2023-06-20T14:30:00Z",
          verifiedAt: "2023-06-20T14:30:00Z",
          expirationDate: "2024-06-20T00:00:00Z", // Already expired
          rejectionReason: null,
          uploadedFiles: [
            {
              id: 1,
              name: "cambridge_certificate.pdf",
              url: "#",
              size: "2.0 MB",
              type: "application/pdf",
            },
          ],
        },
      };

      const sampleSubmission = samples[parseInt(id)] || samples[2];

      // Check expiration and update status if needed
      const expirationCheck = checkExpiration(sampleSubmission);
      const finalSubmission = {
        ...sampleSubmission,
        status: expirationCheck.status,
        statusLabel: expirationCheck.statusLabel,
        isExpired: expirationCheck.isExpired,
      };

      setSubmission(finalSubmission);
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleBack = () => {
    navigate("/user/documents");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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
          <AlertTriangle size={20} className={styles["status-icon-expired"]} />
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

  const formatDateShort = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const isExpiringSoon = (expirationDate) => {
    if (!expirationDate) return false;
    const expiration = new Date(expirationDate);
    const today = new Date();
    const daysUntilExpiration = Math.ceil(
      (expiration - today) / (1000 * 60 * 60 * 24)
    );
    return daysUntilExpiration > 0 && daysUntilExpiration <= 30;
  };

  if (loading) {
    return (
      <div className={styles["loading-container"]}>
        <div className={styles["loading-spinner"]}></div>
        <p>Loading document details...</p>
      </div>
    );
  }

  if (!submission) {
    return (
      <div className={styles["error-container"]}>
        <h3>Document Not Found</h3>
        <button onClick={handleBack} className={styles["back-btn"]}>
          <ArrowLeft size={16} />
          Back to Documents
        </button>
      </div>
    );
  }

  return (
    <div className={styles["detail-page"]}>
      {/* Header */}
      <div className={styles["page-header"]}>
        <button onClick={handleBack} className={styles["back-btn"]}>
          <ArrowLeft size={20} />
        </button>
        <div className={styles["header-content"]}>
          <h1>{submission.document.name}</h1>
          <p>{submission.document.description}</p>
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

      <div className={styles["content-grid"]}>
        {/* Main Content */}
        <div className={styles["main-content"]}>
          {/* Document Info */}
          <div className={styles["info-section"]}>
            <h2 className={styles["section-title"]}>Document Information</h2>
            <div className={styles["info-grid"]}>
              <div className={styles["info-item"]}>
                <span className={styles["info-label"]}>Category</span>
                <div className={styles["category-badge"]}>
                  <Folder size={14} />
                  <span>{submission.document.category}</span>
                </div>
              </div>
              <div className={styles["info-item"]}>
                <span className={styles["info-label"]}>Submitted</span>
                <span className={styles["info-value"]}>
                  {formatDate(submission.submittedAt)}
                </span>
              </div>
              <div className={styles["info-item"]}>
                <span className={styles["info-label"]}>Last Updated</span>
                <span className={styles["info-value"]}>
                  {formatDate(submission.updatedAt)}
                </span>
              </div>
              {submission.verifiedAt && (
                <div className={styles["info-item"]}>
                  <span className={styles["info-label"]}>Verified At</span>
                  <span className={styles["info-value"]}>
                    {formatDate(submission.verifiedAt)}
                  </span>
                </div>
              )}
              {submission.expirationDate && (
                <div className={styles["info-item"]}>
                  <span className={styles["info-label"]}>Expiration Date</span>
                  <span
                    className={[
                      styles["info-value"],
                      submission.status === "expired"
                        ? styles["expired-date"]
                        : isExpiringSoon(submission.expirationDate)
                        ? styles["expiring-soon-date"]
                        : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {formatDateShort(submission.expirationDate)}
                    {submission.status === "expired" && (
                      <span className={styles["expired-badge"]}>
                        {" "}
                        (Expired)
                      </span>
                    )}
                    {isExpiringSoon(submission.expirationDate) &&
                      submission.status !== "expired" && (
                        <span className={styles["expiring-badge"]}>
                          {" "}
                          (Expiring Soon)
                        </span>
                      )}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Field Values */}
          {submission.document.fields &&
            submission.document.fields.length > 0 && (
              <div className={styles["info-section"]}>
                <h2 className={styles["section-title"]}>Field Values</h2>
                <div className={styles["fields-grid"]}>
                  {submission.document.fields.map((field, index) => (
                    <div key={index} className={styles["field-item"]}>
                      <span className={styles["field-label"]}>
                        {field.name}
                      </span>
                      <span className={styles["field-value"]}>
                        {field.value || "Not provided"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* Uploaded Files */}
          <div className={styles["info-section"]}>
            <h2 className={styles["section-title"]}>Uploaded Files</h2>
            <div className={styles["files-list"]}>
              {submission.uploadedFiles &&
              submission.uploadedFiles.length > 0 ? (
                submission.uploadedFiles.map((file) => (
                  <div key={file.id} className={styles["file-item"]}>
                    <div className={styles["file-icon"]}>
                      <FileText size={24} />
                    </div>
                    <div className={styles["file-info"]}>
                      <span className={styles["file-name"]}>{file.name}</span>
                      <span className={styles["file-size"]}>{file.size}</span>
                    </div>
                    <div className={styles["file-actions"]}>
                      <button className={styles["action-btn"]} title="View">
                        <Eye size={16} />
                      </button>
                      <button className={styles["action-btn"]} title="Download">
                        <Download size={16} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className={styles["no-files-message"]}>
                  <FileText size={24} className={styles["no-files-icon"]} />
                  <p>No files uploaded yet</p>
                </div>
              )}
            </div>
          </div>

          {/* Rejection Reason */}
          {submission.status === "rejected" && submission.rejectionReason && (
            <div className={styles["info-section"]}>
              <h2 className={styles["section-title"]}>Rejection Reason</h2>
              <div className={styles["rejection-box"]}>
                <AlertCircle size={20} className={styles["rejection-icon"]} />
                <p>{submission.rejectionReason}</p>
              </div>
            </div>
          )}

          {/* Expired Document */}
          {submission.status === "expired" && (
            <div className={styles["info-section"]}>
              <div className={styles["status-message-box"]}>
                <div className={styles["status-message-header"]}>
                  <AlertTriangle
                    size={20}
                    className={styles["status-icon-expired"]}
                  />
                  <h3>Document Expired</h3>
                </div>
                <p className={styles["status-message-text"]}>
                  This document expired on{" "}
                  <strong>{formatDateShort(submission.expirationDate)}</strong>.
                  The status has automatically changed from "Verified" to
                  "Expired". Please upload a new version for re-verification.
                </p>
                {!showReUpload ? (
                  <button
                    className={styles["re-upload-btn"]}
                    onClick={() => setShowReUpload(true)}
                  >
                    <Upload size={16} />
                    Upload New Version
                  </button>
                ) : (
                  <div className={styles["re-upload-form"]}>
                    <h4>Upload New Version</h4>
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
                    <div className={styles["re-upload-actions"]}>
                      <button
                        className={styles["cancel-reupload-btn"]}
                        onClick={() => setShowReUpload(false)}
                      >
                        Cancel
                      </button>
                      <button className={styles["submit-reupload-btn"]}>
                        Submit for Verification
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Status Messages and Actions */}
          {submission.status === "verified" && !submission.isExpired && (
            <div className={styles["info-section"]}>
              <div className={styles["status-message-box"]}>
                <div className={styles["status-message-header"]}>
                  <CheckCircle2
                    size={20}
                    className={styles["status-icon-verified"]}
                  />
                  <h3>Document Verified</h3>
                </div>
                <p className={styles["status-message-text"]}>
                  This document has been verified and is locked. You cannot edit
                  or re-upload it.
                  {submission.expirationDate &&
                    !isExpiringSoon(submission.expirationDate) && (
                      <>
                        {" "}
                        It will expire on{" "}
                        <strong>
                          {formatDateShort(submission.expirationDate)}
                        </strong>
                        .
                      </>
                    )}
                  {submission.expirationDate &&
                    isExpiringSoon(submission.expirationDate) && (
                      <>
                        {" "}
                        <strong className={styles["expiring-warning"]}>
                          It will expire soon on{" "}
                          {formatDateShort(submission.expirationDate)}.
                        </strong>
                      </>
                    )}
                </p>
                <div className={styles["lock-indicator"]}>
                  <Lock size={16} />
                  <span>Document is locked</span>
                </div>
              </div>
            </div>
          )}

          {submission.status === "pending" && (
            <div className={styles["info-section"]}>
              <div className={styles["status-message-box"]}>
                <div className={styles["status-message-header"]}>
                  <Clock size={20} className={styles["status-icon-pending"]} />
                  <h3>Pending Verification</h3>
                </div>
                <p className={styles["status-message-text"]}>
                  Your document is pending verification. You can still upload a
                  new version before it's reviewed.
                </p>
                {!showReUpload ? (
                  <button
                    className={styles["re-upload-btn"]}
                    onClick={() => setShowReUpload(true)}
                  >
                    <Upload size={16} />
                    Upload New Version
                  </button>
                ) : (
                  <div className={styles["re-upload-form"]}>
                    <h4>Upload New Version</h4>
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
                    <div className={styles["re-upload-actions"]}>
                      <button
                        className={styles["cancel-reupload-btn"]}
                        onClick={() => setShowReUpload(false)}
                      >
                        Cancel
                      </button>
                      <button className={styles["submit-reupload-btn"]}>
                        Replace Document
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {submission.status === "rejected" && (
            <div className={styles["info-section"]}>
              <div className={styles["status-message-box"]}>
                <div className={styles["status-message-header"]}>
                  <XCircle
                    size={20}
                    className={styles["status-icon-rejected"]}
                  />
                  <h3>Document Rejected</h3>
                </div>
                <p className={styles["status-message-text"]}>
                  After reviewing the rejection reason above, you can upload a
                  new version of the document for re-evaluation.
                </p>
                {!showReUpload ? (
                  <button
                    className={styles["re-upload-btn"]}
                    onClick={() => setShowReUpload(true)}
                  >
                    <Upload size={16} />
                    Upload New Version
                  </button>
                ) : (
                  <div className={styles["re-upload-form"]}>
                    <h4>Upload New Version</h4>
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
                    <div className={styles["re-upload-actions"]}>
                      <button
                        className={styles["cancel-reupload-btn"]}
                        onClick={() => setShowReUpload(false)}
                      >
                        Cancel
                      </button>
                      <button className={styles["submit-reupload-btn"]}>
                        Submit for Re-evaluation
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentDetail;
