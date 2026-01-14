"""
Test script for face detection API
Tests the detector module directly without running the full server
"""

import sys
import os

# Add parent directory to path
sys.path.insert(0, os.path.dirname(__file__))

try:
    from detector import get_detector
    import cv2
    import numpy as np
    
    print("=" * 50)
    print("Face Detection Backend Test")
    print("=" * 50)
    
    # Initialize detector
    print("\n1. Initializing detector...")
    detector = get_detector()
    print("✓ Detector initialized successfully")
    
    # Create a test image (simple colored rectangle)
    print("\n2. Creating test image...")
    test_image = np.zeros((480, 640, 3), dtype=np.uint8)
    test_image[:] = (100, 100, 100)  # Gray background
    print("✓ Test image created (640x480)")
    
    # Test detection on empty image
    print("\n3. Testing detection on empty image...")
    result = detector.detect_faces(test_image)
    print(f"✓ Detection complete: {result['face_count']} faces found")
    print(f"  Image size: {result['image_size']}")
    
    print("\n" + "=" * 50)
    print("Backend Test: PASSED ✓")
    print("=" * 50)
    print("\nBackend is ready to use!")
    print("To start the server, run: start_backend.bat")
    
except ImportError as e:
    print(f"\n✗ Import Error: {e}")
    print("\nMissing dependencies. Please install:")
    print("  pip install opencv-python numpy fastapi uvicorn python-multipart pillow")
    sys.exit(1)
    
except Exception as e:
    print(f"\n✗ Error: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)
