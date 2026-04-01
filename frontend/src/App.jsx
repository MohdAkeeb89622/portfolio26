import React from 'react'
import Header from './components/header/Header';
import Nav from './components/nav/Nav';
import About from './components/about/About';
import Experience from './components/experience/Experience';
import Services from './components/services/Services';
import Procaps from './components/procaps/Procaps';
import WorkExperience from './components/work-experience/WorkExperience';
import Project from './components/projects/Project';
import Contact from './components/contact/Contact';
import Footer from './components/footer/Footer';

const App = () => {
  return (
    <>
      <Header />
      <Nav />
      <About />
      <Experience />
      <Procaps />
      <Services />
      <Project />
      <WorkExperience />
      <Contact />
      <Footer />

    </>
  )
}

export default App