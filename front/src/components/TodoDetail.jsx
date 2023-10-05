import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function TodoDetail({ id, backToList }) {
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    // Fetch todo details
    fetch(`/api/todos/${id}/`)
      .then((res) => res.json())
      .then((data) => setTodo(data));
  }, [id]);

  const handleUpdate = () => {
    // Handle updating the todo details
    // For now, just go back to the list
    backToList();
  };

  return (
    <div>
      {todo ? (
        <>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            value={todo.name}
            // Add onChange to edit the todo name
          />
          <Button onClick={handleUpdate}>Update</Button>
          <Button onClick={backToList}>Back to list</Button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default TodoDetail;
