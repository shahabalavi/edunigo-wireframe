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
  },
];

export const getAdminDirectory = () => {
  if (typeof window === "undefined") return defaultAdmins;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaultAdmins;
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : defaultAdmins;
  } catch (error) {
    return defaultAdmins;
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
