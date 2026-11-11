const pageLinks = [
    ['Inicio', 'inicio.html'],
    ['Nosotros', 'nosotros.html'],
    ['Servicios', 'servicios.html'],
    ['Noticias', 'blog.html'],
    ['Galería', 'galeria.html'],
    ['Contacto', 'contacto.html']
];

const pageTitle = document.title.split('|')[0].trim();
const currentFile = decodeURIComponent(window.location.pathname.split('/').pop() || '');
const pageSlug = currentFile.toLocaleLowerCase('es');
const header = document.querySelector('header');
const navigation = document.querySelector('nav');
const main = document.querySelector('main');

document.documentElement.lang = 'es';
document.body.classList.add('portal-page');

const themeColor = document.querySelector('meta[name="theme-color"]') || document.createElement('meta');
themeColor.name = 'theme-color';
themeColor.content = '#400409';
if (!themeColor.parentElement) document.head.append(themeColor);

if (header) {
    header.classList.add('portal-header');
    const heading = header.querySelector('h1');
    if (heading) {
        heading.textContent = pageTitle;
    } else {
        const title = document.createElement('h1');
        title.textContent = pageTitle;
        header.append(title);
    }

    const kicker = document.createElement('p');
    kicker.className = 'portal-kicker';
    kicker.textContent = 'I.E. Marcial Acharán y Smith';
    header.prepend(kicker);

    const tagline = document.createElement('p');
    tagline.className = 'portal-tagline';
    tagline.textContent = 'Disciplina · Conocimiento · Futuro';
    header.append(tagline);
}

if (navigation) {
    navigation.classList.add('portal-nav');
    navigation.setAttribute('aria-label', 'Navegación principal');
    navigation.replaceChildren();

    const brand = document.createElement('a');
    brand.className = 'portal-nav-brand';
    brand.href = './inicio.html';
    brand.setAttribute('aria-label', 'I.E. Marcial Acharán y Smith, inicio');

    const logo = document.createElement('img');
    logo.src = '../media/images/insignea.png';
    logo.alt = 'Insignia de la institución';
    brand.append(logo);
    navigation.append(brand);

    const list = document.createElement('ul');
    list.className = 'portal-nav-links';
    pageLinks.forEach(([label, file]) => {
        const item = document.createElement('li');
        const link = document.createElement('a');
        link.href = `./${file}`;
        link.textContent = label;
        if (pageSlug === file.toLocaleLowerCase('es')) {
            link.setAttribute('aria-current', 'page');
        }
        item.append(link);
        list.append(item);
    });
    navigation.append(list);
}

const addEmptyState = (title, message) => {
    const section = document.createElement('section');
    section.className = 'portal-empty-state';

    const heading = document.createElement('h2');
    heading.textContent = title;
    section.append(heading);

    const description = document.createElement('p');
    description.textContent = message;
    section.append(description);

    const actions = document.createElement('div');
    actions.className = 'portal-actions';
    const servicesLink = document.createElement('a');
    servicesLink.className = 'portal-button';
    servicesLink.href = './servicios.html';
    servicesLink.textContent = 'Ver servicios';
    actions.append(servicesLink);
    const contactLink = document.createElement('a');
    contactLink.className = 'portal-button portal-button-secondary';
    contactLink.href = './contacto.html';
    contactLink.textContent = 'Contactar con el colegio';
    actions.append(contactLink);
    section.append(actions);
    main.append(section);
};

