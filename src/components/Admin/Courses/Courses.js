import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Calendar,
  GraduationCap,
  Building2,
  X,
} from "lucide-react";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import styles from "./Courses.module.css";

const Courses = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [educationLevels, setEducationLevels] = useState([]);
  const [majors, setMajors] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [educationLevelFilter, setEducationLevelFilter] = useState("all");
  const [majorFilter, setMajorFilter] = useState("all");
  const [universityFilter, setUniversityFilter] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [contextUniversity, setContextUniversity] = useState(null);

  // Sample data - replace with actual API call
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const sampleCourses = [
        {
          id: 1,
          name: "Introduction to Computer Science",
          code: "CS101",
          description:
            "Fundamental concepts of computer science and programming",
          educationLevel: {
            id: 3,
            name: "Bachelor's Degree",
          },
          major: {
            id: 1,
            name: "Computer Science",
          },
          universities: [
            { id: 1, name: "Harvard University" },
            { id: 2, name: "University of Oxford" },
          ],
          startDate: "2024-09-01",
          endDate: "2024-12-15",
          createdAt: "2024-01-15",
        },
        {
          id: 2,
          name: "Business Strategy and Management",
          code: "BUS201",
          description: "Strategic thinking and business management principles",
          educationLevel: {
            id: 4,
            name: "Master's Degree",
          },
          major: {
            id: 2,
            name: "Business Administration",
          },
          universities: [
            { id: 1, name: "Harvard University" },
            { id: 3, name: "University of Toronto" },
          ],
          startDate: "2024-09-01",
          endDate: "2025-05-30",
          createdAt: "2024-01-16",
        },
        {
          id: 3,
          name: "Advanced Engineering Mathematics",
          code: "ENG301",
          description: "Mathematical methods for engineering applications",
          educationLevel: {
            id: 3,
            name: "Bachelor's Degree",
          },
          major: {
            id: 3,
            name: "Engineering",
          },
          universities: [
            { id: 5, name: "Technical University of Munich" },
            { id: 7, name: "University of Tokyo" },
          ],
          startDate: "2024-09-01",
          endDate: "2024-12-20",
          createdAt: "2024-01-17",
        },
        {
          id: 4,
          name: "Medical Ethics and Law",
          code: "MED401",
          description: "Ethical and legal issues in medical practice",
          educationLevel: {
            id: 4,
            name: "Master's Degree",
          },
          major: {
            id: 4,
            name: "Medicine",
          },
          universities: [
            { id: 1, name: "Harvard University" },
            { id: 2, name: "University of Oxford" },
            { id: 4, name: "University of Melbourne" },
          ],
          startDate: "2024-09-01",
          endDate: "2025-06-15",
          createdAt: "2024-01-18",
        },
        {
          id: 5,
          name: "Digital Marketing Fundamentals",
          code: "MKT201",
          description: "Introduction to digital marketing strategies and tools",
          educationLevel: {
            id: 2,
            name: "Associate Degree",
          },
          major: {
            id: 2,
            name: "Business Administration",
          },
          universities: [
            { id: 3, name: "University of Toronto" },
            { id: 6, name: "Sorbonne University" },
          ],
          startDate: "2024-09-01",
          endDate: "2024-12-15",
          createdAt: "2024-01-19",
        },
        {
          id: 6,
          name: "Research Methods in Psychology",
          code: "PSY301",
          description: "Quantitative and qualitative research methodologies",
          educationLevel: {
            id: 3,
            name: "Bachelor's Degree",
          },
          major: {
            id: 5,
            name: "Psychology",
          },
          universities: [
            { id: 2, name: "University of Oxford" },
            { id: 4, name: "University of Melbourne" },
          ],
          startDate: "2024-09-01",
          endDate: "2024-12-15",
          createdAt: "2024-01-20",
        },
        {
          id: 7,
          name: "Financial Economics",
          code: "ECO401",
          description: "Advanced topics in financial markets and economics",
          educationLevel: {
            id: 4,
            name: "Master's Degree",
          },
          major: {
            id: 6,
            name: "Economics",
          },
          universities: [
            { id: 1, name: "Harvard University" },
            { id: 3, name: "University of Toronto" },
            { id: 8, name: "Seoul National University" },
          ],
          startDate: "2024-09-01",
          endDate: "2025-05-30",
          createdAt: "2024-01-21",
        },
        {
          id: 8,
          name: "Linear Algebra and Calculus",
          code: "MATH201",
          description:
            "Advanced mathematical concepts for science and engineering",
          educationLevel: {
            id: 3,
            name: "Bachelor's Degree",
          },
          major: {
            id: 7,
            name: "Mathematics",
          },
          universities: [
            { id: 5, name: "Technical University of Munich" },
            { id: 7, name: "University of Tokyo" },
            { id: 9, name: "University of Tehran" },
          ],
          startDate: "2024-09-01",
          endDate: "2024-12-20",
          createdAt: "2024-01-22",
        },
      ];

      const sampleEducationLevels = [
        { id: 1, name: "High School Diploma" },
        { id: 2, name: "Associate Degree" },
        { id: 3, name: "Bachelor's Degree" },
        { id: 4, name: "Master's Degree" },
        { id: 5, name: "Doctorate (PhD)" },
        { id: 6, name: "Professional Degree" },
        { id: 7, name: "Certificate" },
        { id: 8, name: "Diploma" },
        { id: 9, name: "Postgraduate Certificate" },
        { id: 10, name: "Foundation Year" },
      ];

      const sampleMajors = [
        { id: 1, name: "Computer Science" },
        { id: 2, name: "Business Administration" },
        { id: 3, name: "Engineering" },
        { id: 4, name: "Medicine" },
        { id: 5, name: "Psychology" },
        { id: 6, name: "Economics" },
        { id: 7, name: "Mathematics" },
        { id: 8, name: "Physics" },
        { id: 9, name: "Chemistry" },
        { id: 10, name: "Biology" },
        { id: 11, name: "Literature" },
        { id: 12, name: "History" },
        { id: 13, name: "Art & Design" },
        { id: 14, name: "Architecture" },
        { id: 15, name: "Law" },
      ];

      const sampleUniversities = [
        { id: 1, name: "Harvard University" },
        { id: 2, name: "University of Oxford" },
        { id: 3, name: "University of Toronto" },
        { id: 4, name: "University of Melbourne" },
        { id: 5, name: "Technical University of Munich" },
        { id: 6, name: "Sorbonne University" },
        { id: 7, name: "University of Tokyo" },
        { id: 8, name: "Seoul National University" },
        { id: 9, name: "University of Tehran" },
      ];

      setCourses(sampleCourses);
      setFilteredCourses(sampleCourses);
      setEducationLevels(sampleEducationLevels);
      setMajors(sampleMajors);
      setUniversities(sampleUniversities);
      setLoading(false);
    }, 1000);
  }, []);

  // Handle university context from URL parameter
  useEffect(() => {
    const universityId = searchParams.get("university");

    if (universityId) {
      const university = universities.find(
        (uni) => uni.id === parseInt(universityId)
      );

      if (university) {
        setContextUniversity(university);
        setUniversityFilter(universityId);
      }
    }
  }, [searchParams, universities]);

  // Filter and search functionality
  useEffect(() => {
    let filtered = courses;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (course) =>
          course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.educationLevel.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          course.major.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.universities.some((uni) =>
            uni.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    // Apply education level filter
    if (educationLevelFilter !== "all") {
      filtered = filtered.filter(
        (course) => course.educationLevel.id === parseInt(educationLevelFilter)
      );
    }

    // Apply major filter
    if (majorFilter !== "all") {
      filtered = filtered.filter(
        (course) => course.major.id === parseInt(majorFilter)
      );
    }

    // Apply university filter
    if (universityFilter !== "all") {
      filtered = filtered.filter((course) =>
        course.universities.some((uni) => uni.id === parseInt(universityFilter))
      );
    }

    // Apply additional filters if needed
    if (filterBy !== "all") {
      // Add custom filter logic here if needed
    }

    setFilteredCourses(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  }, [
    searchTerm,
    filterBy,
    educationLevelFilter,
    majorFilter,
    universityFilter,
    courses,
  ]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCourses.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

  const handleDeleteCourse = () => {
    const updatedCourses = courses.filter(
      (course) => course.id !== selectedCourse.id
    );
    setCourses(updatedCourses);
    setShowDeleteModal(false);
    setSelectedCourse(null);
  };

  const openDeleteModal = (course) => {
    setSelectedCourse(course);
    setShowDeleteModal(true);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCreateCourse = () => {
    navigate("/admin/courses/create");
  };

  const handleEditCourse = (course) => {
    navigate(`/admin/courses/edit/${course.id}`);
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setFilterBy("all");
    setEducationLevelFilter("all");
    setMajorFilter("all");
    setUniversityFilter("all");
  };

  const hasActiveFilters = () => {
    return (
      searchTerm ||
      filterBy !== "all" ||
      educationLevelFilter !== "all" ||
      majorFilter !== "all" ||
      universityFilter !== "all"
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className={styles["loading-container"]}>
        <div className={styles["loading-spinner"]}></div>
        <p>Loading courses...</p>
      </div>
    );
  }

  return (
    <div className={styles["courses-container"]}>
      {/* Header */}
      <div className={styles["page-header"]}>
        <div className={styles["header-left"]}>
          <div className={styles["page-icon"]}>
            <BookOpen size={24} />
          </div>
          <div>
            <h1>
              {contextUniversity
                ? `Courses - ${contextUniversity.name}`
                : "Courses Management"}
            </h1>
            <p>
              {contextUniversity
                ? `Manage courses offered by ${contextUniversity.name}`
                : "Manage courses and their information"}
            </p>
            {contextUniversity && (
              <div className={styles["context-info"]}>
                <span className={styles["context-badge"]}>
                  University Context
                </span>
                <button
                  onClick={() => navigate("/admin/courses")}
                  className={styles["view-all-btn"]}
                >
                  View All Courses
                </button>
              </div>
            )}
          </div>
        </div>
        <button className={styles["create-btn"]} onClick={handleCreateCourse}>
          <Plus size={18} />
          Add Course
        </button>
      </div>

      {/* Filters and Search */}
      <div className={styles["controls-section"]}>
        <div className={styles["search-container"]}>
          <Search size={18} className={styles["search-icon"]} />
          <input
            type="text"
            placeholder="Search courses, codes, descriptions, or universities..."
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
              <option value="all">All Courses</option>
              <option value="recent">Recently Added</option>
              <option value="alphabetical">A-Z</option>
            </select>
          </div>

          <div className={styles["filter-container"]}>
            <GraduationCap size={18} className={styles["filter-icon"]} />
            <select
              value={educationLevelFilter}
              onChange={(e) => setEducationLevelFilter(e.target.value)}
              className={styles["filter-select"]}
            >
              <option value="all">All Education Levels</option>
              <option value="1">High School Diploma</option>
              <option value="2">Associate Degree</option>
              <option value="3">Bachelor's Degree</option>
              <option value="4">Master's Degree</option>
              <option value="5">Doctorate (PhD)</option>
              <option value="6">Professional Degree</option>
              <option value="7">Certificate</option>
              <option value="8">Diploma</option>
              <option value="9">Postgraduate Certificate</option>
              <option value="10">Foundation Year</option>
            </select>
          </div>

          <div className={styles["filter-container"]}>
            <GraduationCap size={18} className={styles["filter-icon"]} />
            <select
              value={majorFilter}
              onChange={(e) => setMajorFilter(e.target.value)}
              className={styles["filter-select"]}
            >
              <option value="all">All Majors/Fields</option>
              <option value="1">Computer Science</option>
              <option value="2">Business Administration</option>
              <option value="3">Engineering</option>
              <option value="4">Medicine</option>
              <option value="5">Psychology</option>
              <option value="6">Economics</option>
              <option value="7">Mathematics</option>
              <option value="8">Physics</option>
              <option value="9">Chemistry</option>
              <option value="10">Biology</option>
              <option value="11">Literature</option>
              <option value="12">History</option>
              <option value="13">Art & Design</option>
              <option value="14">Architecture</option>
              <option value="15">Law</option>
            </select>
          </div>

          {!contextUniversity && (
            <div className={styles["filter-container"]}>
              <Building2 size={18} className={styles["filter-icon"]} />
              <select
                value={universityFilter}
                onChange={(e) => setUniversityFilter(e.target.value)}
                className={styles["filter-select"]}
              >
                <option value="all">All Universities</option>
                {universities.map((university) => (
                  <option key={university.id} value={university.id}>
                    {university.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {hasActiveFilters() && (
            <button
              onClick={clearAllFilters}
              className={styles["clear-filters-btn"]}
              title="Clear all filters"
            >
              <X size={16} />
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Results Info */}
      <div className={styles["results-info"]}>
        <div className={styles["results-summary"]}>
          <span>
            Showing {indexOfFirstItem + 1}-
            {Math.min(indexOfLastItem, filteredCourses.length)} of{" "}
            {filteredCourses.length} courses
          </span>
          {hasActiveFilters() && (
            <div className={styles["active-filters"]}>
              <span className={styles["filters-label"]}>Active filters:</span>
              {searchTerm && (
                <span className={styles["filter-tag"]}>
                  Search: "{searchTerm}"
                </span>
              )}
              {educationLevelFilter !== "all" && (
                <span className={styles["filter-tag"]}>
                  Education Level:{" "}
                  {
                    educationLevels.find(
                      (el) => el.id === parseInt(educationLevelFilter)
                    )?.name
                  }
                </span>
              )}
              {majorFilter !== "all" && (
                <span className={styles["filter-tag"]}>
                  Major:{" "}
                  {majors.find((m) => m.id === parseInt(majorFilter))?.name}
                </span>
              )}
              {universityFilter !== "all" && (
                <span className={styles["filter-tag"]}>
                  University:{" "}
                  {
                    universities.find(
                      (u) => u.id === parseInt(universityFilter)
                    )?.name
                  }
                </span>
              )}
              {filterBy !== "all" && (
                <span className={styles["filter-tag"]}>
                  Sort:{" "}
                  {filterBy === "recent"
                    ? "Recently Added"
                    : filterBy === "alphabetical"
                    ? "A-Z"
                    : filterBy}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Courses Table */}
      <div className={styles["table-container"]}>
        <table className={styles["courses-table"]}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Course</th>
              <th>Education Level</th>
              <th>Major</th>
              <th>Universities</th>
              <th>Duration</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((course) => (
                <tr key={course.id}>
                  <td>{course.id}</td>
                  <td>
                    <div className={styles["course-info"]}>
                      <div className={styles["course-icon"]}>
                        <BookOpen size={16} />
                      </div>
                      <div className={styles["course-details"]}>
                        <span className={styles["course-name"]}>
                          {course.name}
                        </span>
                        <span className={styles["course-code"]}>
                          {course.code}
                        </span>
                        {course.description && (
                          <span className={styles["course-description"]}>
                            {course.description}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className={styles["education-level-info"]}>
                      <div className={styles["education-level-icon"]}>
                        <GraduationCap size={14} />
                      </div>
                      <span className={styles["education-level-name"]}>
                        {course.educationLevel.name}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className={styles["major-info"]}>
                      <span className={styles["major-name"]}>
                        {course.major.name}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className={styles["universities-info"]}>
                      {course.universities.slice(0, 2).map((university) => (
                        <div
                          key={university.id}
                          className={styles["university-tag"]}
                        >
                          <Building2 size={12} />
                          <span>{university.name}</span>
                        </div>
                      ))}
                      {course.universities.length > 2 && (
                        <div className={styles["more-universities"]}>
                          +{course.universities.length - 2} more
                        </div>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className={styles["duration-info"]}>
                      <div className={styles["duration-item"]}>
                        <Calendar size={12} />
                        <span>Start: {formatDate(course.startDate)}</span>
                      </div>
                      <div className={styles["duration-item"]}>
                        <Calendar size={12} />
                        <span>End: {formatDate(course.endDate)}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className={styles["action-buttons"]}>
                      <button
                        onClick={() => handleEditCourse(course)}
                        className={styles["edit-btn"]}
                        title="Edit Course"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => openDeleteModal(course)}
                        className={styles["delete-btn"]}
                        title="Delete Course"
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
                    <BookOpen size={48} className={styles["empty-icon"]} />
                    <h3>No courses found</h3>
                    <p>
                      {searchTerm
                        ? "No courses match your search criteria"
                        : "Start by adding your first course"}
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
      {showDeleteModal && selectedCourse && (
        <DeleteConfirmationModal
          course={selectedCourse}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedCourse(null);
          }}
          onConfirm={handleDeleteCourse}
        />
      )}
    </div>
  );
};

export default Courses;
