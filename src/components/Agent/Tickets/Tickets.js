import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Filter,
  Trash2,
  Ticket,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Paperclip,
  Clock,
  AlertCircle,
  CheckCircle,
  Plus,
} from "lucide-react";
import DeleteConfirmationModal from "../../Admin/Tickets/DeleteConfirmationModal";
import styles from "./Tickets.module.css";

const Tickets = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Sample data - replace with actual API call
  useEffect(() => {
    const fetchTickets = async () => {
      // Simulate API call delay
      setTimeout(() => {
        const sampleTickets = [
          {
            id: 1,
            subject: "Application Status Inquiry",
            department: {
              id: 1,
              name: "Admissions",
              title: "Admissions Department",
            },
            status: { id: 1, name: "open", title: "Open" },
            priority: { id: 2, name: "medium", title: "Medium" },
            description:
              "I would like to know the current status of my application for the Computer Science program.",
            attachments: 2,
            createdBy: "John Doe",
            createdAt: "2024-01-15",
            updatedAt: "2024-01-20",
          },
          {
            id: 2,
            subject: "Document Upload Issue",
            department: {
              id: 2,
              name: "Technical",
              title: "Technical Support",
            },
            status: { id: 2, name: "in_progress", title: "In Progress" },
            priority: { id: 1, name: "high", title: "High" },
            description:
              "I'm having trouble uploading my academic transcripts. The file upload keeps failing.",
            attachments: 1,
            createdBy: "Jane Smith",
            createdAt: "2024-01-20",
            updatedAt: "2024-02-01",
          },
          {
            id: 3,
            subject: "Payment Processing Question",
            department: { id: 3, name: "Finance", title: "Finance Department" },
            status: { id: 3, name: "closed", title: "Closed" },
            priority: { id: 3, name: "low", title: "Low" },
            description:
              "I need clarification about the payment methods accepted for application fees.",
            attachments: 0,
            createdBy: "Mike Johnson",
            createdAt: "2024-02-01",
            updatedAt: "2024-02-10",
          },
          {
            id: 4,
            subject: "Visa Information Request",
            department: {
              id: 1,
              name: "Admissions",
              title: "Admissions Department",
            },
            status: { id: 1, name: "open", title: "Open" },
            priority: { id: 2, name: "medium", title: "Medium" },
            description:
              "Could you provide information about the visa requirements for international students?",
            attachments: 0,
            createdBy: "Sarah Wilson",
            createdAt: "2024-02-10",
            updatedAt: "2024-02-15",
          },
          {
            id: 5,
            subject: "Account Access Problem",
            department: {
              id: 2,
              name: "Technical",
              title: "Technical Support",
            },
            status: { id: 2, name: "in_progress", title: "In Progress" },
            priority: { id: 1, name: "high", title: "High" },
            description:
              "I cannot access my account after the recent system update. Please help me regain access.",
            attachments: 3,
            createdBy: "David Brown",
            createdAt: "2024-02-15",
            updatedAt: "2024-02-20",
          },
        ];

        setTickets(sampleTickets);
        setFilteredTickets(sampleTickets);
        setLoading(false);
      }, 1000);
    };

    fetchTickets();
  }, []);

  // Filter and search functionality
  useEffect(() => {
    let filtered = tickets;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (ticket) =>
          ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ticket.createdBy.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (filterBy !== "all") {
      filtered = filtered.filter((ticket) => ticket.status.name === filterBy);
    }

    setFilteredTickets(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  }, [searchTerm, filterBy, tickets]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTickets.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);

  const handleDeleteTicket = () => {
    const updatedTickets = tickets.filter(
      (ticket) => ticket.id !== selectedTicket.id
    );
    setTickets(updatedTickets);
    setShowDeleteModal(false);
    setSelectedTicket(null);
  };

  const openDeleteModal = (ticket) => {
    setSelectedTicket(ticket);
    setShowDeleteModal(true);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      open: {
        label: "Open",
        className: styles["status-open"],
        icon: AlertCircle,
      },
      in_progress: {
        label: "In Progress",
        className: styles["status-in-progress"],
        icon: Clock,
      },
      closed: {
        label: "Closed",
        className: styles["status-closed"],
        icon: CheckCircle,
      },
    };

    const config = statusConfig[status.name] || statusConfig.open;
    const IconComponent = config.icon;

    return (
      <span className={`${styles["status-badge"]} ${config.className}`}>
        <IconComponent size={12} />
        {config.label}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      low: {
        label: "Low",
        className: styles["priority-low"],
      },
      medium: {
        label: "Medium",
        className: styles["priority-medium"],
      },
      high: {
        label: "High",
        className: styles["priority-high"],
      },
    };

    const config = priorityConfig[priority.name] || priorityConfig.medium;

    return (
      <span className={`${styles["priority-badge"]} ${config.className}`}>
        {config.label}
      </span>
    );
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n.charAt(0))
      .join("")
      .toUpperCase();
  };

  if (loading) {
    return (
      <div className={styles["loading-container"]}>
        <div className={styles["loading-spinner"]}></div>
        <p>Loading tickets...</p>
      </div>
    );
  }

  return (
    <div className={styles["tickets-container"]}>
      {/* Page Header */}
      <div className={styles["page-header"]}>
        <div className={styles["header-left"]}>
          <div className={styles["page-icon"]}>
            <Ticket size={24} />
          </div>
          <div>
            <h1>My Tickets</h1>
            <p>Manage your assigned support tickets</p>
          </div>
        </div>
        <div className={styles["header-actions"]}>
          <button
            className={styles["action-btn"]}
            onClick={() => navigate("/agent/tickets/create")}
          >
            <Plus size={20} />
            Create Ticket
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className={styles["stats-grid"]}>
        <div className={styles["stat-card"]}>
          <div className={styles["stat-icon"]}>
            <Ticket size={24} />
          </div>
          <div className={styles["stat-content"]}>
            <h3>{tickets.length}</h3>
            <p>Total Tickets</p>
          </div>
        </div>
        <div className={styles["stat-card"]}>
          <div className={styles["stat-icon"]}>
            <AlertCircle size={24} />
          </div>
          <div className={styles["stat-content"]}>
            <h3>{tickets.filter((t) => t.status.name === "open").length}</h3>
            <p>Open Tickets</p>
          </div>
        </div>
        <div className={styles["stat-card"]}>
          <div className={styles["stat-icon"]}>
            <Clock size={24} />
          </div>
          <div className={styles["stat-content"]}>
            <h3>
              {tickets.filter((t) => t.status.name === "in_progress").length}
            </h3>
            <p>In Progress</p>
          </div>
        </div>
        <div className={styles["stat-card"]}>
          <div className={styles["stat-icon"]}>
            <CheckCircle size={24} />
          </div>
          <div className={styles["stat-content"]}>
            <h3>{tickets.filter((t) => t.status.name === "closed").length}</h3>
            <p>Closed Tickets</p>
          </div>
        </div>
      </div>

      {/* Controls Section */}
      <div className={styles["controls-section"]}>
        <div className={styles["search-container"]}>
          <Search className={styles["search-icon"]} size={20} />
          <input
            type="text"
            placeholder="Search tickets by subject, description, or creator..."
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
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Results Info */}
      <div className={styles["results-info"]}>
        Showing {currentItems.length} of {filteredTickets.length} tickets
      </div>

      {/* Table Container */}
      <div className={styles["table-container"]}>
        {currentItems.length === 0 ? (
          <div className={styles["empty-state"]}>
            <div className={styles["empty-content"]}>
              <Ticket className={styles["empty-icon"]} size={48} />
              <h3>No tickets found</h3>
              <p>
                {searchTerm || filterBy !== "all"
                  ? "Try adjusting your search criteria"
                  : "No tickets have been assigned to you yet"}
              </p>
            </div>
          </div>
        ) : (
          <table className={styles["tickets-table"]}>
            <thead>
              <tr>
                <th>Ticket</th>
                <th>Department</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Created By</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((ticket) => (
                <tr key={ticket.id}>
                  <td>
                    <div className={styles["ticket-info"]}>
                      <div className={styles["ticket-avatar"]}>
                        <span>T#{ticket.id}</span>
                      </div>
                      <div>
                        <div className={styles["ticket-subject"]}>
                          {ticket.subject}
                        </div>
                        <div className={styles["ticket-description"]}>
                          {ticket.description.length > 50
                            ? `${ticket.description.substring(0, 50)}...`
                            : ticket.description}
                        </div>
                        {ticket.attachments > 0 && (
                          <div className={styles["attachment-info"]}>
                            <Paperclip size={12} />
                            {ticket.attachments} attachment
                            {ticket.attachments !== 1 ? "s" : ""}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className={styles["department-badge"]}>
                      {ticket.department.title}
                    </div>
                  </td>
                  <td>{getStatusBadge(ticket.status)}</td>
                  <td>{getPriorityBadge(ticket.priority)}</td>
                  <td>
                    <div className={styles["creator-info"]}>
                      <div className={styles["creator-avatar"]}>
                        <span>{getInitials(ticket.createdBy)}</span>
                      </div>
                      <div className={styles["creator-name"]}>
                        {ticket.createdBy}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className={styles["created-date"]}>
                      {new Date(ticket.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td>
                    <div className={styles["action-buttons"]}>
                      <button
                        className={styles["view-btn"]}
                        onClick={() => navigate(`/agent/tickets/${ticket.id}`)}
                        title="View & Reply to Ticket"
                      >
                        <MessageSquare size={16} />
                      </button>
                      <button
                        className={styles["delete-btn"]}
                        onClick={() => openDeleteModal(ticket)}
                        title="Delete Ticket"
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
          onConfirm={handleDeleteTicket}
          itemName={`Ticket #${selectedTicket.id} - ${selectedTicket.subject}`}
          itemType="ticket"
        />
      )}
    </div>
  );
};

export default Tickets;