if (main && !main.children.length) {
    if (pageSlug === 'contacto.html') {
        const heading = document.createElement('h2');
        heading.className = 'portal-section-title';
        heading.textContent = 'Estamos para atenderte';
        main.append(heading);

        const contactLayout = document.createElement('div');
        contactLayout.className = 'portal-contact-layout';

        const grid = document.createElement('section');
        grid.className = 'portal-contact-grid';
        grid.setAttribute('aria-label', 'Información de contacto');

        const addContactCard = (title, content) => {
            const card = document.createElement('article');
            card.className = 'portal-contact-card';
            const cardHeading = document.createElement('h2');
            cardHeading.textContent = title;
            card.append(cardHeading);
            card.append(content);
            grid.append(card);
        };

        const address = document.createElement('address');
        address.textContent = 'Jr. Colón Nº 467, Trujillo, Perú';
        addContactCard('Dirección', address);

        const phone = document.createElement('p');
        const phoneLink = document.createElement('a');
        phoneLink.href = 'tel:+51978838793';
        phoneLink.textContent = '(+51) 978 838 793';
        phone.append(phoneLink);
        addContactCard('Teléfono', phone);

        const email = document.createElement('p');
        const emailLink = document.createElement('a');
        emailLink.href = 'mailto:acharanysmith@gmail.com';
        emailLink.textContent = 'acharanysmith@gmail.com';
        email.append(emailLink);
        addContactCard('Correo electrónico', email);

        const hours = document.createElement('p');
        hours.textContent = 'Lunes a viernes: 8:00 a.m. a 1:00 p.m. y 2:00 p.m. a 4:45 p.m.';
        addContactCard('Horario de atención', hours);
        const contactDetails = document.createElement('div');
        contactDetails.className = 'portal-contact-details';
        contactDetails.append(grid);

        const mapCard = document.createElement('section');
        mapCard.className = 'portal-contact-map';
        mapCard.setAttribute('aria-labelledby', 'contact-map-title');
        const mapHeading = document.createElement('h2');
        mapHeading.id = 'contact-map-title';
        mapHeading.textContent = 'Ubicación';

        const map = document.createElement('iframe');
        map.title = 'Mapa de ubicación de la I.E. Marcial Acharán y Smith';
        map.src = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3949.937632045415!2d-79.02499379999999!3d-8.107833299999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91ad3d85d542d2ef%3A0xc7b7c201eeedb361!2sInstituci%C3%B3n%20Educativa%20Marcial%20Achar%C3%A1n%20y%20Smith!5e0!3m2!1ses-419!2spe!4v1794326352558!5m2!1ses-419!2spe';
        map.loading = 'lazy';
        map.referrerPolicy = 'strict-origin-when-cross-origin';
        map.allowFullscreen = true;
        mapCard.append(mapHeading, map);
        contactDetails.append(mapCard);
        contactLayout.append(contactDetails);

        const formCard = document.createElement('section');
        formCard.className = 'portal-contact-form-card';

        const formHeading = document.createElement('h2');
        formHeading.textContent = 'Envíanos un mensaje';
        formCard.append(formHeading);

        const formDescription = document.createElement('p');
        formDescription.className = 'portal-contact-form-description';
        formDescription.textContent = 'Completa el formulario y prepara tu consulta para enviarla por correo electrónico.';
        formCard.append(formDescription);

        const form = document.createElement('form');
        form.id = 'contact-form';
        form.action = 'mailto:acharanysmith@gmail.com';
        form.method = 'post';
        form.enctype = 'text/plain';

        const addFormField = (id, labelText, type) => {
            const field = document.createElement('div');
            field.className = 'portal-form-field';

            const label = document.createElement('label');
            label.htmlFor = id;
            label.textContent = labelText;

            const input = document.createElement(type === 'textarea' ? 'textarea' : 'input');
            input.id = id;
            input.name = id;
            input.required = true;
            if (type === 'textarea') {
                input.rows = 5;
            } else {
                input.type = type;
                if (type === 'text') input.autocomplete = id === 'contact-name' ? 'name' : 'off';
                if (type === 'email') input.autocomplete = 'email';
            }

            field.append(label, input);
            form.append(field);
        };

        addFormField('contact-name', 'Nombre completo', 'text');
        addFormField('contact-email', 'Correo electrónico', 'email');
        addFormField('contact-subject', 'Asunto', 'text');
        addFormField('contact-message', 'Mensaje', 'textarea');

        const submit = document.createElement('button');
        submit.className = 'portal-button';
        submit.type = 'submit';
        submit.textContent = 'Preparar correo';
        form.append(submit);

        const formNote = document.createElement('p');
        formNote.className = 'portal-contact-form-note';
        formNote.textContent = 'Se abrirá tu aplicación de correo; podrás revisar y enviar el mensaje desde allí.';
        formCard.append(form, formNote);

        contactLayout.append(formCard);
        main.append(contactLayout);
    } else if (pageSlug === 'galeria.html') {
        const heading = document.createElement('h2');
        heading.className = 'portal-section-title';
        heading.id = 'gallery-title';
        heading.textContent = 'Nuestra historia en imágenes';
        main.append(heading);

        const intro = document.createElement('p');
        intro.className = 'portal-gallery-intro';
        intro.textContent = 'Explora los recuerdos de la institución desde 1985 hasta la actualidad. Las fotografías disponibles sin año confirmado se muestran en su propia sección.';
        main.append(intro);

        const periods = [
            ['1985-1994', '1985–1994'],
            ['1995-2004', '1995–2004'],
            ['2005-2014', '2005–2014'],
            ['2015-2024', '2015–2024'],
            ['2025-present', '2025–Actualidad'],
            ['undated', 'Fotografías sin fecha confirmada']
        ];

        const filters = document.createElement('div');
        filters.className = 'portal-gallery-filters';
        filters.setAttribute('role', 'group');
        filters.setAttribute('aria-label', 'Filtrar fotografías por período');

        const addFilter = (label, period, isActive = false) => {
            const button = document.createElement('button');
            button.className = 'portal-gallery-filter';
            button.type = 'button';
            button.textContent = label;
            button.dataset.galleryFilter = period;
            button.setAttribute('aria-pressed', String(isActive));
            filters.append(button);
        };

        addFilter('Todas', 'all', true);
        periods.forEach(([key, label]) => addFilter(label, key));
        main.append(filters);

        const galleryStatus = document.createElement('p');
        galleryStatus.className = 'portal-gallery-status';
        galleryStatus.setAttribute('role', 'status');
        galleryStatus.setAttribute('aria-live', 'polite');
        galleryStatus.textContent = 'Se muestran todos los períodos.';
        main.append(galleryStatus);

        const images = [
            ['../media/images/I.E.%20Centenaria.jpg', 'Comunidad educativa en una actividad cívica'],
            ['../media/images/DICTTIVA.jpg', 'Estudiantes reunidos en el patio escolar'],
            ['../media/images/estudiantes-aula.jpg', 'Estudiantes participando en clase']
        ];

        periods.forEach(([key, label]) => {
            const section = document.createElement('section');
            section.className = 'portal-gallery-period';
            section.dataset.galleryPeriod = key;
            section.setAttribute('aria-labelledby', `gallery-period-${key}`);

            const sectionHeading = document.createElement('h3');
            sectionHeading.id = `gallery-period-${key}`;
            sectionHeading.textContent = label;
            section.append(sectionHeading);

            if (key === 'undated') {
                const gallery = document.createElement('div');
                gallery.className = 'portal-gallery-grid';
                images.forEach(([src, caption]) => {
                    const figure = document.createElement('figure');
                    const image = document.createElement('img');
                    image.src = src;
                    image.alt = caption;
                    image.loading = 'lazy';
                    image.decoding = 'async';
                    const description = document.createElement('figcaption');
                    description.textContent = caption;
                    figure.append(image, description);
                    gallery.append(figure);
                });
                section.append(gallery);
            } else {
                const emptyMessage = document.createElement('p');
                emptyMessage.className = 'portal-gallery-empty';
                emptyMessage.textContent = 'Aún no hay fotografías registradas para este período.';
                section.append(emptyMessage);
            }
            main.append(section);
        });

        filters.addEventListener('click', (event) => {
            const button = event.target.closest('[data-gallery-filter]');
            if (!button) return;

            const selectedPeriod = button.dataset.galleryFilter;
            filters.querySelectorAll('[data-gallery-filter]').forEach((filter) => {
                filter.setAttribute('aria-pressed', String(filter === button));
            });

            const visiblePeriods = [...main.querySelectorAll('[data-gallery-period]')]
                .filter((section) => selectedPeriod === 'all' || section.dataset.galleryPeriod === selectedPeriod);
            main.querySelectorAll('[data-gallery-period]').forEach((section) => {
                section.hidden = !visiblePeriods.includes(section);
            });

            galleryStatus.textContent = selectedPeriod === 'all'
                ? 'Se muestran todos los períodos.'
                : `Período seleccionado: ${periods.find(([key]) => key === selectedPeriod)[1]}.`;
        });
    } else if (pageSlug === 'blog.html') {
        addEmptyState(
            'Noticias de la institución',
            'Las novedades y comunicados oficiales se publicarán aquí. Para consultas, comunícate directamente con la institución.'
        );
    } else {
        addEmptyState(
            `Información de ${pageTitle}`,
            'Esta sección está preparada para compartir información oficial. Para conocer los detalles disponibles, consulta con la institución.'
        );
    }
}

