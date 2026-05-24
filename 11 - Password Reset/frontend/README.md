# Password Reset Web Application

A full-stack web application for secure password reset functionality using React, Vite, Node.js, Express, and Nodemailer for email verification.

## 🎯 Features

- User authentication and password management
- Secure password reset via email verification
- Email verification with OTP/Token
- Responsive UI built with React and Vite
- RESTful API backend with Express.js
- MongoDB database integration
- Email notifications using Nodemailer

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **Vite** - Build tool and dev server
- **JavaScript/CSS** - Styling and scripting

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Nodemailer** - Email service
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
EMAIL=your-email@gmail.com
EMAIL_PASS=your-email-password-or-app-password
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

## 🔌 API Endpoints

### Authentication Routes

#### 1. **Register User**
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

#### 2. **Login User**
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### 3. **Forgot Password (Request Reset)**
```http
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "user@example.com"
}
```
**Response:** Sends verification link/OTP to email

#### 4. **Verify Reset Token**
```http
POST /api/auth/verify-token
Content-Type: application/json

{
  "token": "reset-token-from-email"
}
```

#### 5. **Reset Password**
```http
POST /api/auth/reset-password
Content-Type: application/json

{
  "token": "reset-token-from-email",
  "newPassword": "newpassword123"
}
```

#### 6. **Verify Email OTP**
```http
POST /api/auth/verify-otp
Content-Type: application/json

{
  "email": "user@example.com",
  "otp": "123456"
}
```

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

The application uses Nodemailer to send password reset emails. Ensure you have:

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
