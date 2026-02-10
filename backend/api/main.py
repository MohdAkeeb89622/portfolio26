"""
Stock Market Anomaly Detection API
FastAPI backend for analyzing stock market anomalies
"""
from __future__ import annotations
from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse, StreamingResponse, FileResponse
from pydantic import BaseModel
from typing import Optional, List
import pandas as pd
import os
from datetime import date

# Get the project root directory
API_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.dirname(API_DIR)
OUTPUTS_DIR = os.path.join(PROJECT_DIR, "outputs")

app = FastAPI(
    title="Stock Market Anomaly Detection API",
    description="API for analyzing stock market anomalies using rule-based and ML techniques",
    version="1.0.0"
)

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["Content-Disposition"],
)

# Load data on startup
daily_anomalies: pd.DataFrame = None
market_days: pd.DataFrame = None
features_flags: pd.DataFrame = None

def load_data():
    global daily_anomalies, market_days, features_flags
    try:
        daily_anomalies = pd.read_csv(os.path.join(OUTPUTS_DIR, "daily_anomaly_card.csv"))
        market_days = pd.read_csv(os.path.join(OUTPUTS_DIR, "market_day_table.csv"))
        features_flags = pd.read_csv(os.path.join(OUTPUTS_DIR, "features_and_flags.csv"))
    except FileNotFoundError as e:
        print(f"Warning: Could not load data files - {e}")

@app.on_event("startup")
async def startup_event():
    load_data()

# Pydantic models
class AnomalyResponse(BaseModel):
    date: str
    ticker: str
    type: Optional[str]
    ret: Optional[float]
    ret_z: Optional[float]
    volz: Optional[float]
    range_pct: Optional[float]
    severity: Optional[float] = None
    why: Optional[str]
    anomaly_flag: int

class MarketDayResponse(BaseModel):
    date: str
    market_ret: float
    breadth: float
    market_anomaly_flag: int

class StatsResponse(BaseModel):
    total_rows: int
    total_anomalies: int
    anomalies_by_ticker: dict
    anomalies_by_type: dict
    market_days_total: int
    market_anomalies: int

class AnalyzeRequest(BaseModel):
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    tickers: Optional[List[str]] = None
    ret_z_threshold: float = 2.5
    volz_threshold: float = 2.5
    range_pct_threshold: float = 95.0

# ============== API ENDPOINTS ==============

