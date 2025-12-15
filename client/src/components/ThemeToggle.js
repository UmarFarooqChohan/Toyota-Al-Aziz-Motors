import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <div className="theme-toggle-container">
      <button 
        className="theme-toggle-btn"
        onClick={toggleTheme}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      >
        <div className="theme-toggle-track">
          <div className="theme-toggle-thumb">
            <span className="theme-icon">
              {isDark ? '☀️' : '🌙'}
            </span>
          </div>
        </div>
        <span className="theme-label">
          {isDark ? 'Light' : 'Dark'}
        </span>
      </button>
    </div>
  );
};

export default ThemeToggle;