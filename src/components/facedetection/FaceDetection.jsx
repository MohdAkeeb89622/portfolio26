import React, { useState, useRef, useEffect } from 'react';
import './face-detection.css';

const FaceDetection = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [detectionResult, setDetectionResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [dragActive, setDragActive] = useState(false);

    const canvasRef = useRef(null);
    const imageRef = useRef(null);
    const fileInputRef = useRef(null);

    const API_URL = 'http://localhost:8001';

    // Handle file selection
    const handleFileSelect = (file) => {
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setError('Please select a valid image file');
            return;
        }

        setSelectedImage(file);
        setError(null);
        setDetectionResult(null);

        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    // Handle drag and drop
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileSelect(e.dataTransfer.files[0]);
        }
    };

    // Detect faces
    const detectFaces = async () => {
        if (!selectedImage) {
            setError('Please select an image first');
            return;
        }

        setLoading(true);
        setError(null);
        setDetectionResult(null);

        try {
            const formData = new FormData();
            formData.append('file', selectedImage);

            const response = await fetch(`${API_URL}/detect`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Detection failed');
            }

            const result = await response.json();
            setDetectionResult(result);

            // Draw bounding boxes after image loads
            if (result.faces && result.faces.length > 0) {
                setTimeout(() => drawBoundingBoxes(result), 100);
            }

        } catch (err) {
            console.error('Detection error:', err);
            setError(err.message || 'Failed to detect faces. Make sure the backend is running.');
        } finally {
            setLoading(false);
        }
    };

    // Draw bounding boxes on canvas
    const drawBoundingBoxes = (result) => {
        const canvas = canvasRef.current;
        const image = imageRef.current;

        if (!canvas || !image || !result.faces) return;

        const ctx = canvas.getContext('2d');

        // Set canvas size to match image display size
        const rect = image.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;

        // Calculate scale factors
        const scaleX = rect.width / result.image_size[0];
        const scaleY = rect.height / result.image_size[1];

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw each bounding box
        result.faces.forEach((face, index) => {
            const [x1, y1, x2, y2] = face.bbox;

            // Scale coordinates to canvas size
            const scaledX1 = x1 * scaleX;
            const scaledY1 = y1 * scaleY;
            const scaledWidth = (x2 - x1) * scaleX;
            const scaledHeight = (y2 - y1) * scaleY;

            // Draw bounding box with gradient
            ctx.strokeStyle = '#00d4ff';
            ctx.lineWidth = 3;
            ctx.shadowColor = '#00d4ff';
            ctx.shadowBlur = 10;
            ctx.strokeRect(scaledX1, scaledY1, scaledWidth, scaledHeight);

            // Draw corner accents
            const cornerLength = 20;
            ctx.lineWidth = 4;

            // Top-left corner
            ctx.beginPath();
            ctx.moveTo(scaledX1, scaledY1 + cornerLength);
            ctx.lineTo(scaledX1, scaledY1);
            ctx.lineTo(scaledX1 + cornerLength, scaledY1);
            ctx.stroke();

            // Top-right corner
            ctx.beginPath();
            ctx.moveTo(scaledX1 + scaledWidth - cornerLength, scaledY1);
            ctx.lineTo(scaledX1 + scaledWidth, scaledY1);
            ctx.lineTo(scaledX1 + scaledWidth, scaledY1 + cornerLength);
            ctx.stroke();

            // Bottom-left corner
            ctx.beginPath();
            ctx.moveTo(scaledX1, scaledY1 + scaledHeight - cornerLength);
            ctx.lineTo(scaledX1, scaledY1 + scaledHeight);
            ctx.lineTo(scaledX1 + cornerLength, scaledY1 + scaledHeight);
            ctx.stroke();

            // Bottom-right corner
            ctx.beginPath();
            ctx.moveTo(scaledX1 + scaledWidth - cornerLength, scaledY1 + scaledHeight);
            ctx.lineTo(scaledX1 + scaledWidth, scaledY1 + scaledHeight);
            ctx.lineTo(scaledX1 + scaledWidth, scaledY1 + scaledHeight - cornerLength);
            ctx.stroke();

            // Draw label with confidence
            ctx.shadowBlur = 0;
            ctx.fillStyle = 'rgba(0, 212, 255, 0.9)';
            ctx.fillRect(scaledX1, scaledY1 - 30, 100, 25);

            ctx.fillStyle = '#000';
            ctx.font = 'bold 14px Inter, sans-serif';
            ctx.fillText(`Face ${index + 1}`, scaledX1 + 5, scaledY1 - 10);
            ctx.font = '12px Inter, sans-serif';
            ctx.fillText(`${(face.confidence * 100).toFixed(1)}%`, scaledX1 + 65, scaledY1 - 10);
        });
    };

    // Redraw boxes on window resize
    useEffect(() => {
        if (detectionResult && detectionResult.faces.length > 0) {
            const handleResize = () => drawBoundingBoxes(detectionResult);
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, [detectionResult]);

    return (
        <div className="face-detection-container">
            <div className="face-detection-header">
                <h1>🎯 Face Detection System</h1>
                <p className="subtitle">CNN-Powered Real-Time Face Detection</p>
            </div>

            <div className="detection-workspace">
                {/* Upload Section */}
                <div className="upload-section">
                    <div
                        className={`upload-zone ${dragActive ? 'drag-active' : ''}`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileSelect(e.target.files[0])}
                            style={{ display: 'none' }}
                        />

                        {!imagePreview ? (
                            <div className="upload-placeholder">
                                <div className="upload-icon">📸</div>
                                <h3>Drop image here or click to upload</h3>
                                <p>Supports JPG, PNG, WebP</p>
                            </div>
                        ) : (
                            <div className="image-preview-container">
                                <img
                                    ref={imageRef}
                                    src={imagePreview}
                                    alt="Preview"
                                    className="image-preview"
                                    onLoad={() => {
                                        if (detectionResult && detectionResult.faces.length > 0) {
                                            drawBoundingBoxes(detectionResult);
                                        }
                                    }}
                                />
                                <canvas ref={canvasRef} className="detection-canvas" />
                            </div>
                        )}
                    </div>

                    <button
                        className="detect-btn"
                        onClick={detectFaces}
                        disabled={!selectedImage || loading}
                    >
                        {loading ? (
                            <>
                                <span className="spinner"></span>
                                Detecting Faces...
                            </>
                        ) : (
                            <>
                                <span className="btn-icon">🔍</span>
                                Detect Faces
                            </>
                        )}
                    </button>
                </div>

                {/* Results Section */}
                <div className="results-section">
                    <h2>Detection Results</h2>

                    {error && (
                        <div className="error-message">
                            <span className="error-icon">⚠️</span>
                            {error}
                        </div>
                    )}

                    {detectionResult && (
                        <div className="results-content">
                            <div className="stats-grid">
                                <div className="stat-card">
                                    <div className="stat-icon">👥</div>
                                    <div className="stat-info">
                                        <h3>{detectionResult.face_count}</h3>
                                        <p>Faces Detected</p>
                                    </div>
                                </div>

                                <div className="stat-card">
                                    <div className="stat-icon">📐</div>
                                    <div className="stat-info">
                                        <h3>{detectionResult.image_size[0]}×{detectionResult.image_size[1]}</h3>
                                        <p>Image Size</p>
                                    </div>
                                </div>

                                <div className="stat-card">
                                    <div className="stat-icon">✨</div>
                                    <div className="stat-info">
                                        <h3>
                                            {detectionResult.faces.length > 0
                                                ? `${(detectionResult.faces.reduce((sum, f) => sum + f.confidence, 0) / detectionResult.faces.length * 100).toFixed(1)}%`
                                                : 'N/A'
                                            }
                                        </h3>
                                        <p>Avg Confidence</p>
                                    </div>
                                </div>
                            </div>

                            {detectionResult.faces.length > 0 && (
                                <div className="faces-list">
                                    <h3>Detected Faces</h3>
                                    {detectionResult.faces.map((face, index) => (
                                        <div key={index} className="face-item">
                                            <div className="face-number">Face {index + 1}</div>
                                            <div className="face-details">
                                                <div className="detail">
                                                    <span className="label">Confidence:</span>
                                                    <span className="value">{(face.confidence * 100).toFixed(2)}%</span>
                                                </div>
                                                <div className="detail">
                                                    <span className="label">Position:</span>
                                                    <span className="value">({face.center[0]}, {face.center[1]})</span>
                                                </div>
                                                <div className="detail">
                                                    <span className="label">Size:</span>
                                                    <span className="value">
                                                        {face.bbox[2] - face.bbox[0]} × {face.bbox[3] - face.bbox[1]}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {detectionResult.face_count === 0 && (
                                <div className="no-faces-message">
                                    <span className="icon">🔍</span>
                                    <p>No faces detected in this image</p>
                                    <p className="hint">Try uploading a different image with visible faces</p>
                                </div>
                            )}
                        </div>
                    )}

                    {!detectionResult && !error && (
                        <div className="empty-state">
                            <span className="icon">📊</span>
                            <p>Upload an image and click "Detect Faces" to see results</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Tech Info */}
            <div className="tech-info">
                <div className="tech-badge">
                    <span className="badge-icon">🧠</span>
                    <span>Haar Cascade CNN</span>
                </div>
                <div className="tech-badge">
                    <span className="badge-icon">⚡</span>
                    <span>Real-time Detection</span>
                </div>
                <div className="tech-badge">
                    <span className="badge-icon">🎯</span>
                    <span>Multi-face Support</span>
                </div>
            </div>
        </div>
    );
};

export default FaceDetection;
