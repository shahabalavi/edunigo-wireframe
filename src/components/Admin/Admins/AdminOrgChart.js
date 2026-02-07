import React from "react";
import { GitBranch, User, Building2 } from "lucide-react";
import styles from "./AdminOrgChart.module.css";
import {
  getAdminDirectory,
  getAdminDisplayName,
  buildAdminTreeForDepartment,
} from "../../../config/adminHierarchy";
import {
  buildDepartmentTree,
  getDepartmentLabel,
} from "../../../config/departments";

const AdminOrgChart = () => {
  const directory = getAdminDirectory();
  const departmentTree = buildDepartmentTree();

  const renderAdminNode = (node) => (
    <div key={node.id} className={styles["tree-node"]}>
      <div className={styles["node-card"]}>
        <div className={styles["node-icon"]}>
          <User size={18} />
        </div>
        <div className={styles["node-body"]}>
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
          {node.children.map((child) => renderAdminNode(child))}
        </div>
      ) : null}
    </div>
  );

  const renderDepartmentSection = (deptNode, depth = 0) => {
    const adminRoots = buildAdminTreeForDepartment(directory, deptNode.id);
    const hasAdmins = adminRoots.length > 0;
    const hasChildDepts = deptNode.children && deptNode.children.length > 0;

    return (
      <div
        key={deptNode.id}
        className={styles["dept-section"]}
        style={{ marginLeft: depth > 0 ? 24 : 0 }}
      >
        <div className={styles["dept-header"]}>
          <Building2 size={20} className={styles["dept-icon"]} />
          <h2 className={styles["dept-title"]}>
            {getDepartmentLabel(deptNode.id)}
          </h2>
          {hasAdmins && (
            <span className={styles["dept-count"]}>
              {directory.filter((a) => (a.departmentId || "director") === deptNode.id).length} admin(s)
            </span>
          )}
        </div>
        {hasAdmins ? (
          <div className={styles["dept-tree"]}>
            {adminRoots.map((root) => renderAdminNode(root))}
          </div>
        ) : (
          <p className={styles["dept-empty"]}>No admins in this department</p>
        )}
        {hasChildDepts && (
          <div className={styles["dept-children"]}>
            {deptNode.children.map((child) =>
              renderDepartmentSection(child, depth + 1)
            )}
          </div>
        )}
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
            <p>
              By department tree: each section shows the reporting structure within that department
            </p>
          </div>
        </div>
      </div>

      <div className={styles["tree-wrapper"]}>
        {departmentTree.map((dept) => renderDepartmentSection(dept))}
      </div>
    </div>
  );
};

export default AdminOrgChart;
