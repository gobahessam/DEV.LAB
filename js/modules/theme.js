/* * THEME MODULE
 * Логика переключения темной/светлой темы
 */

export function initTheme() {
    const toggleBtn = document.getElementById('themeToggle');
    const body = document.body;
    
    // Проверяем сохраненную тему в LocalStorage
    const savedTheme = localStorage.getItem('theme');
    
    // Если была сохранена темная тема - применяем её сразу
    if (savedTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
    }

    // Обработчик клика
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            // Если сейчас темная -> делаем светлую, и наоборот
            if (body.getAttribute('data-theme') === 'dark') {
                body.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
            } else {
                body.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            }
        });
    }
}