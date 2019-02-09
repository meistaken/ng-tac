'use strict';

import MainPage from './pages/mainpage.js';

let currentPage = new MainPage({
    element: document.querySelector('[data-page-container]'),
});