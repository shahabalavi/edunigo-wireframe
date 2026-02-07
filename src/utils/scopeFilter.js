import { demoUsers } from "../config/staff";
import { getAdminDirectory, getDescendantIds } from "../config/adminHierarchy";

export const getCurrentUser = () => {
  if (typeof window === "undefined") {
    return demoUsers.admin;
  }

  const roleId = window.localStorage.getItem("demoRole") || "admin";
  return demoUsers[roleId] || demoUsers.admin;
};

export const hasPermission = (user, permission) =>
  Boolean(user?.permissions?.includes(permission));

export const getEntityScopeLevel = (user, entityKey) => {
  if (hasPermission(user, `${entityKey}.scope.all`)) return "all";
  if (hasPermission(user, `${entityKey}.scope.team`)) return "team";
  if (hasPermission(user, `${entityKey}.scope.own`)) return "own";
  return "none";
};

const getTeamMemberIds = (user) => {
  if (!user?.id) return [];
  return getDescendantIds(getAdminDirectory(), user.id);
};

export const getVisibleOwnerIds = (user, entityKey) => {
  const scope = getEntityScopeLevel(user, entityKey);
  if (scope === "all") return null;
  if (scope === "team") {
    return new Set([user?.id, ...getTeamMemberIds(user)].filter(Boolean));
  }
  if (scope === "own") {
    return new Set([user?.id].filter(Boolean));
  }
  return new Set();
};

export const applyScopeFilter = (records, user, entityKey, getOwnerId) => {
  const scope = getEntityScopeLevel(user, entityKey);
  if (scope === "all") return records;
  const allowedIds = getVisibleOwnerIds(user, entityKey);
  return records.filter((record) => {
    const ownerId = getOwnerId(record);
    return ownerId && allowedIds.has(ownerId);
  });
};

export const canAccessRecord = (record, user, entityKey, getOwnerId) => {
  if (!record) return false;
  const scope = getEntityScopeLevel(user, entityKey);
  if (scope === "all") return true;
  const ownerId = getOwnerId(record);
  if (!ownerId) return false;
  const allowedIds = getVisibleOwnerIds(user, entityKey);
  return allowedIds.has(ownerId);
};

export const getScopeLabel = (user, entityKey) => {
  const scope = getEntityScopeLevel(user, entityKey);
  if (scope === "all") return "All Records";
  if (scope === "team") return "Team Records";
  if (scope === "own") return "Own Records";
  return "No Access";
};
