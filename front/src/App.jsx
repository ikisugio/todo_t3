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
  ListItemButton,
  ListItemText,
  Card,
  Backdrop,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import styled from "@emotion/styled";
import { ThemeProvider, createTheme } from "@mui/material";

const HEADER_HEIGHT = "64px";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "rgba(120, 100, 255, 0.7)", // 薄い紫色
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          transition: "box-shadow 0.2s",
          "&:hover": {
            boxShadow: "0px 0px 10px rgba(120, 100, 255, 0.2)", // 薄い紫色の影
          },
        },
      },
    },
  },
});

const DrawerWidth = 250; // Drawerの幅

const MainContent = styled.div`
  transition: transform 0.3s ease, width 0.3s ease;
  width: ${(props) =>
    props.menuOpen
      ? `calc(100% - ${DrawerWidth}px)`
      : "100%"}; // menuOpenの状態に応じてメインの要素の幅を変更
  transform: ${(props) =>
    props.menuOpen
      ? `translateX(${DrawerWidth}px)`
      : "translateX(0)"}; // menuOpenの状態に応じてtranslateの値を変更
`;

const StyledAppBar = styled(AppBar)`
  background-color: #ffffff; // 背景を白に設定
  box-shadow: 0.1px 0.1px 0.1px rgba(0, 0, 0, 0.1);
  &:hover {
    box-shadow: 0px 0px 10px rgba(0, 0, 200, 0.1);
    border: 0.1px solid lightgray;
  }
  border: 1px solid lightgray;
`;

const StyledTypography = styled(Typography)`
  color: #555; // 文字色を灰色に設定
`;

const StyledCard = styled(Card)`
  max-width: 400px;
  margin: 1rem auto;
  height: 70vh;
  padding: 4rem 1rem;
`;

const StyledDrawer = styled(Drawer)`
  .MuiDrawer-paper {
    top: ${HEADER_HEIGHT};
    border-top-right-radius: 0;
    border-top-left-radius: 0;
    box-shadow: 0.1px 0.1px 0.5px rgba(0, 0, 0, 0.1);
    border: 0.1px solid rgba(0, 0, 0, 0.1);
    width: ${DrawerWidth}px;
    // background-color: rgba(63, 81, 181, 0.05);
    background-color: rgba(63, 81, 181, 0);
    &:hover {
      border: 0.03px solid lightgray;
      box-shadow: 5px 5px 5px rgba(0, 0, 200, 0.03);
    }
  }
  .MuiBackdrop-root {
    display: none;
  }
`;

const GlobalScrollbarStyles = styled.div`
  // Chrome, Safari 対応
  &::-webkit-scrollbar {
    width: 16px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.palette.primary.main};
    border-radius: 5px;
  }
  &::-webkit-scrollbar-track {
    background-color: rgba(120, 100, 255, 0.1); // もう少し薄い紫色
  }

  // Firefox 対応
  scrollbar-color: ${(props) => props.theme.palette.primary.main}
    rgba(120, 100, 255, 0.1);
  scrollbar-width: thin;
`;

const AppContainer = styled.div`
  height: calc(
    100vh - ${HEADER_HEIGHT}
  ); // ビューポートの高さからヘッダーの高さを引いた値
  display: flex; // Flexboxを有効にする
  align-items: center; // 垂直方向に中央揃え
  justify-content: center; // 水平方向に中央揃え
  padding-top: ${HEADER_HEIGHT}; // ヘッダーの高さ分、上部にパディングを追加
`;

const DrawerListContainer = styled.div`
  width: ${DrawerWidth}px;
`;

const StyledListItem = styled(ListItemButton)`
  transition: background-color 0.3s, border-radius 0.3s;

  &:hover {
    background-color: rgba(220, 220, 220, 0.6);
    border-radius: 15px;
  }

  .MuiListItemText-root {
    color: #555;
    font-weight: 700;
    font-family: "Open Sans", sans-serif;
  }

  margin-left: 15px;
  margin-right: 15px;
`;

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <ThemeProvider theme={customTheme}>
      <GlobalScrollbarStyles>
        <BrowserRouter>
          <div className="App">
            <StyledAppBar position="fixed">
              <Toolbar>
                <IconButton
                  edge="start"
                  color="default"
                  aria-label="menu"
                  onClick={toggleMenu}
                >
                  <MenuIcon style={{ color: "#555" }} />
                </IconButton>
                <StyledTypography variant="h6" style={{ flexGrow: 1 }}>
                  Welcome to Our Search App
                </StyledTypography>
              </Toolbar>
            </StyledAppBar>
            <StyledDrawer
              anchor="left"
              open={menuOpen}
              onClose={toggleMenu}
              onClick={toggleMenu}
            >
              <DrawerListContainer>
                <List>
                  <StyledListItem
                    button
                    component={Link}
                    to="/search"
                    onClick={toggleMenu}
                  >
                    <ListItemText primary="Search" />
                  </StyledListItem>
                  {loggedIn && (
                    <StyledListItem
                      button
                      component={Link}
                      to="/edit/1"
                      onClick={toggleMenu}
                    >
                      <ListItemText primary="Edit" />
                    </StyledListItem>
                  )}
                  {!loggedIn && (
                    <StyledListItem
                      button
                      component={Link}
                      to="/"
                      onClick={toggleMenu}
                    >
                      <ListItemText primary="Login" />
                    </StyledListItem>
                  )}
                </List>
              </DrawerListContainer>
            </StyledDrawer>
            <Backdrop
              open={menuOpen}
              onClick={toggleMenu}
              style={{ backgroundColor: "transparent" }}
            />
            <MainContent menuOpen={menuOpen}>
              {" "}
              {/* ここでメインコンテンツをラップします */}
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
            </MainContent>
          </div>
        </BrowserRouter>
      </GlobalScrollbarStyles>
    </ThemeProvider>
  );
}

export default App;
