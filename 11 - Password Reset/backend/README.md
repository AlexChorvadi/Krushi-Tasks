# Forgot Password API

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
