import React from "react";
import { Shield } from "lucide-react";
import styles from "../../User/Dashboard/DashboardHome.module.css";

const AdminDashboardHome = () => {
  return (
    <div className={styles["admin-dashboard-home"]}>
      <div className={styles["welcome-section"]}>
        <div className={styles["dashboard-icon"]}>
          <Shield size={48} />
        </div>
        <h1>Admin Dashboard</h1>
        <p>Administrative panel for managing the platform.</p>
        <div className={styles["status-indicator"]}>
          <span className={styles["status-dot"]}></span>
          <span>System Online</span>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
