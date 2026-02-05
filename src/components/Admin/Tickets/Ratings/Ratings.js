import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Star,
  ArrowLeft,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import styles from "./Ratings.module.css";

const Ratings = () => {
  const navigate = useNavigate();
  const [ratings, setRatings] = useState([]);
  const [filteredRatings, setFilteredRatings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  useEffect(() => {
    const fetchRatings = async () => {
      setTimeout(() => {
        const sampleRatings = [
          {
            id: 1,
            ticketCode: "TCK-2026-1042",
            admin: "Admin User",
            user: "John Doe",
            score: 5,
            comment: "Very helpful and quick response.",
            topic: "Application Status",
            priority: "Medium",
            createdAt: "2026-02-03T15:10:00Z",
          },
          {
            id: 2,
            ticketCode: "TCK-2026-1065",
            admin: "Olivia Grant",
            user: "Jane Smith",
            score: 4,
            comment: "Resolved after follow-up, good support.",
            topic: "Document Uploads",
            priority: "High",
            createdAt: "2026-02-04T11:45:00Z",
          },
          {
            id: 3,
            ticketCode: "TCK-2026-1081",
            admin: "Admin User",
            user: "Robert Chen",
            score: 3,
            comment: "Clear guidance but took a bit long.",
            topic: "Payments",
            priority: "Low",
            createdAt: "2026-02-02T17:05:00Z",
          },
          {
            id: 4,
            ticketCode: "TCK-2026-1123",
            admin: "Olivia Grant",
            user: "Ahmed Ali",
            score: 5,
            comment: "Excellent communication.",
            topic: "Profile Updates",
            priority: "Medium",
            createdAt: "2026-02-05T12:22:00Z",
          },
        ];

        setRatings(sampleRatings);
        setFilteredRatings(sampleRatings);
        setLoading(false);
      }, 700);
    };

    fetchRatings();
  }, []);

  useEffect(() => {
    let filtered = ratings;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (rating) =>
          rating.ticketCode.toLowerCase().includes(term) ||
          rating.admin.toLowerCase().includes(term) ||
          rating.user.toLowerCase().includes(term) ||
          rating.topic.toLowerCase().includes(term)
      );
    }
    setFilteredRatings(filtered);
    setCurrentPage(1);
  }, [searchTerm, ratings]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRatings.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredRatings.length / itemsPerPage);

  const averageScore =
    ratings.length === 0
      ? 0
      : (
          ratings.reduce((sum, rating) => sum + rating.score, 0) / ratings.length
        ).toFixed(1);

  const formatDate = (dateString) => new Date(dateString).toLocaleString();

  if (loading) {
    return (
      <div className={styles["loading-container"]}>
        <div className={styles["loading-spinner"]}></div>
        <p>Loading ratings...</p>
      </div>
    );
  }

  return (
    <div className={styles["ratings-container"]}>
      <div className={styles["page-header"]}>
        <div className={styles["header-left"]}>
          <button
            className={styles["back-btn"]}
            onClick={() => navigate("/admin/tickets")}
          >
            <ArrowLeft size={20} />
          </button>
          <div className={styles["page-icon"]}>
            <Star size={24} />
          </div>
          <div>
            <h1>Support Ratings</h1>
            <p>Track satisfaction across support admins and tickets</p>
          </div>
        </div>
      </div>

      <div className={styles["summary-grid"]}>
        <div className={styles["summary-card"]}>
          <div className={styles["summary-label"]}>Average Rating</div>
          <div className={styles["summary-value"]}>{averageScore}</div>
          <div className={styles["summary-sub"]}>Last 30 days</div>
        </div>
        <div className={styles["summary-card"]}>
          <div className={styles["summary-label"]}>Total Feedback</div>
          <div className={styles["summary-value"]}>{ratings.length}</div>
          <div className={styles["summary-sub"]}>Submitted ratings</div>
        </div>
        <div className={styles["summary-card"]}>
          <div className={styles["summary-label"]}>5-Star Share</div>
          <div className={styles["summary-value"]}>
            {ratings.length
              ? Math.round(
                  (ratings.filter((rating) => rating.score === 5).length /
                    ratings.length) *
                    100
                )
              : 0}
            %
          </div>
          <div className={styles["summary-sub"]}>Top ratings</div>
        </div>
      </div>

      <div className={styles["controls-section"]}>
        <div className={styles["search-container"]}>
          <Search className={styles["search-icon"]} size={20} />
          <input
            type="text"
            placeholder="Search by ticket, admin, user, or topic..."
            className={styles["search-input"]}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className={styles["results-info"]}>
        Showing {currentItems.length} of {filteredRatings.length} ratings
      </div>

      <div className={styles["table-container"]}>
        {currentItems.length === 0 ? (
          <div className={styles["empty-state"]}>
            <div className={styles["empty-content"]}>
              <Star className={styles["empty-icon"]} size={48} />
              <h3>No ratings found</h3>
              <p>
                {searchTerm
                  ? "Try adjusting your search criteria"
                  : "No feedback has been submitted yet"}
              </p>
            </div>
          </div>
        ) : (
          <table className={styles["ratings-table"]}>
            <thead>
              <tr>
                <th>Ticket</th>
                <th>Support Admin</th>
                <th>User</th>
                <th>Score</th>
                <th>Topic</th>
                <th>Priority</th>
                <th>Comment</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((rating) => (
                <tr key={rating.id}>
                  <td>
                    <div className={styles["ticket-code"]}>
                      {rating.ticketCode}
                    </div>
                  </td>
                  <td>{rating.admin}</td>
                  <td>{rating.user}</td>
                  <td>
                    <div className={styles["score-pill"]}>
                      {rating.score} / 5
                    </div>
                  </td>
                  <td>{rating.topic}</td>
                  <td>{rating.priority}</td>
                  <td className={styles["comment-cell"]}>
                    {rating.comment || "—"}
                  </td>
                  <td>{formatDate(rating.createdAt)}</td>
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
            onClick={() => setCurrentPage(currentPage - 1)}
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
                  onClick={() => setCurrentPage(pageNumber)}
                >
                  {pageNumber}
                </button>
              )
            )}
          </div>

          <button
            className={styles["pagination-btn"]}
            onClick={() => setCurrentPage(currentPage + 1)}
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

export default Ratings;
