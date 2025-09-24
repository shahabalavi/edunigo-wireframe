import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Filter,
  Edit2,
  Trash2,
  User,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  Shield,
  ShieldOff,
} from "lucide-react";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import styles from "./Users.module.css";

const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Sample data - replace with actual API call
  useEffect(() => {
    const fetchUsers = async () => {
      // Simulate API call delay
      setTimeout(() => {
        const sampleUsers = [
          {
            id: 1,
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            status: "active",
            createdAt: "2024-01-15",
            updatedAt: "2024-01-20",
          },
          {
            id: 2,
            firstName: "Jane",
            lastName: "Smith",
            email: "jane.smith@example.com",
            status: "active",
            createdAt: "2024-01-20",
            updatedAt: "2024-02-01",
          },
          {
            id: 3,
            firstName: "Mike",
            lastName: "Johnson",
            email: "mike.johnson@example.com",
            status: "blocked",
            createdAt: "2024-02-01",
            updatedAt: "2024-02-10",
          },
          {
            id: 4,
            firstName: "Sarah",
            lastName: "Wilson",
            email: "sarah.wilson@example.com",
            status: "active",
            createdAt: "2024-02-10",
            updatedAt: "2024-02-15",
          },
          {
            id: 5,
            firstName: "David",
            lastName: "Brown",
            email: "david.brown@example.com",
            status: "blocked",
            createdAt: "2024-02-15",
            updatedAt: "2024-02-20",
          },
          {
            id: 6,
            firstName: "Emily",
            lastName: "Davis",
            email: "emily.davis@example.com",
            status: "active",
            createdAt: "2024-02-20",
            updatedAt: "2024-02-25",
          },
          {
            id: 7,
            firstName: "Robert",
            lastName: "Miller",
            email: "robert.miller@example.com",
            status: "active",
            createdAt: "2024-02-25",
            updatedAt: "2024-03-01",
          },
          {
            id: 8,
            firstName: "Lisa",
            lastName: "Garcia",
            email: "lisa.garcia@example.com",
            status: "blocked",
            createdAt: "2024-03-01",
            updatedAt: "2024-03-05",
          },
        ];

        setUsers(sampleUsers);
        setFilteredUsers(sampleUsers);
        setLoading(false);
      }, 1000);
    };

    fetchUsers();
  }, []);

  // Filter and search functionality
  useEffect(() => {
    let filtered = users;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (filterBy !== "all") {
      filtered = filtered.filter((user) => user.status === filterBy);
    }

    setFilteredUsers(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  }, [searchTerm, filterBy, users]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const handleDeleteUser = () => {
    const updatedUsers = users.filter((user) => user.id !== selectedUser.id);
    setUsers(updatedUsers);
    setShowDeleteModal(false);
    setSelectedUser(null);
  };

  const handleBlockUser = (user) => {
    const updatedUsers = users.map((u) =>
      u.id === user.id
        ? {
            ...u,
            status: u.status === "blocked" ? "active" : "blocked",
            updatedAt: new Date().toISOString().split("T")[0],
          }
        : u
    );
    setUsers(updatedUsers);
  };

  const openDeleteModal = (user) => {
    setSelectedUser(user);
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
      blocked: {
        label: "Blocked",
        className: styles["status-blocked"],
        icon: EyeOff,
      },
    };

    const config = statusConfig[status] || statusConfig.blocked;
    const IconComponent = config.icon;

    return (
      <span className={`${styles["status-badge"]} ${config.className}`}>
        <IconComponent size={12} />
        {config.label}
      </span>
    );
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  if (loading) {
    return (
      <div className={styles["loading-container"]}>
        <div className={styles["loading-spinner"]}></div>
        <p>Loading users...</p>
      </div>
    );
  }

  return (
    <div className={styles["users-container"]}>
      {/* Page Header */}
      <div className={styles["page-header"]}>
        <div className={styles["header-left"]}>
          <div className={styles["page-icon"]}>
            <User size={24} />
          </div>
          <div>
            <h1>User Management</h1>
            <p>Manage system users and their account status</p>
          </div>
        </div>
      </div>

      {/* Controls Section */}
      <div className={styles["controls-section"]}>
        <div className={styles["search-container"]}>
          <Search className={styles["search-icon"]} size={20} />
          <input
            type="text"
            placeholder="Search users by name or email..."
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
            <option value="blocked">Blocked</option>
          </select>
        </div>
      </div>

      {/* Results Info */}
      <div className={styles["results-info"]}>
        Showing {currentItems.length} of {filteredUsers.length} users
      </div>

      {/* Table Container */}
      <div className={styles["table-container"]}>
        {currentItems.length === 0 ? (
          <div className={styles["empty-state"]}>
            <div className={styles["empty-content"]}>
              <User className={styles["empty-icon"]} size={48} />
              <h3>No users found</h3>
              <p>
                {searchTerm || filterBy !== "all"
                  ? "Try adjusting your search criteria"
                  : "No users have been registered yet"}
              </p>
            </div>
          </div>
        ) : (
          <table className={styles["users-table"]}>
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Status</th>
                <th>Created</th>
                <th>Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className={styles["user-info"]}>
                      <div className={styles["user-avatar"]}>
                        <span>
                          {getInitials(user.firstName, user.lastName)}
                        </span>
                      </div>
                      <div>
                        <div className={styles["user-name"]}>
                          {user.firstName} {user.lastName}
                        </div>
                        <div className={styles["user-id"]}>ID: {user.id}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className={styles["user-email"]}>{user.email}</div>
                  </td>
                  <td>{getStatusBadge(user.status)}</td>
                  <td>
                    <div className={styles["created-date"]}>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td>
                    <div className={styles["updated-date"]}>
                      {new Date(user.updatedAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td>
                    <div className={styles["action-buttons"]}>
                      <button
                        className={styles["edit-btn"]}
                        onClick={() => navigate(`/admin/users/edit/${user.id}`)}
                        title="Edit User"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        className={`${styles["block-btn"]} ${
                          user.status === "blocked" ? styles["unblock-btn"] : ""
                        }`}
                        onClick={() => handleBlockUser(user)}
                        title={
                          user.status === "blocked"
                            ? "Unblock User"
                            : "Block User"
                        }
                      >
                        {user.status === "blocked" ? (
                          <Shield size={16} />
                        ) : (
                          <ShieldOff size={16} />
                        )}
                      </button>
                      <button
                        className={styles["delete-btn"]}
                        onClick={() => openDeleteModal(user)}
                        title="Delete User"
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
          onConfirm={handleDeleteUser}
          itemName={`${selectedUser.firstName} ${selectedUser.lastName}`}
          itemType="user"
        />
      )}
    </div>
  );
};

export default Users;
