import React from 'react';
import './WhatsAppButton.css';

const WhatsAppButton = () => {
  return (
    <a 
      href="https://wa.me/923315921592" 
      target="_blank" 
      rel="noopener noreferrer" 
      className="whatsapp-btn"
      title="Chat with us on WhatsApp"
    >
      <img src="/IMG/whatsapp-873316_1280.webp" width="50px" alt="WhatsApp" />
    </a>
  );
};

export default WhatsAppButton;
