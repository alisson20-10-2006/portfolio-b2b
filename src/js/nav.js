// ===================================================
// MENU RESPONSIVO
// ===================================================

export function initMenuToggle() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    // Evita erros caso os elementos não existam
    if (!menuToggle || !navMenu) {
        return;
    }

    // Fecha o menu
    const closeMenu = () => {
        navMenu.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
    };

    // Abre e fecha o menu
    menuToggle.addEventListener('click', () => {
        const isExpanded = navMenu.classList.toggle('active');

        menuToggle.setAttribute('aria-expanded', String(isExpanded));
    });

    // Fecha o menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach((link) => {
        link.addEventListener('click', closeMenu);
    });

    // Fecha o menu ao pressionar Escape
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeMenu();
        }
    });
}