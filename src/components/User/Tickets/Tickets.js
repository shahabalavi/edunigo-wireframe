import React, { useEffect, useMemo, useState } from "react";
import {
  Ticket,
  Search,
  Plus,
  Eye,
  Building2,
  CreditCard,
  Laptop,
  User,
  Shield,
  BookOpen,
  Image,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import styles from "./Tickets.module.css";

const UserTickets = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [guidanceSearch, setGuidanceSearch] = useState("");
  const [guidanceCategory, setGuidanceCategory] = useState("application");
  const [expandedGuidance, setExpandedGuidance] = useState({});
  const [guidanceAttachment, setGuidanceAttachment] = useState(null);

  const departments = [
    {
      id: "admissions",
      title: "Admissions",
      description: "Applications and enrollment guidance",
      icon: Building2,
      presetTopic: "application-status",
    },
    {
      id: "finance",
      title: "Finance",
      description: "Invoices, payments, and refunds",
      icon: CreditCard,
      presetTopic: "payments",
    },
    {
      id: "technical",
      title: "Technical",
      description: "Platform issues and access problems",
      icon: Laptop,
      presetTopic: "account-access",
    },
    {
      id: "profile",
      title: "Profile Support",
      description: "Account and profile updates",
      icon: User,
      presetTopic: "profile-update",
    },
    {
      id: "operations",
      title: "Operations",
      description: "Policy or process questions",
      icon: Shield,
      presetTopic: "general",
    },
  ];

  const guidanceCategories = [
    { id: "application", title: "Application status" },
    { id: "documents", title: "Documents" },
    { id: "general", title: "General" },
    { id: "offer", title: "Offer and decision" },
    { id: "payments", title: "Payments" },
    { id: "safety", title: "Safety" },
    { id: "visa", title: "Visa" },
  ];

  const guidanceItems = [
    {
      id: 1,
      categoryId: "application",
      title: "Track your application status",
      summary:
        "How to read status updates and what each stage means in your portal.",
      ctaText: "Get Help",
      ctaUrl: "/user/student-support",
    },
    {
      id: 2,
      categoryId: "application",
      title: "University requests more documents",
      summary:
        "If additional documents are requested, upload them within 14 days to avoid delays.",
      ctaText: "Get Help",
      ctaUrl: "/user/student-support",
    },
    {
      id: 3,
      categoryId: "documents",
      title: "Upload documents correctly",
      summary: "Checklist for PDF scans, naming, and file size limits.",
      ctaText: "Get Help",
      ctaUrl: "/user/student-support",
    },
    {
      id: 4,
      categoryId: "payments",
      title: "Pay your tuition deposit",
      summary: "Available channels, fees, and receipt timelines.",
      ctaText: "Get Help",
      ctaUrl: "/user/student-support",
    },
    {
      id: 5,
      categoryId: "visa",
      title: "Visa interview checklist",
      summary: "Items to bring and how to prepare for your appointment.",
      ctaText: "Get Help",
      ctaUrl: "/user/student-support",
    },
  ];

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

  const filteredGuidance = useMemo(() => {
    const term = guidanceSearch.toLowerCase();
    return guidanceItems.filter((item) => {
      const matchesCategory = guidanceCategory === item.categoryId;
      const matchesSearch =
        !term ||
        item.title.toLowerCase().includes(term) ||
        item.summary.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });
  }, [guidanceItems, guidanceCategory, guidanceSearch]);

  const handleGuidanceAttach = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setGuidanceAttachment(file);
    event.target.value = "";
  };

  const toggleGuidanceItem = (id) => {
    setExpandedGuidance((prev) => ({ ...prev, [id]: !prev[id] }));
  };

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

      <div className={styles["department-section"]}>
        <div className={styles["section-header"]}>
          <h3>Open a New Ticket</h3>
          <p>Select a department to get started quickly</p>
        </div>
        <div className={styles["department-grid"]}>
          {departments.map((dept) => {
            const Icon = dept.icon;
            return (
              <button
                key={dept.id}
                className={styles["department-card"]}
                onClick={() => {
                  const query = dept.presetTopic
                    ? `?topic=${dept.presetTopic}`
                    : "";
                  navigate(`/user/tickets/create${query}`);
                }}
              >
                <div className={styles["department-icon"]}>
                  <Icon size={22} />
                </div>
                <div className={styles["department-info"]}>
                  <div className={styles["department-title"]}>
                    {dept.title}
                  </div>
                  <div className={styles["department-desc"]}>
                    {dept.description}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
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

      <div className={styles["guidance-widget"]}>
        <div className={styles["guidance-top"]}>
          <div>
            <div className={styles["guidance-title"]}>Guidance Library</div>
            <div className={styles["guidance-subtitle"]}>
              Find quick answers before opening a ticket.
            </div>
          </div>
          <span className={styles["guidance-pill"]}>Self-service</span>
        </div>

        <div className={styles["guidance-search"]}>
          <div className={styles["guidance-search-input"]}>
            <Search size={18} className={styles["search-icon"]} />
            <input
              type="text"
              placeholder="Describe your issue or search the library..."
              value={guidanceSearch}
              onChange={(e) => setGuidanceSearch(e.target.value)}
            />
            <span className={styles["search-hint"]}>Press Enter</span>
          </div>
          <label className={styles["attach-btn"]}>
            <Image size={16} />
            Attach image
            <input type="file" accept="image/*" onChange={handleGuidanceAttach} />
          </label>
        </div>

        <div className={styles["guidance-body"]}>
          <div className={styles["guidance-sidebar"]}>
            <div className={styles["sidebar-title"]}>Categories</div>
            <div className={styles["sidebar-list"]}>
              {guidanceCategories.map((category) => (
                <button
                  key={category.id}
                  className={`${styles["sidebar-item"]} ${
                    guidanceCategory === category.id ? styles["active"] : ""
                  }`}
                  onClick={() => setGuidanceCategory(category.id)}
                >
                  {category.title}
                </button>
              ))}
            </div>
          </div>

          <div className={styles["guidance-content"]}>
            {filteredGuidance.map((item) => (
              <div key={item.id} className={styles["guidance-card"]}>
                <button
                  className={styles["guidance-toggle"]}
                  onClick={() => toggleGuidanceItem(item.id)}
                >
                  {expandedGuidance[item.id] ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                  <span>{item.title}</span>
                </button>
                <div
                  className={`${styles["guidance-details"]} ${
                    expandedGuidance[item.id] ? styles["expanded"] : ""
                  }`}
                >
                  <p>{item.summary}</p>
                </div>
                <button
                  className={styles["guidance-cta"]}
                  onClick={() => navigate(item.ctaUrl)}
                >
                  {item.ctaText}
                </button>
              </div>
            ))}

            {filteredGuidance.length === 0 && (
              <div className={styles["guidance-empty"]}>
                No guidance found. Try a different search or category.
              </div>
            )}

            {guidanceAttachment && (
              <div className={styles["attachment-preview"]}>
                Attached: {guidanceAttachment.name}
                <button onClick={() => setGuidanceAttachment(null)}>Remove</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTickets;
