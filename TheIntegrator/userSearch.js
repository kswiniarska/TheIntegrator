function validateSearchInput(value) {
  if (!value) {
    return "Enter name that you want to search!";
  }
  if (/\d/.test(value)) {
    return "wrong data type! has to be string";
  }
  return "";
}

export function setupUserSearch({
  users,
  renderTable,
  clearTable,
  selectors = {
    input: ".js-input",
    searchButton: ".js-search-button",
    resetButton: ".js-reset-button",
    error: ".js-error-search-message",
  },
}) {
  const inputElement = document.querySelector(selectors.input);
  const searchButton = document.querySelector(selectors.searchButton);
  const resetButton = document.querySelector(selectors.resetButton);
  const errorElement = document.querySelector(selectors.error);

  if (!inputElement || !searchButton || !resetButton || !errorElement) {
    console.error("Search controls are missing in HTML.");
    return;
  }

  function searchUser() {
    const inputElementValue = inputElement.value.trim().toLowerCase();
    const validationError = validateSearchInput(inputElementValue);

    if (validationError) {
      errorElement.innerHTML = validationError;
      return;
    }

    const usersDataFiltered = users.filter((user) =>
      user.name.toLowerCase().includes(inputElementValue)
    );

    if (usersDataFiltered.length === 0) {
      errorElement.innerHTML = "User not found";
      clearTable();
      return;
    }

    errorElement.innerHTML = "";
    renderTable(usersDataFiltered);
  }

  searchButton.addEventListener("click", searchUser);
  inputElement.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      searchUser();
    }
  });

  resetButton.addEventListener("click", () => {
    renderTable(users);
    errorElement.innerHTML = "";
    inputElement.value = "";
  });
}
