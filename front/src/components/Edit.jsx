import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { getTodoById, updateTodo } from "../services/apiService";

function EditTodo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    const fetchTodo = async () => {
      const fetchedTodo = await getTodoById(id);
      setTodo(fetchedTodo);
    };
    fetchTodo();
  }, [id]);

  const handleSave = async () => {
    await updateTodo(id, todo);
    navigate("/search");
  };

  if (!todo) return <div>Loading...</div>;

  return (
    <div>
      <h2>Edit Todo</h2>
      <TextField
        fullWidth
        label="Title"
        value={todo.title}
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
      />
      <Button variant="contained" color="primary" onClick={handleSave}>
        Save
      </Button>
    </div>
  );
}

export default EditTodo;
