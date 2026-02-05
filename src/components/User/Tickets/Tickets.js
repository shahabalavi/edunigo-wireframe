import React, { useEffect, useState } from "react";
import { Ticket, Search, Plus, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import styles from "./Tickets.module.css";

const UserTickets = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      setTimeout(() => {
        const sampleTickets = [
          {
            id: 1,
            code: "TCK-2026-1042",
            subject: "Application Status Inquiry",
            status: { name: "open", title: "Open" },
            priority: { name: "medium", title: "Medium" },
            topic: "General",
            target: "Computer Science - Fall 2026",
            supportAdmin: "Admin User",
            createdAt: "2026-02-01T10:18:00Z",
          },
          {
            id: 2,
            code: "TCK-2026-1065",
            subject: "Document Upload Issue",
            status: { name: "in_progress", title: "In Progress" },
            priority: { name: "high", title: "High" },
            topic: "Document Uploads",
            target: "MBA Admission Review",
            supportAdmin: "Olivia Grant",
            createdAt: "2026-02-02T08:40:00Z",
          },
          {
            id: 3,
            code: "TCK-2026-1081",
            subject: "Payment Processing Question",
            status: { name: "resolved", title: "Resolved" },
            priority: { name: "low", title: "Low" },
            topic: "Payments",
            target: "Fee Payment Portal",
            supportAdmin: "Admin User",
            createdAt: "2026-02-02T13:05:00Z",
          },
        ];

        setTickets(sampleTickets);
        setFilteredTickets(sampleTickets);
        setLoading(false);
      }, 700);
    };

    fetchTickets();
  }, []);

  useEffect(() => {
    let filtered = tickets;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (ticket) =>
          ticket.code.toLowerCase().includes(term) ||
          ticket.subject.toLowerCase().includes(term) ||
          ticket.topic.toLowerCase().includes(term) ||
          ticket.target.toLowerCase().includes(term)
      );
    }
    setFilteredTickets(filtered);
  }, [searchTerm, tickets]);

  const formatDate = (dateString) => new Date(dateString).toLocaleString();

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
      <div className={styles["page-header"]}>
        <div className={styles["header-left"]}>
          <div className={styles["page-icon"]}>
            <Ticket size={24} />
          </div>
          <div>
            <h1>Tickets</h1>
            <p>Your support requests and assigned admin</p>
          </div>
        </div>
        <button
          className={styles["create-btn"]}
          onClick={() => navigate("/user/tickets/create")}
        >
          <Plus size={16} />
          Create Ticket
        </button>
      </div>

      <div className={styles["controls-section"]}>
        <div className={styles["search-container"]}>
          <Search className={styles["search-icon"]} size={18} />
          <input
            type="text"
            placeholder="Search by code, subject, topic, or target..."
            className={styles["search-input"]}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className={styles["results-info"]}>
        Showing {filteredTickets.length} tickets
      </div>

      <div className={styles["table-container"]}>
        <table className={styles["tickets-table"]}>
          <thead>
            <tr>
              <th>Ticket</th>
              <th>Status</th>
              <th>Topic</th>
              <th>Target</th>
              <th>Support Admin</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.map((ticket) => (
              <tr key={ticket.id}>
                <td>
                  <div className={styles["ticket-info"]}>
                    <div className={styles["ticket-code"]}>{ticket.code}</div>
                    <div className={styles["ticket-subject"]}>
                      {ticket.subject}
                    </div>
                  </div>
                </td>
                <td>
                  <span
                    className={`${styles["status-badge"]} ${
                      styles[`status-${ticket.status.name}`]
                    }`}
                  >
                    {ticket.status.title}
                  </span>
                </td>
                <td>{ticket.topic}</td>
                <td>{ticket.target}</td>
                <td>{ticket.supportAdmin}</td>
                <td>{formatDate(ticket.createdAt)}</td>
                <td>
                  <button
                    className={styles["view-btn"]}
                    onClick={() => navigate(`/user/tickets/${ticket.id}`)}
                  >
                    <Eye size={16} />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTickets;
