'use strict';

import GeneralInfo from './pages/general.js';

let currentPage = new GeneralInfo({
    element: document.querySelector('[data-page-container]'),
});