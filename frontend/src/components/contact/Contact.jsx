import React, { useRef, useState } from 'react'
import './contact.css'
import { HiOutlineMail } from 'react-icons/hi'
import { BsWhatsapp } from 'react-icons/bs'
import emailjs from 'emailjs-com';

const Contact = () => {
  const form = useRef();
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [sending, setSending] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setSending(true);

    emailjs.sendForm('service_lwwdssh', 'template_feqompj', form.current, '1KnYBKzD3i9An_ch9')
      .then(() => {
        setToast({ show: true, message: '✅ Thank you for reaching out! Your message has been sent successfully.', type: 'success' });
        e.target.reset();
        setTimeout(() => setToast({ show: false, message: '', type: '' }), 5000);
      })
      .catch(() => {
        setToast({ show: true, message: '❌ Oops! Something went wrong. Please try again later.', type: 'error' });
        setTimeout(() => setToast({ show: false, message: '', type: '' }), 5000);
      })
      .finally(() => setSending(false));
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
            <a href="https://mail.google.com/mail/?view=cm&to=akeeb.0157cse@gmail.com" target="_blank">Send a Message</a>
          </article>
          <article className="contact__option">
            <BsWhatsapp className="contact__option-icon" />
            <h4>Whatapp</h4>
            <h5>+918319638561</h5>
            <a href="https://wa.me/918319638561" target="_blank">Send a Message</a>
          </article>
        </div>
        <form ref={form} onSubmit={sendEmail}>
          <input type="text" name='name' placeholder='Your Full Name' required />
          <input type="email" name='email' placeholder='Your Email' required />
          <textarea name="message" rows="7" placeholder='Your Message'></textarea>
          <button type='submit' className='btn btn-primary' disabled={sending}>
            {sending ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>

      {toast.show && (
        <div className={`contact__toast contact__toast--${toast.type}`}>
          <span>{toast.message}</span>
          <button className="contact__toast-close" onClick={() => setToast({ show: false, message: '', type: '' })}>×</button>
        </div>
      )}
    </section>
  )
}

export default Contact