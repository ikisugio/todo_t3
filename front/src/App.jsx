import React, { useState } from "react";
import Search from "./components/Search";
import Login from "./components/Login";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="App">
      <h1>Welcome to Our Search App</h1>
      {loggedIn ? (
        <Search />
      ) : (
        <Login onLoginSuccess={() => setLoggedIn(true)} />
      )}
    </div>
  );
}

export default App;
