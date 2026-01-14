@echo off
echo ========================================
echo Starting Face Detection Backend (Direct)
echo ========================================

cd /d "%~dp0"

echo.
echo Installing/Updating dependencies...
py -m pip install --quiet fastapi uvicorn python-multipart pillow opencv-python numpy ultralytics

echo.
echo Starting FastAPI server on http://localhost:8001
echo Press Ctrl+C to stop the server
echo.

py -m uvicorn main:app --host 0.0.0.0 --port 8001 --reload
