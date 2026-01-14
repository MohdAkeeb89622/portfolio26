@echo off
cd /d "c:\Users\akeeb\OneDrive\Desktop\projects\portfolio\project1\stock_anomaly_capstone\stock_anomaly_capstone"
call .venv\Scripts\activate.bat
pip install fastapi uvicorn pydantic pandas numpy scikit-learn python-dateutil
echo Installation complete. Press any key to exit...
pause
