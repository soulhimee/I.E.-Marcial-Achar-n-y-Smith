(() => {
    const supportedLanguages = ['es', 'en', 'qe', 'ai'];
    const languageNames = {
        es: { label: 'Idiomas', options: ['Español', 'English', 'Quechua sureño', 'Aimara'] },
        en: { label: 'Language', options: ['Spanish', 'English', 'Southern Quechua', 'Aymara'] },
        qe: { label: 'Simikuna', options: ['Kastilla simi', 'Inlis simi', 'Qhichwa sureño', 'Aymara'] },
        ai: { label: 'Arunaka', options: ['Kastilla aru', 'Inglés aru', 'Qhichwa runasimi', 'Aymara'] }
    };
    const languageCodes = ['es', 'en', 'qe', 'ai'];
    const originalText = new WeakMap();
    const originalAttributes = new WeakMap();
    const attributeNames = ['alt', 'aria-label', 'aria-description', 'placeholder', 'title'];
    const switcher = document.createElement('div');
    const trigger = document.createElement('button');
    const languageCode = document.createElement('span');
    const selectedLanguage = document.createElement('span');
    const chevron = document.createElement('span');
    const languageList = document.createElement('div');
    const languageOptions = new Map();
    let activeLanguage = 'es';
    let translations = {};

    switcher.className = 'language-switcher';
    trigger.className = 'language-switcher-trigger';
    trigger.type = 'button';
    trigger.setAttribute('aria-haspopup', 'listbox');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-controls', 'site-language-options');

    languageCodes.forEach((code, index) => {
        const option = document.createElement('button');
        const badge = document.createElement('span');
        const name = document.createElement('span');
        option.className = 'language-option';
        option.type = 'button';
        option.setAttribute('role', 'option');
        option.dataset.language = code;
        badge.className = 'language-option-code';
        badge.setAttribute('aria-hidden', 'true');
        badge.textContent = code.toUpperCase();
        name.className = 'language-option-name';
        name.textContent = languageNames.es.options[index];
        option.append(badge, name);
        languageOptions.set(code, { button: option, name });
        languageList.append(option);
    });

    languageCode.className = 'language-switcher-code';
    languageCode.setAttribute('aria-hidden', 'true');
    selectedLanguage.className = 'language-switcher-name';
    chevron.className = 'language-switcher-chevron';
    chevron.setAttribute('aria-hidden', 'true');
    chevron.textContent = '⌄';
    trigger.append(languageCode, selectedLanguage, chevron);

    languageList.className = 'language-options';
    languageList.id = 'site-language-options';
    languageList.setAttribute('role', 'listbox');
    languageList.setAttribute('aria-hidden', 'true');
    languageList.setAttribute('inert', '');

    const updateLanguageOptions = (code) => {
        const selectedIndex = languageCodes.indexOf(code);
        languageCode.textContent = code.toUpperCase();
        selectedLanguage.textContent = languageNames[code].options[selectedIndex];
        trigger.setAttribute('aria-label', `${languageNames[code].label}: ${languageNames[code].options[selectedIndex]}`);
        languageList.setAttribute('aria-label', languageNames[code].label);

        for (const [optionCode, option] of languageOptions) {
            const index = languageCodes.indexOf(optionCode);
            option.name.textContent = languageNames[code].options[index];
            option.button.setAttribute('aria-selected', String(optionCode === code));
            option.button.tabIndex = optionCode === code ? 0 : -1;
        }
    };

    const setLanguageListOpen = (open) => {
        switcher.classList.toggle('is-open', open);
        trigger.setAttribute('aria-expanded', String(open));
        languageList.setAttribute('aria-hidden', String(!open));
        if (open) {
            languageList.removeAttribute('inert');
        } else {
            languageList.setAttribute('inert', '');
        }
    };

    updateLanguageOptions(activeLanguage);

    const navigation = document.querySelector('nav');
    const navigationList = navigation?.querySelector('.nav-links, .portal-nav-links');
    if (navigationList) {
        const switcherItem = document.createElement('li');
        switcherItem.className = 'language-switcher-item';
        switcherItem.append(switcher);
        navigationList.append(switcherItem);
    } else {
        (navigation || document.querySelector('header') || document.body).append(switcher);
    }
    switcher.prepend(trigger);
    switcher.append(languageList);

    trigger.addEventListener('click', () => {
        const open = trigger.getAttribute('aria-expanded') !== 'true';
        setLanguageListOpen(open);
        if (open) languageOptions.get(activeLanguage).button.focus();
    });

    trigger.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            setLanguageListOpen(true);
            languageOptions.get(activeLanguage).button.focus();
        }
    });

    languageList.addEventListener('keydown', (event) => {
        const codes = [...languageOptions.keys()];
        const focusedIndex = codes.findIndex((code) => languageOptions.get(code).button === document.activeElement);
        let nextIndex;

        if (event.key === 'Escape') {
            event.preventDefault();
            setLanguageListOpen(false);
            trigger.focus();
            return;
        }
        if (event.key === 'Tab') {
            setLanguageListOpen(false);
            return;
        }
        if (event.key === 'ArrowDown') nextIndex = (focusedIndex + 1) % codes.length;
        else if (event.key === 'ArrowUp') nextIndex = (focusedIndex - 1 + codes.length) % codes.length;
        else if (event.key === 'Home') nextIndex = 0;
        else if (event.key === 'End') nextIndex = codes.length - 1;
        else return;

        event.preventDefault();
        languageOptions.get(codes[nextIndex]).button.focus();
    });

    document.addEventListener('click', (event) => {
        if (!switcher.contains(event.target)) setLanguageListOpen(false);
    });

    const normalize = (value) => value.trim().replace(/\s+/g, ' ');

    const translateValue = (value) => {
        const textSize = normalize(value).match(/^Tamaño del texto: (\d+) por ciento\.$/);
        if (textSize) {
            const sizeLabels = {
                en: `Text size: ${textSize[1]} percent.`,
                qe: `Qillqapa sayaynin: ${textSize[1]} pachakmanta.`,
                ai: `Qillqan tupupa: ${textSize[1]} patakat.`
            };
            if (sizeLabels[activeLanguage]) return sizeLabels[activeLanguage];
        }

        const actionLabel = normalize(value).match(/^(.+?)\s*→$/);
        if (actionLabel && translations[actionLabel[1]]) {
            return `${translations[actionLabel[1]]} →`;
        }

        const serviceDescription = normalize(value).match(/^Ver información sobre (.+)$/);
        if (serviceDescription && translations[serviceDescription[1]] && translations['Ver información sobre']) {
            return `${translations['Ver información sobre']} ${translations[serviceDescription[1]]}`;
        }

        const carouselPosition = normalize(value).match(/^(\d+–\d+) de (\d+)$/);
        if (carouselPosition && activeLanguage !== 'es') {
            const of = { en: 'of', qe: 'manta', ai: 'ta' }[activeLanguage];
            return `${carouselPosition[1]} ${of} ${carouselPosition[2]}`;
        }

        const translated = translations[normalize(value)];
        if (translated === undefined) return value;
        const leading = value.match(/^\s*/)[0];
        const trailing = value.match(/\s*$/)[0];
        return `${leading}${translated}${trailing}`;
    };

    const translateElement = (element) => {
        const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
        let textNode;
        while ((textNode = walker.nextNode())) {
            if (textNode.parentElement?.closest('.language-switcher')) continue;
            if (!originalText.has(textNode)) originalText.set(textNode, textNode.nodeValue);
            const source = originalText.get(textNode);
            const translated = activeLanguage === 'es' ? source : translateValue(source);
            if (textNode.nodeValue !== translated) textNode.nodeValue = translated;
        }

        const elements = [element, ...element.querySelectorAll('*')];
        for (const item of elements) {
            if (item.closest('.language-switcher')) continue;
            let originals = originalAttributes.get(item);
            if (!originals) {
                originals = new Map();
                originalAttributes.set(item, originals);
            }

            for (const name of attributeNames) {
                if (!item.hasAttribute(name)) continue;
                if (!originals.has(name)) originals.set(name, item.getAttribute(name));
                const source = originals.get(name);
                const translated = activeLanguage === 'es' ? source : translateValue(source);
                if (item.getAttribute(name) !== translated) item.setAttribute(name, translated);
            }
        }
    };

    const applyLanguage = (code) => {
        activeLanguage = code;
        translations = code === 'es' ? {} : translations;
        document.documentElement.lang = code === 'qe' ? 'qu' : code === 'ai' ? 'ay' : code;
        updateLanguageOptions(code);

        if (document.body) translateElement(document.body);
        if (document.querySelector('meta[name="description"]')) {
            const description = document.querySelector('meta[name="description"]');
            if (!description.dataset.originalContent) {
                description.dataset.originalContent = description.content;
            }
            description.content = code === 'es'
                ? description.dataset.originalContent
                : translateValue(description.dataset.originalContent);
        }

        if (document.title) {
            if (!document.documentElement.dataset.originalTitle) {
                document.documentElement.dataset.originalTitle = document.title;
            }
            document.title = code === 'es'
                ? document.documentElement.dataset.originalTitle
                : translateValue(document.documentElement.dataset.originalTitle);
        }
    };

    const loadLanguage = async (code) => {
        if (code === 'es') return {};
        const response = await fetch(`../locales/${code}.json`);
        if (!response.ok) throw new Error(`No se pudo cargar el idioma ${code}: ${response.status}`);
        const locale = await response.json();
        if (!locale || typeof locale.translations !== 'object' || Array.isArray(locale.translations)) {
            throw new TypeError(`El archivo de idioma ${code} no tiene un catálogo válido.`);
        }
        return locale.translations;
    };

    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                if (node instanceof Element) {
                    translateElement(node);
                } else if (node instanceof Text && node.parentElement) {
                    translateElement(node.parentElement);
                }
            }
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    const readSavedLanguage = () => {
        try {
            const saved = localStorage.getItem('marcial-site-language');
            return supportedLanguages.includes(saved) ? saved : 'es';
        } catch (error) {
            console.warn('No se pudo leer el idioma guardado.', error);
            return 'es';
        }
    };

    const changeLanguage = async (code) => {
        trigger.setAttribute('aria-busy', 'true');
        for (const option of languageOptions.values()) option.button.disabled = true;
        try {
            translations = await loadLanguage(code);
            applyLanguage(code);
            try {
                localStorage.setItem('marcial-site-language', code);
            } catch (error) {
                console.warn('No se pudo guardar el idioma seleccionado.', error);
            }
            setLanguageListOpen(false);
            trigger.focus();
        } catch (error) {
            console.error('No se pudo cambiar el idioma del sitio.', error);
        } finally {
            trigger.removeAttribute('aria-busy');
            for (const option of languageOptions.values()) option.button.disabled = false;
        }
    };

    for (const [code, option] of languageOptions) {
        option.button.addEventListener('click', () => {
            if (code !== activeLanguage) changeLanguage(code);
            else setLanguageListOpen(false);
        });
    }

    const initialize = async () => {
        const savedLanguage = readSavedLanguage();
        try {
            translations = await loadLanguage(savedLanguage);
            applyLanguage(savedLanguage);
        } catch (error) {
            console.error('No se pudo restaurar el idioma guardado.', error);
            applyLanguage('es');
        }
    };

    initialize();
})();
