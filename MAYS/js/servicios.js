const serviceDetails = {
    certificados: {
        category: 'Trámites',
        title: 'Certificados de Estudio',
        description: 'Accede al trámite digital o presencial para solicitar certificados oficiales de estudios de nivel secundario aprobados por la UGEL.',
        requirements: ['Copia de DNI', 'Pago de tasa de trámite', 'Ficha de solicitud debidamente llenada'],
        action: 'Solicitar Certificado',
        href: './certificado.html'
    },
    matricula: {
        category: 'Trámites',
        title: 'Proceso de Matrícula',
        description: 'Consulta los requisitos y el cronograma del proceso de matrícula escolar para el período lectivo actual.',
        requirements: ['DNI del estudiante y apoderado', 'Ficha de vacante', 'Certificado de estudios previos'],
        action: 'Ver Cronograma',
        href: './matr%C3%ACcula.html'
    },
    horarios: {
        category: 'Académico',
        title: 'Horarios Escolares',
        description: 'Consulta el cronograma de clases por grado y sección, así como los horarios de atención para apoderados.',
        requirements: ['Número de sección y grado del estudiante'],
        action: 'Consultar Horarios',
        href: './horarios.html'
    },
    materiales: {
        category: 'Académico',
        title: 'Material Educativo',
        description: 'Consulta los recursos pedagógicos, carpetas de recuperación y textos digitales asignados a cada nivel escolar.',
        requirements: ['Acceso al correo institucional del alumno'],
        action: 'Acceder al Material',
        href: './material.html'
    },
    convivencia: {
        category: 'Bienestar',
        title: 'Convivencia Escolar',
        description: 'Un espacio para velar por el bienestar integral, la buena convivencia escolar y la orientación de estudiantes y familias.',
        requirements: ['Solicita orientación directamente en la oficina de psicología o tutoría.'],
        action: 'Contactar al Colegio',
        href: './contacto.html'
    },
    comites: {
        category: 'Institucional',
        title: 'Comités y Reglamento',
        description: 'Consulta información institucional, los acuerdos de convivencia y las normas que orientan nuestra comunidad educativa.',
        requirements: ['La información está disponible para estudiantes, familias y personal de la institución.'],
        action: 'Ver Comités y Reglamento',
        href: './comit%C3%A8s.html'
    },
    especialidades: {
        category: 'Académico',
        title: 'Especialidades Técnicas',
        description: 'Conoce las especialidades técnicas disponibles en nuestra institución.',
        specialties: [
            { name: 'Construcción civil', image: 'Construcción Civil.png' },
            { name: 'Diseño gráfico publicitario', image: 'Diseño Gráfico Publicitario.png' },
            { name: 'Electrónica básica e industrial', image: 'Electronica Básica e Industrial.png' },
            { name: 'Industria del vestido', image: 'Industria del Vestido.png' },
            { name: 'Cuero y calzado', image: 'Cuero y Calzado.png' },
            { name: 'Electricidad', image: 'Electricidad.png' },
            { name: 'Computación e informática', image: 'Computación e Informatica.png' },
            { name: 'Mecánica automotriz', image: 'Mecánica Automotriz.png' },
            { name: 'Cocina y repostería', image: 'Cocina y Repostería.png' },
            { name: 'Estética personal', image: 'Estética Personal.png' },
            { name: 'Construcciones metálicas', image: 'Construcciones Metálicas.png' },
            { name: 'Ebanistería', image: 'Ebanistería.png' },
            { name: 'Artesanía mixta', image: 'Artesanía Mixta.png' }
        ],
        action: 'Consultar Especialidades',
        href: './contacto.html'
    },
    directorio: {
        category: 'Institucional',
        title: 'Directorio y Galería',
        description: 'Encuentra los canales de contacto del colegio y descubre momentos de nuestra comunidad educativa.',
        requirements: ['Directorio institucional', 'Galería de actividades escolares'],
        action: 'Explorar Directorio',
        href: './directorio.html',
        secondaryAction: 'Ver Galería',
        secondaryHref: './galeria.html'
    }
};

const cards = [...document.querySelectorAll('.service-card')];
const shouldReduceMotion = () => document.body.classList.contains('a11y-reduced-motion')
    || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const reduceCardMotion = shouldReduceMotion();

