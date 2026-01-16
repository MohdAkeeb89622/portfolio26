import React from 'react'
import './project.css'
import pr1 from '../../assets/image/pr1.png'
import pr2 from '../../assets/image/pr2.png'


// import Swiper core and required modules
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const data = [
  {
    proj: pr1,
    name: "CAR RATE PREDICTION",
    aim: "Aim:- This app predicts the rate of pre-owned cars using an algorithm based on ML and internal computation with the details. The technology used:- Python, ML, CSS, JS, HTML and Django. Efficiency - The rates predicted by this app were 95% accurate on being compared to market giants like OLX and Maruti True Value.",
  },
  {
    proj: pr2,
    name: "PORTFOLIO USING REACT",
    aim: 'Aim:- Dynamically created portfolio created by me using REACT, HTML, CSS, JAVA SCRIPT, etc....',
  },
]

const Project = () => {
  return (
    <section>
      <h5>"The simpler you say it, the more eloquent it is."</h5>
      <h2>Old-Projects</h2>

      <Swiper className="container project__container"
        // install Swiper modules
        modules={[Pagination]}
        spaceBetween={40}
        slidesPerView={1}
        pagination={{ clickable: true }}>
        {
          data.map(({ proj, name, aim }, index) => {
            return (
              <SwiperSlide key={index} className="project">
                <div className="first__project">
                  <img src={proj} alt={name} />
                </div>

                <h5 className='project__h5'>{aim}</h5>
                <a href="https://github.com/MohdAkeeb89622" className="btn" target='_blank' rel="noopener noreferrer">{name}</a>
              </SwiperSlide>
            )
          })
        }
      </Swiper>
    </section>

  )
}

export default Project