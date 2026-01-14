"""
FastAPI Backend for Face Detection System
Provides REST API endpoint for real-time face detection
"""

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import numpy as np
import cv2
from detector import get_detector
import logging
from io import BytesIO

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="Face Detection API",
    description="CNN-based face detection system with bounding box localization",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize face detector
try:
    detector = get_detector()
    logger.info("Face detector initialized successfully")
except Exception as e:
    logger.error(f"Failed to initialize detector: {e}")
    detector = None


@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "status": "online",
        "service": "Face Detection API",
        "version": "1.0.0",
        "detector": "Haar Cascade CNN" if detector else "Not initialized"
    }


@app.get("/health")
async def health_check():
    """Detailed health check"""
    return {
        "status": "healthy" if detector else "unhealthy",
        "detector_loaded": detector is not None,
        "message": "Ready to detect faces" if detector else "Detector not initialized"
    }


@app.post("/detect")
async def detect_faces(file: UploadFile = File(...)):
    """
    Detect faces in uploaded image
    
    Args:
        file: Image file (JPEG, PNG, etc.)
        
    Returns:
        JSON response with face detections:
        {
            "success": true,
            "face_count": int,
            "faces": [
                {
                    "bbox": [x1, y1, x2, y2],
                    "confidence": float,
                    "center": [cx, cy]
                }
            ],
            "image_size": [width, height],
            "message": str
        }
    """
    if not detector:
        raise HTTPException(
            status_code=503,
            detail="Face detector not initialized"
        )
    
    try:
        # Validate file type
        if not file.content_type.startswith('image/'):
            raise HTTPException(
                status_code=400,
                detail=f"Invalid file type: {file.content_type}. Please upload an image."
            )
        
        # Read image file
        contents = await file.read()
        
        # Convert to numpy array
        nparr = np.frombuffer(contents, np.uint8)
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        if image is None:
            raise HTTPException(
                status_code=400,
                detail="Failed to decode image. Please upload a valid image file."
            )
        
        # Perform face detection
        logger.info(f"Processing image: {file.filename}")
        result = detector.detect_faces(image)
        
        # Prepare response
        response = {
            "success": True,
            "face_count": result['face_count'],
            "faces": result['faces'],
            "image_size": result['image_size'],
            "message": f"Detected {result['face_count']} face(s)" if result['face_count'] > 0 else "No faces detected"
        }
        
        logger.info(f"Detection complete: {result['face_count']} face(s) found")
        return JSONResponse(content=response)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error processing image: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Error processing image: {str(e)}"
        )


@app.post("/detect-batch")
async def detect_faces_batch(files: list[UploadFile] = File(...)):
    """
    Detect faces in multiple images
    
    Args:
        files: List of image files
        
    Returns:
        JSON response with detections for each image
    """
    if not detector:
        raise HTTPException(
            status_code=503,
            detail="Face detector not initialized"
        )
    
    results = []
    
    for file in files:
        try:
            # Validate file type
            if not file.content_type.startswith('image/'):
                results.append({
                    "filename": file.filename,
                    "success": False,
                    "error": f"Invalid file type: {file.content_type}"
                })
                continue
            
            # Read and process image
            contents = await file.read()
            nparr = np.frombuffer(contents, np.uint8)
            image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
            
            if image is None:
                results.append({
                    "filename": file.filename,
                    "success": False,
                    "error": "Failed to decode image"
                })
                continue
            
            # Detect faces
            detection_result = detector.detect_faces(image)
            
            results.append({
                "filename": file.filename,
                "success": True,
                "face_count": detection_result['face_count'],
                "faces": detection_result['faces'],
                "image_size": detection_result['image_size']
            })
            
        except Exception as e:
            results.append({
                "filename": file.filename,
                "success": False,
                "error": str(e)
            })
    
    return JSONResponse(content={
        "success": True,
        "total_images": len(files),
        "results": results
    })


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001, log_level="info")
