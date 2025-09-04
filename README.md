## Running the Application Locally

Follow these steps to set up and run both the backend and frontend applications:

### Backend Setup

1. **Install Dependencies**

```bash
cd backend
npm install
```

2. **Set Up the Database**

- The SQLite database file (`data.db`) is included. No manual setup is required.

3. **Start the Backend Server**

```bash
npm run dev
```

- The backend server will start on the configured port (default: `http://localhost:3001`).

### Frontend Setup

1. **Install Dependencies**

```bash
cd frontend
npm install
```

2. **Start the Frontend Application**

```bash
npm run dev
```

- The frontend will start on `http://localhost:5173` by default.

### Accessing the Application

- Browser should open and navigate to `http://localhost:5173` to use the web UI.
- Ensure the backend server is running for API requests to work.

### Additional Notes

- Unit tests can be run using:
  ```bash
  npm test
  ```
  in the frontend directory.
