# Portfolio Project

A full-stack portfolio website featuring a React frontend and FastAPI backend for stock market anomaly detection.

## Project Structure

```
portfolio/
├── frontend/          # React application
├── backend/           # Python FastAPI application
└── README.md         # This file
```

---

## Frontend Setup (React)

The frontend is a React-based portfolio website.

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation

```bash
cd frontend
npm install
```

### Development

Run the development server:
```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Production Build

Build the app for production:
```bash
npm run build
```

The build files will be in the `frontend/build/` folder.

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

---

## Backend Setup (Python FastAPI)

The backend is a FastAPI application for stock market anomaly detection.

### Prerequisites
- Python 3.8 or higher
- pip

### Installation

```bash
cd backend
python -m venv .venv

# Activate virtual environment
# Windows:
.venv\Scripts\activate
# Mac/Linux:
source .venv/bin/activate

pip install -r requirements.txt
```

### Development

Run the FastAPI server:
```bash
uvicorn api.main:app --reload
```

The API will be available at:
- API: [http://localhost:8000](http://localhost:8000)
- Interactive docs: [http://localhost:8000/docs](http://localhost:8000/docs)

### API Features

- Stock market anomaly detection
- Date-based query system
- Monthly reporting
- Real-time analysis endpoints

For detailed backend documentation, see [backend/README.md](backend/README.md).

---

## Running Both Frontend and Backend

1. **Start Backend** (Terminal 1):
   ```bash
   cd backend
   .venv\Scripts\activate  # Windows
   uvicorn api.main:app --reload
   ```

2. **Start Frontend** (Terminal 2):
   ```bash
   cd frontend
   npm start
   ```

The frontend will communicate with the backend API for data analysis features.

---

## Deployment

### Frontend (Render/Netlify/Vercel)

For Render deployment:
- **Root Directory**: `frontend`
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `build`

### Backend

The backend can be deployed separately to any Python hosting service.

---

## Learn More

- [Create React App Documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [React Documentation](https://reactjs.org/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)

---

## License

This project is private and proprietary.
