import React, { useEffect, useMemo, useState } from "react";
import {
  Folder,
  FileText,
  Globe,
  BookOpen,
  HelpCircle,
  Plus,
  Search,
  Edit2,
  Trash2,
  GripVertical,
  ArrowUp,
  ArrowDown,
  Layers,
} from "lucide-react";
import DeleteConfirmationModal from "../Tickets/DeleteConfirmationModal";
import CategoryModal from "./CategoryModal";
import styles from "./GuidanceCategories.module.css";

const ICON_OPTIONS = [
  { value: "Folder", label: "Folder", icon: Folder },
  { value: "FileText", label: "Documents", icon: FileText },
  { value: "BookOpen", label: "Guides", icon: BookOpen },
  { value: "Globe", label: "Visa / Global", icon: Globe },
  { value: "HelpCircle", label: "General Help", icon: HelpCircle },
];

const GuidanceCategories = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [draggingId, setDraggingId] = useState(null);

  useEffect(() => {
    const sampleCategories = [
      {
        id: 1,
        title: "Documents",
        description: "Document uploads, translations, and verification.",
        icon: "FileText",
        displayOrder: 1,
        parentId: null,
      },
      {
        id: 2,
        title: "Payments",
        description: "Tuition, fees, and payment confirmations.",
        icon: "Folder",
        displayOrder: 2,
        parentId: null,
      },
      {
        id: 3,
        title: "Visa",
        description: "Immigration steps and embassy preparation.",
        icon: "Globe",
        displayOrder: 3,
        parentId: null,
      },
      {
        id: 4,
        title: "General",
        description: "Orientation and campus essentials.",
        icon: "HelpCircle",
        displayOrder: 4,
        parentId: null,
      },
      {
        id: 5,
        title: "Translations",
        description: "Certified translations and notarization tips.",
        icon: "BookOpen",
        displayOrder: 1,
        parentId: 1,
      },
      {
        id: 6,
        title: "Bank Transfers",
        description: "International wire transfer walkthroughs.",
        icon: "Folder",
        displayOrder: 1,
        parentId: 2,
      },
    ];

    setCategories(sampleCategories);
  }, []);

  const iconMap = useMemo(() => {
    return ICON_OPTIONS.reduce((acc, option) => {
      acc[option.value] = option.icon;
      return acc;
    }, {});
  }, []);

  const filteredCategories = useMemo(() => {
    if (!searchTerm) return categories;
    const term = searchTerm.toLowerCase();
    const idMap = new Map(categories.map((category) => [category.id, category]));
    const matched = categories.filter(
      (category) =>
        category.title.toLowerCase().includes(term) ||
        (category.description || "").toLowerCase().includes(term)
    );
    const matchedIds = new Set(matched.map((category) => category.id));

    matched.forEach((category) => {
      let parentId = category.parentId;
      while (parentId) {
        matchedIds.add(parentId);
        parentId = idMap.get(parentId)?.parentId;
      }
    });

    return categories.filter((category) => matchedIds.has(category.id));
  }, [categories, searchTerm]);

  const categoryOptions = useMemo(() => {
    const sorted = [...categories].sort((a, b) => {
      if (a.parentId !== b.parentId) return (a.parentId ?? 0) - (b.parentId ?? 0);
      return a.displayOrder - b.displayOrder;
    });

    return sorted
      .filter((category) => category.id !== selectedCategory?.id)
      .map((category) => ({
        value: category.id,
        label: category.parentId
          ? `↳ ${category.title}`
          : category.title,
      }));
  }, [categories, selectedCategory]);

  const getChildren = (parentId) => {
    return filteredCategories
      .filter((category) => category.parentId === parentId)
      .sort((a, b) => a.displayOrder - b.displayOrder);
  };

  const updateCategoryOrder = (dragId, targetId) => {
    const dragItem = categories.find((category) => category.id === dragId);
    const targetItem = categories.find((category) => category.id === targetId);

    if (!dragItem || !targetItem || dragItem.parentId !== targetItem.parentId) {
      return;
    }

    setCategories((prev) =>
      prev.map((category) => {
        if (category.id === dragId) {
          return { ...category, displayOrder: targetItem.displayOrder };
        }
        if (category.id === targetId) {
          return { ...category, displayOrder: dragItem.displayOrder };
        }
        return category;
      })
    );
  };

  const moveCategory = (categoryId, direction) => {
    const category = categories.find((item) => item.id === categoryId);
    if (!category) return;
    const siblings = categories
      .filter((item) => item.parentId === category.parentId)
      .sort((a, b) => a.displayOrder - b.displayOrder);
    const currentIndex = siblings.findIndex((item) => item.id === categoryId);
    const nextIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (nextIndex < 0 || nextIndex >= siblings.length) return;
    updateCategoryOrder(categoryId, siblings[nextIndex].id);
  };

  const handleCreateCategory = (data) => {
    const newId = categories.length
      ? Math.max(...categories.map((category) => category.id)) + 1
      : 1;
    const created = {
      id: newId,
      title: data.title,
      description: data.description,
      icon: data.icon,
      displayOrder: data.displayOrder,
      parentId: data.parentId,
    };
    setCategories((prev) => [...prev, created]);
    setShowCreateModal(false);
  };

  const handleEditCategory = (data) => {
    if (!selectedCategory) return;
    setCategories((prev) =>
      prev.map((category) =>
        category.id === selectedCategory.id
          ? { ...category, ...data }
          : category
      )
    );
    setShowEditModal(false);
    setSelectedCategory(null);
  };

  const handleDeleteCategory = () => {
    if (!selectedCategory) return;
    setCategories((prev) => {
      const idsToRemove = new Set([selectedCategory.id]);
      let added = true;
      while (added) {
        added = false;
        prev.forEach((category) => {
          if (category.parentId && idsToRemove.has(category.parentId)) {
            if (!idsToRemove.has(category.id)) {
              idsToRemove.add(category.id);
              added = true;
            }
          }
        });
      }
      return prev.filter((category) => !idsToRemove.has(category.id));
    });
    setShowDeleteModal(false);
    setSelectedCategory(null);
  };

  const openEditModal = (category) => {
    setSelectedCategory(category);
    setShowEditModal(true);
  };

  const openDeleteModal = (category) => {
    setSelectedCategory(category);
    setShowDeleteModal(true);
  };

  const handleDragStart = (categoryId) => {
    setDraggingId(categoryId);
  };

  const handleDrop = (categoryId) => {
    if (draggingId && draggingId !== categoryId) {
      updateCategoryOrder(draggingId, categoryId);
    }
    setDraggingId(null);
  };

  const renderRows = (parentId = null, level = 0) => {
    return getChildren(parentId).flatMap((category) => {
      const Icon = iconMap[category.icon] || Folder;
      const row = (
        <div
          key={category.id}
          className={`${styles["category-row"]} ${
            level > 0 ? styles["child-row"] : ""
          }`}
          draggable
          onDragStart={() => handleDragStart(category.id)}
          onDragOver={(event) => event.preventDefault()}
          onDrop={() => handleDrop(category.id)}
        >
          <div className={styles["drag-handle"]} title="Drag to reorder">
            <GripVertical size={16} />
          </div>
          <div className={`${styles["category-main"]} ${level > 0 ? styles["indent"] : ""}`}>
            <div className={styles["icon-chip"]}>
              <Icon size={18} />
            </div>
            <div>
              <div className={styles["category-title"]}>{category.title}</div>
              <div className={styles["category-subtitle"]}>
                {category.parentId ? "Subcategory" : "Top-level category"}
              </div>
            </div>
          </div>
          <div className={styles["description"]}>
            {category.description || "No description"}
          </div>
          <div className={styles["order-cell"]}>
            <button
              className={styles["reorder-btn"]}
              onClick={() => moveCategory(category.id, "up")}
              title="Move up"
            >
              <ArrowUp size={14} />
            </button>
            <button
              className={styles["reorder-btn"]}
              onClick={() => moveCategory(category.id, "down")}
              title="Move down"
            >
              <ArrowDown size={14} />
            </button>
            <span>{category.displayOrder}</span>
          </div>
          <div className={styles["actions"]}>
            <button
              className={styles["action-btn"]}
              onClick={() => openEditModal(category)}
            >
              <Edit2 size={14} />
              Edit
            </button>
            <button
              className={`${styles["action-btn"]} ${styles["delete-btn"]}`}
              onClick={() => openDeleteModal(category)}
            >
              <Trash2 size={14} />
              Delete
            </button>
          </div>
        </div>
      );

      return [row, ...renderRows(category.id, level + 1)];
    });
  };

  return (
    <div className={styles["guidance-container"]}>
      <div className={styles["page-header"]}>
        <div className={styles["header-left"]}>
          <div className={styles["page-icon"]}>
            <Layers size={22} />
          </div>
          <div>
            <h1>Guidance Categories</h1>
            <p>Organize the sidebar sections visible in the Guidance Library.</p>
          </div>
        </div>
        <button className={styles["create-btn"]} onClick={() => setShowCreateModal(true)}>
          <Plus size={18} />
          Add Category
        </button>
      </div>

      <div className={styles["controls-section"]}>
        <div className={styles["search-container"]}>
          <Search size={16} className={styles["search-icon"]} />
          <input
            className={styles["search-input"]}
            placeholder="Search categories"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
      </div>

      <div className={styles["hint-card"]}>
        Drag and drop categories within the same level to reorder. Subcategories appear indented in the
        user-facing sidebar.
      </div>

      <div className={styles["category-list"]}>
        <div className={styles["list-header"]}>
          <span>Order</span>
          <span>Category</span>
          <span>Description</span>
          <span>Display</span>
          <span>Actions</span>
        </div>

        {renderRows()}

        {filteredCategories.length === 0 && (
          <div className={styles["empty-state"]}>
            No categories found. Try adjusting your search or add a new category.
          </div>
        )}
      </div>

      {showCreateModal && (
        <CategoryModal
          mode="create"
          iconOptions={ICON_OPTIONS}
          categoryOptions={categoryOptions}
          onClose={() => setShowCreateModal(false)}
          onSave={handleCreateCategory}
        />
      )}

      {showEditModal && selectedCategory && (
        <CategoryModal
          mode="edit"
          initialData={selectedCategory}
          iconOptions={ICON_OPTIONS}
          categoryOptions={categoryOptions}
          onClose={() => {
            setShowEditModal(false);
            setSelectedCategory(null);
          }}
          onSave={handleEditCategory}
        />
      )}

      {showDeleteModal && selectedCategory && (
        <DeleteConfirmationModal
          itemType="Category"
          itemName={selectedCategory.title}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedCategory(null);
          }}
          onConfirm={handleDeleteCategory}
        />
      )}
    </div>
  );
};

export default GuidanceCategories;
