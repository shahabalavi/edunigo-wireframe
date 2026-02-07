import React, { useState, useEffect, useMemo } from "react";
import { GraduationCap, Loader2, AlertCircle } from "lucide-react";
import { getMockCourses, isMockUrl } from "../../../api/mockCourses";
import styles from "./DynamicCourseListWidget.module.css";

const buildQueryString = (config) => {
  const params = new URLSearchParams();
  if (config.sortBy) params.set("sort", config.sortBy);
  if (config.university) params.set("university", config.university);
  if (config.country) params.set("country", config.country);
  if (config.category) params.set("category", config.category);
  if (config.limit) params.set("limit", String(config.limit));
  const qs = params.toString();
  return qs ? `?${qs}` : "";
};

const DynamicCourseListWidget = ({ config = {}, isRtl = false }) => {
  const {
    title = "Featured Programs",
    description = "Explore programs that match your goals.",
    apiEndpointUrl = "",
    sortBy = "newest",
    university = "",
    country = "",
    category = "",
    limit = 8,
  } = config;

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Use mock when URL is empty or explicitly "mock" / "/api/mock/courses" so list is never empty by default
  const useMock = useMemo(
    () => !apiEndpointUrl || typeof apiEndpointUrl !== "string" || isMockUrl(apiEndpointUrl),
    [apiEndpointUrl]
  );
  const fetchUrl = useMemo(() => {
    if (useMock) return "mock";
    const base = (apiEndpointUrl || "").replace(/\?.*$/, "");
    if (!base.trim()) return null;
    const qs = buildQueryString({ sortBy, university, country, category, limit });
    return `${base}${qs}`;
  }, [apiEndpointUrl, useMock, sortBy, university, country, category, limit]);

  useEffect(() => {
    if (useMock) {
      let cancelled = false;
      setLoading(true);
      setError(null);
      getMockCourses({ sortBy, university, country, category, limit })
        .then((list) => {
          if (!cancelled) setCourses(Array.isArray(list) ? list : []);
        })
        .catch((err) => {
          if (!cancelled) setError(err.message || "Failed to load courses");
        })
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
      return () => { cancelled = true; };
    }

    if (!fetchUrl) {
      setCourses([]);
      setError(null);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetch(fetchUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`API returned ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        const list = Array.isArray(data) ? data : (data?.data ?? data?.courses ?? data?.results ?? []);
        setCourses(Array.isArray(list) ? list : []);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || "Failed to load courses");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [fetchUrl, useMock, sortBy, university, country, category, limit]);

  const displayCourses = useMock ? courses : courses.slice(0, Number(limit) || 8);
  const hasSource = useMock || apiEndpointUrl;

  return (
    <section className={`${styles.section} ${isRtl ? styles.rtl : ""}`}>
      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        {description && <p className={styles.subtitle}>{description}</p>}

        {!hasSource && (
          <div className={styles.placeholder}>
            <GraduationCap size={40} className={styles.placeholderIcon} />
            <p>Configure the Courses API URL in the page builder to show courses here.</p>
          </div>
        )}

        {hasSource && loading && (
          <div className={styles.loading}>
            <Loader2 size={32} className={styles.spinner} />
            <p>Loading courses…</p>
          </div>
        )}

        {hasSource && error && !loading && (
          <div className={styles.error}>
            <AlertCircle size={24} />
            <p>{error}</p>
          </div>
        )}

        {hasSource && !loading && !error && displayCourses.length === 0 && (
          <div className={styles.empty}>
            <p>No courses match the current filters.</p>
          </div>
        )}

        {hasSource && !loading && !error && displayCourses.length > 0 && (
          <div className={styles.grid}>
            {displayCourses.map((course, index) => (
              <div key={course.id ?? course._id ?? index} className={styles.card}>
                <h3 className={styles.cardTitle}>
                  {course.name ?? course.title ?? course.programName ?? "Program"}
                </h3>
                {(course.universityName ?? course.university ?? course.institution) && (
                  <p className={styles.cardMeta}>
                    {course.universityName ?? course.university ?? course.institution}
                  </p>
                )}
                {(course.country ?? course.countryName) && (
                  <p className={styles.cardMeta}>{course.country ?? course.countryName}</p>
                )}
                {(course.fieldOfStudy ?? course.category ?? course.discipline) && (
                  <p className={styles.cardCategory}>
                    {course.fieldOfStudy ?? course.category ?? course.discipline}
                  </p>
                )}
                {(course.tuition ?? course.fee ?? course.price) != null && (
                  <p className={styles.cardFee}>
                    {typeof (course.tuition ?? course.fee ?? course.price) === "number"
                      ? Number(course.tuition ?? course.fee ?? course.price) === 0
                        ? "Free / No tuition"
                        : `From $${(course.tuition ?? course.fee ?? course.price).toLocaleString()}`
                      : String(course.tuition ?? course.fee ?? course.price)}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default DynamicCourseListWidget;
