
// script.js — safe contact form handling with simple toast
(function () {
  // helper: create a simple toast element
  function showToast(message, duration = 3000) {
    // create toast container if missing
    let container = document.getElementById('simple-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'simple-toast-container';
      container.style.position = 'fixed';
      container.style.right = '20px';
      container.style.bottom = '20px';
      container.style.zIndex = 9999;
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'simple-toast';
    toast.textContent = message;
    // basic styling (you can move this to CSS)
    toast.style.marginTop = '8px';
    toast.style.padding = '12px 18px';
    toast.style.background = 'rgba(0,0,0,0.7)';
    toast.style.color = '#fff';
    toast.style.borderRadius = '12px';
    toast.style.boxShadow = '0 6px 18px rgba(0,0,0,0.25)';
    toast.style.fontSize = '0.95rem';
    toast.style.maxWidth = '320px';
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 250ms ease, transform 250ms ease';
    toast.style.transform = 'translateY(8px)';

    container.appendChild(toast);

    // show
    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
    });

    // remove after duration
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(8px)';
      setTimeout(() => container.removeChild(toast), 260);
    }, duration);
  }

  // DOM ready
  document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');

    if (!form) {
      console.warn('contactForm not found. Make sure the form has id="contactForm"');
      return;
    }

    // find submit button inside form (fallback if no button type=submit)
    let submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
    if (!submitBtn) {
      // create one if missing (not necessary but safe)
      submitBtn = document.createElement('button');
      submitBtn.type = 'submit';
      submitBtn.textContent = 'Send Message';
      submitBtn.style.display = 'none';
      form.appendChild(submitBtn);
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // simple validation example: required fields
      const name = form.querySelector('input[type="text"]')?.value?.trim();
      const email = form.querySelector('input[type="email"]')?.value?.trim();
      const message = form.querySelector('textarea')?.value?.trim();

      if (!name || !email || !message) {
        showToast('Please fill in all fields ✨');
        return;
      }

      // disable button to prevent double submit
      submitBtn.disabled = true;
      const prevText = submitBtn.innerHTML;
      submitBtn.innerHTML = 'Sending...';

      // Simulate sending (replace with real fetch/ajax if needed)
      setTimeout(() => {
        // success
        showToast('Thank you! Your message has been sent 💖');

        // reset form
        try { form.reset(); } catch (err) { console.warn(err); }

        // restore button
        submitBtn.disabled = false;
        submitBtn.innerHTML = prevText;
      }, 900); // simulate network delay
    });
  });
})();
