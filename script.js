 const menuBtn = document.querySelector('.menu-btn');
    const nav = document.getElementById('nav');

    menuBtn.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
    });

    nav.querySelectorAll('a').forEach((link) =>
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      })
    );

    const CONTACT_EMAIL = 'contact@sabgroup.example.com';
    const form = document.getElementById('contact-form');
    const note = document.getElementById('form-note');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      if (!name || !email || !message) {
        note.textContent = 'Please fill in your name, email, and message.';
        return;
      }
      if (!form.email.checkValidity()) {
        note.textContent = 'Please enter a valid email address.';
        return;
      }

      const subject = encodeURIComponent(`Message from ${name}`);
      const body = encodeURIComponent(`${message}\n\n${name}\n${email}`);
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
      note.textContent = 'Opening your email app to send the message.';
    });

    const form = document.getElementById('contact-form');
  const note = document.getElementById('form-note');
  const submitBtn = document.getElementById('submit-btn');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      note.textContent = 'Please fill in your name, email, and message.';
      return;
    }
    if (!form.email.checkValidity()) {
      note.textContent = 'Please enter a valid email address.';
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    note.textContent = '';

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: {
          Accept: 'application/json'
        }
      });

      if (response.ok) {
        form.reset();
        note.textContent = 'Thank you. Your message has been sent.';
      } else {
        const data = await response.json().catch(() => ({}));
        note.textContent = data.errors
          ? data.errors.map((err) => err.message).join(', ')
          : 'Something went wrong. Please try again.';
      }
    } catch {
      note.textContent = 'Network error. Please check your connection and try again.';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send message';
    }
  });