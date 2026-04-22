const USERS_ENDPOINT = "https://jsonplaceholder.typicode.com/users";

export async function fetchUsersData() {
  const response = await fetch(USERS_ENDPOINT);
  if (!response.ok) {
    throw new Error(`Failed to fetch users. Server status: ${response.status}`);
  }
  return response.json();
}
