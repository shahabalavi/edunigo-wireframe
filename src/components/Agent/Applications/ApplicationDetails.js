import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Edit,
  FileText,
  User,
  Calendar,
  MapPin,
  GraduationCap,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Eye,
  Download,
} from "lucide-react";
import styles from "./ApplicationDetails.module.css";

const ApplicationDetails = () => {
  const { applicationId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock application data - in real app, fetch based on applicationId
  const application = {
    id: parseInt(applicationId),
    userId: 1,
    userName: "John Smith",
    userEmail: "john.smith@email.com",
    userPhone: "+1 (555) 123-4567",
    university: "Stanford University",
    program: "Master of Computer Science",
    status: "action-required",
    statusLabel: "Action Required",
    nextAction: "Upload Statement of Purpose",
    deadline: "2024-12-15",
    appliedDate: "2024-10-15",
    progress: 75,
    logo: "🏛️",
    priority: "high",
    country: "United States",
    intake: "Fall 2025",
    requirements: [
      { name: "Statement of Purpose", status: "pending", due: "2024-12-15" },
      { name: "Official Transcripts", status: "completed", due: "2024-12-10" },
      {
        name: "Letters of Recommendation",
        status: "completed",
        due: "2024-12-05",
      },
      { name: "GRE Scores", status: "completed", due: "2024-11-30" },
      { name: "TOEFL Scores", status: "completed", due: "2024-11-25" },
    ],
    documents: [
      {
        name: "Transcript_John_Smith.pdf",
        type: "transcript",
        uploaded: "2024-11-20",
        size: "2.3 MB",
      },
      {
        name: "SOP_Draft_v2.pdf",
        type: "statement",
        uploaded: "2024-11-25",
        size: "1.1 MB",
      },
      {
        name: "LOR_Professor_Johnson.pdf",
        type: "recommendation",
        uploaded: "2024-11-28",
        size: "0.8 MB",
      },
    ],
    timeline: [
      {
        date: "2024-11-28",
        action: "Letter of Recommendation submitted",
        status: "completed",
      },
      {
        date: "2024-11-25",
        action: "Statement of Purpose draft uploaded",
        status: "pending",
      },
      {
        date: "2024-11-20",
        action: "Official transcripts submitted",
        status: "completed",
      },
      {
        date: "2024-11-15",
        action: "Application submitted",
        status: "completed",
      },
      {
        date: "2024-11-01",
        action: "Application started",
        status: "completed",
      },
    ],
  };

  const handleBack = () => {
    navigate("/agent/applications");
  };

  const handleEdit = () => {
    navigate(`/agent/applications/${applicationId}/edit`);
  };

  const handleUserClick = () => {
    navigate(`/agent/users/${application.userId}`);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      "action-required": {
        label: "Action Required",
        className: "status-action",
      },
      "awaiting-decision": {
        label: "Awaiting Decision",
        className: "status-waiting",
      },
      "final-outcome": { label: "Final Outcome", className: "status-final" },
    };

    const config = statusConfig[status] || statusConfig["action-required"];
    return (
      <span
        className={[styles["status-badge"], styles[config.className]]
          .filter(Boolean)
          .join(" ")}
      >
        {config.label}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      high: { label: "High", className: "priority-high" },
      medium: { label: "Medium", className: "priority-medium" },
      low: { label: "Low", className: "priority-low" },
    };

    const config = priorityConfig[priority] || priorityConfig.medium;
    return (
      <span
        className={[styles["priority-badge"], styles[config.className]]
          .filter(Boolean)
          .join(" ")}
      >
        {config.label}
      </span>
    );
  };

  const getRequirementStatus = (status) => {
    const statusConfig = {
      completed: { label: "Completed", className: "req-completed" },
      pending: { label: "Pending", className: "req-pending" },
      overdue: { label: "Overdue", className: "req-overdue" },
    };

    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span
        className={[styles["requirement-status"], styles[config.className]]
          .filter(Boolean)
          .join(" ")}
      >
        {config.label}
      </span>
    );
  };

  const renderOverviewTab = () => (
    <div className={styles["overview-content"]}>
      <div className={styles["overview-sections"]}>
        {/* Application Summary */}
        <div className={styles["overview-section"]}>
          <div className={styles["section-header"]}>
            <FileText size={20} />
            <h3>Application Summary</h3>
          </div>
          <div className={styles["summary-grid"]}>
            <div className={styles["summary-item"]}>
              <label>University</label>
              <span>{application.university}</span>
            </div>
            <div className={styles["summary-item"]}>
              <label>Program</label>
              <span>{application.program}</span>
            </div>
            <div className={styles["summary-item"]}>
              <label>Country</label>
              <span>{application.country}</span>
            </div>
            <div className={styles["summary-item"]}>
              <label>Intake</label>
              <span>{application.intake}</span>
            </div>
            <div className={styles["summary-item"]}>
              <label>Applied Date</label>
              <span>
                {new Date(application.appliedDate).toLocaleDateString()}
              </span>
            </div>
            <div className={styles["summary-item"]}>
              <label>Deadline</label>
              <span>{new Date(application.deadline).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Student Information */}
        <div className={styles["overview-section"]}>
          <div className={styles["section-header"]}>
            <User size={20} />
            <h3>Student Information</h3>
          </div>
          <div className={styles["student-info"]}>
            <div className={styles["student-avatar"]}>
              {application.userName
                .split(" ")
                .map((n) => n[0])
                .join(" ")}
            </div>
            <div className={styles["student-details"]}>
              <h4 className={styles["student-name"]} onClick={handleUserClick}>
                {application.userName}
              </h4>
              <p className={styles["student-email"]}>{application.userEmail}</p>
              <p className={styles["student-phone"]}>{application.userPhone}</p>
            </div>
          </div>
        </div>

        {/* Application Progress */}
        <div className={styles["overview-section"]}>
          <div className={styles["section-header"]}>
            <GraduationCap size={20} />
            <h3>Application Progress</h3>
          </div>
          <div className={styles["progress-section"]}>
            <div className={styles["progress-info"]}>
              <span className={styles["progress-percentage"]}>
                {application.progress}% Complete
              </span>
              <span className={styles["progress-status"]}>
                {application.statusLabel}
              </span>
            </div>
            <div className={styles["progress-bar"]}>
              <div
                className={styles["progress-fill"]}
                style={{ width: `${application.progress}%` }}
              ></div>
            </div>
            <div className={styles["next-action-info"]}>
              <div className={styles["action-icon"]}>
                <AlertTriangle size={16} />
              </div>
              <div className={styles["action-details"]}>
                <span className={styles["action-label"]}>
                  Next Action Required:
                </span>
                <span className={styles["action-text"]}>
                  {application.nextAction}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderRequirementsTab = () => (
    <div className={styles["requirements-content"]}>
      <div className={styles["requirements-list"]}>
        {application.requirements.map((req, index) => (
          <div key={index} className={styles["requirement-item"]}>
            <div className={styles["requirement-header"]}>
              <div className={styles["requirement-info"]}>
                <h4>{req.name}</h4>
                <span className={styles["requirement-due"]}>
                  Due: {new Date(req.due).toLocaleDateString()}
                </span>
              </div>
              {getRequirementStatus(req.status)}
            </div>
            <div className={styles["requirement-progress"]}>
              <div
                className={[styles["progress-indicator"], styles[req.status]]
                  .filter(Boolean)
                  .join(" ")}
              >
                {req.status === "completed" ? (
                  <CheckCircle2 size={16} />
                ) : req.status === "overdue" ? (
                  <AlertTriangle size={16} />
                ) : (
                  <Clock size={16} />
                )}
              </div>
              <span className={styles["progress-text"]}>
                {req.status === "completed"
                  ? "Completed"
                  : req.status === "overdue"
                  ? "Overdue"
                  : "Pending"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDocumentsTab = () => (
    <div className={styles["documents-content"]}>
      <div className={styles["documents-list"]}>
        {application.documents.map((doc, index) => (
          <div key={index} className={styles["document-item"]}>
            <div className={styles["document-icon"]}>
              <FileText size={20} />
            </div>
            <div className={styles["document-info"]}>
              <h4>{doc.name}</h4>
              <div className={styles["document-meta"]}>
                <span>Type: {doc.type}</span>
                <span>Size: {doc.size}</span>
                <span>
                  Uploaded: {new Date(doc.uploaded).toLocaleDateString()}
                </span>
              </div>
            </div>
            <div className={styles["document-actions"]}>
              <button
                className={[styles["action-btn"], styles["view-btn"]]
                  .filter(Boolean)
                  .join(" ")}
                title="View Document"
              >
                <Eye size={16} />
              </button>
              <button
                className={[styles["action-btn"], styles["download-btn"]]
                  .filter(Boolean)
                  .join(" ")}
                title="Download"
              >
                <Download size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTimelineTab = () => (
    <div className={styles["timeline-content"]}>
      <div className={styles["timeline-list"]}>
        {application.timeline.map((event, index) => (
          <div key={index} className={styles["timeline-item"]}>
            <div className={styles["timeline-dot"]}>
              {event.status === "completed" ? (
                <CheckCircle2 size={16} />
              ) : (
                <Clock size={16} />
              )}
            </div>
            <div className={styles["timeline-content"]}>
              <div className={styles["timeline-header"]}>
                <span className={styles["timeline-date"]}>
                  {new Date(event.date).toLocaleDateString()}
                </span>
                <span
                  className={[styles["timeline-status"], styles[event.status]]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {event.status === "completed" ? "Completed" : "In Progress"}
                </span>
              </div>
              <p className={styles["timeline-action"]}>{event.action}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className={styles["page-content"]}>
      {/* Page Header */}
      <div className={styles["page-header"]}>
        <div className={styles["header-left"]}>
          <button className={styles["back-btn"]} onClick={handleBack}>
            <ArrowLeft size={16} />
            Back to Applications
          </button>
          <div className={styles["header-content"]}>
            <h1>Application Details</h1>
            <p>View and manage application information</p>
          </div>
        </div>
        <button className={styles["btn-primary"]} onClick={handleEdit}>
          <Edit size={16} />
          Edit Application
        </button>
      </div>

      {/* Application Summary Card */}
      <div className={styles["application-summary-card"]}>
        <div className={styles["summary-left"]}>
          <div className={styles["university-logo"]}>{application.logo}</div>
          <div className={styles["application-basic-info"]}>
            <h2>{application.university}</h2>
            <p className={styles["program-name"]}>{application.program}</p>
            <div className={styles["application-meta"]}>
              <div className={styles["meta-item"]}>
                <MapPin size={14} />
                <span>{application.country}</span>
              </div>
              <div className={styles["meta-item"]}>
                <Calendar size={14} />
                <span>{application.intake}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles["summary-right"]}>
          <div className={styles["summary-badges"]}>
            {getStatusBadge(application.status)}
            {getPriorityBadge(application.priority)}
          </div>
          <div className={styles["summary-stats"]}>
            <div className={styles["stat-item"]}>
              <span className={styles["stat-label"]}>Progress</span>
              <span className={styles["stat-value"]}>
                {application.progress}%
              </span>
            </div>
            <div className={styles["stat-item"]}>
              <span className={styles["stat-label"]}>Applied</span>
              <span className={styles["stat-value"]}>
                {new Date(application.appliedDate).toLocaleDateString()}
              </span>
            </div>
            <div className={styles["stat-item"]}>
              <span className={styles["stat-label"]}>Deadline</span>
              <span className={styles["stat-value"]}>
                {new Date(application.deadline).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className={styles["tabs-nav"]}>
        <button
          className={[
            styles["tab-btn"],
            activeTab === "overview" ? styles["active"] : "",
          ]
            .filter(Boolean)
            .join(" ")}
          onClick={() => setActiveTab("overview")}
        >
          <FileText size={16} />
          Overview
        </button>
        <button
          className={[
            styles["tab-btn"],
            activeTab === "requirements" ? styles["active"] : "",
          ]
            .filter(Boolean)
            .join(" ")}
          onClick={() => setActiveTab("requirements")}
        >
          <CheckCircle2 size={16} />
          Requirements
        </button>
        <button
          className={[
            styles["tab-btn"],
            activeTab === "documents" ? styles["active"] : "",
          ]
            .filter(Boolean)
            .join(" ")}
          onClick={() => setActiveTab("documents")}
        >
          <FileText size={16} />
          Documents
        </button>
        <button
          className={[
            styles["tab-btn"],
            activeTab === "timeline" ? styles["active"] : "",
          ]
            .filter(Boolean)
            .join(" ")}
          onClick={() => setActiveTab("timeline")}
        >
          <Clock size={16} />
          Timeline
        </button>
      </div>

      {/* Tab Content */}
      <div className={styles["tab-content"]}>
        {activeTab === "overview" && renderOverviewTab()}
        {activeTab === "requirements" && renderRequirementsTab()}
        {activeTab === "documents" && renderDocumentsTab()}
        {activeTab === "timeline" && renderTimelineTab()}
      </div>
    </div>
  );
};

export default ApplicationDetails;
