import axios from "axios";

async function fetchSearchResults(query, page) {
  const token = localStorage.getItem("access_token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const response = await axios.get(`http://127.0.0.1:8000/api/search/`, {
    headers: headers,
    params: {
      q: query,
      page: page,
    },
  });
  return response.data;
}

async function createTodo(data) {
  const token = localStorage.getItem("access_token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const response = await axios.post(`http://127.0.0.1:8000/api/todos/`, data, {
    headers: headers,
  });
  return response.data;
}

async function getTodoById(id) {
  const token = localStorage.getItem("access_token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const response = await axios.get(`http://127.0.0.1:8000/api/todos/${id}/`, {
    headers: headers,
  });
  return response.data;
}

async function updateTodo(id, data) {
  const token = localStorage.getItem("access_token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const response = await axios.put(
    `http://127.0.0.1:8000/api/todos/${id}/`,
    data,
    {
      headers: headers,
    }
  );
  return response.data;
}

async function deleteTodo(id) {
  const token = localStorage.getItem("access_token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const response = await axios.delete(
    `http://127.0.0.1:8000/api/todos/${id}/`,
    {
      headers: headers,
    }
  );
  return response.status; // 200 for successful delete, 404 if not found, etc.
}

export { fetchSearchResults, getTodoById, updateTodo, createTodo, deleteTodo };
