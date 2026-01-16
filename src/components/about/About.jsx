import React from 'react'
import './about.css'
import ME from '../../assets/image/me2.png'
import { TbAward } from 'react-icons/tb'
import { FiUsers } from 'react-icons/fi'
import { VscFolderLibrary } from 'react-icons/vsc'

const About = () => {
  return (
    <section id='about'>
      <h5>Get To Know</h5>
      <h2>About Me</h2>
      <div className="container about__container">
        <div className="about__me">
          <div className="about__me-image">
            <img src={ME} alt="About Image" />
          </div>
        </div>
        <div className="about__content">
          <div className="about__cards">
            <article className='about__card'>
              <TbAward className='about__icon' />
              <h5>Experience</h5>
              <small>4+ Years Working</small>
            </article>

            <article className='about__card'>
              <FiUsers className='about__icon' />
              <h5>Techstack</h5>
              <small>React, Wordpress, Java, HTML, CSS, Javascript, node.js, mongodb, git, github</small>
            </article>

            <article className='about__card'>
              <VscFolderLibrary className='about__icon' />
              <h5>Projects</h5>
              <small>10+ Completed [US based]</small>
            </article>
          </div>
        </div>
      </div>

      <div className="container about__description">
        <p>
          Results-oriented professional with 4+ years of experience in software development and technology recruiting, currently transitioning into Data Science and Machine Learning through a certification program (IIT Guwahati & Masai).
          <br /><br />
          I work on end-to-end data science problems, including data cleaning, exploratory data analysis (EDA), feature engineering, and building machine learning models with proper validation and evaluation.
          <br /><br />
          My experience covers supervised and unsupervised learning techniques such as regression, classification, tree-based and ensemble models, SVM, K-Means, and dimensionality reduction using PCA/LDA. I also have foundational exposure to deep learning architectures including MLP, CNN, and RNN through coursework.
          <br /><br />
          I primarily use Python (NumPy, Pandas, Scikit-learn), SQL, and visualization tools to build reproducible analytics workflows. My background as a React/JavaScript developer helps me bring strong product thinking and clarity to data-driven solutions.
        </p>
        <a href="#contact" className='btn btn-primary'>Let's talk</a>
      </div>
    </section>
  )
}

export default About