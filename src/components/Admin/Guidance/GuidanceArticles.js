import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Plus,
  Search,
  Edit2,
  ArrowUpRight,
  Archive,
} from "lucide-react";
import styles from "./GuidanceArticles.module.css";

const GuidanceArticles = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const categories = [
    { id: 1, title: "Documents" },
    { id: 2, title: "Payments" },
    { id: 3, title: "Visa" },
    { id: 4, title: "General" },
  ];

  useEffect(() => {
    const sampleArticles = [
      {
        id: 101,
        title: "Upload documents correctly",
        summary: "Step-by-step guidance to avoid common document upload errors.",
        categoryId: 1,
        status: "Published",
        layout: "Card",
        ctaText: "Get Help",
        updatedAt: "2026-02-02T08:10:00Z",
      },
      {
        id: 102,
        title: "Pay your tuition deposit",
        summary: "Confirm payment channels, fees, and receipt timelines.",
        categoryId: 2,
        status: "Draft",
        layout: "Collapsible",
        ctaText: "Start Payment",
        updatedAt: "2026-02-01T12:45:00Z",
      },
      {
        id: 103,
        title: "Visa interview checklist",
        summary: "Checklist to bring to your embassy appointment.",
        categoryId: 3,
        status: "Published",
        layout: "Card",
        ctaText: "Book Mock Interview",
        updatedAt: "2026-01-28T15:20:00Z",
      },
      {
        id: 104,
        title: "Welcome week essentials",
        summary: "Campus arrival tips, housing setup, and orientation schedule.",
        categoryId: 4,
        status: "Archived",
        layout: "Card",
        ctaText: "View Checklist",
        updatedAt: "2026-01-18T09:30:00Z",
      },
    ];

    setArticles(sampleArticles);
  }, []);

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        categoryFilter === "all" ||
        String(article.categoryId) === categoryFilter;
      const matchesStatus =
        statusFilter === "all" ||
        article.status.toLowerCase() === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [articles, searchTerm, categoryFilter, statusFilter]);

  const getCategoryName = (categoryId) => {
    return categories.find((category) => category.id === categoryId)?.title ||
      "Unassigned";
  };

  const togglePublish = (articleId) => {
    setArticles((prev) =>
      prev.map((article) => {
        if (article.id !== articleId) return article;
        if (article.status === "Published") {
          return { ...article, status: "Draft" };
        }
        if (article.status === "Draft") {
          return { ...article, status: "Published" };
        }
        return article;
      })
    );
  };

  const archiveArticle = (articleId) => {
    setArticles((prev) =>
      prev.map((article) =>
        article.id === articleId ? { ...article, status: "Archived" } : article
      )
    );
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "—";
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <div className={styles["guidance-container"]}>
      <div className={styles["page-header"]}>
        <div className={styles["header-left"]}>
          <div className={styles["page-icon"]}>
            <BookOpen size={22} />
          </div>
          <div>
            <h1>Guidance Articles</h1>
            <p>Create, publish, and maintain user-facing guidance content.</p>
          </div>
        </div>
        <button
          className={styles["create-btn"]}
          onClick={() => navigate("/admin/guidance/editor")}
        >
          <Plus size={18} />
          Add Article
        </button>
      </div>

      <div className={styles["controls-section"]}>
        <div className={styles["search-container"]}>
          <Search size={16} className={styles["search-icon"]} />
          <input
            className={styles["search-input"]}
            placeholder="Search titles or summaries"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
        <select
          className={styles["filter-select"]}
          value={categoryFilter}
          onChange={(event) => setCategoryFilter(event.target.value)}
        >
          <option value="all">All categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.title}
            </option>
          ))}
        </select>
        <select
          className={styles["filter-select"]}
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
        >
          <option value="all">All statuses</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      <div className={styles["results-info"]}>
        Showing {filteredArticles.length} of {articles.length} guidance items
      </div>

      <div className={styles["table-container"]}>
        <table className={styles["articles-table"]}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Layout</th>
              <th>Last Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredArticles.map((article) => (
              <tr key={article.id}>
                <td>
                  <div className={styles["article-title"]}>{article.title}</div>
                  <div className={styles["article-summary"]}>{article.summary}</div>
                </td>
                <td>{getCategoryName(article.categoryId)}</td>
                <td>
                  <span
                    className={`${styles["badge"]} ${styles[article.status.toLowerCase()]}`}
                  >
                    {article.status}
                  </span>
                </td>
                <td>{article.layout}</td>
                <td>{formatDate(article.updatedAt)}</td>
                <td>
                  <div className={styles["actions"]}>
                    <button
                      className={styles["action-btn"]}
                      onClick={() => navigate(`/admin/guidance/editor/${article.id}`)}
                    >
                      <Edit2 size={14} />
                      Edit
                    </button>
                    <button
                      className={styles["action-btn"]}
                      onClick={() => togglePublish(article.id)}
                    >
                      <ArrowUpRight size={14} />
                      {article.status === "Published" ? "Unpublish" : "Publish"}
                    </button>
                    <button
                      className={`${styles["action-btn"]} ${styles["archive-btn"]}`}
                      onClick={() => archiveArticle(article.id)}
                    >
                      <Archive size={14} />
                      Archive
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GuidanceArticles;
