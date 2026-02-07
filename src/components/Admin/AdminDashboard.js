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
  AlertCircle,
  AlertTriangle,
  Folder,
  Activity,
  GitBranch,
  Star,
  FileText,
  FileCheck,
  Sparkles,
  ChevronDown,
  ChevronRight,
  School,
  Calendar,
  Upload,
  Layers,
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
import AdminOrgChart from "./Admins/AdminOrgChart";
import Departments from "./Departments/Departments";
import { Agents, CreateAgent, EditAgent } from "./Agents";
import { Users as UsersModule, EditUser } from "./Users";
import {
  Tickets,
  CreateTicket,
  EditTicket,
  ViewTicket,
  Statuses,
  Priorities,
  Topics,
  Events,
  Transitions,
  Ratings,
  SupportRolesReport,
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
import GuidanceCategories from "./Guidance/GuidanceCategories";
import GuidanceArticles from "./Guidance/GuidanceArticles";
import GuidanceEditor from "./Guidance/GuidanceEditor";
import AIImportCities from "./AIImport/Cities/Cities";
import AIImportUniversity from "./AIImport/University/University";
import AIImportCampus from "./AIImport/Campus/Campus";
import AIImportCourse from "./AIImport/Course/Course";
import AIImportIntake from "./AIImport/Intake/Intake";
import ImportEngine from "./AIImport/ImportEngine/ImportEngine";
import PagesList from "./Widgetize/PagesList";
import PageBuilder from "./Widgetize/PageBuilder";
import styles from "../Dashboard.module.css";

const AdminDashboard = ({ onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAIImportOpen, setIsAIImportOpen] = useState(
    location.pathname.startsWith("/admin/ai-import")
  );
  const [isGuidanceOpen, setIsGuidanceOpen] = useState(
    location.pathname.startsWith("/admin/guidance")
  );
  const [isWidgetizeOpen, setIsWidgetizeOpen] = useState(
    location.pathname.startsWith("/admin/widgetize")
  );
  const [isTicketsOpen, setIsTicketsOpen] = useState(
    location.pathname.startsWith("/admin/tickets")
  );
  const [isPeopleOpen, setIsPeopleOpen] = useState(
    location.pathname.startsWith("/admin/admins") ||
      location.pathname.startsWith("/admin/agents") ||
      location.pathname.startsWith("/admin/users") ||
      location.pathname.startsWith("/admin/departments")
  );
  const [isAccessOpen, setIsAccessOpen] = useState(
    location.pathname.startsWith("/admin/roles") ||
      location.pathname.startsWith("/admin/permissions")
  );
  const [isContentOpen, setIsContentOpen] = useState(
    location.pathname.startsWith("/admin/countries") ||
      location.pathname.startsWith("/admin/cities") ||
      location.pathname.startsWith("/admin/documents") ||
      location.pathname.startsWith("/admin/document-submissions")
  );
  const [isEducationOpen, setIsEducationOpen] = useState(
    location.pathname.startsWith("/admin/education-levels") ||
      location.pathname.startsWith("/admin/universities") ||
      location.pathname.startsWith("/admin/majors") ||
      location.pathname.startsWith("/admin/courses")
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
      id: "people",
      label: "People",
      icon: Users,
      path: "/admin/people",
      hasSubmenu: true,
      submenuItems: [
        {
          id: "admins",
          label: "Admins",
          icon: User,
          path: "/admin/admins",
        },
        {
          id: "admin-org-chart",
          label: "Org Chart",
          icon: GitBranch,
          path: "/admin/admins/org-chart",
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
          id: "departments",
          label: "Departments",
          icon: Building2,
          path: "/admin/departments",
        },
      ],
    },
    {
      id: "access",
      label: "Access Control",
      icon: Shield,
      path: "/admin/access",
      hasSubmenu: true,
      submenuItems: [
        {
          id: "roles",
          label: "Roles",
          icon: Users,
          path: "/admin/roles",
        },
        {
          id: "permissions",
          label: "Permissions",
          icon: Shield,
          path: "/admin/permissions",
        },
      ],
    },
    {
      id: "tickets",
      label: "Tickets",
      icon: Ticket,
      path: "/admin/tickets",
      hasSubmenu: true,
      submenuItems: [
        {
          id: "tickets-index",
          label: "All Tickets",
          icon: Ticket,
          path: "/admin/tickets",
        },
        {
          id: "tickets-support-roles",
          label: "Support Roles",
          icon: BarChart3,
          path: "/admin/tickets/support-roles",
        },
        {
          id: "tickets-statuses",
          label: "Statuses",
          icon: AlertCircle,
          path: "/admin/tickets/statuses",
        },
        {
          id: "tickets-priorities",
          label: "Priorities",
          icon: AlertTriangle,
          path: "/admin/tickets/priorities",
        },
        {
          id: "tickets-topics",
          label: "Topics",
          icon: Folder,
          path: "/admin/tickets/topics",
        },
        {
          id: "tickets-events",
          label: "Events",
          icon: Activity,
          path: "/admin/tickets/events",
        },
        {
          id: "tickets-transitions",
          label: "Transitions",
          icon: GitBranch,
          path: "/admin/tickets/transitions",
        },
        {
          id: "tickets-ratings",
          label: "Ratings",
          icon: Star,
          path: "/admin/tickets/ratings",
        },
      ],
    },
    {
      id: "content",
      label: "Content",
      icon: FileText,
      path: "/admin/content",
      hasSubmenu: true,
      submenuItems: [
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
      ],
    },
    {
      id: "education",
      label: "Education",
      icon: GraduationCap,
      path: "/admin/education",
      hasSubmenu: true,
      submenuItems: [
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
      ],
    },
    {
      id: "guidance",
      label: "Guidance",
      icon: Layers,
      path: "/admin/guidance",
      hasSubmenu: true,
      submenuItems: [
        {
          id: "guidance-categories",
          label: "Categories",
          icon: Layers,
          path: "/admin/guidance/categories",
        },
        {
          id: "guidance-articles",
          label: "Articles",
          icon: BookOpen,
          path: "/admin/guidance/articles",
        },
      ],
    },
    {
      id: "widgetize",
      label: "Widgetize",
      icon: Layers,
      path: "/admin/widgetize",
      hasSubmenu: true,
      submenuItems: [
        {
          id: "pages",
          label: "Pages",
          icon: Globe,
          path: "/admin/widgetize/pages",
        },
      ],
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
        {
          id: "ai-import-engine",
          label: "Import Engine",
          icon: Upload,
          path: "/admin/ai-import/engine",
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
      if (currentPath === "/admin/ai-import/engine") return "Import Engine";
      return "AI Import";
    }

    if (currentPath.startsWith("/admin/admins/org-chart")) {
      return "Admin Org Chart";
    }
    if (currentPath.startsWith("/admin/admins")) {
      return "Admins";
    }
    if (currentPath.startsWith("/admin/agents")) {
      return "Agents";
    }
    if (currentPath.startsWith("/admin/users")) {
      return "Users";
    }
    if (currentPath.startsWith("/admin/departments")) {
      return "Departments";
    }
    if (currentPath.startsWith("/admin/roles")) {
      return "Roles";
    }
    if (currentPath.startsWith("/admin/permissions")) {
      return "Permissions";
    }
    if (currentPath.startsWith("/admin/countries")) {
      return "Countries";
    }
    if (currentPath.startsWith("/admin/cities")) {
      return "Cities";
    }
    if (currentPath.startsWith("/admin/education-levels")) {
      return "Education Levels";
    }
    if (currentPath.startsWith("/admin/universities")) {
      return "Universities";
    }
    if (currentPath.startsWith("/admin/majors")) {
      return "Majors/Fields";
    }
    if (currentPath.startsWith("/admin/courses")) {
      return "Courses";
    }
    if (currentPath.startsWith("/admin/documents")) {
      return "Document Templates";
    }
    if (currentPath.startsWith("/admin/document-submissions")) {
      return "Document Submissions";
    }
    if (currentPath.startsWith("/admin/guidance/editor")) {
      return "Guidance Editor";
    }
    if (currentPath === "/admin/guidance/categories") {
      return "Guidance Categories";
    }
    if (currentPath === "/admin/guidance/articles") {
      return "Guidance Articles";
    }
    if (currentPath.startsWith("/admin/widgetize")) {
      if (currentPath === "/admin/widgetize/pages") return "Pages";
      if (currentPath.match(/^\/admin\/widgetize\/pages\/builder\//)) return "Page Builder";
      return "Widgetize";
    }
    if (currentPath === "/admin/tickets") {
      return "Tickets";
    }
    if (currentPath === "/admin/tickets/support-roles") {
      return "Support Roles Report";
    }
    if (currentPath === "/admin/tickets/statuses") {
      return "Ticket Statuses";
    }
    if (currentPath === "/admin/tickets/priorities") {
      return "Ticket Priorities";
    }
    if (currentPath === "/admin/tickets/topics") {
      return "Ticket Topics";
    }
    if (currentPath === "/admin/tickets/events") {
      return "Ticket Events";
    }
    if (currentPath === "/admin/tickets/transitions") {
      return "Ticket Transitions";
    }
    if (currentPath === "/admin/tickets/ratings") {
      return "Ticket Ratings";
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
    if (itemId === "guidance") {
      setIsGuidanceOpen(!isGuidanceOpen);
    }
    if (itemId === "widgetize") {
      setIsWidgetizeOpen(!isWidgetizeOpen);
    }
    if (itemId === "tickets") {
      setIsTicketsOpen(!isTicketsOpen);
    }
    if (itemId === "people") {
      setIsPeopleOpen(!isPeopleOpen);
    }
    if (itemId === "access") {
      setIsAccessOpen(!isAccessOpen);
    }
    if (itemId === "content") {
      setIsContentOpen(!isContentOpen);
    }
    if (itemId === "education") {
      setIsEducationOpen(!isEducationOpen);
    }
  };

  const isActiveRoute = (path) => {
    // Handle AI Import submenu
    if (path === "/admin/ai-import") {
      return location.pathname.startsWith("/admin/ai-import");
    }
    if (path === "/admin/guidance") {
      return location.pathname.startsWith("/admin/guidance");
    }
    if (path === "/admin/widgetize") {
      return location.pathname.startsWith("/admin/widgetize");
    }
    if (path === "/admin/tickets") {
      return location.pathname.startsWith("/admin/tickets");
    }
    if (path === "/admin/people") {
      return (
        location.pathname.startsWith("/admin/admins") ||
        location.pathname.startsWith("/admin/agents") ||
        location.pathname.startsWith("/admin/users") ||
        location.pathname.startsWith("/admin/departments")
      );
    }
    if (path === "/admin/access") {
      return (
        location.pathname.startsWith("/admin/roles") ||
        location.pathname.startsWith("/admin/permissions")
      );
    }
    if (path === "/admin/content") {
      return (
        location.pathname.startsWith("/admin/countries") ||
        location.pathname.startsWith("/admin/cities") ||
        location.pathname.startsWith("/admin/documents") ||
        location.pathname.startsWith("/admin/document-submissions")
      );
    }
    if (path === "/admin/education") {
      return (
        location.pathname.startsWith("/admin/education-levels") ||
        location.pathname.startsWith("/admin/universities") ||
        location.pathname.startsWith("/admin/majors") ||
        location.pathname.startsWith("/admin/courses")
      );
    }
    if (path === "/admin/admins") {
      return location.pathname.startsWith("/admin/admins");
    }
    return location.pathname === path;
  };

  const isSubmenuOpen = (itemId) => {
    if (itemId === "ai-import") return isAIImportOpen;
    if (itemId === "guidance") return isGuidanceOpen;
    if (itemId === "widgetize") return isWidgetizeOpen;
    if (itemId === "tickets") return isTicketsOpen;
    if (itemId === "people") return isPeopleOpen;
    if (itemId === "access") return isAccessOpen;
    if (itemId === "content") return isContentOpen;
    if (itemId === "education") return isEducationOpen;
    return false;
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
      case "/admin/guidance/categories":
      case "/admin/guidance/categories/":
        return <GuidanceCategories />;
      case "/admin/guidance/articles":
      case "/admin/guidance/articles/":
        return <GuidanceArticles />;
      case "/admin/guidance/editor":
      case "/admin/guidance/editor/":
        return <GuidanceEditor />;
      case "/admin/admins":
      case "/admin/admins/":
        return <Admins />;
      case "/admin/admins/org-chart":
      case "/admin/admins/org-chart/":
        return <AdminOrgChart />;
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
      case "/admin/departments":
      case "/admin/departments/":
        return <Departments />;
      case "/admin/tickets":
      case "/admin/tickets/":
        return <Tickets />;
      case "/admin/tickets/support-roles":
      case "/admin/tickets/support-roles/":
        return <SupportRolesReport />;
      case "/admin/tickets/create":
        return <CreateTicket />;
      case "/admin/tickets/edit":
        return <EditTicket />;
      case "/admin/tickets/view":
        return <ViewTicket />;
      case "/admin/tickets/statuses":
        return <Statuses />;
      case "/admin/tickets/priorities":
        return <Priorities />;
      case "/admin/tickets/topics":
        return <Topics />;
      case "/admin/tickets/events":
        return <Events />;
      case "/admin/tickets/transitions":
        return <Transitions />;
      case "/admin/tickets/ratings":
        return <Ratings />;
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
      case "/admin/ai-import/engine":
      case "/admin/ai-import/engine/":
        return <ImportEngine />;
      case "/admin/widgetize/pages":
      case "/admin/widgetize/pages/":
        return <PagesList />;
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
        if (currentPath.startsWith("/admin/guidance/editor/")) {
          return <GuidanceEditor />;
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
        if (currentPath.match(/^\/admin\/widgetize\/pages\/builder\/.+/)) {
          return <PageBuilder />;
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
                      {isSubmenuOpen(item.id) ? (
                        <ChevronDown size={16} />
                      ) : (
                        <ChevronRight size={16} />
                      )}
                    </span>
                  )}
                </button>

                {item.hasSubmenu && isSubmenuOpen(item.id) && (
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
