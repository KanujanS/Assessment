# 🚀 MERN Stack Assessment Project

A full-stack web application built with **React (frontend)**, **Node.js + Express (backend)**, **MongoDB**, and **JWT authentication** (access/refresh tokens).  
Includes role-based access, protected routes, admin management features, and a responsive UI powered by TailwindCSS.

---

## 📦 Project Structure

```
/root
  ├── /frontend    # React + TailwindCSS (client)
  └── /backend     # Node.js + Express + MongoDB (server)
```

---

## 🛠️ Installation

### 1️⃣ Clone the Repository

```bash
git clone <your-repo-url>
cd your-project
```

---

### 2️⃣ Setting up Environment Variables (Backend)

Create a `.env` file inside the **backend** folder:

```env
MONGODB_URI=
PORT=
JWT_ACCESS_SECRET=YOUR_ACCESS_TOKEN_HERE
JWT_REFRESH_SECRET=your_refresh_secret_here
ACCESS_TOKEN_EXPIRES=15m
REFRESH_TOKEN_EXPIRES=7d
```

---

### 3️⃣ Backend Setup (Node.js + Express)

```bash
cd backend
npm install
npm run server
```
Backend server will start on:

```
http://localhost:4000
```

---

### 4️⃣ Frontend Setup (React + TailwindCSS)

```bash
cd frontend
npm install
npm run dev
```

---

### 5️⃣ Connecting Frontend & Backend

- Ensure your Axios base URL is set to:
```
http://localhost:4000/api
```
- The frontend communicates with the backend APIs via this endpoint.


---

## 🎯 Features

- **User Registration & Login**
- **JWT Access + Refresh Token Authentication**
- **Role-Based Access (User/Admin)**
- **Protected Routes**
- **Dark Mode**
- **Admin User Management**
- **Responsive UI with TailwindCSS**
- **Axios Interceptors with Auto Token Refresh**

---

## ✅ Quick Run Steps

1. Set up the environment variables as shown above.
2. Start the backend server (`cd backend && npm install && npm run server`).
3. Start the frontend server (`cd frontend && npm install && npm run dev`).

---

