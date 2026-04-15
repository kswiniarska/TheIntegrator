async function APIconnection(link, htmlMessage, classElement) {
  let serverStatus;
  
  const element = document.querySelector(classElement);
  try {
    const response = await fetch(link);
    if (!response.ok) {
      throw new Error(`Server status: ${response.status}`)
    }
    serverStatus = 'OK';

  } catch(error) {
      console.error(error);
      serverStatus = 'ERROR';
    }
  
  if (!element) {
    console.error(`class ${classElement} does not exist!`)
    return;
  }
  const statusClass = (serverStatus === 'OK') ? 'status-ok' : 'status-error';
  element.innerHTML = `${htmlMessage} <span class="${statusClass}"> ${serverStatus}</span>`;
};


APIconnection('https://jsonplaceholder.typicode.com/users', 'User Database status: ', '.js-users-database');

APIconnection('https://jsonplaceholder.typicode.com/todos', 'ticketing system status: ', '.js-ticketing-system');

APIconnection('https://error.pl/error', 'cert database: ', '.js-error-example');

async function loadUsersData() {
  let usersData = [];
  const tableElement = document.querySelector('#js-users-table-body');
  if(!tableElement) return;

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    usersData = data;

    let tableHTML = '';
    usersData.forEach((user) => {
    tableHTML += `
    <tr>
      <td>${user.name}</td>
      <td>${user.username}</td>
      <td>${user.email}</td>
      <td>${user.address.street}</td>
      <td>${user.phone}</td>
    </tr>
  `;
  });
 
  tableElement.innerHTML = tableHTML;
  } catch(error) {
      console.error(error);
  };
};
loadUsersData();