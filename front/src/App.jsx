import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Search from "./components/Search";
import Login from "./components/Login";
import Edit from "./components/Edit";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Card,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import styled from "@emotion/styled";

const StyledAppBar = styled(AppBar)`
  background-color: rgba(63, 81, 181, 0.7);
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
`;

const StyledCard = styled(Card)`
  max-width: 400px;
  margin: 1rem auto;
  height: 70vh;
  padding: 4rem 1rem;
`;

const StyledDrawer = styled(Drawer)`
  .MuiDrawer-paper {
    top: 64px;
    border-top-right-radius: 0;
    border-top-left-radius: 0;
    box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);
    border: 1px solid lightgray;
  }
  .MuiBackdrop-root {
    display: none;
  }
`;

const AppContainer = styled.div`
  margin-top: 64px;
  padding: 1rem;
`;

const DrawerListContainer = styled.div`
  width: 250px;
`;

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <StyledAppBar position="fixed">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleMenu}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Welcome to Our Search App
            </Typography>
          </Toolbar>
        </StyledAppBar>
        <StyledDrawer anchor="left" open={menuOpen} onClose={toggleMenu}>
          <DrawerListContainer>
            <List>
              <ListItem
                button
                component={Link}
                to="/search"
                onClick={toggleMenu}
              >
                <ListItemText primary="Search" />
              </ListItem>
              {loggedIn && (
                <ListItem
                  button
                  component={Link}
                  to="/edit/1"
                  onClick={toggleMenu}
                >
                  <ListItemText primary="Edit" />
                </ListItem>
              )}
              {!loggedIn && (
                <ListItem button component={Link} to="/" onClick={toggleMenu}>
                  <ListItemText primary="Login" />
                </ListItem>
              )}
            </List>
          </DrawerListContainer>
        </StyledDrawer>
        <AppContainer>
          <Routes>
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/search" element={<Search />} />
            <Route
              path="/"
              element={<Login onLoginSuccess={() => setLoggedIn(true)} />}
            />
          </Routes>
        </AppContainer>
      </div>
    </BrowserRouter>
  );
}

export default App;
