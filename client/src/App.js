import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Home from './pages/Home';
import CarDetails from './pages/CarDetails';
import Contact from './pages/Contact';

const AuthHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const userDataParam = params.get('userData');
    
    if (token && userDataParam) {
      try {
        const userData = JSON.parse(decodeURIComponent(userDataParam));
        
        // Store in localStorage (localhost:3000 origin)
        localStorage.setItem('userToken', token);
        localStorage.setItem('userData', JSON.stringify(userData));
        
        console.log('✅ Auth data stored from URL:', userData.name);
        
        // Clean URL - remove auth parameters
        navigate(location.pathname + (location.hash || ''), { replace: true });
        
        // Force component re-render by triggering a custom event
        window.dispatchEvent(new Event('auth-update'));
      } catch (error) {
        console.error('Error processing auth data:', error);
      }
    }
  }, [location, navigate]);

  return null;
};

function App() {
  return (
    <ThemeProvider>
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true
        }}
      >
        <AuthHandler />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/car-details/:carKey" element={<CarDetails />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
