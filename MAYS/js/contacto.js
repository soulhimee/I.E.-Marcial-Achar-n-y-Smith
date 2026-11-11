document.addEventListener('submit', (event) => {
    const form = event.target;
    if (!(form instanceof HTMLFormElement) || form.id !== 'contact-form') return;

    event.preventDefault();
    if (!form.reportValidity()) return;

    const formData = new FormData(form);
    const name = String(formData.get('contact-name') || '').trim();
    const email = String(formData.get('contact-email') || '').trim();
    const subject = String(formData.get('contact-subject') || '').trim();
    const message = String(formData.get('contact-message') || '').trim();
    const body = `Nombre: ${name}\nCorreo electrónico: ${email}\n\n${message}`;
    const mailto = `mailto:acharanysmith@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
});