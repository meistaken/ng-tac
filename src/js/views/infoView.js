import { elements } from './base';

export const renderInfo = info => {
    const markup = `
        <div class="card-body">
           infoview
        </div>
    `;
    document.getElementById('content').insertAdjacentHTML('beforeend', markup);
   }