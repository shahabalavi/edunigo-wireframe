import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePages } from "../../context/PagesContext";
import WidgetRenderer from "./WidgetRenderer";
import styles from "./WidgetizedLandingPage.module.css";

const WidgetizedLandingPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { getPageBySlug } = usePages();
  const page = getPageBySlug(slug);

  if (!page) {
    return (
      <div className={styles.wrapper}>
        <nav className={styles.navbar}>
          <div className={styles.navContainer}>
            <button type="button" className={styles.brand} onClick={() => navigate("/")}>
              EduniGo
            </button>
            <div className={styles.navMenu}>
              <button type="button" className={styles.navLink} onClick={() => navigate("/")}>
                Home
              </button>
              <button type="button" className={styles.navBtn} onClick={() => navigate("/gocheck")}>
                Get Started
              </button>
            </div>
          </div>
        </nav>
        <div className={styles.notFound}>
          <h1>Page not found</h1>
          <p>This page does not exist or has been removed.</p>
          <button type="button" className={styles.backBtn} onClick={() => navigate("/")}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const isRtl = page.layout === "rtl";
  const sortedWidgets = [...(page.widgets || [])].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0)
  );

  return (
    <div className={`${styles.wrapper} ${isRtl ? styles.rtl : ""}`} dir={isRtl ? "rtl" : "ltr"}>
      <nav className={styles.navbar}>
        <div className={styles.navContainer}>
          <button type="button" className={styles.brand} onClick={() => navigate("/")}>
            EduniGo
          </button>
          <div className={styles.navMenu}>
            <button type="button" className={styles.navLink} onClick={() => navigate("/")}>
              Home
            </button>
            <button type="button" className={styles.navLink} onClick={() => navigate("/pages")}>
              Pages
            </button>
            <button type="button" className={styles.navBtn} onClick={() => navigate("/gocheck")}>
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <main className={styles.main}>
        {sortedWidgets.length === 0 ? (
          <div className={styles.empty}>
            <p>This page has no widgets yet.</p>
            <p>Add sections in the admin Page Builder.</p>
          </div>
        ) : (
          sortedWidgets.map((w) => (
            <WidgetRenderer
              key={w.id}
              widgetType={w.type}
              config={w.config || {}}
              isRtl={isRtl}
            />
          ))
        )}
      </main>
    </div>
  );
};

export default WidgetizedLandingPage;
