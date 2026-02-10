import React, { useState } from 'react'
import './procaps.css'
import { FaChartLine, FaPlay, FaGithub, FaTimes, FaDownload } from 'react-icons/fa'
import { SiPython, SiFastapi, SiPandas, SiScikitlearn } from 'react-icons/si'
import { BiLineChart, BiTrendingDown, BiTrendingUp } from 'react-icons/bi'

// Stock and ETF data from the project
const stocksAndETFs = [
    { symbol: 'QQQ', name: 'Invesco QQQ Trust', type: 'ETF' },
    { symbol: 'AAPL', name: 'Apple Inc.', type: 'Stock' },
    { symbol: 'MSFT', name: 'Microsoft Corp.', type: 'Stock' },
    { symbol: 'NVDA', name: 'NVIDIA Corp.', type: 'Stock' },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', type: 'Stock' },
    { symbol: 'META', name: 'Meta Platforms Inc.', type: 'Stock' },
]

const Procaps = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = () => {
        setIsModalOpen(true)
        document.body.style.overflow = 'hidden'
    }

    const closeModal = () => {
        setIsModalOpen(false)
        document.body.style.overflow = 'auto'
    }

    const openAnalysisDashboard = () => {
        // Open in popup window
        const width = 1200;
        const height = 800;
        const left = (window.screen.width - width) / 2;
        const top = (window.screen.height - height) / 2;

        window.open(
            'http://localhost:8000',
            'Stock Market Anomaly Analysis',
            `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
        );
    }

    return (
        <section id="procaps">
            <h5>Data Science</h5>
            <h2>Capstone Projects</h2>

            <div className="container procaps__container">
                {/* Simple Card - Click to open modal */}
                <div className="procaps__simple-card" onClick={openModal}>
                    <div className="procaps__card-icon">
                        <FaChartLine />
                    </div>
                    <h3>Stock Market Anomaly Detection</h3>
                    <p>Detect unusual market days and stock movements using ML techniques</p>
                    <div className="procaps__card-tags">
                        <span>Python</span>
                        <span>FastAPI</span>
                        <span>ML</span>
                    </div>
                    <span className="procaps__click-hint">Click to view details</span>
                </div>
            </div>

            {/* Modal Popup */}
            {isModalOpen && (
                <div className="procaps__modal-overlay" onClick={closeModal}>
                    <div className="procaps__modal" onClick={(e) => e.stopPropagation()}>
                        <button className="procaps__modal-close" onClick={closeModal}>
                            <FaTimes />
                        </button>

                        {/* Modal Header */}
                        <div className="procaps__modal-header">
                            <div className="procaps__icon-wrapper">
                                <FaChartLine className="procaps__main-icon" />
                            </div>
                            <div>
                                <h3>Stock Market Anomaly Detection</h3>
                                <span className="procaps__subtitle">Capstone Project | Data Science</span>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="procaps__modal-content">
                            {/* Project Description */}
                            <div className="procaps__section">
                                <h4>What This Project Does</h4>
                                <p>
                                    Detects unusual <strong>market days</strong> and <strong>stock days</strong> using only daily
                                    price and volume data. "Unusual" means extreme behavior relative to recent history using
                                    rolling window analysis with no look-ahead bias.
                                </p>

                                <div className="procaps__features-grid">
                                    <div className="procaps__feature">
                                        <BiTrendingDown className="feature-icon crash" />
                                        <span>Crash Detection</span>
                                    </div>
                                    <div className="procaps__feature">
                                        <BiTrendingUp className="feature-icon spike" />
                                        <span>Spike Detection</span>
                                    </div>
                                    <div className="procaps__feature">
                                        <BiLineChart className="feature-icon volume" />
                                        <span>Volume Shock</span>
                                    </div>
                                </div>
                            </div>

                            {/* How It Works */}
                            <div className="procaps__section">
                                <h4>How It Works</h4>
                                <ul className="procaps__methods">
                                    <li><strong>Return Z-Score:</strong> Measures if daily return is extreme vs. 63-day rolling history</li>
                                    <li><strong>Volume Z-Score:</strong> Detects unusual trading volume spikes (21-day window)</li>
                                    <li><strong>Range Percentile:</strong> Identifies days with extreme intraday price ranges</li>
                                    <li><strong>Market Breadth:</strong> Tracks how many stocks rise/fall together</li>
                                </ul>
                            </div>

                            {/* Stocks and ETFs */}
                            <div className="procaps__section">
                                <h4>Analyzed Stocks & ETFs</h4>
                                <div className="procaps__stocks-grid">
                                    {stocksAndETFs.map((item, index) => (
                                        <div key={index} className={`procaps__stock-card ${item.type.toLowerCase()}`}>
                                            <span className="stock-symbol">{item.symbol}</span>
                                            <span className="stock-name">{item.name}</span>
                                            <span className="stock-type">{item.type}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Results */}
                            <div className="procaps__section">
                                <h4>Analysis Results (2018-2020)</h4>
                                <div className="procaps__stats-grid">
                                    <div className="procaps__stat">
                                        <span className="stat-number">3,390</span>
                                        <span className="stat-label">Data Points</span>
                                    </div>
                                    <div className="procaps__stat">
                                        <span className="stat-number">436</span>
                                        <span className="stat-label">Anomalies</span>
                                    </div>
                                    <div className="procaps__stat">
                                        <span className="stat-number">192</span>
                                        <span className="stat-label">Market Anomalies</span>
                                    </div>
                                    <div className="procaps__stat">
                                        <span className="stat-number">95%+</span>
                                        <span className="stat-label">Accuracy</span>
                                    </div>
                                </div>
                            </div>

                            {/* Tech Stack */}
                            <div className="procaps__section">
                                <h4>Technology Stack</h4>
                                <div className="procaps__tech-icons">
                                    <div className="tech-item">
                                        <SiPython />
                                        <span>Python</span>
                                    </div>
                                    <div className="tech-item">
                                        <SiPandas />
                                        <span>Pandas</span>
                                    </div>
                                    <div className="tech-item">
                                        <SiScikitlearn />
                                        <span>Scikit-learn</span>
                                    </div>
                                    <div className="tech-item">
                                        <SiFastapi />
                                        <span>FastAPI</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal Actions */}
                        <div className="procaps__modal-actions">
                            <button className="btn btn-primary procaps__run-btn" onClick={openAnalysisDashboard}>
                                <FaPlay /> Run Analysis
                            </button>
                            <button
                                className="btn procaps__download-btn"
                                title="Download combined analysis report"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    window.open('http://localhost:8000/api/report/download', '_blank');
                                }}
                            >
                                <FaDownload /> Download Report
                            </button>
                            <a
                                href="https://github.com/MohdAkeeb89622"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn procaps__github-btn"
                            >
                                <FaGithub /> View Code
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}

export default Procaps
