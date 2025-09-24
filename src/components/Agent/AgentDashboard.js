import React from "react";
import { useLocation, useNavigate, Routes, Route } from "react-router-dom";
import {
  BarChart3,
  LogOut,
  Home,
  GraduationCap,
  Users,
  FileText,
  MessageSquare,
} from "lucide-react";
import AgentDashboardHome from "./Dashboard/AgentDashboardHome";
import UsersIndex from "./Users/Users";
import UserDetails from "./Users/UserDetails";
import ProfileCompletion from "./Users/ProfileCompletion";
import Applications from "./Applications/Applications";
import ApplicationDetails from "./Applications/ApplicationDetails";
import CreateApplication from "./Applications/CreateApplication";
import Tickets from "./Tickets/Tickets";
import TicketDetails from "./Tickets/TicketDetails";
import CreateTicket from "./Tickets/CreateTicket";
import styles from "../Dashboard.module.css";

const AgentDashboard = ({ onLogout }) => {
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
      path: "/agent/dashboard",
    },
    {
      id: "users",
      label: "Users",
      icon: Users,
      path: "/agent/users",
    },
    {
      id: "applications",
      label: "Applications",
      icon: FileText,
      path: "/agent/applications",
    },
    {
      id: "tickets",
      label: "Tickets",
      icon: MessageSquare,
      path: "/agent/tickets",
    },
  ];

  const getCurrentPageLabel = () => {
    const currentPath = location.pathname;

    // Handle nested routes for users
    if (currentPath.startsWith("/agent/users")) {
      if (currentPath.includes("/edit")) {
        return "Edit User Profile";
      } else if (currentPath.match(/\/agent\/users\/\d+$/)) {
        return "User Details";
      } else if (currentPath === "/agent/users") {
        return "Users";
      }
      return "Users";
    }

    // Handle nested routes for applications
    if (currentPath.startsWith("/agent/applications")) {
      if (currentPath.includes("/create")) {
        return "Create Application";
      } else if (currentPath.includes("/edit")) {
        return "Edit Application";
      } else if (currentPath.match(/\/agent\/applications\/\d+$/)) {
        return "Application Details";
      } else if (currentPath === "/agent/applications") {
        return "Applications";
      }
      return "Applications";
    }

    // Handle nested routes for tickets
    if (currentPath.startsWith("/agent/tickets")) {
      if (currentPath.includes("/create")) {
        return "Create Ticket";
      } else if (currentPath.match(/\/agent\/tickets\/\d+$/)) {
        return "Ticket Details";
      } else if (currentPath === "/agent/tickets") {
        return "Tickets";
      }
      return "Tickets";
    }

    const currentItem = menuItems.find((item) => currentPath === item.path);
    return currentItem ? currentItem.label : "Dashboard";
  };

  const handleNavClick = (path) => {
    navigate(path);
  };

  const isActiveRoute = (path) => {
    // Handle nested routes for users
    if (path === "/agent/users") {
      return location.pathname.startsWith("/agent/users");
    }
    // Handle nested routes for applications
    if (path === "/agent/applications") {
      return location.pathname.startsWith("/agent/applications");
    }
    // Handle nested routes for tickets
    if (path === "/agent/tickets") {
      return location.pathname.startsWith("/agent/tickets");
    }
    return location.pathname === path;
  };

  const renderPage = () => {
    return (
      <Routes>
        <Route path="dashboard" element={<AgentDashboardHome />} />
        <Route path="users" element={<UsersIndex />} />
        <Route path="users/:userId" element={<UserDetails />} />
        <Route path="users/:userId/edit" element={<ProfileCompletion />} />
        <Route path="users/create" element={<ProfileCompletion />} />
        <Route path="applications" element={<Applications />} />
        <Route
          path="applications/:applicationId"
          element={<ApplicationDetails />}
        />
        <Route
          path="applications/:applicationId/edit"
          element={<CreateApplication />}
        />
        <Route path="applications/create" element={<CreateApplication />} />
        <Route path="tickets" element={<Tickets />} />
        <Route path="tickets/create" element={<CreateTicket />} />
        <Route path="tickets/:ticketId" element={<TicketDetails />} />
        <Route path="*" element={<AgentDashboardHome />} />
      </Routes>
    );
  };

  return (
    <div className={styles["dashboard-layout"]}>
      <div className={styles["sidebar"]}>
        <div className={styles["sidebar-header"]}>
          <div className={styles["logo"]}>
            <GraduationCap className={styles["logo-icon"]} size={24} />
            <span className={styles["logo-text"]}>EduniGo Agent</span>
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
            <div className={styles["user-info"]}>
              <div className={styles["user-avatar"]}>AG</div>
              <span className={styles["user-name"]}>Agent Dashboard</span>
            </div>
          </div>
        </div>

        <div className={styles["content-area"]}>{renderPage()}</div>
      </div>
    </div>
  );
};

export default AgentDashboard;
