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
  Eye,
  EyeOff,
} from "lucide-react";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import styles from "./Agents.module.css";

const Agents = () => {
  const navigate = useNavigate();
  const [agents, setAgents] = useState([]);
  const [filteredAgents, setFilteredAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Sample data - replace with actual API call
  useEffect(() => {
    const fetchAgents = async () => {
      // Simulate API call delay
      setTimeout(() => {
        const sampleAgents = [
          {
            id: 1,
            firstName: "Alice",
            lastName: "Johnson",
            email: "alice.johnson@edunigo.com",
            username: "alice_j",
            status: "active",
            createdAt: "2024-01-15",
            updatedAt: "2024-01-20",
          },
          {
            id: 2,
            firstName: "Bob",
            lastName: "Smith",
            email: "bob.smith@edunigo.com",
            username: "bob_smith",
            status: "active",
            createdAt: "2024-01-20",
            updatedAt: "2024-02-01",
          },
          {
            id: 3,
            firstName: "Carol",
            lastName: "Williams",
            email: "carol.williams@edunigo.com",
            username: "carol_w",
            status: "inactive",
            createdAt: "2024-02-01",
            updatedAt: "2024-02-10",
          },
          {
            id: 4,
            firstName: "David",
            lastName: "Brown",
            email: "david.brown@edunigo.com",
            username: "david_brown",
            status: "active",
            createdAt: "2024-02-10",
            updatedAt: "2024-02-15",
          },
          {
            id: 5,
            firstName: "Eva",
            lastName: "Davis",
            email: "eva.davis@edunigo.com",
            username: "eva_davis",
            status: "active",
            createdAt: "2024-02-15",
            updatedAt: "2024-02-20",
          },
        ];

        setAgents(sampleAgents);
        setFilteredAgents(sampleAgents);
        setLoading(false);
      }, 1000);
    };

    fetchAgents();
  }, []);

  // Filter and search functionality
  useEffect(() => {
    let filtered = agents;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (agent) =>
          agent.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          agent.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          agent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          agent.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (filterBy !== "all") {
      filtered = filtered.filter((agent) => agent.status === filterBy);
    }

    setFilteredAgents(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  }, [searchTerm, filterBy, agents]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAgents.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAgents.length / itemsPerPage);

  const handleDeleteAgent = () => {
    const updatedAgents = agents.filter(
      (agent) => agent.id !== selectedAgent.id
    );
    setAgents(updatedAgents);
    setShowDeleteModal(false);
    setSelectedAgent(null);
  };

  const openDeleteModal = (agent) => {
    setSelectedAgent(agent);
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

  const getInitials = (firstName, lastName) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  if (loading) {
    return (
      <div className={styles["loading-container"]}>
        <div className={styles["loading-spinner"]}></div>
        <p>Loading agents...</p>
      </div>
    );
  }

  return (
    <div className={styles["agents-container"]}>
      {/* Page Header */}
      <div className={styles["page-header"]}>
        <div className={styles["header-left"]}>
          <div className={styles["page-icon"]}>
            <User size={24} />
          </div>
          <div>
            <h1>Agent Management</h1>
            <p>Manage system agents and their basic information</p>
          </div>
        </div>
        <button
          className={styles["create-btn"]}
          onClick={() => navigate("/admin/agents/create")}
        >
          <Plus size={20} />
          Add Agent
        </button>
      </div>

      {/* Controls Section */}
      <div className={styles["controls-section"]}>
        <div className={styles["search-container"]}>
          <Search className={styles["search-icon"]} size={20} />
          <input
            type="text"
            placeholder="Search agents by name, email, or username..."
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
        Showing {currentItems.length} of {filteredAgents.length} agents
      </div>

      {/* Table Container */}
      <div className={styles["table-container"]}>
        {currentItems.length === 0 ? (
          <div className={styles["empty-state"]}>
            <div className={styles["empty-content"]}>
              <User className={styles["empty-icon"]} size={48} />
              <h3>No agents found</h3>
              <p>
                {searchTerm || filterBy !== "all"
                  ? "Try adjusting your search criteria"
                  : "Get started by adding your first agent"}
              </p>
            </div>
          </div>
        ) : (
          <table className={styles["agents-table"]}>
            <thead>
              <tr>
                <th>Agent</th>
                <th>Email</th>
                <th>Username</th>
                <th>Status</th>
                <th>Created</th>
                <th>Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((agent) => (
                <tr key={agent.id}>
                  <td>
                    <div className={styles["agent-info"]}>
                      <div className={styles["agent-avatar"]}>
                        <span>
                          {getInitials(agent.firstName, agent.lastName)}
                        </span>
                      </div>
                      <div>
                        <div className={styles["agent-name"]}>
                          {agent.firstName} {agent.lastName}
                        </div>
                        <div className={styles["agent-id"]}>ID: {agent.id}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className={styles["agent-email"]}>{agent.email}</div>
                  </td>
                  <td>
                    <div className={styles["agent-username"]}>
                      {agent.username}
                    </div>
                  </td>
                  <td>{getStatusBadge(agent.status)}</td>
                  <td>
                    <div className={styles["created-date"]}>
                      {new Date(agent.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td>
                    <div className={styles["updated-date"]}>
                      {new Date(agent.updatedAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td>
                    <div className={styles["action-buttons"]}>
                      <button
                        className={styles["edit-btn"]}
                        onClick={() =>
                          navigate(`/admin/agents/edit/${agent.id}`)
                        }
                        title="Edit Agent"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        className={styles["delete-btn"]}
                        onClick={() => openDeleteModal(agent)}
                        title="Delete Agent"
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
          onConfirm={handleDeleteAgent}
          itemName={`${selectedAgent.firstName} ${selectedAgent.lastName}`}
          itemType="agent"
        />
      )}
    </div>
  );
};

export default Agents;
