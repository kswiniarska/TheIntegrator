import { runHealthChecks } from "./apiStatus.js";
import { fetchUsersData } from "./usersService.js";
import { createUsersTable } from "./usersTable.js";
import { setupUserSearch } from "./userSearch.js";

async function initializeUsersModule() {
  const { renderTable, clearTable, exists } = createUsersTable(".js-users-table-body");

  if (!exists) {
    return;
  }

  try {
    const usersData = await fetchUsersData();
    renderTable(usersData);
    setupUserSearch({ users: usersData, renderTable, clearTable });
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  runHealthChecks();
  initializeUsersModule();
});