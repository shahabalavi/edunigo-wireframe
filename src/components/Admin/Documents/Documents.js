import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  FileText,
  ChevronLeft,
  ChevronRight,
  Building2,
  Tag,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import styles from "./Documents.module.css";

const Documents = () => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Sample data - replace with actual API call
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const sampleCategories = [
        { id: 1, name: "Identity Documents" },
        { id: 2, name: "Language Certificates" },
        { id: 3, name: "Academic Records" },
        { id: 4, name: "Financial Documents" },
        { id: 5, name: "Recommendation Letters" },
      ];

      const sampleDocuments = [
        {
          id: 1,
          name: "Passport",
          description: "Valid passport document for identification",
          category: { id: 1, name: "Identity Documents" },
          autoAttach: true,
          universitySpecific: false,
          fieldCount: 3,
          createdAt: "2024-01-15",
        },
        {
          id: 2,
          name: "National ID",
          description: "National identification card",
          category: { id: 1, name: "Identity Documents" },
          autoAttach: true,
          universitySpecific: false,
          fieldCount: 2,
          createdAt: "2024-01-15",
        },
        {
          id: 3,
          name: "IELTS Certificate",
          description:
            "International English Language Testing System certificate",
          category: { id: 2, name: "Language Certificates" },
          autoAttach: false,
          universitySpecific: true,
          fieldCount: 5,
          createdAt: "2024-01-16",
        },
        {
          id: 4,
          name: "TOEFL Score Report",
          description: "Test of English as a Foreign Language score report",
          category: { id: 2, name: "Language Certificates" },
          autoAttach: false,
          universitySpecific: true,
          fieldCount: 4,
          createdAt: "2024-01-17",
        },
        {
          id: 5,
          name: "Education History",
          description: "Complete education history with multiple entries",
          category: { id: 3, name: "Academic Records" },
          autoAttach: true,
          universitySpecific: false,
          fieldCount: 6,
          multipleRecords: true,
          createdAt: "2024-01-18",
        },
        {
          id: 6,
          name: "Bank Statement",
          description: "Financial proof document",
          category: { id: 4, name: "Financial Documents" },
          autoAttach: false,
          universitySpecific: true,
          fieldCount: 4,
          createdAt: "2024-01-19",
        },
        {
          id: 7,
          name: "Letter of Recommendation",
          description: "Academic or professional recommendation letter",
          category: { id: 5, name: "Recommendation Letters" },
          autoAttach: false,
          universitySpecific: true,
          fieldCount: 3,
          createdAt: "2024-01-20",
        },
      ];

      setDocuments(sampleDocuments);
      setFilteredDocuments(sampleDocuments);
      setCategories(sampleCategories);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter and search functionality
  useEffect(() => {
    let filtered = documents;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (doc) =>
          doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doc.category.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter(
        (doc) => doc.category.id === parseInt(categoryFilter)
      );
    }

    // Apply additional filters
    if (filterBy === "auto-attach") {
      filtered = filtered.filter((doc) => doc.autoAttach === true);
    } else if (filterBy === "university-specific") {
      filtered = filtered.filter((doc) => doc.universitySpecific === true);
    }

    setFilteredDocuments(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  }, [searchTerm, filterBy, categoryFilter, documents]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDocuments.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);

  const handleDeleteDocument = () => {
    const updatedDocuments = documents.filter(
      (doc) => doc.id !== selectedDocument.id
    );
    setDocuments(updatedDocuments);
    setShowDeleteModal(false);
    setSelectedDocument(null);
  };

  const openDeleteModal = (document) => {
    setSelectedDocument(document);
    setShowDeleteModal(true);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCreateDocument = () => {
    navigate("/admin/documents/create");
  };

  const handleEditDocument = (document) => {
    navigate(`/admin/documents/edit/${document.id}`);
  };

  const toggleAutoAttach = async (document) => {
    const updatedDocuments = documents.map((doc) =>
      doc.id === document.id ? { ...doc, autoAttach: !doc.autoAttach } : doc
    );
    setDocuments(updatedDocuments);
    // TODO: Make API call to update document
  };

  if (loading) {
    return (
      <div className={styles["loading-container"]}>
        <div className={styles["loading-spinner"]}></div>
        <p>Loading documents...</p>
      </div>
    );
  }

  return (
    <div className={styles["documents-container"]}>
      {/* Header */}
      <div className={styles["page-header"]}>
        <div className={styles["header-left"]}>
          <div className={styles["page-icon"]}>
            <FileText size={24} />
          </div>
          <div>
            <h1>Documents Management</h1>
            <p>Manage required documents and their field definitions</p>
          </div>
        </div>
        <button className={styles["create-btn"]} onClick={handleCreateDocument}>
          <Plus size={18} />
          Add Document
        </button>
      </div>

      {/* Filters and Search */}
      <div className={styles["controls-section"]}>
        <div className={styles["search-container"]}>
          <Search size={18} className={styles["search-icon"]} />
          <input
            type="text"
            placeholder="Search documents, descriptions, or categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles["search-input"]}
          />
        </div>

        <div className={styles["filters-row"]}>
          <div className={styles["filter-container"]}>
            <Filter size={18} className={styles["filter-icon"]} />
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className={styles["filter-select"]}
            >
              <option value="all">All Documents</option>
              <option value="auto-attach">Auto-Attached</option>
              <option value="university-specific">University-Specific</option>
            </select>
          </div>

          <div className={styles["filter-container"]}>
            <Tag size={18} className={styles["filter-icon"]} />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className={styles["filter-select"]}
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
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
          {Math.min(indexOfLastItem, filteredDocuments.length)} of{" "}
          {filteredDocuments.length} documents
        </span>
      </div>

      {/* Documents Table */}
      <div className={styles["table-container"]}>
        <table className={styles["documents-table"]}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Document Name</th>
              <th>Category</th>
              <th>Fields</th>
              <th>Type</th>
              <th>Auto-Attach</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((document) => (
                <tr key={document.id}>
                  <td>{document.id}</td>
                  <td>
                    <div className={styles["document-info"]}>
                      <div className={styles["document-icon"]}>
                        <FileText size={16} />
                      </div>
                      <div className={styles["document-details"]}>
                        <span className={styles["document-name"]}>
                          {document.name}
                        </span>
                        {document.description && (
                          <span className={styles["document-description"]}>
                            {document.description}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className={styles["category-info"]}>
                      <span className={styles["category-badge"]}>
                        {document.category.name}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className={styles["field-count"]}>
                      {document.fieldCount} field
                      {document.fieldCount !== 1 ? "s" : ""}
                      {document.multipleRecords && (
                        <span className={styles["multiple-records-badge"]}>
                          (Multiple Records)
                        </span>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className={styles["type-info"]}>
                      {document.universitySpecific ? (
                        <span className={styles["type-badge"]}>
                          <Building2 size={12} />
                          University-Specific
                        </span>
                      ) : (
                        <span className={styles["type-badge-default"]}>
                          General
                        </span>
                      )}
                    </div>
                  </td>
                  <td>
                    <button
                      onClick={() => toggleAutoAttach(document)}
                      className={styles["toggle-btn"]}
                      title={
                        document.autoAttach
                          ? "Disable Auto-Attach"
                          : "Enable Auto-Attach"
                      }
                    >
                      {document.autoAttach ? (
                        <ToggleRight
                          size={20}
                          className={styles["toggle-active"]}
                        />
                      ) : (
                        <ToggleLeft
                          size={20}
                          className={styles["toggle-inactive"]}
                        />
                      )}
                    </button>
                  </td>
                  <td>
                    <div className={styles["action-buttons"]}>
                      <button
                        onClick={() => handleEditDocument(document)}
                        className={styles["edit-btn"]}
                        title="Edit Document"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => openDeleteModal(document)}
                        className={styles["delete-btn"]}
                        title="Delete Document"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className={styles["empty-state"]}>
                  <div className={styles["empty-content"]}>
                    <FileText size={48} className={styles["empty-icon"]} />
                    <h3>No documents found</h3>
                    <p>
                      {searchTerm
                        ? "No documents match your search criteria"
                        : "Start by adding your first document"}
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

      {/* Delete Modal */}
      {showDeleteModal && selectedDocument && (
        <DeleteConfirmationModal
          document={selectedDocument}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedDocument(null);
          }}
          onConfirm={handleDeleteDocument}
        />
      )}
    </div>
  );
};

export default Documents;
