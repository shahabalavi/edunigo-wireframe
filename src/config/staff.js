import { getAdminDirectory } from "./adminHierarchy";

const getAdminById = (id) =>
  getAdminDirectory().find((admin) => admin.id === id);

export const demoUsers = {
  admin: {
    id: 4,
    name: "Admin User",
    managerId: null,
    permissions: [
      "users.scope.all",
      "tickets.scope.all",
      "users.viewAny",
      "users.view",
      "tickets.viewAny",
      "tickets.view",
      "tickets.update",
    ],
  },
  supervisor: {
    id: 7,
    name: "Support Supervisor",
    managerId: 4,
    permissions: [
      "users.scope.all",
      "tickets.scope.team",
      "users.viewAny",
      "users.view",
      "tickets.viewAny",
      "tickets.view",
      "tickets.update",
      "tickets.assign",
    ],
  },
  support: {
    id: 9,
    name: "Support Agent",
    managerId: 7,
    permissions: [
      "users.scope.all",
      "tickets.scope.own",
      "users.viewAny",
      "users.view",
      "tickets.viewAny",
      "tickets.view",
      "tickets.update",
    ],
  },
};

export const adminRoster = getAdminDirectory().map((admin) => ({
  ...admin,
  displayName: `${admin.firstName} ${admin.lastName}`.trim(),
  manager: admin.managerId ? getAdminById(admin.managerId) : null,
}));
