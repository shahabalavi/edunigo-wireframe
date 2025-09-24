import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  BookOpen,
  Users,
  Calendar,
  FileText,
  BarChart3,
} from "lucide-react";
import styles from "./UniversityManager.module.css";

const UniversityManager = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [university, setUniversity] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load university data
  useEffect(() => {
    // Simulate API call to get university data
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
          createdAt: "2024-01-23",
        },
      ];

      const universityId = parseInt(id);
      const foundUniversity = sampleUniversities.find(
        (uni) => uni.id === universityId
      );
      setUniversity(foundUniversity || sampleUniversities[0]);
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleBack = () => {
    navigate("/admin/universities");
  };

  const handleSubmoduleClick = (submodule) => {
    switch (submodule) {
      case "courses":
        // Use the university ID from state if available, otherwise fall back to URL param
        const universityId = university?.id || id;
        if (universityId) {
          const url = `/admin/courses?university=${universityId}`;
          navigate(url);
        } else {
          console.error("University ID not available");
        }
        break;
      case "students":
        // Future implementation
        console.log("Students submodule - coming soon");
        break;
      case "faculty":
        // Future implementation
        console.log("Faculty submodule - coming soon");
        break;
      case "programs":
        // Future implementation
        console.log("Programs submodule - coming soon");
        break;
      case "documents":
        // Future implementation
        console.log("Documents submodule - coming soon");
        break;
      case "analytics":
        // Future implementation
        console.log("Analytics submodule - coming soon");
        break;
      default:
        break;
    }
  };

  const submodules = [
    {
      id: "courses",
      name: "Courses",
      description: "Manage courses offered by this university",
      icon: BookOpen,
      color: "#2563eb",
      available: true,
    },
    {
      id: "students",
      name: "Students",
      description: "Manage student enrollments and records",
      icon: Users,
      color: "#16a34a",
      available: false,
    },
    {
      id: "faculty",
      name: "Faculty",
      description: "Manage faculty and staff information",
      icon: Users,
      color: "#dc2626",
      available: false,
    },
    {
      id: "programs",
      name: "Programs",
      description: "Manage academic programs and degrees",
      icon: Calendar,
      color: "#7c3aed",
      available: false,
    },
    {
      id: "documents",
      name: "Documents",
      description: "Manage university documents and files",
      icon: FileText,
      color: "#ea580c",
      available: false,
    },
    {
      id: "analytics",
      name: "Analytics",
      description: "View university statistics and reports",
      icon: BarChart3,
      color: "#0891b2",
      available: false,
    },
  ];

  if (loading) {
    return (
      <div className={styles["loading-container"]}>
        <div className={styles["loading-spinner"]}></div>
        <p>Loading university manager...</p>
      </div>
    );
  }

  if (!university) {
    return (
      <div className={styles["error-container"]}>
        <div className={styles["error-content"]}>
          <Building2 size={48} className={styles["error-icon"]} />
          <h3>University Not Found</h3>
          <p>The requested university could not be found.</p>
          <button onClick={handleBack} className={styles["back-btn"]}>
            <ArrowLeft size={16} />
            Back to Universities
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles["university-manager-container"]}>
      {/* Header */}
      <div className={styles["page-header"]}>
        <div className={styles["header-left"]}>
          <button onClick={handleBack} className={styles["back-btn"]}>
            <ArrowLeft size={20} />
          </button>
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
                <Building2 size={24} />
              </div>
            </div>
            <div className={styles["university-details"]}>
              <h1>{university.name}</h1>
              <p>University Manager - Manage all aspects of this university</p>
              <div className={styles["university-meta"]}>
                <span className={styles["country-badge"]}>
                  {university.country.name}
                </span>
                <a
                  href={university.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles["website-link"]}
                >
                  Visit Website
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Submodules Grid */}
      <div className={styles["submodules-section"]}>
        <div className={styles["section-header"]}>
          <h2>University Management Modules</h2>
          <p>Select a module to manage specific aspects of this university</p>
        </div>

        <div className={styles["submodules-grid"]}>
          {submodules.map((submodule) => {
            const IconComponent = submodule.icon;
            return (
              <div
                key={submodule.id}
                className={[
                  styles["submodule-card"],
                  !submodule.available ? styles["disabled"] : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() =>
                  submodule.available &&
                  university &&
                  handleSubmoduleClick(submodule.id)
                }
              >
                <div
                  className={styles["submodule-icon"]}
                  style={{ backgroundColor: submodule.color }}
                >
                  <IconComponent size={32} />
                </div>
                <div className={styles["submodule-content"]}>
                  <h3>{submodule.name}</h3>
                  <p>{submodule.description}</p>
                  {!submodule.available && (
                    <span className={styles["coming-soon"]}>Coming Soon</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Stats */}
      <div className={styles["stats-section"]}>
        <div className={styles["section-header"]}>
          <h2>Quick Overview</h2>
          <p>Key statistics for {university.name}</p>
        </div>

        <div className={styles["stats-grid"]}>
          <div className={styles["stat-card"]}>
            <div className={styles["stat-icon"]}>
              <BookOpen size={20} />
            </div>
            <div className={styles["stat-content"]}>
              <span className={styles["stat-number"]}>12</span>
              <span className={styles["stat-label"]}>Active Courses</span>
            </div>
          </div>

          <div className={styles["stat-card"]}>
            <div className={styles["stat-icon"]}>
              <Users size={20} />
            </div>
            <div className={styles["stat-content"]}>
              <span className={styles["stat-number"]}>1,250</span>
              <span className={styles["stat-label"]}>Enrolled Students</span>
            </div>
          </div>

          <div className={styles["stat-card"]}>
            <div className={styles["stat-icon"]}>
              <Calendar size={20} />
            </div>
            <div className={styles["stat-content"]}>
              <span className={styles["stat-number"]}>8</span>
              <span className={styles["stat-label"]}>Academic Programs</span>
            </div>
          </div>

          <div className={styles["stat-card"]}>
            <div className={styles["stat-icon"]}>
              <BarChart3 size={20} />
            </div>
            <div className={styles["stat-content"]}>
              <span className={styles["stat-number"]}>95%</span>
              <span className={styles["stat-label"]}>Completion Rate</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityManager;
