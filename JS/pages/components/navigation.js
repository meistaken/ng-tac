'use strict';

export default class Nav {
    constructor({ element }) {
        this._element = element;
        this._render()
    }

    _render() {
        this._element.innerHTML = `
        <div class="card-body">
        <h4>Support assistant</h4>
        <ul class="nav flex-column">
          <li class="nav-item">
            <a class="nav-link active" href="#">Active</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#">Disabled</a>
          </li>
        </ul>
      </div>
        `;
    }  
}

