# Product Gallery

Product Gallery is a full-stack product management application. It provides a simple interface for browsing products and creating, updating, and deleting product records backed by MongoDB.

## Features

- View all products in a responsive gallery
- Create products with a name, price, and image URL
- Update existing products
- Delete products
- Toggle between light and dark color modes
- REST API for product management

## Tech stack

- **Frontend:** React, Vite, React Router, Zustand, Chakra UI
- **Backend:** Node.js, Express
- **Database:** MongoDB with Mongoose

## Project structure

```text
.
├── backend/
│   ├── config/          # Database connection
│   ├── controller/      # Product request handlers
│   ├── models/          # Mongoose models
│   ├── routes/          # Express routes
│   └── server.js        # API server entry point
├── frontend/
│   ├── src/
│   │   ├── components/  # Shared UI components
│   │   ├── pages/       # Application pages
│   │   └── store/       # Zustand product store
│   └── vite.config.js   # Development API proxy
└── package.json         # Backend scripts and dependencies
```

## Prerequisites

- Node.js 18 or newer
- npm
- A running MongoDB instance or a MongoDB Atlas connection string

## Getting started

1. Clone the repository and enter the project directory:

   ```bash
   git clone https://github.com/Harshil607/Product-Gallery
   cd Product-Gallery
   ```

2. Install backend dependencies:

   ```bash
   npm install
   ```

3. Install frontend dependencies:

   ```bash
   cd frontend
   npm install
   cd ..
   ```

4. Create a `.env` file in the project root:

   ```env
   MONGO_URI=mongodb://127.0.0.1:27017/product-gallery
   PORT=5000
   ```

   `PORT` is optional and defaults to `5000`. Use your MongoDB Atlas connection string instead of the local value when applicable.

## Running the application

Start the backend from the project root:

```bash
npm run dev
```

In a second terminal, start the frontend:

```bash
cd frontend
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`. During development, Vite proxies requests from `/api` to the backend at `http://localhost:5000`.

## API endpoints

The backend exposes product endpoints under `/api/products`.

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/products` | Return all products |
| `POST` | `/api/products` | Create a product |
| `PUT` | `/api/products/:id` | Update a product |
| `DELETE` | `/api/products/:id` | Delete a product |

Product request bodies use the following shape:

```json
{
  "name": "Example product",
  "price": 29.99,
  "image": "https://example.com/product.jpg"
}
```

## Available scripts

### Backend

Run the backend with automatic restarts during development:

```bash
npm run dev
```

### Frontend

Run the Vite development server:

```bash
npm run dev
```

Build the frontend for production:

```bash
npm run build
```

Lint the frontend:

```bash
npm run lint
```

Preview a production frontend build:

```bash
npm run preview
```
