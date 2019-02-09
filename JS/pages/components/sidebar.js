'use strict';

export default class Nav {
    constructor({ element }) {
        this._element = element;
        this._render();

        this._element.addEventListener('click', (event) => {
          const pageLink = event.target.closest('[data-element="page-link"]');
          if (!pageLink) {
            return;
          }

          const pageElement = pageLink.closest('[data-element="page"]')
          console.log('page selected', pageElement)
        });
    }

    _render() {
        this._element.innerHTML = `
        <div class="card-body">
        <h4>Support assistant</h4>
        <ul class="nav flex-column">

          <li class="nav-item"
          data-element="page"
          data-page-id="general"
          >
            <a class="nav-link active" href="#" data-element="page-link">General info</a>
          </li>

          <li class="nav-item"
          data-element="page"
          data-page-id="interface"
          >
            <a class="nav-link" href="#" data-element="page-link">Interface info</a>
          </li>

          <li class="nav-item"
          data-element="page"
          data-page-id="rule-cheker"
          >
            <a class="nav-link" href="#" data-element="page-link">Rule checker</a>
          </li>

        </ul>
      </div>
        `;
    }  
}

