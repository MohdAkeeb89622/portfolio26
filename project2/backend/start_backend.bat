@echo off
echo ========================================
echo Starting Face Detection Backend
echo ========================================

cd /d "%~dp0"

if not exist "venv\Scripts\activate.bat" (
    echo ERROR: Virtual environment not found!
    echo Please run setup_backend.bat first.
    pause
    exit /b 1
)

echo.
echo Activating virtual environment...
call venv\Scripts\activate.bat

echo.
echo Starting FastAPI server on http://localhost:8001
echo Press Ctrl+C to stop the server
echo.

py -m uvicorn main:app --host 0.0.0.0 --port 8001 --reload
