import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Circle,
  Clock,
  CheckCircle2,
  Eye,
  ArrowUpRight,
  User,
  FileText,
  Upload,
  Download,
  Edit,
  X,
} from "lucide-react";
import styles from "./ApplicationCard.module.css";

const ApplicationCard = ({ application, onClick }) => {
  const navigate = useNavigate();

  const getStatusIcon = (status) => {
    switch (status) {
      case "action-required":
        return (
          <ArrowUpRight
            size={14}
            className={[styles["status-icon"], styles["action-required"]]
              .filter(Boolean)
              .join(" ")}
          />
        );
      case "under-review":
        return (
          <Clock
            size={14}
            className={[styles["status-icon"], styles["under-review"]]
              .filter(Boolean)
              .join(" ")}
          />
        );
      case "submitted":
        return (
          <CheckCircle2
            size={14}
            className={[styles["status-icon"], styles["submitted"]]
              .filter(Boolean)
              .join(" ")}
          />
        );
      case "offer-received":
        return (
          <CheckCircle2
            size={14}
            className={[styles["status-icon"], styles["offer-received"]]
              .filter(Boolean)
              .join(" ")}
          />
        );
      case "unsuccessful":
        return (
          <X
            size={14}
            className={[styles["status-icon"], styles["unsuccessful"]]
              .filter(Boolean)
              .join(" ")}
          />
        );
      default:
        return <Circle size={14} className={styles["status-icon"]} />;
    }
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case "action-required":
        return {
          background: "#e0f2fe",
          border: "#bae6fd",
          color: "#0369a1",
          iconColor: "#0369a1",
        };
      case "under-review":
        return {
          background: "#fef3c7",
          border: "#fde68a",
          color: "#d97706",
          iconColor: "#d97706",
        };
      case "submitted":
        return {
          background: "#f0fdf4",
          border: "#bbf7d0",
          color: "#059669",
          iconColor: "#059669",
        };
      case "offer-received":
        return {
          background: "#f0fdf4",
          border: "#bbf7d0",
          color: "#059669",
          iconColor: "#059669",
        };
      case "unsuccessful":
        return {
          background: "#fef2f2",
          border: "#fecaca",
          color: "#dc2626",
          iconColor: "#dc2626",
        };
      default:
        return {
          background: "#f8fafc",
          border: "#e2e8f0",
          color: "#64748b",
          iconColor: "#94a3b8",
        };
    }
  };

  // Only show status badge when action is required
  const shouldShowStatus = application.status === "action-required";

  return (
    <div className={styles["application-card"]}>
      {/* User Info Section */}
      <div className={styles["user-info"]}>
        <div className={styles["user-avatar"]}>
          <User size={20} />
        </div>
        <div className={styles["user-details"]}>
          <h4>John Doe</h4>
          <p>@johndoe • ID: {application.id}</p>
        </div>
        {shouldShowStatus && (
          <div
            className={styles["status-badge"]}
            style={getStatusConfig(application.status)}
          >
            <span
              className={styles["status-icon-wrapper"]}
              style={{ color: getStatusConfig(application.status).iconColor }}
            >
              {getStatusIcon(application.status)}
            </span>
            <span className={styles["status-text"]}>
              {application.statusLabel}
            </span>
          </div>
        )}
      </div>

      {/* University Info */}
      <div className={styles["university-info"]}>
        <div className={styles["university-logo"]}>{application.logo}</div>
        <div className={styles["university-details"]}>
          <h3>{application.university}</h3>
          <p>{application.program}</p>
        </div>
      </div>

      {/* Next Step */}
      <div className={styles["next-step"]}>
        <h5>Next Step</h5>
        <p>{application.nextAction}</p>
      </div>

      {/* Smart List - Documents/Actions */}
      <div className={styles["smart-list"]}>
        {application.documents &&
          application.documents.slice(0, 3).map((doc, index) => (
            <div key={index} className={styles["smart-item"]}>
              <FileText size={14} />
              <span>{doc.name}</span>
              {doc.status === "submitted" ? (
                <Download size={14} className={styles["action-icon"]} />
              ) : (
                <Upload size={14} className={styles["action-icon"]} />
              )}
            </div>
          ))}
      </div>

      {/* Actions */}
      <div className={styles["card-actions"]}>
        <button
          className={styles["edit-btn"]}
          onClick={(e) => {
            e.stopPropagation();
            // Handle edit action
          }}
        >
          <Edit size={14} />
        </button>
        <button
          className={styles["view-btn"]}
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/user/applications/${application.id}`);
          }}
        >
          <Eye size={14} />
          View
        </button>
      </div>
    </div>
  );
};

export default ApplicationCard;
