import React, { useState } from 'react'
import './experience.css'

const tabs = ['Data Science', 'Machine Learning', 'Deep Learning', 'Web Dev', 'Tools & Platforms']

const skillsData = {
  'Data Science': [
    { icon: '🐍', name: 'Python', level: 'Advanced', color: 'blue' },
    { icon: '🐼', name: 'Pandas', level: 'Advanced', color: 'blue' },
    { icon: '🔢', name: 'NumPy', level: 'Advanced', color: 'blue' },
    { icon: '📊', name: 'Matplotlib', level: 'Proficient', color: 'blue' },
    { icon: '🌊', name: 'Seaborn', level: 'Proficient', color: 'blue' },
    { icon: '🔍', name: 'EDA', level: 'Advanced', color: 'blue' },
    { icon: '⚙️', name: 'Feature Engineering', level: 'Proficient', color: 'blue' },
    { icon: '📉', name: 'Statistics', level: 'Proficient', color: 'blue' },
    { icon: '🔄', name: 'Data Augmentation', level: 'Proficient', color: 'blue' },
  ],
  'Machine Learning': [
    { icon: '🤖', name: 'Scikit-learn', level: 'Advanced', color: 'purple' },
    { icon: '📐', name: 'Regression', level: 'Advanced', color: 'purple' },
    { icon: '🏷️', name: 'Classification', level: 'Advanced', color: 'purple' },
    { icon: '🌲', name: 'Decision Trees', level: 'Advanced', color: 'purple' },
    { icon: '🌳', name: 'Random Forest', level: 'Advanced', color: 'purple' },
    { icon: '🎯', name: 'Vector Machine (SVM)', level: 'Proficient', color: 'purple' },
    { icon: '🔵', name: 'K-Means', level: 'Proficient', color: 'purple' },
    { icon: '🎛️', name: 'PCA / LDA', level: 'Proficient', color: 'purple' },
    { icon: '📊', name: 'EFA', level: 'Proficient', color: 'purple' },
    { icon: '🔗', name: 'HAC', level: 'Proficient', color: 'purple' },
    { icon: '🌀', name: 'DBSCAN', level: 'Proficient', color: 'purple' },
    { icon: '🔮', name: 'Anomaly Detection', level: 'Proficient', color: 'purple' },
    { icon: '📈', name: 'Time Series Prediction', level: 'Proficient', color: 'purple' },
    { icon: '💬', name: 'Sentiment Classification', level: 'Proficient', color: 'purple' },
  ],
  'Deep Learning': [
    { icon: '🧠', name: 'Neural Networks', level: 'Intermediate', color: 'purple' },
    { icon: '📡', name: 'MLP / CNN / RNN', level: 'Intermediate', color: 'purple' },
    { icon: '🔁', name: 'LSTM', level: 'Intermediate', color: 'purple' },
    { icon: '🔃', name: 'GRU', level: 'Intermediate', color: 'purple' },
    { icon: '🔀', name: 'Encoder Decoder', level: 'Intermediate', color: 'purple' },
    { icon: '⚡', name: 'PyTorch', level: 'Learning', color: 'purple' },
    { icon: '👁️', name: 'OpenCV', level: 'Proficient', color: 'purple' },
    { icon: '🖼️', name: 'Image Processing', level: 'Proficient', color: 'purple' },
    { icon: '🎵', name: 'Audio Processing', level: 'Intermediate', color: 'purple' },
    { icon: '🚶', name: 'Pedestrian Detection', level: 'Intermediate', color: 'purple' },
  ],
  'Web Dev': [
    { icon: '⚛️', name: 'React.js', level: 'Advanced', color: 'teal' },
    { icon: '🌐', name: 'HTML5', level: 'Advanced', color: 'teal' },
    { icon: '🎨', name: 'CSS3', level: 'Advanced', color: 'teal' },
    { icon: '⚡', name: 'JavaScript', level: 'Advanced', color: 'teal' },
    { icon: '🅱️', name: 'Bootstrap', level: 'Proficient', color: 'teal' },
    { icon: '🗂️', name: 'WordPress', level: 'Proficient', color: 'teal' },
    { icon: '🗄️', name: 'SQL', level: 'Proficient', color: 'teal' },
    { icon: '🐬', name: 'MySQL', level: 'Proficient', color: 'teal' },
    { icon: '🚀', name: 'FastAPI', level: 'Proficient', color: 'teal' },
  ],
  'Tools & Platforms': [
    { icon: '🐙', name: 'Git / GitHub', level: 'Advanced', color: 'amber' },
    { icon: '📓', name: 'Jupyter', level: 'Advanced', color: 'amber' },
    { icon: '☁️', name: 'Google Colab', level: 'Advanced', color: 'amber' },
    { icon: '💻', name: 'VS Code', level: 'Advanced', color: 'amber' },
    { icon: '🐳', name: 'Docker', level: 'Learning', color: 'amber' },
    { icon: '☁️', name: 'Render', level: 'Proficient', color: 'amber' },
    { icon: '▲', name: 'Vercel', level: 'Proficient', color: 'amber' },
    { icon: '📦', name: 'Anaconda', level: 'Advanced', color: 'amber' },
    { icon: '📊', name: 'Excel', level: 'Advanced', color: 'amber' },
    { icon: '🧪', name: 'Kaggle', level: 'Proficient', color: 'amber' },
  ],
}

const levelOrder = ['Advanced', 'Proficient', 'Intermediate', 'Learning']

const Experience = () => {
  const [activeTab, setActiveTab] = useState('Data Science')

  return (
    <section id='experience'>
      <h2>Skills</h2>

      <div className="skills__tabs">
        {tabs.map(tab => (
          <button
            key={tab}
            className={`skills__tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="container skills__orb-grid">
        {skillsData[activeTab].map((skill, i) => (
          <div
            key={skill.name}
            className={`skill__orb skill__orb--${skill.color}`}
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <span className="skill__orb-icon">{skill.icon}</span>
            <span className="skill__orb-name">{skill.name}</span>
            <span className={`skill__orb-level skill__orb-level--${skill.level.toLowerCase()}`}>
              {skill.level}
            </span>
          </div>
        ))}
      </div>

      <div className="skills__legend">
        {levelOrder.map(lvl => (
          <span key={lvl} className={`skills__legend-item skills__legend-item--${lvl.toLowerCase()}`}>
            <span className="skills__legend-dot"></span>
            {lvl}
          </span>
        ))}
      </div>
    </section>
  )
}

export default Experience