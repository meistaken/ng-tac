'use strict';

import General from './pages/mainpage.js';

let currentPage = new General({
    element: document.querySelector('[data-page-container]'),
});