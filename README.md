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

## 📌 Future Improvements & Enhancements

### Performance & Scalability
* **Pagination** - Implement cursor-based and offset pagination for finance records and user lists
* **Caching** - Add Redis caching for frequently accessed dashboard data and user profiles
* **Database Indexing** - Optimize MongoDB indexes for better query performance
* **Rate Limiting** - Implement request rate limiting using express-rate-limit
* **API Versioning** - Support multiple API versions for backward compatibility

### Features & Functionality
* **Two-Factor Authentication (2FA)** - Add SMS or email-based OTP verification
* **Advanced Filtering** - Complex financial record filters (nested queries, date ranges)
* **Export Functionality** - Export reports as PDF, CSV, Excel
* **Data Visualization** - Frontend integration with charts and graphs
* **Notifications** - Email/SMS alerts for significant transactions
* **Recurring Transactions** - Support for recurring income/expense entries
* **Budget Management** - Set and track budget limits by category
* **Multi-Currency Support** - Handle multiple currencies with conversion rates

### Security & Compliance
* **OAuth 2.0 / Social Login** - Google, GitHub, Microsoft authentication
* **IP Whitelisting** - Restrict API access by IP addresses
* **Audit Logging** - Track all user actions and data modifications
* **Data Encryption** - Encrypt sensitive data at rest and in transit
* **GDPR Compliance** - Data retention policies and user data export/deletion
* **Penetration Testing** - Regular security audits and vulnerability assessments

### Testing & Quality
* **Unit Tests** - Comprehensive test coverage using Jest/Mocha
* **Integration Tests** - Test API endpoints and middleware
* **Load Testing** - Performance testing with tools like Apache JMeter
* **API Documentation** - Enhanced Swagger/OpenAPI documentation
* **Code Coverage** - Aim for >80% code coverage

### Admin Features
* **User Management Dashboard** - View, edit, suspend, delete users
* **Role Management** - Create custom roles and permissions
* **Analytics Dashboard** - System usage metrics and insights
* **Backup & Recovery** - Automated database backups
* **Activity Logs** - Comprehensive audit trail

---

## 🚀 Deployment Guide

### Prerequisites
* Node.js v14+ installed
* MongoDB instance (local or cloud)
* Git repository configured
* Environment variables prepared

### Option 1: Deploy on Heroku

1. **Create Heroku account** and install Heroku CLI
   ```bash
   npm install -g heroku
   heroku login
   ```

2. **Create Heroku app**
   ```bash
   heroku create your-app-name
   ```

3. **Set environment variables**
   ```bash
   heroku config:set PORT=5000
   heroku config:set MONGODB_URI=<your_mongodb_uri>
   heroku config:set ACCESS_TOKEN_SECRET=<your_secret>
   heroku config:set REFRESH_TOKEN_SECRET=<your_secret>
   ```

4. **Deploy**
   ```bash
   git push heroku main
   heroku logs --tail
   ```

### Option 2: Deploy on AWS (EC2)

1. **Launch EC2 instance** (Ubuntu 22.04)
   ```bash
   sudo apt update && sudo apt upgrade -y
   sudo apt install nodejs npm -y
   ```

2. **Clone repository and install dependencies**
   ```bash
   git clone <repository-url>
   cd <project-folder>
   npm install
   ```

3. **Setup environment variables**
   ```bash
   nano .env
   # Add your environment variables
   ```

4. **Install PM2 for process management**
   ```bash
   npm install -g pm2
   pm2 start server.js --name "finance-api"
   pm2 startup
   pm2 save
   ```

5. **Setup Nginx as reverse proxy**
   ```bash
   sudo apt install nginx -y
   # Configure nginx to forward requests to port 5000
   sudo nano /etc/nginx/sites-available/default
   ```

6. **Setup SSL with Let's Encrypt**
   ```bash
   sudo apt install certbot python3-certbot-nginx -y
   sudo certbot --nginx -d your-domain.com
   ```

### Option 3: Deploy with Docker

1. **Create Dockerfile**
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   EXPOSE 5000
   CMD ["npm", "start"]
   ```

2. **Create docker-compose.yml**
   ```yaml
   version: '3.8'
   services:
     api:
       build: .
       ports:
         - "5000:5000"
       environment:
         - MONGODB_URI=mongodb://mongo:27017/finance
         - PORT=5000
       depends_on:
         - mongo
     mongo:
       image: mongo:5.0
       ports:
         - "27017:27017"
       volumes:
         - mongo-data:/data/db
   volumes:
     mongo-data:
   ```

3. **Run with Docker**
   ```bash
   docker-compose up -d
   ```

### Option 4: Deploy on DigitalOcean App Platform

1. **Push code to GitHub**
2. **Connect GitHub repository** to DigitalOcean
3. **Configure environment variables** in App Platform dashboard
4. **Deploy automatically** on push to main branch

### Option 5: Deploy on Railway

1. **Connect GitHub repository** to Railway
2. **Add environment variables** via Railway dashboard
3. **Deploy** - Railway auto-detects Node.js project
4. **Add MongoDB** from Railway's service marketplace

### Production Checklist

- [ ] Environment variables properly configured
- [ ] HTTPS/SSL certificate enabled
- [ ] CORS properly configured for frontend domain
- [ ] Database backups scheduled
- [ ] Logging and monitoring setup (e.g., Sentry, LogRocket)
- [ ] Rate limiting enabled
- [ ] Input validation on all endpoints
- [ ] Error handling customized (no stack traces exposed)
- [ ] Security headers added (helmet.js)
- [ ] Database indexes optimized
- [ ] PM2/Docker container restarting on failure
- [ ] Monitoring alerts configured
- [ ] Database connection pooling optimized

### Monitoring & Maintenance

* **Application Monitoring** - Use New Relic, DataDog, or Sentry
* **Database Monitoring** - Monitor MongoDB performance and resource usage
* **Uptime Monitoring** - Set up UptimeRobot or similar service
* **Log Aggregation** - Use ELK Stack or Splunk for centralized logging
* **Performance Metrics** - Track API response times and error rates

---
