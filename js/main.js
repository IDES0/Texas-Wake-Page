async function loadInstagramPosts() {
    const INSTAGRAM_URL = 'https://www.instagram.com/texas_wake/';
    const response = await fetch(`https://api.instagram.com/oembed/?url=${INSTAGRAM_URL}`);
    const data = await response.json();
    document.querySelector('.instagram-grid').innerHTML = data.html;
}

document.addEventListener('DOMContentLoaded', loadInstagramPosts); 

// Modal functionality
const notifyModal = document.getElementById('notifyModal');
const contactModal = document.getElementById('contactModal');
const notifyButton = document.getElementById('openNotifyForm');
const contactButton = document.getElementById('openContactForm');
const notifyForm = document.getElementById('notify-form');
const contactForm = document.getElementById('contact-form');
const closeButtons = document.querySelectorAll('.close-button');

notifyButton.onclick = () => notifyModal.style.display = 'block';
contactButton.onclick = () => contactModal.style.display = 'block';

closeButtons.forEach(button => {
    button.onclick = () => {
        notifyModal.style.display = 'none';
        contactModal.style.display = 'none';
    }
});

window.onclick = (event) => {
    if (event.target === notifyModal || event.target === contactModal) {
        notifyModal.style.display = 'none';
        contactModal.style.display = 'none';
    }
}

// Form submission handling for both forms
[notifyForm, contactForm].forEach(form => {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                alert('Message sent successfully!');
                form.reset();
                notifyModal.style.display = 'none';
                contactModal.style.display = 'none';
            } else {
                throw new Error('Failed to submit');
            }
        } catch (error) {
            alert('Error submitting form. Please try again.');
        }
    });
}); 

// Instagram feed initialization
window.fbAsyncInit = function() {
    FB.init({
        xfbml: true,
        version: 'v18.0'
    });
}; 

const hamburger = document.querySelector('.hamburger-menu');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        navMenu.classList.remove('active');
    }
}); 