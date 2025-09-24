import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Edit2,
  Trash2,
  Plus,
  Building2,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import CreateDepartmentModal from "./CreateDepartmentModal";
import EditDepartmentModal from "./EditDepartmentModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal";
import styles from "./Departments.module.css";

const Departments = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Sample data - replace with actual API call
  useEffect(() => {
    const fetchDepartments = async () => {
      setTimeout(() => {
        const sampleDepartments = [
          { id: 1, name: "admissions", title: "Admissions Department" },
          { id: 2, name: "technical", title: "Technical Support" },
          { id: 3, name: "finance", title: "Finance Department" },
          { id: 4, name: "academic", title: "Academic Affairs" },
          { id: 5, name: "student_services", title: "Student Services" },
        ];

        setDepartments(sampleDepartments);
        setFilteredDepartments(sampleDepartments);
        setLoading(false);
      }, 1000);
    };

    fetchDepartments();
  }, []);

  // Filter and search functionality
  useEffect(() => {
    let filtered = departments;

    if (searchTerm) {
      filtered = filtered.filter(
        (department) =>
          department.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          department.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredDepartments(filtered);
    setCurrentPage(1);
  }, [searchTerm, departments]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDepartments.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredDepartments.length / itemsPerPage);

  const handleCreateDepartment = (newDepartment) => {
    const id = Math.max(...departments.map((d) => d.id)) + 1;
    const departmentWithId = { ...newDepartment, id };
    setDepartments([...departments, departmentWithId]);
    setShowCreateModal(false);
  };

  const handleEditDepartment = (updatedDepartment) => {
    setDepartments(
      departments.map((department) =>
        department.id === updatedDepartment.id ? updatedDepartment : department
      )
    );
    setShowEditModal(false);
    setSelectedDepartment(null);
  };

  const handleDeleteDepartment = () => {
    setDepartments(
      departments.filter(
        (department) => department.id !== selectedDepartment.id
      )
    );
    setShowDeleteModal(false);
    setSelectedDepartment(null);
  };

  const openEditModal = (department) => {
    setSelectedDepartment(department);
    setShowEditModal(true);
  };

  const openDeleteModal = (department) => {
    setSelectedDepartment(department);
    setShowDeleteModal(true);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return (
      <div className={styles["loading-container"]}>
        <div className={styles["loading-spinner"]}></div>
        <p>Loading departments...</p>
      </div>
    );
  }

  return (
    <div className={styles["departments-container"]}>
      {/* Page Header */}
      <div className={styles["page-header"]}>
        <div className={styles["header-left"]}>
          <button
            className={styles["back-btn"]}
            onClick={() => navigate("/admin/tickets")}
          >
            <ArrowLeft size={20} />
          </button>
          <div className={styles["page-icon"]}>
            <Building2 size={24} />
          </div>
          <div>
            <h1>Departments</h1>
            <p>Manage ticket departments</p>
          </div>
        </div>
        <button
          className={styles["create-btn"]}
          onClick={() => setShowCreateModal(true)}
        >
          <Plus size={20} />
          Create Department
        </button>
      </div>

      {/* Controls Section */}
      <div className={styles["controls-section"]}>
        <div className={styles["search-container"]}>
          <Search className={styles["search-icon"]} size={20} />
          <input
            type="text"
            placeholder="Search departments..."
            className={styles["search-input"]}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Results Info */}
      <div className={styles["results-info"]}>
        Showing {currentItems.length} of {filteredDepartments.length}{" "}
        departments
      </div>

      {/* Table Container */}
      <div className={styles["table-container"]}>
        {currentItems.length === 0 ? (
          <div className={styles["empty-state"]}>
            <div className={styles["empty-content"]}>
              <Building2 className={styles["empty-icon"]} size={48} />
              <h3>No departments found</h3>
              <p>
                {searchTerm
                  ? "Try adjusting your search criteria"
                  : "No departments have been created yet"}
              </p>
            </div>
          </div>
        ) : (
          <table className={styles["departments-table"]}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Title</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((department) => (
                <tr key={department.id}>
                  <td>
                    <div className={styles["department-id"]}>
                      #{department.id}
                    </div>
                  </td>
                  <td>
                    <div className={styles["department-name"]}>
                      {department.name}
                    </div>
                  </td>
                  <td>
                    <div className={styles["department-title"]}>
                      {department.title}
                    </div>
                  </td>
                  <td>
                    <div className={styles["action-buttons"]}>
                      <button
                        className={styles["edit-btn"]}
                        onClick={() => openEditModal(department)}
                        title="Edit Department"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        className={styles["delete-btn"]}
                        onClick={() => openDeleteModal(department)}
                        title="Delete Department"
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

      {/* Modals */}
      {showCreateModal && (
        <CreateDepartmentModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateDepartment}
        />
      )}

      {showEditModal && selectedDepartment && (
        <EditDepartmentModal
          department={selectedDepartment}
          onClose={() => {
            setShowEditModal(false);
            setSelectedDepartment(null);
          }}
          onUpdate={handleEditDepartment}
        />
      )}

      {showDeleteModal && selectedDepartment && (
        <DeleteConfirmationModal
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedDepartment(null);
          }}
          onConfirm={handleDeleteDepartment}
          itemName={`${selectedDepartment.title} (${selectedDepartment.name})`}
          itemType="department"
        />
      )}
    </div>
  );
};

export default Departments;
