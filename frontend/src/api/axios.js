import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api",
});

// Add access token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle expired token → auto refresh
let isRefreshing = false;
let queue = [];

const processQueue = (error, token = null) => {
  queue.forEach(p => token ? p.resolve(token) : p.reject(error));
  queue = [];
};

API.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;

    if (err.response?.status === 401 && !original._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          queue.push({ resolve, reject });
        }).then((token) => {
          original.headers.Authorization = "Bearer " + token;
          return API(original);
        });
      }

      original._retry = true;
      isRefreshing = true;

      try {
        const res = await axios.post(
          "http://localhost:4000/api/auth/token/refresh",
          {}
        );

        const newToken = res.data.accessToken;
        localStorage.setItem("accessToken", newToken);

        processQueue(null, newToken);
        return API(original);
      } catch (error) {
        processQueue(error, null);
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(err);
  }
);

export default API;