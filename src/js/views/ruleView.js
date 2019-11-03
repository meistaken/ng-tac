import { elements } from './base';

export const renderRule = info => {
    const markup = `
        <div class="card-body">
           rulechecker
        </div>
    `;
    document.getElementById('content').insertAdjacentHTML('beforeend', markup);
   }