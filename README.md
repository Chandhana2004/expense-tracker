💰 Expense Tracker – Full Stack Application

A full-stack Expense Tracker built using React (frontend), Node.js + Express (backend), and MySQL (database).
Users can register, login, and manage expenses securely using JWT authentication.

🛠️ Tech Stack

Frontend

-React

-HTML, CSS, JavaScript

-Axios

Backend

-Node.js

-Express.js

-JWT Authentication

-bcrypt

Database

-MySQL

📁 Project Folder Structure

EXPENSE-TRACKER/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   │   └── auth.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── expenses.js
│   ├── .env
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.js
│   │   │   ├── ExpenseForm.js
│   │   │   ├── ExpenseList.js
│   │   │   ├── Login.js
│   │   │   └── Register.js
│   │   ├── api.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   └── package-lock.json
│
└── README.md

⚙️ Prerequisites

Make sure you have:

-Node.js (v18+)

-MySQL Server

-MySQL Workbench

-VS Code

🔧 Backend Setup

1️⃣ Go to backend folder
cd backend

2️⃣ Install backend dependencies
npm install

3️⃣ Create .env file inside backend/
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASS=your_mysql_password
DB_NAME=expense_tracker
JWT_SECRET=myjwtsecret

4️⃣ Create Database & Tables

Open MySQL Workbench → SQL Editor → run:

CREATE DATABASE expense_tracker;
USE expense_tracker;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE expenses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  category VARCHAR(50),
  description VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

5️⃣ Start Backend Server

node server.js

Output:

Backend running on port 5000
MySQL Connected

🎨 Frontend Setup

6️⃣ Go to frontend folder
cd ../frontend

7️⃣ Install frontend dependencies
npm install

8️⃣ Start frontend
npm start

Frontend runs at:

http://localhost:3000

🔗 Frontend–Backend Connection

In frontend/src/api.js:

import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5000/api"
});

✨ Features

-User Registration & Login

-JWT Authentication

-Add Expenses

-View Expense List

-Category-wise tracking

-Secure password hashing

-MySQL database integration
