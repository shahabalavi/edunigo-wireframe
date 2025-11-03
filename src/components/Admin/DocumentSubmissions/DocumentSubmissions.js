import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Filter,
  Eye,
  FileText,
  User,
  Building2,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import styles from "./DocumentSubmissions.module.css";

const DocumentSubmissions = () => {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [documentTypeFilter, setDocumentTypeFilter] = useState("all");
  const [universityFilter, setUniversityFilter] = useState("all");
  const [userFilter, setUserFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Utility function to check if document is expired
  const checkExpiration = (submissionData) => {
    if (submissionData.status === "verified" && submissionData.expirationDate) {
      const expirationDate = new Date(submissionData.expirationDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      expirationDate.setHours(0, 0, 0, 0);

      if (expirationDate < today) {
        return {
          isExpired: true,
          status: "expired",
          statusLabel: "Expired",
        };
      }
    }
    return {
      isExpired: false,
      status: submissionData.status,
      statusLabel: submissionData.statusLabel,
    };
  };

  // Sample data - replace with actual API call
  useEffect(() => {
    setTimeout(() => {
      const sampleSubmissions = [
        {
          id: 1,
          user: {
            id: 101,
            name: "John Smith",
            email: "john.smith@email.com",
          },
          document: {
            id: 3,
            name: "IELTS Certificate",
            category: "Language Certificates",
          },
          university: {
            id: 1,
            name: "Harvard University",
          },
          status: "pending",
          statusLabel: "Pending Verification",
          submittedAt: "2024-12-10T10:30:00Z",
          updatedAt: "2024-12-10T10:30:00Z",
          rejectionReason: null,
        },
        {
          id: 2,
          user: {
            id: 102,
            name: "Sarah Johnson",
            email: "sarah.j@email.com",
          },
          document: {
            id: 4,
            name: "TOEFL Score Report",
            category: "Language Certificates",
          },
          university: {
            id: 2,
            name: "University of Oxford",
          },
          status: "verified",
          statusLabel: "Verified",
          submittedAt: "2024-12-08T14:20:00Z",
          updatedAt: "2024-12-09T09:15:00Z",
          verifiedAt: "2024-12-09T09:15:00Z",
          expirationDate: "2025-12-09T00:00:00Z", // Expires in future
          rejectionReason: null,
        },
        {
          id: 3,
          user: {
            id: 103,
            name: "Michael Chen",
            email: "michael.chen@email.com",
          },
          document: {
            id: 1,
            name: "Passport",
            category: "Identity Documents",
          },
          university: null, // Auto-attached, not university-specific
          status: "rejected",
          statusLabel: "Rejected",
          submittedAt: "2024-12-05T16:45:00Z",
          updatedAt: "2024-12-06T11:30:00Z",
          rejectionReason:
            "Passport image is not clear. Please upload a clearer scan.",
        },
        {
          id: 4,
          user: {
            id: 104,
            name: "Emma Wilson",
            email: "emma.wilson@email.com",
          },
          document: {
            id: 5,
            name: "Education History",
            category: "Academic Records",
          },
          university: null,
          status: "pending",
          statusLabel: "Pending Verification",
          submittedAt: "2024-12-11T08:15:00Z",
          updatedAt: "2024-12-11T08:15:00Z",
          rejectionReason: null,
        },
        {
          id: 5,
          user: {
            id: 105,
            name: "David Brown",
            email: "david.brown@email.com",
          },
          document: {
            id: 6,
            name: "Bank Statement",
            category: "Financial Documents",
          },
          university: {
            id: 3,
            name: "University of Toronto",
          },
          status: "verified",
          statusLabel: "Verified",
          submittedAt: "2024-12-07T12:00:00Z",
          updatedAt: "2024-12-08T10:00:00Z",
          verifiedAt: "2024-12-08T10:00:00Z",
          expirationDate: null,
          rejectionReason: null,
        },
        {
          id: 6,
          user: {
            id: 101,
            name: "John Smith",
            email: "john.smith@email.com",
          },
          document: {
            id: 7,
            name: "Letter of Recommendation",
            category: "Recommendation Letters",
          },
          university: {
            id: 1,
            name: "Harvard University",
          },
          status: "rejected",
          statusLabel: "Rejected",
          submittedAt: "2024-12-09T15:30:00Z",
          updatedAt: "2024-12-10T09:00:00Z",
          rejectionReason: "The letter is not signed by the recommender.",
        },
        {
          id: 7,
          user: {
            id: 106,
            name: "Lisa Anderson",
            email: "lisa.anderson@email.com",
          },
          document: {
            id: 8,
            name: "Cambridge Certificate",
            category: "Language Certificates",
          },
          university: {
            id: 2,
            name: "University of Oxford",
          },
          status: "verified",
          statusLabel: "Verified", // Will be changed to expired
          submittedAt: "2023-06-15T10:00:00Z",
          updatedAt: "2023-06-20T14:30:00Z",
          verifiedAt: "2023-06-20T14:30:00Z",
          expirationDate: "2024-06-20T00:00:00Z", // Already expired
          rejectionReason: null,
        },
      ];

      // Check expiration for all submissions
      const checkedSubmissions = sampleSubmissions.map((sub) => {
        const expirationCheck = checkExpiration(sub);
        return {
          ...sub,
          status: expirationCheck.status,
          statusLabel: expirationCheck.statusLabel,
          isExpired: expirationCheck.isExpired,
        };
      });

      setSubmissions(checkedSubmissions);
      setFilteredSubmissions(checkedSubmissions);
      setLoading(false);
    }, 1000);
  }, []);

  // Get unique filter options
  const documentTypes = [
    ...new Set(submissions.map((s) => s.document.name)),
  ].sort();
  const universities = [
    ...new Set(
      submissions.filter((s) => s.university).map((s) => s.university.name)
    ),
  ].sort();
  const users = [
    ...new Set(submissions.map((s) => `${s.user.name} (${s.user.email})`)),
  ].sort();

  // Filter and search functionality
  useEffect(() => {
    let filtered = submissions;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (submission) =>
          submission.user.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          submission.user.email
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          submission.document.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (submission) => submission.status === statusFilter
      );
    }

    // Apply document type filter
    if (documentTypeFilter !== "all") {
      filtered = filtered.filter(
        (submission) => submission.document.name === documentTypeFilter
      );
    }

    // Apply university filter
    if (universityFilter !== "all") {
      filtered = filtered.filter(
        (submission) =>
          submission.university &&
          submission.university.name === universityFilter
      );
    }

    // Apply user filter
    if (userFilter !== "all") {
      const [userName] = userFilter.split(" (");
      filtered = filtered.filter(
        (submission) => submission.user.name === userName
      );
    }

    setFilteredSubmissions(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  }, [
    searchTerm,
    statusFilter,
    documentTypeFilter,
    universityFilter,
    userFilter,
    submissions,
  ]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSubmissions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredSubmissions.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleViewDetails = (submissionId) => {
    navigate(`/admin/document-submissions/${submissionId}`);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "verified":
        return (
          <CheckCircle2 size={16} className={styles["status-icon-verified"]} />
        );
      case "rejected":
        return <XCircle size={16} className={styles["status-icon-rejected"]} />;
      case "expired":
        return (
          <AlertTriangle size={16} className={styles["status-icon-expired"]} />
        );
      case "pending":
      default:
        return <Clock size={16} className={styles["status-icon-pending"]} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "verified":
        return "verified";
      case "rejected":
        return "rejected";
      case "expired":
        return "expired";
      case "pending":
      default:
        return "pending";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className={styles["loading-container"]}>
        <div className={styles["loading-spinner"]}></div>
        <p>Loading document submissions...</p>
      </div>
    );
  }

  return (
    <div className={styles["submissions-container"]}>
      {/* Header */}
      <div className={styles["page-header"]}>
        <div className={styles["header-left"]}>
          <div className={styles["page-icon"]}>
            <FileText size={24} />
          </div>
          <div>
            <h1>Document Submissions</h1>
            <p>Review and manage documents uploaded by users</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className={styles["stats-section"]}>
        <div className={styles["stat-card"]}>
          <div className={styles["stat-icon"]}>
            <FileText size={20} />
          </div>
          <div className={styles["stat-content"]}>
            <span className={styles["stat-number"]}>{submissions.length}</span>
            <span className={styles["stat-label"]}>Total Submissions</span>
          </div>
        </div>
        <div className={styles["stat-card"]}>
          <div className={styles["stat-icon"]}>
            <Clock size={20} />
          </div>
          <div className={styles["stat-content"]}>
            <span className={styles["stat-number"]}>
              {submissions.filter((s) => s.status === "pending").length}
            </span>
            <span className={styles["stat-label"]}>Pending</span>
          </div>
        </div>
        <div className={styles["stat-card"]}>
          <div className={styles["stat-icon"]}>
            <CheckCircle2 size={20} />
          </div>
          <div className={styles["stat-content"]}>
            <span className={styles["stat-number"]}>
              {submissions.filter((s) => s.status === "verified").length}
            </span>
            <span className={styles["stat-label"]}>Verified</span>
          </div>
        </div>
        <div className={styles["stat-card"]}>
          <div className={styles["stat-icon"]}>
            <XCircle size={20} />
          </div>
          <div className={styles["stat-content"]}>
            <span className={styles["stat-number"]}>
              {submissions.filter((s) => s.status === "rejected").length}
            </span>
            <span className={styles["stat-label"]}>Rejected</span>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className={styles["controls-section"]}>
        <div className={styles["search-container"]}>
          <Search size={18} className={styles["search-icon"]} />
          <input
            type="text"
            placeholder="Search by user name, email, or document name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles["search-input"]}
          />
        </div>

        <div className={styles["filters-row"]}>
          <div className={styles["filter-container"]}>
            <Filter size={18} className={styles["filter-icon"]} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={styles["filter-select"]}
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending Verification</option>
              <option value="verified">Verified</option>
              <option value="expired">Expired</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div className={styles["filter-container"]}>
            <FileText size={18} className={styles["filter-icon"]} />
            <select
              value={documentTypeFilter}
              onChange={(e) => setDocumentTypeFilter(e.target.value)}
              className={styles["filter-select"]}
            >
              <option value="all">All Document Types</option>
              {documentTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className={styles["filter-container"]}>
            <Building2 size={18} className={styles["filter-icon"]} />
            <select
              value={universityFilter}
              onChange={(e) => setUniversityFilter(e.target.value)}
              className={styles["filter-select"]}
            >
              <option value="all">All Universities</option>
              {universities.map((uni) => (
                <option key={uni} value={uni}>
                  {uni}
                </option>
              ))}
            </select>
          </div>

          <div className={styles["filter-container"]}>
            <User size={18} className={styles["filter-icon"]} />
            <select
              value={userFilter}
              onChange={(e) => setUserFilter(e.target.value)}
              className={styles["filter-select"]}
            >
              <option value="all">All Users</option>
              {users.map((user) => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Info */}
      <div className={styles["results-info"]}>
        <span>
          Showing {indexOfFirstItem + 1}-
          {Math.min(indexOfLastItem, filteredSubmissions.length)} of{" "}
          {filteredSubmissions.length} submissions
        </span>
      </div>

      {/* Submissions Table */}
      <div className={styles["table-container"]}>
        <table className={styles["submissions-table"]}>
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Document</th>
              <th>University</th>
              <th>Status</th>
              <th>Submitted</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((submission) => (
                <tr key={submission.id}>
                  <td>{submission.id}</td>
                  <td>
                    <div className={styles["user-info"]}>
                      <div className={styles["user-avatar"]}>
                        {submission.user.name.charAt(0)}
                      </div>
                      <div className={styles["user-details"]}>
                        <span className={styles["user-name"]}>
                          {submission.user.name}
                        </span>
                        <span className={styles["user-email"]}>
                          {submission.user.email}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className={styles["document-info"]}>
                      <span className={styles["document-name"]}>
                        {submission.document.name}
                      </span>
                      <span className={styles["document-category"]}>
                        {submission.document.category}
                      </span>
                    </div>
                  </td>
                  <td>
                    {submission.university ? (
                      <div className={styles["university-info"]}>
                        <Building2 size={14} />
                        <span>{submission.university.name}</span>
                      </div>
                    ) : (
                      <span className={styles["auto-attached"]}>
                        Auto-Attached
                      </span>
                    )}
                  </td>
                  <td>
                    <div
                      className={[
                        styles["status-badge"],
                        styles[getStatusColor(submission.status)],
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {getStatusIcon(submission.status)}
                      {submission.statusLabel}
                    </div>
                    {submission.rejectionReason && (
                      <div className={styles["rejection-preview"]}>
                        <AlertCircle size={12} />
                        <span>Rejected</span>
                      </div>
                    )}
                  </td>
                  <td>
                    <div className={styles["date-info"]}>
                      <span>{formatDate(submission.submittedAt)}</span>
                    </div>
                  </td>
                  <td>
                    <button
                      onClick={() => handleViewDetails(submission.id)}
                      className={styles["view-btn"]}
                      title="View Details"
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className={styles["empty-state"]}>
                  <div className={styles["empty-content"]}>
                    <FileText size={48} className={styles["empty-icon"]} />
                    <h3>No submissions found</h3>
                    <p>
                      {searchTerm || statusFilter !== "all"
                        ? "No submissions match your search criteria"
                        : "No document submissions yet"}
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className={styles["pagination"]}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={styles["pagination-btn"]}
          >
            <ChevronLeft size={16} />
            Previous
          </button>

          <div className={styles["pagination-numbers"]}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={[
                  styles["pagination-number"],
                  currentPage === page ? styles["active"] : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={styles["pagination-btn"]}
          >
            Next
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default DocumentSubmissions;
