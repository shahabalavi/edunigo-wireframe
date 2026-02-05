import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  ArrowLeft,
  Activity,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import styles from "./Events.module.css";

const Events = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchEvents = async () => {
      setTimeout(() => {
        const sampleEvents = [
          {
            id: "TICKET_CREATED",
            name: "Ticket Created",
            description: "A ticket is created by a user or an admin.",
          },
          {
            id: "CUSTOMER_REPLIED",
            name: "Customer Replied",
            description: "The customer adds a reply to the ticket thread.",
          },
          {
            id: "AGENT_REPLIED",
            name: "Agent Replied",
            description: "A support agent responds to the ticket.",
          },
          {
            id: "STATUS_UPDATED",
            name: "Status Updated",
            description: "The ticket status changes to a new state.",
          },
          {
            id: "PRIORITY_UPDATED",
            name: "Priority Updated",
            description: "The ticket priority level is adjusted.",
          },
          {
            id: "ASSIGNED",
            name: "Assigned",
            description: "A ticket is assigned to an agent or team.",
          },
          {
            id: "ESCALATED",
            name: "Ticket Escalated",
            description: "The ticket is escalated to a higher tier.",
          },
          {
            id: "RESOLVED",
            name: "Ticket Resolved",
            description: "The ticket is marked as resolved.",
          },
          {
            id: "CLOSED",
            name: "Ticket Closed",
            description: "The ticket is closed and archived.",
          },
          {
            id: "CANCELLED",
            name: "Ticket Cancelled",
            description: "The ticket is cancelled and no longer active.",
          },
        ];

        setEvents(sampleEvents);
        setFilteredEvents(sampleEvents);
        setLoading(false);
      }, 800);
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    let filtered = events;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (event) =>
          event.id.toLowerCase().includes(term) ||
          event.name.toLowerCase().includes(term) ||
          event.description.toLowerCase().includes(term)
      );
    }

    setFilteredEvents(filtered);
    setCurrentPage(1);
  }, [searchTerm, events]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredEvents.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return (
      <div className={styles["loading-container"]}>
        <div className={styles["loading-spinner"]}></div>
        <p>Loading events...</p>
      </div>
    );
  }

  return (
    <div className={styles["events-container"]}>
      <div className={styles["page-header"]}>
        <div className={styles["header-left"]}>
          <button
            className={styles["back-btn"]}
            onClick={() => navigate("/admin/tickets")}
          >
            <ArrowLeft size={20} />
          </button>
          <div className={styles["page-icon"]}>
            <Activity size={24} />
          </div>
          <div>
            <h1>Ticket Events</h1>
            <p>Enum-defined system events for auditing and visibility</p>
          </div>
        </div>
        <div className={styles["readonly-pill"]}>Read-only</div>
      </div>

      <div className={styles["info-panel"]}>
        <div className={styles["info-card"]}>
          <h3>Module Purpose</h3>
          <p>
            Ticket events describe meaningful system actions like replies,
            escalations, and closures to keep audit trails consistent.
          </p>
        </div>
        <div className={styles["info-card"]}>
          <h3>Enum-Driven</h3>
          <p>
            Events are fixed at the system level. Admins can view but cannot
            add, edit, or delete entries.
          </p>
        </div>
      </div>

      <div className={styles["controls-section"]}>
        <div className={styles["search-container"]}>
          <Search className={styles["search-icon"]} size={20} />
          <input
            type="text"
            placeholder="Search events..."
            className={styles["search-input"]}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className={styles["results-info"]}>
        Showing {currentItems.length} of {filteredEvents.length} events
      </div>

      <div className={styles["table-container"]}>
        {currentItems.length === 0 ? (
          <div className={styles["empty-state"]}>
            <div className={styles["empty-content"]}>
              <Activity className={styles["empty-icon"]} size={48} />
              <h3>No events found</h3>
              <p>
                {searchTerm
                  ? "Try adjusting your search criteria"
                  : "No events are available"}
              </p>
            </div>
          </div>
        ) : (
          <table className={styles["events-table"]}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((event) => (
                <tr key={event.id}>
                  <td>
                    <div className={styles["event-id"]}>{event.id}</div>
                  </td>
                  <td>
                    <div className={styles["event-name"]}>{event.name}</div>
                  </td>
                  <td>
                    <div className={styles["event-description"]}>
                      {event.description}
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
    </div>
  );
};

export default Events;
