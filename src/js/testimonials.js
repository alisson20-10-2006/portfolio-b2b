/* ===================================================
   TESTIMONIALS - API FETCH & CENTERED CAROUSEL
=================================================== */

const avatarImages = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80'
];


/* ===================================================
   INITIALIZATION
=================================================== */

export async function initTestimonials() {
    const cardsContainer = document.getElementById('testimonials-cards');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    // Interrompe caso o carrossel não exista
    if (!cardsContainer) {
        return;
    }

    // Carrega os depoimentos
    await loadTestimonials(cardsContainer);

    // Navegação para o próximo card
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            scrollCarousel(cardsContainer, 1);
        });
    }

    // Navegação para o card anterior
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            scrollCarousel(cardsContainer, -1);
        });
    }
}


/* ===================================================
   LOAD TESTIMONIALS
=================================================== */

async function loadTestimonials(cardsContainer) {
    try {
        const response = await fetch(
            'https://jsonplaceholder.typicode.com/users'
        );

        if (!response.ok) {
            throw new Error('Erro ao carregar os dados');
        }

        const users = await response.json();

        const firstFiveUsers = users.slice(0, 5);

        cardsContainer.innerHTML = '';

        firstFiveUsers.forEach((user, index) => {
            const cardHTML = createCardHTML(user, index);

            cardsContainer.insertAdjacentHTML(
                'beforeend',
                cardHTML
            );
        });

        // Inicializa o carrossel após renderizar os cards
        initCarouselFocus(cardsContainer);

    } catch (error) {
        console.error(
            'Erro na seção de depoimentos:',
            error
        );

        cardsContainer.innerHTML = `
            <p class="testimonials-error">
                Não foi possível carregar os depoimentos.
            </p>
        `;
    }
}


/* ===================================================
   CREATE CARD
=================================================== */

function createCardHTML(user, index) {
    const avatarUrl =
        avatarImages[index] ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
            user.name
        )}`;

    return `
        <article class="testimonial-card">

            <div class="card-company">
                <span class="company-name">
                    ${user.company.name}
                </span>
            </div>

            <p class="card-text">
                "${user.company.catchPhrase}.
                ${user.company.bs}."
            </p>

            <div class="card-author">

                <img
                    src="${avatarUrl}"
                    alt="Foto de ${user.name}"
                    class="author-avatar"
                    loading="lazy"
                >

                <div class="author-info">

                    <h4 class="author-name">
                        ${user.name}
                    </h4>

                    <span class="author-role">
                        Co-founder / ${user.address.city}
                    </span>

                </div>

            </div>

        </article>
    `;
}


/* ===================================================
   SCROLL CAROUSEL
=================================================== */

function scrollCarousel(cardsContainer, direction) {
    const card = cardsContainer.querySelector(
        '.testimonial-card'
    );

    if (!card) {
        return;
    }

    const gap = 24;

    const scrollAmount =
        card.offsetWidth + gap;

    cardsContainer.scrollBy({
        left: scrollAmount * direction,
        behavior: 'smooth'
    });
}


/* ===================================================
   UPDATE ACTIVE CARD
=================================================== */

function updateActiveCard(cardsContainer) {
    const cards = cardsContainer.querySelectorAll(
        '.testimonial-card'
    );

    const containerBox =
        cardsContainer.getBoundingClientRect();

    const containerCenter =
        containerBox.left +
        containerBox.width / 2;

    let closestCard = null;
    let minDistance = Infinity;

    cards.forEach((card) => {
        const cardBox =
            card.getBoundingClientRect();

        const cardCenter =
            cardBox.left +
            cardBox.width / 2;

        const distance = Math.abs(
            containerCenter - cardCenter
        );

        if (distance < minDistance) {
            minDistance = distance;
            closestCard = card;
        }
    });

    cards.forEach((card) => {
        card.classList.remove('active');
    });

    if (closestCard) {
        closestCard.classList.add('active');
    }
}


/* ===================================================
   CAROUSEL FOCUS
=================================================== */

function initCarouselFocus(cardsContainer) {
    const cards = cardsContainer.querySelectorAll(
        '.testimonial-card'
    );

    // Centraliza inicialmente o terceiro card
    if (cards.length >= 3) {
        const targetCard = cards[2];

        const containerWidth =
            cardsContainer.offsetWidth;

        const cardOffsetLeft =
            targetCard.offsetLeft;

        const cardWidth =
            targetCard.offsetWidth;

        cardsContainer.scrollLeft =
            cardOffsetLeft -
            containerWidth / 2 +
            cardWidth / 2;
    }

    // Define o card inicial como ativo
    updateActiveCard(cardsContainer);

    let ticking = false;

    // Atualiza o card ativo durante o scroll
    cardsContainer.addEventListener(
        'scroll',
        () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    updateActiveCard(cardsContainer);

                    ticking = false;
                });

                ticking = true;
            }
        },
        { passive: true }
    );
}