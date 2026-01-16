import React from 'react'
import './experience.css'
import { SiCheckio } from 'react-icons/si'

const Experience = () => {
  return (
    <section id='experience'>
      <h5>What Skills I Have</h5>
      <h2>My Experience And Skills</h2>

      <div className="container experience__container">
        <div className="experience__frontend">
          <h3>Experience</h3>
          <div className="experience__content">
            <article className='experience__details'>
              <SiCheckio className='experience__details-icon' />
              <div>
                <h4>React.js</h4>
                <small className='text-light'>3+ Years Experienced</small>
              </div>
            </article>
            <article className='experience__details'>
              <SiCheckio className='experience__details-icon' />
              <div>
                <h4>HTML</h4>
                <small className='text-light'>3+ Years Experienced</small>
              </div>
            </article>
            <article className='experience__details'>
              <SiCheckio className='experience__details-icon' />
              <div>
                <h4>CSS</h4>
                <small className='text-light'>3+ Years Experienced</small>
              </div>
            </article>
            <article className='experience__details'>
              <SiCheckio className='experience__details-icon' />
              <div>
                <h4>Java Script</h4>
                <small className='text-light'>3+ Years Experienced</small>
              </div>
            </article>
            <article className='experience__details'>
              <SiCheckio className='experience__details-icon' />
              <div>
                <h4>Bootstrap</h4>
                <small className='text-light'>1+ Years Experienced</small>
              </div>
            </article>
            <article className='experience__details'>
              <SiCheckio className='experience__details-icon' />
              <div>
                <h4>Wordpress</h4>
                <small className='text-light'>1+ Years Experienced</small>
              </div>
            </article>
            <article className='experience__details'>
              <SiCheckio className='experience__details-icon' />
              <div>
                <h4>SQL</h4>
                <small className='text-light'>1+ Years Experienced</small>
              </div>
            </article>
          </div>
        </div>

        <div className="experience__backend">
          <h3>Learning Skills</h3>
          <div className="experience__content">
            <article className='experience__details'>
              <SiCheckio className='experience__details-icon' />
              <div>
                <h4>Python</h4>
              </div>
            </article>
            <article className='experience__details'>
              <SiCheckio className='experience__details-icon' />
              <div>
                <h4>NumPy</h4>
              </div>
            </article>
            <article className='experience__details'>
              <SiCheckio className='experience__details-icon' />
              <div>
                <h4>Pandas</h4>
              </div>
            </article>
            <article className='experience__details'>
              <SiCheckio className='experience__details-icon' />
              <div>
                <h4>Scikit-learn</h4>
              </div>
            </article>
            <article className='experience__details'>
              <SiCheckio className='experience__details-icon' />
              <div>
                <h4>Matplotlib</h4>
              </div>
            </article>
            <article className='experience__details'>
              <SiCheckio className='experience__details-icon' />
              <div>
                <h4>Seaborn</h4>
              </div>
            </article>
            <article className='experience__details'>
              <SiCheckio className='experience__details-icon' />
              <div>
                <h4>EDA</h4>
              </div>
            </article>
            <article className='experience__details'>
              <SiCheckio className='experience__details-icon' />
              <div>
                <h4>Feature Engineering</h4>
              </div>
            </article>
            <article className='experience__details'>
              <SiCheckio className='experience__details-icon' />
              <div>
                <h4>Model Evaluation</h4>
              </div>
            </article>
            <article className='experience__details'>
              <SiCheckio className='experience__details-icon' />
              <div>
                <h4>Regression</h4>
              </div>
            </article>
            <article className='experience__details'>
              <SiCheckio className='experience__details-icon' />
              <div>
                <h4>Classification</h4>
              </div>
            </article>
            <article className='experience__details'>
              <SiCheckio className='experience__details-icon' />
              <div>
                <h4>Decision Trees</h4>
              </div>
            </article>
            <article className='experience__details'>
              <SiCheckio className='experience__details-icon' />
              <div>
                <h4>Ensemble Models</h4>
              </div>
            </article>
            <article className='experience__details'>
              <SiCheckio className='experience__details-icon' />
              <div>
                <h4>SVM</h4>
              </div>
            </article>
            <article className='experience__details'>
              <SiCheckio className='experience__details-icon' />
              <div>
                <h4>K-Means</h4>
              </div>
            </article>
            <article className='experience__details'>
              <SiCheckio className='experience__details-icon' />
              <div>
                <h4>PCA/LDA</h4>
              </div>
            </article>
            <article className='experience__details'>
              <SiCheckio className='experience__details-icon' />
              <div>
                <h4>Neural Networks</h4>
              </div>
            </article>
            <article className='experience__details'>
              <SiCheckio className='experience__details-icon' />
              <div>
                <h4>MLP/CNN/RNN</h4>
              </div>
            </article>
            <article className='experience__details'>
              <SiCheckio className='experience__details-icon' />
              <div>
                <h4>SQL</h4>
              </div>
            </article>
            <article className='experience__details'>
              <SiCheckio className='experience__details-icon' />
              <div>
                <h4>MySQL</h4>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience