# Finance Dashboard Backend

This is a backend system for a Finance Dashboard application implementing Role-Based Access Control (RBAC), authentication, financial record management, and dashboard analytics.

---

## 🚀 Project Overview

This project provides a RESTful API that allows:

* User authentication using JWT (Access + Refresh Tokens)
* Role-based access control (RBAC)
* Financial record management (CRUD)
* Dashboard analytics using MongoDB aggregation

The system is designed with a clean architecture using separation of concerns (routes → controllers → services → models).

---

## 🛠 Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB with Mongoose
* **Authentication:** JSON Web Tokens (JWT)
* **Password Hashing:** bcrypt
* **Validation:** express-validator
* **Utilities:**

  * cors (Cross-Origin Resource Sharing)
  * dotenv (Environment variables)

---

## ⚙️ Setup Steps

1. **Clone the repository**

```bash
git clone <repository-url>
cd <repository-name>
```

2. **Install dependencies**

```bash
npm install
```

3. **Setup environment variables**

Create a `.env` file in the root directory:

```
PORT=5000
MONGODB_URI=<your_mongodb_connection_string>
ACCESS_TOKEN_SECRET=<your_access_token_secret>
REFRESH_TOKEN_SECRET=<your_refresh_token_secret>
```

4. **Run the server**

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

---

## 🔐 Authentication Flow

1. User registers or logs in
2. Server returns:

   * Access Token (short-lived)
   * Refresh Token (long-lived)
3. Access token is used for API requests
4. Refresh token is used to generate new access tokens
5. Logout removes refresh token from database

---

## 🧑‍💼 Role-Based Access Control (RBAC)

### Roles:

* **Viewer**

  * Can view dashboard data only

* **Analyst**

  * Can view financial records
  * Can access dashboard insights

* **Admin**

  * Full access
  * Manage users
  * Create, update, delete financial records
  * View all users and all records

---

## 📌 API Endpoints

### 🔐 Auth (`/api/auth`)

| Method | Endpoint  | Description                |
| ------ | --------- | -------------------------- |
| POST   | /register | Register new user          |
| POST   | /login    | Login user                 |
| POST   | /refresh  | Get new access token       |
| POST   | /logout   | Logout user                |
| GET    | /profile  | Get logged-in user profile |

---

### 👤 Users (`/api/users`)

| Method | Endpoint | Description                |
| ------ | -------- | -------------------------- |
| GET    | /        | Get all users (Admin only) |

---

### 💰 Finance (`/api/finance`)

| Method | Endpoint | Description                |
| ------ | -------- | -------------------------- |
| POST   | /        | Create record (Admin only) |
| GET    | /        | Get records (RBAC applied) |
| GET    | /:id     | Get single record          |
| PUT    | /:id     | Update record (Admin only) |
| DELETE | /:id     | Delete record (Admin only) |

---

### 📊 Dashboard (`/api/dashboard`)

| Method | Endpoint    | Description                     |
| ------ | ----------- | ------------------------------- |
| GET    | /summary    | Total income, expenses, balance |
| GET    | /categories | Category-wise breakdown         |
| GET    | /trends     | Monthly trends                  |
| GET    | /recent     | Recent transactions             |

---

## 📊 Features Implemented

* JWT Authentication (Access + Refresh)
* Role-Based Access Control (RBAC)
* Secure password hashing (bcrypt)
* Finance CRUD operations
* Filtering (type, category, date range)
* Dashboard analytics using MongoDB aggregation
* Centralized error handling
* Input validation using express-validator

---

## 📦 Response Format

### Success Response

```json
{
  "success": true,
  "message": "Request successful",
  "data": {}
}
```

### Error Response

```json
{
  "success": false,
  "message": "Error message"
}
```

---

## ⚠️ Assumptions

* MongoDB instance is running
* Environment variables are properly configured
* Users are assigned roles at creation or manually updated
* Refresh tokens are stored in the database

---

## 🧠 Design Decisions

* Used layered architecture (Controller → Service → Model)
* Stored refresh tokens in DB for better security
* Used RBAC middleware instead of controller checks
* Aggregation pipelines used for dashboard analytics
* Password excluded using Mongoose `toJSON` transform

---

## 🎯 Conclusion

This project demonstrates a clean and scalable backend system with:

* Proper separation of concerns
* Secure authentication system
* Role-based authorization
* Efficient data aggregation

---

## 📌 Future Improvements (Optional)

* Pagination for finance records
* Rate limiting
---
