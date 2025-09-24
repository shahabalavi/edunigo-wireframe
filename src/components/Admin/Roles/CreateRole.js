import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  Search,
  Filter,
  Check,
  X,
  Users,
  Shield,
  Key,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import styles from "./CreateRole.module.css";

const CreateRole = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    permissions: [],
  });
  const [permissions, setPermissions] = useState([]);
  const [filteredPermissions, setFilteredPermissions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [expandedCategories, setExpandedCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Sample permissions data - replace with actual API call
  useEffect(() => {
    const fetchPermissions = async () => {
      // Simulate API call delay
      setTimeout(() => {
        const samplePermissions = [
          {
            id: 1,
            name: "manage_users",
            title: "Manage Users",
            category: "Users",
            description: "Create, edit, and delete user accounts",
            status: "active",
          },
          {
            id: 2,
            name: "view_users",
            title: "View Users",
            category: "Users",
            description: "View user profiles and information",
            status: "active",
          },
          {
            id: 3,
            name: "manage_admins",
            title: "Manage Admins",
            category: "Administration",
            description: "Create, edit, and delete admin accounts",
            status: "active",
          },
          {
            id: 4,
            name: "manage_roles",
            title: "Manage Roles",
            category: "Administration",
            description: "Create, edit, and assign roles to users",
            status: "active",
          },
          {
            id: 5,
            name: "manage_permissions",
            title: "Manage Permissions",
            category: "Administration",
            description: "Create, edit, and configure system permissions",
            status: "active",
          },
          {
            id: 6,
            name: "manage_universities",
            title: "Manage Universities",
            category: "Content",
            description: "Add, edit, and remove university information",
            status: "active",
          },
          {
            id: 7,
            name: "manage_courses",
            title: "Manage Courses",
            category: "Content",
            description: "Add, edit, and remove course information",
            status: "active",
          },
          {
            id: 8,
            name: "manage_countries",
            title: "Manage Countries",
            category: "Content",
            description: "Add, edit, and remove country information",
            status: "active",
          },
          {
            id: 9,
            name: "view_analytics",
            title: "View Analytics",
            category: "Reports",
            description: "Access system analytics and reports",
            status: "active",
          },
          {
            id: 10,
            name: "manage_settings",
            title: "Manage Settings",
            category: "System",
            description: "Configure system-wide settings",
            status: "active",
          },
        ];

        setPermissions(samplePermissions);
        setFilteredPermissions(samplePermissions);
        setLoading(false);
      }, 1000);
    };

    fetchPermissions();
  }, []);

  // Filter and search functionality
  useEffect(() => {
    let filtered = permissions;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (permission) =>
          permission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          permission.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          permission.category
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          permission.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (filterBy !== "all") {
      filtered = filtered.filter(
        (permission) => permission.status === filterBy
      );
    }

    setFilteredPermissions(filtered);
  }, [searchTerm, filterBy, permissions]);

  // Group permissions by category
  const groupedPermissions = filteredPermissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    acc[permission.category].push(permission);
    return acc;
  }, {});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePermissionToggle = (permission) => {
    setFormData((prev) => {
      const isSelected = prev.permissions.some((p) => p.id === permission.id);
      if (isSelected) {
        return {
          ...prev,
          permissions: prev.permissions.filter((p) => p.id !== permission.id),
        };
      } else {
        return {
          ...prev,
          permissions: [...prev.permissions, permission],
        };
      }
    });
  };

  const handleCategoryToggle = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleSelectAllInCategory = (category) => {
    const categoryPermissions = groupedPermissions[category];
    const allSelected = categoryPermissions.every((permission) =>
      formData.permissions.some((p) => p.id === permission.id)
    );

    setFormData((prev) => {
      if (allSelected) {
        // Remove all permissions from this category
        return {
          ...prev,
          permissions: prev.permissions.filter(
            (p) => !categoryPermissions.some((cp) => cp.id === p.id)
          ),
        };
      } else {
        // Add all permissions from this category
        const newPermissions = categoryPermissions.filter(
          (permission) => !prev.permissions.some((p) => p.id === permission.id)
        );
        return {
          ...prev,
          permissions: [...prev.permissions, ...newPermissions],
        };
      }
    });
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      alert("Please enter a role name");
      return;
    }

    if (formData.permissions.length === 0) {
      alert("Please select at least one permission");
      return;
    }

    setSaving(true);
    // Simulate API call
    setTimeout(() => {
      console.log("Creating role:", formData);
      setSaving(false);
      navigate("/admin/roles");
    }, 2000);
  };

  const isPermissionSelected = (permission) => {
    return formData.permissions.some((p) => p.id === permission.id);
  };

  const isCategoryFullySelected = (category) => {
    const categoryPermissions = groupedPermissions[category];
    return categoryPermissions.every((permission) =>
      isPermissionSelected(permission)
    );
  };

  const isCategoryPartiallySelected = (category) => {
    const categoryPermissions = groupedPermissions[category];
    const selectedCount = categoryPermissions.filter((permission) =>
      isPermissionSelected(permission)
    ).length;
    return selectedCount > 0 && selectedCount < categoryPermissions.length;
  };

  if (loading) {
    return (
      <div className={styles["loading-container"]}>
        <div className={styles["loading-spinner"]}></div>
        <p>Loading permissions...</p>
      </div>
    );
  }

  return (
    <div className={styles["create-role-container"]}>
      {/* Page Header */}
      <div className={styles["page-header"]}>
        <div className={styles["header-left"]}>
          <button
            className={styles["back-btn"]}
            onClick={() => navigate("/admin/roles")}
          >
            <ArrowLeft size={20} />
          </button>
          <div className={styles["page-icon"]}>
            <Users size={24} />
          </div>
          <div>
            <h1>Create New Role</h1>
            <p>Define a new role and assign permissions</p>
          </div>
        </div>
        <button
          className={styles["save-btn"]}
          onClick={handleSave}
          disabled={saving}
        >
          <Save size={20} />
          {saving ? "Creating..." : "Create Role"}
        </button>
      </div>

      <div className={styles["content-layout"]}>
        {/* Role Details Form */}
        <div className={styles["role-details-section"]}>
          <div className={styles["section-header"]}>
            <h2>Role Details</h2>
            <p>Basic information about the role</p>
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="name" className={styles["form-label"]}>
              Role Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={styles["form-input"]}
              placeholder="Enter role name (e.g., Content Manager)"
              required
            />
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="description" className={styles["form-label"]}>
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className={styles["form-textarea"]}
              placeholder="Describe what this role is for..."
              rows={4}
            />
          </div>

          <div className={styles["selected-permissions-summary"]}>
            <div className={styles["summary-header"]}>
              <Shield size={16} />
              <span>Selected Permissions</span>
              <span className={styles["count-badge"]}>
                {formData.permissions.length}
              </span>
            </div>
            {formData.permissions.length > 0 ? (
              <div className={styles["permissions-list"]}>
                {formData.permissions.map((permission) => (
                  <div
                    key={permission.id}
                    className={styles["permission-item"]}
                  >
                    <Key size={12} />
                    <span>{permission.title}</span>
                    <button
                      className={styles["remove-btn"]}
                      onClick={() => handlePermissionToggle(permission)}
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className={styles["no-permissions"]}>
                No permissions selected yet
              </p>
            )}
          </div>
        </div>

        {/* Permissions Selection */}
        <div className={styles["permissions-section"]}>
          <div className={styles["section-header"]}>
            <h2>Select Permissions</h2>
            <p>Choose the permissions for this role</p>
          </div>

          {/* Search and Filter Controls */}
          <div className={styles["controls-section"]}>
            <div className={styles["search-container"]}>
              <Search className={styles["search-icon"]} size={20} />
              <input
                type="text"
                placeholder="Search permissions..."
                className={styles["search-input"]}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className={styles["filter-container"]}>
              <Filter className={styles["filter-icon"]} size={20} />
              <select
                className={styles["filter-select"]}
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Permissions by Category */}
          <div className={styles["permissions-container"]}>
            {Object.entries(groupedPermissions).map(
              ([category, categoryPermissions]) => (
                <div key={category} className={styles["category-group"]}>
                  <div
                    className={styles["category-header"]}
                    onClick={() => handleCategoryToggle(category)}
                  >
                    <div className={styles["category-info"]}>
                      {expandedCategories[category] ? (
                        <ChevronDown size={16} />
                      ) : (
                        <ChevronRight size={16} />
                      )}
                      <span className={styles["category-name"]}>
                        {category}
                      </span>
                      <span className={styles["category-count"]}>
                        {categoryPermissions.length} permissions
                      </span>
                    </div>
                    <button
                      className={`${styles["select-all-btn"]} ${
                        isCategoryFullySelected(category)
                          ? styles["selected"]
                          : isCategoryPartiallySelected(category)
                          ? styles["partial"]
                          : ""
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectAllInCategory(category);
                      }}
                    >
                      <Check size={14} />
                      Select All
                    </button>
                  </div>

                  {expandedCategories[category] && (
                    <div className={styles["permissions-list"]}>
                      {categoryPermissions.map((permission) => (
                        <div
                          key={permission.id}
                          className={`${styles["permission-item"]} ${
                            isPermissionSelected(permission)
                              ? styles["selected"]
                              : ""
                          }`}
                          onClick={() => handlePermissionToggle(permission)}
                        >
                          <div className={styles["permission-checkbox"]}>
                            {isPermissionSelected(permission) && (
                              <Check size={12} />
                            )}
                          </div>
                          <div className={styles["permission-content"]}>
                            <div className={styles["permission-title"]}>
                              {permission.title}
                            </div>
                            <div className={styles["permission-description"]}>
                              {permission.description}
                            </div>
                            <div className={styles["permission-name"]}>
                              {permission.name}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRole;
