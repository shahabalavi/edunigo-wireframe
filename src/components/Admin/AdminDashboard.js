import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  BarChart3,
  LogOut,
  Home,
  GraduationCap,
  Globe,
  BookOpen,
  Building2,
  GraduationCap as MajorIcon,
  BookOpen as CourseIcon,
  User,
  Shield,
  Users,
  UserCircle,
  MapPin,
  Ticket,
  FileText,
  FileCheck,
  Sparkles,
  ChevronDown,
  ChevronRight,
  School,
  Calendar,
} from "lucide-react";
import AdminDashboardHome from "./Dashboard/AdminDashboardHome";
import Countries from "./Countries/Countries";
import Cities from "./Cities/Cities";
import EducationLevels from "./EducationLevels/EducationLevels";
import Universities from "./Universities/Universities";
import CreateUniversity from "./Universities/CreateUniversity";
import EditUniversity from "./Universities/EditUniversity";
import UniversityManager from "./Universities/UniversityManager";
import UniversityDocuments from "./Universities/UniversityDocuments";
import Majors from "./Majors/Majors";
import Courses from "./Courses/Courses";
import CreateCourse from "./Courses/CreateCourse";
import EditCourse from "./Courses/EditCourse";
import Admins from "./Admins/Admins";
import CreateAdmin from "./Admins/CreateAdmin";
import EditAdmin from "./Admins/EditAdmin";
import { Agents, CreateAgent, EditAgent } from "./Agents";
import { Users as UsersModule, EditUser } from "./Users";
import {
  Tickets,
  CreateTicket,
  EditTicket,
  ViewTicket,
  Statuses,
  Departments,
  Priorities,
} from "./Tickets";
import Permissions from "./Permissions/Permissions";
import CreatePermission from "./Permissions/CreatePermission";
import Roles from "./Roles/Roles";
import CreateRole from "./Roles/CreateRole";
import EditRole from "./Roles/EditRole";
import Profile from "./Profile/Profile";
import Documents from "./Documents/Documents";
import CreateDocument from "./Documents/CreateDocument";
import EditDocument from "./Documents/EditDocument";
import DocumentSubmissions from "./DocumentSubmissions/DocumentSubmissions";
import DocumentSubmissionDetail from "./DocumentSubmissions/DocumentSubmissionDetail";
import AIImportCities from "./AIImport/Cities/Cities";
import AIImportUniversity from "./AIImport/University/University";
import AIImportCampus from "./AIImport/Campus/Campus";
import AIImportCourse from "./AIImport/Course/Course";
import AIImportIntake from "./AIImport/Intake/Intake";
import styles from "../Dashboard.module.css";

