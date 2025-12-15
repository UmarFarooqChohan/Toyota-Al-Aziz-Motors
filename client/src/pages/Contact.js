import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import { contactService } from '../services/api';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    interestedCar: '',
    message: ''
  });
  const [formMessage, setFormMessage] = useState({ text: '', type: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message || !formData.subject) {
      setFormMessage({ text: 'Please fill in all required fields.', type: 'error' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormMessage({ text: 'Please enter a valid email address.', type: 'error' });
      return;
    }

    try {
      console.log('📤 Submitting contact form:', formData);
      const response = await contactService.submitContact(formData);
      console.log('✅ Contact response:', response.data);
      
      setFormMessage({ text: response.data.message, type: 'success' });
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        interestedCar: '',
        message: ''
      });
    } catch (error) {
      console.error('❌ Contact submission error:', error);
      console.error('Error response:', error.response?.data);
      
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          'Error submitting form. Please try again.';
      setFormMessage({ text: errorMessage, type: 'error' });
    }
  };

  return (
    <div>
      <Header />
      
      <main>
        <section className="contact-hero">
          <div className="hero-content">
            <h2>Contact Al-Aziz Motor House</h2>
            <p>Get in touch with us for Toyota car inquiries, bookings, and exceptional customer service</p>
          </div>
        </section>

        <section className="contact-container">
          <div className="contact-wrapper">
            <div className="contact-form">
              <h3>Get In Touch</h3>
              <p className="contact-form-subtitle">Ready to find your perfect Toyota? Send us a message and our team will get back to you within 24 hours.</p>
              <form id="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="Enter your full name" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="Enter your email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="Enter your phone number" 
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Subject</label>
                    <select 
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    >
                      <option value="">Choose a subject</option>
                      <option value="car-inquiry">Car Inquiry</option>
                      <option value="booking">Car Booking</option>
                      <option value="service">Service & Support</option>
                      <option value="financing">Financing Options</option>
                      <option value="general">General Information</option>
                      <option value="complaint">Complaint</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Interested Car (Optional)</label>
                  <select 
                    value={formData.interestedCar}
                    onChange={(e) => setFormData({...formData, interestedCar: e.target.value})}
                  >
                    <option value="">Select a car model</option>
                    <option value="Toyota Passo">Toyota Passo</option>
                    <option value="Toyota Vitz">Toyota Vitz</option>
                    <option value="Toyota Corolla">Toyota Corolla</option>
                    <option value="Toyota Yaris">Toyota Yaris</option>
                    <option value="Toyota Aqua">Toyota Aqua</option>
                    <option value="Toyota Camry">Toyota Camry</option>
                    <option value="Toyota Fortuner">Toyota Fortuner</option>
                    <option value="Toyota Prado">Toyota Prado</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea 
                    placeholder="Tell us about your requirements, budget, or any questions you have..." 
                    rows="5" 
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>
                <button type="submit" className="submit-btn">Send Message</button>
              </form>
              {formMessage.text && (
                <div className={`form-message show ${formMessage.type}`}>
                  {formMessage.text}
                </div>
              )}
            </div>

            <div className="contact-info">
              <div className="business-card-section">
                <h3>Our Business Card</h3>
                <img src="/IMG/F card.jpg" alt="Al-Aziz Motor House Business Card" className="business-card-img" />
              </div>

              <div className="contact-details">
                

                <div className="contact-item">
                  <div className="contact-icon">📞</div>
                  <div className="contact-text">
                    <strong>Phone:</strong><br />
                    <a href="tel:+923315921592">+92 331 592 1592</a>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">📧</div>
                  <div className="contact-text">
                    <strong>Email:</strong><br />
                    <a href="https://mail.google.com/mail/u/0/?to=umar.farooq1592@gmail.com&su=Car+Inquiry+from+Website&fs=1&tf=cm">umar.farooq1592@gmail.com</a>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">🕒</div>
                  <div className="contact-text">
                    <strong>Business Hours:</strong><br />
                    Monday - Saturday:<br /> 9:00 AM - 7:00 PM<br />
                    Sunday:<br /> 10:00 AM - 5:00 PM
                  </div>
                </div>
              </div>

          
            </div>
          </div>
        </section>

        <section className="map-section">
          <h3>Find Us on Map</h3>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54449.67648292663!2d74.31844!3d31.578947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39191b2de729f64d%3A0x46b7a1c7c6c6c6c6!2sIslampura%2C%20Lahore%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2sus!4v1640000000000!5m2!1sen!2sus"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Al-Aziz Motor House Location"
            ></iframe>
          </div>
        </section>

        <section className="quick-contact">
          <div className="quick-contact-content">
            <h3>Need Immediate Assistance?</h3>
            <p>For urgent inquiries or immediate support, reach out to us directly:</p>
            <div className="quick-contact-buttons">
              <a href="tel:+923315921592" className="quick-btn phone-btn">
                📞 Call Now
              </a>
              
              <a href="mailto:umar.farooq1592@gmail.com" target="_blank" rel="noopener noreferrer" className="quick-btn email-btn">
                📧 Email
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Contact;
