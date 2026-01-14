@echo off
cd /d "c:\Users\akeeb\OneDrive\Desktop\projects\portfolio"
call .\.venv\Scripts\activate.bat

:loop
echo [%date% %time%] Starting backend server...
python -m uvicorn Backend.stock_anomaly_capstone.main:app --port 8000
echo [%date% %time%] Backend process ended, restarting in 3 seconds...
timeout /t 3 /nobreak
goto loop
