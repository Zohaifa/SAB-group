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