// Al-Aziz Motor House - Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Get form data for validation
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                subject: document.getElementById('subject').value,
                interestedCar: document.getElementById('interested-car').value,
                message: document.getElementById('message').value.trim()
            };

            // Validate required fields
            if (!formData.name || !formData.email || !formData.message || !formData.subject) {
                e.preventDefault(); // Only prevent if validation fails
                showFormMessage('Please fill in all required fields.', 'error');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                e.preventDefault(); // Only prevent if validation fails
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }

            // Phone validation (if provided)
            if (formData.phone) {
                const phoneRegex = /^(\+92|0)?[3][0-9]{9}$/;
                if (!phoneRegex.test(formData.phone.replace(/\s+/g, ''))) {
                    e.preventDefault(); // Only prevent if validation fails
                    showFormMessage('Please enter a valid Pakistani phone number.', 'error');
                    return;
                }
            }

            // If validation passes, show loading message and let Formspree handle submission
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            showFormMessage('Sending your message...', 'success');

            // Re-enable button after a delay (in case of errors)
            setTimeout(() => {
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
            }, 3000);
        });
    }
});

function showFormMessage(message, type) {
    const formMessage = document.getElementById('form-message');
    if (formMessage) {
        formMessage.textContent = message;
        formMessage.className = `form-message show ${type}`;
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.classList.remove('show');
        }, 5000);
    }
}

function sendViaMailto(formData) {
    // Create email content
    const subject = encodeURIComponent(`Website Contact: ${formData.subject}`);
    const body = encodeURIComponent(
        `Name: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `Phone: ${formData.phone || 'Not provided'}\n` +
        `Subject: ${formData.subject}\n` +
        `Interested Car: ${formData.interestedCar || 'Not specified'}\n\n` +
        `Message:\n${formData.message}`
    );
    
    // Your email address
    const yourEmail = 'info@alazizmotorhouse.com'; // Change this to your actual email
    
    // Open email client
    window.location.href = `mailto:${yourEmail}?subject=${subject}&body=${body}`;
}

// Alternative: Send to a backend service
function sendToBackend(formData) {
    // This requires a backend server to handle form submissions
    fetch('/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showFormMessage('Thank you for your message! We will contact you soon.', 'success');
            document.getElementById('contact-form').reset();
        } else {
            showFormMessage('Sorry, there was an error sending your message. Please try again.', 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showFormMessage('Sorry, there was an error sending your message. Please try again.', 'error');
    });
}