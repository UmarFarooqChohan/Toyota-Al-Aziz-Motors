import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import { carService, bookingService } from '../services/api';
import './Home.css';

const Home = () => {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [car1, setCar1] = useState('');
  const [car2, setCar2] = useState('');
  const [comparisonResult, setComparisonResult] = useState(null);
  const [user, setUser] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    selectedCar: '',
    customerMessage: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchCars();
    checkUserAuth();
    
    // Force check on window load (handles redirects)
    const handleLoad = () => {
      checkUserAuth();
    };
    
    window.addEventListener('load', handleLoad);
    
    // Re-check auth when window gains focus (after login redirect)
    const handleFocus = () => {
      checkUserAuth();
    };
    
    window.addEventListener('focus', handleFocus);
    
    // Also check when page becomes visible
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        checkUserAuth();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Cleanup
    return () => {
      window.removeEventListener('load', handleLoad);
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const checkUserAuth = () => {
    const token = localStorage.getItem('userToken');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setBookingForm(prev => ({
          ...prev,
          customerName: parsedUser.name,
          customerEmail: parsedUser.email,
          customerPhone: parsedUser.phone
        }));
      } catch (error) {
        console.error('Error parsing user data:', error);
        // Clear invalid data
        localStorage.removeItem('userToken');
        localStorage.removeItem('userData');
        setUser(null);
      }
    } else {
      // Clear user state if no token/data
      setUser(null);
    }
  };

  const fetchCars = async () => {
    try {
      const response = await carService.getAllCars();
      setCars(response.data.cars || []);
    } catch (error) {
      console.error('Error fetching cars:', error);
      setCars([]); // Ensure cars is always an array
    }
  };

  const filteredCars = Array.isArray(cars) ? cars.filter(car =>
    car.name && car.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  const openCarDetails = (carKey) => {
    navigate(`/car-details/${carKey}`);
  };

  const compareCars = () => {
    if (!car1 || !car2) {
      alert('Please select two cars to compare.');
      return;
    }
    if (car1 === car2) {
      alert('Please select two different cars.');
      return;
    }

    const carData1 = cars.find(c => c.name === car1);
    const carData2 = cars.find(c => c.name === car2);

    setComparisonResult({ car1: carData1, car2: carData2 });
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!bookingForm.selectedCar) {
      alert('Please select a car.');
      return;
    }

    // Check if user is logged in - if not, require name, email, and phone
    if (!user) {
      if (!bookingForm.customerName || !bookingForm.customerEmail || !bookingForm.customerPhone) {
        alert('Please fill in all required fields (Name, Email, Phone).');
        return;
      }
    }

    try {
      const response = await bookingService.submitBooking(bookingForm);
      alert(response.data.message);
      setBookingForm(prev => ({
        ...prev,
        selectedCar: '',
        customerMessage: '',
        customerName: user ? prev.customerName : '',
        customerEmail: user ? prev.customerEmail : '',
        customerPhone: user ? prev.customerPhone : ''
      }));
    } catch (error) {
      alert('Error submitting booking. Please try again.');
    }
  };

  return (
    <div>
      <Header />
      
      <main>
        <section id="home">
          <h2>Welcome to Al-Aziz Motor House</h2>
        </section>

        <section id="models">
          <h2>Our Toyota Models</h2>
          <input 
            type="text" 
            id="search" 
            placeholder="Search Toyota models..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="car-list">
            {filteredCars.map((car) => (
              <div 
                key={car.key} 
                className="car-item" 
                data-name={car.name}
                onClick={() => openCarDetails(car.key)}
              >
                <img src={`/${car.image}`} alt={car.name} loading="lazy" />
                <h3>{car.name}</h3>
                <p>{car.price}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="compare">
          <h2>Compare Cars</h2>
          <select value={car1} onChange={(e) => setCar1(e.target.value)}>
            <option value="">Select First Car</option>
            {Array.isArray(cars) && cars.map(car => (
              <option key={car.key || car._id} value={car.name}>{car.name}</option>
            ))}
          </select>

          <select value={car2} onChange={(e) => setCar2(e.target.value)}>
            <option value="">Select Second Car</option>
            {Array.isArray(cars) && cars.map(car => (
              <option key={car.key || car._id} value={car.name}>{car.name}</option>
            ))}
          </select>

          <button onClick={compareCars}>Compare</button>
          
          {comparisonResult && (
            <div id="comparison-result">
              <div className="comparison-container">
                <div className="car-comparison">
                  <img src={`/${comparisonResult.car1.image}`} alt={comparisonResult.car1.name} />
                  <h3>{comparisonResult.car1.name}</h3>
                  <div className="comparison-details">
                    <p><strong>Price:</strong> {comparisonResult.car1.price}</p>
                    <p><strong>Engine:</strong> {comparisonResult.car1.engine[0]}</p>
                    <p><strong>Transmission:</strong> {comparisonResult.car1.transmission[0]}</p>
                  </div>
                  <div className="comparison-actions">
                    <button onClick={() => openCarDetails(comparisonResult.car1.key)} className="btn-details">View Details</button>
                    <button onClick={() => setBookingForm({...bookingForm, selectedCar: comparisonResult.car1.name})} className="btn-book">Book Now</button>
                  </div>
                </div>
                
                <div className="vs">VS</div>
                
                <div className="car-comparison">
                  <img src={`/${comparisonResult.car2.image}`} alt={comparisonResult.car2.name} />
                  <h3>{comparisonResult.car2.name}</h3>
                  <div className="comparison-details">
                    <p><strong>Price:</strong> {comparisonResult.car2.price}</p>
                    <p><strong>Engine:</strong> {comparisonResult.car2.engine[0]}</p>
                    <p><strong>Transmission:</strong> {comparisonResult.car2.transmission[0]}</p>
                  </div>
                  <div className="comparison-actions">
                    <button onClick={() => openCarDetails(comparisonResult.car2.key)} className="btn-details">View Details</button>
                    <button onClick={() => setBookingForm({...bookingForm, selectedCar: comparisonResult.car2.name})} className="btn-book">Book Now</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        <section id="booking">
          <h2>Book a Car</h2>
          
          <form id="booking-form" onSubmit={handleBookingSubmit}>
            {user ? (
              <div style={{
                marginBottom: '1rem',
                padding: '1rem',
                background: '#e8f5e8',
                borderRadius: '8px'
              }}>
                <p style={{ color: 'black' }}>
                  <i className="fas fa-user"></i> Booking as: <strong>{user.name}</strong> ({user.email})
                </p>
              </div>
            ) : (
              <>
                <input 
                  type="text" 
                  placeholder="Your Name *" 
                  required
                  value={bookingForm.customerName}
                  onChange={(e) => setBookingForm({...bookingForm, customerName: e.target.value})}
                />
                <input 
                  type="email" 
                  placeholder="Your Email *" 
                  required
                  value={bookingForm.customerEmail}
                  onChange={(e) => setBookingForm({...bookingForm, customerEmail: e.target.value})}
                />
                <input 
                  type="tel" 
                  placeholder="Your Phone Number *" 
                  required
                  value={bookingForm.customerPhone}
                  onChange={(e) => setBookingForm({...bookingForm, customerPhone: e.target.value})}
                />
              </>
            )}
            
            <select 
              required
              value={bookingForm.selectedCar}
              onChange={(e) => setBookingForm({...bookingForm, selectedCar: e.target.value})}
            >
              <option value="">Select a Car</option>
              {Array.isArray(cars) && cars.map(car => (
                <option key={car.key || car._id} value={car.name}>{car.name}</option>
              ))}
            </select>
            <textarea 
              placeholder="Additional message"
              value={bookingForm.customerMessage}
              onChange={(e) => setBookingForm({...bookingForm, customerMessage: e.target.value})}
            ></textarea>
            <button type="submit">Book Now</button>
          </form>
        </section>

        <section id="about" className="about-container">
          <h2>About Al-Aziz Motor House</h2>
          <p>Welcome to <strong>Al-Aziz Motor House</strong>, your trusted destination for high-quality
            Toyota vehicles. With years of experience in the automobile industry, we take pride in offering
            the best selection of cars, expert advice, and exceptional customer service.</p>

          <div className="business-card">
            <img src="/IMG/F card.jpg" alt="Business Card" />
          </div>

          <div className="about-content">
            <div className="about-text">
              <h3>Our Mission</h3>
              <p>To provide reliable, affordable, and top-quality Toyota vehicles while ensuring a
                seamless car-buying experience.</p>

              <h3>Why Choose Us?</h3>
              <ul>
                <li>Wide range of <strong>Toyota models</strong> at competitive prices</li>
                <li><strong>Trusted by thousands</strong> of happy customers</li>
                <li>Expert guidance to help you choose the <strong>perfect car</strong></li>
                <li><strong>Easy booking & financing</strong> options available</li>
                <li>Professional after-sales service and support</li>
                <li>Transparent pricing with no hidden costs</li>
              </ul>
            </div>
            <div className="about-image">
              <img src="/IMG/logoo.jpg" alt="Our Showroom" />
            </div>
          </div>
        </section>

        <section className="founder-section">
          <h2>Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <img src="/IMG/umar.jpg" alt="Umar Farooq - Founder" className="founder-img" />
              <h3>Umar Farooq</h3>
              <p className="team-role">Founder & CEO</p>
              <div className="social-links">
                <a target="_blank" rel="noopener noreferrer" href="https://youtube.com/@umarfarooq-rb2he?si=EU9Q2wdvSRqyXH25">YouTube</a> |
                <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/iam_umarfarooq?igsh=MWJkMWllYW5vejdmbw==">Instagram</a> |
                <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/umar-farooq-9769872b1?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">LinkedIn</a>
              </div>
            </div>
            
           <div className="team-member">
  <img src="/IMG/Muhammad Abdur Rafay waqar.JPG" alt="Abdur Rafay" className="founder-img" />
  <h3>Abdur Rafay</h3>
  <p className="team-role">Co-Founder</p>
  <div className="social-links">
    <span className="disabled-link">YouTube</span> |
    <span className="disabled-link">Instagram</span> |
    <span className="disabled-link">LinkedIn</span>
  </div>
</div>

<div className="team-member">
  <img src="/IMG/afrasiab.jpeg" alt="Afrasiab" className="founder-img" />
  <h3>Afrasiab</h3>
  <p className="team-role">Partner</p>
  <div className="social-links">
    <span className="disabled-link">YouTube</span> |
    <span className="disabled-link">Instagram</span> |
    <span className="disabled-link">LinkedIn</span>
  </div>
</div>

<div className="team-member">
  <img src="/IMG/Founder.JPG" alt="Kashif" className="founder-img" />
  <h3>Kashif</h3>
  <p className="team-role">Partner</p>
  <div className="social-links">
    <span className="disabled-link">YouTube</span> |
    <span className="disabled-link">Instagram</span> |
    <span className="disabled-link">LinkedIn</span>
  </div>
</div>

<div className="team-member">
  <img src="/IMG/talha.jpg" alt="Talha" className="founder-img" />
  <h3>Talha</h3>
  <p className="team-role">Partner</p>
  <div className="social-links">
    <span className="disabled-link">YouTube</span> |
    <span className="disabled-link">Instagram</span> |
    <span className="disabled-link">LinkedIn</span>
  </div>
</div>

            <div className="team-member">
              <img src="/IMG/Salman.jpeg" alt="salman" className="founder-img" />
              <h3>Salman Rizwan</h3>
              <p className="team-role">Partner</p>
              
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Home;
