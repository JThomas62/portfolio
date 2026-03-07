const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");
const closeBtn = document.getElementById("close-status");

// 1. Mobile Navigation Toggle
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen);
    document.body.style.overflow = isOpen ? "hidden" : "";
  });
}

// 2. Contact Form with Web3Forms (Async/Await)
if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = document.getElementById("submit-btn");
    const formData = new FormData(contactForm);
    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        formStatus.classList.remove("hidden");
        contactForm.reset();
      } else {
        alert("Submission Error: " + data.message);
      }
    } catch (error) {
      alert("Network error. Please check your internet connection.");
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}

// 3. Close Success Modal
if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    formStatus.classList.add("hidden");
  });
}
