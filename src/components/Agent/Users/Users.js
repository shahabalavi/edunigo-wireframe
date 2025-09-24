import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users as UsersIcon,
  Search,
  Eye,
  Settings,
  FileText,
  Plus,
  MoreVertical,
  GraduationCap,
  Calendar,
  MapPin,
} from "lucide-react";
import styles from "./Users.module.css";

const Users = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Sample user data that the agent has created
  const users = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@email.com",
      status: "active",
      country: "United States",
      applications: 3,
      completedProfile: 85,
      lastActivity: "2024-01-15",
      joinedDate: "2024-01-01",
      phone: "+1 (555) 123-4567",
      avatar: "JS",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      status: "pending",
      country: "Canada",
      applications: 1,
      completedProfile: 60,
      lastActivity: "2024-01-14",
      joinedDate: "2024-01-05",
      phone: "+1 (416) 987-6543",
      avatar: "SJ",
    },
    {
      id: 3,
      name: "Michael Chen",
      email: "m.chen@email.com",
      status: "active",
      country: "Singapore",
      applications: 5,
      completedProfile: 95,
      lastActivity: "2024-01-16",
      joinedDate: "2023-12-20",
      phone: "+65 9876 5432",
      avatar: "MC",
    },
    {
      id: 4,
      name: "Emma Wilson",
      email: "emma.wilson@email.com",
      status: "inactive",
      country: "United Kingdom",
      applications: 0,
      completedProfile: 30,
      lastActivity: "2024-01-05",
      joinedDate: "2023-12-15",
      phone: "+44 7700 900123",
      avatar: "EW",
    },
  ];

  const handleUserClick = (userId) => {
    navigate(`/agent/users/${userId}`);
  };

  const handleEditProfile = (userId) => {
    navigate(`/agent/users/${userId}/edit`);
  };

  const handleCreateUser = () => {
    navigate("/agent/users/create");
  };

  const getFilteredUsers = () => {
    let filtered = users;

    if (filterStatus !== "all") {
      filtered = filtered.filter((user) => user.status === filterStatus);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.country.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
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

  const getUsersByStatus = (status) => {
    return users.filter((user) => user.status === status).length;
  };

  const getTotalApplications = () => {
    return users.reduce((total, user) => total + user.applications, 0);
  };

  const getAverageProfileCompletion = () => {
    const average =
      users.reduce((total, user) => total + user.completedProfile, 0) /
      users.length;
    return Math.round(average);
  };

  return (
    <div className={styles["page-content"]}>
      {/* Page Header */}
      <div className={styles["page-header"]}>
        <div className={styles["header-content"]}>
          <h1>User Management</h1>
          <p>Manage students and their application journeys</p>
        </div>
        <button className={styles["btn-primary"]} onClick={handleCreateUser}>
          <Plus size={16} />
          Add New User
        </button>
      </div>

      {/* Statistics Widgets */}
      <div className={styles["stats-grid"]}>
        <div className={styles["stat-card"]}>
          <div className={styles["stat-icon"]}>
            <UsersIcon size={24} />
          </div>
          <div className={styles["stat-content"]}>
            <h3>{users.length}</h3>
            <p>Total Students</p>
          </div>
        </div>
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
            <GraduationCap size={24} />
          </div>
          <div className={styles["stat-content"]}>
            <h3>{getUsersByStatus("active")}</h3>
            <p>Active Students</p>
          </div>
        </div>
        <div className={styles["stat-card"]}>
          <div className={styles["stat-icon"]}>
            <Settings size={24} />
          </div>
          <div className={styles["stat-content"]}>
            <h3>{getAverageProfileCompletion()}%</h3>
            <p>Avg Profile Completion</p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className={styles["search-filters"]}>
        <div className={styles["search-box"]}>
          <Search size={20} />
          <input
            type="text"
            placeholder="Search users by name, email, or country..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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
            All Users ({users.length})
          </button>
          <button
            className={[
              styles["filter-btn"],
              filterStatus === "active" ? styles["active"] : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onClick={() => setFilterStatus("active")}
          >
            Active ({getUsersByStatus("active")})
          </button>
          <button
            className={[
              styles["filter-btn"],
              filterStatus === "pending" ? styles["active"] : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onClick={() => setFilterStatus("pending")}
          >
            Pending ({getUsersByStatus("pending")})
          </button>
          <button
            className={[
              styles["filter-btn"],
              filterStatus === "inactive" ? styles["active"] : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onClick={() => setFilterStatus("inactive")}
          >
            Inactive ({getUsersByStatus("inactive")})
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className={styles["users-table-container"]}>
        <div className={styles["users-table"]}>
          <div className={styles["table-header"]}>
            <div className={styles["header-cell"]}>Student</div>
            <div className={styles["header-cell"]}>Contact</div>
            <div className={styles["header-cell"]}>Status</div>
            <div className={styles["header-cell"]}>Applications</div>
            <div className={styles["header-cell"]}>Profile</div>
            <div className={styles["header-cell"]}>Last Activity</div>
            <div className={styles["header-cell"]}>Actions</div>
          </div>

          <div className={styles["table-body"]}>
            {getFilteredUsers().map((user) => (
              <div
                key={user.id}
                className={styles["table-row"]}
                onClick={() => handleUserClick(user.id)}
              >
                <div
                  className={[styles["table-cell"], styles["user-info"]]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <div className={styles["user-avatar"]}>{user.avatar}</div>
                  <div className={styles["user-details"]}>
                    <div className={styles["user-name"]}>{user.name}</div>
                    <div className={styles["user-location"]}>
                      <MapPin size={12} />
                      {user.country}
                    </div>
                  </div>
                </div>

                <div
                  className={[styles["table-cell"], styles["contact-info"]]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <div className={styles["user-email"]}>{user.email}</div>
                  <div className={styles["user-phone"]}>{user.phone}</div>
                </div>

                <div className={styles["table-cell"]}>
                  {getStatusBadge(user.status)}
                </div>

                <div
                  className={[styles["table-cell"], styles["applications-info"]]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <div className={styles["applications-count"]}>
                    {user.applications}
                  </div>
                  <div className={styles["applications-text"]}>
                    applications
                  </div>
                </div>

                <div
                  className={[styles["table-cell"], styles["profile-info"]]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <div className={styles["progress-bar"]}>
                    <div
                      className={styles["progress-fill"]}
                      style={{ width: `${user.completedProfile}%` }}
                    ></div>
                  </div>
                  <div className={styles["progress-text"]}>
                    {user.completedProfile}% complete
                  </div>
                </div>

                <div
                  className={[styles["table-cell"], styles["activity-info"]]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <div className={styles["activity-date"]}>
                    <Calendar size={12} />
                    {new Date(user.lastActivity).toLocaleDateString()}
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
                    onClick={() => handleUserClick(user.id)}
                    title="View Details"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    className={[styles["action-btn"], styles["edit-btn"]]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={() => handleEditProfile(user.id)}
                    title="Edit Profile"
                  >
                    <Settings size={16} />
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
        {getFilteredUsers().length === 0 && (
          <div className={styles["empty-state"]}>
            <div className={styles["empty-icon"]}>
              <UsersIcon size={48} />
            </div>
            <h3>No users found</h3>
            <p>
              {searchTerm || filterStatus !== "all"
                ? "No users match your current search or filter criteria."
                : "You haven't created any users yet. Start by adding your first student."}
            </p>
            <button
              className={styles["btn-primary"]}
              onClick={handleCreateUser}
            >
              <Plus size={20} />
              Add New User
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
