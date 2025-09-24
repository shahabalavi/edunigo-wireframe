import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  User,
  ChevronLeft,
  ChevronRight,
  Shield,
  ShieldCheck,
  Eye,
  EyeOff,
} from "lucide-react";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import styles from "./Admins.module.css";

const Admins = () => {
  const navigate = useNavigate();
  const [admins, setAdmins] = useState([]);
  const [filteredAdmins, setFilteredAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Sample data - replace with actual API call
  useEffect(() => {
    const fetchAdmins = async () => {
      // Simulate API call delay
      setTimeout(() => {
        const sampleAdmins = [
          {
            id: 1,
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@edunigo.com",
            isSuperAdmin: true,
            status: "active",
            avatar: null,
            roles: [
              { id: 1, name: "Super Admin" },
              { id: 2, name: "Content Manager" },
            ],
            createdAt: "2024-01-15",
          },
          {
            id: 2,
            firstName: "Jane",
            lastName: "Smith",
            email: "jane.smith@edunigo.com",
            isSuperAdmin: false,
            status: "active",
            avatar: null,
            roles: [
              { id: 3, name: "User Manager" },
              { id: 4, name: "Analytics Viewer" },
            ],
            createdAt: "2024-01-20",
          },
          {
            id: 3,
            firstName: "Mike",
            lastName: "Johnson",
            email: "mike.johnson@edunigo.com",
            isSuperAdmin: false,
            status: "inactive",
            avatar: null,
            roles: [{ id: 2, name: "Content Manager" }],
            createdAt: "2024-02-01",
          },
          {
            id: 4,
            firstName: "Sarah",
            lastName: "Wilson",
            email: "sarah.wilson@edunigo.com",
            isSuperAdmin: false,
            status: "active",
            avatar: null,
            roles: [{ id: 4, name: "Analytics Viewer" }],
            createdAt: "2024-02-10",
          },
          {
            id: 5,
            firstName: "David",
            lastName: "Brown",
            email: "david.brown@edunigo.com",
            isSuperAdmin: true,
            status: "active",
            avatar: null,
            roles: [{ id: 1, name: "Super Admin" }],
            createdAt: "2024-02-15",
          },
        ];

        setAdmins(sampleAdmins);
        setFilteredAdmins(sampleAdmins);
        setLoading(false);
      }, 1000);
    };

    fetchAdmins();
  }, []);

  // Filter and search functionality
  useEffect(() => {
    let filtered = admins;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (admin) =>
          admin.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          admin.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          admin.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (filterBy !== "all") {
      filtered = filtered.filter((admin) => admin.status === filterBy);
    }

    setFilteredAdmins(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  }, [searchTerm, filterBy, admins]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAdmins.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAdmins.length / itemsPerPage);

  const handleDeleteAdmin = () => {
    const updatedAdmins = admins.filter(
      (admin) => admin.id !== selectedAdmin.id
    );
    setAdmins(updatedAdmins);
    setShowDeleteModal(false);
    setSelectedAdmin(null);
  };

  const openDeleteModal = (admin) => {
    setSelectedAdmin(admin);
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

  const getAdminRole = (isSuperAdmin) => {
    return isSuperAdmin ? (
      <span className={`${styles["role-badge"]} ${styles["role-super"]}`}>
        <ShieldCheck size={12} />
        Super Admin
      </span>
    ) : (
      <span className={`${styles["role-badge"]} ${styles["role-admin"]}`}>
        <Shield size={12} />
        Admin
      </span>
    );
  };

  const getAdminRoles = (roles) => {
    if (!roles || roles.length === 0) {
      return <span className={styles["no-roles"]}>No roles assigned</span>;
    }

    return (
      <div className={styles["admin-roles"]}>
        {roles.map((role) => (
          <span key={role.id} className={styles["role-tag"]}>
            {role.name}
          </span>
        ))}
      </div>
    );
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  if (loading) {
    return (
      <div className={styles["loading-container"]}>
        <div className={styles["loading-spinner"]}></div>
        <p>Loading admins...</p>
      </div>
    );
  }

  return (
    <div className={styles["admins-container"]}>
      {/* Page Header */}
      <div className={styles["page-header"]}>
        <div className={styles["header-left"]}>
          <div className={styles["page-icon"]}>
            <User size={24} />
          </div>
          <div>
            <h1>Admin Management</h1>
            <p>Manage system administrators and their permissions</p>
          </div>
        </div>
        <button
          className={styles["create-btn"]}
          onClick={() => navigate("/admin/admins/create")}
        >
          <Plus size={20} />
          Add Admin
        </button>
      </div>

      {/* Controls Section */}
      <div className={styles["controls-section"]}>
        <div className={styles["search-container"]}>
          <Search className={styles["search-icon"]} size={20} />
          <input
            type="text"
            placeholder="Search admins by name or email..."
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
        Showing {currentItems.length} of {filteredAdmins.length} admins
      </div>

      {/* Table Container */}
      <div className={styles["table-container"]}>
        {currentItems.length === 0 ? (
          <div className={styles["empty-state"]}>
            <div className={styles["empty-content"]}>
              <User className={styles["empty-icon"]} size={48} />
              <h3>No admins found</h3>
              <p>
                {searchTerm || filterBy !== "all"
                  ? "Try adjusting your search criteria"
                  : "Get started by adding your first admin user"}
              </p>
            </div>
          </div>
        ) : (
          <table className={styles["admins-table"]}>
            <thead>
              <tr>
                <th>Admin</th>
                <th>Email</th>
                <th>Type</th>
                <th>Roles</th>
                <th>Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((admin) => (
                <tr key={admin.id}>
                  <td>
                    <div className={styles["admin-info"]}>
                      <div className={styles["admin-avatar"]}>
                        {admin.avatar ? (
                          <img
                            src={admin.avatar}
                            alt={`${admin.firstName} ${admin.lastName}`}
                          />
                        ) : (
                          <span>
                            {getInitials(admin.firstName, admin.lastName)}
                          </span>
                        )}
                      </div>
                      <div>
                        <div className={styles["admin-name"]}>
                          {admin.firstName} {admin.lastName}
                        </div>
                        <div className={styles["admin-id"]}>ID: {admin.id}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className={styles["admin-email"]}>{admin.email}</div>
                  </td>
                  <td>{getAdminRole(admin.isSuperAdmin)}</td>
                  <td>{getAdminRoles(admin.roles)}</td>
                  <td>{getStatusBadge(admin.status)}</td>
                  <td>
                    <div className={styles["created-date"]}>
                      {new Date(admin.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td>
                    <div className={styles["action-buttons"]}>
                      <button
                        className={styles["edit-btn"]}
                        onClick={() =>
                          navigate(`/admin/admins/edit/${admin.id}`)
                        }
                        title="Edit Admin"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        className={styles["delete-btn"]}
                        onClick={() => openDeleteModal(admin)}
                        title="Delete Admin"
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
          onConfirm={handleDeleteAdmin}
          itemName={`${selectedAdmin.firstName} ${selectedAdmin.lastName}`}
          itemType="admin"
        />
      )}
    </div>
  );
};

export default Admins;
