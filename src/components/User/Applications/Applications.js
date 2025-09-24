import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Filter,
  FileText,
  Clock,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import ApplicationCard from "../../Shared/ApplicationCard";
import { resetGoCheckState } from "../../../utils/gocheckSessionManager";
import styles from "./Applications.module.css";

const Applications = () => {
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState("all");

  // Sample data for application cards (minimal format)
  const applications = [
    {
      id: 1,
      university: "Stanford University",
      program: "Master of Computer Science",
      status: "action-required",
      statusLabel: "Action Required",
      nextAction: "Upload Your Statement of Purpose",
      deadline: "2024-12-15",
      appliedDate: "2024-10-15",
      progress: 75,
      logo: "🏛️",
      priority: "high",
    },
    {
      id: 2,
      university: "MIT",
      program: "Master of Science in AI",
      status: "awaiting-decision",
      statusLabel: "Awaiting Decision",
      nextAction: "Interview scheduled for Dec 10",
      deadline: "2024-12-20",
      appliedDate: "2024-11-01",
      progress: 100,
      logo: "🎓",
      priority: "high",
    },
    {
      id: 3,
      university: "Harvard University",
      program: "MBA",
      status: "action-required",
      statusLabel: "Action Required",
      nextAction: "Submit GMAT scores",
      deadline: "2024-12-30",
      appliedDate: "2024-11-15",
      progress: 60,
      logo: "🎯",
      priority: "medium",
    },
  ];

  const startNewApplication = () => {
    console.log(
      "Starting new application process - clearing GoCheck storage and navigating to /gocheck"
    );

    // Clear all GoCheck storage and state
    resetGoCheckState();

    // Navigate to standalone GoCheck page
    navigate("/gocheck");
  };

  const handleApplicationClick = (application) => {
    // Navigate to detailed application view using React Router
    console.log("Opening application details:", application);
    navigate(`/user/applications/${application.id}`);
  };

  const getFilteredApplications = () => {
    if (filterStatus === "all") return applications;
    return applications.filter((app) => app.status === filterStatus);
  };

  const getApplicationsByStatus = (status) => {
    return applications.filter((app) => app.status === status).length;
  };

  return (
    <div className={styles["page-content"]}>
      <div className={styles["page-header"]}>
        <div className={styles["header-content"]}>
          <h1>Applications</h1>
        </div>
        <button className={styles["btn-primary"]} onClick={startNewApplication}>
          <Plus size={16} />
          New Application
        </button>
      </div>

      {/* Quick Stats */}
      <div className={styles["quick-stats"]}>
        <div className={styles["stat-card"]}>
          <div className={styles["stat-icon"]}>
            <AlertTriangle size={24} />
          </div>
          <div className={styles["stat-content"]}>
            <h3>{getApplicationsByStatus("action-required")}</h3>
            <p>Action Required</p>
          </div>
        </div>
        <div className={styles["stat-card"]}>
          <div className={styles["stat-icon"]}>
            <Clock size={24} />
          </div>
          <div className={styles["stat-content"]}>
            <h3>{getApplicationsByStatus("awaiting-decision")}</h3>
            <p>Awaiting Decision</p>
          </div>
        </div>
        <div className={styles["stat-card"]}>
          <div className={styles["stat-icon"]}>
            <CheckCircle2 size={24} />
          </div>
          <div className={styles["stat-content"]}>
            <h3>{getApplicationsByStatus("final-outcome")}</h3>
            <p>Final Outcome</p>
          </div>
        </div>
      </div>

      {/* Smart Triage Filters */}
      <div className={styles["triage-filters"]}>
        <div className={styles["filters-header"]}>
          <Filter size={20} />
          <h3>Filter Applications</h3>
        </div>
        <div className={styles["filter-buttons"]}>
          <button
            className={[
              styles["filter-btn"],
              filterStatus === "all" ? styles["active"] : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onClick={() => setFilterStatus("all")}
          >
            All Applications ({applications.length})
          </button>
          <button
            className={[
              styles["filter-btn"],
              filterStatus === "action-required" ? styles["active"] : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onClick={() => setFilterStatus("action-required")}
          >
            <AlertTriangle size={16} />
            Action Required ({getApplicationsByStatus("action-required")})
          </button>
          <button
            className={[
              styles["filter-btn"],
              filterStatus === "awaiting-decision" ? styles["active"] : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onClick={() => setFilterStatus("awaiting-decision")}
          >
            <Clock size={16} />
            Awaiting Decision ({getApplicationsByStatus("awaiting-decision")})
          </button>
          <button
            className={[
              styles["filter-btn"],
              filterStatus === "final-outcome" ? styles["active"] : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onClick={() => setFilterStatus("final-outcome")}
          >
            <CheckCircle2 size={16} />
            Final Outcome ({getApplicationsByStatus("final-outcome")})
          </button>
        </div>
      </div>

      {/* Application Cards Grid */}
      <div className={styles["applications-grid"]}>
        {getFilteredApplications().map((application) => (
          <ApplicationCard
            key={application.id}
            application={application}
            onClick={handleApplicationClick}
          />
        ))}

        {/* Empty State */}
        {getFilteredApplications().length === 0 && (
          <div className={styles["empty-state"]}>
            <div className={styles["empty-icon"]}>
              <FileText size={48} />
            </div>
            <h3>No applications found</h3>
            <p>
              No applications match your current filter. Try selecting a
              different filter or add a new application.
            </p>
            <button
              className={styles["add-application-btn"]}
              onClick={startNewApplication}
            >
              <Plus size={20} />
              Create New Application
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Applications;
