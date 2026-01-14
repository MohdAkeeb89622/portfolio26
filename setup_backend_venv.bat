@echo off
echo Removing old virtual environment...
cd /d "c:\Users\akeeb\OneDrive\Desktop\projects\portfolio\project1\stock_anomaly_capstone\stock_anomaly_capstone"
if exist .venv (
    rmdir /s /q .venv
    echo Old venv removed
)

echo Creating fresh virtual environment using existing Python...
"C:\Users\akeeb\Downloads\stock_anomaly_capstone\stock_anomaly_capstone\.venv\Scripts\python.exe" -m venv .venv
echo Virtual environment created

echo Installing dependencies...
call .venv\Scripts\activate.bat
pip install --upgrade pip
pip install fastapi uvicorn pydantic pandas numpy scikit-learn python-dateutil

echo Setup complete!
pause
