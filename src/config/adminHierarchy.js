const STORAGE_KEY = "adminHierarchy";

export const defaultAdmins = [
  {
    id: 4,
    firstName: "Admin",
    lastName: "User",
    email: "admin.user@edunigo.com",
    isSuperAdmin: true,
    status: "active",
    roles: [{ id: 1, name: "Admin" }],
    createdAt: "2024-01-15",
    managerId: null,
    departmentId: "director",
  },
  {
    id: 7,
    firstName: "Olivia",
    lastName: "Grant",
    email: "olivia.grant@edunigo.com",
    isSuperAdmin: false,
    status: "active",
    roles: [{ id: 2, name: "Support Supervisor" }],
    createdAt: "2024-01-20",
    managerId: 4,
    departmentId: "support",
  },
  {
    id: 9,
    firstName: "Ethan",
    lastName: "Blake",
    email: "ethan.blake@edunigo.com",
    isSuperAdmin: false,
    status: "active",
    roles: [{ id: 3, name: "Support Agent" }],
    createdAt: "2024-02-01",
    managerId: 7,
    departmentId: "support",
  },
  {
    id: 11,
    firstName: "Sarah",
    lastName: "Wilson",
    email: "sarah.wilson@edunigo.com",
    isSuperAdmin: false,
    status: "active",
    roles: [{ id: 4, name: "Content Manager" }],
    createdAt: "2024-02-10",
    managerId: 4,
    departmentId: "marketing",
  },
  {
    id: 12,
    firstName: "David",
    lastName: "Brown",
    email: "david.brown@edunigo.com",
    isSuperAdmin: false,
    status: "active",
    roles: [{ id: 5, name: "Analytics Viewer" }],
    createdAt: "2024-02-15",
    managerId: 4,
    departmentId: "finance",
  },
];

const defaultDepartmentId = "director";

function migrateAdmins(admins) {
  return admins.map((admin) => ({
    ...admin,
    departmentId: admin.departmentId ?? defaultDepartmentId,
  }));
}

export const getAdminDirectory = () => {
  if (typeof window === "undefined") return migrateAdmins(defaultAdmins);
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return migrateAdmins(defaultAdmins);
    const parsed = JSON.parse(stored);
    const list = Array.isArray(parsed) ? parsed : defaultAdmins;
    return migrateAdmins(list);
  } catch (error) {
    return migrateAdmins(defaultAdmins);
  }
};

export const saveAdminDirectory = (admins) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(admins));
};

export const getAdminDisplayName = (admin) =>
  `${admin.firstName} ${admin.lastName}`.trim();

export const getDescendantIds = (admins, rootId) => {
  const byManager = admins.reduce((acc, admin) => {
    const key = admin.managerId || "root";
    if (!acc[key]) acc[key] = [];
    acc[key].push(admin.id);
    return acc;
  }, {});

  const descendants = [];
  const stack = [...(byManager[rootId] || [])];

  while (stack.length) {
    const currentId = stack.pop();
    descendants.push(currentId);
    const children = byManager[currentId] || [];
    stack.push(...children);
  }

  return descendants;
};

export const buildAdminTree = (admins) => {
  const nodes = admins.map((admin) => ({ ...admin, children: [] }));
  const byId = nodes.reduce((acc, admin) => {
    acc[admin.id] = admin;
    return acc;
  }, {});

  const roots = [];
  nodes.forEach((admin) => {
    if (admin.managerId && byId[admin.managerId]) {
      byId[admin.managerId].children.push(admin);
    } else {
      roots.push(admin);
    }
  });

  return roots;
};

/**
 * Build admin tree for a single department (reporting lines within that department).
 * Admins whose manager is in another department are treated as roots.
 */
export const buildAdminTreeForDepartment = (directory, departmentId) => {
  const deptId = departmentId || "director";
  const inDept = directory.filter(
    (a) => (a.departmentId || "director") === deptId
  );
  const nodes = inDept.map((admin) => ({ ...admin, children: [] }));
  const byId = {};
  nodes.forEach((n) => { byId[n.id] = n; });
  const roots = [];
  nodes.forEach((admin) => {
    const manager =
      admin.managerId != null
        ? directory.find((a) => a.id === admin.managerId)
        : null;
    const managerInDept =
      manager && (manager.departmentId || "director") === deptId;
    if (
      admin.managerId != null &&
      managerInDept &&
      byId[admin.managerId]
    ) {
      byId[admin.managerId].children.push(admin);
    } else {
      roots.push(admin);
    }
  });
  return roots;
};
