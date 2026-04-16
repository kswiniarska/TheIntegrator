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

let usersData = [];

const tableElement = document.querySelector('.js-users-table-body');
const tableUpdated = document.querySelector('.js-table-updated');

async function loadUsersData() {
  
  
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

function filterUserData() {
  const inputElement = document.querySelector('.js-input');
  const searchButton = document.querySelector('.js-search-button');

  if (!searchButton) {
    console.error("UWAGA: Nie znaleziono przycisku .js-search-button w HTML!");
    return;
  }

  searchButton.addEventListener('click', () => {
    const inputElementValue = inputElement.value;
    const errorElement = document.querySelector('.js-error-search-message')
    let filteredHTML = '';

    if (!inputElementValue) {
      errorElement.innerHTML = 'Enter name that you want to search!';
      return;
    } else if (/\d/.test(inputElementValue)) {
      errorElement.innerHTML = 'wrong data type! has to be string';
      return;
      } 
    

    usersData.forEach((user) => {
    if (user.name === inputElementValue) {
      filteredHTML += `
      <tr>
        <td>${user.name}</td>
        <td>${user.username}</td>
        <td>${user.email}</td>
        <td>${user.address.street}</td>
        <td>${user.phone}</td>
      </tr>`
    }

    tableUpdated.innerHTML = filteredHTML;
    })
  })
}

document.addEventListener('DOMContentLoaded', () => {
    loadUsersData();
    filterUserData();
});