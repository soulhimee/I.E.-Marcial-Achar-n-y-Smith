(() => {
    const navigation = document.querySelector('nav');
    if (!navigation) return;

    const pageLinks = [
        ['Inicio', 'index.html'],
        ['Nosotros', 'nosotros.html'],
        ['Servicios', 'servicios.html'],
        ['Noticias', 'blog.html'],
        ['Galería', 'galeria.html'],
        ['Contacto', 'contacto.html']
    ];
    const currentFile = decodeURIComponent(window.location.pathname.split('/').pop() || '')
        .toLocaleLowerCase('es');
    const list = navigation.querySelector('.nav-links, .portal-nav-links');
    if (!list) return;

    navigation.classList.add('shared-navigation');
    list.classList.add('nav-links');
    list.classList.remove('portal-nav-links');

    const existingLinks = [...list.querySelectorAll('a')];
    existingLinks.forEach((link) => {
        if (link.textContent.trim() === 'Exalumnos' || new URL(link.href, window.location.href).hash === '#exalumnos') {
            link.closest('li')?.remove();
        }
    });

    const brand = navigation.querySelector('.portal-nav-brand, .logo a');
    if (brand) {
        brand.classList.add('shared-nav-brand');
        brand.href = './index.html';
        brand.setAttribute('aria-label', 'I.E. Marcial Acharán y Smith, inicio');
        if (!brand.querySelector('.shared-nav-brand-copy')) {
            const copy = document.createElement('span');
            copy.className = 'shared-nav-brand-copy';

            const name = document.createElement('strong');
            name.textContent = 'I.E. Marcial Acharán y Smith';
            const motto = document.createElement('small');
            motto.textContent = 'Disciplina · Conocimiento · Futuro';
            copy.append(name, motto);
            brand.append(copy);
        }
    }

    const findExistingLink = (href, label) => existingLinks.find((link) => {
        if (!link.isConnected) return false;
        if (href.includes('#')) return link.textContent.trim() === label;
        const linkPath = decodeURIComponent(new URL(link.href, window.location.href).pathname.split('/').pop() || '')
            .toLocaleLowerCase('es');
        return linkPath === href.toLocaleLowerCase('es');
    });

    for (const [label, href] of pageLinks) {
        let link = findExistingLink(href, label);
        if (link) {
            link.href = `./${href}`;
            link.textContent = label;
        } else {
            const item = document.createElement('li');
            link = document.createElement('a');
            link.href = `./${href}`;
            link.textContent = label;
            item.append(link);
            list.append(item);
            existingLinks.push(link);
        }

        if (href.toLocaleLowerCase('es') === currentFile) {
            link.setAttribute('aria-current', 'page');
        } else {
            link.removeAttribute('aria-current');
        }

        list.append(link.parentElement);
    }

    const header = navigation.closest('header');
    let toggle = header?.querySelector('.menu-toggle') || navigation.querySelector('.menu-toggle');
    if (!toggle) {
        toggle = document.createElement('button');
        toggle.className = 'menu-toggle';
        toggle.type = 'button';
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-controls', 'site-navigation');
        toggle.setAttribute('aria-label', 'Abrir menú');
        toggle.innerHTML = '<span class="menu-toggle-lines" aria-hidden="true"></span><span class="sr-only">Abrir menú</span>';
        navigation.insertBefore(toggle, list);

        toggle.addEventListener('click', () => {
            const isOpen = toggle.getAttribute('aria-expanded') === 'true';
            toggle.setAttribute('aria-expanded', String(!isOpen));
            toggle.setAttribute('aria-label', isOpen ? 'Abrir menú' : 'Cerrar menú');
            toggle.querySelector('.sr-only').textContent = isOpen ? 'Abrir menú' : 'Cerrar menú';
            navigation.classList.toggle('is-open', !isOpen);
        });
    }

    document.body.classList.add('has-js');
    navigation.addEventListener('click', (event) => {
        if (!(event.target instanceof Element) || !event.target.closest('a')) return;
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Abrir menú');
        const label = toggle.querySelector('.sr-only');
        if (label) label.textContent = 'Abrir menú';
        navigation.classList.remove('is-open');
    });

    document.addEventListener('keydown', (event) => {
        if (event.key !== 'Escape') return;
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Abrir menú');
        const label = toggle.querySelector('.sr-only');
        if (label) label.textContent = 'Abrir menú';
        navigation.classList.remove('is-open');
    });
})();
