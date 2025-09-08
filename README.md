# SavannaTech Web Development Assignment

A full-stack web application built with React/TypeScript frontend and Node.js/Express backend, featuring user and post management with comprehensive API documentation.

## 🏗️ Architecture

- **Frontend**: React 19 + TypeScript + Vite + TailwindCSS + Shadcn UI
- **Backend**: Node.js + Express + TypeScript + SQLite3
- **API Documentation**: Swagger UI
- **State Management**: React Query (TanStack Query)
- **Testing**: Jest + React Testing Library
- **Deployment**: Docker + Docker Compose

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm
- Docker & Docker Compose (for containerized deployment)

### 1. Clone the Repository

```bash
git clone https://github.com/aiyeola/savannatech-web-dev-assignment.git
cd savannatech-web-dev-assignment
```

### 2. Local Development

#### Backend Setup

```bash
cd backend
npm install
npm run dev
```

The backend server will start on `http://localhost:3001`

#### Frontend Setup

```bash
cd frontend
npm install

# Create .env file for API configuration
cp .env.example .env
# Or manually create .env with:
# VITE_API_URL="http://localhost:3001"

npm run dev
```

The frontend will start on `http://localhost:5173`

> **Note**: The frontend requires the `VITE_API_URL` environment variable to connect to the backend API. For local development, use `http://localhost:3001`.

### 3. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001
- **API Documentation**: http://localhost:3001/api-docs

## 📁 Project Structure

```
savannatech-web-dev-assignment/
├── backend/                 # Node.js/Express API server
│   ├── src/
│   │   ├── routes/         # API route handlers
│   │   ├── db/            # Database models and queries
│   │   ├── swagger.ts     # API documentation config
│   │   └── index.ts       # Server entry point
│   ├── config/            # Environment configuration
│   ├── data/              # SQLite database files
│   ├── Dockerfile         # Backend container config
│   ├── docker-compose.yml # Docker orchestration
│   └── package.json
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utilities and configurations
│   │   ├── pages/         # Page components
│   │   └── App.tsx        # Main app component
│   ├── public/            # Static assets
│   └── package.json
└── README.md
```

## 🔧 Development Commands

### Backend Commands

```bash
# Development with hot reload
npm run dev

# Build TypeScript
npm run build

# Production mode
npm start

# Development (single run)
npm run dev:once
```

### Frontend Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Lint code
npm run lint

# Preview production build
npm run preview
```

## 🐳 Docker Deployment

### Using Docker Compose (Recommended)

```bash
# Navigate to backend directory
cd backend

# Build and start the application
npm run docker:compose:build

# View logs
npm run docker:compose:logs

# Stop services
npm run docker:compose:down
```

### Manual Docker Build

```bash
cd backend

# Build the image
docker build -t users-posts-backend .

# Run the container
docker run -p 3001:3001 users-posts-backend
```

### Production Access

- **API**: https://savannatech-web-dev-assignment-production.up.railway.app
- **API Documentation**: https://savannatech-web-dev-assignment-production.up.railway.app/api-docs

## 📚 API Endpoints

### Users API

- `GET /users` - Get paginated list of users
- `GET /users/count` - Get total count of users
- `GET /users/:id` - Get user by ID

### Posts API

- `GET /posts?userId=...` - Get posts for a specific user
- `POST /posts` - Create a new post
- `DELETE /posts/:id` - Delete post by ID

For detailed API documentation with request/response schemas, visit the Swagger UI at `/api-docs`.

## 🧪 Testing

### Frontend Tests

```bash
cd frontend
npm test
```

Tests are built with Jest and React Testing Library, covering:

- Component rendering and interaction
- Custom hooks
- API integration
- Error handling

## 🛠️ Technologies & Libraries

### Frontend Stack

- **React 19** - UI library with latest features
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and development server
- **TailwindCSS** - Utility-first CSS framework
- **Shadcn UI** - Modern component library
- **React Query** - Server state management
- **React Router** - Client-side routing
- **React Hook Form + Zod** - Form handling and validation
- **Axios** - HTTP client
- **Lucide React** - Icon library

### Backend Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **TypeScript** - Type-safe development
- **SQLite3** - Lightweight database
- **Swagger** - API documentation
- **CORS** - Cross-origin resource sharing
- **UUID** - Unique identifier generation

## 🚀 Deployment Options

### Development

- Local development with hot reloading
- Separate frontend and backend servers

### Production

- Docker containerization
- Railway cloud deployment
- Volume-mounted data persistence
- Health monitoring and restart policies

## 🔄 Development Workflow

1. **Backend First**: Start the backend API server
2. **Frontend Development**: Run frontend in development mode
3. **API Testing**: Use Swagger UI for API testing
4. **Integration Testing**: Test full-stack functionality
5. **Docker Testing**: Validate containerized deployment

## 📝 Configuration

### Backend Configuration

- Port: 3001 (configurable via environment)
- Database: SQLite (`./data/data.db`)
- CORS: Enabled for frontend origin
- Environment: Development/Production modes

### Frontend Configuration

- Port: 5173 (Vite default)
- API Base URL: Configured via `VITE_API_URL` environment variable
- Build Output: `dist/` directory
- Environment Variables:
  - `VITE_API_URL` - Backend API URL (required)
