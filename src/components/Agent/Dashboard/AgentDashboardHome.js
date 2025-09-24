import React from "react";
import { Users, FileText, GraduationCap, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import styles from "../../User/Dashboard/DashboardHome.module.css";

const AgentDashboardHome = () => {
  const navigate = useNavigate();

  // Mock data - in real app, this would come from API
  const stats = {
    totalStudents: 12,
    activeApplications: 28,
    completedProfiles: 9,
    successRate: 85,
  };

  const handleUsersClick = () => {
    navigate("/agent/users");
  };

  const handleApplicationsClick = () => {
    navigate("/agent/applications");
  };

  return (
    <div className={styles["agent-dashboard-home"]}>
      <div className={styles["welcome-section"]}>
        <div className={styles["dashboard-icon"]}>
          <Users size={48} />
        </div>
        <h1>Agent Dashboard</h1>
        <p>Client management panel for educational consultants.</p>
        <div className={styles["status-indicator"]}>
          <span className={styles["status-dot"]}></span>
          <span>Active</span>
        </div>
      </div>

      {/* Quick Stats Widget */}
      <div className={styles["quick-stats-widget"]}>
        <div className={styles["widget-header"]}>
          <h3>Quick Overview</h3>
          <div className={styles["header-actions"]}>
            <button
              className={styles["view-all-btn"]}
              onClick={handleApplicationsClick}
            >
              View Applications
            </button>
            <button
              className={styles["view-all-btn"]}
              onClick={handleUsersClick}
            >
              View Users
            </button>
          </div>
        </div>

        <div className={styles["stats-grid"]}>
          <div
            className={[styles["stat-card"], styles["clickable"]]
              .filter(Boolean)
              .join(" ")}
            onClick={handleUsersClick}
          >
            <div className={styles["stat-icon"]}>
              <Users size={20} />
            </div>
            <div className={styles["stat-content"]}>
              <h4>{stats.totalStudents}</h4>
              <p>Students</p>
            </div>
          </div>

          <div
            className={[styles["stat-card"], styles["clickable"]]
              .filter(Boolean)
              .join(" ")}
            onClick={handleApplicationsClick}
          >
            <div className={styles["stat-icon"]}>
              <FileText size={20} />
            </div>
            <div className={styles["stat-content"]}>
              <h4>{stats.activeApplications}</h4>
              <p>Applications</p>
            </div>
          </div>

          <div className={styles["stat-card"]}>
            <div className={styles["stat-icon"]}>
              <GraduationCap size={20} />
            </div>
            <div className={styles["stat-content"]}>
              <h4>{stats.completedProfiles}</h4>
              <p>Complete Profiles</p>
            </div>
          </div>

          <div className={styles["stat-card"]}>
            <div className={styles["stat-icon"]}>
              <TrendingUp size={20} />
            </div>
            <div className={styles["stat-content"]}>
              <h4>{stats.successRate}%</h4>
              <p>Success Rate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboardHome;
