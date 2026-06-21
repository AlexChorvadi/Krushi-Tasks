**Live:** [Web](https://password-reset-krushi.netlify.app/)

# Password Reset Web Application

A full-stack web application for secure password reset functionality using React, Vite, Node.js, Express, and Brevo for email verification.

## 🎯 Features

- User authentication and password management
- Secure password reset via email verification
- Email verification with OTP/Token
- Responsive UI built with React and Vite
- RESTful API backend with Express.js
- MongoDB database integration
- Email notifications using Brevo

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **Vite** - Build tool and dev server
- **JavaScript/CSS** - Styling and scripting

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Brevo** - Email service
- **Mongoose** - MongoDB ODM

## 📁 Project Structure

```
Password Reset/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── App.css
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   ├── eslint.config.js
│   └── .env
├── backend/
│   ├── controllers/
│   │   └── authController.js
│   ├── models/
│   │   └── authModel.js
│   ├── routes/
│   │   └── authRoutes.js
│   ├── config/
│   │   ├── db.js
│   │   └── mail_transporter.js
│   ├── server.js
│   ├── package.json
│   └── .env
└── README.md
```

## ⚙️ Environment Variables Setup

### Frontend (.env)
```
VITE_API_BASE_URL=http://localhost:3000/api
```

### Backend (.env)
```
MONGO_URI=mongodb://username:password@localhost:27017/password-reset-db
PORT=3000
FRONTEND_URL=http://localhost:5173
BREVO_SENDER_EMAIL=your-email@gmail.com
Brevo_API_KEY=Brevo-api
```

**Note:** For Gmail, use an [App Password](https://support.google.com/accounts/answer/185833) instead of your regular password.

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn package manager

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory with the required environment variables (see above)

4. Start the backend server:
```bash
npm start
```

The server will run on `http://localhost:3000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd ../frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory with the required environment variables (see above)

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

# Forgot Password API - Live

Base URL: `https://password-reset-ajfj.onrender.com/api`

This collection covers the full authentication and password reset flow, including user registration, login, forgot password, token verification, and password reset.

---

## Endpoints

### 1. Register

**POST** `/register`

Registers a new user.

**Request Body (JSON):**

| Parameter  | Type   | Required | Description          |
|------------|--------|----------|----------------------|
| `name`     | string | Yes      | Full name of the user |
| `email`    | string | Yes      | User's email address  |
| `password` | string | Yes      | User's password       |

**Example:**
```json
{
  "name": "your name",
  "email": "yourmail@domain.com",
  "password": "123456"
}
```

---

### 2. Login

**POST** `/login`

Authenticates an existing user.

**Request Body (JSON):**

| Parameter  | Type   | Required | Description          |
|------------|--------|----------|----------------------|
| `email`    | string | Yes      | User's email address  |
| `password` | string | Yes      | User's password       |

**Example:**
```json
{
  "email": "yourmail@domain.com",
  "password": "123456"
}
```

---

### 3. Forgot Password

**POST** `/forgot`

Sends a password reset token to the user's email.

**Request Body (JSON):**

| Parameter | Type   | Required | Description          |
|-----------|--------|----------|----------------------|
| `email`   | string | Yes      | User's email address  |

**Example:**
```json
{
  "email": "yourmail@domain.com"
}
```

---

### 4. Verify Token

**POST** `/verify-token`

Verifies the password reset token received via email.

**Request Body (JSON):**

| Parameter    | Type   | Required | Description                        |
|--------------|--------|----------|------------------------------------|
| `resetToken` | string | Yes      | The reset token sent to the user's email |

**Example:**
```json
{
  "resetToken": "c94b624e6efab757f59a3d17cfdc6c2827a5a8bcd4e97ee0507904036f40638a"
}
```

---

### 5. Reset Password

**POST** `/reset-password`

Resets the user's password using the verified reset token.

**Request Body (JSON):**

| Parameter    | Type   | Required | Description                        |
|--------------|--------|----------|------------------------------------|
| `resetToken` | string | Yes      | The reset token sent to the user's email |
| `email`      | string | Yes      | User's email address                |
| `password`   | string | Yes      | The new password to set             |

**Example:**
```json
{
  "resetToken": "c94b624e6efab757f59a3d17cfdc6c2827a5a8bcd4e97ee0507904036f40638a",
  "email": "yourmail@domain.com",
  "password": "newPassword"
}
```

---

## Flow Summary

1. **Register** a new user account.
2. **Login** with your credentials.
3. If you forget your password, call **Forgot Password** with your email to receive a reset token.
4. **Verify Token** to confirm the reset token is valid.
5. **Reset Password** using the token, your email, and the new password.


## 🚀 Usage

### User Flow

1. **Register** - Create a new account with email and password
2. **Login** - Log in with credentials
3. **Forgot Password** - Click "Forgot Password" link
4. **Email Verification** - Enter email address to receive reset link/OTP
5. **Reset Password** - Follow link or enter OTP to verify identity
6. **Set New Password** - Enter and confirm new password
7. **Success** - Redirect to login with new credentials

## 📧 Email Configuration

The application uses Brevo to send password reset emails. Ensure you have:

- Valid email service configured (Gmail, SendGrid, etc.)
- Email credentials stored securely in `.env`
- SMTP settings configured in `config/mail_transporter.js`

## 🔒 Security Features

- Passwords hashed using bcrypt
- Secure token generation for password reset
- Email verification for account recovery
- CORS protection
- Environment variables for sensitive data

## 🐛 Troubleshooting

### Common Issues

1. **"Connection refused" error**
   - Ensure MongoDB is running
   - Check MONGO_URI in .env

2. **"Email not sending" error**
   - Verify EMAIL and EMAIL_PASS in .env
   - Enable "Less Secure App Access" (for Gmail) or use App Password
   - Check SMTP configuration

3. **CORS errors**
   - Verify FRONTEND_URL matches actual frontend URL
   - Check CORS configuration in Express

4. **Vite dev server not loading**
   - Clear node_modules and reinstall: `npm install`
   - Check port 5173 is not in use
