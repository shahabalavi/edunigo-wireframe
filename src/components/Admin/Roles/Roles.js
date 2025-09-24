import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Users,
  ChevronLeft,
  ChevronRight,
  Shield,
  Eye,
  EyeOff,
  Key,
} from "lucide-react";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import styles from "./Roles.module.css";

const Roles = () => {
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const [filteredRoles, setFilteredRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Sample data - replace with actual API call
  useEffect(() => {
    const fetchRoles = async () => {
      // Simulate API call delay
      setTimeout(() => {
        const sampleRoles = [
          {
            id: 1,
            name: "Super Admin",
            description: "Full system access with all permissions",
            permissions: [
              { id: 1, name: "manage_users", title: "Manage Users" },
              { id: 2, name: "view_users", title: "View Users" },
              { id: 3, name: "manage_admins", title: "Manage Admins" },
              { id: 4, name: "manage_roles", title: "Manage Roles" },
              {
                id: 5,
                name: "manage_permissions",
                title: "Manage Permissions",
              },
              {
                id: 6,
                name: "manage_universities",
                title: "Manage Universities",
              },
              { id: 7, name: "manage_courses", title: "Manage Courses" },
              { id: 8, name: "manage_countries", title: "Manage Countries" },
              { id: 9, name: "view_analytics", title: "View Analytics" },
              { id: 10, name: "manage_settings", title: "Manage Settings" },
            ],
            userCount: 2,
            status: "active",
            createdAt: "2024-01-15",
          },
          {
            id: 2,
            name: "Content Manager",
            description:
              "Manage content including universities, courses, and countries",
            permissions: [
              {
                id: 6,
                name: "manage_universities",
                title: "Manage Universities",
              },
              { id: 7, name: "manage_courses", title: "Manage Courses" },
              { id: 8, name: "manage_countries", title: "Manage Countries" },
              { id: 2, name: "view_users", title: "View Users" },
            ],
            userCount: 5,
            status: "active",
            createdAt: "2024-01-20",
          },
          {
            id: 3,
            name: "User Manager",
            description: "Manage user accounts and profiles",
            permissions: [
              { id: 1, name: "manage_users", title: "Manage Users" },
              { id: 2, name: "view_users", title: "View Users" },
            ],
            userCount: 3,
            status: "active",
            createdAt: "2024-02-01",
          },
          {
            id: 4,
            name: "Analytics Viewer",
            description: "View system analytics and reports",
            permissions: [
              { id: 9, name: "view_analytics", title: "View Analytics" },
              { id: 2, name: "view_users", title: "View Users" },
            ],
            userCount: 1,
            status: "active",
            createdAt: "2024-02-10",
          },
          {
            id: 5,
            name: "Read Only",
            description: "View-only access to most system features",
            permissions: [{ id: 2, name: "view_users", title: "View Users" }],
            userCount: 0,
            status: "inactive",
            createdAt: "2024-02-15",
          },
        ];

        setRoles(sampleRoles);
        setFilteredRoles(sampleRoles);
        setLoading(false);
      }, 1000);
    };

    fetchRoles();
  }, []);

  // Filter and search functionality
  useEffect(() => {
    let filtered = roles;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (role) =>
          role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          role.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (filterBy !== "all") {
      filtered = filtered.filter((role) => role.status === filterBy);
    }

    setFilteredRoles(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  }, [searchTerm, filterBy, roles]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRoles.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredRoles.length / itemsPerPage);

  const handleDeleteRole = () => {
    const updatedRoles = roles.filter((role) => role.id !== selectedRole.id);
    setRoles(updatedRoles);
    setShowDeleteModal(false);
    setSelectedRole(null);
  };

  const openDeleteModal = (role) => {
    setSelectedRole(role);
    setShowDeleteModal(true);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: {
        label: "Active",
        className: styles["status-active"],
        icon: Eye,
      },
      inactive: {
        label: "Inactive",
        className: styles["status-inactive"],
        icon: EyeOff,
      },
    };

    const config = statusConfig[status] || statusConfig.inactive;
    const IconComponent = config.icon;

    return (
      <span className={`${styles["status-badge"]} ${config.className}`}>
        <IconComponent size={12} />
        {config.label}
      </span>
    );
  };

  const getPermissionCount = (permissions) => {
    return permissions.length;
  };

  const getPermissionPreview = (permissions) => {
    if (permissions.length === 0) return "No permissions";
    if (permissions.length <= 3) {
      return permissions.map((p) => p.title).join(", ");
    }
    return `${permissions
      .slice(0, 3)
      .map((p) => p.title)
      .join(", ")} +${permissions.length - 3} more`;
  };

  if (loading) {
    return (
      <div className={styles["loading-container"]}>
        <div className={styles["loading-spinner"]}></div>
        <p>Loading roles...</p>
      </div>
    );
  }

  return (
    <div className={styles["roles-container"]}>
      {/* Page Header */}
      <div className={styles["page-header"]}>
        <div className={styles["header-left"]}>
          <div className={styles["page-icon"]}>
            <Users size={24} />
          </div>
          <div>
            <h1>Roles Management</h1>
            <p>Create and manage user roles with specific permissions</p>
          </div>
        </div>
        <button
          className={styles["create-btn"]}
          onClick={() => navigate("/admin/roles/create")}
        >
          <Plus size={20} />
          Create Role
        </button>
      </div>

      {/* Controls Section */}
      <div className={styles["controls-section"]}>
        <div className={styles["search-container"]}>
          <Search className={styles["search-icon"]} size={20} />
          <input
            type="text"
            placeholder="Search roles by name or description..."
            className={styles["search-input"]}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className={styles["filter-container"]}>
          <Filter className={styles["filter-icon"]} size={20} />
          <select
            className={styles["filter-select"]}
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Results Info */}
      <div className={styles["results-info"]}>
        Showing {currentItems.length} of {filteredRoles.length} roles
      </div>

      {/* Table Container */}
      <div className={styles["table-container"]}>
        {currentItems.length === 0 ? (
          <div className={styles["empty-state"]}>
            <div className={styles["empty-content"]}>
              <Users className={styles["empty-icon"]} size={48} />
              <h3>No roles found</h3>
              <p>
                {searchTerm || filterBy !== "all"
                  ? "Try adjusting your search criteria"
                  : "Get started by creating your first role"}
              </p>
            </div>
          </div>
        ) : (
          <table className={styles["roles-table"]}>
            <thead>
              <tr>
                <th>Role</th>
                <th>Permissions</th>
                <th>Users</th>
                <th>Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((role) => (
                <tr key={role.id}>
                  <td>
                    <div className={styles["role-info"]}>
                      <div className={styles["role-icon"]}>
                        <Shield size={16} />
                      </div>
                      <div>
                        <div className={styles["role-name"]}>{role.name}</div>
                        <div className={styles["role-description"]}>
                          {role.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className={styles["permissions-info"]}>
                      <div className={styles["permissions-count"]}>
                        <Key size={12} />
                        {getPermissionCount(role.permissions)} permissions
                      </div>
                      <div className={styles["permissions-preview"]}>
                        {getPermissionPreview(role.permissions)}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className={styles["user-count"]}>
                      <Users size={12} />
                      {role.userCount} user{role.userCount !== 1 ? "s" : ""}
                    </div>
                  </td>
                  <td>{getStatusBadge(role.status)}</td>
                  <td>
                    <div className={styles["created-date"]}>
                      {new Date(role.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td>
                    <div className={styles["action-buttons"]}>
                      <button
                        className={styles["edit-btn"]}
                        onClick={() => navigate(`/admin/roles/edit/${role.id}`)}
                        title="Edit Role"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        className={styles["delete-btn"]}
                        onClick={() => openDeleteModal(role)}
                        title="Delete Role"
                        disabled={role.userCount > 0}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className={styles["pagination"]}>
          <button
            className={styles["pagination-btn"]}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={16} />
            Previous
          </button>

          <div className={styles["pagination-numbers"]}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  className={`${styles["pagination-number"]} ${
                    currentPage === pageNumber ? styles["active"] : ""
                  }`}
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </button>
              )
            )}
          </div>

          <button
            className={styles["pagination-btn"]}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <DeleteConfirmationModal
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteRole}
          itemName={selectedRole?.name}
          itemType="role"
        />
      )}
    </div>
  );
};

export default Roles;