@app.get("/", response_class=HTMLResponse)
async def root():
    """Dashboard home page with data tables"""
    
    # Get data for tables
    if daily_anomalies is not None:
        df_anomalies = daily_anomalies[daily_anomalies["anomaly_flag"] == 1].copy()
        df_anomalies["abs_ret_z"] = df_anomalies["ret_z"].abs()
        top_anomalies = df_anomalies.sort_values("abs_ret_z", ascending=False).head(20)
        top_anomalies = top_anomalies.fillna({"type": "", "why": "", "ret": 0, "ret_z": 0, "volz": 0, "range_pct": 0})
        anomaly_rows = ""
        for _, row in top_anomalies.iterrows():
            ret_class = "negative" if row.get("ret", 0) < 0 else "positive"
            anomaly_type = str(row.get('type', '')) if pd.notna(row.get('type')) else ''
            type_class = anomaly_type.split()[0] if anomaly_type else ''
            anomaly_rows += f"""
            <tr>
                <td>{row.get('date', '')}</td>
                <td><span class="ticker">{row.get('ticker', '')}</span></td>
                <td><span class="type-badge {type_class}">{anomaly_type}</span></td>
                <td class="{ret_class}">{float(row.get('ret', 0)):.4f}</td>
                <td>{float(row.get('ret_z', 0)):.2f}</td>
                <td>{float(row.get('volz', 0)):.2f}</td>
                <td>{float(row.get('range_pct', 0)):.1f}%</td>
            </tr>
            """
    else:
        anomaly_rows = "<tr><td colspan='7'>No data loaded</td></tr>"
    
    if market_days is not None:
        market_anomaly_days = market_days[market_days["market_anomaly_flag"] == 1].head(15)
        market_rows = ""
        for _, row in market_anomaly_days.iterrows():
            ret_class = "negative" if row.get("market_ret", 0) < 0 else "positive"
            market_rows += f"""
            <tr>
                <td>{row.get('date', '')}</td>
                <td class="{ret_class}">{float(row.get('market_ret', 0)):.4f}</td>
                <td>{float(row.get('breadth', 0)):.2f}</td>
                <td><span class="flag-yes">⚠️ Yes</span></td>
            </tr>
            """
    else:
        market_rows = "<tr><td colspan='4'>No data loaded</td></tr>"
    
    return f"""
    <!DOCTYPE html>
    <html>
    <head>
        <title>Stock Market Anomaly Detection - Analysis Results</title>
        <style>
            * {{ margin: 0; padding: 0; box-sizing: border-box; }}
            body {{ 
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background: #000000;
                color: #fff;
                min-height: 100vh;
                padding: 2rem;
            }}
            .container {{ max-width: 1400px; margin: 0 auto; }}
            h1 {{ 
                text-align: center; 
                margin-bottom: 1rem;
                font-size: 2.2rem;
                background: linear-gradient(90deg, #4a90d9, #67b8f7);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }}
            .subtitle {{
                text-align: center;
                color: #888;
                margin-bottom: 2rem;
            }}
            .stats {{ 
                display: grid; 
                grid-template-columns: repeat(4, 1fr); 
                gap: 1rem; 
                margin-bottom: 2rem;
            }}
            .stat {{
                background: rgba(74, 144, 217, 0.1);
                border: 1px solid rgba(74, 144, 217, 0.3);
                border-radius: 10px;
                padding: 1.2rem;
                text-align: center;
            }}
            .stat-value {{ font-size: 2rem; font-weight: bold; color: #4a90d9; }}
            .stat-label {{ color: #888; font-size: 0.85rem; margin-top: 0.3rem; }}
            
            .section {{ margin-bottom: 2rem; }}
            .section h2 {{
                color: #4a90d9;
                margin-bottom: 1rem;
                font-size: 1.3rem;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }}
            
            .table-container {{
                background: rgba(255,255,255,0.03);
                border-radius: 12px;
                overflow: hidden;
                border: 1px solid rgba(255,255,255,0.1);
            }}
            
            table {{
                width: 100%;
                border-collapse: collapse;
            }}
            
            th {{
                background: rgba(74, 144, 217, 0.2);
                padding: 1rem;
                text-align: left;
                font-weight: 600;
                color: #4a90d9;
                font-size: 0.85rem;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }}
            
            td {{
                padding: 0.8rem 1rem;
                border-bottom: 1px solid rgba(255,255,255,0.05);
                font-size: 0.9rem;
            }}
            
            tr:hover {{
                background: rgba(74, 144, 217, 0.1);
            }}
            
            .ticker {{
                background: rgba(74, 144, 217, 0.2);
                padding: 0.3rem 0.6rem;
                border-radius: 4px;
                font-weight: 600;
                color: #67b8f7;
            }}
            
            .type-badge {{
                padding: 0.3rem 0.6rem;
                border-radius: 15px;
                font-size: 0.75rem;
                font-weight: 500;
            }}
            .type-badge.crash {{
                background: rgba(255, 107, 107, 0.2);
                color: #ff6b6b;
            }}
            .type-badge.spike {{
                background: rgba(81, 207, 102, 0.2);
                color: #51cf66;
            }}
            .type-badge.volume_shock, .type-badge.range_spike {{
                background: rgba(255, 212, 59, 0.2);
                color: #ffd43b;
            }}
            
            .positive {{ color: #51cf66; }}
            .negative {{ color: #ff6b6b; }}
            
            .flag-yes {{
                color: #ff6b6b;
            }}
            
            .nav-links {{
                display: flex;
                justify-content: center;
                gap: 1rem;
                margin-bottom: 2rem;
            }}
            .nav-links a {{
                background: rgba(74, 144, 217, 0.2);
                color: #4a90d9;
                padding: 0.6rem 1.2rem;
                border-radius: 8px;
                text-decoration: none;
                transition: all 0.3s;
            }}
            .nav-links a:hover {{
                background: #4a90d9;
                color: #fff;
            }}
            
            @media (max-width: 768px) {{
                .stats {{ grid-template-columns: repeat(2, 1fr); }}
                .table-container {{ overflow-x: auto; }}
            }}
        </style>
    </head>
    <body>
        <div class="container">
            <h1>📈 Stock Market Anomaly Detection</h1>
            <p class="subtitle">Analysis Results from Daily Anomaly Card & Market Day Table</p>
            
            <div class="nav-links">
                <a href="/docs">📚 API Docs</a>
                <a href="/api/anomalies?limit=50">🔍 All Anomalies (JSON)</a>
                <a href="/api/market-days?only_anomalies=true">📊 Market Anomalies (JSON)</a>
            </div>
            
            <div class="stats" id="stats">
                <div class="stat">
                    <div class="stat-value" id="total-anomalies">-</div>
                    <div class="stat-label">Total Anomalies Detected</div>
                </div>
                <div class="stat">
                    <div class="stat-value" id="market-anomalies">-</div>
                    <div class="stat-label">Market Anomaly Days</div>
                </div>
                <div class="stat">
                    <div class="stat-value" id="tickers">6</div>
                    <div class="stat-label">Tickers Analyzed</div>
                </div>
                <div class="stat">
                    <div class="stat-value">2018-2020</div>
                    <div class="stat-label">Date Range</div>
                </div>
            </div>
            
            <div class="section">
                <h2>🔥 Top Anomalies by Return Z-Score (Daily Anomaly Card)</h2>
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Ticker</th>
                                <th>Type</th>
                                <th>Return</th>
                                <th>Return Z</th>
                                <th>Volume Z</th>
                                <th>Range %</th>
                            </tr>
                        </thead>
                        <tbody>
                            {anomaly_rows}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div class="section">
                <h2>⚠️ Market Anomaly Days (Market Day Table)</h2>
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Market Return</th>
                                <th>Breadth</th>
                                <th>Anomaly Flag</th>
                            </tr>
                        </thead>
                        <tbody>
                            {market_rows}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <script>
            fetch('/api/stats')
                .then(r => r.json())
                .then(data => {{
                    document.getElementById('total-anomalies').textContent = data.total_anomalies;
                    document.getElementById('market-anomalies').textContent = data.market_anomalies;
                }})
                .catch(e => console.error('Failed to load stats:', e));
        </script>
    </body>
    </html>
    """

