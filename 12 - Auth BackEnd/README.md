# Auth Backend

This is the backend API for the authentication project. It follows a simple MVC structure using Node.js, Express, MongoDB, bcryptjs, and JSON Web Tokens (JWT).

## Features

- User registration
- User login
- Password hashing with `bcryptjs`
- JWT-based authentication
- MongoDB storage for users
- CORS enabled for frontend communication

## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT
- bcryptjs
- dotenv

## MVC Structure

- `server.js` — entry point for the application
- `routes/authRoutes.js` — API route definitions
- `controllers/authController.js` — login and register logic
- `models/authModel.js` — user schema and MongoDB model
- `config/db.js` — MongoDB connection setup

## Environment Variables

Create a `.env` file in the backend folder with:

```env
MONGO_URI=your_mongodb_connection_string
PORT=3000
TOKEN_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173
```

## Installation

```bash
npm install
```

## Run the Server

```bash
node server.js
```

The server will start on:

```text
http://localhost:3000
```

## API Endpoints

### 1) Register User

**POST** `/api/register`

#### Example Request

```bash
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Chorvadi Krushi",
    "email": "admin@gmail.com",
    "password": "123456",
    "gender": "Male",
    "hobby": "Reading, Coding, Travel"
  }'
```

#### Success Response

```json
{
  "success": true,
  "message": "Registration successful"
}
```

#### Failure Response

```json
{
  "success": false,
  "message": "Illegal arguments: undefined, number"
}
```

---

### 2) Login User

**POST** `/api/login`

#### Example Request

```bash
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "mail",
    "password": "pass"
  }'
```

#### Success Response

```json
{
  "accessToken": "eyJhbGciOXXa7jDsE",
  "user": {
    "name": "namXXX",
    "email": "XXX@XX.com",
    "gender": "XX",
    "hobby": "XX, XX, XX"
  }
}
```

#### Failure Response

```json
{
  "success": false,
  "message": "User not found"
}
```

## Test Cases

### Register Test Cases

1. Successful registration with valid name, email, password, gender, and hobby.
2. Duplicate email should return:
   ```json
   {
     "success": false,
     "message": "Email already exists"
   }
   ```
3. Missing or invalid fields should return a server error response.

### Login Test Cases

1. Successful login with correct email and password.
2. Login with wrong email should return:
   ```json
   {
     "success": false,
     "message": "User not found"
   }
   ```
3. Login with wrong password should return:
   ```json
   {
     "success": false,
     "message": "Invalid credentials"
   }
   ```

## Live Test Cases

### 1) Register User

```bash
curl -X POST https://api-jwt-auth-q98v.onrender.com/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Chorvadi Krushi",
    "email": "admin@gmail.com",
    "password": "123456",
    "gender": "Male",
    "hobby": "Reading, Coding, Travel"
  }'
```

### 2) Login User

```bash
curl -X POST https://api-jwt-auth-q98v.onrender.com/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@gmail.com",
    "password": "123456"
  }'

## Notes

- The JWT token returned from login is used by the frontend to protect the `/home` route.
- Make sure the backend server is running before testing the frontend.
- The frontend should send the token in the `Authorization` header for future protected routes.
