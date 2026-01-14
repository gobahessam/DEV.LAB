// HEADER MODULE
// Logic for the website header (scroll and mobile menu)

export function initHeader() {
    const headerInfo = document.getElementById('headerInfo');
    const burgerBtn = document.getElementById('burgerBtn');
    const nav = document.getElementById('mainNav');
    let lastScrollY = window.scrollY;

    // 1. Hide the middle bar on scroll
    window.addEventListener('scroll', () => {
        if (!headerInfo) return;

        const currentScroll = window.scrollY;
        
        // If scrolling down (> 50px) -> hide
        if (currentScroll > 50 && currentScroll > lastScrollY) {
            headerInfo.classList.add('is-hidden');
        } else {
            // If scrolling up -> show
            headerInfo.classList.remove('is-hidden');
        }
        
        lastScrollY = currentScroll;
    });

    // 2. Mobile menu (Burger)
    if (burgerBtn && nav) {
        burgerBtn.addEventListener('click', () => {
            nav.classList.toggle('is-open'); // Open/Close menu
            burgerBtn.classList.toggle('is-active'); // Button animation
            
            // Block page scroll if menu is open
            if (nav.classList.contains('is-open')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close menu on link click
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('is-open');
                document.body.style.overflow = '';
            });
        });
    }
}