cards.forEach((card, index) => {
    card.dataset.cardReveal = '';
    card.style.setProperty('--card-reveal-delay', `${index * 100}ms`);
});

if (reduceCardMotion || !('IntersectionObserver' in window)) {
    cards.forEach((card) => card.classList.add('is-visible'));
} else {
    const cardRevealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -24px 0px' });

    cards.forEach((card) => cardRevealObserver.observe(card));
}
const searchInput = document.querySelector('#service-search');
const filterButtons = [...document.querySelectorAll('.filter-pill')];
const resultCount = document.querySelector('#result-count');
const emptyState = document.querySelector('#empty-state');
const dialog = document.querySelector('#service-dialog');
const specialtyCarousel = document.querySelector('#specialty-carousel');
const specialtyTrack = document.querySelector('#specialty-track');
const specialtyPrevious = document.querySelector('#specialty-previous');
const specialtyNext = document.querySelector('#specialty-next');
const specialtyPosition = document.querySelector('#specialty-position');
const requirementsTitle = document.querySelector('#requirements-title');
let specialtyIndex = 0;
let specialtyAnimationTimer;
let selectedCategory = 'Todos';
let lastFocusedElement;

const normalize = (value) => value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('es')
    .trim();

function updateResults() {
    const query = normalize(searchInput.value);
    let visibleCount = 0;

    cards.forEach((card) => {
        const matchesCategory = selectedCategory === 'Todos' || card.dataset.category === selectedCategory;
        const searchableText = normalize(`${card.dataset.category} ${card.dataset.search} ${card.textContent}`);
        const matchesQuery = !query || searchableText.includes(query);
        const isVisible = matchesCategory && matchesQuery;
        card.hidden = !isVisible;
        if (isVisible) visibleCount += 1;
    });

    resultCount.textContent = String(visibleCount);
    emptyState.hidden = visibleCount > 0;
}

function showService(serviceId, trigger) {
    const service = serviceDetails[serviceId];
    if (!service) return;

    lastFocusedElement = trigger;
    const hasSpecialties = Boolean(service.specialties);
    dialog.classList.toggle('is-specialties', hasSpecialties);
    specialtyCarousel.hidden = !hasSpecialties;
    requirementsTitle.hidden = hasSpecialties;
    document.querySelector('#dialog-requirements').hidden = hasSpecialties;
    document.querySelector('#dialog-category').textContent = service.category;
    document.querySelector('#dialog-title').textContent = service.title;
    document.querySelector('#dialog-description').textContent = service.description;

    const requirementList = document.querySelector('#dialog-requirements');
    requirementList.replaceChildren(...(service.requirements || []).map((requirement) => {
        const item = document.createElement('li');
        item.textContent = requirement;
        return item;
    }));
    if (hasSpecialties) {
        specialtyTrack.replaceChildren(...service.specialties.map(({ name, image }, index) => {
            const card = document.createElement('article');
            card.className = 'specialty-card';
            card.style.setProperty('--card-index', String(index % 3));
            const imageElement = document.createElement('img');
            imageElement.className = 'specialty-image';
            imageElement.src = `../media/images/${encodeURIComponent(image)}`;
            imageElement.alt = '';
            imageElement.setAttribute('aria-hidden', 'true');
            const number = document.createElement('span');
            number.className = 'specialty-number';
            number.textContent = String(index + 1).padStart(2, '0');
            const title = document.createElement('h4');
            title.textContent = name;
            card.append(imageElement, number, title);
            return card;
        }));
        specialtyIndex = 0;
        specialtyTrack.scrollLeft = 0;
    }

    const action = document.querySelector('#dialog-action');
    action.href = service.href;
    action.textContent = `${service.action} →`;
    action.setAttribute('aria-label', service.action);

    const previousSecondaryAction = dialog.querySelector('.dialog-secondary-action');
    if (previousSecondaryAction) previousSecondaryAction.remove();
    if (service.secondaryAction && service.secondaryHref) {
        const secondaryAction = document.createElement('a');
        secondaryAction.className = 'dialog-action dialog-secondary-action';
        secondaryAction.href = service.secondaryHref;
        secondaryAction.textContent = `${service.secondaryAction} →`;
        dialog.append(secondaryAction);
    }

    dialog.showModal();
    if (hasSpecialties) {
        requestAnimationFrame(() => {
            if (dialog.open) updateSpecialtyCarousel();
        });
    }
    document.querySelector('.dialog-close').focus();
}

