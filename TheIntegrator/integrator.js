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
  if(!tableElement) return;

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    usersData = data;

    renderTable(usersData);
    
  } catch(error) {
      console.error(error);
  };

};

let usersData = [];
const tableElement = document.querySelector('.js-users-table-body');

function renderTable(data) {
  if (!tableElement) return;
  let tableHTML = '';
  data.forEach((user) => {
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
};

function filterUserData() {
  const inputElement = document.querySelector('.js-input');
  const searchButton = document.querySelector('.js-search-button');
  const errorElement = document.querySelector('.js-error-search-message');

  if (!searchButton) {
    console.error("ERROR: button .js-search-button not exist in HTML!");
    return;
  }

  searchButton.addEventListener('click', searchUser);
  inputElement.addEventListener('keydown', (event) => {
     if (event.key === 'Enter') {
      searchUser();
    }; 
  });
    

  const resetButton = document.querySelector('.js-reset-button');
  resetButton.addEventListener('click', () => {
    renderTable(usersData);
    errorElement.innerHTML = '';
    inputElement.value = '';
  })


function searchUser() {
  const inputElementValue = inputElement.value.trim().toLowerCase();

    if (!inputElementValue) {
      errorElement.innerHTML = 'Enter name that you want to search!';
      return;
    } else if (/\d/.test(inputElementValue)) {
      errorElement.innerHTML = 'wrong data type! has to be string';
      return;
      } 
    
    const usersDataFiltered = usersData.filter((user) => {
      return user.name.toLowerCase().includes(inputElementValue)
    });

    if (usersDataFiltered.length === 0) {
      errorElement.innerHTML = 'User not found';
      tableElement.innerHTML = '';
      return;
    } else {
      errorElement.innerHTML = '';
    }
    
    renderTable(usersDataFiltered)

  };
}

document.addEventListener('DOMContentLoaded', () => {
    loadUsersData();
    filterUserData();
})