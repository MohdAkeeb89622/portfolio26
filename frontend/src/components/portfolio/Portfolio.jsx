import React from 'react'
import './portfolio.css'
import IMG1 from '../../assets/image/port-1.PNG'
import IMG2 from '../../assets/image/port-2.PNG'
import IMG3 from '../../assets/image/port-3.PNG'
import IMG4 from '../../assets/image/port-4.PNG'
import IMG5 from '../../assets/image/port-5.PNG'
import IMG6 from '../../assets/image/port-6.PNG'

const Portfolio = () => {
  return (
    <section id='portfolio'>
      <h5>My React Work</h5>
      <h2>Portfolio</h2>

      <div className="container portfolio__container">
        <article className="portfolio__items">
          <div className="portfolio__item-image">
            <img src={IMG1} />
          </div>
          <h3>HEADER OF PORTFOLIO</h3>
          <div className="portfolio__item-cta">
          <a href="https://github.com/MoAkeebKhan/portfolio.git" className='btn' target='_blank'>Github</a>
          </div>
        </article>
        <article className="portfolio__items">
          <div className="portfolio__item-image">
            <img src={IMG2} />
          </div>
          <h3>ANIMATED IMAGE SLIDES</h3>
          <div className="portfolio__item-cta">
          <a href="https://github.com/MoAkeebKhan/portfolio.git" className='btn' target='_blank'>Github</a>
          </div>
        </article>
        <article className="portfolio__items">
          <div className="portfolio__item-image">
            <img src={IMG3} />
          </div>
          <h3>EXPERIENCE BLOG</h3>
          <div className="portfolio__item-cta">
          <a href="https://github.com/MoAkeebKhan/portfolio.git" className='btn' target='_blank'>Github</a>
          </div>
        </article>
        <article className="portfolio__items">
          <div className="portfolio__item-image">
            <img src={IMG4} />
          </div>
          <h3>SKILLS BLOG</h3>
          <div className="portfolio__item-cta">
          <a href="https://github.com/MoAkeebKhan/portfolio.git" className='btn' target='_blank'>Github</a>
          </div>
        </article>
        <article className="portfolio__items">
          <div className="portfolio__item-image">
            <img src={IMG5} />
          </div>
          <h3>HTML SCRIPT</h3>
          <div className="portfolio__item-cta">
          <a href="https://github.com/MoAkeebKhan/portfolio.git" className='btn' target='_blank'>Github</a>
          </div>
        </article>
        <article className="portfolio__items">
          <div className="portfolio__item-image">
            <img src={IMG6} />
          </div>
          <h3>CSS CODE</h3>
          <div className="portfolio__item-cta">
          <a href="https://github.com/MoAkeebKhan/portfolio.git" className='btn' target='_blank'>Github</a>
          </div>
        </article>
      </div>
    </section>
  )
}
export default Portfolio