import React, { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Globe,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import CreateCountryModal from "./CreateCountryModal";
import EditCountryModal from "./EditCountryModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import styles from "./Countries.module.css";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Sample data - replace with actual API call
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const sampleCountries = [
        {
          id: 1,
          name: "United States",
          phoneCode: "+1",
          iso: "USA",
          createdAt: "2024-01-15",
        },
        {
          id: 2,
          name: "United Kingdom",
          phoneCode: "+44",
          iso: "GBR",
          createdAt: "2024-01-16",
        },
        {
          id: 3,
          name: "Canada",
          phoneCode: "+1",
          iso: "CAN",
          createdAt: "2024-01-17",
        },
        {
          id: 4,
          name: "Australia",
          phoneCode: "+61",
          iso: "AUS",
          createdAt: "2024-01-18",
        },
        {
          id: 5,
          name: "Germany",
          phoneCode: "+49",
          iso: "DEU",
          createdAt: "2024-01-19",
        },
        {
          id: 6,
          name: "France",
          phoneCode: "+33",
          iso: "FRA",
          createdAt: "2024-01-20",
        },
        {
          id: 7,
          name: "Japan",
          phoneCode: "+81",
          iso: "JPN",
          createdAt: "2024-01-21",
        },
        {
          id: 8,
          name: "South Korea",
          phoneCode: "+82",
          iso: "KOR",
          createdAt: "2024-01-22",
        },
        {
          id: 9,
          name: "Iran",
          phoneCode: "+98",
          iso: "IRN",
          createdAt: "2024-01-23",
        },
      ];
      setCountries(sampleCountries);
      setFilteredCountries(sampleCountries);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter and search functionality
  useEffect(() => {
    let filtered = countries;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (country) =>
          country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          country.phoneCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
          country.iso.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply additional filters if needed
    if (filterBy !== "all") {
      // Add custom filter logic here if needed
    }

    setFilteredCountries(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  }, [searchTerm, filterBy, countries]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCountries.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredCountries.length / itemsPerPage);

  const handleCreateCountry = (countryData) => {
    const newCountry = {
      id: Math.max(...countries.map((c) => c.id)) + 1,
      ...countryData,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setCountries([...countries, newCountry]);
    setShowCreateModal(false);
  };

  const handleEditCountry = (countryData) => {
    const updatedCountries = countries.map((country) =>
      country.id === selectedCountry.id
        ? { ...country, ...countryData }
        : country
    );
    setCountries(updatedCountries);
    setShowEditModal(false);
    setSelectedCountry(null);
  };

  const handleDeleteCountry = () => {
    const updatedCountries = countries.filter(
      (country) => country.id !== selectedCountry.id
    );
    setCountries(updatedCountries);
    setShowDeleteModal(false);
    setSelectedCountry(null);
  };

  const openEditModal = (country) => {
    setSelectedCountry(country);
    setShowEditModal(true);
  };

  const openDeleteModal = (country) => {
    setSelectedCountry(country);
    setShowDeleteModal(true);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return (
      <div className={styles["loading-container"]}>
        <div className={styles["loading-spinner"]}></div>
        <p>Loading countries...</p>
      </div>
    );
  }

  return (
    <div className={styles["countries-container"]}>
      {/* Header */}
      <div className={styles["page-header"]}>
        <div className={styles["header-left"]}>
          <div className={styles["page-icon"]}>
            <Globe size={24} />
          </div>
          <div>
            <h1>Countries Management</h1>
            <p>Manage countries, codes, and ISO information</p>
          </div>
        </div>
        <button
          className={styles["create-btn"]}
          onClick={() => setShowCreateModal(true)}
        >
          <Plus size={18} />
          Add Country
        </button>
      </div>

      {/* Filters and Search */}
      <div className={styles["controls-section"]}>
        <div className={styles["search-container"]}>
          <Search size={18} className={styles["search-icon"]} />
          <input
            type="text"
            placeholder="Search countries, phone codes, or ISO..."
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
            <option value="all">All Countries</option>
            <option value="recent">Recently Added</option>
            <option value="alphabetical">A-Z</option>
          </select>
        </div>
      </div>

      {/* Results Info */}
      <div className={styles["results-info"]}>
        <span>
          Showing {indexOfFirstItem + 1}-
          {Math.min(indexOfLastItem, filteredCountries.length)} of{" "}
          {filteredCountries.length} countries
        </span>
      </div>

      {/* Countries Table */}
      <div className={styles["table-container"]}>
        <table className={styles["countries-table"]}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Country Name</th>
              <th>Phone Code</th>
              <th>ISO Code</th>
              <th>Created Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((country) => (
                <tr key={country.id}>
                  <td>{country.id}</td>
                  <td>
                    <div className={styles["country-name"]}>
                      <div className={styles["country-flag"]}>
                        {country.phoneCode}
                      </div>
                      {country.name}
                    </div>
                  </td>
                  <td>
                    <span className={styles["phone-code"]}>
                      {country.phoneCode}
                    </span>
                  </td>
                  <td>
                    <span className={styles["iso-code"]}>{country.iso}</span>
                  </td>
                  <td>{country.createdAt}</td>
                  <td>
                    <div className={styles["action-buttons"]}>
                      <button
                        onClick={() => openEditModal(country)}
                        className={styles["edit-btn"]}
                        title="Edit Country"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => openDeleteModal(country)}
                        className={styles["delete-btn"]}
                        title="Delete Country"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className={styles["empty-state"]}>
                  <div className={styles["empty-content"]}>
                    <Globe size={48} className={styles["empty-icon"]} />
                    <h3>No countries found</h3>
                    <p>
                      {searchTerm
                        ? "No countries match your search criteria"
                        : "Start by adding your first country"}
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

      {/* Modals */}
      {showCreateModal && (
        <CreateCountryModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateCountry}
        />
      )}

      {showEditModal && selectedCountry && (
        <EditCountryModal
          country={selectedCountry}
          onClose={() => {
            setShowEditModal(false);
            setSelectedCountry(null);
          }}
          onSubmit={handleEditCountry}
        />
      )}

      {showDeleteModal && selectedCountry && (
        <DeleteConfirmationModal
          country={selectedCountry}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedCountry(null);
          }}
          onConfirm={handleDeleteCountry}
        />
      )}
    </div>
  );
};

export default Countries;
