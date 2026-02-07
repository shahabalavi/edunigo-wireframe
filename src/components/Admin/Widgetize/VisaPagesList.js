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
import { useVisaPages } from "../../../context/VisaPagesContext";
import DeleteConfirmationModal from "../Tickets/DeleteConfirmationModal";
import styles from "./VisaPagesList.module.css";

const VisaPagesList = () => {
  const navigate = useNavigate();
  const { pages, createPage, deletePage, duplicatePage } = useVisaPages();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [pageToDelete, setPageToDelete] = useState(null);

  const handleCreate = () => {
    const id = createPage({ title: "New Visa Page", slug: "" });
    navigate(`/admin/widgetize/visa-pages/builder/${id}`);
  };

  const handleEdit = (page) => {
    navigate(`/admin/widgetize/visa-pages/builder/${page.id}`);
  };

  const handleDuplicate = (page) => {
    const newId = duplicatePage(page.id);
    if (newId) navigate(`/admin/widgetize/visa-pages/builder/${newId}`);
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
    window.open(`/visa/${page.slug}`, "_blank");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1 className={styles.title}>Visa Landing Pages</h1>
        <p className={styles.subtitle}>
          Build and manage study abroad / student visa landing pages with widgets.
        </p>
        <button type="button" className={styles.createBtn} onClick={handleCreate}>
          <Plus size={20} />
          Add Page
        </button>
      </div>

      {pages.length === 0 ? (
        <div className={styles.empty}>
          <Globe size={48} className={styles.emptyIcon} />
          <h2>No visa pages yet</h2>
          <p>Create your first page and add widgets (Hero, Countries, FAQ, etc.).</p>
          <button type="button" className={styles.createBtn} onClick={handleCreate}>
            <Plus size={20} />
            Create Visa Page
          </button>
        </div>
      ) : (
        <div className={styles.grid}>
          {pages.map((page) => (
            <div key={page.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>{page.title}</h3>
                <span className={styles.slug}>/visa/{page.slug}</span>
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
          itemType="Visa Page"
        />
      )}
    </div>
  );
};

export default VisaPagesList;
