const form = document.getElementById('contact-form');
const result = document.getElementById('form-status');

// ==========================================
// Web3Forms Setup & Key Fallback
// ==========================================
const accessKey = (typeof myAccessKey !== 'undefined') ? myAccessKey : 'd7e69e3b-26bf-4c9e-92ca-a4f2b6e8408c';
document.getElementById('access_key').value = accessKey;

// ==========================================
// Contact Form Submission Logic
// ==========================================
form.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);

  fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: json
  })
  .then(async (response) => {
    if (response.status == 200) {
      result.classList.add('active');
    } else {
      console.error("Server response:", response);
      alert("Submission failed. Check your API key.");
    }
  })
  .catch(error => {
    console.error("Fetch error:", error);
  })
  .then(() => {
    form.reset();
  });
});

// Close Success Modal Button
document.getElementById('close-status').addEventListener('click', function() {
  result.classList.remove('active');
});

// ==========================================
// Mobile Hamburger Menu Logic
// ==========================================
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

// Toggle menu on click
menuToggle.addEventListener('click', function() {
  navLinks.classList.toggle('active');
});

// Close the menu automatically when any navigation link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function() {
    navLinks.classList.remove('active');
  });
});