const form = document.getElementById('contact-form');
const result = document.getElementById('form-status');

// ==========================================
// Contact Form Submission Logic (Proxy Version)
// ==========================================
form.addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const json = JSON.stringify(Object.fromEntries(formData));

  // Update this URL to exactly match your Worker's URL
  fetch('https://form-proxy.jacobt257-4b9.workers.dev', { 
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: json
  })
  .then(async (response) => {
    if (response.ok) {
      result.classList.add('active');
      form.reset();
    } else {
      alert("Submission failed.");
    }
  })
  .catch(error => console.error("Error:", error));
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