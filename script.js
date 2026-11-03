const form = document.getElementById('contact-form');
const result = document.getElementById('form-status');

// ==========================================
// Contact Form Submission Logic (Cloudflare Worker Proxy)
// ==========================================
form.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  const json = JSON.stringify(data);

  fetch('https://form-proxy.jacobt257-4b9.workers.dev/', { 
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: json
  })
  .then(async (response) => {
    if (response.ok) {
      result.classList.add('active');
      result.setAttribute('aria-hidden', 'false');
      form.reset();
    } else {
      alert("Submission failed. Please try again.");
    }
  })
  .catch(error => {
    console.error("Error:", error);
    alert("An error occurred while sending your message.");
  });
});

// ==========================================
// Close Success Modal Button
// ==========================================
const closeStatusBtn = document.getElementById('close-status');
closeStatusBtn.addEventListener('click', function() {
  result.classList.remove('active');
  result.setAttribute('aria-hidden', 'true');
  this.blur(); 
});

// ==========================================
// Mobile Hamburger Menu Logic
// ==========================================
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

function closeMobileMenu() {
  navLinks.classList.remove('active');
  menuToggle.setAttribute('aria-expanded', 'false');
}

menuToggle.addEventListener('click', function() {
  const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', !isExpanded);
  navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

// Close mobile menu on pressing the Escape key (Accessibility upgrade)
window.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    if (result.classList.contains('active')) {
      result.classList.remove('active');
      result.setAttribute('aria-hidden', 'true');
    }
    if (navLinks.classList.contains('active')) {
      closeMobileMenu();
    }
  }
});