@app.get("/api/anomalies", response_model=List[AnomalyResponse])
async def get_anomalies(
    date: Optional[str] = Query(None, description="Filter by date (YYYY-MM-DD)"),
    ticker: Optional[str] = Query(None, description="Filter by ticker symbol"),
    type: Optional[str] = Query(None, description="Filter by anomaly type (crash, spike, volume_shock)"),
    only_flagged: bool = Query(True, description="Return only flagged anomalies"),
    limit: int = Query(100, description="Maximum number of results"),
    offset: int = Query(0, description="Offset for pagination")
):
    """Get anomalies with optional filtering"""
    if daily_anomalies is None:
        raise HTTPException(status_code=500, detail="Data not loaded")
    
    df = daily_anomalies.copy()
    
    if only_flagged:
        df = df[df["anomaly_flag"] == 1]
    
    if date:
        df = df[df["date"] == date]
    
    if ticker:
        df = df[df["ticker"].str.upper() == ticker.upper()]
    
    if type:
        df = df[df["type"].str.contains(type, case=False, na=False)]
    
    df = df.iloc[offset:offset + limit]
    
    # Fill NaN values for JSON serialization
    df = df.fillna({"type": "", "why": "", "ret": 0, "ret_z": 0, "volz": 0, "range_pct": 0, "severity": 0})
    
    return df.to_dict(orient="records")

