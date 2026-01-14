@echo off
echo ========================================
echo Setting up Face Detection Backend
echo ========================================

cd /d "%~dp0"

echo.
echo Creating virtual environment...
py -m venv venv

echo.
echo Activating virtual environment...
call venv\Scripts\activate.bat

echo.
echo Installing dependencies...
py -m pip install --upgrade pip
pip install -r requirements.txt

echo.
echo ========================================
echo Setup complete!
echo ========================================
echo.
echo To start the backend, run: start_backend.bat
pause
