import React, { useState, useRef, useEffect } from 'react';
import './animated-projects.css';
import Capstone from '../capstone/Capstone';
import FaceDetection from '../facedetection/FaceDetection';

const AnimatedProjects = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [showCapstoneFullscreen, setShowCapstoneFullscreen] = useState(false);
  const [showFaceDetectionFullscreen, setShowFaceDetectionFullscreen] = useState(false);
  const itemsRef = useRef([]);

  const projects = [
    {
      id: 1,
      title: "Stock Market Anomaly Detection",
      folder: "📊 Capstone",
      description: "AI-powered anomaly detection system using rolling-window statistics",
      tech: ["Python", "FastAPI", "React", "Z-Score Analysis"],
      link: "#capstone"
    },
    {
      id: 2,
      title: "Face Detection System",
      folder: "👤 Capstone",
      description: "Real-time face detection using YOLOv8 ONNX model with confidence scoring and bounding box localization",
      tech: ["Python", "FastAPI", "YOLOv8", "ONNX", "React"],
      link: "#facedetection"
    },
  ];

  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Re-observe all items whenever we return from fullscreen
    setTimeout(() => {
      itemsRef.current.forEach((item) => {
        if (item) {
          observer.observe(item);
          // Re-trigger animation if already visible
          if (item.getBoundingClientRect().top < window.innerHeight) {
            item.classList.add('visible');
          }
        }
      });
    }, 100);

    return () => {
      itemsRef.current.forEach((item) => {
        if (item) observer.unobserve(item);
      });
    };
  }, [showCapstoneFullscreen, showFaceDetectionFullscreen]);

  const toggleExpand = (id) => {
    if (id === 1) {
      // Stock Market Capstone opens in fullscreen
      setShowCapstoneFullscreen(true);
    } else if (id === 2) {
      // Face Detection opens in fullscreen
      setShowFaceDetectionFullscreen(true);
    } else {
      setExpandedId(expandedId === id ? null : id);
    }
  };

  if (showCapstoneFullscreen) {
    return (
      <div className="capstone-fullscreen-modal">
        <button className="close-btn" onClick={() => setShowCapstoneFullscreen(false)}>
          ✕ Close
        </button>
        <Capstone />
      </div>
    );
  }

  if (showFaceDetectionFullscreen) {
    return (
      <div className="capstone-fullscreen-modal">
        <button className="close-btn" onClick={() => setShowFaceDetectionFullscreen(false)}>
          ✕ Close
        </button>
        <FaceDetection />
      </div>
    );
  }

  return (
    <section id="projects-animated">
      <h5>My Work</h5>
      <h2>Capstone Project</h2>

      <div className="projects-container">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={`project-folder ${expandedId === project.id ? 'expanded' : ''}`}
            ref={(el) => (itemsRef.current[index] = el)}
            onClick={() => toggleExpand(project.id)}
          >
            {/* Folder Header */}
            <div className="folder-header">
              <div className="folder-icon">{project.folder}</div>
              <div className="folder-info">
                <h3>{project.title}</h3>
                <p className="folder-path">{project.folder}</p>
              </div>
              <div className="expand-icon">
                {expandedId === project.id ? '▼' : '▶'}
              </div>
            </div>

            {/* Folder Content */}
            {expandedId === project.id && (
              <div className="folder-content">
                <p className="description">{project.description}</p>

                <div className="tech-stack">
                  <h4>Tech Stack</h4>
                  <div className="tech-tags">
                    {project.tech.map((tech, idx) => (
                      <span key={idx} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>

                <a href={project.link} className="view-btn">
                  View Project →
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default AnimatedProjects;
