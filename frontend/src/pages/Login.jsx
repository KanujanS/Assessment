import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      setErr(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 dark:text-white rounded-xl border shadow">
      <h2 className="flex text-3xl mb-6 justify-center">Login</h2>

      {err && <div className="bg-red-200 p-2 mb-3 text-red-800 rounded-xl">{err}</div>}

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded-xl"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded-xl"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-sky-600 text-white font-semibold p-2 rounded-xl cursor-pointer">
          Login
        </button>
        <a href="/register" className="flex justify-center gap-1">Don't have an account? <span className="text-blue-600">Register</span></a>
      </form>
    </div>
    </div>
  );
};

export default Login;