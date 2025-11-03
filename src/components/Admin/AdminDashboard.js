import React from "react";
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
import styles from "../Dashboard.module.css";

const AdminDashboard = ({ onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();

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
      id: "profile",
      label: "Profile",
      icon: UserCircle,
      path: "/admin/profile",
    },
  ];

  const getCurrentPageLabel = () => {
    const currentPath = location.pathname;
    const currentItem = menuItems.find((item) => currentPath === item.path);
    return currentItem ? currentItem.label : "Dashboard";
  };

  const handleNavClick = (path) => {
    navigate(path);
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
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
            return (
              <button
                key={item.id}
                className={[
                  styles["nav-item"],
                  isActiveRoute(item.path) ? styles["active"] : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => handleNavClick(item.path)}
              >
                <IconComponent className={styles["nav-icon"]} size={20} />
                <span className={styles["nav-label"]}>{item.label}</span>
              </button>
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
