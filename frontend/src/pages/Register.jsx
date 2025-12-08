import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [err, setErr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    try {
      await register({ name, email, password });
      navigate("/");
    } catch (error) {
      setErr(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 dark:text-white border rounded-xl shadow">
        <h2 className="flex text-3xl justify-center mb-6">Register</h2>

        {err && (
          <div className="bg-red-200 p-2 mb-3 text-red-800 rounded-xl">{err}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            placeholder="Name"
            className="w-full p-2 border rounded-xl"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded-xl"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full p-2 border rounded-xl pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </span>
          </div>
          <button className="w-full bg-green-600 text-white font-semibold p-2 rounded-xl cursor-pointer">
            Create Account
          </button>
          <a href="/login" className="flex justify-center gap-1">Already have an account? <span className="text-blue-600">Login</span></a>
        </form>
      </div>
    </div>
  );
};

export default Register;
