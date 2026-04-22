export function createUsersTable(selector) {
  const tableElement = document.querySelector(selector);

  function renderTable(data) {
    if (!tableElement) {
      console.error(`Table element ${selector} not found.`);
      return;
    }

    const tableHTML = data
      .map(
        (user) => `
    <tr>
      <td>${user.name}</td>
      <td>${user.username}</td>
      <td>${user.email}</td>
      <td>${user.address.street}</td>
      <td>${user.phone}</td>
    </tr>
  `
      )
      .join("");

    tableElement.innerHTML = tableHTML;
  }

  function clearTable() {
    if (!tableElement) {
      return;
    }
    tableElement.innerHTML = "";
  }

  return { renderTable, clearTable, exists: Boolean(tableElement) };
}
