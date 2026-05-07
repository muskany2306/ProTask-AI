import React, { useState } from "react";

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    try {
      setLoading(true);

      const res = await fetch("https://protask-ai-backend.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (data.token) {
        localStorage.setItem("token", data.token);

        if (setIsLoggedIn) {
          setIsLoggedIn(true);
        }

        window.location.href = "/dashboard";

      } else {
        alert(data.msg || "Login failed");
      }

    } catch (err) {
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-80">

        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Login
        </h2>

        <input
          className="w-full p-3 mb-4 border rounded-lg"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-3 mb-4 border rounded-lg"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-4 text-center text-sm">
          Don't have an account?
          <a
            href="/signup"
            className="text-blue-500 ml-1 font-semibold"
          >
            Signup
          </a>
        </p>

      </div>
    </div>
  );
}

export default Login;