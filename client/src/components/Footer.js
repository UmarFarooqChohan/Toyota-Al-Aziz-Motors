import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <img src="/IMG/lgo.jpg" alt="Al-Aziz Motor House Logo" className="footer-logo" />
      <div className="footer-links">
        <a href="#faq">FAQ</a>
        <Link to="/contact">Contact Us</Link>
        <a href="mailto:umar.farooq1592@gmail.com?subject=Car Inquiry">Email Direct</a>
        <a href="#terms">Terms of Use</a>
        <a href="#privacy">Privacy Policy</a>
        <a href="#refund">Refund Policy</a>
      </div>
      <p>&copy; 2025 Al-Aziz Motor House | Developed by Umar Farooq</p>
    </footer>
  );
};

export default Footer;
