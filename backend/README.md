# Users-Posts Backend

This is the backend server for the Web Developer Assignment, built with Node.js, TypeScript, Express.js, and SQLite3. It includes comprehensive API documentation with Swagger UI and Docker deployment support.

## Features

- **RESTful API** for users and posts management
- **Swagger UI Documentation** - Interactive API documentation
- **Docker Support** - Containerized deployment with Docker Compose
- **TypeScript** - Type-safe development
- **SQLite Database** - Lightweight database with persistence

## Prerequisites

- Node.js (v18 or higher)
- TypeScript
- npm
- SQLite3
- Docker & Docker Compose (for containerized deployment)

## Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Build the project:
   ```bash
   npm run build
   ```
   This will compile TypeScript files from `src/` into JavaScript in the `dist/` directory.

## Running the Server

Start the server in production mode:

```bash
npm start
```

For development mode with hot reloading:

```bash
npm run dev
```

For development mode without hot reloading (runs once with ts-node):

```bash
npm run dev:once
```

## API Documentation

The API includes comprehensive Swagger UI documentation available at:

**http://localhost:3001/api-docs**

### Available Endpoints

#### Users API
- `GET /users` - Get paginated list of users
- `GET /users/count` - Get total count of users
- `GET /users/:id` - Get user by ID

#### Posts API
- `GET /posts?userId=...` - Get posts for a specific user
- `POST /posts` - Create a new post
- `DELETE /posts/:id` - Delete post by ID

## Docker Deployment

### Quick Start with Docker Compose

1. **Build and start the application:**
   ```bash
   npm run docker:compose:build
   ```

2. **Access the application:**
   - API: http://localhost:3001
   - Swagger UI: http://localhost:3001/api-docs

3. **View logs:**
   ```bash
   npm run docker:compose:logs
   ```

4. **Stop the application:**
   ```bash
   npm run docker:compose:down
   ```

### Docker Commands

- `npm run docker:build` - Build Docker image
- `npm run docker:run` - Run container directly
- `npm run docker:compose:up` - Start with Docker Compose
- `npm run docker:compose:down` - Stop services
- `npm run docker:compose:logs` - View container logs
- `npm run docker:compose:build` - Build and start with Docker Compose

### Manual Docker Build

```bash
# Build the image
docker build -t users-posts-backend .

# Run the container
docker run -p 3001:3001 users-posts-backend
```

## Project Structure

```
backend/
├── src/
│   ├── routes/         # API route handlers
│   ├── db/            # Database models and queries
│   ├── swagger.ts     # Swagger configuration
│   └── index.ts       # Main application entry point
├── config/            # Configuration files
├── dist/             # Compiled JavaScript files (generated after build)
├── data.db           # SQLite database file
├── Dockerfile        # Docker image configuration
├── docker-compose.yml # Docker Compose configuration
└── .dockerignore     # Docker build context exclusions
```

## Development vs Production

### Development Mode
- Runs directly with ts-node and nodemon for hot reloading
- TypeScript files are executed directly without compilation
- Automatic restart on file changes

### Production Mode
- TypeScript files must be compiled to JavaScript in `dist/` directory
- Runs compiled JavaScript files for better performance
- Optimized for production deployment

## Database

- **SQLite3** database stored in `data.db`
- Database persistence is maintained in Docker containers through volume mounting
- Automatic database initialization on first run

## Configuration

The application uses the `config` package for environment-specific settings:
- Default configuration in `config/default.json`
- Port: 3001 (configurable)
- Database path: `./data.db`

## Health Checks

The Docker setup includes health checks that verify the API is responding:
- Endpoint: `GET /users/count`
- Interval: 30 seconds
- Timeout: 10 seconds
- Start period: 40 seconds
