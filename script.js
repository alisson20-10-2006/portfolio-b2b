// ===================================================
// IMPORTS
// ===================================================

import { initMenuToggle } from './src/js/nav.js';
import { initTestimonials } from './src/js/testimonials.js';


// ===================================================
// INITIALIZATION
// ===================================================

document.addEventListener('DOMContentLoaded', async () => {
    // Inicializa o menu responsivo
    initMenuToggle();

    // Inicializa a seção de depoimentos
    try {
        await initTestimonials();
    } catch (error) {
        console.error(
            'Erro ao inicializar os depoimentos:',
            error
        );
    }
});