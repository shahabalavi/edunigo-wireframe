import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Shield,
  ChevronLeft,
  ChevronRight,
  Key,
  Eye,
  EyeOff,
} from "lucide-react";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import styles from "./Permissions.module.css";

const Permissions = () => {
  const navigate = useNavigate();
  const [permissions, setPermissions] = useState([]);
  const [filteredPermissions, setFilteredPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPermission, setSelectedPermission] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Sample data - replace with actual API call
  useEffect(() => {
    const fetchPermissions = async () => {
      // Simulate API call delay
      setTimeout(() => {
        const samplePermissions = [
          {
            id: 1,
            name: "manage_users",
            title: "Manage Users",
            category: "Users",
            description: "Create, edit, and delete user accounts",
            status: "active",
            createdAt: "2024-01-15",
          },
          {
            id: 2,
            name: "view_users",
            title: "View Users",
            category: "Users",
            description: "View user profiles and information",
            status: "active",
            createdAt: "2024-01-15",
          },
          {
            id: 3,
            name: "manage_admins",
            title: "Manage Admins",
            category: "Administration",
            description: "Create, edit, and delete admin accounts",
            status: "active",
            createdAt: "2024-01-15",
          },
          {
            id: 4,
            name: "manage_roles",
            title: "Manage Roles",
            category: "Administration",
            description: "Create, edit, and assign roles to users",
            status: "active",
            createdAt: "2024-01-15",
          },
          {
            id: 5,
            name: "manage_permissions",
            title: "Manage Permissions",
            category: "Administration",
            description: "Create, edit, and configure system permissions",
            status: "active",
            createdAt: "2024-01-15",
          },
          {
            id: 6,
            name: "manage_universities",
            title: "Manage Universities",
            category: "Content",
            description: "Add, edit, and remove university information",
            status: "active",
            createdAt: "2024-01-15",
          },
          {
            id: 7,
            name: "manage_courses",
            title: "Manage Courses",
            category: "Content",
            description: "Add, edit, and remove course information",
            status: "active",
            createdAt: "2024-01-15",
          },
          {
            id: 8,
            name: "manage_countries",
            title: "Manage Countries",
            category: "Content",
            description: "Add, edit, and remove country information",
            status: "active",
            createdAt: "2024-01-15",
          },
          {
            id: 9,
            name: "view_analytics",
            title: "View Analytics",
            category: "Reports",
            description: "Access system analytics and reports",
            status: "active",
            createdAt: "2024-01-15",
          },
          {
            id: 10,
            name: "manage_settings",
            title: "Manage Settings",
            category: "System",
            description: "Configure system-wide settings",
            status: "active",
            createdAt: "2024-01-15",
          },
        ];

        setPermissions(samplePermissions);
        setFilteredPermissions(samplePermissions);
        setLoading(false);
      }, 1000);
    };

    fetchPermissions();
  }, []);

  // Filter and search functionality
  useEffect(() => {
    let filtered = permissions;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (permission) =>
          permission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          permission.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          permission.category
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          permission.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (filterBy !== "all") {
      filtered = filtered.filter(
        (permission) => permission.status === filterBy
      );
    }

    setFilteredPermissions(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  }, [searchTerm, filterBy, permissions]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPermissions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredPermissions.length / itemsPerPage);

  const handleDeletePermission = () => {
    const updatedPermissions = permissions.filter(
      (permission) => permission.id !== selectedPermission.id
    );
    setPermissions(updatedPermissions);
    setShowDeleteModal(false);
    setSelectedPermission(null);
  };

  const openDeleteModal = (permission) => {
    setSelectedPermission(permission);
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

  const getCategoryBadge = (category) => {
    const categoryColors = {
      Users: "#eff6ff",
      Administration: "#fef3c7",
      Content: "#f0fdf4",
      Reports: "#fdf2f8",
      System: "#f3e8ff",
    };

    const categoryTextColors = {
      Users: "#2563eb",
      Administration: "#d97706",
      Content: "#16a34a",
      Reports: "#be185d",
      System: "#9333ea",
    };

    return (
      <span
        className={styles["category-badge"]}
        style={{
          backgroundColor: categoryColors[category] || "#f1f5f9",
          color: categoryTextColors[category] || "#64748b",
        }}
      >
        {category}
      </span>
    );
  };

  if (loading) {
    return (
      <div className={styles["loading-container"]}>
        <div className={styles["loading-spinner"]}></div>
        <p>Loading permissions...</p>
      </div>
    );
  }

  return (
    <div className={styles["permissions-container"]}>
      {/* Page Header */}
      <div className={styles["page-header"]}>
        <div className={styles["header-left"]}>
          <div className={styles["page-icon"]}>
            <Shield size={24} />
          </div>
          <div>
            <h1>Permissions Management</h1>
            <p>Define and manage system permissions</p>
          </div>
        </div>
        <button
          className={styles["create-btn"]}
          onClick={() => navigate("/admin/permissions/create")}
        >
          <Plus size={20} />
          Add Permission
        </button>
      </div>

      {/* Controls Section */}
      <div className={styles["controls-section"]}>
        <div className={styles["search-container"]}>
          <Search className={styles["search-icon"]} size={20} />
          <input
            type="text"
            placeholder="Search permissions by name, title, or category..."
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
        Showing {currentItems.length} of {filteredPermissions.length}{" "}
        permissions
      </div>

      {/* Table Container */}
      <div className={styles["table-container"]}>
        {currentItems.length === 0 ? (
          <div className={styles["empty-state"]}>
            <div className={styles["empty-content"]}>
              <Shield className={styles["empty-icon"]} size={48} />
              <h3>No permissions found</h3>
              <p>
                {searchTerm || filterBy !== "all"
                  ? "Try adjusting your search criteria"
                  : "Get started by adding your first permission"}
              </p>
            </div>
          </div>
        ) : (
          <table className={styles["permissions-table"]}>
            <thead>
              <tr>
                <th>Permission</th>
                <th>Category</th>
                <th>Description</th>
                <th>Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((permission) => (
                <tr key={permission.id}>
                  <td>
                    <div className={styles["permission-info"]}>
                      <div className={styles["permission-icon"]}>
                        <Key size={16} />
                      </div>
                      <div>
                        <div className={styles["permission-name"]}>
                          {permission.name}
                        </div>
                        <div className={styles["permission-title"]}>
                          {permission.title}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{getCategoryBadge(permission.category)}</td>
                  <td>
                    <div className={styles["permission-description"]}>
                      {permission.description}
                    </div>
                  </td>
                  <td>{getStatusBadge(permission.status)}</td>
                  <td>
                    <div className={styles["created-date"]}>
                      {new Date(permission.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td>
                    <div className={styles["action-buttons"]}>
                      <button
                        className={styles["edit-btn"]}
                        onClick={() => {
                          // Navigate to edit permission page
                          console.log("Edit permission", permission.id);
                        }}
                        title="Edit Permission"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        className={styles["delete-btn"]}
                        onClick={() => openDeleteModal(permission)}
                        title="Delete Permission"
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
          onConfirm={handleDeletePermission}
          itemName={selectedPermission?.title}
          itemType="permission"
        />
      )}
    </div>
  );
};

export default Permissions;
