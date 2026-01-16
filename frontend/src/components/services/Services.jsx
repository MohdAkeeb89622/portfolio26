import React from 'react'
import './services.css'
import {GiCheckMark} from 'react-icons/gi'

const Services = () => {
  return (
    <section id='services'>
      <h5>Strive not to be a success, but rather to be of value.</h5>
      <h2>Certifications</h2>

      <div className="container services__container">
        <article className="service">
          <div className="service__head">
            <h3>Microsoft Certified In PYTHON</h3>
          </div>
          <ul className='service__list'>
            <li>
            <GiCheckMark className='service__list-icon'/>
            <p>Get a fundamental understanding of the Python programming language.</p>
            </li>
            <li>
            <GiCheckMark className='service__list-icon'/>
            <p>Learn the skills and understanding of Python to confidently apply for Python programming jobs.</p>
            </li>
            <li>
            <GiCheckMark className='service__list-icon'/>
            <p>Understand how to create your own Python programs.</p>
            </li>
            <li>
            <GiCheckMark className='service__list-icon'/>
            <p>Learn Python from experienced professional software developers.</p>
            </li>
            <li>
            <GiCheckMark className='service__list-icon'/>
            <p>Understand both Python 2 and Python 3.</p>
            </li>
          </ul>
        </article>
        {/* end of card1*/}
        <article className="service">
          <div className="service__head">
            <h3>Certification in DATA SCIENCE With MACHINE LEARNING WORKSHOP</h3>
          </div>
          <ul className='service__list'>
            <li>
            <GiCheckMark className='service__list-icon'/>
            <p>Exploratory Data Analysis.</p>
            </li>
            <li>
            <GiCheckMark className='service__list-icon'/>
            <p>Descriptive Statistics.</p>
            </li>
            <li>
            <GiCheckMark className='service__list-icon'/>
            <p>Model building and fine tuning.</p>
            </li>
            <li>
            <GiCheckMark className='service__list-icon'/>
            <p>Supervised and unsupervised learning.</p>
            </li>
            <li>
            <GiCheckMark className='service__list-icon'/>
            <p>Natural Language Processing.</p>
            </li>
          </ul>
        </article>
        {/* end of card2*/}
        <article className="service">
          <div className="service__head">
            <h3>Certification in AI Classroom Series</h3>
          </div>
          <ul className='service__list'>
            <li>
            <GiCheckMark className='service__list-icon'/>
            <p>Logical approach to AI and Knowledge-Based system.</p>
            </li>
            <li>
            <GiCheckMark className='service__list-icon'/>
            <p>Probabilistic approach to AI.</p>
            </li>
            <li>
            <GiCheckMark className='service__list-icon'/>
            <p>Neural Networks and Natural Language Understanding.</p>
            </li>
            <li>
            <GiCheckMark className='service__list-icon'/>
            <p>Introduction to Machine Learning.</p>
            </li>
            <li>
            <GiCheckMark className='service__list-icon'/>
            <p>Learning deterministic models.</p>
            </li>
          </ul>
        </article>
        {/* end of card3*/}
      </div>
    </section>
  )
}

export default Services