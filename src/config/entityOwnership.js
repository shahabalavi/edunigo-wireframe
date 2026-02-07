export const entityOwnership = {
  users: (user) => user?.assignedAdminId || user?.ownerId || null,
  tickets: (ticket) =>
    ticket?.assignedAdmin?.id || ticket?.assignedAdminId || null,
};
