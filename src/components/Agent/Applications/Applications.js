import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Search,
  Eye,
  MapPin,
  Clock,
  CheckCircle2,
  AlertTriangle,
  MoreVertical,
  Plus,
} from "lucide-react";
import styles from "./Applications.module.css";

const Applications = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterUser, setFilterUser] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [filterCountry, setFilterCountry] = useState("all");

  // Mock applications data - in real app, this would come from API
  const applications = [
    {
      id: 1,
      userId: 1,
      userName: "John Smith",
      userEmail: "john.smith@email.com",
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
    },
    {
      id: 2,
      userId: 1,
      userName: "John Smith",
      userEmail: "john.smith@email.com",
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
      country: "United States",
      intake: "Fall 2025",
    },
    {
      id: 3,
      userId: 2,
      userName: "Sarah Johnson",
      userEmail: "sarah.j@email.com",
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
      country: "United States",
      intake: "Fall 2025",
    },
    {
      id: 4,
      userId: 3,
      userName: "Michael Chen",
      userEmail: "m.chen@email.com",
      university: "University of Toronto",
      program: "Master of Data Science",
      status: "final-outcome",
      statusLabel: "Accepted",
      nextAction: "Accept offer by Jan 15",
      deadline: "2024-12-10",
      appliedDate: "2024-10-01",
      progress: 100,
      logo: "🍁",
      priority: "high",
      country: "Canada",
      intake: "Fall 2025",
    },
    {
      id: 5,
      userId: 2,
      userName: "Sarah Johnson",
      userEmail: "sarah.j@email.com",
      university: "University of Cambridge",
      program: "Master of Philosophy",
      status: "awaiting-decision",
      statusLabel: "Under Review",
      nextAction: "Wait for decision",
      deadline: "2024-12-25",
      appliedDate: "2024-11-20",
      progress: 90,
      logo: "🏰",
      priority: "medium",
      country: "United Kingdom",
      intake: "Fall 2025",
    },
  ];

  const handleApplicationClick = (applicationId) => {
    navigate(`/agent/applications/${applicationId}`);
  };

  const handleUserClick = (userId) => {
    navigate(`/agent/users/${userId}`);
  };

  const handleCreateApplication = () => {
    navigate("/agent/applications/create");
  };

  const getFilteredApplications = () => {
    let filtered = applications;

    // Filter by user
    if (filterUser !== "all") {
      filtered = filtered.filter((app) => app.userId.toString() === filterUser);
    }

    // Filter by status
    if (filterStatus !== "all") {
      filtered = filtered.filter((app) => app.status === filterStatus);
    }

    // Filter by priority
    if (filterPriority !== "all") {
      filtered = filtered.filter((app) => app.priority === filterPriority);
    }

    // Filter by country
    if (filterCountry !== "all") {
      filtered = filtered.filter((app) => app.country === filterCountry);
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (app) =>
          app.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.program.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.userEmail.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
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
      "final-outcome": {
        label: "Final Outcome",
        className: "status-final",
      },
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

  const getApplicationsByStatus = (status) => {
    return applications.filter((app) => app.status === status).length;
  };

  const getUniqueUsers = () => {
    const users = applications.reduce((acc, app) => {
      if (!acc.find((user) => user.id === app.userId)) {
        acc.push({
          id: app.userId,
          name: app.userName,
          email: app.userEmail,
        });
      }
      return acc;
    }, []);
    return users;
  };

  const getUniqueCountries = () => {
    const countries = [...new Set(applications.map((app) => app.country))];
    return countries.sort();
  };

  const getTotalApplications = () => applications.length;
  const getActionRequiredCount = () =>
    getApplicationsByStatus("action-required");
  const getAwaitingDecisionCount = () =>
    getApplicationsByStatus("awaiting-decision");
  const getFinalOutcomeCount = () => getApplicationsByStatus("final-outcome");

  return (
    <div className={styles["page-content"]}>
      {/* Page Header */}
      <div className={styles["page-header"]}>
        <div className={styles["header-content"]}>
          <h1>Applications</h1>
          <p>Manage and track all student applications</p>
        </div>
        <button
          className={styles["btn-primary"]}
          onClick={handleCreateApplication}
        >
          <Plus size={16} />
          New Application
        </button>
      </div>

      {/* Statistics Widgets */}
      <div className={styles["stats-grid"]}>
        <div className={styles["stat-card"]}>
          <div className={styles["stat-icon"]}>
            <FileText size={24} />
          </div>
          <div className={styles["stat-content"]}>
            <h3>{getTotalApplications()}</h3>
            <p>Total Applications</p>
          </div>
        </div>
        <div className={styles["stat-card"]}>
          <div className={styles["stat-icon"]}>
            <AlertTriangle size={24} />
          </div>
          <div className={styles["stat-content"]}>
            <h3>{getActionRequiredCount()}</h3>
            <p>Action Required</p>
          </div>
        </div>
        <div className={styles["stat-card"]}>
          <div className={styles["stat-icon"]}>
            <Clock size={24} />
          </div>
          <div className={styles["stat-content"]}>
            <h3>{getAwaitingDecisionCount()}</h3>
            <p>Awaiting Decision</p>
          </div>
        </div>
        <div className={styles["stat-card"]}>
          <div className={styles["stat-icon"]}>
            <CheckCircle2 size={24} />
          </div>
          <div className={styles["stat-content"]}>
            <h3>{getFinalOutcomeCount()}</h3>
            <p>Final Outcome</p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className={styles["search-filters"]}>
        <div className={styles["search-box"]}>
          <Search size={20} />
          <input
            type="text"
            placeholder="Search applications by university, program, or student..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className={styles["filter-controls"]}>
          <div className={styles["filter-group"]}>
            <label>User</label>
            <select
              value={filterUser}
              onChange={(e) => setFilterUser(e.target.value)}
            >
              <option value="all">All Users</option>
              {getUniqueUsers().map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles["filter-group"]}>
            <label>Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="action-required">Action Required</option>
              <option value="awaiting-decision">Awaiting Decision</option>
              <option value="final-outcome">Final Outcome</option>
            </select>
          </div>
          <div className={styles["filter-group"]}>
            <label>Priority</label>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
            >
              <option value="all">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div className={styles["filter-group"]}>
            <label>Country</label>
            <select
              value={filterCountry}
              onChange={(e) => setFilterCountry(e.target.value)}
            >
              <option value="all">All Countries</option>
              {getUniqueCountries().map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className={styles["applications-container"]}>
        <div className={styles["table-header"]}>
          <h3>Applications ({getFilteredApplications().length})</h3>
        </div>

        <div className={styles["table-container"]}>
          <div className={styles["table-header-row"]}>
            <div
              className={[styles["table-cell"], styles["header-cell"]]
                .filter(Boolean)
                .join(" ")}
            >
              University
            </div>
            <div
              className={[styles["table-cell"], styles["header-cell"]]
                .filter(Boolean)
                .join(" ")}
            >
              Student
            </div>
            <div
              className={[styles["table-cell"], styles["header-cell"]]
                .filter(Boolean)
                .join(" ")}
            >
              Status
            </div>
            <div
              className={[styles["table-cell"], styles["header-cell"]]
                .filter(Boolean)
                .join(" ")}
            >
              Priority
            </div>
            <div
              className={[styles["table-cell"], styles["header-cell"]]
                .filter(Boolean)
                .join(" ")}
            >
              Progress
            </div>
            <div
              className={[styles["table-cell"], styles["header-cell"]]
                .filter(Boolean)
                .join(" ")}
            >
              Deadline
            </div>
            <div
              className={[
                styles["table-cell"],
                styles["header-cell"],
                styles["actions-header"],
              ]
                .filter(Boolean)
                .join(" ")}
            >
              Actions
            </div>
          </div>

          <div className={styles["table-body"]}>
            {getFilteredApplications().map((application) => (
              <div
                key={application.id}
                className={styles["table-row"]}
                onClick={() => handleApplicationClick(application.id)}
              >
                <div
                  className={[styles["table-cell"], styles["university-cell"]]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <div className={styles["university-info"]}>
                    <div className={styles["university-logo"]}>
                      {application.logo}
                    </div>
                    <div className={styles["university-details"]}>
                      <h4>{application.university}</h4>
                      <p>{application.program}</p>
                      <div className={styles["university-meta"]}>
                        <span className={styles["country"]}>
                          <MapPin size={12} />
                          {application.country}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={[styles["table-cell"], styles["student-cell"]]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <div className={styles["student-info"]}>
                    <div className={styles["user-avatar"]}>
                      {application.userName
                        .split(" ")
                        .map((n) => n[0])
                        .join(" ")}
                    </div>
                    <div className={styles["student-details"]}>
                      <h4
                        className={styles["user-name"]}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUserClick(application.userId);
                        }}
                      >
                        {application.userName}
                      </h4>
                      <p className={styles["user-email"]}>
                        {application.userEmail}
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className={[styles["table-cell"], styles["status-cell"]]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {getStatusBadge(application.status)}
                </div>

                <div
                  className={[styles["table-cell"], styles["priority-cell"]]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {getPriorityBadge(application.priority)}
                </div>

                <div
                  className={[styles["table-cell"], styles["progress-cell"]]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <div className={styles["progress-info"]}>
                    <span className={styles["progress-percentage"]}>
                      {application.progress}%
                    </span>
                    <div className={styles["progress-bar"]}>
                      <div
                        className={styles["progress-fill"]}
                        style={{ width: `${application.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div
                  className={[styles["table-cell"], styles["deadline-cell"]]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <div className={styles["deadline-info"]}>
                    <span className={styles["deadline-date"]}>
                      {new Date(application.deadline).toLocaleDateString()}
                    </span>
                    <span className={styles["applied-date"]}>
                      Applied:{" "}
                      {new Date(application.appliedDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div
                  className={[styles["table-cell"], styles["actions-cell"]]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className={[styles["action-btn"], styles["view-btn"]]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={() => handleApplicationClick(application.id)}
                    title="View Details"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    className={[styles["action-btn"], styles["menu-btn"]]
                      .filter(Boolean)
                      .join(" ")}
                    title="More Options"
                  >
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {getFilteredApplications().length === 0 && (
          <div className={styles["empty-state"]}>
            <div className={styles["empty-icon"]}>
              <FileText size={48} />
            </div>
            <h3>No applications found</h3>
            <p>
              {searchTerm ||
              filterUser !== "all" ||
              filterStatus !== "all" ||
              filterPriority !== "all" ||
              filterCountry !== "all"
                ? "No applications match your current search or filter criteria."
                : "No applications have been created yet. Start by adding your first application."}
            </p>
            <button
              className={styles["btn-primary"]}
              onClick={handleCreateApplication}
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
