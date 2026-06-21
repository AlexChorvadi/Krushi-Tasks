[Postman Documentation](https://documenter.getpostman.com/view/54478653/2sBXwvK9Mi)

# JWT Auth API

A RESTful API for JWT-based user authentication. This collection covers user registration, login, and profile retrieval using JSON Web Tokens (JWT).

**Base URL:** `https://api-jwt-auth-q98v.onrender.com`

---

## Authentication

Protected endpoints require a valid JWT Bearer token in the `Authorization` header:

```
Authorization: Bearer <your_jwt_token>
```

The token is obtained from the **Login** endpoint and stored in the `{{supabase_service_role_api_key_0n9l}}` vault variable.

---

## Endpoints

### 1. Register

**POST** `/api/register`

Registers a new user account in the system.

#### Request Body (`application/json`)

| Field      | Type   | Required | Description                                  |
|------------|--------|----------|----------------------------------------------|
| `name`     | string | Yes      | Full name of the user                        |
| `email`    | string | Yes      | Email address (must be unique)               |
| `password` | string | Yes      | Password for the account                     |
| `gender`   | string | Yes      | Gender of the user (e.g. `Male`, `Female`)   |
| `hobby`    | string | No       | Comma-separated list of the user's hobbies   |

#### Example Request

```json
{
  "name": "Chorvadi Krushi",
  "email": "krushi@gmail.com",
  "password": "123456",
  "gender": "Male",
  "hobby": "fun, sleep, eat, etc"
}
```

#### Notes
- On success, the server returns a confirmation of the newly created user.
- The `email` field must be unique across all registered users.

---

### 2. Login

**POST** `/api/login`

Authenticates a user with their email and password. On success, returns a signed JWT access token along with the user's profile information.

#### Request Body (`application/json`)

| Field      | Type   | Required | Description                       |
|------------|--------|----------|-----------------------------------|
| `email`    | string | Yes      | The registered email of the user  |
| `password` | string | Yes      | The account password              |

#### Example Request

```json
{
  "email": "krushi@gmail.com",
  "password": "123456"
}
```

#### Example Response (`200 OK`)

```json
{
  "accessToken": "<JWT token>",
  "user": {
    "name": "Chorvadi Krushi",
    "email": "krushi@gmail.com",
    "gender": "Male",
    "hobby": "fun, sleep, eat, etc"
  }
}
```

| Field         | Type   | Description                                      |
|---------------|--------|--------------------------------------------------|
| `accessToken` | string | Signed JWT token to be used for protected routes |
| `user`        | object | Authenticated user's profile information         |

---

### 3. Profile

**GET** `/api/profile`

Retrieves the authenticated user's profile information. Requires a valid JWT Bearer token.

#### Headers

| Key             | Value                                           | Required |
|-----------------|-------------------------------------------------|----------|
| `Authorization` | `Bearer {{supabase_service_role_api_key_0n9l}}` | Yes      |

No request body is required.

#### Example Response (`200 OK`)

```json
{
  "success": true,
  "user": {
    "name": "Chorvadi Krushi",
    "email": "krushi@gmail.com",
    "gender": "Male",
    "hobby": "fun, sleep, eat, etc"
  }
}
```

---

## Variables

| Variable                            | Scope | Description                                      |
|-------------------------------------|-------|--------------------------------------------------|
| `supabase_service_role_api_key_0n9l`| Vault | JWT Bearer token obtained after a successful login |
| `bearer_token_19e6`                 | Vault | Alternative Bearer token variable                |

---

## Getting Started

1. **Register** a new user using the `/api/register` endpoint.
2. **Login** with your credentials via `/api/login` to receive a JWT `accessToken`.
3. Store the token in the `supabase_service_role_api_key_0n9l` vault variable.
4. Use the **Profile** endpoint to retrieve your user details — the token will be sent automatically via the `Authorization` header.
