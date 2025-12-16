import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import { carService, bookingService } from '../services/api';
import './CarDetails.css';

// Quick Booking Form Component
const QuickBookingForm = ({ carName }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    selectedCar: carName,
    customerMessage: `Quick booking request from car details page`
  });
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.customerName || !formData.customerPhone || !formData.customerEmail) {
      setMessage({ text: 'Please fill in all fields.', type: 'error' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.customerEmail)) {
      setMessage({ text: 'Please enter a valid email address.', type: 'error' });
      return;
    }

    const phoneRegex = /^(\+92|0)?[3][0-9]{9}$/;
    if (!phoneRegex.test(formData.customerPhone.replace(/\s+/g, ''))) {
      setMessage({ text: 'Please enter a valid Pakistani phone number.', type: 'error' });
      return;
    }

    try {
      console.log('📤 Submitting booking form:', formData);
      const response = await bookingService.submitBooking(formData);
      console.log('✅ Booking response:', response.data);
      
      setMessage({ text: response.data.message || `Thank you ${formData.customerName}! We'll contact you soon about the ${carName}.`, type: 'success' });
      setFormData({
        customerName: '',
        customerPhone: '',
        customerEmail: '',
        selectedCar: carName,
        customerMessage: `Quick booking request from car details page`
      });
    } catch (error) {
      console.error('❌ Booking submission error:', error);
      console.error('Error response:', error.response?.data);
      
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          'Sorry, there was an error. Please try again.';
      setMessage({ text: errorMessage, type: 'error' });
    }
  };

  return (
    <div className="quick-booking">
      <h4>Quick Booking Form</h4>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Your Name" 
          required
          value={formData.customerName}
          onChange={(e) => setFormData({...formData, customerName: e.target.value})}
        />
        <input 
          type="tel" 
          placeholder="Your Phone" 
          required
          value={formData.customerPhone}
          onChange={(e) => setFormData({...formData, customerPhone: e.target.value})}
        />
        <input 
          type="email" 
          placeholder="Your Email" 
          required
          value={formData.customerEmail}
          onChange={(e) => setFormData({...formData, customerEmail: e.target.value})}
        />
        <button type="submit" className="btn btn-primary btn-full">Request Information</button>
      </form>
      {message.text && (
        <div className={`quick-booking-message show ${message.type}`}>
          {message.text}
        </div>
      )}
    </div>
  );
};

