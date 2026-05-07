import React, { useState } from "react";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    const res = await fetch(
      "http://localhost:5000/api/auth/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          password
        })
      }
    );

    const data = await res.json();

    if (data.token) {
      localStorage.setItem("token", data.token);

      window.location.href = "/dashboard";
    } else {
      alert(data.msg);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl mb-4">Signup</h1>

      <input
        placeholder="Name"
        className="border p-2 mb-2"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Email"
        className="border p-2 mb-2"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2 mb-2"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleSignup}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Signup
      </button>
    </div>
  );
}

export default Signup;