import React from 'react'
import './about.css'
import ME from '../../assets/image/me2.png'

const About = () => {
  return (
    <section id='about'>
      <h5>Get To Know</h5>
      <h2>About Me</h2>

      <div className="container about__container">
        <div className="about__me">
          <div className="about__me-image">
            <img src={ME} alt="Mohd Akeeb Khan" />
          </div>
        </div>

        <div className="about__content">
          <p className="about__text">
            I'm <span className="about__accent">Mohd Akeeb Khan</span>, a results-driven professional 
            with <span className="about__accent">4+ years of experience</span> in software development 
            and technology recruiting, now transitioning into <span className="about__accent">Data Science 
            and Machine Learning</span> through advanced training 
            with <span className="about__accent">IIT Guwahati</span> and <span className="about__accent">Masai</span>.
          </p>

          <p className="about__text">
            My strength lies in combining technical problem-solving, analytical thinking, and product 
            understanding to build meaningful solutions. I work across the complete data science 
            workflow — from cleaning and exploring raw data to feature engineering, model development, 
            evaluation, and visualization. My experience includes regression, classification, decision 
            trees, ensemble methods, SVM, clustering, and dimensionality reduction, along with 
            foundational knowledge of deep learning architectures such as MLP, CNN, and RNN.
          </p>

          <p className="about__text">
            I primarily work with <span className="about__accent">Python</span>, <span className="about__accent">SQL</span>, 
            NumPy, Pandas, Scikit-learn, Matplotlib, Seaborn, and Plotly to create clear, reproducible, 
            and business-focused analytics solutions. My background 
            in <span className="about__accent">React</span> and <span className="about__accent">JavaScript</span> development 
            adds another dimension to my profile, helping me think beyond algorithms and focus on how 
            insights can translate into real products, better decisions, and user impact.
          </p>

          <p className="about__text">
            I'm currently looking for <span className="about__accent">entry-level roles in Data Science, 
            Machine Learning, and Analytics</span>, where I can apply my skills, continue learning, 
            and contribute to solving real-world business problems with data.
          </p>

          <a href="#contact" className='btn btn-primary about__cta'>Let's Talk</a>
        </div>
      </div>
    </section>
  )
}

export default About