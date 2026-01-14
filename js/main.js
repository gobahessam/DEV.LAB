/* MAIN JS */
import { initModals } from './modules/modal.js';
import { initHeader } from './modules/header.js';
import { initShowcase } from './modules/showcase.js';
import { initTheme } from './modules/theme.js'; // Import New Module

document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initModals();
    initShowcase();
    initTheme(); 
});