import Component from '../../pages/component.js';

export default class Nav extends Component{
    constructor({ element }) {
        super({ element });

        this._render();
        this.on('click', 'page-link', (event) => {
          const pageId = event.target.closest('[data-element="page"]').getAttribute("data-page-id");

          this.emit('page-selected', pageId);
        });
    }

    _render() {
        this._element.innerHTML = `
        <div class="card-body">
        <h4>Support assistant</h4>
        <ul class="nav flex-column">

          <li class="nav-item"
          data-element="page"
          data-page-id="general-info"
          >
            <a class="nav-link active" href="#" data-element="page-link">General info</a>
          </li>

          <li class="nav-item"
          data-element="page"
          data-page-id="interface-info"
          >
            <a class="nav-link" href="#" data-element="page-link">Interface info</a>
          </li>

          <li class="nav-item"
          data-element="page"
          data-page-id="rule-checker"
          >
            <a class="nav-link" href="#" data-element="page-link">Rule checker</a>
          </li>

        </ul>
      </div>
        `;
    }  
}

