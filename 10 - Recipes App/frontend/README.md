# Recipes App

A simple Recipes application with an Express/MongoDB backend and a React (Vite) frontend.

**Contents**
- Overview
- Folder structure
- API endpoints
- Schema
- Installation & run
- Environment variables
- Sample requests
- Development notes

## Overview
This project provides a backend API to manage recipes and a frontend client to view/create/update/delete recipes.

## Folder structure
- backend/
  - config/
    - db.js           # MongoDB connection
  - controllers/
    - recipeController.js
  - models/
    - recipeModel.js
  - routes/
    - recipeRoutes.js
  - server.js         # Express app entry
  - package.json
- frontend/
  - public/
  - src/
    - components/
    - App.jsx
    - main.jsx
  - package.json
- README.md

## API Endpoints
Base URL: http://localhost:3000/api

- GET /recipes/getAll
  - Description: Get all recipes
  - Response: 200 OK, array of recipes

- POST /recipes/create
  - Description: Create a new recipe
  - Body (JSON):
    - title: string (required)
    - ingredients: array of strings (required)
    - cookingTime: number (required)
    - category: string (optional)
    - isVegetarian: boolean (optional)
  - Response: 201 Created, created recipe object

- GET /recipes/byId/:id
  - Description: Get a recipe by MongoDB _id
  - Response: 200 OK, recipe object or 404 if not found

- PUT /recipes/update/:id
  - Description: Update a recipe by _id
  - Body: fields to update (same shape as create)
  - Response: 200 OK, updated recipe or 404 if not found

- DELETE /recipes/delete/:id
  - Description: Delete a recipe by _id
  - Response: 200 OK, deleted recipe or 404 if not found

Note: All routes are mounted under `/api`, so the full path is e.g. `http://localhost:3000/api/recipes/getAll`.

## Schema (backend/models/recipeModel.js)
- `title`: String (required)
- `ingredients`: [String] (required)
- `cookingTime`: Number (required)
- `category`: String (default: "General")
- `isVegetarian`: Boolean (default: true)

## Installation & Run
Prerequisites:
- Node.js 18+ (or compatible)
- npm or yarn
- MongoDB instance (local or Atlas)

Backend
```bash
cd "10 - Recipes App/backend"
npm install
# create a .env file with MONGO_URI (see Environment variables)
# start with node:
node server.js
# or with nodemon (if installed):
nodemon server.js
```

Frontend
```bash
cd "10 - Recipes App/frontend"
npm install
npm run dev
```

The frontend expects the backend API at `http://localhost:3000/api` by default. If you run the backend on a different port or host, update the frontend axios base URL accordingly.

## Environment variables
Create a `.env` file in `backend/` with:

```
MONGO_URI=your_mongo_connection_string
PORT=3000  # optional
```

## Sample requests (curl)
- Get all recipes
```bash
curl http://localhost:3000/api/recipes/getAll
```

- Create a recipe
```bash
curl -X POST http://localhost:3000/api/recipes/create \
  -H "Content-Type: application/json" \
  -d '{"title":"Pasta","ingredients":["pasta","tomato"],"cookingTime":20}'
```

- Update a recipe
```bash
curl -X PUT http://localhost:3000/api/recipes/update/<id> \
  -H "Content-Type: application/json" \
  -d '{"cookingTime":25}'
```

- Delete a recipe
```bash
curl -X DELETE http://localhost:3000/api/recipes/delete/<id>
```

## Development notes
- Backend routes are in `backend/routes/recipeRoutes.js` and mounted at `/api` in `server.js`.
- The model uses timestamps; createdAt/updatedAt are available.
- Frontend is a Vite + React app located in `frontend/`.

## Contributing
Feel free to open issues or create pull requests for improvements. Add tests and update documentation when changing APIs.

## License
Add a license as needed.
