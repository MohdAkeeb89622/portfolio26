import React from 'react'
import './contact.css'
import { HiOutlineMail } from 'react-icons/hi'
import { BsWhatsapp } from 'react-icons/bs'
import { useState } from 'react';

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const sendEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const formData = new FormData(e.target);
    formData.append("access_key", "66c7e3af-6564-4318-9e11-69c3009460d4");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setMessage('✅ Message sent successfully! I will reply soon.');
        e.target.reset();
      } else {
        setMessage(`❌ Error: ${data.message || 'Failed to send message'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('❌ Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <section id='contact'>
      <h5>Get In Touch</h5>
      <h2>Contact Me</h2>

      <div className="container contact__container">
        <div className="contact__options">
          <article className="contact__option">
            <HiOutlineMail className="contact__option-icon" />
            <h4>Email</h4>
            <h5>akeeb.0157cse@gmail.com</h5>
            <a href="mailto:akeeb.0157cse@gmail.com" target="_blank" rel="noreferrer">Send a Message</a>
          </article>
          <article className="contact__option">
            <BsWhatsapp className="contact__option-icon" />
            <h4>Whatapp</h4>
            <h5>+918319638561</h5>
            <a href="https://wa.me/918319638561" target="_blank" rel="noreferrer">Send a Message</a>
          </article>
        </div>
        <form onSubmit={sendEmail}>
          <input type="text" name="name" placeholder='Your Full Name' required />
          <input type="email" name="email" placeholder='Your Email' required />
          <textarea name="message" rows="7" placeholder='Your Message' required></textarea>
          <button type='submit' className='btn btn-primary' disabled={loading}>
            {loading ? 'Sending...' : 'Send Message'}
          </button>
          {message && <p style={{ marginTop: '1rem', textAlign: 'center', color: message.includes('✅') ? '#40C6FF' : '#ff6b6b' }}>{message}</p>}
        </form>
      </div>
    </section>
  )
}

export default Contact