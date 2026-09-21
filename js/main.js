// Keep links to sections from the previous single-page site usable.
const legacyPages = {
    '#education': 'education.html',
    '#projects': 'projects.html',
    '#experience': 'experience.html',
    '#honors': 'honors.html'
};
if ((location.pathname.endsWith('/') || location.pathname.endsWith('/index.html')) && legacyPages[location.hash]) {
    location.replace(legacyPages[location.hash]);
}

// Account for wrapped navigation and enlarged text when scrolling to content.
const header = document.querySelector('.site-header');
const updateHeaderHeight = () => {
    document.documentElement.style.setProperty('--header-height', header.getBoundingClientRect().height + 'px');
};
updateHeaderHeight();
new ResizeObserver(updateHeaderHeight).observe(header);

const themeButton = document.getElementById('theme-toggle');

function updateThemeButton() {
    themeButton.setAttribute('aria-pressed', String(document.documentElement.dataset.theme === 'dark'));
}

themeButton.hidden = false;
updateThemeButton();
themeButton.addEventListener('click', () => {
    const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('theme', theme); } catch { /* Storage may be unavailable. */ }
    updateThemeButton();
});

const filters = document.querySelectorAll('.filter-button');
const projects = document.querySelectorAll('.project');
const filterGroup = document.querySelector('.project-filters');
if (filterGroup) filterGroup.hidden = false;
filters.forEach(button => {
    button.addEventListener('click', () => {
        filters.forEach(filter => filter.setAttribute('aria-pressed', String(filter === button)));
        let visible = 0;
        projects.forEach(project => {
            project.hidden = button.dataset.filter !== 'all' && project.dataset.status !== button.dataset.filter;
            if (!project.hidden) visible++;
        });
        document.getElementById('filter-status').textContent = visible + (visible === 1 ? ' project shown.' : ' projects shown.');
    });
});

// Enhance the static figures; images are not links or interactive controls.
document.querySelectorAll('.figure-list').forEach(list => {
    const slides = [...list.querySelectorAll('.gallery-slide')];
    if (!slides.length) return;
    const gallery = document.createElement('div');
    gallery.className = 'project-gallery';
    gallery.setAttribute('role', 'region');
    gallery.setAttribute('aria-roledescription', 'carousel');
    gallery.setAttribute('aria-label', list.closest('.project').querySelector('.entry-title').textContent + ' images');
    list.before(gallery);
    const stage = document.createElement('div');
    stage.className = 'gallery-stage';
    gallery.append(stage);
    stage.append(list);
    list.classList.add('is-carousel');
    slides.forEach((slide, index) => {
        slide.setAttribute('role', 'group');
        slide.setAttribute('aria-roledescription', 'slide');
        slide.setAttribute('aria-label', 'Image ' + (index + 1) + ' of ' + slides.length);
    });

    const dots = document.createElement('div');
    dots.className = 'gallery-dots';
    dots.setAttribute('role', 'group');
    dots.setAttribute('aria-label', 'Choose image');
    const status = document.createElement('p');
    status.className = 'sr-only';
    status.setAttribute('aria-live', 'polite');
    status.setAttribute('aria-atomic', 'true');
    let current = 0;
    const dotButtons = slides.map((slide, index) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'gallery-dot';
        dot.setAttribute('aria-label', 'Show image ' + (index + 1) + ' of ' + slides.length);
        dot.addEventListener('click', () => show(index));
        dots.append(dot);
        return dot;
    });
    function show(index) {
        current = (index + slides.length) % slides.length;
        slides.forEach((slide, i) => { slide.hidden = i !== current; });
        dotButtons.forEach((dot, i) => dot.setAttribute('aria-pressed', String(i === current)));
        status.textContent = 'Image ' + (current + 1) + ' of ' + slides.length;
    }
    if (slides.length > 1) {
        for (const [direction, label] of [[-1, 'Previous image'], [1, 'Next image']]) {
            const arrow = document.createElement('button');
            arrow.type = 'button';
            arrow.className = 'gallery-arrow ' + (direction === -1 ? 'gallery-prev' : 'gallery-next');
            arrow.setAttribute('aria-label', label);
            const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            icon.setAttribute('viewBox', '0 0 24 24');
            icon.setAttribute('fill', 'none');
            icon.setAttribute('stroke', 'currentColor');
            icon.setAttribute('stroke-width', '2.2');
            icon.setAttribute('stroke-linecap', 'round');
            icon.setAttribute('stroke-linejoin', 'round');
            icon.setAttribute('aria-hidden', 'true');
            const chevron = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            chevron.setAttribute('d', direction === -1 ? 'M14 6 8 12l6 6' : 'M10 6l6 6-6 6');
            icon.append(chevron);
            arrow.append(icon);
            arrow.addEventListener('click', () => show(current + direction));
            stage.append(arrow);
        }
        gallery.addEventListener('keydown', event => {
            if (event.altKey || event.ctrlKey || event.metaKey || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
            event.preventDefault();
            show(current + (event.key === 'ArrowRight' ? 1 : -1));
        });
    }
    stage.append(dots);
    gallery.append(status);
    show(0);
});

// Scroll only: do not focus the main landmark or a navigation link.
document.querySelector('.footer-links a[href="#main"]').addEventListener('click', event => {
    event.preventDefault();
    event.currentTarget.blur();
    window.scrollTo({ top: 0, behavior: 'instant' });
});

const dialog = document.getElementById('guestbook-modal');
const guestbookButton = document.getElementById('guestbook-btn');
let guestbookLoaded = false;
guestbookButton.hidden = false;
guestbookButton.addEventListener('click', async () => {
    dialog.showModal();
    if (guestbookLoaded) return;
    guestbookLoaded = true;
    try {
        await import('./guestbook.js');
    } catch {
        const list = document.getElementById('guestbook-list');
        list.textContent = 'The guestbook could not be loaded. Please reload the page to try again.';
        list.setAttribute('aria-busy', 'false');
    }
});
document.getElementById('modal-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
    const bounds = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
});

document.getElementById('copyright-year').textContent = new Date().getFullYear();
