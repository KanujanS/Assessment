import React, { createContext, useContext, useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const loadUser = async () => {
    try {
      const res = await API.get("/profile");
      setUser(res.data);
    } catch (err) {
      setUser(null);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken")) loadUser();
  }, []);

  const login = async (email, password) => {
    const res = await API.post("/auth/login", { email, password });
    localStorage.setItem("accessToken", res.data.accessToken);
    setUser(res.data.user);
  };

  const register = async (payload) => {
    const res = await API.post("/auth/register", payload);
    localStorage.setItem("accessToken", res.data.accessToken);
    setUser(res.data.user);
  };

  const logout = async () => {
    await API.post("/auth/logout");
    localStorage.removeItem("accessToken");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, setUser, loadUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);