const AdminDashboard = ({ onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAIImportOpen, setIsAIImportOpen] = useState(
    location.pathname.startsWith("/admin/ai-import")
  );

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigate("/login");
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: BarChart3,
      path: "/admin/dashboard",
    },
    {
      id: "countries",
      label: "Countries",
      icon: Globe,
      path: "/admin/countries",
    },
    {
      id: "cities",
      label: "Cities",
      icon: MapPin,
      path: "/admin/cities",
    },
    {
      id: "education-levels",
      label: "Education Levels",
      icon: BookOpen,
      path: "/admin/education-levels",
    },
    {
      id: "universities",
      label: "Universities",
      icon: Building2,
      path: "/admin/universities",
    },
    {
      id: "majors",
      label: "Majors/Fields",
      icon: MajorIcon,
      path: "/admin/majors",
    },
    {
      id: "courses",
      label: "Courses",
      icon: CourseIcon,
      path: "/admin/courses",
    },
    {
      id: "document-templates",
      label: "Document Templates",
      icon: FileText,
      path: "/admin/documents",
    },
    {
      id: "document-submissions",
      label: "Document Submissions",
      icon: FileCheck,
      path: "/admin/document-submissions",
    },
    {
      id: "admins",
      label: "Admins",
      icon: User,
      path: "/admin/admins",
    },
    {
      id: "agents",
      label: "Agents",
      icon: UserCircle,
      path: "/admin/agents",
    },
    {
      id: "users",
      label: "Users",
      icon: Users,
      path: "/admin/users",
    },
    {
      id: "tickets",
      label: "Tickets",
      icon: Ticket,
      path: "/admin/tickets",
    },
    {
      id: "permissions",
      label: "Permissions",
      icon: Shield,
      path: "/admin/permissions",
    },
    {
      id: "roles",
      label: "Roles",
      icon: Users,
      path: "/admin/roles",
    },
    {
      id: "ai-import",
      label: "AI Import",
      icon: Sparkles,
      path: "/admin/ai-import",
      hasSubmenu: true,
      submenuItems: [
        {
          id: "ai-import-cities",
          label: "Cities",
          icon: MapPin,
          path: "/admin/ai-import/cities",
        },
        {
          id: "ai-import-university",
          label: "University",
          icon: Building2,
          path: "/admin/ai-import/university",
        },
        {
          id: "ai-import-campus",
          label: "Campus",
          icon: School,
          path: "/admin/ai-import/campus",
        },
        {
          id: "ai-import-course",
          label: "Course",
          icon: BookOpen,
          path: "/admin/ai-import/course",
        },
        {
          id: "ai-import-intake",
          label: "Intake",
          icon: Calendar,
          path: "/admin/ai-import/intake",
        },
      ],
    },
    {
      id: "profile",
      label: "Profile",
      icon: UserCircle,
      path: "/admin/profile",
    },
  ];

  const getCurrentPageLabel = () => {
    const currentPath = location.pathname;
    
    // Handle AI Import submenu items
    if (currentPath.startsWith("/admin/ai-import")) {
      if (currentPath === "/admin/ai-import/cities") return "AI Import - Cities";
      if (currentPath === "/admin/ai-import/university") return "AI Import - University";
      if (currentPath === "/admin/ai-import/campus") return "AI Import - Campus";
      if (currentPath === "/admin/ai-import/course") return "AI Import - Course";
      if (currentPath === "/admin/ai-import/intake") return "AI Import - Intake";
      return "AI Import";
    }
    
    const currentItem = menuItems.find((item) => currentPath === item.path);
    return currentItem ? currentItem.label : "Dashboard";
  };

  const handleNavClick = (path) => {
    navigate(path);
  };

  const handleSubmenuToggle = (itemId) => {
    if (itemId === "ai-import") {
      setIsAIImportOpen(!isAIImportOpen);
    }
  };

  const isActiveRoute = (path) => {
    // Handle AI Import submenu
    if (path === "/admin/ai-import") {
      return location.pathname.startsWith("/admin/ai-import");
    }
    return location.pathname === path;
  };

  const isSubmenuActive = (submenuItems) => {
    return submenuItems.some((subItem) => location.pathname === subItem.path);
  };

  const renderPage = () => {
    const currentPath = location.pathname;

    switch (currentPath) {
      case "/admin/dashboard":
      case "/admin/dashboard/":
        return <AdminDashboardHome />;
      case "/admin/countries":
      case "/admin/countries/":
        return <Countries />;
      case "/admin/cities":
      case "/admin/cities/":
        return <Cities />;
      case "/admin/education-levels":
      case "/admin/education-levels/":
        return <EducationLevels />;
      case "/admin/universities":
      case "/admin/universities/":
        return <Universities />;
      case "/admin/universities/create":
        return <CreateUniversity />;
      case "/admin/universities/edit":
        return <EditUniversity />;
      case "/admin/universities/manage":
        return <UniversityManager />;
      case "/admin/majors":
      case "/admin/majors/":
        return <Majors />;
      case "/admin/courses":
      case "/admin/courses/":
        return <Courses />;
      case "/admin/courses/create":
        return <CreateCourse />;
      case "/admin/courses/edit":
        return <EditCourse />;
      case "/admin/documents":
      case "/admin/documents/":
        return <Documents />;
      case "/admin/documents/create":
        return <CreateDocument />;
      case "/admin/document-submissions":
      case "/admin/document-submissions/":
        return <DocumentSubmissions />;
      case "/admin/admins":
      case "/admin/admins/":
        return <Admins />;
      case "/admin/admins/create":
        return <CreateAdmin />;
      case "/admin/agents":
      case "/admin/agents/":
        return <Agents />;
      case "/admin/agents/create":
        return <CreateAgent />;
      case "/admin/users":
      case "/admin/users/":
        return <UsersModule />;
      case "/admin/tickets":
      case "/admin/tickets/":
        return <Tickets />;
      case "/admin/tickets/create":
        return <CreateTicket />;
      case "/admin/tickets/edit":
        return <EditTicket />;
      case "/admin/tickets/view":
        return <ViewTicket />;
      case "/admin/tickets/statuses":
        return <Statuses />;
      case "/admin/tickets/departments":
        return <Departments />;
      case "/admin/tickets/priorities":
        return <Priorities />;
      case "/admin/permissions":
      case "/admin/permissions/":
        return <Permissions />;
      case "/admin/permissions/create":
        return <CreatePermission />;
      case "/admin/roles":
      case "/admin/roles/":
        return <Roles />;
      case "/admin/roles/create":
        return <CreateRole />;
      case "/admin/profile":
      case "/admin/profile/":
        return <Profile />;
      case "/admin/ai-import/cities":
      case "/admin/ai-import/cities/":
        return <AIImportCities />;
      case "/admin/ai-import/university":
      case "/admin/ai-import/university/":
        return <AIImportUniversity />;
      case "/admin/ai-import/campus":
      case "/admin/ai-import/campus/":
        return <AIImportCampus />;
      case "/admin/ai-import/course":
      case "/admin/ai-import/course/":
        return <AIImportCourse />;
      case "/admin/ai-import/intake":
      case "/admin/ai-import/intake/":
        return <AIImportIntake />;
      default:
        // Handle dynamic edit routes
        if (currentPath.startsWith("/admin/universities/edit/")) {
          return <EditUniversity />;
        }
        if (currentPath.startsWith("/admin/universities/manage/")) {
          return <UniversityManager />;
        }
        if (currentPath.match(/^\/admin\/universities\/\d+\/documents$/)) {
          return <UniversityDocuments />;
        }
        if (currentPath.startsWith("/admin/courses/edit/")) {
          return <EditCourse />;
        }
        if (currentPath.startsWith("/admin/documents/edit/")) {
          return <EditDocument />;
        }
        if (currentPath.startsWith("/admin/document-submissions/")) {
          return <DocumentSubmissionDetail />;
        }
        if (currentPath.startsWith("/admin/admins/edit/")) {
          return <EditAdmin />;
        }
        if (currentPath.startsWith("/admin/agents/edit/")) {
          return <EditAgent />;
        }
        if (currentPath.startsWith("/admin/users/edit/")) {
          return <EditUser />;
        }
        if (currentPath.startsWith("/admin/tickets/edit/")) {
          return <EditTicket />;
        }
        if (currentPath.startsWith("/admin/tickets/view/")) {
          return <ViewTicket />;
        }
        if (currentPath.startsWith("/admin/roles/edit/")) {
          return <EditRole />;
        }
        return <AdminDashboardHome />;
    }
  };

  return (
    <div className={styles["dashboard-layout"]}>
      <div className={styles["sidebar"]}>
        <div className={styles["sidebar-header"]}>
          <div className={styles["logo"]}>
            <GraduationCap className={styles["logo-icon"]} size={24} />
            <span className={styles["logo-text"]}>EduniGo Admin</span>
          </div>
        </div>

        <nav className={styles["sidebar-nav"]}>
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const hasActiveSubmenu =
              item.hasSubmenu && isSubmenuActive(item.submenuItems);
            const isMainItemActive =
              isActiveRoute(item.path) || hasActiveSubmenu;

            return (
              <div key={item.id} className={styles["nav-item-container"]}>
                <button
                  className={[
                    styles["nav-item"],
                    isMainItemActive ? styles["active"] : "",
                    item.hasSubmenu ? styles["has-submenu"] : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => {
                    if (item.hasSubmenu) {
                      handleSubmenuToggle(item.id);
                    } else {
                      handleNavClick(item.path);
                    }
                  }}
                >
                  <IconComponent className={styles["nav-icon"]} size={20} />
                  <span className={styles["nav-label"]}>{item.label}</span>
                  {item.hasSubmenu && (
                    <span className={styles["submenu-arrow"]}>
                      {isAIImportOpen ? (
                        <ChevronDown size={16} />
                      ) : (
                        <ChevronRight size={16} />
                      )}
                    </span>
                  )}
                </button>

                {item.hasSubmenu &&
                  item.id === "ai-import" &&
                  isAIImportOpen && (
                    <div className={styles["submenu"]}>
                      {item.submenuItems.map((subItem) => {
                        const SubIconComponent = subItem.icon;
                        return (
                          <button
                            key={subItem.id}
                            className={[
                              styles["submenu-item"],
                              location.pathname === subItem.path
                                ? styles["active"]
                                : "",
                            ]
                              .filter(Boolean)
                              .join(" ")}
                            onClick={() => handleNavClick(subItem.path)}
                          >
                            <SubIconComponent
                              className={styles["submenu-icon"]}
                              size={16}
                            />
                            <span className={styles["submenu-label"]}>
                              {subItem.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
              </div>
            );
          })}
        </nav>

        <div className={styles["sidebar-footer"]}>
          <button
            className={styles["back-to-home-btn"]}
            onClick={handleBackToHome}
          >
            <Home className={styles["back-to-home-icon"]} size={18} />
            <span>← Back to EduniGo Home</span>
          </button>
          <button className={styles["logout-btn"]} onClick={handleLogout}>
            <LogOut className={styles["logout-icon"]} size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      <div className={styles["main-content"]}>
        <div className={styles["top-bar"]}>
          <div className={styles["top-bar-left"]}>
            <h2>{getCurrentPageLabel()}</h2>
          </div>
          <div className={styles["top-bar-right"]}>
            <button
              className={styles["user-info"]}
              onClick={() => navigate("/admin/profile")}
              title="View Profile"
            >
              <div className={styles["user-avatar"]}>A</div>
              <span className={styles["user-name"]}>Admin Dashboard</span>
            </button>
          </div>
        </div>

        <div className={styles["content-area"]}>{renderPage()}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
