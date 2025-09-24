import React, { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import CreateCityModal from "./CreateCityModal";
import EditCityModal from "./EditCityModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import styles from "./Cities.module.css";

const Cities = () => {
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Sample data - replace with actual API call
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const sampleCities = [
        {
          id: 1,
          name: "New York",
          country: { id: 1, name: "United States" },
          createdAt: "2024-01-15",
        },
        {
          id: 2,
          name: "London",
          country: { id: 2, name: "United Kingdom" },
          createdAt: "2024-01-16",
        },
        {
          id: 3,
          name: "Toronto",
          country: { id: 3, name: "Canada" },
          createdAt: "2024-01-17",
        },
        {
          id: 4,
          name: "Sydney",
          country: { id: 4, name: "Australia" },
          createdAt: "2024-01-18",
        },
        {
          id: 5,
          name: "Berlin",
          country: { id: 5, name: "Germany" },
          createdAt: "2024-01-19",
        },
        {
          id: 6,
          name: "Paris",
          country: { id: 6, name: "France" },
          createdAt: "2024-01-20",
        },
        {
          id: 7,
          name: "Tokyo",
          country: { id: 7, name: "Japan" },
          createdAt: "2024-01-21",
        },
        {
          id: 8,
          name: "Seoul",
          country: { id: 8, name: "South Korea" },
          createdAt: "2024-01-22",
        },
        {
          id: 9,
          name: "Tehran",
          country: { id: 9, name: "Iran" },
          createdAt: "2024-01-23",
        },
        {
          id: 10,
          name: "Los Angeles",
          country: { id: 1, name: "United States" },
          createdAt: "2024-01-24",
        },
      ];
      setCities(sampleCities);
      setFilteredCities(sampleCities);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter and search functionality
  useEffect(() => {
    let filtered = cities;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (city) =>
          city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          city.country.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply additional filters if needed
    if (filterBy !== "all") {
      if (filterBy === "recent") {
        filtered = filtered.filter((city) => {
          const cityDate = new Date(city.createdAt);
          const weekAgo = new Date();
          weekAgo.setDate(weekAgo.getDate() - 7);
          return cityDate > weekAgo;
        });
      } else if (filterBy === "alphabetical") {
        filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
      }
    }

    setFilteredCities(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  }, [searchTerm, filterBy, cities]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCities.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCities.length / itemsPerPage);

  const handleCreateCity = (cityData) => {
    const newCity = {
      id: Math.max(...cities.map((c) => c.id)) + 1,
      ...cityData,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setCities([...cities, newCity]);
    setShowCreateModal(false);
  };

  const handleEditCity = (cityData) => {
    const updatedCities = cities.map((city) =>
      city.id === selectedCity.id ? { ...city, ...cityData } : city
    );
    setCities(updatedCities);
    setShowEditModal(false);
    setSelectedCity(null);
  };

  const handleDeleteCity = () => {
    const updatedCities = cities.filter((city) => city.id !== selectedCity.id);
    setCities(updatedCities);
    setShowDeleteModal(false);
    setSelectedCity(null);
  };

  const openEditModal = (city) => {
    setSelectedCity(city);
    setShowEditModal(true);
  };

  const openDeleteModal = (city) => {
    setSelectedCity(city);
    setShowDeleteModal(true);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return (
      <div className={styles["loading-container"]}>
        <div className={styles["loading-spinner"]}></div>
        <p>Loading cities...</p>
      </div>
    );
  }

  return (
    <div className={styles["cities-container"]}>
      {/* Header */}
      <div className={styles["page-header"]}>
        <div className={styles["header-left"]}>
          <div className={styles["page-icon"]}>
            <MapPin size={24} />
          </div>
          <div>
            <h1>Cities Management</h1>
            <p>Manage cities and their country relationships</p>
          </div>
        </div>
        <button
          className={styles["create-btn"]}
          onClick={() => setShowCreateModal(true)}
        >
          <Plus size={18} />
          Add City
        </button>
      </div>

      {/* Filters and Search */}
      <div className={styles["controls-section"]}>
        <div className={styles["search-container"]}>
          <Search size={18} className={styles["search-icon"]} />
          <input
            type="text"
            placeholder="Search cities or countries..."
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
            <option value="all">All Cities</option>
            <option value="recent">Recently Added</option>
            <option value="alphabetical">A-Z</option>
          </select>
        </div>
      </div>

      {/* Results Info */}
      <div className={styles["results-info"]}>
        <span>
          Showing {indexOfFirstItem + 1}-
          {Math.min(indexOfLastItem, filteredCities.length)} of{" "}
          {filteredCities.length} cities
        </span>
      </div>

      {/* Cities Table */}
      <div className={styles["table-container"]}>
        <table className={styles["cities-table"]}>
          <thead>
            <tr>
              <th>ID</th>
              <th>City Name</th>
              <th>Country</th>
              <th>Created Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((city) => (
                <tr key={city.id}>
                  <td>{city.id}</td>
                  <td>
                    <div className={styles["city-name"]}>
                      <div className={styles["city-icon"]}>
                        <MapPin size={16} />
                      </div>
                      {city.name}
                    </div>
                  </td>
                  <td>
                    <span className={styles["country-badge"]}>
                      {city.country.name}
                    </span>
                  </td>
                  <td>{city.createdAt}</td>
                  <td>
                    <div className={styles["action-buttons"]}>
                      <button
                        onClick={() => openEditModal(city)}
                        className={styles["edit-btn"]}
                        title="Edit City"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => openDeleteModal(city)}
                        className={styles["delete-btn"]}
                        title="Delete City"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className={styles["empty-state"]}>
                  <div className={styles["empty-content"]}>
                    <MapPin size={48} className={styles["empty-icon"]} />
                    <h3>No cities found</h3>
                    <p>
                      {searchTerm
                        ? "No cities match your search criteria"
                        : "Start by adding your first city"}
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
        <CreateCityModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateCity}
        />
      )}

      {showEditModal && selectedCity && (
        <EditCityModal
          city={selectedCity}
          onClose={() => {
            setShowEditModal(false);
            setSelectedCity(null);
          }}
          onSubmit={handleEditCity}
        />
      )}

      {showDeleteModal && selectedCity && (
        <DeleteConfirmationModal
          city={selectedCity}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedCity(null);
          }}
          onConfirm={handleDeleteCity}
        />
      )}
    </div>
  );
};

export default Cities;