@app.get("/api/anomalies/{query_date}")
async def get_anomalies_by_date(query_date: str):
    """Get all anomalies for a specific date with market context"""
    if daily_anomalies is None or market_days is None:
        raise HTTPException(status_code=500, detail="Data not loaded")
    
    # Get market status
    market_row = market_days[market_days["date"] == query_date]
    market_info = None
    if not market_row.empty:
        m = market_row.iloc[0]
        market_info = {
            "date": query_date,
            "market_ret": float(m["market_ret"]),
            "breadth": float(m["breadth"]),
            "market_anomaly_flag": int(m["market_anomaly_flag"])
        }
    
    # Get stock anomalies
    anomalies = daily_anomalies[
        (daily_anomalies["date"] == query_date) & 
        (daily_anomalies["anomaly_flag"] == 1)
    ].fillna({"type": "", "why": "", "ret": 0, "ret_z": 0, "volz": 0, "range_pct": 0, "severity": 0})
    
    return {
        "date": query_date,
        "market": market_info,
        "anomalies": anomalies.to_dict(orient="records"),
        "anomaly_count": len(anomalies)
    }

@app.get("/api/market-days", response_model=List[MarketDayResponse])
async def get_market_days(
    only_anomalies: bool = Query(False, description="Return only anomaly market days"),
    limit: int = Query(100, description="Maximum number of results"),
    offset: int = Query(0, description="Offset for pagination")
):
    """Get market day data"""
    if market_days is None:
        raise HTTPException(status_code=500, detail="Data not loaded")
    
    df = market_days.copy()
    
    if only_anomalies:
        df = df[df["market_anomaly_flag"] == 1]
    
    df = df.iloc[offset:offset + limit]
    
    return df.to_dict(orient="records")

@app.get("/api/tickers")
async def get_tickers():
    """Get list of available tickers"""
    if daily_anomalies is None:
        raise HTTPException(status_code=500, detail="Data not loaded")
    
    tickers = daily_anomalies["ticker"].unique().tolist()
    return {"tickers": sorted(tickers)}

@app.get("/api/stats", response_model=StatsResponse)
async def get_stats():
    """Get summary statistics"""
    if daily_anomalies is None or market_days is None:
        raise HTTPException(status_code=500, detail="Data not loaded")
    
    anomalies_only = daily_anomalies[daily_anomalies["anomaly_flag"] == 1]
    
    # Anomalies by ticker
    by_ticker = anomalies_only.groupby("ticker").size().to_dict()
    
    # Anomalies by type
    by_type = anomalies_only["type"].value_counts().to_dict()
    
    return {
        "total_rows": len(daily_anomalies),
        "total_anomalies": len(anomalies_only),
        "anomalies_by_ticker": by_ticker,
        "anomalies_by_type": by_type,
        "market_days_total": len(market_days),
        "market_anomalies": int(market_days["market_anomaly_flag"].sum())
    }

@app.get("/api/top-severity")
async def get_top_severity(limit: int = Query(10, description="Number of top anomalies")):
    """Get top anomalies by severity score"""
    if daily_anomalies is None:
        raise HTTPException(status_code=500, detail="Data not loaded")
    
    df = daily_anomalies[daily_anomalies["anomaly_flag"] == 1].copy()
    df = df.sort_values("severity", ascending=False).head(limit)
    df = df.fillna({"type": "", "why": "", "ret": 0, "ret_z": 0, "volz": 0, "range_pct": 0, "severity": 0})
    
    return df.to_dict(orient="records")

@app.get("/api/monthly-summary")
async def get_monthly_summary():
    """Get anomaly counts grouped by month"""
    if daily_anomalies is None:
        raise HTTPException(status_code=500, detail="Data not loaded")
    
    df = daily_anomalies[daily_anomalies["anomaly_flag"] == 1].copy()
    df["date"] = pd.to_datetime(df["date"])
    df["month"] = df["date"].dt.to_period("M").astype(str)
    
    monthly = df.groupby("month").size().to_dict()
    
    return {"monthly_counts": monthly}

