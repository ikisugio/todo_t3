async function fetchSearchResults(query, page) {
  const token = localStorage.getItem("access_token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const response = await fetch(
    `http://127.0.0.1:8000/api/search/?q=${query}&page=${page}`,
    { headers: headers }
  );
  const data = await response.json();
  return data;
}

export { fetchSearchResults };
