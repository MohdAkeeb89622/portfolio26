import React, { useEffect, useState } from 'react';
import './capstone.css';

const Capstone = () => {
  const [info, setInfo] = useState(null);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetch('http://127.0.0.1:8001/api/info')
      .then((r) => r.json())
      .then(setInfo)
      .catch((e) => setError('Could not load project info'));
  }, []);

  function runFullAnalysis() {
    console.log('runFullAnalysis called');
    setLoading(true);
    setError(null);
    setReport(null);
    setActiveTab('results');
    
    console.log('Attempting to fetch from http://127.0.0.1:8000/api/analyze');
    
    fetch('http://127.0.0.1:8001/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    })
      .then((r) => {
        console.log('Response received, status:', r.status);
        if (!r.ok) throw new Error(`API error: ${r.status}`);
        return r.json();
      })
      .then((d) => {
        console.log('Data parsed:', d);
        setReport(d);
        setLoading(false);
      })
      .catch((e) => {
        console.error('Fetch error:', e.message, e);
        setError('Failed to fetch analysis: ' + e.message);
        setLoading(false);
      });
  }

  function downloadReport() {
    if (!report) return;
    const csv = generateCSV(report);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `capstone-report-${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  function generateCSV(data) {
    let csv = 'Stock Market Anomaly Detection Report\n';
    csv += `Generated: ${new Date().toLocaleString()}\n\n`;
    csv += 'ANOMALIES BY TICKER\n';
    csv += 'Ticker,Anomaly Count\n';
    Object.entries(data.by_ticker || {}).forEach(([ticker, count]) => {
      csv += `${ticker},${count}\n`;
    });
    csv += '\nANOMALIES BY TYPE\n';
    csv += 'Type,Count\n';
    Object.entries(data.by_type || {}).forEach(([type, count]) => {
      csv += `${type},${count}\n`;
    });
    csv += `\nTotal Anomalies: ${data.total_anomalies || 0}\n`;
    csv += `Market Days Flagged: ${data.market_days_flagged || 0}\n`;
    return csv;
  }

  return (
    <section className="capstone section container" id="capstone">
      <h2>Capstone Project</h2>
      <h5 className="text-light">Stock Market Anomaly Detection</h5>

      <div className="capstone-tabs">
        <button
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`tab-btn ${activeTab === 'results' ? 'active' : ''}`}
          onClick={() => setActiveTab('results')}
          disabled={!report}
        >
          Results
        </button>
      </div>

      {activeTab === 'overview' && (
        <div className="capstone-content">
          <div className="overview-grid">
            <div className="overview-card">
              <h3>🎯 Project Summary</h3>
              <p className="capstone-desc">
                {info ? info.description : 'Loading project summary...'}
              </p>
            </div>

            <div className="overview-card">
              <h3>📊 Dataset Info</h3>
              <ul className="info-list">
                <li><strong>Universe:</strong> QQQ, AAPL, MSFT, NVDA, AMZN, META</li>
                <li><strong>Train:</strong> 2018</li>
                <li><strong>Validation:</strong> 2019</li>
                <li><strong>Test:</strong> 2020 Q1</li>
              </ul>
            </div>

            <div className="overview-card">
              <h3>⚙️ Detection Rules</h3>
              <ul className="info-list">
                <li>|Return Z-score| &gt; 2.5</li>
                <li>Log-volume Z-score &gt; 2.5</li>
                <li>Intraday range &gt; 95th percentile</li>
              </ul>
            </div>
            <div className="overview-card">
              <h3>🧠 Techniques & Models</h3>
              <ul className="info-list">
                <li><strong>K-Means Clustering</strong> — Unsupervised anomaly detection</li>
                <li><strong>Rolling-window Z-scores</strong> — 63-day window for returns</li>
                <li><strong>Log-volume Analysis</strong> — 21-day rolling std</li>
                <li><strong>Intraday Range Percentiles</strong> — Relative to 63-day history</li>
                <li><strong>Market Breadth</strong> — Cross-ticker anomaly context</li>
              </ul>
            </div>
            <div className="overview-card">
              <h3>🏃 Run Analysis</h3>
              <p className="capstone-desc text-small">
                Click the button below to run the full stock anomaly detection analysis. Results will be displayed in tables.
              </p>
              <button
                className="btn-run"
                onClick={runFullAnalysis}
                disabled={loading}
              >
                {loading ? '⏳ Analyzing...' : '▶️ Run Full Analysis'}
              </button>
              {error && <p className="error-msg">{error}</p>}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'results' && (
        <div className="capstone-content">
          {loading && <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-light)' }}>Loading analysis...</div>}
          {error && <div style={{ padding: '2rem', textAlign: 'center', color: '#ff6b6b' }}>{error}</div>}
          {!report && !loading && !error && <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-light)' }}>Click "Run Full Analysis" to start</div>}
          
          {report && (
            <>
          <div className="results-header">
            <h3>� Capstone Analysis Results</h3>
            <button className="btn-download" onClick={downloadReport}>
              📥 Download Report
            </button>
          </div>

          <div className="results-grid">
            <div className="stats-box">
              <div className="stat-value">{report.total_anomalies || 0}</div>
              <div className="stat-label">Total Anomalies Detected</div>
            </div>
            <div className="stats-box">
              <div className="stat-value">{report.market_days_flagged || 0}</div>
              <div className="stat-label">Market Days Flagged</div>
            </div>
            <div className="stats-box">
              <div className="stat-value">{Object.keys(report.by_ticker || {}).length}</div>
              <div className="stat-label">Stocks Analyzed</div>
            </div>
          </div>

          <div className="tables-grid">
            <div className="table-card">
              <h4>By Ticker</h4>
              <table className="result-table">
                <thead>
                  <tr>
                    <th>Ticker</th>
                    <th>Count</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(report.by_ticker || {}).sort((a, b) => b[1] - a[1]).map(([ticker, count]) => (
                    <tr key={ticker}>
                      <td className="ticker-cell">{ticker}</td>
                      <td className="count-cell">{count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="table-card">
              <h4>By Type</h4>
              <table className="result-table">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Count</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(report.by_type || {}).sort((a, b) => b[1] - a[1]).map(([type, count]) => (
                    <tr key={type}>
                      <td className="type-cell">{type}</td>
                      <td className="count-cell">{count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {report.daily_anomaly_card && report.daily_anomaly_card.length > 0 && (
            <div className="table-card full-width">
              <h4>A. Daily Anomaly Card</h4>
              <table className="result-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Ticker</th>
                    <th>Type</th>
                    <th>Return</th>
                    <th>Ret Z</th>
                    <th>Vol Z</th>
                    <th>Range %</th>
                    <th>Why</th>
                  </tr>
                </thead>
                <tbody>
                  {report.daily_anomaly_card && Array.isArray(report.daily_anomaly_card) && report.daily_anomaly_card.map((anom, idx) => (
                    <tr key={idx} className="severity-high">
                      <td>{anom.date || '-'}</td>
                      <td><strong>{anom.ticker || '-'}</strong></td>
                      <td><span className="type-badge">{anom.type || '-'}</span></td>
                      <td>{anom.ret ? (anom.ret * 100).toFixed(2) : '-'}%</td>
                      <td>{anom.ret_z ? anom.ret_z.toFixed(2) : '-'}</td>
                      <td>{anom.volz ? anom.volz.toFixed(2) : '-'}</td>
                      <td>{anom.range_pct ? anom.range_pct.toFixed(1) : '-'}</td>
                      <td className="why-cell">{anom.why || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {report.market_day_table && report.market_day_table.length > 0 && (
            <div className="table-card full-width">
              <h4>B. Market-Day Table</h4>
              <table className="result-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Market Return</th>
                    <th>Breadth</th>
                    <th>Flagged</th>
                  </tr>
                </thead>
                <tbody>
                  {report.market_day_table && Array.isArray(report.market_day_table) && report.market_day_table.map((mkt, idx) => (
                    <tr key={idx}>
                      <td>{mkt.date || '-'}</td>
                      <td>{mkt.market_ret ? (mkt.market_ret * 100).toFixed(3) : '-'}%</td>
                      <td>{mkt.breadth ? (mkt.breadth * 100).toFixed(1) : '-'}%</td>
                      <td><span className={mkt.market_anomaly_flag ? 'flag-yes' : 'flag-no'}>{mkt.market_anomaly_flag ? 'Yes' : 'No'}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {report.top_anomalies && report.top_anomalies.length > 0 && (
            <div className="table-card full-width">
              <h4>D. Monthly Mini-Report (Top 10 Most Severe Anomalies)</h4>
              <table className="result-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Ticker</th>
                    <th>Type</th>
                    <th>Ret Z</th>
                    <th>Vol Z</th>
                    <th>Mkt Flag</th>
                    <th>Why</th>
                  </tr>
                </thead>
                <tbody>
                  {report.top_anomalies && Array.isArray(report.top_anomalies) && report.top_anomalies.slice(0, 10).map((anom, idx) => (
                    <tr key={idx} className="severity-high">
                      <td>{anom.date || '-'}</td>
                      <td><strong>{anom.ticker || '-'}</strong></td>
                      <td><span className="type-badge">{anom.type || '-'}</span></td>
                      <td>{anom.ret_z ? anom.ret_z.toFixed(2) : '-'}</td>
                      <td>{anom.volz ? anom.volz.toFixed(2) : '-'}</td>
                      <td><span className={anom.severity >= 95 ? 'flag-yes' : 'flag-no'}>{anom.severity >= 95 ? 'Yes' : 'No'}</span></td>
                      <td className="why-cell">{anom.severity ? `Severity: ${anom.severity.toFixed(1)}%` : '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
            </>
          )}
        </div>
      )}

    </section>
  );
};

export default Capstone;
