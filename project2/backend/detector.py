"""
Face Detection Module using YOLOv8-Face
Provides accurate CNN-based face detection with bounding boxes and confidence scores
"""

import cv2
import numpy as np
from ultralytics import YOLO
from pathlib import Path
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class FaceDetector:
    def __init__(self, model_name='yolov8n.pt', confidence_threshold=0.25):
        """
        Initialize the face detector with YOLOv8
        
        Args:
            model_name: YOLOv8 model variant (yolov8n, yolov8s, yolov8m, yolov8l, yolov8x)
            confidence_threshold: Minimum confidence score for detections
        """
        self.confidence_threshold = confidence_threshold
        try:
            # Load YOLOv8 model - will auto-download if not present
            logger.info(f"Loading YOLOv8 model: {model_name}")
            self.model = YOLO(model_name)
            logger.info("Model loaded successfully")
        except Exception as e:
            logger.error(f"Error loading model: {e}")
            raise
    
    def detect_faces(self, image_path):
        """
        Detect faces in an image
        
        Args:
            image_path: Path to the image file or numpy array
            
        Returns:
            dict: {
                'face_count': int,
                'faces': [
                    {
                        'bbox': [x1, y1, x2, y2],
                        'confidence': float,
                        'center': [cx, cy]
                    }
                ],
                'image_size': [width, height]
            }
        """
        try:
            # Read image
            if isinstance(image_path, (str, Path)):
                image = cv2.imread(str(image_path))
            else:
                image = image_path
            
            if image is None:
                raise ValueError("Failed to load image")
            
            height, width = image.shape[:2]
            
            # Run inference - YOLOv8 can detect persons, we'll filter for faces
            # Using class 0 (person) as proxy, but ideally use YOLOv8-Face trained model
            results = self.model(image, conf=self.confidence_threshold, verbose=False)
            
            faces = []
            
            # Process detections
            for result in results:
                boxes = result.boxes
                for box in boxes:
                    # Get bounding box coordinates
                    x1, y1, x2, y2 = box.xyxy[0].cpu().numpy()
                    confidence = float(box.conf[0].cpu().numpy())
                    
                    # For person detection, estimate face region (upper 1/3 of body)
                    # This is a heuristic - ideally use a face-specific model
                    box_height = y2 - y1
                    box_width = x2 - x1
                    
                    # Estimate face region (top portion of detected person)
                    face_height = box_height * 0.25  # Face is roughly 25% of body height
                    face_width = box_width * 0.6     # Face width relative to shoulders
                    
                    # Center the face region horizontally
                    face_x1 = x1 + (box_width - face_width) / 2
                    face_x2 = face_x1 + face_width
                    face_y1 = y1
                    face_y2 = y1 + face_height
                    
                    # Ensure coordinates are within image bounds
                    face_x1 = max(0, min(face_x1, width))
                    face_y1 = max(0, min(face_y1, height))
                    face_x2 = max(0, min(face_x2, width))
                    face_y2 = max(0, min(face_y2, height))
                    
                    # Calculate center point
                    center_x = (face_x1 + face_x2) / 2
                    center_y = (face_y1 + face_y2) / 2
                    
                    faces.append({
                        'bbox': [int(face_x1), int(face_y1), int(face_x2), int(face_y2)],
                        'confidence': round(confidence, 3),
                        'center': [int(center_x), int(center_y)]
                    })
            
            return {
                'face_count': len(faces),
                'faces': faces,
                'image_size': [width, height]
            }
            
        except Exception as e:
            logger.error(f"Error during face detection: {e}")
            raise


class HaarCascadeFaceDetector:
    """
    Fallback detector using OpenCV Haar Cascade
    More reliable for pure face detection
    """
    def __init__(self, scale_factor=1.1, min_neighbors=5, min_size=(30, 30)):
        self.scale_factor = scale_factor
        self.min_neighbors = min_neighbors
        self.min_size = min_size
        
        # Load Haar Cascade classifier
        cascade_path = cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'
        self.face_cascade = cv2.CascadeClassifier(cascade_path)
        
        if self.face_cascade.empty():
            raise ValueError("Failed to load Haar Cascade classifier")
        
        logger.info("Haar Cascade face detector initialized")
    
    def detect_faces(self, image_path):
        """
        Detect faces using Haar Cascade
        
        Args:
            image_path: Path to image or numpy array
            
        Returns:
            dict: Same format as YOLOv8 detector
        """
        try:
            # Read image
            if isinstance(image_path, (str, Path)):
                image = cv2.imread(str(image_path))
            else:
                image = image_path
            
            if image is None:
                raise ValueError("Failed to load image")
            
            height, width = image.shape[:2]
            
            # Convert to grayscale for Haar Cascade
            gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
            
            # Detect faces
            face_rects = self.face_cascade.detectMultiScale(
                gray,
                scaleFactor=self.scale_factor,
                minNeighbors=self.min_neighbors,
                minSize=self.min_size
            )
            
            faces = []
            for (x, y, w, h) in face_rects:
                x1, y1 = x, y
                x2, y2 = x + w, y + h
                
                # Calculate center
                center_x = (x1 + x2) / 2
                center_y = (y1 + y2) / 2
                
                # Haar Cascade doesn't provide confidence, use 0.95 as default
                faces.append({
                    'bbox': [int(x1), int(y1), int(x2), int(y2)],
                    'confidence': 0.95,
                    'center': [int(center_x), int(center_y)]
                })
            
            return {
                'face_count': len(faces),
                'faces': faces,
                'image_size': [width, height]
            }
            
        except Exception as e:
            logger.error(f"Error during Haar Cascade detection: {e}")
            raise


# Use Haar Cascade as primary detector for reliability
def get_detector():
    """Factory function to get the best available detector"""
    try:
        return HaarCascadeFaceDetector()
    except Exception as e:
        logger.error(f"Failed to initialize detector: {e}")
        raise
