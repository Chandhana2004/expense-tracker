import React, { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";

function App() {
  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem("token")
  );
  const [showRegister, setShowRegister] = useState(false);

  if (loggedIn) {
    return <Dashboard />;
  }

  return (
  <div className="container">
    <div className="app-title">
      <h1>Expense Tracker</h1>
      <p>Manage your income & expenses easily</p>
    </div>
    {showRegister ? (
      <>
        <Register />
        <div className="auth-switch">
          Already have an account?{" "}
          <button onClick={() => setShowRegister(false)}>
            Login
          </button>
        </div>
      </>
    ) : (
      <>
        <Login setLoggedIn={setLoggedIn} />
        <div className="auth-switch">
          Don’t have an account?{" "}
          <button onClick={() => setShowRegister(true)}>
            Register
          </button>
        </div>
      </>
    )}
  </div>
);
}

export default App;
