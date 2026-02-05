import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Edit2,
  Trash2,
  Plus,
  Folder,
  CreditCard,
  ShieldAlert,
  Key,
  UserX,
  Laptop,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import CreateTopicModal from "./CreateTopicModal";
import EditTopicModal from "./EditTopicModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal";
import styles from "./Topics.module.css";

const iconMap = {
  Folder,
  CreditCard,
  ShieldAlert,
  Key,
  UserX,
  Laptop,
  MessageCircle,
};

const Topics = () => {
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  const [filteredTopics, setFilteredTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchTopics = async () => {
      setTimeout(() => {
        const sampleTopics = [
          {
            id: 1,
            title: "Account Access",
            icon: "Folder",
            description: "Issues related to account login and security.",
            parent_id: null,
            display_order: 1,
            is_published: true,
            created_at: "2025-11-12T09:18:00Z",
            updated_at: "2026-01-22T14:31:00Z",
          },
          {
            id: 2,
            title: "Login Problems",
            icon: "Key",
            description: "Password resets, MFA, and authentication errors.",
            parent_id: 1,
            display_order: 1,
            is_published: true,
            created_at: "2025-11-12T09:20:00Z",
            updated_at: "2026-01-18T10:05:00Z",
          },
          {
            id: 3,
            title: "Account Locked",
            icon: "UserX",
            description: "Locked or suspended account investigations.",
            parent_id: 1,
            display_order: 2,
            is_published: false,
            created_at: "2025-12-02T11:10:00Z",
            updated_at: "2026-01-09T08:45:00Z",
          },
          {
            id: 4,
            title: "Payments",
            icon: "CreditCard",
            description: "Billing, refunds, and payment verification.",
            parent_id: null,
            display_order: 2,
            is_published: true,
            created_at: "2025-11-12T09:22:00Z",
            updated_at: "2026-01-22T14:31:00Z",
          },
          {
            id: 5,
            title: "Refund Request",
            icon: "MessageCircle",
            description: "Request a refund or billing adjustment.",
            parent_id: 4,
            display_order: 1,
            is_published: true,
            created_at: "2025-11-15T10:12:00Z",
            updated_at: "2026-01-05T12:20:00Z",
          },
          {
            id: 6,
            title: "Platform Errors",
            icon: "ShieldAlert",
            description: "System incidents and critical errors.",
            parent_id: null,
            display_order: 3,
            is_published: true,
            created_at: "2025-11-12T09:25:00Z",
            updated_at: "2026-01-22T14:31:00Z",
          },
          {
            id: 7,
            title: "Course Access",
            icon: "Laptop",
            description: "Course access issues and enrollment problems.",
            parent_id: null,
            display_order: 4,
            is_published: true,
            created_at: "2025-12-05T13:00:00Z",
            updated_at: "2026-01-12T09:30:00Z",
          },
        ];

        setTopics(sampleTopics);
        setFilteredTopics(sampleTopics);
        setLoading(false);
      }, 1000);
    };

    fetchTopics();
  }, []);

  const topicIndex = useMemo(() => {
    const index = new Map();
    topics.forEach((topic) => index.set(topic.id, topic));
    return index;
  }, [topics]);

  const buildTopicPath = (topic) => {
    const path = [];
    let current = topic;
    while (current) {
      path.unshift(current.title);
      current = current.parent_id ? topicIndex.get(current.parent_id) : null;
    }
    return path.join(" / ");
  };

  const flattenTopics = (list) => {
    const childrenByParent = new Map();
    list.forEach((topic) => {
      const parentKey = topic.parent_id ?? "root";
      if (!childrenByParent.has(parentKey)) {
        childrenByParent.set(parentKey, []);
      }
      childrenByParent.get(parentKey).push(topic);
    });

    const sortLevel = (items) =>
      items.sort((a, b) => {
        const orderA = a.display_order ?? Number.MAX_SAFE_INTEGER;
        const orderB = b.display_order ?? Number.MAX_SAFE_INTEGER;
        if (orderA !== orderB) return orderA - orderB;
        return a.title.localeCompare(b.title);
      });

    const flattened = [];
    const walk = (parentId, depth) => {
      const items = childrenByParent.get(parentId) || [];
      sortLevel(items);
      items.forEach((topic) => {
        flattened.push({
          ...topic,
          depth,
          path: buildTopicPath(topic),
        });
        walk(topic.id, depth + 1);
      });
    };

    walk("root", 0);
    return flattened;
  };

  useEffect(() => {
    let filtered = topics;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter((topic) => {
        const parentTitle = topic.parent_id
          ? topicIndex.get(topic.parent_id)?.title || ""
          : "";
        return (
          topic.title.toLowerCase().includes(term) ||
          (topic.description || "").toLowerCase().includes(term) ||
          topic.icon.toLowerCase().includes(term) ||
          parentTitle.toLowerCase().includes(term)
        );
      });
    }

    const flattened = flattenTopics(filtered);
    setFilteredTopics(flattened);
    setCurrentPage(1);
  }, [searchTerm, topics, topicIndex]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTopics.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredTopics.length / itemsPerPage);

  const handleCreateTopic = (newTopic) => {
    const id = topics.length ? Math.max(...topics.map((t) => t.id)) + 1 : 1;
    const now = new Date().toISOString();
    const topicWithId = {
      ...newTopic,
      id,
      created_at: now,
      updated_at: now,
    };
    setTopics([...topics, topicWithId]);
    setShowCreateModal(false);
  };

  const handleEditTopic = (updatedTopic) => {
    const now = new Date().toISOString();
    setTopics(
      topics.map((topic) =>
        topic.id === updatedTopic.id
          ? { ...updatedTopic, updated_at: now }
          : topic
      )
    );
    setShowEditModal(false);
    setSelectedTopic(null);
  };

  const handleDeleteTopic = () => {
    setTopics(topics.filter((topic) => topic.id !== selectedTopic.id));
    setShowDeleteModal(false);
    setSelectedTopic(null);
  };

  const openEditModal = (topic) => {
    setSelectedTopic(topic);
    setShowEditModal(true);
  };

  const openDeleteModal = (topic) => {
    setSelectedTopic(topic);
    setShowDeleteModal(true);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "—";
    return new Date(timestamp).toLocaleString();
  };

  const getIconComponent = (iconName) => {
    const IconComponent = iconMap[iconName] || Folder;
    return <IconComponent size={16} />;
  };

  if (loading) {
    return (
      <div className={styles["loading-container"]}>
        <div className={styles["loading-spinner"]}></div>
        <p>Loading topics...</p>
      </div>
    );
  }

  return (
    <div className={styles["topics-container"]}>
      <div className={styles["page-header"]}>
        <div className={styles["header-left"]}>
          <button
            className={styles["back-btn"]}
            onClick={() => navigate("/admin/tickets")}
          >
            <ArrowLeft size={20} />
          </button>
          <div className={styles["page-icon"]}>
            <Folder size={24} />
          </div>
          <div>
            <h1>Ticket Topics</h1>
            <p>Organize ticket subjects with a structured hierarchy</p>
          </div>
        </div>
        <button
          className={styles["create-btn"]}
          onClick={() => setShowCreateModal(true)}
        >
          <Plus size={20} />
          Create Topic
        </button>
      </div>

      <div className={styles["info-panel"]}>
        <div className={styles["info-card"]}>
          <h3>Module Purpose</h3>
          <p>
            Topics guide users to the right issue category while keeping ticket
            reporting structured and searchable.
          </p>
        </div>
        <div className={styles["info-card"]}>
          <h3>Hierarchy & Ordering</h3>
          <p>
            Topics are tree-based. Sort each level manually with display order
            to keep selections intuitive and consistent.
          </p>
        </div>
      </div>

      <div className={styles["controls-section"]}>
        <div className={styles["search-container"]}>
          <Search className={styles["search-icon"]} size={20} />
          <input
            type="text"
            placeholder="Search topics..."
            className={styles["search-input"]}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className={styles["results-info"]}>
        Showing {currentItems.length} of {filteredTopics.length} topics
      </div>

      <div className={styles["table-container"]}>
        {currentItems.length === 0 ? (
          <div className={styles["empty-state"]}>
            <div className={styles["empty-content"]}>
              <Folder className={styles["empty-icon"]} size={48} />
              <h3>No topics found</h3>
              <p>
                {searchTerm
                  ? "Try adjusting your search criteria"
                  : "No topics have been created yet"}
              </p>
            </div>
          </div>
        ) : (
          <table className={styles["topics-table"]}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Topic</th>
                <th>Parent</th>
                <th>Order</th>
                <th>Status</th>
                <th>Timestamps</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((topic) => (
                <tr key={topic.id}>
                  <td>
                    <div className={styles["topic-id"]}>#{topic.id}</div>
                  </td>
                  <td>
                    <div
                      className={styles["topic-main"]}
                      style={{ paddingLeft: `${topic.depth * 16}px` }}
                    >
                      <div className={styles["topic-title-row"]}>
                        <span className={styles["topic-icon"]}>
                          {getIconComponent(topic.icon)}
                        </span>
                        <div>
                          <div className={styles["topic-title"]}>
                            {topic.title}
                          </div>
                          <div className={styles["topic-path"]}>
                            {topic.path}
                          </div>
                        </div>
                      </div>
                      {topic.description && (
                        <div className={styles["topic-description"]}>
                          {topic.description}
                        </div>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className={styles["topic-parent"]}>
                      {topic.parent_id
                        ? topicIndex.get(topic.parent_id)?.title || "—"
                        : "—"}
                    </div>
                  </td>
                  <td>
                    <div className={styles["topic-order"]}>
                      {topic.display_order ?? "—"}
                    </div>
                  </td>
                  <td>
                    <div className={styles["topic-status"]}>
                      {topic.is_published ? (
                        <span className={styles["published-badge"]}>
                          Published
                        </span>
                      ) : (
                        <span className={styles["draft-badge"]}>Draft</span>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className={styles["topic-timestamps"]}>
                      <span>
                        <strong>Created:</strong>{" "}
                        {formatTimestamp(topic.created_at)}
                      </span>
                      <span>
                        <strong>Updated:</strong>{" "}
                        {formatTimestamp(topic.updated_at)}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className={styles["action-buttons"]}>
                      <button
                        className={styles["edit-btn"]}
                        onClick={() => openEditModal(topic)}
                        title="Edit Topic"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        className={styles["delete-btn"]}
                        onClick={() => openDeleteModal(topic)}
                        title="Delete Topic"
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
        <CreateTopicModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateTopic}
          topics={topics}
        />
      )}

      {showEditModal && selectedTopic && (
        <EditTopicModal
          topic={selectedTopic}
          topics={topics.filter((topic) => topic.id !== selectedTopic.id)}
          onClose={() => {
            setShowEditModal(false);
            setSelectedTopic(null);
          }}
          onUpdate={handleEditTopic}
        />
      )}

      {showDeleteModal && selectedTopic && (
        <DeleteConfirmationModal
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedTopic(null);
          }}
          onConfirm={handleDeleteTopic}
          itemName={selectedTopic.title}
          itemType="topic"
        />
      )}
    </div>
  );
};

export default Topics;
