/* * MODAL MODULE
 * Логика модальных окон и валидация форм
 */

let isModalShown = false; 
let isUserTyping = false;

const modalContent = {
    timer: { title: "Спецпредложение!", text: "Скидка 10% при заказе сегодня!" },
    footer: { title: "Есть вопросы?", text: "Мы готовы обсудить ваш проект." },
    contact: { title: "Свяжитесь с нами", text: "Оставьте контакты для связи." }
};

export function initModals() {
    const overlay = document.getElementById('modalOverlay');
    const closeBtn = document.getElementById('modalCloseBtn');
    const form = document.getElementById('modalForm');
    const footer = document.getElementById('mainFooter');
    
    // Inputs
    const inputName = document.getElementById('inputName');
    const inputPhone = document.getElementById('inputPhone');
    const inputEmail = document.getElementById('inputEmail');
    const inputConsent = document.getElementById('inputConsent');
    const consentError = document.getElementById('consentError');

    if (!overlay || !form) return;

    // --- Helpers ---
    function openModal(type) {
        if (isModalShown && type !== 'contact') return;
        if (type !== 'contact') isModalShown = true;

        const titleEl = document.getElementById('modalTitle');
        const textEl = document.getElementById('modalText');
        if (titleEl) titleEl.textContent = modalContent[type].title;
        if (textEl) textEl.textContent = modalContent[type].text;

        overlay.classList.add('is-visible');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        if (isUserTyping) {
            if (!confirm("Вы ввели данные, но не отправили. Закрыть окно?")) return;
        }
        overlay.classList.remove('is-visible');
        document.body.style.overflow = '';
        form.reset();
        isUserTyping = false;
        clearErrors();
    }

    function clearErrors() {
        document.querySelectorAll('.input-group').forEach(el => el.classList.remove('error'));
        if (consentError) consentError.style.display = 'none';
    }

    // --- Валидация (Validation Logic) ---
    function validateForm() {
        let isValid = true;
        clearErrors();

        // 1. Имя (не пустое)
        if (inputName.value.trim().length < 2) {
            inputName.parentElement.classList.add('error');
            isValid = false;
        }

        // 2. Email (простая проверка regex)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(inputEmail.value.trim())) {
            inputEmail.parentElement.classList.add('error');
            isValid = false;
        }

        // 3. Телефон (минимум 10 цифр)
        const phoneClean = inputPhone.value.replace(/\D/g, ''); // Удаляем всё кроме цифр
        if (phoneClean.length < 10) {
            inputPhone.parentElement.classList.add('error');
            isValid = false;
        }

        // 4. Согласие (Checkbox) - Критично для РФ
        if (!inputConsent.checked) {
            consentError.style.display = 'block';
            isValid = false;
        } else {
            consentError.style.display = 'none';
        }

        return isValid;
    }

    // --- Events ---
    setTimeout(() => { openModal('timer'); }, 40000);

    if (footer) {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) openModal('footer');
        }, { threshold: 0.1 });
        observer.observe(footer);
    }

    document.querySelectorAll('[data-modal-trigger]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('contact');
        });
    });

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });

    // Отслеживание ввода (User Typing)
    [inputName, inputPhone, inputEmail].forEach(inp => {
        inp.addEventListener('input', () => {
            isUserTyping = true;
            inp.parentElement.classList.remove('error');
        });
    });

    inputConsent.addEventListener('change', () => {
        if (inputConsent.checked) consentError.style.display = 'none';
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateForm()) {
            alert("Заявка успешно отправлена!");
            isUserTyping = false;
            closeModal();
        }
    });
}