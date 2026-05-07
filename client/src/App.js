import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./Login";
import Signup from "./components/signup";
import Dashboard from "./components/Dashboard";

function App() {

  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>

      <Routes>

        {/* LOGIN */}
        <Route
          path="/"
          element={
            !token
              ? <Login />
              : <Navigate to="/dashboard" />
          }
        />

        {/* SIGNUP */}
        <Route
          path="/signup"
          element={
            !token
              ? <Signup />
              : <Navigate to="/dashboard" />
          }
        />

        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            token
              ? <Dashboard />
              : <Navigate to="/" />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;