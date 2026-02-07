import React, { createContext, useContext, useCallback, useMemo, useState, useEffect } from "react";
import { getDefaultConfig } from "../config/pageWidgets";

const STORAGE_KEY = "edunigo_pages";

const PagesContext = createContext(null);

const loadFromStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  return [];
};

const saveToStorage = (pages) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pages));
  } catch (_) {}
};

export function PagesProvider({ children }) {
  const [pages, setPages] = useState(loadFromStorage);

  useEffect(() => {
    saveToStorage(pages);
  }, [pages]);

  const getPageBySlug = useCallback(
    (slug) => pages.find((p) => p.slug === slug) || null,
    [pages]
  );

  const getPageById = useCallback(
    (id) => pages.find((p) => p.id === id) || null,
    [pages]
  );

  const createPage = useCallback((payload = {}) => {
    const id = `page_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    const title = payload.title || "New Page";
    const slug =
      payload.slug ||
      title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
    setPages((prev) => [
      ...prev,
      {
        id,
        title,
        slug,
        layout: payload.layout || "ltr",
        widgets: payload.widgets || [],
      },
    ]);
    return id;
  }, []);

  const updatePage = useCallback((id, updates) => {
    setPages((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  }, []);

  const deletePage = useCallback((id) => {
    setPages((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const duplicatePage = useCallback((id) => {
    const page = pages.find((p) => p.id === id);
    if (!page) return null;
    const newId = createPage({
      title: `${page.title} (Copy)`,
      slug: `${page.slug}-copy-${Date.now()}`,
      layout: page.layout,
      widgets: page.widgets.map((w) => ({
        ...w,
        id: `w_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
      })),
    });
    return newId;
  }, [pages, createPage]);

  const addWidget = useCallback((pageId, widgetType) => {
    const config = getDefaultConfig(widgetType);
    const widget = {
      id: `w_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
      type: widgetType,
      config: config || {},
      order: 0,
    };
    setPages((prev) =>
      prev.map((p) => {
        if (p.id !== pageId) return p;
        const maxOrder = Math.max(0, ...p.widgets.map((w) => w.order));
        widget.order = maxOrder + 1;
        return { ...p, widgets: [...p.widgets, widget] };
      })
    );
    return widget.id;
  }, []);

  const updateWidget = useCallback((pageId, widgetId, updates) => {
    setPages((prev) =>
      prev.map((p) => {
        if (p.id !== pageId) return p;
        return {
          ...p,
          widgets: p.widgets.map((w) =>
            w.id === widgetId ? { ...w, ...updates } : w
          ),
        };
      })
    );
  }, []);

  const removeWidget = useCallback((pageId, widgetId) => {
    setPages((prev) =>
      prev.map((p) =>
        p.id === pageId
          ? { ...p, widgets: p.widgets.filter((w) => w.id !== widgetId) }
          : p
      )
    );
  }, []);

  const reorderWidgets = useCallback((pageId, widgetIds) => {
    setPages((prev) =>
      prev.map((p) => {
        if (p.id !== pageId) return p;
        const byId = Object.fromEntries(p.widgets.map((w) => [w.id, w]));
        const ordered = widgetIds
          .map((id) => byId[id])
          .filter(Boolean)
          .map((w, i) => ({ ...w, order: i }));
        return { ...p, widgets: ordered };
      })
    );
  }, []);

  const duplicateWidget = useCallback((pageId, widgetId) => {
    const page = pages.find((p) => p.id === pageId);
    const widget = page?.widgets.find((w) => w.id === widgetId);
    if (!widget) return null;
    const newWidget = {
      ...widget,
      id: `w_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
      order: (widget.order ?? 0) + 1,
    };
    setPages((prev) =>
      prev.map((p) => {
        if (p.id !== pageId) return p;
        const insertIndex = p.widgets.findIndex((w) => w.id === widgetId) + 1;
        const next = [...p.widgets];
        next.splice(insertIndex, 0, newWidget);
        return { ...p, widgets: next };
      })
    );
    return newWidget.id;
  }, [pages]);

  const value = useMemo(
    () => ({
      pages,
      getPageBySlug,
      getPageById,
      createPage,
      updatePage,
      deletePage,
      duplicatePage,
      addWidget,
      updateWidget,
      removeWidget,
      reorderWidgets,
      duplicateWidget,
    }),
    [
      pages,
      getPageBySlug,
      getPageById,
      createPage,
      updatePage,
      deletePage,
      duplicatePage,
      addWidget,
      updateWidget,
      removeWidget,
      reorderWidgets,
      duplicateWidget,
    ]
  );

  return (
    <PagesContext.Provider value={value}>
      {children}
    </PagesContext.Provider>
  );
}

export function usePages() {
  const ctx = useContext(PagesContext);
  if (!ctx) throw new Error("usePages must be used within PagesProvider");
  return ctx;
}
