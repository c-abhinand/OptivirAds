// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('nav-open');
  });

  // Close nav on link click (mobile)
  nav.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('nav-open');
    });
  });
}

// Smooth scroll for in-page anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId.length > 1) {
      e.preventDefault();
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// FAQ accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const questionBtn = item.querySelector('.faq-question');
  questionBtn.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');

    // Close all
    faqItems.forEach(i => i.classList.remove('open'));

    // Toggle current
    if (!isOpen) {
      item.classList.add('open');
    }
  });
});

// Set current year in footer
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Simple fake form handler (prevent default submit for now)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you! Your enquiry has been submitted.');
    contactForm.reset();
  });
}



//Form submission

document.getElementById("leadForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const submitBtn = document.querySelector("#leadForm button[type='submit']");
  submitBtn.disabled = true;
  submitBtn.innerText = "Submitting...";

  const formData = new URLSearchParams();
  formData.append("name", document.getElementById("name").value);
  formData.append("business", document.getElementById("business").value);
  formData.append("email", document.getElementById("email").value);
  formData.append("phone", document.getElementById("phone").value);
  formData.append("spend", document.getElementById("spend").value);
  formData.append("help", document.getElementById("help").value);

  fetch("https://script.google.com/macros/s/AKfycbwf1blGTWHyhSK_fVbp401ygvQbsgcXuM8OdpyyDRNunFXGrDl3ooAp2IedyeaAQ6AZpQ/exec", {
    method: "POST",
    mode: "no-cors",
    body: formData
  })
  .then(() => {
    alert("✅ Thank you! Your enquiry has been submitted.");
    document.getElementById("leadForm").reset();
  })
  .catch(() => {
    alert("❌ Submission failed. Please try again.");
  })
  .finally(() => {
    submitBtn.disabled = false;
    submitBtn.innerText = "Submit enquiry";
  });
});

