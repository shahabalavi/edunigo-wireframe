import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Routes, Route } from "react-router-dom";
import {
  BarChart3,
  FileText,
  GraduationCap,
  Folder,
  User,
  LogOut,
  Home,
  Search,
  BookOpen,
  CreditCard,
  Gift,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  Building,
  TestTube,
  Smartphone,
  Coins,
} from "lucide-react";
import Notifications from "../Shared/Notifications";
import UserDashboardHome from "./Dashboard/UserDashboardHome";
import Applications from "./Applications/Applications";
import ApplicationDetails from "./Applications/ApplicationDetails";
import Programs from "./Programs/Programs";
import Documents from "./Documents/Documents";
import DocumentDetail from "./Documents/DocumentDetail";
import Profile from "./Profile/Profile";
import Accommodation from "./StudentServices/Accommodation";
import Tests from "./StudentServices/Tests";
import SimCard from "./StudentServices/SimCard";
import BankAccount from "./StudentServices/BankAccount";
import MoneyExchange from "./StudentServices/MoneyExchange";
import GoXRewards from "./GoXRewards/GoXRewards";
import StudentSupport from "./StudentSupport/StudentSupport";
import styles from "../Dashboard.module.css";
import {
  getCurrentSessionId,
  getSessionData,
} from "../../utils/gocheckSessionManager";

