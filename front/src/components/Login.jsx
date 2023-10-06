import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { Card, CardContent } from "@mui/material";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const FormItem = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.div`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #555;
`;

const StyledCard = styled(Card)`
  width: 400px;
  padding: 2rem 1rem;
  max-height: 80%; // カードの最大高さを80%に制限
  overflow-y: auto; // 必要に応じてスクロールバーを表示
  border-radius: 0.5rem;
  border: 1px solid lightgray;
  box-shadow: 0px 0px 0.5px rgba(0, 0, 0, 0.1);
`;

const StyledButton = styled(Button)`
  background-color: rgba(63, 81, 181, 0.7);
  color: #fff;
  font-weight: bold;
  margin-top: 4rem;
  padding: 0.6rem;
  &:hover {
    background-color: rgba(63, 81, 181, 0.9);
    box-shadow: none;
  }
  box-shadow: 0.5px 0.5px 0.5px rgba(0, 0, 0, 0.1);
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
`;

const FormContainer = styled.div`
  flex: 1; // この値を調整して、入力フォームが占めるスペースの比率を変更
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // ローディング状態を追加
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true); // ローディング開始
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
    } finally {
      setLoading(false); // ローディング終了
    }
  };

  return (
    <StyledCard>
      <CardContent>
        <FlexContainer>
          <FormContainer>
            <FormItem>
              <Label>Username</Label>
              <TextField
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                variant="outlined"
                size="small"
              />
            </FormItem>
            <FormItem>
              <Label>Password</Label>
              <TextField
                fullWidth
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                size="small"
              />
            </FormItem>
          </FormContainer>
          <StyledButton
            variant="contained"
            onClick={handleLogin}
            fullWidth
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </StyledButton>
        </FlexContainer>
      </CardContent>
    </StyledCard>
  );
}

export default Login;
