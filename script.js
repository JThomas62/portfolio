const form = document.getElementById('contact-form');
const result = document.getElementById('form-status');

// ==========================================
// Contact Form Submission Logic (Proxy Version)
// ==========================================
form.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);

  // REPLACE the URL below with your actual Cloudflare Worker URL
  fetch('https://your-worker-url.your-subdomain.workers.dev', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: json
  })
  .then(async (response) => {
    if (response.ok) {
      result.classList.add('active');
      form.reset();
    } else {
      console.error("Server response:", response);
      alert("Submission failed. Please try again later.");
    }
  })
  .catch(error => {
    console.error("Fetch error:", error);
    alert("Connection error. Please check your network.");
  });
});

// ==========================================
// Close Success Modal Button
// ==========================================
document.getElementById('close-status').addEventListener('click', function() {
  result.classList.remove('active');
});

// ==========================================
// Mobile Hamburger Menu Logic
// ==========================================
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', function() {
  navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function() {
    navLinks.classList.remove('active');
  });
});