const UserDashboard = ({ onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isStudentServicesOpen, setIsStudentServicesOpen] = useState(false);

  // Check if user should continue GoCheck after login
  useEffect(() => {
    const checkGoCheckContinuation = () => {
      const continueGoCheck = localStorage.getItem("continueGoCheckAfterAuth");
      if (continueGoCheck === "true") {
        localStorage.removeItem("continueGoCheckAfterAuth");
        navigate("/gocheck");
        return;
      }

      // Check if user has incomplete GoCheck session
      const currentSessionId = getCurrentSessionId();
      if (currentSessionId) {
        const sessionData = getSessionData(currentSessionId);
        if (sessionData) {
          const hasStage1Answers =
            sessionData.answers && Object.keys(sessionData.answers).length > 0;
          const hasStage2Answers =
            sessionData.additionalAnswers &&
            Object.keys(sessionData.additionalAnswers).length > 0;
          const hasSelectedUniversity = sessionData.selectedUniversity;

          // If user has started but not completed GoCheck, redirect to continue
          if (
            hasStage1Answers &&
            (!hasStage2Answers || !hasSelectedUniversity)
          ) {
            navigate("/gocheck");
            return;
          }
        }
      }
    };

    // Only check on initial load, not on route changes
    if (location.pathname === "/user/dashboard") {
      checkGoCheckContinuation();
    }
  }, [location.pathname, navigate]);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigate("/login");
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  // Menu items with new navigation structure
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: BarChart3,
      path: "/user/dashboard",
    },
    {
      id: "programs",
      label: "Course Finder",
      icon: Search,
      path: "/user/programs",
    },
    {
      id: "documents",
      label: "My Documents",
      icon: Folder,
      path: "/user/documents",
    },
    {
      id: "applications",
      label: "My Applications",
      icon: FileText,
      path: "/user/applications",
    },
    {
      id: "student-services",
      label: "Student Services",
      icon: BookOpen,
      hasSubmenu: true,
      submenuItems: [
        {
          id: "accommodation",
          label: "Accommodation",
          icon: Building,
          path: "/user/student-services/accommodation",
        },
        {
          id: "tests",
          label: "Tests",
          icon: TestTube,
          path: "/user/student-services/tests",
        },
        {
          id: "sim-card",
          label: "SIM Card",
          icon: Smartphone,
          path: "/user/student-services/sim-card",
        },
        {
          id: "bank-account",
          label: "Bank Account",
          icon: CreditCard,
          path: "/user/student-services/bank-account",
        },
        {
          id: "money-exchange",
          label: "Money Exchange",
          icon: Coins,
          path: "/user/student-services/money-exchange",
        },
      ],
    },
    {
      id: "gox-rewards",
      label: "GoX Rewards",
      icon: Gift,
      path: "/user/gox-rewards",
      isNew: true,
    },
    {
      id: "student-support",
      label: "Student Support",
      icon: HelpCircle,
      path: "/user/student-support",
      isNew: true,
    },
    {
      id: "profile",
      label: "My Profile",
      icon: User,
      path: "/user/profile",
    },
  ];

  const getCurrentPageLabel = () => {
    const currentPath = location.pathname;

    // Check main menu items first
    const currentItem = menuItems.find((item) => currentPath === item.path);
    if (currentItem) return currentItem.label;

    // Check submenu items
    for (const item of menuItems) {
      if (item.hasSubmenu && item.submenuItems) {
        const submenuItem = item.submenuItems.find(
          (subItem) => currentPath === subItem.path
        );
        if (submenuItem) return submenuItem.label;
      }
    }

    return "Dashboard";
  };

  const handleNavClick = (path) => {
    navigate(path);
  };

  const handleSubmenuToggle = (itemId) => {
    if (itemId === "student-services") {
      setIsStudentServicesOpen(!isStudentServicesOpen);
    }
  };

  const isActiveRoute = (path) => {
    // Handle nested routes for applications
    if (path === "/user/applications") {
      return location.pathname.startsWith("/user/applications");
    }
    // Handle nested routes for documents
    if (path === "/user/documents") {
      return location.pathname.startsWith("/user/documents");
    }
    // Handle student services submenu
    if (path === "/user/student-services") {
      return location.pathname.startsWith("/user/student-services");
    }
    return location.pathname === path;
  };

  const isSubmenuActive = (submenuItems) => {
    return submenuItems.some((subItem) => location.pathname === subItem.path);
  };

  const renderPage = () => {
    console.log("Current path:", location.pathname); // Debug logging

    return (
      <Routes>
        <Route path="dashboard" element={<UserDashboardHome />} />
        <Route path="applications" element={<Applications />} />
        <Route path="applications/:id" element={<ApplicationDetails />} />
        <Route path="programs" element={<Programs />} />
        <Route path="documents" element={<Documents />} />
        <Route path="documents/:id" element={<DocumentDetail />} />
        <Route path="profile" element={<Profile />} />
        <Route
          path="student-services/accommodation"
          element={<Accommodation />}
        />
        <Route path="student-services/tests" element={<Tests />} />
        <Route path="student-services/sim-card" element={<SimCard />} />
        <Route path="student-services/bank-account" element={<BankAccount />} />
        <Route
          path="student-services/money-exchange"
          element={<MoneyExchange />}
        />
        <Route path="gox-rewards" element={<GoXRewards />} />
        <Route path="student-support" element={<StudentSupport />} />
        <Route path="*" element={<UserDashboardHome />} />
      </Routes>
    );
  };

  return (
    <div className={styles["dashboard-layout"]}>
      <div className={styles["sidebar"]}>
        <div className={styles["sidebar-header"]}>
          <div className={styles["logo"]}>
            <GraduationCap className={styles["logo-icon"]} size={24} />
            <span className={styles["logo-text"]}>EduniGo</span>
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
                  {item.isNew && (
                    <span className={styles["new-badge"]}>new</span>
                  )}
                  {item.hasSubmenu && (
                    <span className={styles["submenu-arrow"]}>
                      {isStudentServicesOpen ? (
                        <ChevronDown size={16} />
                      ) : (
                        <ChevronRight size={16} />
                      )}
                    </span>
                  )}
                </button>

                {item.hasSubmenu &&
                  item.id === "student-services" &&
                  isStudentServicesOpen && (
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
            <div className={styles["top-bar-actions"]}>
              <Notifications />
              <div className={styles["user-info"]}>
                <div className={styles["user-avatar"]}>U</div>
                <span className={styles["user-name"]}>User Dashboard</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles["content-area"]}>{renderPage()}</div>
      </div>
    </div>
  );
};

export default UserDashboard;
