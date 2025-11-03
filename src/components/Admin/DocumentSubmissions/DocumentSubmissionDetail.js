import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  Building2,
  Download,
  Eye,
  Save,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Calendar,
  X,
} from "lucide-react";
import styles from "./DocumentSubmissionDetail.module.css";

const DocumentSubmissionDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setTimeout(() => {
      // Sample submission data - replace with actual API call
      const sampleSubmission = {
        id: parseInt(id),
        user: {
          id: 101,
          name: "John Smith",
          email: "john.smith@email.com",
          phone: "+1 (555) 123-4567",
        },
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
        university: {
          id: 1,
          name: "Harvard University",
        },
        application: {
          id: 201,
          program: "Master of Computer Science",
        },
        status: "pending",
        statusLabel: "Pending Verification",
        submittedAt: "2024-12-10T10:30:00Z",
        updatedAt: "2024-12-10T10:30:00Z",
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
        fieldValues: {
          "Overall Score": "7.5",
          "Listening Score": "8.0",
          "Reading Score": "7.0",
          "Writing Score": "7.0",
          "Speaking Score": "8.0",
        },
      };

      setSubmission(sampleSubmission);
      setRejectionReason(sampleSubmission.rejectionReason || "");
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleBack = () => {
    navigate("/admin/document-submissions");
  };

  const handleStatusChange = () => {
    setErrors({});
    if (newStatus === "rejected" && !rejectionReason.trim()) {
      setErrors({ rejectionReason: "Rejection reason is required" });
      return;
    }

    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setSubmission((prev) => ({
        ...prev,
        status: newStatus,
        statusLabel:
          newStatus === "verified"
            ? "Verified"
            : newStatus === "rejected"
            ? "Rejected"
            : "Pending Verification",
        rejectionReason:
          newStatus === "rejected" ? rejectionReason.trim() : null,
        updatedAt: new Date().toISOString(),
      }));
      setIsSaving(false);
      setShowStatusModal(false);
      setNewStatus("");
      setRejectionReason("");
    }, 1000);
  };

  const openStatusModal = (status) => {
    setNewStatus(status);
    setRejectionReason(submission.rejectionReason || "");
    setErrors({});
    setShowStatusModal(true);
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
      case "pending":
      default:
        return "pending";
    }
  };

  if (loading) {
    return (
      <div className={styles["loading-container"]}>
        <div className={styles["loading-spinner"]}></div>
        <p>Loading submission details...</p>
      </div>
    );
  }

  if (!submission) {
    return (
      <div className={styles["error-container"]}>
        <h3>Submission Not Found</h3>
        <button onClick={handleBack} className={styles["back-btn"]}>
          <ArrowLeft size={16} />
          Back to Submissions
        </button>
      </div>
    );
  }

  return (
    <div className={styles["detail-container"]}>
      {/* Header */}
      <div className={styles["page-header"]}>
        <div className={styles["header-left"]}>
          <button onClick={handleBack} className={styles["back-btn"]}>
            <ArrowLeft size={20} />
          </button>
          <div className={styles["page-icon"]}>
            <FileText size={24} />
          </div>
          <div>
            <h1>Document Submission Details</h1>
            <p>Review and manage this document submission</p>
          </div>
        </div>
        <div className={styles["status-actions"]}>
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
      </div>

      <div className={styles["content-grid"]}>
        {/* Left Column - Main Info */}
        <div className={styles["main-content"]}>
          {/* Document Info */}
          <div className={styles["info-section"]}>
            <h2 className={styles["section-title"]}>Document Information</h2>
            <div className={styles["info-card"]}>
              <div className={styles["info-item"]}>
                <span className={styles["info-label"]}>Document Name</span>
                <span className={styles["info-value"]}>
                  {submission.document.name}
                </span>
              </div>
              <div className={styles["info-item"]}>
                <span className={styles["info-label"]}>Category</span>
                <span className={styles["info-value"]}>
                  {submission.document.category}
                </span>
              </div>
              <div className={styles["info-item"]}>
                <span className={styles["info-label"]}>Description</span>
                <span className={styles["info-value"]}>
                  {submission.document.description}
                </span>
              </div>
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
              {submission.uploadedFiles.map((file) => (
                <div key={file.id} className={styles["file-item"]}>
                  <div className={styles["file-icon"]}>
                    <FileText size={20} />
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
              ))}
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
        </div>

        {/* Right Column - Sidebar */}
        <div className={styles["sidebar"]}>
          {/* User Info */}
          <div className={styles["sidebar-section"]}>
            <h3 className={styles["sidebar-title"]}>User Information</h3>
            <div className={styles["user-card"]}>
              <div className={styles["user-avatar"]}>
                {submission.user.name.charAt(0)}
              </div>
              <div className={styles["user-details"]}>
                <span className={styles["user-name"]}>
                  {submission.user.name}
                </span>
                <span className={styles["user-email"]}>
                  {submission.user.email}
                </span>
                {submission.user.phone && (
                  <span className={styles["user-phone"]}>
                    {submission.user.phone}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* University & Application */}
          <div className={styles["sidebar-section"]}>
            <h3 className={styles["sidebar-title"]}>Application Context</h3>
            <div className={styles["context-info"]}>
              {submission.university && (
                <div className={styles["context-item"]}>
                  <Building2 size={16} />
                  <div>
                    <span className={styles["context-label"]}>University</span>
                    <span className={styles["context-value"]}>
                      {submission.university.name}
                    </span>
                  </div>
                </div>
              )}
              {submission.application && (
                <div className={styles["context-item"]}>
                  <FileText size={16} />
                  <div>
                    <span className={styles["context-label"]}>Program</span>
                    <span className={styles["context-value"]}>
                      {submission.application.program}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Timestamps */}
          <div className={styles["sidebar-section"]}>
            <h3 className={styles["sidebar-title"]}>Timeline</h3>
            <div className={styles["timeline"]}>
              <div className={styles["timeline-item"]}>
                <Calendar size={14} />
                <div>
                  <span className={styles["timeline-label"]}>Submitted</span>
                  <span className={styles["timeline-value"]}>
                    {formatDate(submission.submittedAt)}
                  </span>
                </div>
              </div>
              <div className={styles["timeline-item"]}>
                <Calendar size={14} />
                <div>
                  <span className={styles["timeline-label"]}>Last Updated</span>
                  <span className={styles["timeline-value"]}>
                    {formatDate(submission.updatedAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Status Actions */}
          <div className={styles["sidebar-section"]}>
            <h3 className={styles["sidebar-title"]}>Update Status</h3>
            <div className={styles["status-actions-list"]}>
              {submission.status !== "verified" && (
                <button
                  onClick={() => openStatusModal("verified")}
                  className={[
                    styles["status-action-btn"],
                    styles["verify-btn"],
                  ].join(" ")}
                >
                  <CheckCircle2 size={16} />
                  Mark as Verified
                </button>
              )}
              {submission.status !== "rejected" && (
                <button
                  onClick={() => openStatusModal("rejected")}
                  className={[
                    styles["status-action-btn"],
                    styles["reject-btn"],
                  ].join(" ")}
                >
                  <XCircle size={16} />
                  Reject Document
                </button>
              )}
              {submission.status !== "pending" && (
                <button
                  onClick={() => openStatusModal("pending")}
                  className={[
                    styles["status-action-btn"],
                    styles["pending-btn"],
                  ].join(" ")}
                >
                  <Clock size={16} />
                  Set to Pending
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Status Update Modal */}
      {showStatusModal && (
        <div
          className={styles["modal-overlay"]}
          onClick={() => setShowStatusModal(false)}
        >
          <div
            className={styles["modal-container"]}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles["modal-header"]}>
              <h2>
                {newStatus === "verified"
                  ? "Verify Document"
                  : newStatus === "rejected"
                  ? "Reject Document"
                  : "Set to Pending"}
              </h2>
              <button
                onClick={() => setShowStatusModal(false)}
                className={styles["close-btn"]}
              >
                <X size={20} />
              </button>
            </div>

            <div className={styles["modal-content"]}>
              {newStatus === "rejected" ? (
                <>
                  <p>
                    Please provide a reason for rejecting this document. This
                    reason will be visible to the user.
                  </p>
                  <div className={styles["form-group"]}>
                    <label htmlFor="rejectionReason">Rejection Reason *</label>
                    <textarea
                      id="rejectionReason"
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                      placeholder="Enter the reason for rejection..."
                      rows="5"
                      className={[
                        styles["form-textarea"],
                        errors.rejectionReason ? styles["error"] : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    />
                    {errors.rejectionReason && (
                      <span className={styles["error-message"]}>
                        {errors.rejectionReason}
                      </span>
                    )}
                  </div>
                </>
              ) : (
                <p>
                  Are you sure you want to mark this document as{" "}
                  {newStatus === "verified" ? "verified" : "pending"}?
                </p>
              )}
            </div>

            <div className={styles["modal-actions"]}>
              <button
                onClick={() => setShowStatusModal(false)}
                className={styles["cancel-btn"]}
                disabled={isSaving}
              >
                Cancel
              </button>
              <button
                onClick={handleStatusChange}
                className={styles["confirm-btn"]}
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <div className={styles["loading-spinner"]}></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    Confirm
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentSubmissionDetail;