function updateSpecialtyCarousel() {
    const cards = [...specialtyTrack.children];
    if (!cards.length) return;

    const gap = Number.parseFloat(getComputedStyle(specialtyTrack).columnGap) || 0;
    const cardWidth = cards[0].getBoundingClientRect().width;
    const cardsPerView = Math.max(1, Math.floor((specialtyTrack.clientWidth + gap) / (cardWidth + gap)));
    const lastIndex = Math.max(0, cards.length - cardsPerView);
    specialtyIndex = Math.min(specialtyIndex, lastIndex);
    specialtyTrack.scrollTo({
        left: cards[specialtyIndex].offsetLeft,
        behavior: shouldReduceMotion() ? 'instant' : 'smooth'
    });
    specialtyPrevious.disabled = specialtyIndex === 0;
    specialtyNext.disabled = specialtyIndex >= lastIndex;
    specialtyPosition.textContent = `${specialtyIndex + 1}–${Math.min(specialtyIndex + cardsPerView, cards.length)} de ${cards.length}`;

    window.clearTimeout(specialtyAnimationTimer);
    specialtyTrack.classList.remove('is-changing');
    void specialtyTrack.offsetWidth;
    specialtyTrack.classList.add('is-changing');
    specialtyAnimationTimer = window.setTimeout(() => specialtyTrack.classList.remove('is-changing'), 500);
}

specialtyPrevious.addEventListener('click', () => {
    const cardWidth = specialtyTrack.firstElementChild?.getBoundingClientRect().width || 1;
    const gap = Number.parseFloat(getComputedStyle(specialtyTrack).columnGap) || 0;
    const cardsPerView = Math.max(1, Math.floor((specialtyTrack.clientWidth + gap) / (cardWidth + gap)));
    specialtyIndex = Math.max(0, specialtyIndex - cardsPerView);
    updateSpecialtyCarousel();
});

specialtyNext.addEventListener('click', () => {
    const cardWidth = specialtyTrack.firstElementChild?.getBoundingClientRect().width || 1;
    const gap = Number.parseFloat(getComputedStyle(specialtyTrack).columnGap) || 0;
    const cardsPerView = Math.max(1, Math.floor((specialtyTrack.clientWidth + gap) / (cardWidth + gap)));
    specialtyIndex += cardsPerView;
    updateSpecialtyCarousel();
});

window.addEventListener('resize', () => {
    if (dialog.open && dialog.classList.contains('is-specialties')) updateSpecialtyCarousel();
});

searchInput.addEventListener('input', updateResults);

filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        selectedCategory = button.dataset.category;
        filterButtons.forEach((filter) => {
            const isActive = filter === button;
            filter.classList.toggle('is-active', isActive);
            filter.setAttribute('aria-pressed', String(isActive));
        });
        updateResults();
    });
});

cards.forEach((card) => {
    const action = card.querySelector('.card-action');
    action.setAttribute('aria-label', `Ver información sobre ${serviceDetails[action.dataset.service].title}`);
    action.addEventListener('click', (event) => {
        showService(event.currentTarget.dataset.service, event.currentTarget);
    });
});

document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
});
dialog.addEventListener('close', () => {
    if (lastFocusedElement) lastFocusedElement.focus();
});

document.querySelector('#clear-filters').addEventListener('click', () => {
    searchInput.value = '';
    selectedCategory = 'Todos';
    filterButtons.forEach((button) => {
        const isActive = button.dataset.category === selectedCategory;
        button.classList.toggle('is-active', isActive);
        button.setAttribute('aria-pressed', String(isActive));
    });
    updateResults();
    searchInput.focus();
});

document.addEventListener('keydown', (event) => {
    if (event.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName) && !dialog.open) {
        event.preventDefault();
        searchInput.focus();
    }
});