const CarDetails = () => {
  const { carKey } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('dimensions');

 useEffect(() => {
  fetchCarDetails();
}, [fetchCarDetails]);


  const fetchCarDetails = useCallback(async () => {
  try {
    setLoading(true);
    const response = await carService.getCarByKey(carKey);
    setCar(response.data);
    setError(null);
  } catch (error) {
    console.error('Error fetching car details:', error);
    setError('Car details not found');
  } finally {
    setLoading(false);
  }
}, [carKey]);


  if (loading) {
    return (
      <div>
        <Header />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading car details...</p>
        </div>
      </div>
    );
  }

  if (error || !car) {
    return (
      <div>
        <Header />
        <div className="error-container">
          <div className="error-content">
            <h2>Car Details Not Found</h2>
            <p>Sorry, we couldn't find the details for the requested car.</p>
            <div className="error-actions">
              <button onClick={() => navigate('/')} className="btn btn-primary">← Back to Home</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      
      <main>
        <div id="main-content">
          <section className="car-header">
            <div className="car-image-container">
              <img src={`/${car.image}`} alt={car.name} className="main-car-image" />
              <div className="image-overlay">
                <div className="price-badge">
                  <span>{car.price}</span>
                </div>
              </div>
            </div>
            
            <div className="car-quick-info">
              <div className="quick-stats">
                <div className="stat-item">
                  <div className="stat-icon">⚡</div>
                  <div className="stat-content">
                    <span className="stat-label">Engine</span>
                    <span className="stat-value">{car.engine[0]?.split(':')[1] || '-'}</span>
                  </div>
                </div>
                <div className="stat-item">
                  <div className="stat-icon">⛽</div>
                  <div className="stat-content">
                    <span className="stat-label">Fuel Economy</span>
                    <span className="stat-value">{car.fuel[0]?.split(':')[1] || '-'}</span>
                  </div>
                </div>
                <div className="stat-item">
                  <div className="stat-icon">🔧</div>
                  <div className="stat-content">
                    <span className="stat-label">Transmission</span>
                    <span className="stat-value">{car.transmission[0]?.split(':')[1] || '-'}</span>
                  </div>
                </div>
                <div className="stat-item">
                  <div className="stat-icon">👥</div>
                  <div className="stat-content">
                    <span className="stat-label">Seating</span>
                    <span className="stat-value">{car.dimensions.find(d => d.includes('Seating'))?.split(':')[1] || '-'}</span>
                  </div>
                </div>
              </div>
              
              <div className="action-buttons">
                <a href="/#booking" className="btn btn-primary btn-large">Book This Car</a>
                <a href="/contact" className="btn btn-secondary btn-large">Get More Info</a>
                <a href="https://wa.me/923315921592" target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-large">WhatsApp Us</a>
              </div>
            </div>
          </section>

          <section className="specifications-section">
            <div className="tab-navigation">
              <button className={`tab-btn ${activeTab === 'dimensions' ? 'active' : ''}`} onClick={() => setActiveTab('dimensions')}>Dimensions</button>
              <button className={`tab-btn ${activeTab === 'engine' ? 'active' : ''}`} onClick={() => setActiveTab('engine')}>Engine / Motor</button>
              <button className={`tab-btn ${activeTab === 'transmission' ? 'active' : ''}`} onClick={() => setActiveTab('transmission')}>Transmission</button>
              <button className={`tab-btn ${activeTab === 'steering' ? 'active' : ''}`} onClick={() => setActiveTab('steering')}>Steering</button>
              <button className={`tab-btn ${activeTab === 'suspension' ? 'active' : ''}`} onClick={() => setActiveTab('suspension')}>Suspension & Brakes</button>
              <button className={`tab-btn ${activeTab === 'wheels' ? 'active' : ''}`} onClick={() => setActiveTab('wheels')}>Wheels & Tyres</button>
              <button className={`tab-btn ${activeTab === 'fuel' ? 'active' : ''}`} onClick={() => setActiveTab('fuel')}>Fuel Economy</button>
            </div>

            <div className="tab-content">
              {activeTab === 'dimensions' && (
                <div className="tab-panel active">
                  <h3>Dimensions & Weight</h3>
                  <div className="spec-grid">
                    <ul className="spec-list">
                      {car.dimensions.map((spec, index) => (
                        <li key={index}>{spec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'engine' && (
                <div className="tab-panel active">
                  <h3>Engine / Motor Specifications</h3>
                  <div className="spec-grid">
                    <ul className="spec-list">
                      {car.engine.map((spec, index) => (
                        <li key={index}>{spec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'transmission' && (
                <div className="tab-panel active">
                  <h3>Transmission Details</h3>
                  <div className="spec-grid">
                    <ul className="spec-list">
                      {car.transmission.map((spec, index) => (
                        <li key={index}>{spec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'steering' && (
                <div className="tab-panel active">
                  <h3>Steering System</h3>
                  <div className="spec-grid">
                    <ul className="spec-list">
                      {car.steering.map((spec, index) => (
                        <li key={index}>{spec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'suspension' && (
                <div className="tab-panel active">
                  <h3>Suspension & Braking System</h3>
                  <div className="spec-grid">
                    <ul className="spec-list">
                      {car.suspension.map((spec, index) => (
                        <li key={index}>{spec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'wheels' && (
                <div className="tab-panel active">
                  <h3>Wheels & Tyres</h3>
                  <div className="spec-grid">
                    <ul className="spec-list">
                      {car.wheels.map((spec, index) => (
                        <li key={index}>{spec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'fuel' && (
                <div className="tab-panel active">
                  <h3>Fuel Economy & Tank</h3>
                  <div className="spec-grid">
                    <ul className="spec-list">
                      {car.fuel.map((spec, index) => (
                        <li key={index}>{spec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </section>

          <section className="contact-section">
            <div className="contact-container">
              <div className="contact-info">
                <h3>Interested in this car?</h3>
                <p>Contact us today for pricing, availability, and financing options.</p>
        
              </div>
              
              <QuickBookingForm carName={car.name} />
            </div>
          </section>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default CarDetails;