if (main) {
    main.querySelectorAll('section').forEach((section) => {
        const articles = section.querySelectorAll('article');
        if (!articles.length) return;
        section.classList.add('portal-grid');

        articles.forEach((article) => {
            article.querySelectorAll('img').forEach((image) => {
                if (!image.getAttribute('src')) image.remove();
            });
            if (pageSlug === 'servicios.html' && !article.querySelector('p')) {
                const serviceLink = article.querySelector('a');
                const description = document.createElement('p');
                description.textContent = serviceLink
                    ? `Consulta la sección de ${serviceLink.textContent.trim()} y comunícate con el colegio para conocer los detalles vigentes.`
                    : 'Consulta con la institución para conocer los detalles vigentes.';
                article.append(description);
            }
        });
    });
}

if (main) {
    const revealCards = [...main.querySelectorAll(
        '.portal-section-title, .portal-gallery-intro, .portal-grid > article, .portal-contact-card, .portal-contact-map, .portal-gallery-grid > figure'
    )];
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    revealCards.forEach((card, index) => {
        card.dataset.cardReveal = '';
        card.style.setProperty('--card-reveal-delay', `${(index % 4) * 100}ms`);
    });

    if (reduceMotion || !('IntersectionObserver' in window)) {
        revealCards.forEach((card) => card.classList.add('is-visible'));
    } else {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -24px 0px' });

        revealCards.forEach((card) => revealObserver.observe(card));
    }
}