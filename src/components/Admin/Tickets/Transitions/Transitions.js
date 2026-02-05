import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Edit2,
  Trash2,
  Plus,
  ArrowLeft,
  GitBranch,
  Clock,
  Zap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import CreateTransitionModal from "./CreateTransitionModal";
import EditTransitionModal from "./EditTransitionModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal";
import styles from "./Transitions.module.css";

const sampleStatuses = [
  { id: 1, name: "open", title: "Open" },
  { id: 2, name: "in_progress", title: "In Progress" },
  { id: 3, name: "waiting_for_response", title: "Waiting for Response" },
  { id: 4, name: "resolved", title: "Resolved" },
  { id: 5, name: "closed", title: "Closed" },
];

const sampleEvents = [
  { id: "TICKET_CREATED", name: "Ticket Created" },
  { id: "CUSTOMER_REPLIED", name: "Customer Replied" },
  { id: "AGENT_REPLIED", name: "Agent Replied" },
  { id: "STATUS_UPDATED", name: "Status Updated" },
  { id: "ESCALATED", name: "Ticket Escalated" },
  { id: "RESOLVED", name: "Ticket Resolved" },
  { id: "CLOSED", name: "Ticket Closed" },
];

const Transitions = () => {
  const navigate = useNavigate();
  const [transitions, setTransitions] = useState([]);
  const [filteredTransitions, setFilteredTransitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("time");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTransition, setSelectedTransition] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  useEffect(() => {
    const fetchTransitions = async () => {
      setTimeout(() => {
        const sampleTransitions = [
          {
            id: 1,
            type: "time",
            source_status: "waiting_for_response",
            target_status: "closed",
            days: 7,
            is_active: true,
          },
          {
            id: 2,
            type: "time",
            source_status: "in_progress",
            target_status: "resolved",
            days: 5,
            is_active: false,
          },
          {
            id: 3,
            type: "event",
            trigger_event: "TICKET_CREATED",
            target_status: "open",
            is_active: true,
          },
          {
            id: 4,
            type: "event",
            trigger_event: "AGENT_REPLIED",
            target_status: "waiting_for_response",
            is_active: true,
          },
          {
            id: 5,
            type: "event",
            trigger_event: "CUSTOMER_REPLIED",
            target_status: "in_progress",
            is_active: true,
          },
        ];

        setTransitions(sampleTransitions);
        setFilteredTransitions(sampleTransitions);
        setLoading(false);
      }, 800);
    };

    fetchTransitions();
  }, []);

  const statusIndex = useMemo(() => {
    const index = new Map();
    sampleStatuses.forEach((status) => index.set(status.name, status));
    return index;
  }, []);

  const eventIndex = useMemo(() => {
    const index = new Map();
    sampleEvents.forEach((event) => index.set(event.id, event));
    return index;
  }, []);

  useEffect(() => {
    let filtered = transitions.filter((transition) =>
      activeTab === "time" ? transition.type === "time" : transition.type === "event"
    );

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter((transition) => {
        if (transition.type === "time") {
          const source = statusIndex.get(transition.source_status)?.title || "";
          const target = statusIndex.get(transition.target_status)?.title || "";
          return (
            transition.source_status.toLowerCase().includes(term) ||
            transition.target_status.toLowerCase().includes(term) ||
            source.toLowerCase().includes(term) ||
            target.toLowerCase().includes(term)
          );
        }
        const eventName = eventIndex.get(transition.trigger_event)?.name || "";
        const target = statusIndex.get(transition.target_status)?.title || "";
        return (
          transition.trigger_event.toLowerCase().includes(term) ||
          eventName.toLowerCase().includes(term) ||
          transition.target_status.toLowerCase().includes(term) ||
          target.toLowerCase().includes(term)
        );
      });
    }

    setFilteredTransitions(filtered);
    setCurrentPage(1);
  }, [searchTerm, transitions, activeTab, statusIndex, eventIndex]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTransitions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredTransitions.length / itemsPerPage);

  const handleCreateTransition = (newTransition) => {
    const id = transitions.length
      ? Math.max(...transitions.map((t) => t.id)) + 1
      : 1;
    const transitionWithId = { ...newTransition, id };
    setTransitions([...transitions, transitionWithId]);
    setShowCreateModal(false);
  };

  const handleEditTransition = (updatedTransition) => {
    setTransitions(
      transitions.map((transition) =>
        transition.id === updatedTransition.id ? updatedTransition : transition
      )
    );
    setShowEditModal(false);
    setSelectedTransition(null);
  };

  const handleDeleteTransition = () => {
    setTransitions(
      transitions.filter((transition) => transition.id !== selectedTransition.id)
    );
    setShowDeleteModal(false);
    setSelectedTransition(null);
  };

  const openEditModal = (transition) => {
    setSelectedTransition(transition);
    setShowEditModal(true);
  };

  const openDeleteModal = (transition) => {
    setSelectedTransition(transition);
    setShowDeleteModal(true);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return (
      <div className={styles["loading-container"]}>
        <div className={styles["loading-spinner"]}></div>
        <p>Loading transitions...</p>
      </div>
    );
  }

  return (
    <div className={styles["transitions-container"]}>
      <div className={styles["page-header"]}>
        <div className={styles["header-left"]}>
          <button
            className={styles["back-btn"]}
            onClick={() => navigate("/admin/tickets")}
          >
            <ArrowLeft size={20} />
          </button>
          <div className={styles["page-icon"]}>
            <GitBranch size={24} />
          </div>
          <div>
            <h1>Automatic Status Transitions</h1>
            <p>Configure rule-based ticket status automation</p>
          </div>
        </div>
        <button
          className={styles["create-btn"]}
          onClick={() => setShowCreateModal(true)}
        >
          <Plus size={20} />
          Create Transition
        </button>
      </div>

      <div className={styles["info-panel"]}>
        <div className={styles["info-card"]}>
          <h3>Time-Based Rules</h3>
          <p>
            Automatically move tickets after a set number of days in a source
            status to prevent inactivity.
          </p>
        </div>
        <div className={styles["info-card"]}>
          <h3>Event-Based Rules</h3>
          <p>
            Trigger immediate transitions when system events occur, keeping
            workflows deterministic and consistent.
          </p>
        </div>
      </div>

      <div className={styles["tabs-row"]}>
        <button
          className={`${styles["tab-btn"]} ${
            activeTab === "time" ? styles["active"] : ""
          }`}
          onClick={() => setActiveTab("time")}
        >
          <Clock size={16} />
          Time-Based
        </button>
        <button
          className={`${styles["tab-btn"]} ${
            activeTab === "event" ? styles["active"] : ""
          }`}
          onClick={() => setActiveTab("event")}
        >
          <Zap size={16} />
          Event-Based
        </button>
      </div>

      <div className={styles["controls-section"]}>
        <div className={styles["search-container"]}>
          <Search className={styles["search-icon"]} size={20} />
          <input
            type="text"
            placeholder="Search transitions..."
            className={styles["search-input"]}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className={styles["results-info"]}>
        Showing {currentItems.length} of {filteredTransitions.length} transitions
      </div>

      <div className={styles["table-container"]}>
        {currentItems.length === 0 ? (
          <div className={styles["empty-state"]}>
            <div className={styles["empty-content"]}>
              <GitBranch className={styles["empty-icon"]} size={48} />
              <h3>No transitions found</h3>
              <p>
                {searchTerm
                  ? "Try adjusting your search criteria"
                  : "No transitions have been created yet"}
              </p>
            </div>
          </div>
        ) : (
          <table className={styles["transitions-table"]}>
            <thead>
              <tr>
                <th>ID</th>
                {activeTab === "time" ? (
                  <>
                    <th>Source Status</th>
                    <th>Target Status</th>
                    <th>Days</th>
                  </>
                ) : (
                  <>
                    <th>Trigger Event</th>
                    <th>Target Status</th>
                  </>
                )}
                <th>State</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((transition) => (
                <tr key={transition.id}>
                  <td>
                    <div className={styles["transition-id"]}>
                      #{transition.id}
                    </div>
                  </td>
                  {transition.type === "time" ? (
                    <>
                      <td>
                        <div className={styles["transition-status"]}>
                          {statusIndex.get(transition.source_status)?.title ||
                            transition.source_status}
                        </div>
                        <div className={styles["transition-key"]}>
                          {transition.source_status}
                        </div>
                      </td>
                      <td>
                        <div className={styles["transition-status"]}>
                          {statusIndex.get(transition.target_status)?.title ||
                            transition.target_status}
                        </div>
                        <div className={styles["transition-key"]}>
                          {transition.target_status}
                        </div>
                      </td>
                      <td>
                        <div className={styles["transition-days"]}>
                          {transition.days} days
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>
                        <div className={styles["transition-event"]}>
                          {eventIndex.get(transition.trigger_event)?.name ||
                            transition.trigger_event}
                        </div>
                        <div className={styles["transition-key"]}>
                          {transition.trigger_event}
                        </div>
                      </td>
                      <td>
                        <div className={styles["transition-status"]}>
                          {statusIndex.get(transition.target_status)?.title ||
                            transition.target_status}
                        </div>
                        <div className={styles["transition-key"]}>
                          {transition.target_status}
                        </div>
                      </td>
                    </>
                  )}
                  <td>
                    <span
                      className={
                        transition.is_active
                          ? styles["active-badge"]
                          : styles["paused-badge"]
                      }
                    >
                      {transition.is_active ? "Active" : "Paused"}
                    </span>
                  </td>
                  <td>
                    <div className={styles["action-buttons"]}>
                      <button
                        className={styles["edit-btn"]}
                        onClick={() => openEditModal(transition)}
                        title="Edit Transition"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        className={styles["delete-btn"]}
                        onClick={() => openDeleteModal(transition)}
                        title="Delete Transition"
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

      {showCreateModal && (
        <CreateTransitionModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateTransition}
          statuses={sampleStatuses}
          events={sampleEvents}
        />
      )}

      {showEditModal && selectedTransition && (
        <EditTransitionModal
          transition={selectedTransition}
          onClose={() => {
            setShowEditModal(false);
            setSelectedTransition(null);
          }}
          onUpdate={handleEditTransition}
          statuses={sampleStatuses}
          events={sampleEvents}
        />
      )}

      {showDeleteModal && selectedTransition && (
        <DeleteConfirmationModal
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedTransition(null);
          }}
          onConfirm={handleDeleteTransition}
          itemName={`Transition #${selectedTransition.id}`}
          itemType="transition"
        />
      )}
    </div>
  );
};

export default Transitions;
