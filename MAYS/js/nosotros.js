const identityCards = [...document.querySelectorAll('.identity-card')];
const reduceCardMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const menuToggle = document.querySelector('.shared-site-header .menu-toggle');
const navigation = document.querySelector('.shared-site-header .navbar');

menuToggle?.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isExpanded));
    menuToggle.setAttribute('aria-label', isExpanded ? 'Abrir menú' : 'Cerrar menú');
    navigation.classList.toggle('is-open', !isExpanded);
});

identityCards.forEach((card, index) => {
    card.dataset.cardReveal = '';
    card.style.setProperty('--card-reveal-delay', `${index * 100}ms`);
});

if (reduceCardMotion || !('IntersectionObserver' in window)) {
    identityCards.forEach((card) => card.classList.add('is-visible'));
} else {
    const cardRevealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -24px 0px' });

    identityCards.forEach((card) => cardRevealObserver.observe(card));
}