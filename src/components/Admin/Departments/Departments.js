import React, { useState, useEffect, useMemo } from "react";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Building2,
  ChevronRight,
  FolderPlus,
} from "lucide-react";
import {
  getDepartments,
  buildDepartmentTree,
  addDepartment,
  updateDepartment,
  removeDepartment,
} from "../../../config/departments";
import { getAdminDirectory } from "../../../config/adminHierarchy";
import CreateDepartmentModal from "./CreateDepartmentModal";
import EditDepartmentModal from "./EditDepartmentModal";
import DeleteConfirmationModal from "../Admins/DeleteConfirmationModal";
import styles from "./Departments.module.css";

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [tree, setTree] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedIds, setExpandedIds] = useState(new Set());
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createParentId, setCreateParentId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const load = () => {
    const flat = getDepartments();
    setDepartments(flat);
    setTree(buildDepartmentTree(flat));
  };

  useEffect(() => {
    setTimeout(load, 300);
    setLoading(false);
  }, []);

  const filteredTree = useMemo(() => {
    if (!searchTerm.trim()) return tree;
    const term = searchTerm.toLowerCase();
    const match = (node) =>
      node.name.toLowerCase().includes(term) ||
      (node.children && node.children.some(match));
    const filterNode = (node) => {
      const childrenFiltered = node.children
        ? node.children.map(filterNode).filter(Boolean)
        : [];
      if (node.name.toLowerCase().includes(term) || childrenFiltered.length > 0) {
        return { ...node, children: childrenFiltered };
      }
      return null;
    };
    return tree.map(filterNode).filter(Boolean);
  }, [tree, searchTerm]);

  const toggleExpand = (id) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleCreateRoot = () => {
    setCreateParentId(null);
    setShowCreateModal(true);
  };

  const handleCreateChild = (parentId) => {
    setCreateParentId(parentId);
    setShowCreateModal(true);
  };

  const handleCreateSubmit = (data) => {
    addDepartment({ name: data.name, parentId: data.parentId ?? createParentId ?? null });
    load();
    setShowCreateModal(false);
    setCreateParentId(null);
  };

  const handleEditSubmit = (data) => {
    if (!selectedDepartment) return;
    updateDepartment(selectedDepartment.id, {
      name: data.name,
      parentId: data.parentId !== undefined ? data.parentId : selectedDepartment.parentId,
    });
    load();
    setShowEditModal(false);
    setSelectedDepartment(null);
  };

  const handleDeleteConfirm = () => {
    if (!selectedDepartment) return;
    const result = removeDepartment(selectedDepartment.id);
    if (result) {
      load();
      setShowDeleteModal(false);
      setSelectedDepartment(null);
    }
  };

  const adminsByDepartment = useMemo(() => {
    const dir = getAdminDirectory();
    return dir.reduce((acc, admin) => {
      const id = admin.departmentId || "director";
      if (!acc[id]) acc[id] = 0;
      acc[id] += 1;
      return acc;
    }, {});
  }, [departments]);

  const hasChildren = (node) => node.children && node.children.length > 0;
  const canDelete = (node) => !hasChildren(node);

  const renderNode = (node, depth = 0) => {
    const isExpanded = expandedIds.has(node.id);
    const hasKids = hasChildren(node);
    return (
      <li key={node.id} className={styles["tree-node"]}>
        <div
          className={styles["tree-row"]}
          style={{ paddingLeft: 12 + depth * 24 }}
          data-expanded={isExpanded}
        >
          <span
            className={`${styles["toggle-icon"]} ${!hasKids ? styles["empty"] : ""}`}
            onClick={() => hasKids && toggleExpand(node.id)}
            aria-hidden
          >
            <ChevronRight
              size={18}
              className={hasKids && isExpanded ? styles["expanded"] : ""}
              style={hasKids && isExpanded ? { transform: "rotate(90deg)" } : {}}
            />
          </span>
          <div className={styles["tree-label"]}>
            <div className={styles["tree-icon"]}>
              <Building2 size={16} />
            </div>
            <span className={styles["tree-name"]}>{node.name}</span>
            {adminsByDepartment[node.id] != null && (
              <span className={styles["tree-count"]}>
                ({adminsByDepartment[node.id]} admin{adminsByDepartment[node.id] !== 1 ? "s" : ""})
              </span>
            )}
          </div>
          <div className={styles["action-buttons"]}>
            <button
              type="button"
              className={styles["add-child-btn"]}
              onClick={() => handleCreateChild(node.id)}
              title="Add sub-department"
            >
              <FolderPlus size={16} />
            </button>
            <button
              type="button"
              className={styles["edit-btn"]}
              onClick={() => {
                setSelectedDepartment(node);
                setShowEditModal(true);
              }}
              title="Edit department"
            >
              <Edit2 size={16} />
            </button>
            <button
              type="button"
              className={styles["delete-btn"]}
              onClick={() => {
                setSelectedDepartment(node);
                setShowDeleteModal(true);
              }}
              disabled={!canDelete(node)}
              title={canDelete(node) ? "Delete department" : "Remove sub-departments first"}
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
        {hasKids && isExpanded && (
          <ul className={styles["tree-children"]}>
            {node.children.map((child) => renderNode(child, depth + 1))}
          </ul>
        )}
      </li>
    );
  };

  if (loading) {
    return (
      <div className={styles["loading-container"]}>
        <div className={styles["loading-spinner"]} />
        <p>Loading departments...</p>
      </div>
    );
  }

  return (
    <div className={styles["departments-container"]}>
      <div className={styles["page-header"]}>
        <div className={styles["header-left"]}>
          <div className={styles["page-icon"]}>
            <Building2 size={24} />
          </div>
          <div>
            <h1>Departments</h1>
            <p>Organizational tree for grouping admins and defining reporting lines</p>
          </div>
        </div>
        <button
          type="button"
          className={styles["create-btn"]}
          onClick={handleCreateRoot}
        >
          <Plus size={18} />
          Add root department
        </button>
      </div>

      <div className={styles["controls-section"]}>
        <div className={styles["search-container"]}>
          <Search size={18} className={styles["search-icon"]} />
          <input
            type="text"
            placeholder="Search departments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles["search-input"]}
          />
        </div>
      </div>

      <div className={styles["tree-container"]}>
        {filteredTree.length === 0 ? (
          <div className={styles["empty-state"]}>
            <Building2 size={48} className={styles["empty-icon"]} />
            <h3>No departments found</h3>
            <p>
              {searchTerm
                ? "No departments match your search"
                : "Add a root department to get started"}
            </p>
            {!searchTerm && (
              <button
                type="button"
                className={styles["create-btn"]}
                onClick={handleCreateRoot}
                style={{ marginTop: 16 }}
              >
                <Plus size={18} />
                Add root department
              </button>
            )}
          </div>
        ) : (
          <ul className={styles["tree-list"]}>
            {filteredTree.map((node) => renderNode(node))}
          </ul>
        )}
      </div>

      {showCreateModal && (
        <CreateDepartmentModal
          key={`create-${createParentId ?? "root"}`}
          parentId={createParentId}
          onClose={() => {
            setShowCreateModal(false);
            setCreateParentId(null);
          }}
          onSubmit={handleCreateSubmit}
        />
      )}

      {showEditModal && selectedDepartment && (
        <EditDepartmentModal
          department={selectedDepartment}
          onClose={() => {
            setShowEditModal(false);
            setSelectedDepartment(null);
          }}
          onSubmit={handleEditSubmit}
        />
      )}

      {showDeleteModal && selectedDepartment && (
        <DeleteConfirmationModal
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedDepartment(null);
          }}
          onConfirm={handleDeleteConfirm}
          itemName={selectedDepartment.name}
          itemType="Department"
        />
      )}
    </div>
  );
};

export default Departments;
