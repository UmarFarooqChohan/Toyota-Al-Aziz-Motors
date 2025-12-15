const API_BASE = window.location.hostname === 'localhost' ? 'http://localhost:5000/api' : '/api';
let currentSection = 'dashboard';

// Check authentication on page load
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    loadDashboardData();
    setupNavigation();
});

function checkAuth() {
    const token = localStorage.getItem('adminToken');
    const user = JSON.parse(localStorage.getItem('adminUser') || '{}');
    
    if (!token || user.role !== 'admin') {
        window.location.href = 'login.html';
        return;
    }
    
    document.getElementById('adminName').textContent = user.name;
}

function getAuthHeaders() {
    const token = localStorage.getItem('adminToken');
    return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
}

function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const section = item.dataset.section;
            showSection(section);
        });
    });
}

function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active class from nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionName).classList.add('active');
    document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');
    
    // Update page title
    const titles = {
        dashboard: 'Dashboard',
        cars: 'Cars Management',
        bookings: 'Bookings',
        contacts: 'Contact Inquiries',
        users: 'Users',
        reviews: 'Reviews',
        analytics: 'Analytics'
    };
    document.getElementById('pageTitle').textContent = titles[sectionName];
    
    currentSection = sectionName;
    
    // Load section data
    switch(sectionName) {
        case 'dashboard':
            loadDashboardData();
            break;
        case 'cars':
            loadCars();
            break;
        case 'bookings':
            loadBookings();
            break;
        case 'contacts':
            loadContacts();
            break;
        case 'users':
            loadUsers();
            break;
        case 'reviews':
            loadReviews();
            break;
        case 'analytics':
            loadAnalytics();
            break;
    }
}

async function loadDashboardData() {
    try {
        const response = await fetch(`${API_BASE}/admin/dashboard/stats`, {
            headers: getAuthHeaders()
        });
        
        if (response.ok) {
            const data = await response.json();
            
            // Update stats
            document.getElementById('totalCars').textContent = data.stats.cars.total;
            document.getElementById('totalBookings').textContent = data.stats.bookings.total;
            document.getElementById('totalUsers').textContent = data.stats.users.total;
            document.getElementById('newContacts').textContent = data.stats.contacts.new;
            
            // Load recent activities
            loadRecentBookings(data.recentActivities.bookings);
            loadRecentContacts(data.recentActivities.contacts);
        }
    } catch (error) {
        console.error('Error loading dashboard data:', error);
    }
}

function loadRecentBookings(bookings) {
    const container = document.getElementById('recentBookings');
    container.innerHTML = '';
    
    if (bookings.length === 0) {
        container.innerHTML = '<p class="text-muted">No recent bookings</p>';
        return;
    }
    
    bookings.forEach(booking => {
        const item = document.createElement('div');
        item.className = 'recent-item';
        item.innerHTML = `
            <div class="recent-item-info">
                <h4>${booking.customerName}</h4>
                <p>${booking.carId?.name || booking.selectedCar}</p>
            </div>
            <div class="recent-item-time">
                ${formatDate(booking.createdAt)}
            </div>
        `;
        container.appendChild(item);
    });
}

function loadRecentContacts(contacts) {
    const container = document.getElementById('recentContacts');
    container.innerHTML = '';
    
    if (contacts.length === 0) {
        container.innerHTML = '<p class="text-muted">No recent contacts</p>';
        return;
    }
    
    contacts.forEach(contact => {
        const item = document.createElement('div');
        item.className = 'recent-item';
        item.innerHTML = `
            <div class="recent-item-info">
                <h4>${contact.name}</h4>
                <p>${contact.subject}</p>
            </div>
            <div class="recent-item-time">
                ${formatDate(contact.createdAt)}
            </div>
        `;
        container.appendChild(item);
    });
}

async function loadCars() {
    try {
        const response = await fetch(`${API_BASE}/cars`, {
            headers: getAuthHeaders()
        });
        
        if (response.ok) {
            const data = await response.json();
            const cars = data.cars || data;
            displayCars(cars);
        }
    } catch (error) {
        console.error('Error loading cars:', error);
    }
}

