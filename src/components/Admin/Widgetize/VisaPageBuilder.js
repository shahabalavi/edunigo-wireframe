import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import {
  ArrowLeft,
  Plus,
  GripVertical,
  Edit2,
  Copy,
  Trash2,
  ExternalLink,
  Layout,
  X,
} from "lucide-react";
import { useVisaPages } from "../../../context/VisaPagesContext";
import { WIDGET_REGISTRY, getWidgetDefinition } from "../../../config/visaWidgets";
import WidgetConfigForm from "./WidgetConfigForm";
import styles from "./VisaPageBuilder.module.css";

const VisaPageBuilder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Admin uses pathname-based routing (no :pageId route), so extract pageId from URL
  const pathMatch = location.pathname.match(/\/admin\/widgetize\/visa-pages\/builder\/([^/]+)/);
  const pageId = pathMatch ? pathMatch[1] : null;
  const {
    getPageById,
    updatePage,
    addWidget,
    updateWidget,
    removeWidget,
    reorderWidgets,
    duplicateWidget,
  } = useVisaPages();

  const page = getPageById(pageId);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingWidget, setEditingWidget] = useState(null);
  const [localTitle, setLocalTitle] = useState("");
  const [localSlug, setLocalSlug] = useState("");
  const [localLayout, setLocalLayout] = useState("ltr");

  useEffect(() => {
    if (page) {
      setLocalTitle(page.title || "");
      setLocalSlug(page.slug || "");
      setLocalLayout(page.layout || "ltr");
    }
  }, [page]);

  const handleSavePageMeta = () => {
    if (!pageId) return;
    updatePage(pageId, {
      title: localTitle,
      slug: localSlug,
      layout: localLayout,
    });
  };

  const handleAddWidget = (widgetType) => {
    addWidget(pageId, widgetType);
    setShowAddModal(false);
  };

  const handleEditWidget = (widget) => {
    setEditingWidget(widget);
  };

  const handleSaveWidgetConfig = (widgetId, config) => {
    updateWidget(pageId, widgetId, { config });
    setEditingWidget(null);
  };

  const handleDuplicateWidget = (widgetId) => {
    duplicateWidget(pageId, widgetId);
  };

  const handleRemoveWidget = (widgetId) => {
    removeWidget(pageId, widgetId);
  };

  const onDragEnd = (result) => {
    if (!result.destination || !page?.widgets) return;
    const ids = page.widgets.map((w) => w.id);
    const [removed] = ids.splice(result.source.index, 1);
    ids.splice(result.destination.index, 0, removed);
    reorderWidgets(pageId, ids);
  };

  if (!page) {
    return (
      <div className={styles.wrapper}>
        <p>Page not found.</p>
        <button type="button" onClick={() => navigate("/admin/widgetize/visa-pages")}>
          Back to Visa Pages
        </button>
      </div>
    );
  }

  const sortedWidgets = [...(page.widgets || [])].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0)
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.toolbar}>
        <button
          type="button"
          className={styles.backBtn}
          onClick={() => navigate("/admin/widgetize/visa-pages")}
        >
          <ArrowLeft size={18} />
          Back to Visa Pages
        </button>
        <button
          type="button"
          className={styles.viewLiveBtn}
          onClick={() => window.open(`/visa/${page.slug}`, "_blank")}
        >
          <ExternalLink size={16} />
          View Live
        </button>
      </div>

      <div className={styles.pageMeta}>
        <div className={styles.metaRow}>
          <label className={styles.label}>Page title</label>
          <input
            type="text"
            className={styles.input}
            value={localTitle}
            onChange={(e) => setLocalTitle(e.target.value)}
            onBlur={handleSavePageMeta}
            placeholder="e.g. Canada Student Visa"
          />
        </div>
        <div className={styles.metaRow}>
          <label className={styles.label}>URL slug</label>
          <input
            type="text"
            className={styles.input}
            value={localSlug}
            onChange={(e) => setLocalSlug(e.target.value)}
            onBlur={handleSavePageMeta}
            placeholder="e.g. canada-student-visa"
          />
          <span className={styles.slugHint}>/visa/{localSlug || "..."}</span>
        </div>
        <div className={styles.metaRow}>
          <label className={styles.label}>Layout</label>
          <div className={styles.layoutToggle}>
            <button
              type="button"
              className={localLayout === "ltr" ? styles.layoutActive : styles.layoutBtn}
              onClick={() => {
                setLocalLayout("ltr");
                updatePage(pageId, { layout: "ltr" });
              }}
            >
              <Layout size={16} />
              LTR
            </button>
            <button
              type="button"
              className={localLayout === "rtl" ? styles.layoutActive : styles.layoutBtn}
              onClick={() => {
                setLocalLayout("rtl");
                updatePage(pageId, { layout: "rtl" });
              }}
            >
              <Layout size={16} />
              RTL
            </button>
          </div>
        </div>
      </div>

      <div className={styles.canvasSection}>
        <div className={styles.canvasHeader}>
          <h2 className={styles.canvasTitle}>Widgets</h2>
          <button
            type="button"
            className={styles.addWidgetBtn}
            onClick={() => setShowAddModal(true)}
          >
            <Plus size={18} />
            Add Widget
          </button>
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="widget-list">
            {(provided) => (
              <div
                className={styles.widgetList}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {sortedWidgets.length === 0 ? (
                  <div className={styles.emptyCanvas}>
                    <p>No widgets yet. Click &quot;Add Widget&quot; to add sections.</p>
                    <button
                      type="button"
                      className={styles.addWidgetBtn}
                      onClick={() => setShowAddModal(true)}
                    >
                      <Plus size={18} />
                      Add Widget
                    </button>
                  </div>
                ) : (
                  sortedWidgets.map((widget, index) => {
                    const def = getWidgetDefinition(widget.type);
                    return (
                      <Draggable
                        key={widget.id}
                        draggableId={widget.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`${styles.widgetCard} ${snapshot.isDragging ? styles.dragging : ""}`}
                          >
                            <div
                              className={styles.dragHandle}
                              {...provided.dragHandleProps}
                              aria-label="Drag to reorder"
                            >
                              <GripVertical size={18} />
                            </div>
                            <div className={styles.widgetInfo}>
                              <span className={styles.widgetLabel}>
                                {def?.label ?? widget.type}
                              </span>
                              <span className={styles.widgetType}>{widget.type}</span>
                            </div>
                            <div className={styles.widgetActions}>
                              <button
                                type="button"
                                className={styles.iconBtn}
                                onClick={() => handleEditWidget(widget)}
                                title="Edit"
                              >
                                <Edit2 size={16} />
                              </button>
                              <button
                                type="button"
                                className={styles.iconBtn}
                                onClick={() => handleDuplicateWidget(widget.id)}
                                title="Duplicate"
                              >
                                <Copy size={16} />
                              </button>
                              <button
                                type="button"
                                className={styles.iconBtnDanger}
                                onClick={() => handleRemoveWidget(widget.id)}
                                title="Remove"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    );
                  })
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      {showAddModal && (
        <div className={styles.modalOverlay} onClick={() => setShowAddModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Add Widget</h3>
              <button
                type="button"
                className={styles.closeBtn}
                onClick={() => setShowAddModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div className={styles.modalBody}>
              <p className={styles.modalHint}>Choose a widget type to add to this page.</p>
              <div className={styles.widgetPicker}>
                {WIDGET_REGISTRY.map((def) => (
                  <button
                    key={def.type}
                    type="button"
                    className={styles.pickerCard}
                    onClick={() => handleAddWidget(def.type)}
                  >
                    <span className={styles.pickerLabel}>{def.label}</span>
                    <span className={styles.pickerDesc}>{def.description}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {editingWidget && (
        <WidgetConfigForm
          widget={editingWidget}
          onSave={(config) => handleSaveWidgetConfig(editingWidget.id, config)}
          onClose={() => setEditingWidget(null)}
        />
      )}
    </div>
  );
};

export default VisaPageBuilder;