@app.post("/api/analyze")
async def analyze(request: AnalyzeRequest):
    """Run custom analysis with user-defined thresholds"""
    if features_flags is None:
        raise HTTPException(status_code=500, detail="Data not loaded")
    
    df = features_flags.copy()
    
    # Apply date filters
    if request.start_date:
        df = df[df["date"] >= request.start_date]
    if request.end_date:
        df = df[df["date"] <= request.end_date]
    
    # Apply ticker filter
    if request.tickers:
        df = df[df["ticker"].isin([t.upper() for t in request.tickers])]
    
    # Apply custom thresholds
    df["custom_flag"] = (
        (df["ret_z"].abs() > request.ret_z_threshold) |
        (df["volz"] > request.volz_threshold) |
        (df["range_pct"] > request.range_pct_threshold)
    ).astype(int)
    
    # Determine type
    def get_type(row):
        types = []
        if pd.notna(row["ret_z"]) and abs(row["ret_z"]) > request.ret_z_threshold:
            if pd.notna(row["ret"]) and row["ret"] < 0:
                types.append("crash")
            else:
                types.append("spike")
        if pd.notna(row["volz"]) and row["volz"] > request.volz_threshold:
            types.append("volume_shock")
        if pd.notna(row["range_pct"]) and row["range_pct"] > request.range_pct_threshold:
            types.append("range_spike")
        return " + ".join(types) if types else ""
    
    flagged = df[df["custom_flag"] == 1].copy()
    flagged["custom_type"] = flagged.apply(get_type, axis=1)
    
    # Summary
    by_ticker = flagged.groupby("ticker").size().to_dict()
    by_type = flagged["custom_type"].value_counts().to_dict()
    
    return {
        "thresholds_used": {
            "ret_z": request.ret_z_threshold,
            "volz": request.volz_threshold,
            "range_pct": request.range_pct_threshold
        },
        "date_range": {
            "start": request.start_date or df["date"].min(),
            "end": request.end_date or df["date"].max()
        },
        "tickers_analyzed": request.tickers or df["ticker"].unique().tolist(),
        "total_rows_analyzed": len(df),
        "anomalies_found": len(flagged),
        "anomalies_by_ticker": by_ticker,
        "anomalies_by_type": by_type,
        "sample_anomalies": flagged.head(20).fillna("").to_dict(orient="records")
    }

