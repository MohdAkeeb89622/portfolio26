@echo off
REM Start project1 backend with auto-restart on crash
title Project1 Backend Server

:loop
echo.
echo [%date% %time%] Starting Project1 Backend Server...
echo.

cd /d "c:\Users\akeeb\OneDrive\Desktop\projects\portfolio\project1\stock_anomaly_capstone\stock_anomaly_capstone"

REM Activate virtual environment
call .venv\Scripts\activate.bat

REM Run the FastAPI server
python main.py

REM If the script exits, wait 3 seconds and restart
echo.
echo [%date% %time%] Backend crashed, restarting in 3 seconds...
timeout /t 3 /nobreak

goto loop
pause
