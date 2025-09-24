import React from "react";
import { User } from "lucide-react";
import GoCheckDataDisplay from "../../Shared/GoCheckDataDisplay";
import styles from "./DashboardHome.module.css";

const DashboardHome = () => {
  return (
    <div className={styles["dashboard-content"]}>
      <div className={styles["dashboard-header"]}>
        <div className={styles["header-content"]}>
          <h1>Welcome to your Dashboard</h1>
          <p>
            View your completed profile information and questionnaire results
          </p>
        </div>
      </div>

      {/* Profile Widget */}
      <div className={styles["profile-widget-container"]}>
        <div
          className={[styles["widget"], styles["profile-widget"]]
            .filter(Boolean)
            .join(" ")}
        >
          <div className={styles["widget-header"]}>
            <div className={styles["header-left"]}>
              <div className={styles["profile-icon"]}>
                <User size={24} />
              </div>
              <h3>Your Profile</h3>
            </div>
          </div>
          <div className={styles["widget-content"]}>
            <GoCheckDataDisplay />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
