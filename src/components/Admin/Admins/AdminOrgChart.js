import React from "react";
import { GitBranch, User } from "lucide-react";
import styles from "./AdminOrgChart.module.css";
import {
  buildAdminTree,
  getAdminDirectory,
  getAdminDisplayName,
} from "../../../config/adminHierarchy";

const AdminOrgChart = () => {
  const roots = buildAdminTree(getAdminDirectory());

  const renderNode = (node) => {
    return (
      <div key={node.id} className={styles["tree-node"]}>
        <div className={styles["node-card"]}>
          <div className={styles["node-icon"]}>
            <User size={18} />
          </div>
          <div>
            <div className={styles["node-name"]}>
              {getAdminDisplayName(node)}
            </div>
            <div className={styles["node-meta"]}>{node.email}</div>
            <div className={styles["node-roles"]}>
              {node.roles && node.roles.length
                ? node.roles.map((role) => role.name).join(" • ")
                : "No roles"}
            </div>
          </div>
        </div>
        {node.children && node.children.length > 0 ? (
          <div className={styles["node-children"]}>
            {node.children.map((child) => renderNode(child))}
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <div className={styles["org-chart-container"]}>
      <div className={styles["page-header"]}>
        <div className={styles["header-left"]}>
          <div className={styles["page-icon"]}>
            <GitBranch size={24} />
          </div>
          <div>
            <h1>Admin Org Chart</h1>
            <p>Top-down view of manager relationships for scope.team demos</p>
          </div>
        </div>
      </div>

      <div className={styles["tree-wrapper"]}>
        {roots.map((root) => renderNode(root))}
      </div>
    </div>
  );
};

export default AdminOrgChart;
