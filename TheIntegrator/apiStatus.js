const STATUS_OK = "OK";
const STATUS_ERROR = "ERROR";

function getStatusClass(serverStatus) {
  return serverStatus === STATUS_OK ? "status-ok" : "status-error";
}

export async function checkApiConnection(link, htmlMessage, classElement) {
  const element = document.querySelector(classElement);

  if (!element) {
    console.error(`class ${classElement} does not exist!`);
    return;
  }

  let serverStatus = STATUS_ERROR;

  try {
    const response = await fetch(link);
    if (!response.ok) {
      throw new Error(`Server status: ${response.status}`);
    }
    serverStatus = STATUS_OK;
  } catch (error) {
    console.error(error);
  }

  const statusClass = getStatusClass(serverStatus);
  element.innerHTML = `${htmlMessage} <span class="${statusClass}"> ${serverStatus}</span>`;
}

export function runHealthChecks() {
  checkApiConnection(
    "https://jsonplaceholder.typicode.com/users",
    "User Database status: ",
    ".js-users-database"
  );
  checkApiConnection(
    "https://jsonplaceholder.typicode.com/todos",
    "ticketing system status: ",
    ".js-ticketing-system"
  );
  checkApiConnection("https://error.pl/error", "cert database: ", ".js-error-example");
}
