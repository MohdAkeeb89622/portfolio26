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

          <p>
            Proficient in translating designs & wireframes into high-quality code, and writing application interface code via Javascript and ReactJS workflows.
            Adept at monitoring & maintaining frontend performance and troubleshooting & debugging the same to bolster overall performance.
          </p>

          <a href="#contact" className='btn btn-primary'>Let's talk</a>
        </div>
      </div>
    </section>
  )
}

export default About