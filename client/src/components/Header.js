import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const checkUserAuth = () => {
    const token = localStorage.getItem('userToken');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        console.log('Header: User authenticated:', parsedUser.name);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('userToken');
        localStorage.removeItem('userData');
        setUser(null);
      }
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    // Check immediately
    checkUserAuth();
    
    // Listen for auth update event
    const handleAuthUpdate = () => {
      console.log('Auth update event received');
      checkUserAuth();
    };
    
    window.addEventListener('auth-update', handleAuthUpdate);
    
    // Check after a short delay (handles redirects from login page)
    const immediateCheck = setTimeout(() => {
      checkUserAuth();
    }, 500);
    
    // Poll localStorage periodically (fallback for same-tab updates)
    const pollInterval = setInterval(() => {
      checkUserAuth();
    }, 1000);
    
    // Check on visibility change
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        checkUserAuth();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Check on focus
    const handleFocus = () => {
      checkUserAuth();
    };
    
    window.addEventListener('focus', handleFocus);
    
    return () => {
      clearTimeout(immediateCheck);
      clearInterval(pollInterval);
      window.removeEventListener('auth-update', handleAuthUpdate);
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const toggleUserDropdown = () => {
    setUserDropdownOpen(!userDropdownOpen);
  };

  const logout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    setUser(null);
    setUserDropdownOpen(false);
    window.location.reload();
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    closeMenu();
    const returnUrl = encodeURIComponent(window.location.href);
    const loginUrl = window.location.hostname === 'localhost' ? `http://localhost:5000/login?return=${returnUrl}` : `/login?return=${returnUrl}`;
    console.log('Navigating to login:', loginUrl);
    window.location.href = loginUrl;
  };

  return (
    <header>
      <div className="header-left">
        <img src="/IMG/lgo.jpg" alt="Al-Aziz Motor House Logo" className="logo" />
        <h1>Al-Aziz Motor House</h1>
      </div>
      
      <div className="header-right">
        <ThemeToggle />
        <button className="menu-toggle" onClick={toggleMenu}>☰</button>
      </div>
      
      <nav className="navbar">
        <ul className={menuOpen ? 'active' : ''}>
          <li><Link to="/" onClick={closeMenu}>Home</Link></li>
          <li><a href="/#models" onClick={closeMenu}>Toyota Models</a></li>
          <li><a href="/#compare" onClick={closeMenu}>Compare Cars</a></li>
          <li><a href="/#booking" onClick={closeMenu}>Book a Car</a></li>
          <li><a href="/#about" onClick={closeMenu}>About Us</a></li>
          <li><a href="https://mail.google.com/mail/?view=cm&to=umar.farooq1592@gmail.com&su=Car%20Inquiry%20from%20Website" target="_blank" rel="noopener noreferrer">Email Us</a></li>
          <li><Link to="/contact" onClick={closeMenu}>Contact</Link></li>
          
          {/* User Authentication */}
          {user ? (
            <li className="user-menu">
              <div className="user-dropdown">
                <button onClick={toggleUserDropdown} className="user-toggle">
                  <i className="fas fa-user"></i> {user.name}
                </button>
                {userDropdownOpen && (
                  <div className="dropdown-menu">
                    <a href={window.location.hostname === 'localhost' ? 'http://localhost:5000/user-dashboard.html' : '/user-dashboard.html'}>
                      <i className="fas fa-tachometer-alt"></i> Dashboard
                    </a>
                    <button onClick={logout}>
                      <i className="fas fa-sign-out-alt"></i> Logout
                    </button>
                  </div>
                )}
              </div>
            </li>
          ) : (
            <li>
              <a 
                href={window.location.hostname === 'localhost' ? `http://localhost:5000/login?return=${encodeURIComponent(window.location.href)}` : `/login?return=${encodeURIComponent(window.location.href)}`} 
                className="login-link"
                onClick={handleLoginClick}
              >
                <i className="fas fa-sign-in-alt"></i> Login
              </a>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
