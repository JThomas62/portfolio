const form = document.getElementById('contact-form');
const result = document.getElementById('form-status');

document.getElementById('access_key').value = myAccessKey; 

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

// Close button logic
document.getElementById('close-status').addEventListener('click', function() {
    result.classList.remove('active');
});