import React, { useState } from "react";
import Login from "./Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";

function App() {
  // ✅ check token on load
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem("token");
  });

  const [isSignup, setIsSignup] = useState(false);

  // ✅ logout function
  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  // ================= UI =================
  if (!isLoggedIn) {
    return (
      <div>
        {isSignup ? (
          <Signup setIsLoggedIn={setIsLoggedIn} />
        ) : (
          <Login setIsLoggedIn={setIsLoggedIn} />
        )}

        <p style={{ textAlign: "center", marginTop: "10px" }} >
          {isSignup ? "Already have account?" : "New user?"}{" "}
          <button onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? "Login" : "Signup"}
          </button>
        </p>
      </div>
    );
  }

  // ================= DASHBOARD =================
  return (
    <div>
      <button
        onClick={logout}
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          padding: "8px 12px",
          background: "red",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Logout
      </button>

      <Dashboard />
    </div>
  );
}

export default App;