function displayCars(cars) {
    const tbody = document.getElementById('carsTableBody');
    tbody.innerHTML = '';
    
    cars.forEach(car => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${car.image}" alt="${car.name}" class="car-image">
            </td>
            <td>${car.name}</td>
            <td>${car.price}</td>
            <td>
                <span class="status-badge status-${car.availability}">
                    ${car.availability}
                </span>
            </td>
            <td>${car.views || 0}</td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="editCar('${car._id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteCar('${car._id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

async function loadBookings() {
    try {
        const status = document.getElementById('bookingStatusFilter')?.value || '';
        const url = status ? `${API_BASE}/booking?status=${status}` : `${API_BASE}/booking`;
        
        const response = await fetch(url, {
            headers: getAuthHeaders()
        });
        
        if (response.ok) {
            const data = await response.json();
            const bookings = data.bookings || data;
            displayBookings(bookings);
        }
    } catch (error) {
        console.error('Error loading bookings:', error);
    }
}

function displayBookings(bookings) {
    const container = document.getElementById('bookingsContainer');
    container.innerHTML = '';
    
    if (bookings.length === 0) {
        container.innerHTML = '<p class="no-bookings">No bookings found</p>';
        return;
    }
    
    bookings.forEach(booking => {
        const card = document.createElement('div');
        card.className = 'booking-card';
        card.innerHTML = `
            <div class="booking-card-header">
                <div class="booking-id">
                    <i class="fas fa-receipt"></i>
                    <span>Booking #${booking.bookingId || booking._id.slice(-6)}</span>
                </div>
                <span class="status-badge status-${booking.status}">
                    ${booking.status}
                </span>
            </div>
            
            <div class="booking-card-body">
                <div class="booking-form-row">
                    <div class="booking-form-group">
                        <label><i class="fas fa-user"></i> Customer Name</label>
                        <div class="form-value">${booking.customerName}</div>
                    </div>
                    <div class="booking-form-group">
                        <label><i class="fas fa-car"></i> Car Model</label>
                        <div class="form-value">${booking.carId?.name || booking.selectedCar}</div>
                    </div>
                </div>
                
                <div class="booking-form-row">
                    <div class="booking-form-group">
                        <label><i class="fas fa-envelope"></i> Email</label>
                        <div class="form-value">${booking.customerEmail}</div>
                    </div>
                    <div class="booking-form-group">
                        <label><i class="fas fa-phone"></i> Phone</label>
                        <div class="form-value">${booking.customerPhone}</div>
                    </div>
                </div>
                
                <div class="booking-form-row">
                    <div class="booking-form-group">
                        <label><i class="fas fa-calendar"></i> Preferred Date</label>
                        <div class="form-value">${formatDate(booking.preferredDate)}</div>
                    </div>
                    <div class="booking-form-group">
                        <label><i class="fas fa-clock"></i> Preferred Time</label>
                        <div class="form-value">${booking.preferredTime || 'Not specified'}</div>
                    </div>
                </div>
                
                ${booking.customerMessage ? `
                <div class="booking-form-row">
                    <div class="booking-form-group full-width">
                        <label><i class="fas fa-comment"></i> Message</label>
                        <div class="form-value message-text">${booking.customerMessage}</div>
                    </div>
                </div>
                ` : ''}
            </div>
            
            <div class="booking-card-footer">
                <div class="booking-actions">
                    <button class="btn-action btn-confirm" onclick="updateBookingStatus('${booking._id}', 'confirmed')" title="Confirm">
                        <i class="fas fa-check"></i> Confirm
                    </button>
                    <button class="btn-action btn-reschedule" onclick="updateBookingStatus('${booking._id}', 'rescheduled')" title="Reschedule">
                        <i class="fas fa-calendar-alt"></i> Reschedule
                    </button>
                    <button class="btn-action btn-cancel" onclick="updateBookingStatus('${booking._id}', 'cancelled')" title="Cancel">
                        <i class="fas fa-times"></i> Cancel
                    </button>
                    <button class="btn-action btn-delete" onclick="deleteBooking('${booking._id}')" title="Delete">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

async function updateBookingStatus(bookingId, status) {
    try {
        const response = await fetch(`${API_BASE}/booking/${bookingId}/status`, {
            method: 'PATCH',
            headers: getAuthHeaders(),
            body: JSON.stringify({ status })
        });
        
        if (response.ok) {
            loadBookings(); // Reload bookings
            showNotification(`Booking ${status} successfully`, 'success');
        }
    } catch (error) {
        console.error('Error updating booking status:', error);
        showNotification('Error updating booking status', 'error');
    }
}

async function deleteBooking(bookingId) {
    // Confirm deletion
    if (!confirm('Are you sure you want to delete this booking? This action cannot be undone.')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE}/booking/${bookingId}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        
        if (response.ok) {
            loadBookings(); // Reload bookings
            showNotification('Booking deleted successfully', 'success');
        } else {
            const data = await response.json();
            showNotification(data.message || 'Error deleting booking', 'error');
        }
    } catch (error) {
        console.error('Error deleting booking:', error);
        showNotification('Error deleting booking', 'error');
    }
}

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function toggleSidebar() {
    document.querySelector('.sidebar').classList.toggle('open');
}

function logout() {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    window.location.href = 'login.html';
}

// Contact Management
async function loadContacts() {
    try {
        const response = await fetch(`${API_BASE}/admin/contacts`, {
            headers: getAuthHeaders()
        });
        
        if (response.ok) {
            const data = await response.json();
            displayContacts(data.contacts || data);
        }
    } catch (error) {
        console.error('Error loading contacts:', error);
    }
}

function displayContacts(contacts) {
    const container = document.getElementById('contacts');
    if (!container) {
        // Create contacts section if it doesn't exist
        createContactsSection();
        return;
    }
    
    let html = `
        <div class="section-header">
            <h2>Contact Inquiries</h2>
        </div>
        <div class="table-container">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Subject</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    contacts.forEach(contact => {
        html += `
            <tr>
                <td>${contact.name}</td>
                <td>${contact.email}</td>
                <td>${contact.phone}</td>
                <td>${contact.subject}</td>
                <td>
                    <span class="status-badge status-${contact.status}">
                        ${contact.status}
                    </span>
                </td>
                <td>${formatDate(contact.createdAt)}</td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick="viewContact('${contact._id}')">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-success" onclick="updateContactStatus('${contact._id}', 'contacted')">
                        <i class="fas fa-phone"></i>
                    </button>
                    <button class="btn btn-sm btn-warning" onclick="updateContactStatus('${contact._id}', 'resolved')">
                        <i class="fas fa-check"></i>
                    </button>
                </td>
            </tr>
        `;
    });
    
    html += `
                </tbody>
            </table>
        </div>
    `;
    
    container.innerHTML = html;
}

async function updateContactStatus(contactId, status) {
    try {
        const response = await fetch(`${API_BASE}/admin/contacts/${contactId}/status`, {
            method: 'PATCH',
            headers: getAuthHeaders(),
            body: JSON.stringify({ status })
        });
        
        if (response.ok) {
            loadContacts();
            showNotification(`Contact marked as ${status}`, 'success');
        }
    } catch (error) {
        console.error('Error updating contact status:', error);
    }
}

// Users Management
async function loadUsers() {
    try {
        const response = await fetch(`${API_BASE}/admin/users`, {
            headers: getAuthHeaders()
        });
        
        if (response.ok) {
            const data = await response.json();
            displayUsers(data.users || data);
        }
    } catch (error) {
        console.error('Error loading users:', error);
    }
}

function displayUsers(users) {
    const container = document.getElementById('users');
    if (!container) {
        createUsersSection();
        return;
    }
    
    let html = `
        <div class="section-header">
            <h2>Users Management</h2>
        </div>
        <div class="table-container">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Joined</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    users.forEach(user => {
        html += `
            <tr>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>
                    <span class="status-badge status-${user.role}">
                        ${user.role}
                    </span>
                </td>
                <td>${formatDate(user.createdAt)}</td>
                <td>
                    <select onchange="updateUserRole('${user._id}', this.value)">
                        <option value="customer" ${user.role === 'customer' ? 'selected' : ''}>Customer</option>
                        <option value="staff" ${user.role === 'staff' ? 'selected' : ''}>Staff</option>
                        <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>Admin</option>
                    </select>
                    <button class="btn btn-sm btn-danger" onclick="deleteUser('${user._id}', '${user.name}')" title="Delete User">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });
    
    html += `
                </tbody>
            </table>
        </div>
    `;
    
    container.innerHTML = html;
}

async function updateUserRole(userId, role) {
    try {
        const response = await fetch(`${API_BASE}/admin/users/${userId}/role`, {
            method: 'PATCH',
            headers: getAuthHeaders(),
            body: JSON.stringify({ role })
        });
        
        if (response.ok) {
            showNotification(`User role updated to ${role}`, 'success');
        }
    } catch (error) {
        console.error('Error updating user role:', error);
    }
}

async function deleteUser(userId, userName) {
    // Confirm deletion with user name for safety
    if (!confirm(`Are you sure you want to delete user "${userName}"? This action cannot be undone and will also delete all their bookings and data.`)) {
        return;
    }
    
    // Double confirmation for safety
    if (!confirm(`This will permanently delete "${userName}" and all associated data. Are you absolutely sure?`)) {
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE}/admin/users/${userId}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        
        if (response.ok) {
            loadUsers(); // Reload users list
            loadDashboardData(); // Update dashboard stats
            showNotification(`User "${userName}" deleted successfully`, 'success');
        } else {
            const data = await response.json();
            showNotification(data.message || 'Error deleting user', 'error');
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        showNotification('Error deleting user', 'error');
    }
}

// Reviews Management
async function loadReviews() {
    try {
        const response = await fetch(`${API_BASE}/admin/reviews`, {
            headers: getAuthHeaders()
        });
        
        if (response.ok) {
            const data = await response.json();
            displayReviews(data.reviews || data);
        }
    } catch (error) {
        console.error('Error loading reviews:', error);
    }
}

function displayReviews(reviews) {
    const container = document.getElementById('reviews');
    if (!container) {
        createReviewsSection();
        return;
    }
    
    let html = `
        <div class="section-header">
            <h2>Reviews Management</h2>
        </div>
        <div class="table-container">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Customer</th>
                        <th>Car</th>
                        <th>Rating</th>
                        <th>Comment</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    reviews.forEach(review => {
        html += `
            <tr>
                <td>${review.customerName}</td>
                <td>${review.carId?.name || 'N/A'}</td>
                <td>
                    ${'★'.repeat(review.rating)}${'☆'.repeat(5-review.rating)}
                </td>
                <td>${review.comment.substring(0, 50)}...</td>
                <td>
                    <span class="status-badge status-${review.isApproved ? 'approved' : 'pending'}">
                        ${review.isApproved ? 'Approved' : 'Pending'}
                    </span>
                </td>
                <td>${formatDate(review.createdAt)}</td>
                <td>
                    <button class="btn btn-sm btn-success" onclick="approveReview('${review._id}', true)">
                        <i class="fas fa-check"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="approveReview('${review._id}', false)">
                        <i class="fas fa-times"></i>
                    </button>
                </td>
            </tr>
        `;
    });
    
    html += `
                </tbody>
            </table>
        </div>
    `;
    
    container.innerHTML = html;
}

async function approveReview(reviewId, isApproved) {
    try {
        const response = await fetch(`${API_BASE}/admin/reviews/${reviewId}/approve`, {
            method: 'PATCH',
            headers: getAuthHeaders(),
            body: JSON.stringify({ isApproved })
        });
        
        if (response.ok) {
            loadReviews();
            showNotification(`Review ${isApproved ? 'approved' : 'rejected'}`, 'success');
        }
    } catch (error) {
        console.error('Error updating review:', error);
    }
}

// Analytics
async function loadAnalytics() {
    try {
        const response = await fetch(`${API_BASE}/admin/analytics/sales`, {
            headers: getAuthHeaders()
        });
        
        if (response.ok) {
            const data = await response.json();
            displayAnalytics(data);
        }
    } catch (error) {
        console.error('Error loading analytics:', error);
    }
}

function displayAnalytics(data) {
    const container = document.getElementById('analytics');
    if (!container) {
        createAnalyticsSection();
        return;
    }
    
    let html = `
        <div class="section-header">
            <h2>Analytics</h2>
        </div>
        <div class="analytics-grid">
            <div class="analytics-card">
                <h3>Popular Cars</h3>
                <div class="popular-cars">
    `;
    
    data.popularCars.forEach(car => {
        html += `
            <div class="popular-car-item">
                <span>${car.name}</span>
                <span>${car.views} views</span>
                <span>${car.ratings.average.toFixed(1)} ★</span>
            </div>
        `;
    });
    
    html += `
                </div>
            </div>
            <div class="analytics-card">
                <h3>Booking Trends</h3>
                <div class="booking-trends">
    `;
    
    data.bookingTrends.forEach(trend => {
        html += `
            <div class="trend-item">
                <span>${trend._id}</span>
                <span>${trend.count} bookings</span>
            </div>
        `;
    });
    
    html += `
                </div>
            </div>
        </div>
    `;
    
    container.innerHTML = html;
}

// Helper functions to create missing sections
function createContactsSection() {
    const mainContent = document.querySelector('.main-content');
    const section = document.createElement('section');
    section.id = 'contacts';
    section.className = 'content-section';
    mainContent.appendChild(section);
    loadContacts();
}

function createUsersSection() {
    const mainContent = document.querySelector('.main-content');
    const section = document.createElement('section');
    section.id = 'users';
    section.className = 'content-section';
    mainContent.appendChild(section);
    loadUsers();
}

function createReviewsSection() {
    const mainContent = document.querySelector('.main-content');
    const section = document.createElement('section');
    section.id = 'reviews';
    section.className = 'content-section';
    mainContent.appendChild(section);
    loadReviews();
}

function createAnalyticsSection() {
    const mainContent = document.querySelector('.main-content');
    const section = document.createElement('section');
    section.id = 'analytics';
    section.className = 'content-section';
    mainContent.appendChild(section);
    loadAnalytics();
}

// Placeholder functions for car management
function showAddCarModal() {
    alert('Add Car feature will be implemented');
}

function editCar(carId) {
    alert(`Edit car ${carId} feature will be implemented`);
}

function deleteCar(carId) {
    if (confirm('Are you sure you want to delete this car?')) {
        alert(`Delete car ${carId} feature will be implemented`);
    }
}

function viewContact(contactId) {
    alert(`View contact ${contactId} details - will be implemented`);
}