import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Building2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Settings,
} from "lucide-react";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import styles from "./Universities.module.css";

const Universities = () => {
  const navigate = useNavigate();
  const [universities, setUniversities] = useState([]);
  const [filteredUniversities, setFilteredUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Sample data - replace with actual API call
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const sampleUniversities = [
        {
          id: 1,
          name: "Harvard University",
          logo: "https://via.placeholder.com/40x40/0037ff/ffffff?text=H",
          website: "https://harvard.edu",
          country: {
            id: 1,
            name: "United States",
            phoneCode: "+1",
            iso: "USA",
          },
          city: {
            id: 1,
            name: "New York",
            countryId: 1,
          },
          createdAt: "2024-01-15",
        },
        {
          id: 2,
          name: "University of Oxford",
          logo: "https://via.placeholder.com/40x40/0037ff/ffffff?text=O",
          website: "https://ox.ac.uk",
          country: {
            id: 2,
            name: "United Kingdom",
            phoneCode: "+44",
            iso: "GBR",
          },
          city: {
            id: 4,
            name: "London",
            countryId: 2,
          },
          createdAt: "2024-01-16",
        },
        {
          id: 3,
          name: "University of Toronto",
          logo: "https://via.placeholder.com/40x40/0037ff/ffffff?text=T",
          website: "https://utoronto.ca",
          country: {
            id: 3,
            name: "Canada",
            phoneCode: "+1",
            iso: "CAN",
          },
          city: {
            id: 7,
            name: "Toronto",
            countryId: 3,
          },
          createdAt: "2024-01-17",
        },
        {
          id: 4,
          name: "University of Melbourne",
          logo: "https://via.placeholder.com/40x40/0037ff/ffffff?text=M",
          website: "https://unimelb.edu.au",
          country: {
            id: 4,
            name: "Australia",
            phoneCode: "+61",
            iso: "AUS",
          },
          city: {
            id: 11,
            name: "Melbourne",
            countryId: 4,
          },
          createdAt: "2024-01-18",
        },
        {
          id: 5,
          name: "Technical University of Munich",
          logo: "https://via.placeholder.com/40x40/0037ff/ffffff?text=TUM",
          website: "https://tum.de",
          country: {
            id: 5,
            name: "Germany",
            phoneCode: "+49",
            iso: "DEU",
          },
          city: {
            id: 14,
            name: "Munich",
            countryId: 5,
          },
          createdAt: "2024-01-19",
        },
        {
          id: 6,
          name: "Sorbonne University",
          logo: "https://via.placeholder.com/40x40/0037ff/ffffff?text=S",
          website: "https://sorbonne-universite.fr",
          country: {
            id: 6,
            name: "France",
            phoneCode: "+33",
            iso: "FRA",
          },
          city: {
            id: 16,
            name: "Paris",
            countryId: 6,
          },
          createdAt: "2024-01-20",
        },
        {
          id: 7,
          name: "University of Tokyo",
          logo: "https://via.placeholder.com/40x40/0037ff/ffffff?text=UT",
          website: "https://u-tokyo.ac.jp",
          country: {
            id: 7,
            name: "Japan",
            phoneCode: "+81",
            iso: "JPN",
          },
          city: {
            id: 19,
            name: "Tokyo",
            countryId: 7,
          },
          createdAt: "2024-01-21",
        },
        {
          id: 8,
          name: "Seoul National University",
          logo: "https://via.placeholder.com/40x40/0037ff/ffffff?text=SNU",
          website: "https://snu.ac.kr",
          country: {
            id: 8,
            name: "South Korea",
            phoneCode: "+82",
            iso: "KOR",
          },
          city: {
            id: 22,
            name: "Seoul",
            countryId: 8,
          },
          createdAt: "2024-01-22",
        },
        {
          id: 9,
          name: "University of Tehran",
          logo: "https://via.placeholder.com/40x40/0037ff/ffffff?text=UT",
          website: "https://ut.ac.ir",
          country: {
            id: 9,
            name: "Iran",
            phoneCode: "+98",
            iso: "IRN",
          },
          city: {
            id: 25,
            name: "Tehran",
            countryId: 9,
          },
          createdAt: "2024-01-23",
        },
      ];
      setUniversities(sampleUniversities);
      setFilteredUniversities(sampleUniversities);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter and search functionality
  useEffect(() => {
    let filtered = universities;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (university) =>
          university.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          university.country.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          university.city.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          university.website.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply additional filters if needed
    if (filterBy !== "all") {
      // Add custom filter logic here if needed
    }

    setFilteredUniversities(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  }, [searchTerm, filterBy, universities]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUniversities.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredUniversities.length / itemsPerPage);

  const handleDeleteUniversity = () => {
    const updatedUniversities = universities.filter(
      (university) => university.id !== selectedUniversity.id
    );
    setUniversities(updatedUniversities);
    setShowDeleteModal(false);
    setSelectedUniversity(null);
  };

  const openDeleteModal = (university) => {
    setSelectedUniversity(university);
    setShowDeleteModal(true);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCreateUniversity = () => {
    navigate("/admin/universities/create");
  };

  const handleEditUniversity = (university) => {
    navigate(`/admin/universities/edit/${university.id}`);
  };

  const handleManageUniversity = (university) => {
    navigate(`/admin/universities/manage/${university.id}`);
  };

  if (loading) {
    return (
      <div className={styles["loading-container"]}>
        <div className={styles["loading-spinner"]}></div>
        <p>Loading universities...</p>
      </div>
    );
  }

  return (
    <div className={styles["universities-container"]}>
      {/* Header */}
      <div className={styles["page-header"]}>
        <div className={styles["header-left"]}>
          <div className={styles["page-icon"]}>
            <Building2 size={24} />
          </div>
          <div>
            <h1>Universities Management</h1>
            <p>Manage universities and their information</p>
          </div>
        </div>
        <button
          className={styles["create-btn"]}
          onClick={handleCreateUniversity}
        >
          <Plus size={18} />
          Add University
        </button>
      </div>

      {/* Filters and Search */}
      <div className={styles["controls-section"]}>
        <div className={styles["search-container"]}>
          <Search size={18} className={styles["search-icon"]} />
          <input
            type="text"
            placeholder="Search universities, countries, cities, or websites..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles["search-input"]}
          />
        </div>

        <div className={styles["filter-container"]}>
          <Filter size={18} className={styles["filter-icon"]} />
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className={styles["filter-select"]}
          >
            <option value="all">All Universities</option>
            <option value="recent">Recently Added</option>
            <option value="alphabetical">A-Z</option>
          </select>
        </div>
      </div>

      {/* Results Info */}
      <div className={styles["results-info"]}>
        <span>
          Showing {indexOfFirstItem + 1}-
          {Math.min(indexOfLastItem, filteredUniversities.length)} of{" "}
          {filteredUniversities.length} universities
        </span>
      </div>

      {/* Universities Table */}
      <div className={styles["table-container"]}>
        <table className={styles["universities-table"]}>
          <thead>
            <tr>
              <th>ID</th>
              <th>University</th>
              <th>Country</th>
              <th>City</th>
              <th>Website</th>
              <th>Created Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((university) => (
                <tr key={university.id}>
                  <td>{university.id}</td>
                  <td>
                    <div className={styles["university-info"]}>
                      <div className={styles["university-logo"]}>
                        <img
                          src={university.logo}
                          alt={`${university.name} logo`}
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                        <div className={styles["logo-fallback"]}>
                          <Building2 size={16} />
                        </div>
                      </div>
                      <div className={styles["university-details"]}>
                        <span className={styles["university-name"]}>
                          {university.name}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className={styles["country-info"]}>
                      <span className={styles["country-name"]}>
                        {university.country.name}
                      </span>
                      <span className={styles["country-code"]}>
                        {university.country.phoneCode}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span className={styles["city-name"]}>
                      {university.city.name}
                    </span>
                  </td>
                  <td>
                    <a
                      href={university.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles["website-link"]}
                    >
                      <ExternalLink size={14} />
                      Visit Website
                    </a>
                  </td>
                  <td>{university.createdAt}</td>
                  <td>
                    <div className={styles["action-buttons"]}>
                      <button
                        onClick={() => handleManageUniversity(university)}
                        className={styles["manage-btn"]}
                        title="Manage University"
                      >
                        <Settings size={16} />
                      </button>
                      <button
                        onClick={() => handleEditUniversity(university)}
                        className={styles["edit-btn"]}
                        title="Edit University"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => openDeleteModal(university)}
                        className={styles["delete-btn"]}
                        title="Delete University"
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
                    <Building2 size={48} className={styles["empty-icon"]} />
                    <h3>No universities found</h3>
                    <p>
                      {searchTerm
                        ? "No universities match your search criteria"
                        : "Start by adding your first university"}
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
      {showDeleteModal && selectedUniversity && (
        <DeleteConfirmationModal
          university={selectedUniversity}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedUniversity(null);
          }}
          onConfirm={handleDeleteUniversity}
        />
      )}
    </div>
  );
};

export default Universities;
