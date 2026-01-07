console.log("Optivirads form JS loaded");

// ==========================================
// 1. NAVIGATION & UI LOGIC
// ==========================================

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

// ==========================================
// 2. GOOGLE SHEETS FORM SUBMISSION
// ==========================================

const scriptURL = 'https://script.google.com/macros/s/AKfycbxAfwMJEFJa13DQ7rurnvgwqYGg5LPGwPnrk5eDgP-dZqy1bz-xynXrzL5DT4oMc9E-/exec';
const form = document.querySelector('#leadForm');
const btn = document.querySelector('.contact-form button[type="submit"]'); // Adjusted selector to be safe

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    
    // Change button text to indicate processing
    const originalBtnText = btn.innerText;
    btn.innerText = 'Sending...';
    btn.disabled = true;

    // Send data
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then(response => {
        // Success!
        alert('Thank you! Your enquiry has been sent successfully.');
        
        // Reset the form ONLY after successful send
        form.reset();
        
        // Reset button
        btn.innerText = originalBtnText;
        btn.disabled = false;
      })
      .catch(error => {
        // Error!
        console.error('Error!', error.message);
        alert('Something went wrong. Please try again or contact us via WhatsApp.');
        
        // Reset button
        btn.innerText = originalBtnText;
        btn.disabled = false;
      });
  });
}
