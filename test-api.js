// Test script to verify API endpoints
const axios = require('axios');

const API_BASE = 'http://localhost:5000/api';

async function testHealthEndpoint() {
  try {
    console.log('🔍 Testing health endpoint...');
    const response = await axios.get(`${API_BASE}/health`);
    console.log('✅ Health check:', response.data);
    return true;
  } catch (error) {
    console.error('❌ Health check failed:', error.message);
    return false;
  }
}

async function testContactEndpoint() {
  try {
    console.log('\n🔍 Testing contact endpoint...');
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '03001234567',
      subject: 'test',
      message: 'This is a test message from API test script'
    };
    
    const response = await axios.post(`${API_BASE}/contact`, testData);
    console.log('✅ Contact submission successful:', response.data);
    return true;
  } catch (error) {
    console.error('❌ Contact submission failed:', error.response?.data || error.message);
    return false;
  }
}

async function testBookingEndpoint() {
  try {
    console.log('\n🔍 Testing booking endpoint...');
    const testData = {
      customerName: 'Test Customer',
      customerEmail: 'customer@example.com',
      customerPhone: '03001234567',
      selectedCar: 'Toyota Corolla',
      customerMessage: 'This is a test booking from API test script'
    };
    
    const response = await axios.post(`${API_BASE}/booking`, testData);
    console.log('✅ Booking submission successful:', response.data);
    return true;
  } catch (error) {
    console.error('❌ Booking submission failed:', error.response?.data || error.message);
    return false;
  }
}

async function runTests() {
  console.log('🚀 Starting API Tests...\n');
  
  const healthOk = await testHealthEndpoint();
  if (!healthOk) {
    console.log('\n❌ Server is not responding. Make sure it\'s running on port 5000');
    return;
  }
  
  const contactOk = await testContactEndpoint();
  const bookingOk = await testBookingEndpoint();
  
  console.log('\n📊 Test Results:');
  console.log(`Health Check: ${healthOk ? '✅' : '❌'}`);
  console.log(`Contact Form: ${contactOk ? '✅' : '❌'}`);
  console.log(`Booking Form: ${bookingOk ? '✅' : '❌'}`);
  
  if (contactOk && bookingOk) {
    console.log('\n🎉 All tests passed! Your forms should be working now.');
    console.log('💡 Try submitting a form from your website to verify.');
  } else {
    console.log('\n⚠️  Some tests failed. Check the error messages above.');
  }
}

runTests();