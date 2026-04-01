import React, { useEffect, useRef, useState } from 'react';
import './work-experience.css';

const journeyData = [
  {
    id: 3,
    category: 'Education',
    icon: '🎓',
    title: 'Data Science & Machine Learning Certification',
    org: 'Daksh Gurukul, IIT Guwahati',
    date: '2025 – 2026',
    description: 'Comprehensive training in predictive modeling, deep learning, NLP, and deployed ML architectures.'
  },
  {
    id: 1,
    category: 'Experience',
    icon: '💻',
    title: 'Web Developer (React / Frontend)',
    org: 'Hacking Laymen, Bhopal',
    date: 'Dec 2021 – Dec 2024',
    description: 'Designed and developed 10+ responsive web applications using React.js. Built client-facing dashboards with real-time data display. Engineered e-commerce solutions and CMS platforms.'
  },
  {
    id: 2,
    category: 'Experience',
    icon: '☕',
    title: 'Java Intern',
    org: 'Acufer Technologies, Bhopal',
    date: 'Jul 2021 – Oct 2021',
    description: 'Developed a Java-based login and user management web application, focusing on backend database integration.'
  },
  {
    id: 4,
    category: 'Education',
    icon: '🏫',
    title: 'Bachelor of Technology — Computer Science Engineering',
    org: 'RGPV, Bhopal',
    date: '2017 – 2021',
    description: 'Core computer science fundamentals, algorithms, software engineering, and database systems.'
  }
];

const JourneyItem = ({ item, isEven }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const itemRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    const currentRef = itemRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div
      ref={itemRef}
      className={`journey__item ${isVisible ? 'visible' : ''} ${isEven ? 'even' : 'odd'}`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="journey__icon">{item.icon}</div>
      <div className="journey__content">
        <span className="journey__category">{item.category}</span>
        <h3>{item.title}</h3>
        <h4 className="journey__org">{item.org}</h4>
        <div className="journey__date">{item.date}</div>
        
        <div className={`journey__details ${isExpanded ? 'expanded' : ''}`}>
          <p>{item.description}</p>
        </div>
        
        <span className="journey__expand-prompt">
          {isExpanded ? 'Show Less' : 'Click to Expand'}
        </span>
      </div>
    </div>
  );
};

const WorkExperience = () => {
  return (
    <section id='work-experience'>
      <h5>My Journey</h5>
      <h2>Experience & Education</h2>

      <div className="container journey__container">
        <div className="journey__timeline"></div>
        {journeyData.map((item, index) => (
          <JourneyItem key={item.id} item={item} isEven={index % 2 === 0} />
        ))}
      </div>
    </section>
  );
}

export default WorkExperience;
