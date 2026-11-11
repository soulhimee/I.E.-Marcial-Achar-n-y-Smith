(() => {
    const footer = document.querySelector('footer');
    if (!footer) return;

    footer.className = 'global-site-footer';
    footer.innerHTML = `
        <div class="global-footer-main">
            <div class="global-footer-about">
                <a class="global-footer-brand" href="./index.html">
                    <img src="../media/images/insignea.png" alt="">
                    <span><strong>I.E. Marcial Acharán y Smith</strong><small>Disciplina · Conocimiento · Futuro</small></span>
                </a>
                <p>Formamos hoy, grandes líderes mañana. Educación y compromiso con los jóvenes de Trujillo.</p>
            </div>
            <div class="global-footer-column">
                <h2>Visítanos</h2>
                <address>Jr. Colón 467,<br>Centro Histórico,<br>Trujillo, Perú</address>
            </div>
            <div class="global-footer-column">
                <h2>Atención</h2>
                <a href="tel:+51970320793">+51 970 320 793</a>
                <a href="mailto:acharanysmith@gmail.com">acharanysmith@gmail.com</a>
            </div>
            <div class="global-footer-column">
                <h2>Enlaces rápidos</h2>
                <a href="./nosotros.html">Nosotros</a>
                <a href="./blog.html">Noticias</a>
                <a href="./contacto.html">Contacto</a>
            </div>
        </div>
        <div class="global-footer-bottom">
            <span>&copy; 2026 I.E. Marcial Acharán y Smith. Todos los derechos reservados.</span>
            <div class="global-footer-social" role="group" aria-label="Redes sociales">
                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">f</a>
                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">ig</a>
            </div>
        </div>`;
})();
