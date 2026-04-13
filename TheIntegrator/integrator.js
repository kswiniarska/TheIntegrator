async function userDatabase() {
  let serverStatus;
  try {
    const response = await fetch('https://jsonplacehsolder.typicode.com/users');
    if (response.ok) {
      serverStatus = 'OK'
    } else {
        serverStatus = 'ERROR'
      }
  } catch(error) {
      console.error("Błąd sieciowy:", error);
    }

    html = 'User Database status: ';
    const usersDatabase = document.querySelector('.js-users-database');
    usersDatabase.innerHTML = html + serverStatus;
}
userDatabase();

