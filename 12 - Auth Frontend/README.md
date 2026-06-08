# Auth Frontend

This is the frontend part of the authentication project. It provides three main routes:

- `/login` — user login page
- `/register` — user registration page
- `/profile` — protected dashboard page available only when a valid JWT token exists

## Features

- User registration
- User login
- JWT token storage in `localStorage`
- Protected route for `/profile`
- Redirect to login if the token is missing

## Tech Stack

- React
- Vite
- React Router DOM
- Axios

## Project Structure

- `src/pages/Login.jsx` — login form
- `src/pages/Register.jsx` — registration form
- `src/pages/Home.jsx` — protected home/dashboard page
- `src/routes/ProtectedRoutes.jsx` — route protection logic
- `src/App.jsx` — route configuration

## Routes

| Route | Description | Access |
|------|-------------|--------|
| `/login` | Login page | Public |
| `/register` | Registration page | Public |
| `/profile` | Protected home page | Private (JWT required) |

## Authentication Flow

1. User registers on `/register`.
2. User logs in on `/login`.
3. On successful login, the backend returns an access token.
4. The frontend stores the token in `localStorage`.
5. The `/profile` route checks for the token using `ProtectedRoutes.jsx`.
6. If no token is found, the user is redirected back to `/login`.

## Environment Variable

Create a `.env` file in this folder and set your backend API base URL:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

## Installation

```bash
npm install
```

## Run the Project

```bash
npm run dev
```

The app will start on the Vite development server.