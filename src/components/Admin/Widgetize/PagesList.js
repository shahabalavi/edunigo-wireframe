import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Edit2,
  Copy,
  Trash2,
  ExternalLink,
  Globe,
  Layout,
} from "lucide-react";
import { usePages } from "../../../context/PagesContext";
import DeleteConfirmationModal from "../Tickets/DeleteConfirmationModal";
import styles from "./PagesList.module.css";

const PagesList = () => {
  const navigate = useNavigate();
  const { pages, createPage, deletePage, duplicatePage } = usePages();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [pageToDelete, setPageToDelete] = useState(null);

  const handleCreate = () => {
    const id = createPage({ title: "New Page", slug: "" });
    navigate(`/admin/widgetize/pages/builder/${id}`);
  };

  const handleEdit = (page) => {
    navigate(`/admin/widgetize/pages/builder/${page.id}`);
  };

  const handleDuplicate = (page) => {
    const newId = duplicatePage(page.id);
    if (newId) navigate(`/admin/widgetize/pages/builder/${newId}`);
  };

  const handleDeleteClick = (page) => {
    setPageToDelete(page);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    if (pageToDelete) {
      deletePage(pageToDelete.id);
      setPageToDelete(null);
      setShowDeleteModal(false);
    }
  };

  const handleViewLive = (page) => {
    window.open(`/pages/${page.slug}`, "_blank");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1 className={styles.title}>Pages</h1>
        <p className={styles.subtitle}>
          Build and manage dynamic pages with widgets. Any page can be created and published.
        </p>
        <button type="button" className={styles.createBtn} onClick={handleCreate}>
          <Plus size={20} />
          Add Page
        </button>
      </div>

      {pages.length === 0 ? (
        <div className={styles.empty}>
          <Globe size={48} className={styles.emptyIcon} />
          <h2>No pages yet</h2>
          <p>Create your first page and add widgets (Hero, Countries, FAQ, etc.).</p>
          <button type="button" className={styles.createBtn} onClick={handleCreate}>
            <Plus size={20} />
            Create Page
          </button>
        </div>
      ) : (
        <div className={styles.grid}>
          {pages.map((page) => (
            <div key={page.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>{page.title}</h3>
                <span className={styles.slug}>/pages/{page.slug}</span>
              </div>
              <div className={styles.meta}>
                <span className={styles.layout}>
                  <Layout size={14} />
                  {page.layout === "rtl" ? "RTL" : "LTR"}
                </span>
                <span className={styles.widgetCount}>
                  {page.widgets?.length ?? 0} widget(s)
                </span>
              </div>
              <div className={styles.actions}>
                <button
                  type="button"
                  className={styles.btnPrimary}
                  onClick={() => handleEdit(page)}
                  title="Edit page"
                >
                  <Edit2 size={16} />
                  Edit
                </button>
                <button
                  type="button"
                  className={styles.btnSecondary}
                  onClick={() => handleViewLive(page)}
                  title="View live"
                >
                  <ExternalLink size={16} />
                  View
                </button>
                <button
                  type="button"
                  className={styles.btnSecondary}
                  onClick={() => handleDuplicate(page)}
                  title="Duplicate page"
                >
                  <Copy size={16} />
                  Duplicate
                </button>
                <button
                  type="button"
                  className={styles.btnDanger}
                  onClick={() => handleDeleteClick(page)}
                  title="Delete page"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showDeleteModal && (
        <DeleteConfirmationModal
          onClose={() => {
            setShowDeleteModal(false);
            setPageToDelete(null);
          }}
          onConfirm={handleDeleteConfirm}
          itemName={pageToDelete?.title ?? "this page"}
          itemType="Page"
        />
      )}
    </div>
  );
};

export default PagesList;
