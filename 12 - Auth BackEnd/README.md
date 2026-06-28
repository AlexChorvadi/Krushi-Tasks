# [Postman Documentation](https://documenter.getpostman.com/view/54478653/2sBXwvK9Mi)

# Auth Backend

Simple authentication backend built with Node.js, Express, MongoDB, JWT, and bcrypt.

## Features

* User Registration
* User Login
* JWT Authentication
* Protected Profile Route
* Password Hashing with bcrypt
* MongoDB Database

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs
* dotenv

## Project Structure

```text
├── config
│   └── db.js
├── controllers
│   └── authController.js
├── models
│   └── authModel.js
├── routes
│   └── authRoutes.js
├── .env
├── server.js
```

## Environment Variables

Create a `.env` file:

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

## Run Server

```bash
node server.js
```

Server runs on:

```text
http://localhost:3000
```

## API Endpoints

### Register

**POST** `/api/register`

```json
{
  "name": "Krushi",
  "email": "admin@gmail.com",
  "password": "123456",
  "gender": "Male",
  "hobby": "Reading, Coding"
}
```

### Login

**POST** `/api/login`

```json
{
  "email": "admin@gmail.com",
  "password": "123456"
}
```

Response:

```json
{
  "accessToken": "jwt_token",
  "user": {
    "name": "Krushi",
    "email": "admin@gmail.com",
    "gender": "Male",
    "hobby": "Reading, Coding"
  }
}
```

### Profile (Protected Route)

**GET** `/api/profile`

Headers:

```text
Authorization: Bearer <token>
```

Response:

```json
{
  "success": true,
  "user": {
    "name": "Krushi",
    "email": "admin@gmail.com",
    "gender": "Male",
    "hobby": "Reading, Coding"
  }
}
```

## Live API

Base URL:

```text
https://api-jwt-auth-q98v.onrender.com
```

## Notes

* Passwords are securely hashed using bcrypt.
* JWT token is generated after successful login.
* Protected routes require a valid Bearer Token.
* Built using MVC architecture.
