/* * SHOWCASE MODULE
 * Логика витрины: рендер карточек и фильтрация
 */

// 1. Имитация базы данных (Mock Data)
const projects = [
    { 
        id: 1, 
        title: "Корпоративный сайт", 
        category: "web", 
        price: "от 50 000 ₽", 
        img: "assets/images/project-1.jpg", 
        description: "Современный многостраничный сайт для бизнеса с CMS."
    },
    { 
        id: 2, 
        title: "Telegram Бот", 
        category: "bot", 
        price: "от 15 000 ₽", 
        img: "assets/images/project-2.jpg",
        description: "Автоматизация процессов и коммуникации с клиентами."
    },
    { 
        id: 3, 
        title: "Интернет-магазин", 
        category: "shop", 
        price: "от 120 000 ₽", 
        img: "assets/images/project-3.jpg",
        description: "Полный цикл электронной коммерции с интеграциями."
    },
    { 
        id: 4, 
        title: "CRM Система", 
        category: "soft", 
        price: "от 200 000 ₽", 
        img: "assets/images/project-4.jpg",
        description: "Индивидуальное решение для управления вашим бизнесом."
    },
    { 
        id: 5, 
        title: "Лендинг Пейдж", 
        category: "web", 
        price: "от 25 000 ₽", 
        img: "assets/images/project-5.jpg",
        description: "Продающая страница с высокой конверсией."
    },
    { 
        id: 6, 
        title: "Парсер данных", 
        category: "soft", 
        price: "от 30 000 ₽", 
        img: "assets/images/project-6.jpg",
        description: "Сбор и структурирование информации из любых источников."
    }
];

// Категории для фильтров
const categories = [
    { id: 'all', title: 'Все проекты' },
    { id: 'web', title: 'Сайты' },
    { id: 'bot', title: 'Боты' },
    { id: 'shop', title: 'Магазины' },
    { id: 'soft', title: 'Софт' }
];

export function initShowcase() {
    const grid = document.getElementById('catalogGrid');
    const filtersContainer = document.getElementById('showcaseFilters');

    // Проверка наличия элементов, чтобы JS не падал с ошибкой
    if (!grid || !filtersContainer) return;

    // --- 1. Рендер фильтров ---
    function renderFilters() {
        filtersContainer.innerHTML = ''; // Очистка перед рендером
        categories.forEach((cat, index) => {
            const btn = document.createElement('button');
            btn.className = `filter-btn ${index === 0 ? 'active' : ''}`;
            btn.textContent = cat.title;
            btn.dataset.filter = cat.id;
            
            btn.addEventListener('click', () => handleFilterClick(cat.id, btn));
            filtersContainer.appendChild(btn);
        });
    }

    // --- 2. Рендер карточек ---
    function renderCards(filterId = 'all') {
        grid.style.opacity = '0';
        
        setTimeout(() => {
            grid.innerHTML = ''; 
            
            const filteredProjects = filterId === 'all' 
                ? projects 
                : projects.filter(p => p.category === filterId);

            if (filteredProjects.length === 0) {
                grid.innerHTML = '<p style="text-align:center; width:100%;">Проектов в этой категории пока нет.</p>';
            } else {
                filteredProjects.forEach(project => {
                    const card = document.createElement('div');
                    card.className = 'card';
                    card.innerHTML = `
                        <div class="card__img-box">
                            <img src="${project.img}" alt="${project.title}" class="card__img">
                            <div class="card__overlay">
                                <button class="btn btn--white">Подробнее</button>
                            </div>
                        </div>
                        <div class="card__info">
                            <div class="card__header">
                                <h3 class="card__title">${project.title}</h3>
                                <span class="card__price">${project.price}</span>
                            </div>
                            <p class="card__description">${project.description}</p>
                        </div>
                    `;
                    grid.appendChild(card);
                });
            }
            grid.style.opacity = '1';
        }, 300);
    }

    // --- 3. Обработчик фильтрации ---
    function handleFilterClick(filterId, clickedBtn) {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        clickedBtn.classList.add('active');
        renderCards(filterId);
    }

    // Запуск
    renderFilters();
    renderCards('all');
}