@app.get("/api/report/download")
async def download_report():
    """Download a combined PDF report with all analysis data in table format"""
    import io
    from reportlab.lib import colors
    from reportlab.lib.pagesizes import A4, landscape
    from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
    from reportlab.lib.units import inch, mm
    from reportlab.platypus import (
        SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer,
        PageBreak, HRFlowable
    )
    from reportlab.lib.enums import TA_CENTER, TA_LEFT
    from reportlab.graphics.shapes import Drawing, Rect, String
    from reportlab.graphics import renderPDF

    try:
        df_anomaly = pd.read_csv(os.path.join(OUTPUTS_DIR, "daily_anomaly_card.csv"))
        df_market = pd.read_csv(os.path.join(OUTPUTS_DIR, "market_day_table.csv"))
        df_features = pd.read_csv(os.path.join(OUTPUTS_DIR, "features_and_flags.csv"))
    except FileNotFoundError as e:
        raise HTTPException(status_code=500, detail=f"Data files not found: {e}")

    # Compute stats
    total_records = len(df_features)
    anomaly_records = int(df_anomaly["anomaly_flag"].sum()) if "anomaly_flag" in df_anomaly.columns else 0
    market_anomalies = int(df_market["market_anomaly_flag"].sum()) if "market_anomaly_flag" in df_market.columns else 0
    tickers = sorted(df_features["ticker"].unique().tolist()) if "ticker" in df_features.columns else []
    date_min = str(df_features["date"].min()) if "date" in df_features.columns else "N/A"
    date_max = str(df_features["date"].max()) if "date" in df_features.columns else "N/A"

    buf = io.BytesIO()
    doc = SimpleDocTemplate(
        buf, pagesize=landscape(A4),
        leftMargin=15*mm, rightMargin=15*mm,
        topMargin=15*mm, bottomMargin=15*mm
    )

    styles = getSampleStyleSheet()
    # Custom styles
    title_style = ParagraphStyle('ReportTitle', parent=styles['Title'],
        fontSize=22, textColor=colors.HexColor("#1a3a5c"), spaceAfter=6, alignment=TA_CENTER)
    subtitle_style = ParagraphStyle('ReportSub', parent=styles['Normal'],
        fontSize=10, textColor=colors.HexColor("#666666"), alignment=TA_CENTER, spaceAfter=20)
    section_style = ParagraphStyle('SectionHead', parent=styles['Heading2'],
        fontSize=14, textColor=colors.HexColor("#1a3a5c"), spaceBefore=16, spaceAfter=8,
        borderWidth=1, borderColor=colors.HexColor("#4a90d9"), borderPadding=4)
    normal_style = ParagraphStyle('NormalText', parent=styles['Normal'],
        fontSize=9, textColor=colors.HexColor("#333333"), spaceAfter=6)

    elements = []

    # ---- Title ----
    elements.append(Paragraph("Stock Market Anomaly Detection Report", title_style))
    elements.append(Paragraph(f"Walk-Forward Analysis  |  {date_min}  to  {date_max}", subtitle_style))
    elements.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#4a90d9"), spaceAfter=12))

    # ---- Summary Stats Table ----
    summary_data = [
        ["Total Data Points", "Anomalies Detected", "Market Anomaly Days", "Tickers Analyzed"],
        [f"{total_records:,}", f"{anomaly_records:,}", f"{market_anomalies:,}", str(len(tickers))]
    ]
    summary_table = Table(summary_data, colWidths=[160, 160, 160, 160])
    summary_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor("#4a90d9")),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 9),
        ('FONTSIZE', (0, 1), (-1, 1), 16),
        ('FONTNAME', (0, 1), (-1, 1), 'Helvetica-Bold'),
        ('TEXTCOLOR', (0, 1), (-1, 1), colors.HexColor("#1a3a5c")),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#ddd")),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('BACKGROUND', (0, 1), (-1, 1), colors.HexColor("#f0f6ff")),
    ]))
    elements.append(summary_table)
    elements.append(Spacer(1, 8))
    elements.append(Paragraph(f"<b>Tickers:</b>  {', '.join(tickers)}", normal_style))
    elements.append(Spacer(1, 6))

    # ---- Bar charts as tables ----
    # Anomalies by ticker
    if "anomaly_flag" in df_anomaly.columns and "ticker" in df_anomaly.columns:
        flagged = df_anomaly[df_anomaly["anomaly_flag"] == 1]
        by_ticker = flagged.groupby("ticker").size().sort_values(ascending=False)
        if len(by_ticker) > 0:
            elements.append(Paragraph("Anomalies by Ticker", section_style))
            chart_data = [["Ticker", "Count", "Distribution"]]
            mx = by_ticker.max()
            for t, c in by_ticker.items():
                bar_len = int((c / mx) * 30)
                bar_str = "\u2588" * bar_len
                chart_data.append([str(t), str(c), bar_str])
            chart_table = Table(chart_data, colWidths=[80, 60, 300])
            chart_table.setStyle(TableStyle([
                ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor("#4a90d9")),
                ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
                ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
                ('FONTSIZE', (0, 0), (-1, -1), 8),
                ('TEXTCOLOR', (2, 1), (2, -1), colors.HexColor("#4a90d9")),
                ('FONTNAME', (1, 1), (1, -1), 'Helvetica-Bold'),
                ('ALIGN', (1, 0), (1, -1), 'CENTER'),
                ('GRID', (0, 0), (-1, -1), 0.3, colors.HexColor("#ddd")),
                ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor("#f8f9fa")]),
                ('TOPPADDING', (0, 0), (-1, -1), 4),
                ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
            ]))
            elements.append(chart_table)
            elements.append(Spacer(1, 6))

    # Anomalies by type
    if "type" in df_anomaly.columns:
        flagged = df_anomaly[df_anomaly["anomaly_flag"] == 1]
        by_type = flagged["type"].value_counts()
        if len(by_type) > 0:
            elements.append(Paragraph("Anomalies by Type", section_style))
            chart_data = [["Type", "Count", "Distribution"]]
            mx = by_type.max()
            for at, c in by_type.items():
                bar_len = int((c / mx) * 30)
                bar_str = "\u2588" * bar_len
                chart_data.append([str(at), str(c), bar_str])
            chart_table = Table(chart_data, colWidths=[140, 60, 240])
            chart_table.setStyle(TableStyle([
                ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor("#4a90d9")),
                ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
                ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
                ('FONTSIZE', (0, 0), (-1, -1), 8),
                ('TEXTCOLOR', (2, 1), (2, -1), colors.HexColor("#2d8a4e")),
                ('FONTNAME', (1, 1), (1, -1), 'Helvetica-Bold'),
                ('ALIGN', (1, 0), (1, -1), 'CENTER'),
                ('GRID', (0, 0), (-1, -1), 0.3, colors.HexColor("#ddd")),
                ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor("#f8f9fa")]),
                ('TOPPADDING', (0, 0), (-1, -1), 4),
                ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
            ]))
            elements.append(chart_table)

    # ---- Helper: DataFrame to PDF table ----
    def df_to_pdf_table(df, title, max_rows=None):
        elements.append(PageBreak())
        row_info = f" ({len(df)} rows)" if max_rows is None else f" (showing {min(max_rows, len(df))} of {len(df)} rows)"
        elements.append(Paragraph(f"{title}{row_info}", section_style))
        elements.append(Spacer(1, 4))

        if max_rows:
            df = df.head(max_rows)

        cols = df.columns.tolist()
        # Header
        header = [Paragraph(f"<b>{c}</b>", ParagraphStyle('Hdr', fontSize=6, textColor=colors.white, alignment=TA_CENTER)) for c in cols]
        data = [header]

        for _, row in df.iterrows():
            row_data = []
            for c in cols:
                v = row[c]
                if pd.isna(v):
                    row_data.append("—")
                elif isinstance(v, float):
                    row_data.append(f"{v:.4f}")
                else:
                    row_data.append(str(v))
            data.append(row_data)

        # Calculate col widths based on number of columns
        page_w = landscape(A4)[0] - 30*mm
        col_w = page_w / len(cols)
        tbl = Table(data, colWidths=[col_w] * len(cols), repeatRows=1)
        tbl.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor("#1a3a5c")),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, 0), 6),
            ('FONTSIZE', (0, 1), (-1, -1), 6),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
            ('GRID', (0, 0), (-1, -1), 0.3, colors.HexColor("#ccc")),
            ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor("#f5f7fa")]),
            ('TOPPADDING', (0, 0), (-1, -1), 3),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
            ('LEFTPADDING', (0, 0), (-1, -1), 3),
            ('RIGHTPADDING', (0, 0), (-1, -1), 3),
        ]))
        elements.append(tbl)

    # ---- Data Tables ----
    # 1. Daily anomaly card (flagged only, sorted by severity)
    df_top = df_anomaly[df_anomaly["anomaly_flag"] == 1].copy()
    df_top["abs_ret_z"] = df_top["ret_z"].abs()
    df_top = df_top.sort_values("abs_ret_z", ascending=False).drop(columns=["abs_ret_z"])
    df_to_pdf_table(df_top, "Daily Anomaly Card (Flagged Anomalies)")

    # 2. Market anomaly days
    df_market_anom = df_market[df_market["market_anomaly_flag"] == 1].copy() if "market_anomaly_flag" in df_market.columns else df_market.head(0)
    df_to_pdf_table(df_market_anom, "Market Anomaly Days")

    # 3. Full market day table
    df_to_pdf_table(df_market, "Full Market Day Table")

    # 4. Features & flags (limit to 500 rows for PDF size)
    df_to_pdf_table(df_features, "Features & Flags (Complete Dataset)", max_rows=500)

    # ---- Footer on last page ----
    elements.append(Spacer(1, 20))
    elements.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#ccc"), spaceAfter=6))
    footer_style = ParagraphStyle('Footer', fontSize=8, textColor=colors.HexColor("#999"), alignment=TA_CENTER)
    elements.append(Paragraph("Stock Market Anomaly Detection Report — Mohd Akeeb Khan", footer_style))

    doc.build(elements)

    import tempfile, shutil
    tmp = tempfile.NamedTemporaryFile(delete=False, suffix=".pdf")
    buf.seek(0)
    shutil.copyfileobj(buf, tmp)
    tmp.close()

    return FileResponse(
        path=tmp.name,
        filename="Stock_Market_Anomaly_Report.pdf",
        media_type="application/octet-stream",
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
