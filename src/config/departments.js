/**
 * Department tree: organizational layer for grouping admins and defining reporting lines.
 * Separate from roles/permissions. Stored in localStorage; tree hierarchy (parent/child).
 */

const STORAGE_KEY = "edunigo_departments";

const defaultDepartments = [
  { id: "finance", name: "Finance", parentId: null, order: 1 },
  { id: "director", name: "Director / Leadership", parentId: null, order: 2 },
  { id: "hr", name: "HR", parentId: null, order: 3 },
  { id: "marketing", name: "Marketing", parentId: null, order: 4 },
  { id: "support", name: "Support", parentId: null, order: 5 },
];

export const getDepartments = () => {
  if (typeof window === "undefined") return defaultDepartments;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaultDepartments;
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultDepartments;
  } catch {
    return defaultDepartments;
  }
};

export const saveDepartments = (list) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
};

/** Build tree from flat list: each node has { ...node, children: [] }. */
export const buildDepartmentTree = (list = null) => {
  const flat = list ?? getDepartments();
  const nodes = flat.map((d) => ({ ...d, children: [] }));
  const byId = {};
  nodes.forEach((n) => { byId[n.id] = n; });
  const roots = [];
  nodes.forEach((n) => {
    if (n.parentId && byId[n.parentId]) {
      byId[n.parentId].children.push(n);
    } else {
      roots.push(n);
    }
  });
  roots.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
  roots.forEach((r) => r.children.sort((a, b) => (a.order ?? 99) - (b.order ?? 99)));
  return roots;
};

export const getDepartmentById = (id) => {
  if (!id) return null;
  return getDepartments().find((d) => d.id === id) ?? null;
};

export const getDepartmentLabel = (id) =>
  getDepartmentById(id)?.name ?? id ?? "—";

/** All descendant ids (children, grandchildren, ...) for a department. */
export const getDepartmentDescendantIds = (departmentId) => {
  const flat = getDepartments();
  const result = [];
  const stack = flat.filter((d) => d.parentId === departmentId).map((d) => d.id);
  while (stack.length) {
    const id = stack.pop();
    result.push(id);
    flat.filter((d) => d.parentId === id).forEach((d) => stack.push(d.id));
  }
  return result;
};

/** Generate a new id for a department (slug-style or unique string). */
export const nextDepartmentId = (name, parentId) => {
  const flat = getDepartments();
  const base = (name || "dept")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "dept";
  let id = base;
  let n = 0;
  while (flat.some((d) => d.id === id)) {
    n += 1;
    id = `${base}-${n}`;
  }
  return id;
};

/** Add a department; returns new list. */
export const addDepartment = ({ name, parentId = null }) => {
  const flat = getDepartments();
  const maxOrder = Math.max(0, ...flat.filter((d) => d.parentId === parentId).map((d) => d.order ?? 0));
  const id = nextDepartmentId(name, parentId);
  const newDept = { id, name: name.trim(), parentId: parentId || null, order: maxOrder + 1 };
  saveDepartments([...flat, newDept]);
  return getDepartments();
};

/** Update a department; returns new list. */
export const updateDepartment = (id, { name, parentId }) => {
  const flat = getDepartments();
  const descendants = getDepartmentDescendantIds(id);
  if (parentId && (parentId === id || descendants.includes(parentId))) {
    return flat; // prevent cycle
  }
  const updated = flat.map((d) =>
    d.id === id
      ? { ...d, name: name != null ? name.trim() : d.name, parentId: parentId !== undefined ? parentId : d.parentId }
      : d
  );
  saveDepartments(updated);
  return getDepartments();
};

/** Remove a department; returns new list. Fails if has children (optional: or admins assigned). */
export const removeDepartment = (id) => {
  const flat = getDepartments();
  const hasChildren = flat.some((d) => d.parentId === id);
  if (hasChildren) return null;
  const next = flat.filter((d) => d.id !== id);
  saveDepartments(next);
  return getDepartments();
};
