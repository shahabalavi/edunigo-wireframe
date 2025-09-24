import React, { useState, useEffect } from "react";
import {
  Plus,
  FileText,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Filter,
  Target,
  MapPin,
  DollarSign,
  Calendar,
  GraduationCap,
  Code,
  Microscope,
  Briefcase,
  Palette,
  Calculator,
  Globe,
  Star,
  Award,
} from "lucide-react";
import ApplicationCard from "../../Shared/ApplicationCard";
import styles from "./DashboardHome.module.css";

const UserDashboardHome = () => {
  const [activeFilter, setActiveFilter] = useState("action-required");
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    // Load applications data
    loadApplications();
  }, []);

  const loadApplications = () => {
    // Sample applications data - 2 applications with 1 free slot for demo
    const sampleApplications = [
      {
        id: 1,
        university: "Stanford University",
        program: "Master of Computer Science",
        status: "action-required",
        statusLabel: "Action Required",
        nextAction: "Upload Your Statement of Purpose",
        deadline: "2024-12-15",
        appliedDate: "2024-10-15",
        progress: 75,
        logo: "🏛️",
        priority: "high",
      },
      {
        id: 2,
        university: "MIT",
        program: "Master of Science in AI",
        status: "awaiting-decision",
        statusLabel: "Awaiting Decision",
        nextAction: "Interview scheduled for Dec 10",
        deadline: "2024-12-20",
        appliedDate: "2024-11-01",
        progress: 100,
        logo: "🎓",
        priority: "high",
      },
    ];
    setApplications(sampleApplications);
  };

  const handleCardClick = () => {
    // Ensure user is properly authenticated before starting GoCheck
    const userRole = localStorage.getItem("userRole");
    const userLoginTime = localStorage.getItem("userLoginTime");

    console.log("Dashboard card clicked - checking authentication:", {
      userRole,
      userLoginTime,
    });

    if (!userRole || !userLoginTime) {
      // User is not properly authenticated, redirect to login
      console.log("User not authenticated, redirecting to login");
      window.location.href = "/login";
      return;
    }

    // User is authenticated, start GoCheck
    console.log("User is authenticated, starting GoCheck");
    window.location.href = "/gocheck";
  };

  const handleApplicationClick = (application) => {
    // Navigate to detailed application view
    console.log("Opening application details:", application);
    window.location.href = `/applications/${application.id}`;
  };

  const getFilteredApplications = () => {
    if (activeFilter === "all") return applications;
    return applications.filter((app) => app.status === activeFilter);
  };

  const getApplicationsUsed = () => {
    return applications.length;
  };

  const getApplicationsByStatus = (status) => {
    return applications.filter((app) => app.status === status).length;
  };

  // Sponsorship courses data
  const sponsorshipCourses = [
    {
      id: 1,
      name: "Fulbright Scholarship Program",
      field: "All Fields",
      university: "Various Universities",
      country: "United States",
      city: "Multiple Locations",
      duration: "1-2 years",
      tuition: "Fully Funded",
      students: "4,000+",
      acceptanceRate: "15%",
      deadline: "Oct 15, 2024",
      description:
        "Prestigious scholarship program for international students pursuing graduate studies in the US.",
      requirements: [
        "Bachelor's degree",
        "English proficiency",
        "Academic excellence",
      ],
      icon: Award,
      sponsor: "US Government",
      funding: "Full tuition + living expenses",
    },
    {
      id: 2,
      name: "Chevening Scholarships",
      field: "All Fields",
      university: "UK Universities",
      country: "United Kingdom",
      city: "Multiple Locations",
      duration: "1 year",
      tuition: "Fully Funded",
      students: "1,500+",
      acceptanceRate: "12%",
      deadline: "Nov 1, 2024",
      description:
        "UK government's global scholarship program for future leaders and influencers.",
      requirements: ["Bachelor's degree", "IELTS 6.5+", "Leadership potential"],
      icon: Star,
      sponsor: "UK Government",
      funding: "Full tuition + monthly stipend",
    },
    {
      id: 3,
      name: "Erasmus Mundus Joint Masters",
      field: "All Fields",
      university: "European Universities",
      country: "Europe",
      city: "Multiple Locations",
      duration: "2 years",
      tuition: "Fully Funded",
      students: "2,500+",
      acceptanceRate: "20%",
      deadline: "Jan 15, 2025",
      description:
        "International master's programs offered by consortia of European universities.",
      requirements: [
        "Bachelor's degree",
        "English proficiency",
        "Academic merit",
      ],
      icon: Globe,
      sponsor: "European Commission",
      funding: "Full tuition + travel + living",
    },
    {
      id: 4,
      name: "Australia Awards Scholarships",
      field: "All Fields",
      university: "Australian Universities",
      country: "Australia",
      city: "Multiple Locations",
      duration: "2-4 years",
      tuition: "Fully Funded",
      students: "3,000+",
      acceptanceRate: "18%",
      deadline: "Apr 30, 2025",
      description:
        "Long-term development awards for students from developing countries.",
      requirements: ["Bachelor's degree", "IELTS 6.5+", "Development focus"],
      icon: Award,
      sponsor: "Australian Government",
      funding: "Full tuition + living + travel",
    },
    {
      id: 5,
      name: "Gates Cambridge Scholarships",
      field: "All Fields",
      university: "University of Cambridge",
      country: "United Kingdom",
      city: "Cambridge",
      duration: "1-3 years",
      tuition: "Fully Funded",
      students: "80+",
      acceptanceRate: "5%",
      deadline: "Dec 1, 2024",
      description:
        "Highly competitive scholarships for outstanding students at Cambridge University.",
      requirements: [
        "Academic excellence",
        "Leadership potential",
        "Social commitment",
      ],
      icon: Star,
      sponsor: "Bill & Melinda Gates Foundation",
      funding: "Full tuition + living + travel",
    },
    {
      id: 6,
      name: "Rhodes Scholarships",
      field: "All Fields",
      university: "University of Oxford",
      country: "United Kingdom",
      city: "Oxford",
      duration: "2-3 years",
      tuition: "Fully Funded",
      students: "100+",
      acceptanceRate: "3%",
      deadline: "Oct 1, 2024",
      description:
        "The world's oldest and most prestigious international scholarship program.",
      requirements: [
        "Academic excellence",
        "Leadership",
        "Character",
        "Service",
      ],
      icon: Award,
      sponsor: "Rhodes Trust",
      funding: "Full tuition + living + travel",
    },
  ];

  const getFieldIcon = (field) => {
    const icons = {
      "Computer Science": Code,
      "Data Science": Calculator,
      "AI & Machine Learning": Microscope,
      Business: Briefcase,
      "Arts & Design": Palette,
      "All Fields": GraduationCap,
    };
    return icons[field] || GraduationCap;
  };

  const renderSponsorshipCard = (course) => {
    const FieldIcon = getFieldIcon(course.field);
    const SponsorIcon = course.icon;

    return (
      <div key={course.id} className={styles["sponsorship-card"]}>
        <div className={styles["sponsorship-header"]}>
          <div className={styles["sponsorship-badge"]}>
            <SponsorIcon size={16} />
            <span>Sponsored</span>
          </div>
          <div className={styles["sponsorship-icon"]}>
            <FieldIcon size={20} />
          </div>
        </div>

        <div className={styles["sponsorship-content"]}>
          <h3 className={styles["sponsorship-name"]}>{course.name}</h3>
          <p className={styles["sponsorship-field"]}>{course.field}</p>

          <div className={styles["sponsorship-university"]}>
            <GraduationCap size={14} />
            <span>{course.university}</span>
          </div>

          <div className={styles["sponsorship-location"]}>
            <MapPin size={14} />
            <span>
              {course.city}, {course.country}
            </span>
          </div>

          <div className={styles["sponsorship-details"]}>
            <div className={styles["sponsorship-detail"]}>
              <Calendar size={12} />
              <span>{course.duration}</span>
            </div>
            <div className={styles["sponsorship-detail"]}>
              <DollarSign size={12} />
              <span>{course.tuition}</span>
            </div>
          </div>

          <div className={styles["sponsorship-funding"]}>
            <div className={styles["funding-label"]}>Funding:</div>
            <div className={styles["funding-amount"]}>{course.funding}</div>
          </div>

          <div className={styles["sponsorship-footer"]}>
            <div className={styles["sponsorship-deadline"]}>
              <Calendar size={12} />
              <span>Deadline: {course.deadline}</span>
            </div>
            <button className={styles["sponsorship-btn"]}>Learn More</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles["user-dashboard-home"]}>
      {/* GoX Student Dashboard Header */}
      <div className={styles["gox-dashboard-header"]}>
        <div className={styles["header-content"]}>
          <h1>GoX Student Dashboard</h1>
          <p>Your strategic command center for application management</p>
        </div>
      </div>

      {/* Focused 3 Tracker */}
      <div className={styles["focused-3-tracker"]}>
        <div className={styles["tracker-content"]}>
          <div className={styles["tracker-icon"]}>
            <Target size={24} />
          </div>
          <div className={styles["tracker-info"]}>
            <h2>Application Slots Used: {getApplicationsUsed()} / 3</h2>
            <p>Strategic focus on your top 3 programs</p>
          </div>
          {getApplicationsUsed() < 3 && (
            <button
              className={styles["add-application-btn"]}
              onClick={handleCardClick}
            >
              <Plus size={20} />
              Add Application
            </button>
          )}
        </div>
        <div className={styles["tracker-progress"]}>
          <div
            className={styles["progress-bar"]}
            style={{ width: `${(getApplicationsUsed() / 3) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Smart Triage Filters */}
      <div className={styles["triage-filters"]}>
        <div className={styles["filters-header"]}>
          <Filter size={20} />
          <h3>Smart Triage Filters</h3>
        </div>
        <div className={styles["filter-buttons"]}>
          <button
            className={[
              styles["filter-btn"],
              activeFilter === "all" ? styles["active"] : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onClick={() => setActiveFilter("all")}
          >
            All Applications ({applications.length})
          </button>
          <button
            className={[
              styles["filter-btn"],
              activeFilter === "action-required" ? "active" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onClick={() => setActiveFilter("action-required")}
          >
            <AlertTriangle size={16} />
            Action Required ({getApplicationsByStatus("action-required")})
          </button>
          <button
            className={[
              styles["filter-btn"],
              activeFilter === "awaiting-decision" ? "active" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onClick={() => setActiveFilter("awaiting-decision")}
          >
            <Clock size={16} />
            Awaiting Decision ({getApplicationsByStatus("awaiting-decision")})
          </button>
          <button
            className={[
              styles["filter-btn"],
              activeFilter === "final-outcome" ? "active" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onClick={() => setActiveFilter("final-outcome")}
          >
            <CheckCircle2 size={16} />
            Final Outcome ({getApplicationsByStatus("final-outcome")})
          </button>
        </div>
      </div>

      {/* Application Cards Grid */}
      <div className={styles["applications-grid"]}>
        {getFilteredApplications().map((application) => (
          <ApplicationCard
            key={application.id}
            application={application}
            onClick={handleApplicationClick}
          />
        ))}

        {/* Free Slot Card */}
        {getApplicationsUsed() < 3 && (
          <div className={styles["free-slot-card"]} onClick={handleCardClick}>
            <div className={styles["free-slot-content"]}>
              <div className={styles["free-slot-icon"]}>
                <Plus size={32} />
              </div>
              <h3>Add Application</h3>
              <p>Start GoCheck to find your perfect program</p>
              <div className={styles["free-slot-meta"]}>
                <span>Slot {getApplicationsUsed() + 1} of 3</span>
              </div>
            </div>
          </div>
        )}

        {/* Empty State for No Applications */}
        {getFilteredApplications().length === 0 &&
          getApplicationsUsed() === 0 && (
            <div className={styles["empty-state"]}>
              <div className={styles["empty-icon"]}>
                <FileText size={48} />
              </div>
              <h3>No applications found</h3>
              <p>
                No applications match your current filter. Try selecting a
                different filter or add a new application.
              </p>
              <button
                className={styles["add-application-btn"]}
                onClick={handleCardClick}
              >
                <Plus size={20} />
                Add Your First Application
              </button>
            </div>
          )}
      </div>

      {/* Sponsorship Courses Section */}
      <div className={styles["sponsorship-courses-section"]}>
        <div className={styles["section-header"]}>
          <h2>Sponsorship Courses</h2>
          <p>
            Discover fully funded scholarship opportunities from top
            institutions worldwide
          </p>
        </div>
        <div className={styles["sponsorship-courses-grid"]}>
          {sponsorshipCourses.map(renderSponsorshipCard)}
        </div>
      </div>
    </div>
  );
};

export default UserDashboardHome;
