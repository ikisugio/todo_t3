import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { Card, CardContent } from "@mui/material";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

const FormItem = styled.div`
  margin-bottom: 1rem;
`;

const StyledCard = styled(Card)`
  max-width: 400px;
  margin: 1rem auto;
  padding: 2rem 1rem;
  height: 50vh; // カードの縦の長さを70%に設定
`;

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/token/", {
        user_name: username,
        password: password,
      });

      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      onLoginSuccess();
      navigate("/search");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <StyledCard>
      <CardContent>
        <FormItem>
          <TextField
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormItem>
        <FormItem>
          <TextField
            fullWidth
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormItem>
        <Button variant="contained" color="primary" onClick={handleLogin}>
          Login
        </Button>
      </CardContent>
    </StyledCard>
  );
}

export default Login;
