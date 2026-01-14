# Face Detection System - Project 2

A production-ready face detection system using CNN-based Haar Cascade classifier with FastAPI backend and React frontend.

## 🎯 Features

- **Real-time Face Detection**: Accurate multi-face detection using Haar Cascade CNN
- **Bounding Box Visualization**: Animated bounding boxes with confidence scores
- **Drag & Drop Upload**: Easy image upload interface
- **Detailed Results**: Face count, positions, confidence scores, and dimensions
- **Responsive Design**: Works on desktop and mobile devices
- **Portfolio Integration**: Seamlessly integrated with main portfolio

## 🏗️ Project Structure

```
project2/
├── backend/
│   ├── main.py                 # FastAPI application
│   ├── detector.py             # Face detection module
│   ├── requirements.txt        # Python dependencies
│   ├── setup_backend.bat       # Setup script (with venv)
│   ├── start_backend.bat       # Start script (with venv)
│   ├── start_backend_direct.bat # Start script (direct, no venv)
│   └── test_detector.py        # Backend test script
└── frontend/
    ├── FaceDetection.jsx       # React component
    └── face-detection.css      # Styling

Integration:
src/components/
├── facedetection/              # Copied frontend files
│   ├── FaceDetection.jsx
│   └── face-detection.css
└── procaps/
    └── AnimatedProjects.jsx    # Updated with face detection integration
```

## 🚀 Quick Start

### Backend Setup

#### Option 1: With Virtual Environment (Recommended)
```bash
cd project2/backend
.\setup_backend.bat
.\start_backend.bat
```

#### Option 2: Direct Installation
```bash
cd project2/backend
.\start_backend_direct.bat
```

#### Option 3: Manual Setup
```bash
cd project2/backend
py -m pip install -r requirements.txt
py -m uvicorn main:app --host 0.0.0.0 --port 8001 --reload
```

The backend will start on **http://localhost:8001**

### Frontend

The frontend is integrated into the main portfolio. Simply:

1. Start the backend (see above)
2. Start the portfolio:
   ```bash
   cd c:\Users\akeeb\OneDrive\Desktop\projects\portfolio
   npm start
   ```
3. Navigate to the portfolio and click on "Face Detection System"

## 🧪 Testing

### Test Backend
```bash
cd project2/backend
py test_detector.py
```

### Test API Endpoints

**Health Check:**
```bash
curl http://localhost:8001/health
```

**Detect Faces:**
```bash
curl -X POST -F "file=@test_image.jpg" http://localhost:8001/detect
```

## 📡 API Documentation

Once the backend is running, visit:
- **Interactive Docs**: http://localhost:8001/docs
- **Alternative Docs**: http://localhost:8001/redoc

### Endpoints

#### `GET /`
Health check endpoint

**Response:**
```json
{
  "status": "online",
  "service": "Face Detection API",
  "version": "1.0.0",
  "detector": "Haar Cascade CNN"
}
```

#### `POST /detect`
Detect faces in uploaded image

**Request:**
- Content-Type: multipart/form-data
- Body: file (image file)

**Response:**
```json
{
  "success": true,
  "face_count": 2,
  "faces": [
    {
      "bbox": [100, 50, 200, 150],
      "confidence": 0.95,
      "center": [150, 100]
    }
  ],
  "image_size": [640, 480],
  "message": "Detected 2 face(s)"
}
```

## 🛠️ Tech Stack

### Backend
- **FastAPI**: Modern Python web framework
- **OpenCV**: Computer vision library with Haar Cascade
- **NumPy**: Numerical computing
- **Uvicorn**: ASGI server
- **Pillow**: Image processing

### Frontend
- **React**: UI library
- **Canvas API**: Bounding box rendering
- **CSS3**: Animations and styling

## 🎨 Design

The frontend matches the portfolio's theme:
- Dark mode with glassmorphism effects
- Cyan/blue color scheme (#40C6FF)
- Smooth animations and transitions
- Responsive grid layout

## ⚙️ Configuration

### Backend Port
Default: 8001 (to avoid conflicts with project1)

To change, edit `start_backend.bat` or `main.py`:
```python
uvicorn.run(app, host="0.0.0.0", port=YOUR_PORT)
```

### Frontend API URL
Edit `FaceDetection.jsx`:
```javascript
const API_URL = 'http://localhost:YOUR_PORT';
```

## 🐛 Troubleshooting

### Backend won't start
- Ensure Python is installed: `py --version`
- Install dependencies: `py -m pip install -r requirements.txt`
- Check port 8001 is not in use

### No faces detected
- Ensure image has clear, frontal faces
- Try different images
- Check console for errors

### Frontend can't connect to backend
- Verify backend is running on http://localhost:8001
- Check browser console for CORS errors
- Ensure API_URL in FaceDetection.jsx is correct

## 📝 Notes

- The system uses Haar Cascade for reliable face detection
- Best results with frontal face images
- Supports multiple faces in a single image
- No demo/mock data - all detections are real-time

## 🔮 Future Enhancements

- [ ] Add YOLOv8-Face for improved accuracy
- [ ] Support for video/webcam detection
- [ ] Face recognition capabilities
- [ ] Export detection results as JSON
- [ ] Batch processing multiple images
- [ ] Face landmark detection

## 📄 License

Part of the portfolio project.
