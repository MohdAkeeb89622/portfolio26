import React from 'react'
import './footer.css'
import { ImTwitter } from 'react-icons/im'
const Footer = () => {
  return (
    <footer>
      <a href="#" className='footer__logo'>MAK</a>

      <ul className='permalinks'>
        <li><a href="#">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#experience">Experience</a></li>
        <li><a href="#services">Certifications</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>

      <div className="footer__socials">
        <a href="https://twitter.com/MohdAkeebKhan1?t=b2Yus5UHa7yqtQMDUjkd4Q&s=08" target="_blank"><ImTwitter /></a>
      </div>

      <div className="footer__copyright">
        <small>&copy; Mohd Akeeb Khan. All rights reserved.</small>
      </div>


      <div class="loop-wrapper">
        <div class="mountain"></div>
        <div class="hill"></div>
        <div class="tree"></div>
        <div class="tree"></div>
        <div class="tree"></div>
        <div class="rock"></div>
        <div class="truck"></div>
        <div class="wheels"></div>
      </div>
    </footer>



  )
}

export default Footer