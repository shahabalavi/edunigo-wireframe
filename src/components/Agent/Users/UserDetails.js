import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Edit,
  FileText,
  Phone,
  Mail,
  MapPin,
  Calendar,
  GraduationCap,
  User,
  Activity,
  Plus,
  Eye,
} from "lucide-react";
import styles from "./UserDetails.module.css";

const UserDetails = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");

  // Mock user data - in real app, fetch based on userId
  const user = {
    id: parseInt(userId),
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1 (555) 123-4567",
    status: "active",
    country: "United States",
    city: "New York",
    dateOfBirth: "1995-06-15",
    nationality: "American",
    passportNumber: "123456789",
    joinedDate: "2024-01-01",
    lastActivity: "2024-01-16",
    completedProfile: 85,
    avatar: "JS",
    education: {
      degree: "Bachelor of Science",
      major: "Computer Science",
      institution: "State University",
      graduationYear: "2017",
      gpa: "3.7",
    },
    applications: [
      {
        id: 1,
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
    ],
  };

  const handleBack = () => {
    navigate("/agent/users");
  };

  const handleEdit = () => {
    navigate(`/agent/users/${userId}/edit`);
  };

  const handleApplicationClick = (applicationId) => {
    navigate(`/agent/users/${userId}/applications/${applicationId}`);
  };

  const handleCreateApplication = () => {
    navigate(`/agent/users/${userId}/applications/create`);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { label: "Active", className: "status-active" },
      pending: { label: "Pending", className: "status-pending" },
      inactive: { label: "Inactive", className: "status-inactive" },
    };

    const config = statusConfig[status] || statusConfig.pending;
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

  const getApplicationStatusBadge = (status) => {
    const statusConfig = {
      "action-required": {
        label: "Action Required",
        className: "app-status-action",
      },
      "awaiting-decision": {
        label: "Awaiting Decision",
        className: "app-status-waiting",
      },
      "final-outcome": {
        label: "Final Outcome",
        className: "app-status-final",
      },
    };

    const config = statusConfig[status] || statusConfig["action-required"];
    return (
      <span
        className={[styles["app-status-badge"], styles[config.className]]
          .filter(Boolean)
          .join(" ")}
      >
        {config.label}
      </span>
    );
  };

  const renderProfileTab = () => (
    <div className={styles["profile-content"]}>
      <div className={styles["profile-sections"]}>
        {/* Personal Information */}
        <div className={styles["profile-section"]}>
          <div className={styles["section-header"]}>
            <User size={20} />
            <h3>Personal Information</h3>
          </div>
          <div className={styles["info-grid"]}>
            <div className={styles["info-item"]}>
              <label>Full Name</label>
              <span>{user.name}</span>
            </div>
            <div className={styles["info-item"]}>
              <label>Date of Birth</label>
              <span>{new Date(user.dateOfBirth).toLocaleDateString()}</span>
            </div>
            <div className={styles["info-item"]}>
              <label>Nationality</label>
              <span>{user.nationality}</span>
            </div>
            <div className={styles["info-item"]}>
              <label>Passport Number</label>
              <span>{user.passportNumber}</span>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className={styles["profile-section"]}>
          <div className={styles["section-header"]}>
            <Mail size={20} />
            <h3>Contact Information</h3>
          </div>
          <div className={styles["info-grid"]}>
            <div className={styles["info-item"]}>
              <label>Email Address</label>
              <span>{user.email}</span>
            </div>
            <div className={styles["info-item"]}>
              <label>Phone Number</label>
              <span>{user.phone}</span>
            </div>
            <div className={styles["info-item"]}>
              <label>Country</label>
              <span>{user.country}</span>
            </div>
            <div className={styles["info-item"]}>
              <label>City</label>
              <span>{user.city}</span>
            </div>
          </div>
        </div>

        {/* Educational Background */}
        <div className={styles["profile-section"]}>
          <div className={styles["section-header"]}>
            <GraduationCap size={20} />
            <h3>Educational Background</h3>
          </div>
          <div className={styles["info-grid"]}>
            <div className={styles["info-item"]}>
              <label>Degree</label>
              <span>{user.education.degree}</span>
            </div>
            <div className={styles["info-item"]}>
              <label>Major</label>
              <span>{user.education.major}</span>
            </div>
            <div className={styles["info-item"]}>
              <label>Institution</label>
              <span>{user.education.institution}</span>
            </div>
            <div className={styles["info-item"]}>
              <label>Graduation Year</label>
              <span>{user.education.graduationYear}</span>
            </div>
            <div className={styles["info-item"]}>
              <label>GPA</label>
              <span>{user.education.gpa}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderApplicationsTab = () => (
    <div className={styles["applications-content"]}>
      <div className={styles["applications-header"]}>
        <h3>Applications ({user.applications.length})</h3>
        <button
          className={styles["btn-primary"]}
          onClick={handleCreateApplication}
        >
          <Plus size={16} />
          Create Application
        </button>
      </div>

      <div className={styles["applications-list"]}>
        {user.applications.map((application) => (
          <div
            key={application.id}
            className={styles["application-card"]}
            onClick={() => handleApplicationClick(application.id)}
          >
            <div className={styles["app-header"]}>
              <div className={styles["app-info"]}>
                <div className={styles["app-logo"]}>{application.logo}</div>
                <div className={styles["app-details"]}>
                  <h4>{application.university}</h4>
                  <p>{application.program}</p>
                </div>
              </div>
              {getApplicationStatusBadge(application.status)}
            </div>

            <div className={styles["app-progress"]}>
              <div className={styles["progress-info"]}>
                <span>Progress: {application.progress}%</span>
                <span>
                  Applied:{" "}
                  {new Date(application.appliedDate).toLocaleDateString()}
                </span>
              </div>
              <div className={styles["progress-bar"]}>
                <div
                  className={styles["progress-fill"]}
                  style={{ width: `${application.progress}%` }}
                ></div>
              </div>
            </div>

            <div className={styles["app-next-action"]}>
              <div className={styles["action-icon"]}>
                <Activity size={16} />
              </div>
              <div className={styles["action-details"]}>
                <span className={styles["action-label"]}>Next Action:</span>
                <span className={styles["action-text"]}>
                  {application.nextAction}
                </span>
              </div>
            </div>

            <div className={styles["app-meta"]}>
              <div className={styles["meta-item"]}>
                <Calendar size={14} />
                <span>
                  Deadline:{" "}
                  {new Date(application.deadline).toLocaleDateString()}
                </span>
              </div>
              <div className={styles["app-actions"]}>
                <button
                  className={styles["action-btn"]}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleApplicationClick(application.id);
                  }}
                >
                  <Eye size={14} />
                  View
                </button>
              </div>
            </div>
          </div>
        ))}

        {user.applications.length === 0 && (
          <div className={styles["empty-applications"]}>
            <div className={styles["empty-icon"]}>
              <FileText size={48} />
            </div>
            <h4>No Applications Yet</h4>
            <p>
              This student hasn't started any applications. Help them get
              started!
            </p>
            <button
              className={styles["btn-primary"]}
              onClick={handleCreateApplication}
            >
              <Plus size={20} />
              Create First Application
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const renderActivityTab = () => (
    <div className={styles["activity-content"]}>
      <div className={styles["activity-timeline"]}>
        <div className={styles["timeline-item"]}>
          <div className={styles["timeline-dot"]}></div>
          <div className={styles["timeline-content"]}>
            <div className={styles["activity-header"]}>
              <span className={styles["activity-action"]}>Profile Updated</span>
              <span className={styles["activity-time"]}>2 hours ago</span>
            </div>
            <p className={styles["activity-description"]}>
              Updated contact information and educational background
            </p>
          </div>
        </div>

        <div className={styles["timeline-item"]}>
          <div className={styles["timeline-dot"]}></div>
          <div className={styles["timeline-content"]}>
            <div className={styles["activity-header"]}>
              <span className={styles["activity-action"]}>
                Application Submitted
              </span>
              <span className={styles["activity-time"]}>1 day ago</span>
            </div>
            <p className={styles["activity-description"]}>
              Submitted application to Stanford University
            </p>
          </div>
        </div>

        <div className={styles["timeline-item"]}>
          <div className={styles["timeline-dot"]}></div>
          <div className={styles["timeline-content"]}>
            <div className={styles["activity-header"]}>
              <span className={styles["activity-action"]}>
                Document Uploaded
              </span>
              <span className={styles["activity-time"]}>3 days ago</span>
            </div>
            <p className={styles["activity-description"]}>
              Uploaded transcript and recommendation letters
            </p>
          </div>
        </div>

        <div className={styles["timeline-item"]}>
          <div className={styles["timeline-dot"]}></div>
          <div className={styles["timeline-content"]}>
            <div className={styles["activity-header"]}>
              <span className={styles["activity-action"]}>Account Created</span>
              <span className={styles["activity-time"]}>2 weeks ago</span>
            </div>
            <p className={styles["activity-description"]}>
              Student account was created and profile setup began
            </p>
          </div>
        </div>
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
            Back to Users
          </button>
          <div className={styles["header-content"]}>
            <h1>{user.name}</h1>
            <p>Student Details & Application Management</p>
          </div>
        </div>
        <button className={styles["btn-primary"]} onClick={handleEdit}>
          <Edit size={16} />
          Edit Profile
        </button>
      </div>

      {/* User Summary Card */}
      <div className={styles["user-summary-card"]}>
        <div className={styles["summary-left"]}>
          <div className={styles["user-avatar"]}>{user.avatar}</div>
          <div className={styles["user-basic-info"]}>
            <h2>{user.name}</h2>
            <div className={styles["user-meta"]}>
              <div className={styles["meta-item"]}>
                <Mail size={14} />
                <span>{user.email}</span>
              </div>
              <div className={styles["meta-item"]}>
                <Phone size={14} />
                <span>{user.phone}</span>
              </div>
              <div className={styles["meta-item"]}>
                <MapPin size={14} />
                <span>
                  {user.city}, {user.country}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles["summary-right"]}>
          <div className={styles["summary-stats"]}>
            <div className={styles["stat-item"]}>
              <span className={styles["stat-label"]}>Status</span>
              {getStatusBadge(user.status)}
            </div>
            <div className={styles["stat-item"]}>
              <span className={styles["stat-label"]}>Applications</span>
              <span className={styles["stat-value"]}>
                {user.applications.length}
              </span>
            </div>
            <div className={styles["stat-item"]}>
              <span className={styles["stat-label"]}>Profile Completion</span>
              <div className={styles["completion-indicator"]}>
                <div className={styles["completion-bar"]}>
                  <div
                    className={styles["completion-fill"]}
                    style={{ width: `${user.completedProfile}%` }}
                  ></div>
                </div>
                <span className={styles["completion-text"]}>
                  {user.completedProfile}%
                </span>
              </div>
            </div>
            <div className={styles["stat-item"]}>
              <span className={styles["stat-label"]}>Last Active</span>
              <span className={styles["stat-value"]}>
                {new Date(user.lastActivity).toLocaleDateString()}
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
            activeTab === "profile" ? styles["active"] : "",
          ]
            .filter(Boolean)
            .join(" ")}
          onClick={() => setActiveTab("profile")}
        >
          <User size={16} />
          Profile
        </button>
        <button
          className={[
            styles["tab-btn"],
            activeTab === "applications" ? styles["active"] : "",
          ]
            .filter(Boolean)
            .join(" ")}
          onClick={() => setActiveTab("applications")}
        >
          <FileText size={16} />
          Applications ({user.applications.length})
        </button>
        <button
          className={[
            styles["tab-btn"],
            activeTab === "activity" ? styles["active"] : "",
          ]
            .filter(Boolean)
            .join(" ")}
          onClick={() => setActiveTab("activity")}
        >
          <Activity size={16} />
          Activity
        </button>
      </div>

      {/* Tab Content */}
      <div className={styles["tab-content"]}>
        {activeTab === "profile" && renderProfileTab()}
        {activeTab === "applications" && renderApplicationsTab()}
        {activeTab === "activity" && renderActivityTab()}
      </div>
    </div>
  );
};

export default UserDetails;
